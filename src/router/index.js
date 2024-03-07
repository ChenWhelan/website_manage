import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRegister from '../views/loginRegister.vue'
import Welcome from '../views/Welcome.vue'
import Home from '../components/Home.vue'
import NewsAdd from '../views/NewsAdd.vue'
import NewsItem from '../views/NewsItem.vue'
import Index from '../views/Index.vue'
import categoryList from '../views/categoryList.vue'
import UserAdd from '../views/UserAdd.vue'
import MyInfo from '../views/MyInfo.vue'

Vue.use(VueRouter)

const routes = [
{
  path: '/',
  redirect: '/Welcome'
},
{
  path:'/Welcome',
  component:Welcome
},
  {
	  path:'/login',
	  component: loginRegister
  },
  {
    path:'/Home',
    component:Home,
    children:[
      {path: '/',redirect: '/Home/Index'},
      {path:'Index',component:Index},
      {path:'NewsAdd',component:NewsAdd},
      {path:'NewsItem',component:NewsItem},
      {path:'categoryList',component:categoryList},
      {path:'UserAdd',component:UserAdd},
      {path:'login',component: loginRegister},
      {path:'MyInfo',component:MyInfo}
  ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
