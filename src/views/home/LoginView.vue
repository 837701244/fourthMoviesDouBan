<template>
  <el-card class="box-card">
<!--    <div class="container" style="display: none">-->
<!--      <div style="margin: 50px auto;width: 340px" >-->
<!--        <el-form label-position="right" label-width="80px" :model="loginUser">-->
<!--          <el-form-item label="用户名">-->
<!--            <el-input v-model="loginUser.name" placeholder="用户名"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="密码">-->
<!--            <el-input type="password" v-model="loginUser.pwd" placeholder="密码"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item class="clearfix" style="margin-top:50px">-->
<!--            <el-button  class="float-left" type="primary" @click="loginFn">登陆</el-button>-->
<!--            <el-button  class="float-right" type="primary" @click="goReg" >注册</el-button>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--      </div>-->

<!--    </div>-->

    <div class="container">
      <form @submit.prevent="loginFn" class="login-form">
        <h2>登录</h2>
        <input type="text" name="username" placeholder="用户名" v-model="loginUser.name">
        <input type="password" name="password" placeholder="密码" v-model="loginUser.pwd">
        <button type="submit">登录</button>
      </form>
    </div>
  </el-card>

</template>

<script>
import {  mapMutations } from 'vuex';
export default {
  name: "LoginView",
  data() {
    return {
      loginUser:{
        name:"",
        pwd:""
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    ...mapMutations(['tableUser']),
    goReg(){
      this.$router.replace("/home/Reg")
    },
    async loginFn(){
      let name = this.loginUser.name;
      let pwd = this.loginUser.pwd;
      if (name == "" || pwd == ""){
        console.log(name,pwd)
       return  this.$message({
          message:"用户名或密码未填写",
          type:"error"
        })
      }
      let {data} = await this.axios.post("/api/login",{name,pwd})
      if (data.status){
        console.log(data)
        localStorage.setItem("token",data.token)
        this.tableUser(data.data)
        this.$message({
          message:"登陆成功",
          type:"success"
        });
        this.$router.replace("/home")
      }else {
        this.$message({
          message:`${data.message}用户名或密码错误`,
          type:"error"
        })
      }
    }
  },
  components: {},
  created() {

  },mounted() {

  },
  /*组件内的守卫*/
  //beforeRouteLeave:(to, from, next)=>{
    //判断当前路由离开时触发  函数
 //     if (confirm("宁确定要离开吗")){
        //刷新的时候防护不了
 //         next()
 //     }
 // }
}
</script>

<style scoped lang="scss">
.el-card{
  margin: 0;
  font-family: "PingFang SC","Microsoft Yahei",sans-serif;
}
input::-webkit-input-placeholder{
  color: #e5e5e5;
}

.container{
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url("../../assets/images/comicon/bg1.png") fixed no-repeat;
  background-size: cover;
}

.login-form{
  width: 240px;
  height: 220px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  position:relative;
  z-index: 100;
  background: inherit;
  border-radius: 18px;
  overflow: hidden;
}

.login-form::before{
  content: "";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background: inherit;
  box-shadow: inset 0 0 0 200px rgba(255, 255, 255, 0.25);
  filter: blur(5px);
  z-index: -1;
}

.login-form h2{
  font-size: 18px;
  font-weight: 400;
  color: #3d5245;
}

.login-form input,
.login-form button{
  margin: 6px 0;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
}
.login-form input::placeholder{
  color: #3d5245;
}
.login-form button:focus,
.login-form input:focus{
  outline: 0;
}

.login-form button{
  margin-top:24px;
  background-color: rgba(209, 179, 9, 0.4);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
}

.login-form button:hover{
  background-color: rgba(209, 179, 9 , 0.7);
}

.login-form button::before,
.login-form button::after{
  content: "";
  display: block;
  width: 80px;
  height: 100%;
  background: rgba(179, 255, 210, 0.5);
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  transform: skewX(-15deg);
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-form button:hover::after{
  width: 40px;
  background: rgba(179, 255, 210, 0.3);
  left: 60px;
  opacity: 0;
  filter: blur(5px);
}
.login-form button:hover::before{
  transition: 1s;
  transform: translateX(320px);
  opacity: 0.7s;
}
.login-form button:hover::after{
  transition: 1s;
  transform: translateX(320px);
  opacity: 1;
}
</style>