<template >
  <div style="margin: 50px 0 100px 0 " v-if="newUserInfo">
  <el-container class="container"  >
    <el-aside  style="margin-right:30px ;background-color: #f9f9f9" >
      <div style="margin: 0 auto;text-align: center">
        <el-image

            style="width: 180px; height: 180px;border-radius: 50%"
            :src="newUserInfo.image?user.image:'http://localhost:6600/upload/top250/1.jpg'"
            fit="fill"></el-image>
<!--        <el-image-->
<!--            v-if="user.image"-->
<!--            style="width: 180px; height: 180px;border-radius: 50%"-->
<!--            :src="user.image"-->
<!--            fit="fill"></el-image>-->
      </div>
      <h2 class="text-center">{{newUserInfo.name}} <span style="font-size: 12px; color: #d5d5d5">{{userStatus[newUserInfo.state]}}</span></h2>
      <el-card class="box-card" style="margin: 0 auto;text-align: center;background-color: #f1f2f6" >

        <ul class="userText hand">
          <li>基本资料</li>
          <li>头像设置</li>
          <li>信息修改</li>
          <li>密码修改</li>
          <li>我的收藏</li>
          <li>电影列表</li>
          <li>电影新增</li>
        </ul>


      </el-card>
    </el-aside>
    <el-main  style="background-color: #f9f9f9">

      <el-card class="box-card" v-if="newUserInfo">
        <h2 slot="header" style="color: #a2a2a9;font-weight: 400">基本资料</h2>
        <div style="margin: 0 auto;width: 500px">
          <el-form label-position="left" label-width="80px" :model="newUserInfo">
            <el-form-item label="用户名">
              <el-input v-model="newUserInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="newUserInfo.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-radio-group v-model="newUserInfo.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
                <el-radio :label="0">未知</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-image v-if="tempImg"
                        style="width: 100px; height: 100px"
                        :src="tempImg"
                        fit="fill"></el-image>

            </el-form-item>
            <el-form-item >
              <el-upload
                  name="img"
                  class="upload-demo"
                  action="/api/upload"
                  :on-success="handlerSuccess"
                  multiple
                  :limit="3">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item class="text-center">
              <el-button @click="personEditFn">确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
        <button @click="BackLogin">退出登录</button>
      </el-card>
<!--        <component :is=personalStatus></component>-->
<!--        <component :is=xx></component>-->
    </el-main>

  </el-container>
  </div>
</template>

<script>
import {mapState,mapMutations} from "vuex"
import PersonalUpdateView from "@/views/home/personal/PersonalUpdateView";
import PersonInfoView from "@/views/home/personal/PersonInfoView";
export default {
  name: "UcenterView",
  data() {
    return {
      personalStatus:"PersonInfoView",
      tempImg :null,
      newUserInfo:null,
    }
  },
  computed: {
    ...mapState(['userStatus','user'])
  },
  watch: {},
  methods: {
    ...mapMutations(['tableUser']),
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

    },
    async personEditFn(){
      console.log(this.newUserInfo)
      if (this.tempImg){
        this.newUserInfo.image = this.tempImg
      }
      let {data} = await this.axios.post("/api/updataUser",this.newUserInfo)
      if (data.status){
        this.$message({
          message:"修改成功",
          type:"success"
        });
          this.tableUser();
          localStorage.removeItem("token")
        this.$router.push("/home/login")
      }else {
        this.$message({
          message:"修改失败",
          type:"error"
        });
      }


    },
    handlerSuccess(res,file){
      console.log(res)
      this.tempImg = "http://localhost:6600/"+res.path
    },
  },
  components: {
    PersonalUpdateView,PersonInfoView
  },
  created() {

  },mounted() {
    this.newUserInfo = this.user
  }
}
</script>

<style scoped lang="scss">
.userText{
  >li{
    &:last-child{
      border: 0;
    }
    border-bottom: 1px dashed #ddd;
    padding: 10px 0;
    margin: 10px 0;
    &:hover{
      color: skyblue;
    }
  }
}
</style>