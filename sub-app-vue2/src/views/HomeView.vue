<template>
  <div class="home-view">
    <h3>🏠 หน้าแรก (Vue 2 Sub App)</h3>
    <p>ยินดีต้อนรับสู่ Vue 2 Micro Frontend พร้อม Router</p>

    <div class="features">
      <div class="feature-card">
        <span class="icon">🟡</span>
        <h4>Vue 2.7</h4>
        <p>รองรับ Composition API</p>
      </div>
      <div class="feature-card">
        <span class="icon">🛤️</span>
        <h4>Vue Router 3</h4>
        <p>Nested Routing ใน Micro Frontend</p>
      </div>
      <div class="feature-card">
        <span class="icon">🔗</span>
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
.home-view {
  padding: 20px;
}

.home-view h3 {
  margin-bottom: 10px;
  color: #e6a700;
}

.home-view p {
  color: #666;
  margin-bottom: 20px;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.feature-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.feature-card .icon {
  font-size: 2em;
}

.feature-card h4 {
  margin: 10px 0 5px;
  color: #b45309;
}

.feature-card p {
  font-size: 0.85em;
  color: #92400e;
  margin: 0;
}
</style>
