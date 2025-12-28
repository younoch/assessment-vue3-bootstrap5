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
    width: var(--dot-size);
    height: var(--dot-size);
    opacity: 0.3;
    border-width: 1px;
  }

  70% {
    width: var(--pulse-size);
    height: var(--pulse-size);
    opacity: 1;
    border-width: 1px;
  }

  100% {
    width: var(--pulse-size);
    height: var(--pulse-size);
    opacity: 0.1;
    border-width: 1px;
  }
}

.pulse-container {
  --pulse-size: 80px;
  --dot-size: 16px;

  position: relative;
  width: var(--pulse-size);
  height: var(--pulse-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pulse-button {
  width: var(--pulse-size);
  height: var(--pulse-size);
  border-radius: 50%;
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}

.pulse-dot {
  width: var(--dot-size);
  height: var(--dot-size);
  background-color: #f2c94c;
  border-radius: 50%;
  position: relative;
  z-index: 4;
}

.pulse-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  border: 1px solid #f2c94c;
  background-color: rgba(242, 201, 76, 0.2);
  box-sizing: border-box;

  animation: ripple 1.5s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
  animation-delay: var(--delay, 0ms);
  pointer-events: none;
}

@media (max-width: 575px) {
  .pulse-container {
    --pulse-size: 48px;
    --dot-size: 10px;
  }
}

@media (min-width: 576px) and (max-width: 991px) {
  .pulse-container {
    --pulse-size: 64px;
    --dot-size: 14px;
  }
}
</style>
