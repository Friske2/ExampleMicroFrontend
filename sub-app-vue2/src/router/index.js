import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import CounterView from "../views/CounterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/counter",
    name: "counter",
    component: CounterView,
  },
];

// สร้าง router factory function สำหรับ micro frontend
// เพื่อให้สามารถสร้าง router ใหม่ทุกครั้งที่ mount
export function createRouter(base = "/", isQiankun = false) {
  const router = new VueRouter({
    // ใช้ abstract mode เมื่ออยู่ใน Qiankun เพื่อหลีกเลี่ยง history conflict
    mode: isQiankun ? "abstract" : "history",
    base: base,
    routes,
  });

  if (isQiankun) {
    // Sync initial route จาก URL ปัจจุบัน
    const currentPath = window.location.pathname.replace(base, "") || "/";
    router.replace(currentPath).catch(() => {});

    // เมื่อ route เปลี่ยน ให้ sync กลับไปยัง browser URL
    router.afterEach((to) => {
      const newUrl = base + (to.path === "/" ? "" : to.path);
      // ใช้ replaceState เพื่อไม่เพิ่ม history entry
      window.history.replaceState(null, "", newUrl);
    });
  }

  return router;
}

export default createRouter;
