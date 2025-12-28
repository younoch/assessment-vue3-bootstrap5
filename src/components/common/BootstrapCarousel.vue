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
