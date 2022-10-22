<template>
  <el-card >
    <div slot="header">
      <span>用户管理</span>
    </div>
    <div>
      <div v-if="cmInfo ">
        <!--      搜索-->
        <div class="flex">
          <input type="text" class="el-input__inner flex-item-1" v-model.trim="serchWord">
          <el-button type="primary" plain class="flex-item-0" @click="searchMovies">搜索</el-button>
          <el-button type="primary" plain class="flex-item-0" @click="moviesAll">返回全部列表</el-button>
        </div>

        <!--      表格数据-->
        <el-table
            ref="multipleTable"
            :data="cmInfo.data"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
          <el-table-column
              type="selection"
              width="55">
          </el-table-column >
          <el-table-column
              prop="brandName"
              label="影院名"
          >
          </el-table-column>
          <el-table-column
              prop="cinemaAddress"
              label="影院地址"
          >
          </el-table-column>
          <el-table-column
              prop="cinemaPhone"
              label="影院电话"
          >
          </el-table-column>
          <el-table-column
              label="图片"
          >
            <template slot-scope="scope">
              <el-image
                  style="width: 80px; height: 100px"
                  :src="scope.row.brandlogo"
                  fit="fill"
                  :preview-src-list="[scope.row.brandlogo]"></el-image>

            </template>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100">
            <template slot-scope="scope">
              <el-button @click="updateClick(scope.row._id)" type="text" size="small" >修改</el-button>
              <el-popconfirm
                  confirm-button-text='好的'
                  cancel-button-text='不用了'
                  icon="el-icon-info"
                  icon-color="red"
                  title="确定删除吗？"
                  @confirm ='delClick(scope.row._id)'
              >
                <el-button slot="reference" type="text" size="small">删除</el-button>
              </el-popconfirm>


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
              :total="cmInfo.count"
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
  name: "CinemamanageView",
  data() {
    return {
      cmInfo:null,
      pageInfo:{
        page:1,
        pageSize:5
      },
      serchWord:"",
      chooseArr:null,

    }
  },
  computed: {

  },
  watch: {},
  methods: {
    async getCmList(){
      let pageInfo = this.pageInfo
      let {data} = await this.axios.get("/api/getCm",{params:pageInfo})
      if (data.status){
        console.log(data)
        this.cmInfo = data
        console.log(this.cmInfo)
      }
    },
    async searchMovies(){
      let word = this.serchWord
      let {data} = await this.axios.get("/api/searchCm",{params:{word,page:1,pageSize: 5}})
      if (data.status){
        this.cmInfo =data
      }
    },
    moviesAll(){
      this.getCmList()
      this.serchWord=""
    },
    handleSelectionChange(arr){
      this.chooseArr = arr.map(item=>item._id)
    },
    updateClick(id){
      this.$router.push("/admin/updateCm/"+id)
    },
    async delClick(id){
      let {data} = await this.axios.post("/api/delOneCm",{id})
      if (data.status){
        console.log("成功")
        this.$message({
          message:"删除成功",
          type:"success"
        })
        this.getCmList()
      }
    },
    async delAll(){
      let {data} = await this.axios.post("/api/delArrCm",{arr:this.chooseArr})
      if (data.status){
        console.log("成功")
        this.getCmList()
      }
    },
    handleCurrentChange(pag){
      console.log("handleCurrentChange当前页",pag)
      this.pageInfo.page = pag
      this.getCmList()
    },



  },
  components: {},
  created() {

  },
  mounted() {
    this.getCmList()
  }

}
</script>

<style scoped lang="scss">

</style>