<template>
  <div class="vue2-app">
    <div class="header">
      <h2>🟡 Vue 2 Sub App (Micro Frontend)</h2>
      <p class="subtitle">นี่คือ Micro Frontend ที่สร้างด้วย Vue 2.7</p>
    </div>

    <div class="content">
      <!-- Counter Example -->
      <div class="card">
        <h3>🟡 Vue 2 Counter</h3>
        <div class="counter">
          <button @click="decrement" class="counter-btn">-</button>
          <span class="count">{{ count }}</span>
          <button @click="increment" class="counter-btn">+</button>
        </div>
        <p class="counter-note">Vue 2 app ทำงานได้แล้ว!</p>
      </div>

      <!-- Vue 2 Features -->
      <div class="card">
        <h3>Features</h3>
        <ul class="features-list">
          <li>✅ Vue 2.7 (Composition API)</li>
          <li>✅ Options API Support</li>
          <li>✅ Qiankun Integration</li>
          <li>✅ Vite Build</li>
        </ul>
      </div>

      <!-- Message Input -->
      <div class="card">
        <h3>📤 ส่งข้อความ</h3>
        <div class="message-section">
          <input
            v-model="message"
            type="text"
            placeholder="พิมพ์ข้อความ..."
            class="message-input"
          />
          <button @click="sendMessage" class="event-btn">ส่ง</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  props: {
    qiankunProps: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      count: 0,
      message: "",
    };
  },
  methods: {
    increment() {
      this.count++;
      this.sendCounterEvent();
    },
    decrement() {
      this.count--;
      this.sendCounterEvent();
    },
    sendCounterEvent() {
      window.dispatchEvent(
        new CustomEvent("vue2-subapp-counter-changed", {
          detail: { value: this.count, source: "vue2-app" },
        }),
      );
      console.log("Vue2 App - Counter event sent:", this.count);
    },
    sendMessage() {
      if (this.message.trim()) {
        window.dispatchEvent(
          new CustomEvent("vue2-subapp-message", {
            detail: {
              message: this.message,
              timestamp: new Date().toISOString(),
            },
          }),
        );
        console.log("Vue2 App - Message sent:", this.message);
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
.vue2-app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  background: linear-gradient(135deg, #35495e 0%, #41b883 100%);
  border-radius: 12px;
  color: #ffffff;
  min-height: 400px;
}

.vue2-app .header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #41b883;
}

.vue2-app .header h2 {
  margin: 0 0 8px 0;
  color: #41b883;
  font-size: 1.8em;
}

.vue2-app .subtitle {
  color: #a8d5ba;
  margin: 0;
  font-size: 0.95em;
}

.vue2-app .content {
  display: grid;
  gap: 16px;
}

.vue2-app .card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(65, 184, 131, 0.3);
  border-radius: 8px;
  padding: 16px;
}

.vue2-app .card h3 {
  margin: 0 0 12px 0;
  color: #41b883;
  font-size: 1.1em;
}

/* Counter Styles */
.vue2-app .counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 16px 0;
}

.vue2-app .counter-btn {
  width: 50px;
  height: 50px;
  font-size: 24px;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  background: #41b883;
  color: #35495e;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vue2-app .counter-btn:hover {
  background: #3aa876;
  transform: scale(1.1);
}

.vue2-app .count {
  font-size: 48px;
  font-weight: bold;
  color: #41b883;
  min-width: 80px;
  text-align: center;
}

.vue2-app .counter-note {
  text-align: center;
  color: #a8d5ba;
  font-size: 0.85em;
  margin: 8px 0 0 0;
}

/* Features List */
.vue2-app .features-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.vue2-app .features-list li {
  padding: 6px 0;
  font-size: 0.9em;
  color: #a8d5ba;
}

/* Message Section */
.vue2-app .message-section {
  display: flex;
  gap: 8px;
}

.vue2-app .message-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid rgba(65, 184, 131, 0.3);
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  font-size: 0.9em;
}

.vue2-app .message-input::placeholder {
  color: #6b9b7a;
}

.vue2-app .message-input:focus {
  outline: none;
  border-color: #41b883;
}

.vue2-app .event-btn {
  padding: 10px 16px;
  background: #41b883;
  color: #35495e;
  border: none;
  border-radius: 6px;
  font-size: 0.9em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vue2-app .event-btn:hover {
  background: #3aa876;
}
</style>
