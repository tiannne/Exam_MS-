
import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')
// const Home = () => import('../views/Home.vue')
const Home = () => import('../views/UpDataInformation.vue')
const Tikuguanli = () => import('../views/Tikuguanli.vue')
const Tikuadd = () => import('../views/Tikuadd.vue')
const Kaoshiguanli = () => import('../views/Kaoshiguanli.vue')
const Shitiguanli = () => import('../views/Shitiguanli.vue')
const ShitiguanliAdd=()=>import('../views/ShitiguanliAdd.vue')
const ExamDetail = () => import('../views/ExamDetail.vue')
const ExamUpData = () => import('../views/ExamUpData.vue')

const Sys = () => import('../views/Sys.vue')
const Sysconfig = () => import('../views/Sysconfig.vue')
const Sysdepart = () => import('../views/Sysdepart.vue')
const Sysrole = () => import('../views/Sysrole.vue')
const Sysuser = () => import('../views/Sysuser.vue')
const ExamAddAndUpdata = () => import('../views/ExamAddAndUpdata.vue')

const router = createRouter({
  /* 环境变量 */
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Index,
      meta:{
        auth:true
      },
      children: [
        {
          path: "home",
          name: "home",
          component: Home,
          meta:{
            auth:true
          }
          
        },
        {
          path: "tiku/guanli",
          name: "tikuguanli",
          component: Tikuguanli,
          meta:{
            auth:true
          }
        },
        {
          path: 'tiku/guanli/tikuadd',
          name: 'tikuadd',
          component: Tikuadd,
          meta:{
            auth:true
          }
        },
        {
          path: "kaoshi/guanli",
          name: "kaoshiguanli",
          component: Kaoshiguanli,
          meta:{
            auth:true
          },
        },
        {
          path: "kaoshi/guanli/ExamAddAndUpdata/:id?",
          name: "kaoshiguanliExamAddAndUpdata",
          component: ExamAddAndUpdata,
          meta:{
            auth:true
          },
        },
        {
          path: "kaoshi/guanli/ExamDetail/:id?",
          name: "kaoshiguanliExamDetail",
          component: ExamDetail,
          meta:{
            auth:true
          },
        },
        {
          path: "kaoshi/guanli/ExamUpData/:id?",
          name: "kaoshiguanliExamUpData",
          component: ExamUpData,
          meta:{
            auth:true
          },
        },
        {
          path: "shiti/guanli",
          name: "shitiguanli",
          component: Shitiguanli,
          meta:{
            auth:true
          }
        },
        {
          path:'shiti/guanli/add',
          name:'add',
          component:ShitiguanliAdd
        },
        {
          path: 'sys/config',
          name: 'sysconfig',
          component: Sysconfig,
          meta:{
            auth:true
          }
        },
        {
          path: 'sys/depart',
          name: 'sysdepart',
          component: Sysdepart,
          meta:{
            auth:true
          }
        },
        {
          path: 'sys/role',
          name: 'sysrole',
          component: Sysrole,
          meta:{
            auth:true
          }
        },
        {
          path: 'sys/user',
          name: 'sysuser',
          component: Sysuser,
          meta:{
            auth:true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        auth:false
      }
    }
  ]
})

/* 全局前置守卫 */
router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(store.state.userToken.token){
      next()
    }else{
      router.push("/login")
    }
  }else{
    next()
  }
  // console.log(to.meta.auth)
}) 

export default router;
