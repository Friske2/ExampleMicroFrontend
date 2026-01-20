<template>
  <div class="home-view">
    <h2>🏠 Home</h2>
    <p>ยินดีต้อนรับสู่ Micro Frontend Demo</p>

    <div class="cards">
      <router-link to="/vue3" class="card vue3-card">
        <h3>🟢 Vue 3 Sub App</h3>
        <p>Micro Frontend ที่สร้างด้วย Vue 3</p>
      </router-link>

      <router-link to="/react" class="card react-card">
        <h3>⚛️ React Sub App</h3>
        <p>Micro Frontend ที่สร้างด้วย React 18</p>
      </router-link>

      <router-link to="/vue2" class="card vue2-card">
        <h3>🟡 Vue 2 Sub App</h3>
        <p>Micro Frontend ที่สร้างด้วย Vue 2.7</p>
      </router-link>
    </div>

    <div class="info-section">
      <h3>📚 เกี่ยวกับโปรเจคนี้</h3>
      <ul>
        <li>✅ รองรับหลาย Framework (Vue 2, Vue 3, React)</li>
        <li>✅ ใช้ Qiankun สำหรับ Micro Frontend</li>
        <li>✅ แต่ละ App พัฒนาและ deploy แยกกันได้</li>
        <li>✅ Style Isolation</li>
        <li>✅ Props & Events Communication</li>
      </ul>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.home-view {
  padding: 20px;
}

.home-view h2 {
  color: #333;
  margin-bottom: 10px;
}

.home-view > p {
  color: #666;
  margin-bottom: 30px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.card {
  display: block;
  padding: 24px;
  border-radius: 12px;
  text-decoration: none;
  color: white;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.card h3 {
  margin: 0 0 10px 0;
  font-size: 1.3em;
}

.card p {
  margin: 0;
  opacity: 0.9;
  font-size: 0.95em;
}

.vue3-card {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
}

.react-card {
  background: linear-gradient(135deg, #61dafb 0%, #282c34 100%);
}

.vue2-card {
  background: linear-gradient(135deg, #41b883 0%, #35495e 100%);
}

.info-section {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.info-section h3 {
  color: #333;
  margin: 0 0 15px 0;
}

.info-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-section li {
  padding: 6px 0;
  color: #555;
}
</style>
