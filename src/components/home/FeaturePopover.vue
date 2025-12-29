<template>
  <div class="feature-popover" ref="popover">
    <!-- Trigger for both mobile and desktop -->
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
    
    <!-- Desktop Popover -->
    <div 
      v-if="isOpen && !isMobile" 
      class="popover-content d-none d-md-block" 
      :class="`popover-${placement}`"
      @click.stop
    >
      <div class="popover-header">
        <slot name="header"></slot>
      </div>
      <div class="popover-body">
        <slot name="content"></slot>
      </div>
    </div>

    <!-- Mobile Modal -->
    <div v-else-if="isOpen && isMobile" class="modal d-md-none" tabindex="-1" style="display: block;">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header border-0 pb-0">
            <h5 class="modal-title"><slot name="header"></slot></h5>
            <button type="button" class="btn-close" @click="closePopover" aria-label="Close"></button>
          </div>
          <div class="modal-body pt-0">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isOpen && isMobile" class="modal-backdrop fade show d-md-none"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

const props = withDefaults(defineProps<{
  placement?: 'top' | 'bottom' | 'left' | 'right';
}>(), {
  placement: 'top'
});

const isOpen = ref(false);
const popover = ref<HTMLElement | null>(null);
const isMobile = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768; // Bootstrap's md breakpoint
};

const togglePopover = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && isMobile.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closePopover = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

const handleClickOutside = (event: MouseEvent) => {
  if (popover.value && !popover.value.contains(event.target as Node)) {
    closePopover();
  }
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen.value) {
      closePopover();
    }
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkMobile);
  document.removeEventListener('click', handleClickOutside);
  document.body.style.overflow = '';
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

/* Desktop Popover Styles */
.popover-content {
  position: absolute;
  z-index: 1060;
  padding: 0;
  background-clip: padding-box;
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  min-width: 280px;
}

.popover-body {
  padding: .25rem;
}

/* Mobile Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1070;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0.5rem;
  pointer-events: none;
}

.modal-content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1060;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .modal-dialog {
    max-width: 500px;
    margin: 1.75rem auto;
  }
  
  .popover-content {
    position: absolute;
  }
  
  .popover-top {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 0.5rem;
  }
  
  .popover-bottom {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 0.5rem;
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
}
</style>
