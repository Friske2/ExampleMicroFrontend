<template>
  <div class="vue2-subapp__home">
    <h3>🏠 หน้าแรก (Vue 2 Sub App)</h3>
    <p>ยินดีต้อนรับสู่ Vue 2 Micro Frontend พร้อม Router</p>

    <div class="vue2-subapp__features">
      <div class="vue2-subapp__feature-card">
        <span class="vue2-subapp__icon">🟡</span>
        <h4>Vue 2.7</h4>
        <p>รองรับ Composition API</p>
      </div>
      <div class="vue2-subapp__feature-card">
        <span class="vue2-subapp__icon">🛤️</span>
        <h4>Vue Router 3</h4>
        <p>Nested Routing ใน Micro Frontend</p>
      </div>
      <div class="vue2-subapp__feature-card">
        <span class="vue2-subapp__icon">🔗</span>
        <h4>Qiankun</h4>
        <p>Micro Frontend Integration</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
.vue2-subapp__home {
  padding: 20px;
}

.vue2-subapp__home h3 {
  margin-bottom: 10px;
  color: #e6a700;
}

.vue2-subapp__home > p {
  color: #666;
  margin-bottom: 20px;
}

.vue2-subapp__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.vue2-subapp__feature-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.vue2-subapp__icon {
  font-size: 2em;
}

.vue2-subapp__feature-card h4 {
  margin: 10px 0 5px;
  color: #b45309;
}

.vue2-subapp__feature-card p {
  font-size: 0.85em;
  color: #92400e;
  margin: 0;
}
</style>
