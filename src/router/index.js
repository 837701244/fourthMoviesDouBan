import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from "@/views/HomeView";

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
  })
}

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect: "/home"
  },
  {
    path: "/ui",
    name:"ui",
    component: ()=> import("../views/ui/ElementView")
  },
  {
    path:"/testcity",
    name:"testcity",
    component: ()=> import("../views/testcity")
  },
  {
    path:"/home",
    component:HomeView,
    children:[
        {
          path:"",
          name: "movies",
          meta:{
            isKeepAlive:true,//该路由节点被缓存
            title:"首页推荐"
          },
          component: () => import("../views/home/IndexView.vue")
        },
      {          //路由嵌套,子路由
        path: "movies/:category?",  //子路由最前不要写 /
        props: true,
        name: "movies",
        meta:{
          isKeepAlive:true,//改路由节点被缓存
          title:"电影列表"
        },
        component: () => import("../views/home/MoviesView")    //访问时加载组件? 懒加载
      },
      {          //路由嵌套,子路由
        path: "top",  //子路由最前不要写 /
        name: "top",
        meta:{
          isKeepAlive:true,//改路由节点被缓存
          title:"推荐电影"
        },
        component: () => import("../views/home/TopView")    //访问时加载组件? 懒加载
      },
      {
        path:"login",
        name:"login",
        component: () => import("../views/home/LoginView")    //访问时加载组件? 懒加载
      },
      {
        path:"reg",
        name:"login",
        component: () => import("../views/home/RegView")    //访问时加载组件? 懒加载
      },
      {          //路由嵌套,子路由
        path: "ucenter",  //子路由最前不要写 /
        name: "ucenter",
        component: () => import("../views/home/UcenterView"),    //访问时加载组件? 懒加载
        /*独享守卫*/
        beforeEnter:(to,from,next)=>{
          const token = localStorage.getItem("token")
          if (token){//判断用户是否登录
            next()
          }else {
            alert("请先登录")
            next("/home/login")
          }
        }


      },
      {
        path: "login",  //子路由最前不要写 /
        name: "login",
        component: () => import("../views/home/LoginView")    //访问时加载组件? 懒加载
      },
      {
        path: "reg",  //子路由最前不要写 /
        name: "reg",
        component: () => import("../views/home/RegView"),    //访问时加载组件? 懒加载
        meta:{
          isKeepAlive:true,//改路由节点被缓存
          title:"用户注册"
        }
      },
      {
        path:"detail/:id",
        props:true,
        name:"detail",
        component: () => import("../views/home/DetailView")
      },{
        path:"search/:w?",
        name:"search",
        props:true,
        component: () => import("../views/home/SearchView")

      }
    ]
  },
  {
    path:"/admin",
    component: ()=>import("../views/AdminView"),
    children: [
      {
        path: "",
        name:"index",
        component:()=>import("../views/admin/IndexView")
      },
      {
        path:"usermanage",
        name:"usermanage",
        component:()=>import("../views/admin/UsermangeView")
      },
      {
        path:"updateuser/:id",
        name:"updateuser",
        props: true,
        component:()=>import("../views/admin/user/updateUserView")
      },
      {
        path:"adduser",
        name:"adduser",
        component:()=>import("../views/admin/user/AddUserView")
      },
      {
        path:"moviemanage",
        name:"moviemanage",
        component:()=>import("../views/admin/MoviemanageView")
      },
      {
        path:"addcinam",
        name:"addcinam",
        component:()=>import("../views/admin/cinema/AddCinemaView")
      },
      {
        path:"movieupdate/:id?",
        name:"movieupdate",
        props:true,
        component:()=>import("../views/admin/EditMovieView")
      },
      {
        path:"addmovie",
        name:"addmovie",
        component:()=>import("../views/admin/AddMovieView")
      },
      {
        path:"cinemamanage",
        name:"cinemamanage",
        component:()=>import("../views/admin/CinemamanageView")
      },
      {
        path:"updateCm/:id",
        props: true,
        name:"updateCm",
        component:()=>import("../views/admin/cinema/UpdateCinemaView")
      },
      {
        path:"ordermanage",
        name:"ordermanage",
        component:()=>import("../views/admin/OrdermanageView")
      },
      {
        path:"sessionmanage",
        name:"sessionmanage",
        component:()=>import("../views/admin/SessionmanageView")
      },
      {
        path:"updateSess/:id",
        props: true,
        name:"updateSess",
        component:()=>import("../views/admin/SessAndOrder/updateSessView")
      }

    ]
  },

  {
    path:"/myslot",
    name:"myslot",
    component: () => import("../views/ui/MysoultView")
  },
  {
    path:"/err",
    component: () => import("../views/ErrorView.vue")
  },
  {
    path:"*",
    redirect:"/err"
  }

]

const router = new VueRouter({
  routes,
  // mode:"history"取消地址栏的#
})

/*
全局守卫
to:表示用户要进入的路由节点
from:当前路由节点
next:下一跳
* */

router.beforeEach((to, from, next)=>{
  console.log(to,from)
  if (to.path.includes("admin")){
    //判断路由中是否包含admin
    const token =localStorage.getItem("token")
    if (token){//判断用户是否登录,以及用户权限
        next()
    }else {
      alert("宁没有登录，不能访问")
      next("/home/login");
    }

  }else {
      next()
  }
})


export default router
