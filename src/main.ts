import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'

// Import main SCSS file
import './assets/scss/style.scss'

// Bootstrap JS (with Popper)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
