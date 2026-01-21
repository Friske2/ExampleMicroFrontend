import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

let app = null;
let router = null;

function render(props = {}) {
  const { container } = props;

  // หา element ที่จะ mount
  const mountElement = container
    ? container.querySelector("#sub-app-vue2") || container
    : document.querySelector("#sub-app-vue2");

  if (!mountElement) {
    console.error("Vue2 Sub App: Mount element not found!");
    return;
  }

  // สร้าง Router ใหม่ทุกครั้งที่ mount (สำคัญสำหรับ micro frontend)
  // ใช้ base path ตาม Qiankun หรือ default
  // ใช้ window แทน qiankunWindow เพื่อให้แน่ใจว่าได้ค่าถูกต้อง
  const isQiankun =
    window.__POWERED_BY_QIANKUN__ || qiankunWindow.__POWERED_BY_QIANKUN__;
  const routerBase = isQiankun ? "/vue2" : "/";
  router = createRouter(routerBase, isQiankun);

  // สร้าง Vue 2 instance พร้อม Router
  app = new Vue({
    router,
    render: (h) => h(App, { props: { qiankunProps: props } }),
  }).$mount(mountElement);
}

// Qiankun lifecycle
renderWithQiankun({
  bootstrap() {
    console.log("Vue2 Sub App bootstrapped");
  },
  mount(props) {
    console.log("Vue2 Sub App mounted", props);
    render(props);
  },
  unmount() {
    console.log("Vue2 Sub App unmounted");
    if (app) {
      app.$destroy();
      app.$el.innerHTML = "";
      app = null;
      router = null;
    }
  },
});

// Standalone mode
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({
    user: {
      name: "Test User (Vue2 Standalone)",
      email: "test@example.com",
      role: "Developer",
    },
    theme: "light",
  });
}
