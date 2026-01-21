<template>
  <div class="about-view">
    <h3>📖 เกี่ยวกับ</h3>
    <p>Vue 2 Sub App with Nested Router in Micro Frontend</p>

    <div class="info-card">
      <h4>🛠️ Tech Stack</h4>
      <ul>
        <li><strong>Vue:</strong> 2.7.16</li>
        <li><strong>Vue Router:</strong> 3.x</li>
        <li><strong>Build Tool:</strong> Vite 5</li>
        <li><strong>Micro Frontend:</strong> Qiankun + vite-plugin-qiankun</li>
      </ul>
    </div>

    <div class="info-card">
      <h4>💡 วิธีการทำงาน</h4>
      <p>
        Sub App นี้มี Router ภายในของตัวเอง ทำให้สามารถมี navigation
        หลายหน้าภายใน micro frontend เดียว โดยไม่กระทบกับ Main App Router
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about-view {
  padding: 20px;
}

.about-view h3 {
  margin-bottom: 10px;
  color: #e6a700;
}

.info-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.info-card h4 {
  margin: 0 0 12px;
  color: #b45309;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
}

.info-card li {
  margin-bottom: 6px;
  color: #92400e;
}

.info-card p {
  margin: 0;
  color: #92400e;
  line-height: 1.6;
}
</style>
