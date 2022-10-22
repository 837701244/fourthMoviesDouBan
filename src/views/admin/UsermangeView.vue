<template>

  <el-card >
    <div slot="header">
        <span>用户管理</span>
    </div>
    <div>
      <div v-if="userInfo ">
        <!--      搜索-->
        <div class="flex">
          <input type="text" class="el-input__inner flex-item-1" v-model.trim="serchWord">
          <el-button type="primary" plain class="flex-item-0" @click="searchMovies">搜索</el-button>
          <el-button type="primary" plain class="flex-item-0" @click="moviesAll">返回全部列表</el-button>
        </div>

        <!--      表格数据-->
        <el-table
            ref="multipleTable"
            :data="userInfo.data"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
          <el-table-column

              type="selection"
              width="55">
          </el-table-column >
          <el-table-column
              prop="name"
              label="用户名"
          >
          </el-table-column>
          <el-table-column
              label="昵称"
          >
            <template slot-scope="scope">
              <span :style="{color:scope.row.nickname?'#606266':'red'}">{{scope.row.nickname?scope.row.nickname:"未填写"}}</span>
            </template>

          </el-table-column>
          <el-table-column
              label="年龄"
          >
            <template slot-scope="scope">
              <span :style="{color:scope.row.age?'#606266':'red'}">{{scope.row.age?scope.row.age:"未填写"}}</span>
            </template>
          </el-table-column>

          <el-table-column
              label="性别"
          >
            <template slot-scope="scope">
              <span>{{scope.row.gender = 1?"男":"女"}}</span>
            </template>

          </el-table-column>
          <el-table-column
              label="用户图片"
          >
            <template slot-scope="scope">
              <el-image
                  style="width: 80px; height: 100px"
                  :src="scope.row.image"
                  fit="fill"
                  :preview-src-list="[scope.row.image]"></el-image>

            </template>
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="updateClick(scope.row._id)" type="text" size="small">修改</el-button>
              <el-button  @click="delClick(scope.row._id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!--      分页-->
        <div class="flex" style="margin-top: 10px;">
          <el-button class="flex-item-0" type="danger" plain @click="delAll">批量删除</el-button>
          <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="pageInfo.page"
              :page-size="pageInfo.pageSize"
              layout="total, prev, pager, next"
              :total="userInfo.count"
              style="padding: 0 300px"
              class="flex-item-1"
          >
          </el-pagination>
        </div>

      </div>
    </div>
  </el-card>

</template>

<script>
export default {
  name: "UsermangeView",
  data() {
    return {
      userInfo:null,
      pageInfo:{
        page:1,
        pageSize:4
      },
      serchWord:"",
      chooseArr:null,

    }
  },
  computed: {},
  watch: {},
  methods: {
    async getUserList(){
      let {data} = await this.axios.get("/api/getUser",{params:this.pageInfo})
      console.log(data,"22222222222")
      if (data.status){
        this.userInfo = data
        console.log(this.userInfo,"111111111")
      }
    },
    async searchMovies(){
    let word = this.serchWord
     let {data} = await this.axios.get("/api/searchUser",{params:{word,page:1,pageSize: 5}})
      if (data.status){
        this.userInfo =data
      }
    },
    moviesAll(){
        this.getUserList()
    },
    handleSelectionChange(arr){
      this.chooseArr = arr.map(item=>item._id)
    },
     updateClick(id){
      this.$router.push("/admin/updateuser/"+id)
    },
    async delClick(id){
        let {data} = await this.axios.post("/api/delOneUser",{id})
      if (data.status){
        console.log("成功")
        this.getUserList()
      }
    },
    async delAll(){
      let {data} = await this.axios.post("/api/delArrUser",{arr:this.chooseArr})
      if (data.status){
        console.log("成功")
        this.getUserList()
      }
    },
    handleCurrentChange(pag){
      console.log("handleCurrentChange当前页",pag)
      this.pageInfo.page = pag
      this.getUserList()
    },



  },
  components: {},
  created() {

  },
  mounted() {
    this.getUserList()
  }
}
</script>

<style scoped lang="scss">

</style>