<template>
  <div class="sub-app">
    <div class="header">
      <h2>Sub App (Micro Frontend)</h2>
      <p class="subtitle">นี่คือ Micro Frontend ที่ถูกโหลดจาก Main App</p>
    </div>
    
    <div class="content">
      <!-- Props จาก Main App -->
      <div class="card props-card">
        <h3>📥 Props จาก Main App ทดสอบ helloworld</h3>
        <div class="props-list">
          <div class="prop-item">
            <strong>User:</strong> {{ props?.user?.name }} ({{ props?.user?.email }})
          </div>
          <div class="prop-item">
            <strong>Role:</strong> {{ props?.user?.role }}
          </div>
          <div class="prop-item">
            <strong>Theme:</strong> {{ props?.theme }}
          </div>
          <div class="prop-item">
            <strong>API URL:</strong> {{ props?.config?.apiUrl }}
          </div>
        </div>
      </div>

      <!-- Counter Example -->
      <div class="card">
        <h3>Counter Example</h3>
        <div class="counter">
          <button @click="decrement">-</button>
          <span class="count">{{ count }}</span>
          <button @click="increment">+</button>
        </div>
        <p class="counter-note">เมื่อเปลี่ยนค่า counter จะส่ง event ไปยัง Main App</p>
      </div>
      
      <!-- Events to Main App -->
      <div class="card">
        <h3>📤 Events ส่งไปยัง Main App</h3>
        <div class="event-buttons">
          <button @click="sendCounterEvent" class="event-btn">
            ส่ง Counter Event
          </button>
          <button @click="sendButtonClickEvent" class="event-btn">
            ส่ง Button Click Event
          </button>
          <button @click="updateUserInfo" class="event-btn">
            อัพเดท User Info
          </button>
        </div>
      </div>

      <!-- Global State -->
      <div class="card" v-if="globalState">
        <h3>🌐 Global State</h3>
        <div class="state-info">
          <p><strong>Counter:</strong> {{ globalState.counter }}</p>
          <p><strong>Theme:</strong> {{ globalState.theme }}</p>
          <p><strong>User:</strong> {{ globalState.user?.name }}</p>
        </div>
      </div>
      
      <div class="card">
        <h3>Features</h3>
        <ul>
          <li>✅ Vue 3 Composition API</li>
          <li>✅ Qiankun Integration</li>
          <li>✅ Props & Events Communication</li>
          <li>✅ Global State Management</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'

// รับ props จาก Main App ผ่าน provide/inject
const qiankunProps = inject('qiankunProps', {})
const actualProps = qiankunProps || {}

const count = ref(0)
const globalState = ref(null)

// ฟังก์ชันสำหรับส่ง events ไปยัง Main App
const sendCounterEvent = () => {
  count.value++
  
  // ส่งผ่าน callback function
  if (actualProps.onCounterChange) {
    actualProps.onCounterChange(count.value)
  }
  
  // ส่งผ่าน custom event
  window.dispatchEvent(new CustomEvent('subapp-counter-changed', {
    detail: { value: count.value }
  }))
  
  console.log('Counter event sent:', count.value)
}

const sendButtonClickEvent = () => {
  const buttonName = 'Test Button'
  
  // ส่งผ่าน callback function
  if (actualProps.onButtonClick) {
    actualProps.onButtonClick(buttonName)
  }
  
  console.log('Button click event sent:', buttonName)
}

const updateUserInfo = () => {
  const updatedUser = {
    name: 'Updated User',
    email: 'updated@example.com',
    role: 'Updated Role'
  }
  
  // ส่งผ่าน callback function
  if (actualProps.onUserUpdate) {
    actualProps.onUserUpdate(updatedUser)
  }
  
  console.log('User update event sent:', updatedUser)
}

const increment = () => {
  sendCounterEvent()
}

const decrement = () => {
  count.value--
  
  // ส่ง event เมื่อลดค่า
  if (actualProps.onCounterChange) {
    actualProps.onCounterChange(count.value)
  }
  
  window.dispatchEvent(new CustomEvent('subapp-counter-changed', {
    detail: { value: count.value }
  }))
}

// ฟังก์ชันสำหรับรับ global state changes
const handleGlobalStateChange = (state, prev) => {
  console.log('Global state changed in Sub App:', state, prev)
  globalState.value = state
}

// ฟังก์ชันสำหรับรับ messages จาก Main App
const handleMainAppMessage = (event) => {
  console.log('Message from Main App:', event.detail)
  alert(`Message from Main App: ${event.detail.text}`)
}

onMounted(() => {
  // ตั้งค่า global state listener
  if (actualProps.onGlobalStateChange) {
    actualProps.onGlobalStateChange(handleGlobalStateChange, true)
  }
  
  // ฟัง messages จาก Main App
  window.addEventListener('main-app-message', handleMainAppMessage)
  
  // ตั้งค่า initial global state
  if (actualProps.setGlobalState) {
    globalState.value = {
      counter: count.value,
      theme: actualProps.theme || 'light',
      user: actualProps.user || {}
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('main-app-message', handleMainAppMessage)
})
</script>

<style scoped>
.sub-app {
  width: 100%;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #667eea;
}

.header h2 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 0.9rem;
}

.content {
  display: grid;
  gap: 1.5rem;
}

.card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.card h3 {
  color: #333;
  margin-bottom: 1rem;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.counter button {
  background: #667eea;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s;
}

.counter button:hover {
  background: #5568d3;
}

.count {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  min-width: 60px;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  padding: 0.5rem 0;
  color: #555;
}

.card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.props-card {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}

.props-list {
  margin-top: 0.5rem;
}

.prop-item {
  padding: 0.5rem 0;
  color: #555;
  border-bottom: 1px solid #e0e0e0;
}

.prop-item:last-child {
  border-bottom: none;
}

.prop-item strong {
  color: #667eea;
  margin-right: 0.5rem;
}

.counter-note {
  font-size: 0.85rem;
  color: #999;
  text-align: center;
  margin-top: 0.5rem;
  font-style: italic;
}

.event-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.event-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 0.9rem;
}

.event-btn:hover {
  background: #218838;
}

.state-info {
  margin-top: 0.5rem;
}

.state-info p {
  padding: 0.3rem 0;
  color: #555;
}

.state-info strong {
  color: #667eea;
  margin-right: 0.5rem;
}
</style>
