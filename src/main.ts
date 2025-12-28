import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import main SCSS file
import './assets/scss/style.scss'

// Bootstrap JS (with Popper)
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

createApp(App)
.use(router)
.mount('#app')
