import { createRouter, createWebHistory } from "vue-router";

const Index = () => import("../views/Index.vue");
const Login = () => import("../views/Login.vue");
const Home = () => import("../views/Home.vue");
const Tikuguanli = () => import("../views/Tikuguanli.vue");
const Kaoshiguanli = () => import("../views/Kaoshiguanli.vue");
const Shitiguanli = () => import("../views/Shitiguanli.vue");
const Tikuadd = () => import("../views/Tikuadd.vue");
const router = createRouter({
  /* 环境变量 */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
        },
        {
          path: "tiku/guanli",
          name: "tikuguanli",
          component: Tikuguanli,
        },
        {
          path: "tiku/guanli/tikuadd",
          name: "tikuadd",
          component: Tikuadd,
        },
        {
          path: "kaoshi/guanli",
          name: "kaoshiguanli",
          component: Kaoshiguanli,
        },
        {
          path: "shiti/guanli",
          name: "shitiguanli",
          component: Shitiguanli,
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

/* 全局前置守卫 */
/* router.beforeEach((to, from, next) => {

}) */

export default router;
