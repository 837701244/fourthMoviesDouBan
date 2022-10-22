<template>

    <div class="container" >

      <div style="margin: 50px auto;width: 500px" >
        <el-card class="box-card" >
          <div style="width: 300px;margin: 0 auto">
            <el-form label-position="right" label-width="60px" :model="regUser">
              <el-form-item class="text-center" label-width="10px">
                <h2>注册用户</h2>
              </el-form-item>
              <el-form-item label="用户名">
                <el-input v-model="regUser.name" placeholder="用户名"  ></el-input>
              </el-form-item>
              <el-form-item label="密码"  >
                <el-input type="password" v-model="regUser.pwd" placeholder="密码" ></el-input>
              </el-form-item>
              <el-form-item label="性别" >
                <el-radio-group v-model="regUser.gender">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item style="margin-top:50px">
                <el-button   type="primary" @click="RegFn" style="margin-left: 30px">注册用户</el-button>
              </el-form-item>
            </el-form>
          </div>

        </el-card>
      </div>


    </div>


</template>

<script>
export default {
  name: "RegView",
  data() {
    return {
      regUser:{
        name:"",
        pwd:"",
        gender:1
      }
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    async RegFn(){
      let name = this.regUser.name
      let pwd = this.regUser.pwd
      if (name==""  || pwd=="" ){
       return  this.$message({
          message:"请输入用户名或密码",
          type:"error"
        })
      }
      let {data} = await this.axios.post('/api/adduserdata',{...this.regUser})
      if (data.status){
        this.$message({
          message:"注册成功",
          type:"success"
        })
        this.$router.replace('/home/login')
      }else {
        this.$message({
          message:"注册失败",
          type:"error"
        })
      }
    }
  },
  components: {},
  created() {
    console.log(this.$route.meta,'1111111')
  }
}
</script>

<style scoped lang="scss">

</style>