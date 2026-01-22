<template>
  <div class="vue2-subapp__about">
    <h3>📖 เกี่ยวกับ</h3>
    <p>Vue 2 Sub App with Nested Router in Micro Frontend</p>

    <div class="vue2-subapp__info-card">
      <h4>🛠️ Tech Stack</h4>
      <ul>
        <li><strong>Vue:</strong> 2.7.16</li>
        <li><strong>Vue Router:</strong> 3.x</li>
        <li><strong>Build Tool:</strong> Vite 5</li>
        <li><strong>Micro Frontend:</strong> Qiankun + vite-plugin-qiankun</li>
      </ul>
    </div>

    <div class="vue2-subapp__info-card">
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
.vue2-subapp__about {
  padding: 20px;
}

.vue2-subapp__about h3 {
  margin-bottom: 10px;
  color: #e6a700;
}

.vue2-subapp__about > p {
  color: #666;
  margin-bottom: 20px;
}

.vue2-subapp__info-card {
  background: #fffbeb;
  border: 1px solid #fcd34d;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.vue2-subapp__info-card h4 {
  margin: 0 0 12px;
  color: #b45309;
}

.vue2-subapp__info-card ul {
  margin: 0;
  padding-left: 20px;
}

.vue2-subapp__info-card li {
  margin-bottom: 6px;
  color: #92400e;
}

.vue2-subapp__info-card p {
  margin: 0;
  color: #92400e;
  line-height: 1.6;
}
</style>
