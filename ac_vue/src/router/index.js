import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import AuthRoutes from "./AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import DashboardRoutes from "./DashboardRoutes";

Vue.use(VueRouter);

const routes = [AuthRoutes, DashboardRoutes, PublicRoutes];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },
  routes,
});

// eslint-disable-next-line
router.beforeEach((to, from, next) => {
  // eslint-disable-next-line
  np.start();
  let isAuth = store.getters["Auth/isAuth"];
  let reqAuth = to.matched.some((record) => record.meta.requiresAuth);
  let reqGuest = to.matched.some((record) => record.meta.requiresGuest);

  if (reqAuth) {
    isAuth ? next() : next("/auth/login");
  } else if (reqGuest) {
    isAuth ? next("/dashboard/profile") : next();
  } else {
    next();
  }
});

// eslint-disable-next-line
router.afterEach(() => setTimeout(() => np.done(), 500));

export default router;
