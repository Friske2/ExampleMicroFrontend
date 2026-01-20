<template>
  <div class="main-app">
    <header class="header">
      <h1>Main App (Container)</h1>
      <p class="subtitle">
        Micro Frontend Example - ทั้งสอง App แสดงในหน้าเดียวกัน
      </p>
    </header>

    <main class="content">
      <!-- Main App Content -->
      <section class="main-section">
        <h2>Welcome to Main App</h2>
        <p>นี่คือ Main Container Application</p>

        <!-- Props & Events Example -->
        <div class="info-card">
          <h3>Props & Events Example</h3>
          <div class="props-section">
            <h4>Props ส่งไปยัง Sub App:</h4>
            <ul>
              <li>
                User: {{ propsData.user?.name }} ({{ propsData.user?.email }})
              </li>
              <li>Theme: {{ propsData.theme }}</li>
              <li>Counter: {{ globalState.counter }}</li>
            </ul>
          </div>

          <div class="events-section">
            <h4>Events จาก Sub App:</h4>
            <div class="event-log">
              <div
                v-for="(event, index) in eventLog"
                :key="index"
                class="event-item"
              >
                <span class="event-time">{{ event.time }}</span>
                <span class="event-type">{{ event.type }}</span>
                <span class="event-data">{{ event.data }}</span>
              </div>
              <div v-if="eventLog.length === 0" class="no-events">
                ยังไม่มี events
              </div>
            </div>
          </div>

          <div class="actions-section">
            <h4>Actions:</h4>
            <button @click="updateUser" class="action-btn">อัพเดท User</button>
            <button @click="toggleTheme" class="action-btn">
              เปลี่ยน Theme
            </button>
            <button @click="sendMessage" class="action-btn">ส่งข้อความ</button>
          </div>
        </div>

        <div class="info-card">
          <h3>Main App Features</h3>
          <ul>
            <li>✅ Vue 3 Composition API</li>
            <li>✅ Qiankun Container</li>
            <li>✅ Load Micro Frontends</li>
            <li>✅ Props & Events Communication</li>
          </ul>
        </div>
      </section>

      <!-- Container สำหรับ Vue micro frontend -->
      <section class="sub-section">
        <h2>🟢 Vue Sub App (Micro Frontend)</h2>
        <div id="subapp-container">
          <div id="sub-app"></div>
        </div>
      </section>

      <!-- Container สำหรับ React micro frontend -->
      <section class="sub-section react-section">
        <h2>⚛️ React Sub App (Micro Frontend)</h2>
        <div id="subapp-react-container">
          <div id="sub-app-react"></div>
        </div>
      </section>

      <!-- Container สำหรับ Vue 2 micro frontend -->
      <section class="sub-section vue2-section">
        <h2>🟡 Vue 2 Sub App (Micro Frontend)</h2>
        <div id="subapp-vue2-container">
          <div id="sub-app-vue2"></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Props ที่ส่งไปยัง Sub App
const propsData = ref({
  user: {
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  theme: "light",
});

// Global State
const globalState = ref({
  counter: 0,
  user: propsData.value.user,
  theme: "light",
});

// Event Log
const eventLog = ref([]);

// ฟังก์ชันสำหรับเพิ่ม event log
const addEventLog = (type, data) => {
  const time = new Date().toLocaleTimeString();
  eventLog.value.unshift({
    time,
    type,
    data: JSON.stringify(data),
  });
  // เก็บแค่ 10 events ล่าสุด
  if (eventLog.value.length > 10) {
    eventLog.value.pop();
  }
};

// ฟังก์ชันสำหรับอัพเดท User
const updateUser = () => {
  const newUser = {
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
  };
  propsData.value.user = newUser;

  // อัพเดท global state
  if (window.qiankunActions) {
    window.qiankunActions.setGlobalState({
      user: newUser,
    });
  }

  addEventLog("User Updated", newUser);
};

// ฟังก์ชันสำหรับเปลี่ยน Theme
const toggleTheme = () => {
  const newTheme = propsData.value.theme === "light" ? "dark" : "light";
  propsData.value.theme = newTheme;
  globalState.value.theme = newTheme;

  // อัพเดท global state
  if (window.qiankunActions) {
    window.qiankunActions.setGlobalState({
      theme: newTheme,
    });
  }

  addEventLog("Theme Changed", { theme: newTheme });
};

// ฟังก์ชันสำหรับส่งข้อความ
const sendMessage = () => {
  const message = {
    text: "Hello from Main App!",
    timestamp: new Date().toISOString(),
  };

  // ส่งผ่าน custom event
  window.dispatchEvent(
    new CustomEvent("main-app-message", { detail: message }),
  );
  addEventLog("Message Sent", message);
};

// ฟังก์ชันสำหรับรับ events จาก Sub App
const handleSubAppCounterChange = (event) => {
  globalState.value.counter = event.detail.value;
  addEventLog("Vue Counter Changed", { value: event.detail.value });
};

// ฟังก์ชันสำหรับรับ events จาก React Sub App
const handleReactSubAppCounterChange = (event) => {
  globalState.value.counter = event.detail.value;
  addEventLog("React Counter Changed", {
    value: event.detail.value,
    source: event.detail.source,
  });
};

const handleReactSubAppMessage = (event) => {
  addEventLog("React Message", { message: event.detail.message });
};

// ฟังก์ชันสำหรับรับ events จาก Vue 2 Sub App
const handleVue2SubAppCounterChange = (event) => {
  globalState.value.counter = event.detail.value;
  addEventLog("Vue2 Counter Changed", {
    value: event.detail.value,
    source: event.detail.source,
  });
};

const handleVue2SubAppMessage = (event) => {
  addEventLog("Vue2 Message", { message: event.detail.message });
};

// ฟังก์ชันสำหรับรับ global state changes
const handleGlobalStateChange = (state, prev) => {
  console.log("Global state changed:", state, prev);
  if (state.counter !== undefined) {
    globalState.value.counter = state.counter;
  }
  if (state.user) {
    globalState.value.user = state.user;
  }
  if (state.theme) {
    globalState.value.theme = state.theme;
  }
};

// เก็บ reference ของ micro apps
const microApps = { vueApp: null, reactApp: null, vue2App: null };

onMounted(() => {
  // ฟัง events จาก Vue Sub App
  window.addEventListener("subapp-counter-changed", handleSubAppCounterChange);

  // ฟัง events จาก React Sub App
  window.addEventListener(
    "react-subapp-counter-changed",
    handleReactSubAppCounterChange,
  );
  window.addEventListener("react-subapp-message", handleReactSubAppMessage);

  // ฟัง events จาก Vue 2 Sub App
  window.addEventListener(
    "vue2-subapp-counter-changed",
    handleVue2SubAppCounterChange,
  );
  window.addEventListener("vue2-subapp-message", handleVue2SubAppMessage);

  // ฟัง global state changes
  if (window.qiankunActions) {
    window.qiankunActions.onGlobalStateChange(handleGlobalStateChange, true);
  }

  // โหลด Micro Apps หลังจาก DOM พร้อม (ใช้ nextTick เพื่อให้แน่ใจว่า DOM render แล้ว)
  setTimeout(() => {
    // โหลด Vue Sub App ก่อน
    const vueContainer = document.getElementById("subapp-container");
    if (vueContainer && window.loadMicroApp) {
      microApps.vueApp = window.loadMicroApp({
        name: "sub-app-vue",
        entry: "http://localhost:3001",
        container: vueContainer,
        props: window.getSubAppProps(),
      });
    }

    // โหลด React Sub App หลังจาก Vue โหลดเสร็จ
    setTimeout(() => {
      const reactContainer = document.getElementById("subapp-react-container");
      if (reactContainer && window.loadMicroApp) {
        microApps.reactApp = window.loadMicroApp({
          name: "sub-app-react",
          entry: "http://localhost:3002",
          container: reactContainer,
          props: window.getSubAppProps(),
        });
      }

      // โหลด Vue 2 Sub App
      setTimeout(() => {
        const vue2Container = document.getElementById("subapp-vue2-container");
        if (vue2Container && window.loadMicroApp) {
          microApps.vue2App = window.loadMicroApp({
            name: "sub-app-vue2",
            entry: "http://localhost:3003",
            container: vue2Container,
            props: window.getSubAppProps(),
          });
        }
      }, 100);
    }, 100);
  }, 0);
});

onUnmounted(() => {
  window.removeEventListener(
    "subapp-counter-changed",
    handleSubAppCounterChange,
  );
  window.removeEventListener(
    "react-subapp-counter-changed",
    handleReactSubAppCounterChange,
  );
  window.removeEventListener("react-subapp-message", handleReactSubAppMessage);
  window.removeEventListener(
    "vue2-subapp-counter-changed",
    handleVue2SubAppCounterChange,
  );
  window.removeEventListener("vue2-subapp-message", handleVue2SubAppMessage);

  // Unmount micro apps
  if (microApps.vueApp) {
    microApps.vueApp.unmount();
  }
  if (microApps.reactApp) {
    microApps.reactApp.unmount();
  }
  if (microApps.vue2App) {
    microApps.vue2App.unmount();
  }
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
}

.main-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  color: #333;
  margin-bottom: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
}

nav a {
  color: #667eea;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

nav a:hover {
  background: #f0f0f0;
}

.content {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

@media (max-width: 968px) {
  .content {
    grid-template-columns: 1fr;
  }
}

.main-section,
.sub-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.main-section h2,
.sub-section h2 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.main-section p {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.info-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;
  border-left: 4px solid #667eea;
}

.info-card h3 {
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.info-card ul {
  list-style: none;
  padding: 0;
}

.info-card li {
  color: #555;
  padding: 0.3rem 0;
}

.props-section,
.events-section,
.actions-section {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.props-section h4,
.events-section h4,
.actions-section h4 {
  color: #667eea;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.event-log {
  max-height: 150px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 0.5rem;
}

.event-item {
  display: flex;
  gap: 0.5rem;
  padding: 0.3rem 0;
  font-size: 0.85rem;
  border-bottom: 1px solid #f0f0f0;
}

.event-item:last-child {
  border-bottom: none;
}

.event-time {
  color: #999;
  font-family: monospace;
  min-width: 80px;
}

.event-type {
  color: #667eea;
  font-weight: bold;
  min-width: 120px;
}

.event-data {
  color: #666;
  flex: 1;
  word-break: break-all;
}

.no-events {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

.action-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #5568d3;
}

.header .subtitle {
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

#subapp-container {
  min-height: 400px;
}
</style>
