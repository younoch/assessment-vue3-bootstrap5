<script setup lang="ts">
import logo from '../../assets/svg/logo.svg'
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Collapse } from 'bootstrap'
import { useCartStore } from '../../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const isSearchFocused = ref(false)
const menuEl = ref<HTMLElement | null>(null)
const isMenuOpen = ref(false)

const handleSearchFocus = () => {
  isSearchFocused.value = true
}

const handleSearchBlur = () => {
  isSearchFocused.value = false
}

const closeMobileMenu = () => {
  if (!menuEl.value) return
  const instance = Collapse.getInstance(menuEl.value) || new Collapse(menuEl.value, { toggle: false })
  instance.hide()
  isMenuOpen.value = false
}

const toggleMenu = () => {
  if (!menuEl.value) return
  const instance = Collapse.getOrCreateInstance(menuEl.value, { toggle: false })
  if (isMenuOpen.value) {
    instance.hide()
  } else {
    instance.show()
  }
  isMenuOpen.value = !isMenuOpen.value
}

const performSearch = () => {
  if (!searchQuery.value) return
  console.log('Searching:', searchQuery.value)
  closeMobileMenu() // close menu after search
}

const navigateTo = (page: string) => {
  closeMobileMenu()
  router.push(`/${page}`)
}

onMounted(() => {
  const element = document.getElementById('mainNavbar')
  if (!element) return
  
  menuEl.value = element
  
  const handleShown = () => {
    document.body.style.overflow = 'hidden'
    isMenuOpen.value = true
  }
  
  const handleHidden = () => {
    document.body.style.overflow = ''
    isMenuOpen.value = false
  }
  
  element.addEventListener('shown.bs.collapse', handleShown)
  element.addEventListener('hidden.bs.collapse', handleHidden)
  
  onBeforeUnmount(() => {
    element.removeEventListener('shown.bs.collapse', handleShown)
    element.removeEventListener('hidden.bs.collapse', handleHidden)
  })
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-light bg-light border-bottom fixed-top">
      <div class="container">

        <!-- Logo -->
        <RouterLink class="navbar-brand d-flex align-items-center" to="/">
          <img :src="logo" alt="Logo" height="32" />
        </RouterLink>

        <!-- Hamburger/Close Toggle -->
        <button
          class="navbar-toggler border-0"
          type="button"
          @click="toggleMenu"
          aria-controls="mainNavbar"
          :aria-expanded="isMenuOpen ? 'true' : 'false'"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" :class="{ 'd-none': isMenuOpen }"></span>
          <span class="btn-close" :class="{ 'd-none': !isMenuOpen }"></span>
        </button>

        <!-- Collapsible Menu -->
        <div id="mainNavbar" class="collapse navbar-collapse mobile-fullscreen">

          <!-- Scrollable links -->
          <ul class="navbar-nav d-md-none flex-column w-100 text-center menu-links">
            <li class="nav-item">
              <RouterLink class="nav-link fw-bold" to="/#" @click="closeMobileMenu">Products</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link fw-bold" to="/#" @click="closeMobileMenu">Rooms</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link fw-bold" to="/#" @click="closeMobileMenu">New At IKEA</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link fw-bold" to="/#" @click="closeMobileMenu">All Offer</RouterLink>
            </li>
          </ul>

          <!-- Bottom pinned search + icons -->
          <div class="mobile-bottom d-md-none">
            <!-- Search -->
            <div class="search-container position-relative w-100 px-3">
              <button 
                v-if="!searchQuery && !isSearchFocused" 
                class="search-button" 
                @click="performSearch"
              >
                <i class="bi bi-search"></i>
              </button>
              <input
                v-model="searchQuery"
                type="search"
                class="form-control search-input w-100"
                placeholder="What are your looking for?"
                @keyup.enter="performSearch"
              >
            </div>

            <!-- Icons -->
            <div class="d-flex justify-content-center gap-4 mt-2 mb-3">
              <button class="icon-button p-0" @click="navigateTo('camera')">
                <i class="bi bi-camera"></i>
              </button>
              <button class="icon-button p-0" @click="navigateTo('profile')">
                <i class="bi bi-person"></i>
              </button>
              <button class="icon-button p-0 position-relative" @click="navigateTo('cart')">
                <i class="bi bi-bag"></i>
                <span v-if="cartStore.totalItems > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{ cartStore.totalItems }}
                  <span class="visually-hidden">items in cart</span>
                </span>
              </button>
            </div>
          </div>

          <!-- Desktop Menu -->
          <div class="d-none d-md-flex align-items-center ms-auto flex-grow-1">
            <ul class="navbar-nav d-flex flex-row me-3">
              <li class="nav-item me-3">
                <RouterLink class="nav-link fw-bold" to="/#">Products</RouterLink>
              </li>
              <li class="nav-item me-3">
                <RouterLink class="nav-link fw-bold" to="/#">Rooms</RouterLink>
              </li>
              <li class="nav-item me-3">
                <RouterLink class="nav-link fw-bold" to="/#">New At IKEA</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/#">All Offer</RouterLink>
              </li>
            </ul>

            <!-- Desktop Search -->
            <div class="search-container position-relative flex-grow-1 me-3">
              <button 
                v-if="!searchQuery" 
                class="search-button" 
                @click="performSearch"
              >
                <i class="bi bi-search"></i>
              </button>
              <input
                v-model="searchQuery"
                type="search"
                class="form-control search-input w-100"
                placeholder="What are your looking for?"
                @keyup.enter="performSearch"
                @focus="handleSearchFocus"
                @blur="handleSearchBlur"
                ref="searchInput"
              >
            </div>

            <!-- Desktop Icons -->
            <div class="d-flex align-items-center gap-4 ms-3">
              <button class="icon-button p-0" @click="navigateTo('camera')">
                <i class="bi bi-camera fs-5"></i>
              </button>
              <button class="icon-button p-0" @click="navigateTo('profile')">
                <i class="bi bi-person fs-5"></i>
              </button>
              <button class="icon-button p-0 position-relative" @click="navigateTo('cart')">
                <i class="bi bi-bag fs-5"></i>
                <span v-if="cartStore.totalItems > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {{ cartStore.totalItems }}
                  <span class="visually-hidden">items in cart</span>
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </nav>

    <div class="header-spacer"></div>
  </header>
</template>

<style scoped lang="scss">
.header-spacer { height: 56px; }

/* Mobile fullscreen menu */
@media (max-width: 767px) {
  .mobile-fullscreen {
    position: fixed;
    top: 56px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 56px);
    background-color: #fff;
    z-index: 1050;
    display: flex;
    flex-direction: column;
    justify-content: space-between; /* links scroll, bottom pinned */
    overflow-y: hidden;
  }

  .menu-links {
    overflow-y: auto;
    flex: 1 1 auto;
    padding-top: 1.5rem;
  }

  .mobile-bottom {
    flex-shrink: 0;
    padding-bottom: 1rem;
  }

  .mobile-bottom .search-container {
    width: 100%;
    padding: 0 1rem;
    position: relative;
  }

  .mobile-bottom .search-input {
    width: 100%;
    padding-left: 2rem !important;
    padding-right: 0.75rem;
    height: 2.6rem;
    font-size: 0.95rem;
  }

  .mobile-bottom .search-button {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    font-size: 1.1rem;
    color: #6c757d;
    z-index: 10;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none; /* Make the icon non-interactive */
  }

  .mobile-bottom .icon-button i {
    font-size: 1.5rem;
  }
  
  /* Ensure cart icon is visible */
  .icon-button {
    background: none;
    border: none;
    color: #6c757d;
    font-size: 1.25rem;
    padding: 0.25rem 0.5rem;
    line-height: 1;
    
    &:hover {
      color: #0d6efd;
    }
    
    i {
      display: inline-block;
      font-style: normal;
      font-variant: normal;
      text-rendering: auto;
      line-height: 1;
    }
  }
}

/* Desktop search and icons */
@media (min-width: 768px) {
  .search-container { position: relative; }
  .search-input { padding-right: 2.5rem; }
  .search-container .search-input {
    padding-left: 2rem !important;
    padding-right: 0.75rem;
    height: 2.4rem;
    font-size: 0.9rem;
  }
  
  .search-button {
    position: absolute;
    left: 0.25rem;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background: none;
    font-size: 1rem;
    color: #6c757d;
    z-index: 10;
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
  }
}
</style>
