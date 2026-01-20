<template>
  <div class="main-app">
    <header class="header">
      <div class="header-content">
        <router-link to="/" class="logo">
          <h1>Micro Frontend</h1>
        </router-link>
        <nav class="nav">
          <router-link to="/" class="nav-link" exact>Home</router-link>
          <router-link to="/vue3" class="nav-link vue3">Vue 3</router-link>
          <router-link to="/react" class="nav-link react">React</router-link>
          <router-link to="/vue2" class="nav-link vue2">Vue 2</router-link>
        </nav>
      </div>
    </header>

    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const handleSubAppEvent = (event) => {
  console.log("Event from Sub App:", event.type, event.detail);
};

onMounted(() => {
  window.addEventListener("subapp-counter-changed", handleSubAppEvent);
  window.addEventListener("react-subapp-counter-changed", handleSubAppEvent);
  window.addEventListener("react-subapp-message", handleSubAppEvent);
  window.addEventListener("vue2-subapp-counter-changed", handleSubAppEvent);
  window.addEventListener("vue2-subapp-message", handleSubAppEvent);
});

onUnmounted(() => {
  window.removeEventListener("subapp-counter-changed", handleSubAppEvent);
  window.removeEventListener("react-subapp-counter-changed", handleSubAppEvent);
  window.removeEventListener("react-subapp-message", handleSubAppEvent);
  window.removeEventListener("vue2-subapp-counter-changed", handleSubAppEvent);
  window.removeEventListener("vue2-subapp-message", handleSubAppEvent);
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
    Cantarell, sans-serif;
  background: #f5f5f5;
}

.main-app {
  min-height: 100vh;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

.logo {
  text-decoration: none;
}

.logo h1 {
  color: white;
  font-size: 1.4em;
  margin: 0;
}

.nav {
  display: flex;
  gap: 8px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 6px;
  transition: background 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.3);
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
