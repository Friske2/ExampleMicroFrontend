# Micro Frontend Project with Vue 2, Vue 3, React + Qiankun

โปรเจกต์ตัวอย่าง Micro Frontend ที่รองรับหลาย Framework (Vue 2, Vue 3, React) โดยใช้ Qiankun

## 🎯 จุดเด่นของโปรเจคนี้

- ✅ **Multi-Framework Support** - Vue 2, Vue 3, React ทำงานร่วมกันได้
- ✅ **Qiankun Framework** สำหรับจัดการ Micro Frontend
- ✅ **Vite** สำหรับ build tool ที่รวดเร็ว
- ✅ **Style Isolation** - CSS แต่ละ app ไม่ conflict กัน
- ✅ **Props & Events** - สื่อสารระหว่าง apps ได้
- ✅ **Global State** - แชร์ state ระหว่าง apps
- ✅ **Standalone Mode** - แต่ละ app รันเดี่ยวได้

---

## 📁 โครงสร้างโปรเจกต์

```
microFrontend/
├── main-app/              # 🏠 Main Container App (Port 3000)
│   ├── src/
│   │   ├── App.vue        # Container component
│   │   └── main.js        # Qiankun setup
│   ├── package.json
│   └── vite.config.js
│
├── sub-app/               # 🟢 Vue 3 Sub App (Port 3001)
│   ├── src/
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── vite.config.js
│
├── sub-app-react/         # ⚛️ React Sub App (Port 3002)
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── sub-app-vue2/          # 🟡 Vue 2 Sub App (Port 3003)
    ├── src/
    │   ├── App.vue
    │   └── main.js
    ├── package.json
    └── vite.config.js
```

---

## 🚀 การติดตั้งและรัน

### 1. ติดตั้ง Dependencies ทั้งหมด

```bash
# ติดตั้งทุก app พร้อมกัน
npm run install:all

# หรือติดตั้งแยกแต่ละ app
cd main-app && npm install
cd ../sub-app && npm install
cd ../sub-app-react && npm install
cd ../sub-app-vue2 && npm install
```

### 2. รัน Development Mode

เปิด **4 terminals** แล้วรันคำสั่งดังนี้:

```bash
# Terminal 1 - Main App (Port 3000)
cd main-app && npm run dev

# Terminal 2 - Vue 3 Sub App (Port 3001)
cd sub-app && npm run dev

# Terminal 3 - React Sub App (Port 3002)
cd sub-app-react && npm run dev

# Terminal 4 - Vue 2 Sub App (Port 3003)
cd sub-app-vue2 && npm run dev
```

### 3. ทดสอบ

เปิดเบราว์เซอร์ไปที่ **http://localhost:3000**

จะเห็น:

- Main App Container
- Vue 3 Sub App (สีเขียว)
- React Sub App (สีฟ้า)
- Vue 2 Sub App (สีเขียวอ่อน)

---

## 🏗️ Build สำหรับ Production

### Build ทุก App

```bash
cd main-app && npm run build
cd ../sub-app && npm run build
cd ../sub-app-react && npm run build
cd ../sub-app-vue2 && npm run build
```

### Preview Production Build

```bash
# Terminal 1
cd main-app && npm run preview

# Terminal 2
cd sub-app && npm run preview

# Terminal 3
cd sub-app-react && npm run preview

# Terminal 4
cd sub-app-vue2 && npm run preview
```

---

## 📖 วิธี Implement Micro Frontend

### Step 1: สร้าง Main App (Container)

**main-app/src/main.js**

```javascript
import { createApp } from "vue";
import App from "./App.vue";
import { loadMicroApp, initGlobalState } from "qiankun";

// สร้าง Global State
const actions = initGlobalState({
  user: { name: "John", email: "john@example.com" },
  theme: "light",
});

// Export ให้ Vue component ใช้
window.loadMicroApp = loadMicroApp;
window.qiankunActions = actions;

const app = createApp(App);
app.mount("#app");
```

**main-app/src/App.vue** - โหลด micro apps ใน onMounted

```javascript
onMounted(() => {
  // โหลด Vue 3 Sub App
  loadMicroApp({
    name: "sub-app-vue",
    entry: "http://localhost:3001",
    container: document.getElementById("subapp-container"),
    props: {
      /* props */
    },
  });

  // โหลด React Sub App
  loadMicroApp({
    name: "sub-app-react",
    entry: "http://localhost:3002",
    container: document.getElementById("subapp-react-container"),
    props: {
      /* props */
    },
  });
});
```

### Step 2: สร้าง Sub App (Vue 3)

**sub-app/vite.config.js**

```javascript
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  plugins: [vue(), qiankun("sub-app-vue", { useDevMode: !isProduction })],
  base: "http://localhost:3001/",
});
```

**sub-app/src/main.js**

```javascript
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

function render(props) {
  app = createApp(App);
  app.provide("qiankunProps", props);
  app.mount(container);
}

renderWithQiankun({
  bootstrap() {
    console.log("bootstrapped");
  },
  mount(props) {
    render(props);
  },
  unmount() {
    app.unmount();
  },
});

// Standalone mode
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
```

### Step 3: สร้าง Sub App (React)

**sub-app-react/vite.config.js** - ⚠️ ไม่ใช้ React plugin เพื่อหลีกเลี่ยง HMR conflict

```javascript
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  plugins: [qiankun("sub-app-react", { useDevMode: !isProduction })],
  esbuild: {
    jsx: "automatic", // ใช้ esbuild แทน React plugin
  },
  base: "http://localhost:3002/",
});
```

**sub-app-react/src/main.jsx**

```javascript
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

function render(container) {
  root = ReactDOM.createRoot(
    container || document.getElementById("sub-app-react"),
  );
  root.render(<App />);
}

renderWithQiankun({
  bootstrap() {
    console.log("bootstrapped");
  },
  mount(props) {
    render(props.container);
  },
  unmount() {
    root.unmount();
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render(null);
}
```

### Step 4: สร้าง Sub App (Vue 2)

**sub-app-vue2/vite.config.js**

```javascript
import vue2 from "@vitejs/plugin-vue2";
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  plugins: [vue2(), qiankun("sub-app-vue2", { useDevMode: !isProduction })],
  base: "http://localhost:3003/",
});
```

**sub-app-vue2/src/main.js**

```javascript
import Vue from "vue";

function render(props) {
  app = new Vue({
    render: (h) => h(App, { props: { qiankunProps: props } }),
  }).$mount(container);
}

renderWithQiankun({
  bootstrap() {
    console.log("bootstrapped");
  },
  mount(props) {
    render(props);
  },
  unmount() {
    app.$destroy();
  },
});
```

---

## ⚠️ ปัญหาที่พบและวิธีแก้ไข

### 1. React Refresh Error

```
[import-html-entry]: error occurs while executing script... /@react-refresh
```

**แก้ไข:** ไม่ใช้ `@vitejs/plugin-react` ใช้ `esbuild.jsx: "automatic"` แทน

### 2. Apps แสดงสลับตำแหน่ง / ไม่แสดง

**แก้ไข:** ใช้ `loadMicroApp()` แทน `registerMicroApps()` + `start()`

### 3. Assets โหลดไม่ได้ใน Production

**แก้ไข:** ตั้ง `base: "http://localhost:300x/"` เป็น full URL

### 4. useDevMode ต้องปิดใน Production

**แก้ไข:** `useDevMode: process.env.NODE_ENV !== "production"`

---

## 📡 การสื่อสารระหว่าง Apps

### Props (Main → Sub)

```javascript
// Main App
loadMicroApp({
  props: { user: {...}, theme: "light" }
});

// Sub App
const props = inject("qiankunProps");
```

### Events (Sub → Main)

```javascript
// Sub App
window.dispatchEvent(new CustomEvent("my-event", { detail: data }));

// Main App
window.addEventListener("my-event", (e) => console.log(e.detail));
```

### Global State

```javascript
// Main App
const actions = initGlobalState({ counter: 0 });
props.setGlobalState = actions.setGlobalState;

// Sub App
props.setGlobalState({ counter: 1 });
```

---

## 📚 อ้างอิง

- [Qiankun Documentation](https://qiankun.umijs.org/)
- [vite-plugin-qiankun](https://github.com/nicholidev/vite-plugin-qiankun)
- [Vue 3 Documentation](https://vuejs.org/)
- [React Documentation](https://react.dev/)
- [Vue 2 Documentation](https://v2.vuejs.org/)
