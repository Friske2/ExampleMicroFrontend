import Vue from "vue";
import App from "./App.vue";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

let app = null;

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

  // สร้าง Vue 2 instance
  app = new Vue({
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
