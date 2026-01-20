<template>
  <div class="subapp-view">
    <div class="view-header">
      <router-link to="/" class="back-btn">← กลับหน้าแรก</router-link>
      <h2>🟢 Vue 3 Sub App</h2>
    </div>
    <div id="subapp-vue3-container" class="subapp-container">
      <div id="sub-app"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from "vue";

let microApp = null;

onMounted(async () => {
  await nextTick();

  const container = document.getElementById("subapp-vue3-container");
  if (container && window.loadMicroApp) {
    microApp = window.loadMicroApp({
      name: "sub-app-vue",
      entry: "http://localhost:3001",
      container: container,
      props: window.getSubAppProps ? window.getSubAppProps() : {},
    });
  }
});

onUnmounted(() => {
  if (microApp) {
    microApp.unmount();
    microApp = null;
  }
});
</script>

<style scoped>
.subapp-view {
  padding: 20px;
}

.view-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.view-header h2 {
  margin: 0;
  color: #42b883;
}

.back-btn {
  color: #667eea;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  background: #f0f0f0;
  transition: background 0.2s;
}

.back-btn:hover {
  background: #e0e0e0;
}

.subapp-container {
  min-height: 500px;
  border-radius: 12px;
  overflow: hidden;
}
</style>
