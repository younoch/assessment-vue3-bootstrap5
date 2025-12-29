<template>
  <div
    :id="carouselId"
    class="carousel slide"
    :data-bs-ride="ride"
    :data-bs-interval="interval"
  >
    <!-- Indicators -->
    <div v-if="showIndicators" class="carousel-indicators">
      <button
        v-for="(slide, i) in slides"
        :key="i"
        type="button"
        :data-bs-target="`#${carouselId}`"
        :data-bs-slide-to="i"
        :class="{ active: i === 0 }"
      ></button>
    </div>

    <!-- Slides -->
    <div class="carousel-inner">
      <div
        v-for="(slide, i) in slides"
        :key="i"
        class="carousel-item"
        :class="{ active: i === 0 }"
      >
        <img
          :src="slide.image"
          class="d-block w-100"
          :alt="slide.alt || `Slide ${i + 1}`"
          style="height: auto;"
        />
        <div v-if="slide.title || slide.text" class="carousel-caption d-none d-md-block">
          <h5 v-if="slide.title">{{ slide.title }}</h5>
          <p v-if="slide.text">{{ slide.text }}</p>
        </div>
      </div>
    </div>

    <!-- Controls -->
    <button
      v-if="showControls"
      class="carousel-control-prev"
      type="button"
      :data-bs-target="`#${carouselId}`"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon"></span>
    </button>

    <button
      v-if="showControls"
      class="carousel-control-next"
      type="button"
      :data-bs-target="`#${carouselId}`"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</template>

<style scoped>
.carousel {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.carousel-inner {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-item {
  width: 100%;
  height: 100%;
  position: relative;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  min-width: 100%;
}

/* Ensure the carousel fills its container */
:deep(.carousel) {
  height: 100%;
}

:deep(.carousel-inner) {
  height: 100%;
}

:deep(.carousel-item) {
  height: 100%;
}

/* Make sure the carousel item fills its parent */
:deep(.carousel-item) {
  position: relative;
  min-height: 100%;
}

/* Ensure the image fills the carousel item */
:deep(.carousel-item img) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
}
</style>

<script setup lang="ts">
interface Slide {
  image: string;
  title?: string;
  text?: string;
  alt?: string;
}

const props = defineProps<{
  slides: Slide[];
  carouselId?: string;  
  ride?: string; 
  interval?: number;
  showIndicators?: boolean;
  showControls?: boolean;
}>();

const carouselId = props.carouselId || 'carouselExample';
const ride = props.ride || 'carousel';
const interval = props.interval ?? 5000;
const showIndicators = props.showIndicators ?? true;
const showControls = props.showControls ?? true;
</script>
