export default {
  path: "/auth",
  name: "Auth",
  component: () => import("@/views/Auth/index.vue"),
  redirect: "/auth/login",
  meta: {
    requiresGuest: true,
  },
  children: [
    {
      path: "login",
      name: "Login",
      component: () => import("@/views/Auth/Login.vue"),
    },
    {
      path: "register",
      name: "Registeration",
      component: () => import("@/views/Auth/Register.vue"),
    },
  ],
};
