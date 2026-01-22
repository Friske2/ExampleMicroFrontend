<template>
  <div class="vue2-subapp">
    <div class="vue2-subapp__header">
      <h2>🟡 Vue 2 Sub App (with Router)</h2>
      <p class="vue2-subapp__subtitle">Micro Frontend พร้อม Nested Router</p>
    </div>

    <!-- Sub App Navigation -->
    <nav class="vue2-subapp__nav">
      <router-link to="/" class="vue2-subapp__nav-link" exact
        >🏠 Home</router-link
      >
      <router-link to="/counter" class="vue2-subapp__nav-link"
        >🔢 Counter</router-link
      >
      <router-link to="/about" class="vue2-subapp__nav-link"
        >📖 About</router-link
      >
    </nav>

    <!-- Router View -->
    <div class="vue2-subapp__content">
      <router-view />
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
};
</script>

<style scoped>
/* ============================================
   Vue 2 Sub App - Scoped Styles with BEM
   Prefix: vue2-subapp
   ============================================ */

.vue2-subapp {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
}

.vue2-subapp__header {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  padding: 20px;
  text-align: center;
  color: white;
}

.vue2-subapp__header h2 {
  margin: 0;
  font-size: 1.4em;
}

.vue2-subapp__subtitle {
  margin: 8px 0 0;
  opacity: 0.9;
  font-size: 0.9em;
}

.vue2-subapp__nav {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(245, 158, 11, 0.1);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
}

.vue2-subapp__nav-link {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  color: #92400e;
  font-weight: 500;
  transition: all 0.2s;
}

.vue2-subapp__nav-link:hover {
  background: rgba(245, 158, 11, 0.2);
}

.vue2-subapp__nav-link.router-link-active {
  background: #f59e0b;
  color: white;
}

.vue2-subapp__content {
  padding: 16px;
}
</style>
