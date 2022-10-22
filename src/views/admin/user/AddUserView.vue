<template>
  <el-card>

    <div slot="header" >
      <span>用户增加</span>
    </div>
    <div >
      <el-form label-position="left" label-width="80px" :model="addUser">
        <el-form-item label="用户名称">
          <el-input v-model="addUser.name"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="addUser.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄">
          <el-input v-model="addUser.age"></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input v-model="addUser.pwd"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="addUser.email"></el-input>
        </el-form-item>
        <el-form-item label="用户身份证">
          <el-input v-model="addUser.card"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="addUser.state">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类型" v-if="userStatus">
          <el-select v-model="addUser.state" placeholder="请选择">
            <el-option
                v-for="(item,index) in userStatus"
                :key="index"
                :label="item"
                :value="index">
            </el-option>
          </el-select>

        </el-form-item>



        <el-form-item>
          <div style="width: 500px">
            <el-image :src="addUser.image" fit="fill"></el-image>
          </div>
          <el-upload
              class="upload-demo"
              drag
              name="img"
              action="/api/upload"
              :on-success="handlerSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">增加用户</el-button>
        </el-form-item>
      </el-form>
    </div >
  </el-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "AddUserView",
  data() {
    return {
      addUser:{
        name:"",
        nickname:"",
        age:"",
        pwd:"",
        image:"",
        card:"",
        gender:1,
        email:"",
        state:1,
      }
    }
  },
  computed: {
    ...mapState(['userStatus'])
  },
  watch: {},
  methods: {
    handlerSuccess(res, file){
      console.log(res.path, file)
      this.addUser.image = "http://localhost:6600/"+res.path
    },
    async onSubmit(){
      console.log(this.addUser)
      let obj = {...this.addUser}
      let {data} = await this.axios.post("/api/adduserdata",obj)
      if (data.status){
        this.$message({
          message:"添加成功",
          type:"success"
        })
        this.addUser = {
          name:"",
          nickname:"",
          age:"",
          pwd:"",
          image:"",
          card:"",
          gender:1,
          email:"",
          state:0,
        }
        this.$router.push("/admin/usermanage")
      }else {
        this.$message({
          message:"添加失败",
          type:"error"
        })
      }
    }
  },
  components: {},
  created() {

  }
}
</script>

<style scoped >
/deep/
.el-upload-list__item {
  display: none;
}
</style>