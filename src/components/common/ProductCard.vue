<template>
  <div class="product-card h-100 p-2 rounded-3 bg-white">
    <div class="position-relative" style="height: 200px; overflow: hidden; background-color: #f8f9fa;">
      <BootstrapCarousel
        :slides="images.map(img => ({
          image: img.url,
          alt: img.alt || title
        }))"
        :show-indicators="images.length > 1"
        :show-controls="images.length > 1"
        :interval="images.length > 1 ? 3000 : 0"
        carousel-id="product-carousel"
        style="height: 100%;"
      >
        <template #default="{ slide, activeSlide, index }">
          <div class="carousel-item h-100 position-relative" :class="{ active: activeSlide === index }">
            <div class="ratio ratio-1x1">
              <img 
                :src="slide.image" 
                class="d-block w-100 h-100"
                :alt="slide.alt"
                style="object-fit: contain; object-position: center;"
              />
            </div>
          </div>
        </template>
      </BootstrapCarousel>
    </div>
    <div class="d-flex flex-column">
      <h5 class="card-title fw-semibold text-uppercase text-black">{{ title }}</h5>
      <p class="card-text my-1 flex-grow-1 text-muted">{{ description }}</p>
      <div class="">
        <div class="card-price mb-1 text-black fw-bold">{{ price }}</div>
        <button 
          class="btn cart-button w-100 fw-bold"
          @click="$emit('add-to-cart')"
        >
          <i class="fas fa-shopping-cart me-1"></i> Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BootstrapCarousel from './BootstrapCarousel.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  price: {
    type: String,
    required: true
  },
  images: {
    type: Array as () => Array<{ url: string; alt?: string }>,
    required: true,
    default: () => [],
    validator: (value: any[]) => {
      return value.every(item => 
        typeof item === 'object' && 
        item !== null && 
        'url' in item && 
        typeof item.url === 'string'
      );
    }
  },
});

const emit = defineEmits<{
  (e: 'add-to-cart'): void
}>();
</script>

<style scoped lang="scss">
.product-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  
  @media (min-width: 1440px) {
    min-width: 380px;
  }
  
  @media (max-width: 1439.98px) {
    min-width: 300px;
  }
  
  @media (max-width: 767.98px) {
    min-width: 0;
    width: 100%;
  }
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

/* Image container styles */
.position-relative {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Ensure the image doesn't overflow its container */
.card-img-top {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  object-position: center;
}

.card-title {
  font-size: 14px;
}

.card-text {
  font-size: 12px;
}

.card-price {
  font-size: 14px;
  font-weight: bold;
}
.badge {
  font-size: 0.75rem;
  padding: 0.35em 0.65em;
}

.cart-button {
  background-color: #2359A5;
  border-color: #2359A5;
  color: white;
}

.btn-light {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
</style>
