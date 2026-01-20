import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { loadMicroApp, initGlobalState } from "qiankun";

// สร้าง Global State สำหรับการสื่อสารระหว่าง apps
const actions = initGlobalState({
  user: {
    name: "John Doe",
    email: "john@example.com",
  },
  theme: "light",
  counter: 0,
});

// ฟังก์ชันสำหรับส่ง props ไปยัง Sub App
const getSubAppProps = () => ({
  user: {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  theme: "light",
  config: {
    apiUrl: "https://api.example.com",
  },
  setGlobalState: actions.setGlobalState,
  onGlobalStateChange: actions.onGlobalStateChange,
});

// Export ให้ Vue component ใช้งาน
window.qiankunActions = actions;
window.loadMicroApp = loadMicroApp;
window.getSubAppProps = getSubAppProps;

const app = createApp(App);
app.use(router);
app.mount("#app");
