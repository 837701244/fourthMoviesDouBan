<template>
  <el-card>
      <div slot="header">
        修改
      </div>
    <div v-if="session">

        <h3>{{session}}</h3>
        <el-form :inline="true">
          <el-form-item label="价格">
            <el-input-number :precision="2" v-model.number="session[0].money"></el-input-number>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
                v-model="session[0].startTime"
                type="datetime"
                placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="电影">

            <el-select :filter-method="searchMovie" v-model="session[0].movies[0].title" filterable placeholder="请选择">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>


          </el-form-item>
          <el-form-item label="影院">
            <el-select :filter-method="searchCinma" v-model="session[0].cinema[0].brandName" filterable placeholder="请选择">
              <el-option
                  v-for="item in Newoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>


          </el-form-item>
          <el-form-item>
            <el-button @click="inputFn">修改场次</el-button>
          </el-form-item>
        </el-form>


    </div>
  </el-card>

</template>

<script>
export default {
  name: "updateSessView",
  props:["id"],
  data() {
    return {
      session:null,
      options:[],
      Newoptions:[],
      newSession:{},
      oldSession: {}
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    async getSeccId(){
      let res = await this.axios.get("/api/searchSession",{params:{id:this.id}})
      console.log(res.data.data,"11111111111")
      let {status,data} = res.data
      if (status){
        this.session = data
        this.oldSession.cid = data[0].cinema[0].brandName
        this.oldSession.mid = data[0].movies[0].title

      }
    },
    async inputFn(){
      console.log(this.session,"222222222222")

      this.newSession.money = this.session[0].money
      this.newSession.mid = this.session[0].movies[0].title
      this.newSession.cid =this.session[0].cinema[0].brandName
      this.newSession.status =1
      this.newSession.startTime = +new Date(this.session[0].startTime)

      if (this.newSession.mid ==  this.oldSession.mid){
        this.newSession.mid = this.session[0].mid
      }
      if (this.newSession.cid == this.oldSession.cid){
        this.newSession.cid = this.session[0].cid
      }
      console.log(this.newSession,"3333333333333333333")

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
    }
  },
  components: {},
  created() {

  },mounted() {
    this.getSeccId()
  }
}
</script>

<style scoped lang="scss">

</style>