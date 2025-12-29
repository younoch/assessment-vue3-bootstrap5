<template>
  <div class="hero-carousel position-relative w-100">
    <BootstrapCarousel 
      :slides="slides" 
      :interval="interval"
      :show-indicators="showIndicators"
      :show-controls="showControls"
      :carousel-id="carouselId"
      :aria-label="ariaLabel"
      class="h-100"
    >
      <template #default="{ slide, activeSlide, index }">
        <div 
          class="carousel-item d-flex align-items-center justify-content-center" 
          :class="{ active: activeSlide === index }"
          :aria-hidden="activeSlide !== index"
        >
          <img 
            :src="slide.image" 
            :alt="slide.alt"
            class="carousel-img"
            @load="onImageLoad"
            @error="onImageError"
            loading="lazy"
          />
        </div>
      </template>
    </BootstrapCarousel>
    <div class="overlay" :style="{ background: overlayColor }"></div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import BootstrapCarousel from '../common/BootstrapCarousel.vue';

export interface Slide {
  image: string;
  alt: string;
  [key: string]: any;
}

export default defineComponent({
  name: 'HeroCarousel',
  components: {
    BootstrapCarousel
  },
  props: {
    slides: {
      type: Array as () => Slide[],
      required: true
    },
    interval: {
      type: Number,
      default: 2500
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    showControls: {
      type: Boolean,
      default: false
    },
    carouselId: {
      type: String,
      default: 'heroCarousel'
    },
    ariaLabel: {
      type: String,
      default: 'Image carousel'
    },
    overlayColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    }
  },
  methods: {
    onImageLoad(event: Event) {
      this.$emit('image-load', event);
    },
    onImageError(event: Event) {
      this.$emit('image-error', event);
    }
  },
  emits: ['image-load', 'image-error']
});
</script>

<style scoped>
.hero-carousel {
  width: 100%;
  height: calc(100vh - 64px); /* desktop hero height */
  position: relative;
  overflow: hidden;
}

/* Overlay on top of carousel */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Carousel item */
.carousel-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;     /* vertical center */
  justify-content: center; /* horizontal center */
}

/* Image scaling */
.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* hero crop */
  display: block;
}

/* Mobile: full image visible */
@media (max-width: 767px) {
  .hero-carousel {
    height: 300px;          /* adjust mobile height */
  }
  .carousel-img {
    object-fit: contain;    /* no cropping on mobile */
  }
}
</style>

