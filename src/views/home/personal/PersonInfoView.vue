<template>
  <el-card class="box-card" v-if="user">
    <h2 slot="header" style="color: #a2a2a9;font-weight: 400">基本资料</h2>
    <div style="margin: 0 auto;width: 500px">
      <el-form label-position="left" label-width="80px" :model="user">
        <el-form-item label="用户名">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="userStatus.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="2">女</el-radio>
            <el-radio :label="0">未知</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <button @click="BackLogin">退出登录</button>
  </el-card>
</template>

<script>
import {mapState,mapMutations} from "vuex"
export default {
  name: "PersonInfoView",
  data() {
    return {}
  },
  computed: {
    ...mapState(['userStatus','user'])
  },
  watch: {},
  methods: {
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

  }
}
</script>

<style scoped lang="scss">

</style>