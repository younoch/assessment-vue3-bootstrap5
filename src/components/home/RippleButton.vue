<template>
  <div class="pulse-container">
    <span 
      class="pulse-ripple" 
      :style="{ '--delay': `${props.delay || 0}ms` }"
    ></span>
    <button 
      class="pulse-button" 
      @click="togglePopover"
      ref="buttonRef"
      :data-bs-toggle="'popover'"
      :data-bs-placement="props.placement || 'top'"
      :data-bs-trigger="'manual'"
      :data-bs-html="true"
      :title="props.popoverTitle || ''"
      :data-bs-content="popoverContent"
    >
      <div class="pulse-dot"></div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, h } from 'vue';
import { Popover } from 'bootstrap';
import { renderToString } from 'vue/server-renderer';
import FeaturePopover from './FeaturePopover.vue';

const props = defineProps<{
  delay?: number;
  popoverTitle?: string;
  popoverContent?: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}>();

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
}>();

const buttonRef = ref<HTMLElement | null>(null);
let popoverInstance: Popover | null = null;

// Create a computed property that will render our custom popover component
const popoverContent = computed(() => {
  const popoverNode = h(FeaturePopover, {
    title: props.popoverTitle || 'Feature',
    content: props.popoverContent
  });
  
  // Create a temporary container to render the component
  const tempDiv = document.createElement('div');
  renderToString(popoverNode).then(html => {
    // This will be used by the popover
    tempDiv.innerHTML = html;
  });
  
  return tempDiv.innerHTML;
});

const togglePopover = async (e: MouseEvent) => {
  if (!popoverInstance) return;
  
  // Toggle the popover
  popoverInstance.toggle();
  
  // Emit the click event
  emit('click', e);
};

// Initialize popover when component is mounted
onMounted(() => {
  if (buttonRef.value) {
    popoverInstance = new Popover(buttonRef.value, {
      trigger: 'manual',
      html: true,
      sanitize: false // Allow HTML content
    });
  }
});

// Clean up popover when component is unmounted
onBeforeUnmount(() => {
  if (popoverInstance) {
    popoverInstance.dispose();
    popoverInstance = null;
  }
});
</script>

<style scoped lang="scss">
@keyframes ripple {
  0% {
    width: 16px;
    height: 16px;
    opacity: 0.3;
    border-width: 1px;
  }
  70% {
    width: 80px;
    height: 80px;
    opacity: 1;
    border-width: 1px;
  }
  100% {
    width: 80px;
    height: 80px;
    opacity: 0.1;
    border-width: 1px;
  }
}

.pulse-container {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
}

.pulse-dot {
  width: 16px;
  height: 16px;
  background-color: #F2C94C;
  border-radius: 50%;
  position: relative;
  z-index: 4;
}

.pulse-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid #F2C94C;
  background: #F2C94C33;
  box-sizing: border-box;
  animation: ripple 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
  animation-delay: var(--delay, 0ms); /* 👈 use the delay here */
  pointer-events: none;
}
</style>
