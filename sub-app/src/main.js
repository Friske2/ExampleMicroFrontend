import { createApp } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app = null
let qiankunProps = null

function render(props = {}) {
  const { container } = props
  
  // เก็บ props เพื่อให้ App component ใช้งานได้
  qiankunProps = props
  
  // หา element ที่จะ mount
  const mountElement = container 
    ? (container.querySelector('#sub-app') || container)
    : document.querySelector('#sub-app')
  
  // สร้าง app และส่ง props ผ่าน provide
  app = createApp(App)
  
  // Provide props เพื่อให้ component ใช้งานได้
  app.provide('qiankunProps', props)
  
  app.mount(mountElement)
}

// ใช้ vite-plugin-qiankun helper
renderWithQiankun({
  bootstrap() {
    console.log('Sub App bootstraped')
  },
  mount(props) {
    console.log('Sub App mounted', props)
    render(props)
  },
  unmount() {
    console.log('Sub App unmounted')
    if (app) {
      app.unmount()
      app = null
    }
    qiankunProps = null
  }
})

// สำหรับ development mode (รัน standalone)
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({
    user: {
      name: 'Test User',
      email: 'test@example.com',
      role: 'User'
    },
    theme: 'light',
    config: {
      apiUrl: 'https://api.example.com',
      features: {
        enableNotifications: true,
        enableDarkMode: false
      }
    }
  })
}

// Export function เพื่อให้ App component ใช้งาน props
export function getQiankunProps() {
  return qiankunProps
}
