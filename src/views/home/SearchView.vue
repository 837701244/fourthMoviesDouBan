<template>
  <dl class="card">
    <dd class="card-body container">
      <h2>宁搜索的是<strong style="color: red"> {{ w }}</strong></h2>
      <div v-if="!movieInfo">
        <el-alert
            title="未寻找到"
            type="warning">
        </el-alert>
      </div>
      <div v-if="movieInfo">
        <el-row :gutter="20"  class="text-center">
          <el-col  :xs="12" :sm="8" :md="8" :lg="6" :xl="2"  style="margin-bottom: 20px;" v-for="item in movieInfo.data" :key="item._id">
            <div>
              <div style="width: 120px">
                <router-link :to="'/home/detail/'+item._id">
                  <el-image
                      style="height: 180px;"
                      :src="item.image"
                      fit="fill"></el-image>
                </router-link>

              </div>
              <div style="text-align: center;width: 120px" class="overflow" title="item.title">
                {{item.title}}
              </div>
              <div style="width: 150px">
                <el-rate
                    v-model="item.rating/2"
                    disabled
                    show-score
                    text-color="#ff9900"
                    :max="5"
                >
                </el-rate>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>

    </dd>
  </dl>
</template>

<script>
export default {
  name: "SearchView",
  props:["w"],
  data() {
    return {
      movieInfo:null,
      pageInfo:{
        pageSize:12,
        page:1
      }
    }
  },
  computed: {},
  watch: {
    w(n,o){
      if (!n){
        return this.$message("搜索不能为空")
      }
      if (n!=o){
        this.getSearch(n)
      }

    }
  },
  methods: {
    async getSearch(word){
      let {data} = await this.axios.get("/api/searchMove",{params:{word,...this.pageInfo}})
     if (data.status){
       if (data.data.length!=0){
         this.movieInfo = data
         // this.movieDate = data.data
         console.log(this.movieInfo)
       }else {
         this.movieInfo = null
         console.log(this.movieInfo)
       }
     }
    }
  },
  components: {},
  created() {

  },mounted() {
    this.getSearch(this.w)
  }
}
</script>

<style scoped lang="scss">

</style>