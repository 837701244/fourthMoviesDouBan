<template>
<el-container>
      <el-header style="height: 50px" >
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6">
            <div class="flex" >
              <div class="text-center " style="font-size: 22px;font-weight: bold;padding-top:5px ">蜗牛电影</div>
              <div class="header-icon">管理端 v1.0</div>
            </div>

          </el-col>
          <el-col :span="6">
            <div class="">用户中心</div>
            <router-link to="/home">Aside前台</router-link>
          </el-col>
        </el-row>
      </el-header>
       <el-container style="margin:0">

          <el-aside width="200px" :style="sty" >
            <el-menu
                default-active="2"
                :default-openeds="openeds"
                class="el-menu-vertical-demo "
                active-text-color="#fff"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>后台管理</span>
                </template>

                  <el-menu-item index="1-1">
                    <router-link to="/admin" >后台统计</router-link>
                  </el-menu-item>
                    <el-menu-item index="1-2">
                      <router-link to="/admin/usermanage" >用户管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-3">
                      <router-link to="/admin/moviemanage">电影管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-4">
                      <router-link to="/admin/cinemamanage">影院管理</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-5">
                      <router-link to="/admin/ordermanage">订单管理</router-link>
                    </el-menu-item>

              </el-submenu>

              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>用户管理</span>
                </template>

                  <el-menu-item index="2-1">
                    <router-link to="/admin/adduser" >用户增加</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <router-link to="/admin/usermanage" >用户列表</router-link>
                  </el-menu-item>

              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-video-camera-solid"></i>
                  <span>电影管理</span>
                </template>

                  <el-menu-item index="3-1">
                    <router-link to="/admin/addmovie" >电影增加</router-link>
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <router-link to="/admin/moviemanage" >电影列表</router-link>
                  </el-menu-item>

              </el-submenu>

              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-s-home"></i>
                  <span>影院管理</span>
                </template>

                  <el-menu-item index="4-1">
                    <router-link to="/admin/addcinam" >影院增加</router-link>
                  </el-menu-item>
                  <el-menu-item index="4-2">
                    <router-link to="/admin/cinemamanage" >影院列表</router-link>
                  </el-menu-item>

              </el-submenu>

              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-tools"></i>
                  <span>场次订单管理</span>
                </template>

                  <el-menu-item index="5-1">
                    <router-link to="/admin" >订单增加</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-2">
                    <router-link to="/admin/ordermanage" >订单管理</router-link>
                  </el-menu-item>
                  <el-menu-item index="5-3">
                    <router-link to="/admin/sessionmanage" >场次管理</router-link>
                  </el-menu-item>

              </el-submenu>


      </el-menu>
          </el-aside>
          <el-main class="bg-E9EEF3" :style="sty">

            <router-view>后台二级路由</router-view>
          </el-main>
      </el-container>
</el-container>


</template>

<script>
//加载命名空间助手
// import {createNamespacedHelpers} from "vuex";
// const { mapState, mapGetters, mapMutations, mapActions }  = createNamespacedHelpers("adminModule");

import {mapState} from "vuex";

export default {
  name: "AdminView",
  data() {
    return {
      openeds:['5'],
      sty:{
        height:window.innerHeight - 50+"px",
        overflow:"auto"
      }
    }
  },
  computed: {
    ...mapState(["user"]),

  },
  watch: {},
  methods: {},
  components: {},
  created() {
    if (this.user.state!=4){
      this.$message({
        message:"权限不足",
        type:"error"
      })
      this.$router.push("/home")
    }
  }
}
</script>

<style scoped lang="scss">
//li{
//  margin: 10px;
//}
//
//.router-link-exact-active{
//  //background-color: white;
//  color:white;
//}

.header-icon{
  background-color: #158ee2;
  color: #a3d6f3;
  width: 80px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  line-height: 30px;
  margin: 10px ;
}

a {
  display: block;
}




.el-header{
  overflow: hidden;
  background-color: #299dee;
  color: #fff;
}
.el-aside {
  background-color: #314056;
  color: #80A0B5;
  text-align: center;
  line-height: 50px;
  >ul{
    >li{
      span{
        color: #80A0B5;
      }
    }
  }
   >.el-menu{
    background-color: #314056;
     color: #80A0B5;
  }
  .el-menu-item{
    background-color: #42536b;
    >a {
      color: #9DAEC3;;
    }

  }
  i{
    color: #80A0B5;
  }
}

.el-menu-item.is-active{
  color: #18909B !important;
  background-color: #299dee !important;

}
.bg-E9EEF3{
  background-color: #E9EEF3;
}

//.el-main {
//  background-color: #E9EEF3;
//  color: #333;
//  text-align: center;
//  line-height: 60px;
//}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>