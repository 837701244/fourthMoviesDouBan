<template>

  <div  >
    <!--      <h1>首页推荐</h1>-->
    <div class="clearfix" style="background-color:  #545652">
      <div class="float-left">
        <ul class="flex headerLeft" >
          <li><router-link to="/home" >首页推荐</router-link> </li>
          <li><router-link to="/home/movies">电影列表</router-link> </li>
          <li> <router-link to="/home/top"> 推荐电影</router-link> </li>
          <li><router-link to="/home/ucenter">用户中心</router-link>   </li>
          <li><router-link to="/home/login">登陆</router-link></li>
          <li><router-link to="/home/reg">注册</router-link></li>
          <li><router-link to="/home/detail/444444">电影详情</router-link></li>
          <li><router-link to="/admin">后台管理</router-link></li>

        </ul>
      </div>
      <div class="float-right">
        <ul class="flex headerRight">
          <li><a href="#">下载客户端</a></li>
          <li class="headerRight">
            <span v-if="!user">
                <router-link to="/home/login">登陆</router-link>
                <router-link to="/home/reg">注册</router-link>
            </span>
          </li>
          <li class="headerRight">
              <span v-if="user">
                   <router-link to="/home/ucenter">{{user.name}}</router-link>
                    <a class="hand" @click="BackLogin" >退出</a>
              </span>
          </li>

        </ul>
      </div>
    </div>
    <div style="background-color: #f0f3f5">
          <div style="border-bottom: 1px solid #e5ebe4">
              <div class="container  clearfix">
                  <div class="float-left headerNavLog" style="width: 145px;height: 56px;">
                    <a href="#" style="display: block ;width: 145px;height: 56px "></a>
                  </div>
                <div class="float-left" style="margin-left: 50px;padding: 10px 0 15px 0 ">
                    <div class="flex">
                        <input ref="word" v-model.trim="searchWord" style="width: 360px;height: 32px" class="el-input__inner flex-item-1" placeholder="搜索电影、电视剧、综艺、影人"></input>
                      <button @click="searchFn" class="el-button el-button--info flex-item-0 el-button--mini"  >
                        <i class="el-icon-search" ></i>
                      </button>
                    </div>
                </div>
              </div>
          </div>
          <div style="margin: 0 auto;width: 1200px" >
            <ul class="flex searchFoot" >
              <li><a href="">影讯&购票</a></li>
              <li><a href="">选电影</a></li>
              <li><a href="">电视剧</a></li>
              <li><a href="">排行榜</a></li>
              <li><a href="">影评</a></li>
              <li><a href="">2021年度榜单</a></li>
              <li><a href="">2021书影音报告</a></li>
              <li class="float-right">
                访问人数{{showPv}}
                <i class="el-icon-star-on hand" @click="likeFn" style="color: #d5d5d5"></i>
              </li>
            </ul>
          </div>
      <a href="#" class="movieannual" ></a>
      </div>


  </div>







</template>

<script>
import { mapMutations,mapState } from 'vuex';
export default {
  name: "HeaderCom",
  data() {
    return {
      searchWord:""
    }
  },
  computed: {
    ...mapState(["user"]),
    pv(){
      return this.$store.state.pv
    },
    showPv(){
      return this.$store.getters.showPv
    }
  },
  watch: {},
  methods: {
    ...mapMutations(['tableUser']),
    searchFn(){
      //第一种方法获取值
      // console.log(this.searchWord)
      // 第二种方法获取值
      // console.log(this.$refs.word._value)
        this.$router.push("/home/search/"+this.searchWord)
    },
    async likeFn(){
      // vuex的mutation方法
      // this.$store.commit('addPv')\

      // vuex actions方法
      // this.$store.dispatch('setPv')
     let res = await this.$store.dispatch('Get_Ajax',{
        url:"/api/getmovie",
        params:{page:1,pageSize:5}
      })
      console.log(res)
    },
    BackLogin(){

      this.$confirm(' 是否退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableUser();
        localStorage.removeItem("token")
        this.$router.push("/home")
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
  components: {},
  created() {
    console.log(this.$store.state.pv)
    console.log(this.$store.getters.showPv)

  },mounted() {
    //vuex的方法
    this.$store.commit('addPv')
  }
}
</script>

<style scoped lang="scss">
.movieannual{
  display: block;
  position: absolute;
  width: 186px;
  height: 96px;
  top: 29px;
  left: 50%;
  margin-left: 200px;
  background: url("@/assets/images/comicon/annual_2021.png");
  background-size: 100%;
}
.headerRight>li>a{
font-size: 12px;
  color: #d5d5d5;
}
.searchFoot>li>a{
  font-size: 14px;
  color: #2277AA;
}
.searchFoot>li{
  margin: 5px;
}
.headerNavLog{
  background: url("@/assets/images/comicon/lg_movie.png") no-repeat 0 12px;
  background-size:120px ;
}

a {
  display: inline-block;
  padding:  8px;
}
ul.headerLeft>li>a{
  font-size: 12px;
  color: #D5D5D5;
}
ul.headerLeft>li>a:hover{
  color: #fff;
}
.headerRight{
  >span{
    >a {
      font-size: 12px;
      color: #d5d5d5;
    }

  }
}
</style>