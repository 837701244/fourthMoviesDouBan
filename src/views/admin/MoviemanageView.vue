<template>
  <el-card>
    <div slot="header">
        <span>电影管理"</span>
    </div>
    <div v-if="moviesInfo ">
<!--      搜索-->
      <div class="flex">
        <input type="text" class="el-input__inner flex-item-1" v-model.trim="serchWord">
        <el-button type="primary" plain class="flex-item-0" @click="searchMovies">搜索</el-button>
        <el-button type="primary" plain class="flex-item-0" @click="moviesAll">返回全部列表</el-button>
      </div>

<!--      表格数据-->
      <el-table
          ref="multipleTable"
          :data="moviesInfo.data"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>


        <el-table-column
            prop="title"
            label="电影名"
            >
        </el-table-column>
        <el-table-column
            prop="language"
            label="语言"
        >
        </el-table-column>
        <el-table-column
            prop="areaName"
            label="上映区域"
        >
        </el-table-column>
        <el-table-column
            label="主演"
        >
          <template slot-scope="scope">
              <span>
                    {{scope.row.actor.split(":")[1]}}
              </span>
          </template>
        </el-table-column>
        <el-table-column
            label="类别"
            width="150"

        >
          <template slot-scope="scope">
            <span> {{ categoryList[scope.row.category]}}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="电影图片"
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
            :total="moviesInfo.count"
            style="padding: 0 300px"
            class="flex-item-1"
        >
        </el-pagination>
      </div>

    </div>
  </el-card>

</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "MoviemanageView",
  data() {
    return {
      pageInfo:{
        pageSize:4,
        page:1
      },
      moviesInfo:null,
      chooseArr:null,
      serchWord:"",
      editMoviesInfo:null
    }
  },
  computed: {
      ...mapState(['categoryList'])
  },
  watch: {},
  methods: {
    openMessage(mes,tiele) {
      this.$alert(mes, tiele, {
        confirmButtonText: '确定',
        // callback: action => {
        //   this.$message({
        //     type: 'info',
        //     message: `action: ${ action }`
        //   });
        // }
      });
    },
    handleCurrentChange(pag){
      console.log("handleCurrentChange当前也",pag)
      this.pageInfo.page = pag
      this.getData()
    },
    handleSelectionChange(arr){
      console.log("选中的函数",arr)
      this.chooseArr = arr.map(item=>item._id)
    },
    async getData(){
     let res = await this.axios.get("/api/getmovie",{params:this.pageInfo})
      console.log(res.data)
      this.moviesInfo = res.data
    },
    updateClick(id){
      console.log(id)
      this.$router.push("/admin/movieupdate/"+id)
    },
   async delClick(id){
      console.log(id)
      let {data} = await this.axios.post("/api/delOne", {id})
     console.log(data)
      if (data.status){
          this.openMessage(`成功删除${data.data}条数据`,"删除")
          this.getData()
      }else {
        this.openMessage(`删除失败`,"删除")
      }
    },
    async searchMovies(){
      this.pageInfo.page = 1
      let word = this.serchWord
      if (word ){
        let obj = await this.axios.get("/api/searchMove",{params:{word,...this.pageInfo}})
        this.moviesInfo = obj.data
      }else {
        this.openMessage("不能为空","搜索内容")
      }
    },
    moviesAll(){
      this.serchWord = ""
      this.getData()
    },
    async delAll(){
      let arr = this.chooseArr
      if (!arr){
        this.openMessage("不能为空","批量删除")
      }else {
        let {data} =await this.axios.post("/api/delArr",{arr})
        if (data.status){
          this.openMessage(`成功删除${data.data}条电脑`,"批量删除")
          this.getData()
        }else {
          this.openMessage("删除失败","批量删除")
        }
      }


    }
  },
  components: {},
  created() {

  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">

</style>