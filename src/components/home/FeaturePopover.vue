<template>
  <div class="feature-popover" ref="popover">
    <div 
      class="popover-trigger" 
      @click="togglePopover"
      aria-haspopup="true"
      :aria-expanded="isOpen.toString()"
    >
      <slot name="trigger">
        <button class="btn btn-sm btn-primary">i</button>
      </slot>
    </div>
    
    <div 
      v-if="isOpen" 
      class="popover-content" 
      :class="`popover-${placement}`"
      @click.stop
    >
      <div class="popover-arrow"></div>
      <div class="popover-header">
        <slot name="header"></slot>
      </div>
      <div class="popover-body">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = withDefaults(defineProps<{
  placement?: 'top' | 'bottom' | 'left' | 'right';
}>(), {
  placement: 'top'
});

const isOpen = ref(false);
const popover = ref<HTMLElement | null>(null);

const togglePopover = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event: MouseEvent) => {
  if (popover.value && !popover.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.feature-popover {
  position: relative;
  display: inline-block;
}

.popover-trigger {
  cursor: pointer;
}

.popover-content {
  position: absolute;
  z-index: 1060;
  padding: 0;
  background-clip: padding-box;
}

.popover-body {
  padding: 0;
}

/* Placement styles */
.popover-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.popover-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
}

.popover-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 0.5rem;
}

.popover-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 0.5rem;
}

.popover-top .popover-arrow {
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.popover-bottom .popover-arrow {
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
}

.popover-left .popover-arrow {
  top: 50%;
  right: -0.5rem;
  transform: translateY(-50%);
}

.popover-right .popover-arrow {
  top: 50%;
  left: -0.5rem;
  transform: translateY(-50%);
}
</style>
