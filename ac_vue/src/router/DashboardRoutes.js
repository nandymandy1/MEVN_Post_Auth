import store from "@/store";

export default {
  name: "Dashboard",
  path: "/dashboard",
  redirect: "dashboard/profile",
  component: () => import("@/views/Dashboard/index.vue"),
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: "profile",
      name: "Profile",
      component: () => import("@/views/Dashboard/Profile.vue"),
    },
    {
      path: "add-post",
      name: "New Post",
      component: () => import("@/views/Posts/AddPost.vue"),
    },
    {
      path: "edit-post/:id",
      name: "Edit Post",
      component: () => import("@/views/Posts/EditPost.vue"),
    },
    {
      path: "logout",
      name: "logout",
      // eslint-disable-next-line
      beforeEnter(to, from, next) {
        store.dispatch("Auth/logoutUser").then(() => next("/auth/login"));
      },
    },
  ],
};
