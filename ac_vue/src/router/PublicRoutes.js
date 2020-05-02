import PublicView from "@/views/Public/index.vue";

export default {
  path: "/",
  name: "Public",
  redirect: "/home",
  component: PublicView,
  meta: {
    requiresAny: true,
  },
  children: [
    {
      path: "/",
      name: "Home",
      component: () => import("@/views/Public/Home.vue"),
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/Public/About.vue"),
    },
    {
      name: "Post",
      path: "/post/:id",
      component: () => import("@/views/Posts/Post.vue"),
    },
  ],
};
