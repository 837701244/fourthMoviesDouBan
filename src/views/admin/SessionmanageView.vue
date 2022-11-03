<template>
  <el-card >
    <div slot="header" >场次管理</div>
    <dl>
      <dt class="padding border-bottom">增加场次</dt>
      <dd>
          <h2>{{session}}</h2>
          <el-form :inline="true">
            <el-form-item label="价格">
                <el-input-number :precision="2" v-model.number="session.money"></el-input-number>
            </el-form-item>
            <el-form-item label="时间">
                <el-date-picker
                  v-model="session.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="电影">

                <el-select :filter-method="searchMovie" v-model="session.mid" filterable placeholder="请选择">
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>


            </el-form-item>
            <el-form-item label="影院">
              <el-select :filter-method="searchCinma" v-model="session.cid" filterable placeholder="请选择">
                <el-option
                    v-for="item in Newoptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>


            </el-form-item>
            <el-form-item>
                <el-button @click="inputFn">增加场次</el-button>
            </el-form-item>
          </el-form>
      </dd>
    </dl>
    <dl>
      <dt class="padding ">列表管理</dt>
      <dd>
        <div>
          <div v-if="manySession">
            <!--      搜索-->
            <div class="flex">
              <input type="text" class="el-input__inner flex-item-1" v-model.trim="serchWord">
              <el-button type="primary" plain class="flex-item-0" @click="searchMovies">搜索</el-button>
              <el-button type="primary" plain class="flex-item-0" @click="moviesAll">返回全部列表</el-button>
            </div>

            <!--      表格数据-->
            <el-table
                ref="multipleTable"
                :data="manySession"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
              <el-table-column

                  type="selection"
                  width="55">
              </el-table-column >
              <el-table-column
                  prop="cinema[0].brandName"
                  label="影院名称"
              >
              </el-table-column>
              <el-table-column
                  prop="movies[0].title"
                  label="电影名称"
              >
              </el-table-column>

              <el-table-column
                  prop="money"
                  label="价格"
              >
              </el-table-column>
              <el-table-column
                  label="时间"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.startTime|skSetDate("yyyy年MM月dd日")}}</span>
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
                  :total="count"
                  style="padding: 0 300px"
                  class="flex-item-1"
              >
              </el-pagination>
            </div>

          </div>
        </div>
      </dd>
    </dl>
  </el-card>
</template>

<script>
export default {
  name: "SessionmanageView",
  data() {
    return {
      serchWord:"",
      session:{
        money: 0, //金额
        mid: "", // 电影编号 movie _id
        cid: "", // 影院表编号 cinema _id
        startTime: new Date(), //5: 00
        state: 1, //状态 1: 上线 0: 下架

      },
      options:[],
      Newoptions:[],
      pageInfo:{
        page:1,
        pageSize:5
      },
      maxPage:1,
      count:1,
      manySession:null,
      chooseArr:[],
    }
  },
  computed: {},
  watch: {},
  methods: {
    async searchMovies(){
      console.log(this.serchWord)
      let res = await  this.axios.get("/api/SesssionWord",{params:{word:this.serchWord}})
      console.log(res.data)
    },
    moviesAll(){
      this.getSessionDate()
    },
    handleSelectionChange(arr){
      this.chooseArr = arr.map(item=>item._id)
    },
    handleCurrentChange(pag){
      console.log("handleCurrentChange当前页",pag)
      this.pageInfo.page = pag
      this.getSessionDate()
    },
    updateClick(id){
      this.$router.push("/admin/updateSess/"+id)
    },
    async delClick(id){
      let res = await this.axios.post("/api/delOneSess",{id})
      console.log(res.data)
      let {status,data} = res.data
      if (status){
        this.getSessionDate()
      }
    },
    async delAll(){
      console.log(this.chooseArr);
      let res = await this.axios.post("/api/delArrSess",{arr:this.chooseArr})
      console.log(res.data)
      let {status,data} = res.data
      if (status){
        this.getSessionDate()
      }
    },
    async searchMovie(word){
      if (!word.trim()){
          return
      }
      let res = await this.axios("/api/getsearchmovie",{params:{word:word}})
      let {status,data} = res.data
      if (status){
        this.options = data.map(item=>{
          return{value:item._id,label:item.title}
        })
      }
    },
    async searchCinma(word){
      if (!word.trim()){
        return
      }
      let res = await this.axios.get("/api/getsearchcinma",{params:{word:word}})
      let {status,data} = res.data
      console.log(data)
      if (status){
        this.Newoptions = data.map(item=>{
          return{value:item._id,label:item.brandName}
        })
      }
    },
    async inputFn(){
        let obj = {...this.session}
        obj.startTime = +new Date(obj.startTime)
        let res = await this.axios.post("/api/addSession",obj)
      console.log(res.data)
      let {status,data} = res.data
      if (status){
        this.$message({
          type:"success",
          message:"成功添加 "
        })
      }else {
        this.$message({
          type:"error",
          message:"失败添加"
        })
      }

    },
     async getSessionDate(){
        let res = await this.axios.get("/api/getSess",{params:{...this.pageInfo}})
        let {count,data,maxPage,status} = res.data
       console.log(data,"1111111111111111")
       if (status){
         this.manySession = data
         this.maxPage=maxPage
         this.count=count
       }

    }
  },
  components: {},
  created() {

  },mounted() {
    this.getSessionDate()
  }
}
</script>

<style scoped lang="scss">

</style>