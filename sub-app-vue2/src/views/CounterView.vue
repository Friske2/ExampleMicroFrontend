<template>
  <div class="vue2-subapp__counter-view">
    <h3>🔢 Counter Page</h3>
    <p>ทดสอบ State Management ใน Vue 2 Router</p>

    <div class="vue2-subapp__counter-card">
      <div class="vue2-subapp__counter">
        <button @click="decrement" class="vue2-subapp__counter-btn">-</button>
        <span class="vue2-subapp__count">{{ count }}</span>
        <button @click="increment" class="vue2-subapp__counter-btn">+</button>
      </div>
      <p class="vue2-subapp__counter-info">Counter: {{ count }}</p>
    </div>

    <div class="vue2-subapp__message-card">
      <h4>📤 ส่งข้อความไปยัง Main App</h4>
      <div class="vue2-subapp__message-input">
        <input
          v-model="message"
          type="text"
          placeholder="พิมพ์ข้อความ..."
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage">ส่ง</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CounterView",
  data() {
    return {
      count: 0,
      message: "",
    };
  },
  methods: {
    increment() {
      this.count++;
      this.emitCounterEvent();
    },
    decrement() {
      this.count--;
      this.emitCounterEvent();
    },
    emitCounterEvent() {
      window.dispatchEvent(
        new CustomEvent("vue2-subapp-counter-changed", {
          detail: { value: this.count, source: "vue2-counter-view" },
        }),
      );
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
        this.message = "";
      }
    },
  },
};
</script>

<style scoped>
.vue2-subapp__counter-view {
  padding: 20px;
}

.vue2-subapp__counter-view h3 {
  margin-bottom: 10px;
  color: #e6a700;
}

.vue2-subapp__counter-view > p {
  color: #666;
  margin-bottom: 20px;
}

.vue2-subapp__counter-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 16px;
}

.vue2-subapp__counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 10px;
}

.vue2-subapp__counter-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f59e0b;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  transition: background 0.2s;
}

.vue2-subapp__counter-btn:hover {
  background: #d97706;
}

.vue2-subapp__count {
  font-size: 2em;
  font-weight: bold;
  color: #b45309;
  min-width: 60px;
}

.vue2-subapp__counter-info {
  color: #92400e;
  margin: 0;
}

.vue2-subapp__message-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
}

.vue2-subapp__message-card h4 {
  margin: 0 0 12px;
  color: #b45309;
}

.vue2-subapp__message-input {
  display: flex;
  gap: 8px;
}

.vue2-subapp__message-input input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #fcd34d;
  border-radius: 6px;
  font-size: 14px;
}

.vue2-subapp__message-input button {
  padding: 8px 16px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.vue2-subapp__message-input button:hover {
  background: #d97706;
}
</style>
