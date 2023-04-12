import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const Tikuguanli = () => import('../views/Tikuguanli.vue')
const Tikuadd = () => import('../views/Tikuadd.vue')
const Kaoshiguanli = () => import('../views/Kaoshiguanli.vue')
const Shitiguanli = () => import('../views/Shitiguanli.vue')

const Sys = () => import('../views/Sys.vue')
const Sysconfig = () => import('../views/Sysconfig.vue')
const Sysdepart = () => import('../views/Sysdepart.vue')
const Sysrole = () => import('../views/Sysrole.vue')
const Sysuser = () => import('../views/Sysuser.vue')


const router = createRouter({
  /* 环境变量 */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home,
        },
        {
          path: 'tiku/guanli',
          name: 'tikuguanli',
          component: Tikuguanli,
        },
        {
          path: 'add',
          name: 'tikuadd',
          component: Tikuadd
        },
        {
          path: 'kaoshi/guanli',
          name: 'kaoshiguanli',
          component: Kaoshiguanli,
        },
        {
          path: 'shiti/guanli',
          name: 'shitiguanli',
          component: Shitiguanli,
        },
        {
          path: 'sys/config',
          name: 'sysconfig',
          component: Sysconfig,
        },
        {
          path: 'sys/depart',
          name: 'sysdepart',
          component: Sysdepart,
        },
        {
          path: 'sys/role',
          name: 'sysrole',
          component: Sysrole,
        },
        {
          path: 'sys/user',
          name: 'sysuser',
          component: Sysuser,
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

/* 全局前置守卫 */
/* router.beforeEach((to, from, next) => {

}) */

export default router