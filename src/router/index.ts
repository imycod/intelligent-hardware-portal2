import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../layout/classis.vue"),
      children: [
        {
          path: "",
          redirect: "/home",
        },
        {
          path: "home",
          name: "home",
          component: () => import("../views/home/index.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("../views/about/index.vue"),
        },
        {
          path: "blogs",
          name: "blogs",
          component: () => import("../views/blogs/index.vue"),
        },
        {
          path: "support",
          name: "support",
          component: () => import("../views/support/index.vue"),
        },
        {
          path: "try-acumenbot",
          name: "try-acumenbot",
          component: () => import("../views/try-acumentbot/index.vue"),
        },
        {
          path: "order",
          name: "order",
          component: () => import("../views/order/index.vue"),
        },
        {
          path: "support",
          name: "support",
          component: () => import("../views/support/index.vue"),
        },
      ],
    },
    {
      path: "/showcase",
      component: () => import("../layout/blank.vue"),
      children: [
        {
          path: "",
          name: "showcase",
          component: () => import("../views/showcase/index.vue"),
        },
      ],
    },
  ],
});

export default router;
