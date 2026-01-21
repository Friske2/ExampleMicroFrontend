<template>
  <div class="vue2-app">
    <div class="header">
      <h2>🟡 Vue 2 Sub App (with Router)</h2>
      <p class="subtitle">Micro Frontend พร้อม Nested Router</p>
    </div>

    <!-- Sub App Navigation -->
    <nav class="sub-nav">
      <router-link to="/" class="nav-link" exact>🏠 Home</router-link>
      <router-link to="/counter" class="nav-link">🔢 Counter</router-link>
      <router-link to="/about" class="nav-link">📖 About</router-link>
    </nav>

    <!-- Router View -->
    <div class="router-content">
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
.vue2-app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
}

.header {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  padding: 20px;
  text-align: center;
  color: white;
}

.header h2 {
  margin: 0;
  font-size: 1.4em;
}

.subtitle {
  margin: 8px 0 0;
  opacity: 0.9;
  font-size: 0.9em;
}

.sub-nav {
  display: flex;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(245, 158, 11, 0.1);
  border-bottom: 1px solid rgba(245, 158, 11, 0.2);
}

.nav-link {
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  color: #92400e;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link:hover {
  background: rgba(245, 158, 11, 0.2);
}

.nav-link.router-link-active {
  background: #f59e0b;
  color: white;
}

.router-content {
  padding: 16px;
}
</style>
