<template>
  <div class="vue3-subapp">
    <div class="vue3-subapp__header">
      <h2>Sub App (Micro Frontend)</h2>
      <p class="vue3-subapp__subtitle">
        นี่คือ Micro Frontend ที่ถูกโหลดจาก Main App
      </p>
    </div>

    <div class="vue3-subapp__content">
      <!-- Props จาก Main App -->
      <div class="vue3-subapp__card vue3-subapp__card--props">
        <h3>📥 Props จาก Main App ทดสอบ helloworld</h3>
        <div class="vue3-subapp__props-list">
          <div class="vue3-subapp__prop-item">
            <strong>User:</strong> {{ props?.user?.name }} ({{
              props?.user?.email
            }})
          </div>
          <div class="vue3-subapp__prop-item">
            <strong>Role:</strong> {{ props?.user?.role }}
          </div>
          <div class="vue3-subapp__prop-item">
            <strong>Theme:</strong> {{ props?.theme }}
          </div>
          <div class="vue3-subapp__prop-item">
            <strong>API URL:</strong> {{ props?.config?.apiUrl }}
          </div>
        </div>
      </div>

      <!-- Counter Example -->
      <div class="vue3-subapp__card">
        <h3>Counter Example</h3>
        <div class="vue3-subapp__counter">
          <button @click="decrement">-</button>
          <span class="vue3-subapp__count">{{ count }}</span>
          <button @click="increment">+</button>
        </div>
        <p class="vue3-subapp__note">
          เมื่อเปลี่ยนค่า counter จะส่ง event ไปยัง Main App
        </p>
      </div>

      <!-- Events to Main App -->
      <div class="vue3-subapp__card">
        <h3>📤 Events ส่งไปยัง Main App</h3>
        <div class="vue3-subapp__event-buttons">
          <button @click="sendCounterEvent" class="vue3-subapp__btn">
            ส่ง Counter Event
          </button>
          <button @click="sendButtonClickEvent" class="vue3-subapp__btn">
            ส่ง Button Click Event
          </button>
          <button @click="updateUserInfo" class="vue3-subapp__btn">
            อัพเดท User Info
          </button>
        </div>
      </div>

      <!-- Global State -->
      <div class="vue3-subapp__card" v-if="globalState">
        <h3>🌐 Global State</h3>
        <div class="vue3-subapp__state-info">
          <p><strong>Counter:</strong> {{ globalState.counter }}</p>
          <p><strong>Theme:</strong> {{ globalState.theme }}</p>
          <p><strong>User:</strong> {{ globalState.user?.name }}</p>
        </div>
      </div>

      <div class="vue3-subapp__card">
        <h3>Features</h3>
        <ul class="vue3-subapp__list">
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
import { ref, onMounted, onUnmounted, inject } from "vue";

// รับ props จาก Main App ผ่าน provide/inject
const qiankunProps = inject("qiankunProps", {});
const actualProps = qiankunProps || {};

const count = ref(0);
const globalState = ref(null);

// ฟังก์ชันสำหรับส่ง events ไปยัง Main App
const sendCounterEvent = () => {
  count.value++;

  // ส่งผ่าน callback function
  if (actualProps.onCounterChange) {
    actualProps.onCounterChange(count.value);
  }

  // ส่งผ่าน custom event
  window.dispatchEvent(
    new CustomEvent("subapp-counter-changed", {
      detail: { value: count.value },
    }),
  );

  console.log("Counter event sent:", count.value);
};

const sendButtonClickEvent = () => {
  const buttonName = "Test Button";

  // ส่งผ่าน callback function
  if (actualProps.onButtonClick) {
    actualProps.onButtonClick(buttonName);
  }

  console.log("Button click event sent:", buttonName);
};

const updateUserInfo = () => {
  const updatedUser = {
    name: "Updated User",
    email: "updated@example.com",
    role: "Updated Role",
  };

  // ส่งผ่าน callback function
  if (actualProps.onUserUpdate) {
    actualProps.onUserUpdate(updatedUser);
  }

  console.log("User update event sent:", updatedUser);
};

const increment = () => {
  sendCounterEvent();
};

const decrement = () => {
  count.value--;

  // ส่ง event เมื่อลดค่า
  if (actualProps.onCounterChange) {
    actualProps.onCounterChange(count.value);
  }

  window.dispatchEvent(
    new CustomEvent("subapp-counter-changed", {
      detail: { value: count.value },
    }),
  );
};

// ฟังก์ชันสำหรับรับ global state changes
const handleGlobalStateChange = (state, prev) => {
  console.log("Global state changed in Sub App:", state, prev);
  globalState.value = state;
};

// ฟังก์ชันสำหรับรับ messages จาก Main App
const handleMainAppMessage = (event) => {
  console.log("Message from Main App:", event.detail);
  alert(`Message from Main App: ${event.detail.text}`);
};

onMounted(() => {
  // ตั้งค่า global state listener
  if (actualProps.onGlobalStateChange) {
    actualProps.onGlobalStateChange(handleGlobalStateChange, true);
  }

  // ฟัง messages จาก Main App
  window.addEventListener("main-app-message", handleMainAppMessage);

  // ตั้งค่า initial global state
  if (actualProps.setGlobalState) {
    globalState.value = {
      counter: count.value,
      theme: actualProps.theme || "light",
      user: actualProps.user || {},
    };
  }
});

onUnmounted(() => {
  window.removeEventListener("main-app-message", handleMainAppMessage);
});
</script>

<style scoped>
/* ============================================
   Vue 3 Sub App - Scoped Styles with BEM
   Prefix: vue3-subapp
   ============================================ */

.vue3-subapp {
  width: 100%;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
  border-radius: 12px;
  padding: 20px;
  min-height: 400px;
}

.vue3-subapp__header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #667eea;
}

.vue3-subapp__header h2 {
  color: #667eea;
  margin: 0 0 0.5rem 0;
  font-size: 1.5em;
}

.vue3-subapp__subtitle {
  color: #666;
  font-size: 0.9rem;
  margin: 0;
}

.vue3-subapp__content {
  display: grid;
  gap: 1.5rem;
}

.vue3-subapp__card {
  background: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.vue3-subapp__card h3 {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.1em;
}

.vue3-subapp__card--props {
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
}

.vue3-subapp__props-list {
  margin-top: 0.5rem;
}

.vue3-subapp__prop-item {
  padding: 0.5rem 0;
  color: #555;
  border-bottom: 1px solid #e0e0e0;
}

.vue3-subapp__prop-item:last-child {
  border-bottom: none;
}

.vue3-subapp__prop-item strong {
  color: #667eea;
  margin-right: 0.5rem;
}

.vue3-subapp__counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.vue3-subapp__counter button {
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

.vue3-subapp__counter button:hover {
  background: #5568d3;
}

.vue3-subapp__count {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  min-width: 60px;
  text-align: center;
}

.vue3-subapp__note {
  font-size: 0.85rem;
  color: #999;
  text-align: center;
  margin: 0.5rem 0 0;
  font-style: italic;
}

.vue3-subapp__list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vue3-subapp__list li {
  padding: 0.5rem 0;
  color: #555;
}

.vue3-subapp__event-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.vue3-subapp__btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 0.9rem;
}

.vue3-subapp__btn:hover {
  background: #218838;
}

.vue3-subapp__state-info {
  margin-top: 0.5rem;
}

.vue3-subapp__state-info p {
  padding: 0.3rem 0;
  color: #555;
  margin: 0;
}

.vue3-subapp__state-info strong {
  color: #667eea;
  margin-right: 0.5rem;
}
</style>
