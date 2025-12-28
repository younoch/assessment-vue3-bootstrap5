<script setup lang="ts">
import logo from '../../assets/svg/logo.svg'
</script>

<template>
  <header>
    <!-- Mobile & small screens (<768px): logo + hamburger, links in collapsed menu -->
    <nav class="navbar navbar-light bg-light d-md-none">
      <div class="d-flex w-100 justify-content-between align-items-center px-3">
        <RouterLink class="navbar-brand mb-0 h1 d-flex align-items-center gap-2" to="/">
          <img :src="logo" alt="Logo" height="32" />
        </RouterLink>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mobileNavbar"
          aria-controls="mobileNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div class="collapse" id="mobileNavbar">
        <div class="bg-light border-top">
          <div class="container py-2">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/#">Products</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/#">Rooms</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/#">New At IKEA</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/#">All Offer</RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

    <nav class="navbar navbar-expand-md navbar-light bg-light d-none d-md-block">
      <div class="container">
        <div class="d-flex w-100 align-items-center">
          <RouterLink class="navbar-brand me-4" to="/">
            <img :src="logo" alt="Logo" height="36" />
          </RouterLink>

          <ul class="navbar-nav d-flex flex-row">
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
        </div>
      </div>
    </nav>
  </header>
</template>
