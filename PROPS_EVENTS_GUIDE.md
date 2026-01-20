# คู่มือการส่ง Props และ Events ระหว่าง Micro Frontend

## ภาพรวม

ตัวอย่างนี้แสดงวิธีการสื่อสารระหว่าง Main App (Container) และ Sub App (Micro Frontend) โดยใช้:
1. **Props** - ส่งข้อมูลจาก Main App ไปยัง Sub App
2. **Callback Functions** - ส่ง events จาก Sub App กลับไปยัง Main App
3. **Global State** - แชร์ state ระหว่าง apps
4. **Custom Events** - ส่ง events ผ่าน window events

## 1. Props (Main App → Sub App)

### ใน Main App (`main-app/src/main.js`)

```javascript
registerMicroApps([
  {
    name: 'sub-app',
    entry: 'http://localhost:3001',
    container: '#subapp-container',
    activeRule: () => true,
    props: {
      user: {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin'
      },
      theme: 'light',
      config: {
        apiUrl: 'https://api.example.com',
        features: {
          enableNotifications: true,
          enableDarkMode: false
        }
      },
      // Callback functions
      onCounterChange: (value) => {
        console.log('Counter changed:', value)
      },
      onButtonClick: (buttonName) => {
        console.log('Button clicked:', buttonName)
      }
    }
  }
])
```

### ใน Sub App (`sub-app/src/App.vue`)

```vue
<script setup>
import { inject } from 'vue'

// รับ props จาก Main App
const qiankunProps = inject('qiankunProps', {})
const actualProps = qiankunProps || {}

// ใช้งาน props
console.log(actualProps.user) // { name: 'John Doe', email: '...', role: 'Admin' }
console.log(actualProps.theme) // 'light'
</script>
```

## 2. Events (Sub App → Main App)

### วิธีที่ 1: Callback Functions

**Sub App ส่ง event:**
```javascript
// ใน Sub App
if (actualProps.onCounterChange) {
  actualProps.onCounterChange(count.value)
}
```

**Main App รับ event:**
```javascript
// ใน Main App
props: {
  onCounterChange: (value) => {
    console.log('Counter changed:', value)
    // อัพเดท UI หรือ state
  }
}
```

### วิธีที่ 2: Custom Events

**Sub App ส่ง event:**
```javascript
window.dispatchEvent(new CustomEvent('subapp-counter-changed', {
  detail: { value: count.value }
}))
```

**Main App รับ event:**
```javascript
window.addEventListener('subapp-counter-changed', (event) => {
  console.log('Counter changed:', event.detail.value)
})
```

## 3. Global State (Qiankun)

### สร้าง Global State ใน Main App

```javascript
import { initGlobalState } from 'qiankun'

const actions = initGlobalState({
  user: { name: 'John Doe', email: 'john@example.com' },
  theme: 'light',
  counter: 0
})

// ส่ง actions ไปยัง Sub App ผ่าน props
props: {
  setGlobalState: actions.setGlobalState,
  onGlobalStateChange: actions.onGlobalStateChange
}
```

### ใช้ Global State ใน Sub App

```javascript
// ฟัง state changes
if (actualProps.onGlobalStateChange) {
  actualProps.onGlobalStateChange((state, prev) => {
    console.log('State changed:', state, prev)
    // อัพเดท UI
  }, true) // true = เรียกทันทีด้วย
}

// อัพเดท state
if (actualProps.setGlobalState) {
  actualProps.setGlobalState({
    counter: 10,
    theme: 'dark'
  })
}
```

## 4. ตัวอย่างการใช้งาน

### Main App → Sub App (Props)

```javascript
// Main App ส่ง user info
props: {
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  }
}

// Sub App รับและแสดง
<div>User: {{ actualProps.user?.name }}</div>
```

### Sub App → Main App (Events)

```javascript
// Sub App ส่ง counter value
const increment = () => {
  count.value++
  if (actualProps.onCounterChange) {
    actualProps.onCounterChange(count.value)
  }
}

// Main App รับและอัพเดท
onCounterChange: (value) => {
  console.log('Counter:', value)
  // อัพเดท UI
}
```

### Main App ↔ Sub App (Global State)

```javascript
// Main App สร้างและแชร์ state
const actions = initGlobalState({ counter: 0 })

// Sub App อัพเดท state
actualProps.setGlobalState({ counter: 10 })

// Main App รับการเปลี่ยนแปลง
actions.onGlobalStateChange((state) => {
  console.log('New counter:', state.counter)
})
```

## 5. Best Practices

1. **ใช้ Props สำหรับข้อมูลเริ่มต้น** - ส่งข้อมูลที่ Sub App ต้องการตอน mount
2. **ใช้ Callback Functions สำหรับ events** - ง่ายและ type-safe กว่า custom events
3. **ใช้ Global State สำหรับข้อมูลที่แชร์กัน** - เช่น user info, theme, settings
4. **ใช้ Custom Events สำหรับการสื่อสารแบบ loose coupling** - เมื่อไม่ต้องการ dependency โดยตรง

## 6. ตัวอย่างในโค้ด

ดูตัวอย่างการใช้งานได้ที่:
- **Main App**: `main-app/src/main.js` และ `main-app/src/App.vue`
- **Sub App**: `sub-app/src/main.js` และ `sub-app/src/App.vue`

## 7. การทดสอบ

1. รันทั้งสองแอป:
   ```bash
   # Terminal 1
   cd main-app && npm run dev
   
   # Terminal 2
   cd sub-app && npm run dev
   ```

2. เปิดเบราว์เซอร์ไปที่ http://localhost:3000

3. ทดสอบ:
   - ดู Props จาก Main App ใน Sub App
   - คลิกปุ่มใน Sub App เพื่อส่ง events
   - เปลี่ยน counter ใน Sub App และดู Main App อัพเดท
   - ใช้ปุ่มใน Main App เพื่ออัพเดท props
