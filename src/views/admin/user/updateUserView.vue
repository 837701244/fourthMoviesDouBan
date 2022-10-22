<template>
  <el-card class="box-card" >
    <div slot="header">
      <span>用户修改</span>
    </div>
    <div v-if="UserEdit">
      <el-form label-position="left" label-width="80px" :model="UserEdit">
        <el-form-item label="用户名称">
          <el-input v-model="UserEdit.name"></el-input>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input v-model="UserEdit.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户年龄">
          <el-input v-model="UserEdit.age"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input v-model="UserEdit.email"></el-input>
        </el-form-item>
        <el-form-item label="用户身份证">
          <el-input v-model="UserEdit.card"></el-input>
        </el-form-item>
        <el-form-item label="用户性别">
          <el-radio-group v-model="UserEdit.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="用户类型" v-if="userStatus">
          <el-select v-model="UserEdit.state" placeholder="请选择">
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
            <el-image :src="UserEdit.image" fit="fill"></el-image>
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
          <el-button type="primary" @click="onSubmit">修改用户</el-button>
        </el-form-item>
      </el-form>
    </div >
    {{id}}
{{UserEdit}}
  </el-card>
</template>

<script>
import { mapState} from 'vuex';
export default {
  name: "updateUserView",
  props:['id'],
  data() {
    return {
      UserEdit:null
    }
  },
  computed: {
    ...mapState(['userStatus'])
  },
  watch: {},
  methods: {
    async getUser(){
      let {data} = await  this.axios.get("/api/findById",{params:{id:this.id}})
      if (data.status){
        this.UserEdit = data.data
      }
    },
    handlerSuccess(res, file){
      console.log(res.path, file)
      this.UserEdit.image = "http://localhost:6600/"+res.path
    },
    async onSubmit(){
      let obj = {...this.UserEdit}
      delete obj.pwd;
      let {data} = await this.axios.post("/api/updataUser",obj)
      console.log(data)
      if (data.status){
        this.$message({
          message:"修改成功",
          type:"success"
        })
        this.$router.replace("/admin/usermanage")
      }else {
        this.$message({
          message:"修改失败",
          type:"error"
        })
      }
    }
  },
  components: {},
  created() {

  },mounted() {
    this.getUser()
  }
}
</script>

<style scoped lang="scss">

</style>