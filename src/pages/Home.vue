<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '../stores/cart';
import RippleButton from "../components/home/RippleButton.vue";
import FeaturePopover from "../components/home/FeaturePopover.vue";
import BootstrapCarousel from "../components/common/BootstrapCarousel.vue";
import ProductCard from "../components/home/ProductCard.vue";

// Directly import the images
import heroBg1 from '../assets/images/hero-bg-1.jpg';
import heroBg2 from '../assets/images/hero-bg-2.jpg';
import heroBg3 from '../assets/images/hero-bg-3.jpg';

interface Slide {
  image: string;
  alt: string;
  title?: string;
  description?: string;
}

const slides: Slide[] = [
  {
    image: heroBg1,
    alt: 'Hero Background 1'
  },
  {
    image: heroBg2,
    alt: 'Hero Background 2'
  },
  {
    image: heroBg3,
    alt: 'Hero Background 3'
  }
];

const isLoading = ref(true);
const error = ref<Error | null>(null);

const onImageLoad = () => {
  isLoading.value = false;
};

const onImageError = (e: Event) => {
  error.value = new Error('Failed to load image');
  console.error('Image load error:', e);  
};

// Set loading to false after component mounts
onMounted(() => {
  // Add a small delay to show loading state (for demo purposes)
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const cartStore = useCartStore();

const addToCart = (product: { id: string; title: string; price: number; image: string }) => {
  cartStore.addItem({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.image
  });
};
</script>

<template>
    <div>
        <section 
            class="position-relative text-white d-flex align-items-md-center align-items-sm-start hero-section" 
            aria-label="Hero carousel"
        >

            <!-- Carousel -->
            <div class="position-absolute w-100">
                <BootstrapCarousel 
                    :slides="slides" 
                    :interval="2500"
                    :show-indicators="true"
                    :show-controls="false"
                    carousel-id="heroCarousel"
                    style="height: 100%;"
                    aria-label="Image carousel"
                >
                    <template #default="{ slide, activeSlide, index }">
                        <div class="carousel-item h-100" :class="{ active: activeSlide === index }" :aria-hidden="activeSlide !== index">
                            <img 
                                :src="slide.image" 
                                class="d-block w-100 h-100" 
                                :alt="slide.alt"
                                :aria-label="slide.alt"
                                style="object-fit: cover;"
                                @load="onImageLoad"
                                @error="onImageError"
                                loading="lazy"
                            />
                        </div>
                    </template>
                </BootstrapCarousel>
                <div class="position-absolute top-0 start-0 w-100" style="background: rgba(0, 0, 0, 0.4);"></div>
            </div>
            <!-- Top Left - Desktop -->
            <div class="position-absolute d-none d-md-block" style="top: 30%; left: 45%;">
                <FeaturePopover placement="left">
                    <template #trigger>
                        <RippleButton 
                            :delay="0"
                            placement="right"
                        />
                    </template>
                    <template #content>
                        <ProductCard
                            title="Premium Headphones"
                            description="Experience crystal clear sound with noise cancellation technology"
                            price="$199.99"
                            :images="[
                              { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Premium Headphones Front' },
                              { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Premium Headphones Side' },
                              { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=90', alt: 'Premium Headphones Back' }
                            ]"
                            @add-to-cart="addToCart"
                        />
                    </template>
                </FeaturePopover>
            </div>

            <!-- Bottom Left - Desktop -->
            <div class="position-absolute d-none d-md-block" style="bottom: 10%; left: 20%;">
                <FeaturePopover placement="top">
                    <template #trigger>
                        <RippleButton 
                            :delay="300"
                            placement="right"
                        />
                    </template>
                    <template #content>
                        <ProductCard
                            title="Wireless Earbuds"
                            description="True wireless earbuds with premium sound and long battery life"
                            price="$149.99"
                            :images="[
                              { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Wireless Earbuds Front' },
                              { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Wireless Earbuds Case' }
                            ]"
                            @add-to-cart="addToCart"
                        />
                    </template>
                </FeaturePopover>
            </div>

            <!-- Top Right - Desktop -->
            <div class="position-absolute d-none d-md-block" style="bottom: 12%; right: 35%;">
                <FeaturePopover placement="top">
                    <template #trigger>
                        <RippleButton 
                            :delay="600"
                            placement="left"
                        />
                    </template>
                    <template #content>
                        <ProductCard
                            title="Smart Watch"
                            description="Stay connected with advanced health tracking and notifications"
                            price="$249.99"
                            :images="[
                              { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Smart Watch' },
                              { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Headphones' },
                              { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Sunglasses' }
                            ]"
                            @add-to-cart="addToCart"
                        />
                    </template>
                </FeaturePopover>
            </div>

            <!-- Bottom Right - Desktop -->
            <div class="position-absolute d-none d-md-block" style="bottom: 1%; right: 15%;">
                <FeaturePopover placement="top">
                    <template #trigger>
                        <RippleButton 
                            :delay="900"
                            placement="top"
                        />
                    </template>
                    <template #content>
                        <ProductCard
                            title="Bluetooth Speaker"
                            description="Portable wireless speaker with 20-hour battery life"
                            price="129.99"
                            :images="[
                              { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Bluetooth Speaker Front' },
                              { url: 'https://images.unsplash.com/photo-1558379850-823f103f866a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Bluetooth Speaker Back' },
                              { url: 'https://images.unsplash.com/photo-1558379850-5c7c6a6f0b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Bluetooth Speaker Controls' }
                            ]"
                            @add-to-cart="addToCart"
                        />
                    </template>
                </FeaturePopover>
            </div>

            <!-- Mobile Buttons (Right Side) -->
            <div class="d-md-none">
                <!-- Mobile Button 1 -->
                <div class="position-absolute" style="top: 10%; right: 10%;">
                    <FeaturePopover placement="left">
                        <template #trigger>
                            <RippleButton :delay="0" placement="left"/>
                        </template>
                        <template #content>
                            <ProductCard
                                title="Premium Headphones"
                                description="Experience crystal clear sound with noise cancellation technology"
                                price="$199.99"
                                :images="[
                                    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Premium Headphones Front' },
                                    { url: 'https://images.unsplash.com/photo-1505740420928-5660ddef382e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Premium Headphones Side' },
                                    { url: 'https://images.unsplash.com/photo 1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=81', alt: 'Premium Headphones Back' }
                                ]"
                                @add-to-cart="addToCart"
                            />
                        </template>
                    </FeaturePopover>
                </div>

                <!-- Mobile Button 2 -->
                <div class="position-absolute" style="top: 30%; right: 10%;">
                    <FeaturePopover placement="left">
                        <template #trigger>
                            <RippleButton :delay="300" placement="left"/>
                        </template>
                        <template #content>
                            <ProductCard
                                title="Wireless Earbuds"
                                description="True wireless earbuds with premium sound and long battery life"
                                price="$149.99"
                                :images="[
                                    { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Wireless Earbuds Front' },
                                    { url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Wireless Earbuds Case' }
                                ]"
                                @add-to-cart="addToCart"
                            />
                        </template>
                    </FeaturePopover>
                </div>

                <!-- Mobile Button 3 -->
                <div class="position-absolute" style="top: 50%; right: 10%;">
                    <FeaturePopover placement="left">
                        <template #trigger>
                            <RippleButton :delay="600" placement="left"/>
                        </template>
                        <template #content>
                            <ProductCard
                                title="Smart Watch"
                                description="Stay connected with advanced health tracking and notifications"
                                price="$249.99"
                                :images="[
                                    { url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Smart Watch' },
                                    { url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Headphones' },
                                    { url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Sunglasses' }
                                ]"
                                @add-to-cart="addToCart"
                            />
                        </template>
                    </FeaturePopover>
                </div>
                <!-- Mobile Button 4 -->
                <div class="position-absolute" style="top: 70%; right: 10%;">
                    <FeaturePopover placement="left">
                        <template #trigger>
                            <RippleButton :delay="900" placement="left"/>
                        </template>
                        <template #content>
                            <ProductCard
                                title="Bluetooth Speaker"
                                description="Portable wireless speaker with 20-hour battery life"
                                price="129.99"
                                :images="[
                                    { url: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Bluetooth Speaker Front' },
                                    { url: 'https://images.unsplash.com/photo-1558379850-823f103f866a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Bluetooth Speaker Back' },
                                    { url: 'https://images.unsplash.com/photo-1558379850-5c7c6a6f0b4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80', alt: 'Bluetooth Speaker Controls' }
                                ]"
                                @add-to-cart="addToCart"
                            />
                        </template>
                    </FeaturePopover>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
.hero-section {
  min-height: 250px;
  padding: 0.5rem 0;
  position: relative;
  overflow: hidden;
}

/* Desktop styles */
@media (min-width: 768px) {
  .hero-section {
    min-height: calc(100vh - 64px);
    padding: 0;
  }
}

/* Ensure carousel takes full width and height */
.hero-section :deep(.carousel) {
  width: 100%;
  height: 100%;
}

/* Adjust carousel item height for mobile */
.hero-section :deep(.carousel-item) {
  min-height: 400px;
}

/* Adjust carousel item height for desktop */
@media (min-width: 768px) {
  .hero-section :deep(.carousel-item) {
    min-height: calc(100vh - 64px);
  }
}
</style>
