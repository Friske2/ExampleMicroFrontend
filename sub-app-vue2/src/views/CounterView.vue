<template>
  <div class="counter-view">
    <h3>🔢 Counter Page</h3>
    <p>ทดสอบ State Management ใน Vue 2 Router</p>

    <div class="counter-card">
      <div class="counter">
        <button @click="decrement" class="counter-btn">-</button>
        <span class="count">{{ count }}</span>
        <button @click="increment" class="counter-btn">+</button>
      </div>
      <p class="counter-info">Counter: {{ count }}</p>
    </div>

    <div class="message-card">
      <h4>📤 ส่งข้อความไปยัง Main App</h4>
      <div class="message-input-group">
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
.counter-view {
  padding: 20px;
}

.counter-view h3 {
  margin-bottom: 10px;
  color: #e6a700;
}

.counter-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 16px;
}

.counter {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 10px;
}

.counter-btn {
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

.counter-btn:hover {
  background: #d97706;
}

.count {
  font-size: 2em;
  font-weight: bold;
  color: #b45309;
  min-width: 60px;
}

.counter-info {
  color: #92400e;
  margin: 0;
}

.message-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
}

.message-card h4 {
  margin: 0 0 12px;
  color: #b45309;
}

.message-input-group {
  display: flex;
  gap: 8px;
}

.message-input-group input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #fcd34d;
  border-radius: 6px;
  font-size: 14px;
}

.message-input-group button {
  padding: 8px 16px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.message-input-group button:hover {
  background: #d97706;
}
</style>
