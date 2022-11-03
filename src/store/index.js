import Vue from 'vue'
import Vuex from 'vuex'
import axios from "../plugins/axios.js";

import adminModule from "./modules/adminModule.js";

Vue.use(Vuex)

export default new Vuex.Store({
  // state 数据初始化 data
  state: {
    pv:1,//网站访问人数
    categoryList: ["默认类型", "喜剧", "爱情", "动作", "科幻", "动画", "悬疑", "犯罪", "惊悚", "冒险", "音乐", "历史", "奇幻", "恐怖", "战争", "传记", "歌舞", "武侠", "情色", "灾难", "西部", "纪录片", "短片"],
    area:["中国", "美国", "香港", "台湾", "日本", "韩国", "英国", "法国", "德国", "意大利", "西班牙", "印度", "泰国", "俄罗斯", "伊朗", "加拿大", "澳大利亚", "爱尔兰", "瑞典", "巴西", "麦丹"],
    userStatus:['禁用用户','正常用户','Vip用户','认证用户','超级管理员'],
    user:null,//用户信息
    userState:false,//用户登录状态
  },
  //管理派生出来的数据
  getters: {
    showPv(state){
      return state.pv*1+200

    }
  },
  //同步函数，为了操作state
  mutations: {
    //修改用户数据
    tableUser(state,obj){//用户信息数据持久化
      if (obj){//判断是否传参
        state.user = obj//用户信息放置于仓库
        state.userState = true//用户登录状态为真
      }else {
        state.user = null//用户信息 清空
        state.userState = false//用户登录状态为假
      }
    },
    addPv(state){
      state.pv++
    },
  },
  //异步函数，写一些通用的异步方法
  actions: {
    setPv(context){
      context.commit('addPv')
    },
    // get ajax
     Get_Ajax(context,obj){
      let {url,params} = obj
       return  axios.get(url,{params})
    },
    Post_Ajax(context,obj){
      let {url,params} = obj
      return axios.post(url,params)
    }
  },
  //加载子状态机
  modules: {
    adminModule,
  }
})
