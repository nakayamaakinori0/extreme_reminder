import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

declare global {
  interface Window {
    electron: {
      showNotification: () => void
      hideNotification: () => void
    }
  }
}

const app = createApp(App)
app.mount('#app')
