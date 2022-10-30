import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  //使用路由懒加载加快首屏加载速度
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/Index.vue"),
    },
    {
      path: "/add",
      name: "add",
      component: () => import("@/views/AddGood.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/swiper",
      name: "swiper",
      component: () => import("@/views/Swiper.vue"),
    },
    {
      path: "/hot",
      name: "hot",
      component: () => import("@/views/IndexConfig.vue"),
    },
    {
      path: "/new",
      name: "new",
      component: () => import("@/views/IndexConfig.vue"),
    },
    {
      path: "/recommend",
      name: "recommend",
      component: () => import("@/views/IndexConfig.vue"),
    },
    {
      path: "/category",
      name: "category",
      component: () => import("@/views/Category.vue"),
      children: [
        {
          path: "/category/level2",
          name: "level2",
          component: () => import("@/views/Category.vue"),
        },
        {
          path: "/category/level3",
          name: "level3",
          component: () => import("@/views/Category.vue"),
        },
      ],
    },
    {
      path: "/good",
      name: "good",
      component: () => import("@/views/Good.vue"),
    },
  ],
});

export default router