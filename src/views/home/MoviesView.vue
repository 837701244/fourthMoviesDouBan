<template>
  <el-container class="container">
    <el-main style="overflow: visible" class="overflow">
      <h2>电影列表</h2>
     <div>
       <ul class="flex movieList hand">
         <li @click="openList">类型<i class="el-icon-arrow-down" v-if="!listFlag"></i><i class="el-icon-arrow-up" v-if="listFlag"></i>
           <ul class="flex flex-wrap" v-show="listFlag">
             <li v-for="(item,index) in categoryList" :key="index">
               <router-link :to="'/home/movies/'+ index">{{item}}</router-link>
             </li>
           </ul>
         </li>
         <li>地区<i class="el-icon-arrow-down"></i></li>
         <li>年代<i class="el-icon-arrow-down"></i></li>
         <li>标签<i class="el-icon-arrow-down"></i></li>
         <li>排序<i class="el-icon-arrow-down"></i></li>
       </ul>
     </div>
      <el-row :gutter="20" v-if="movieList" class="text-center" style="margin-top: 30px" >
        <el-col  :xs="12" :sm="8" :md="8" :lg="6" :xl="2"  style="margin-bottom: 20px;" v-for="(item,index) in movieList" :key="index">
          <div style="width: 120px">
            <div style="width: 120px">
              <router-link :to="'/home/detail/'+item._id">
                <el-image
                    style="height: 180px;"
                    :src="item.image"
                    fit="fill"></el-image>
              </router-link>

            </div>
            <div style="text-align: center;width: 120px" class="overflow" :title="item.title">
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

      <el-pagination
          v-if="moviePag"
          :hide-on-single-page=false
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :total="moviePag.count">
      </el-pagination>
<!--      <div v-if="movieList" v-for="item in movieList" style="margin-top: 50px">{{item.title}} </div>-->
<!--      <div>{{this.category}}</div>-->
    </el-main>
    <el-aside style="border-left: 1px solid red">
      <div>广告</div>
    </el-aside>
  </el-container>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "MoviesView",
  props:['category'],
  data() {
    return {
      listFlag:false,
      movieCate:0,
      movieList:null,
      pageInfo:{
        page:1,
        pageSize:8
      },
      moviePag:null
    }
  },
  computed: {
  ...mapState(['categoryList'])
  },
  watch: {
    category(n,o){
      if (n!=o){
        this.movieCate =n
        this.getCateMovie()
      }
    }
  },
  methods: {
    handleCurrentChange(page){
      console.log(page)
      this.pageInfo.page= page
      this.getCateMovie()
    },
    openList(){
      this.listFlag = !this.listFlag
    },
    async getCateMovie(){
        let {data} = await this.axios.post("/api/getCatePage",{cate:this.movieCate,...this.pageInfo})
      // console.log(this.movieCate)
      console.log(data)
      if (data.status){
        this.moviePag = data
        this.movieList = data.data
      }
    }
  },
  components: {},
  created() {

  },mounted() {
    if (this.category){
      this.movieCate = this.category
    }
      this.getCateMovie();

  }
}
</script>

<style scoped lang="scss">


.overflow {
  //文字超出区域隐藏
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.movieList{
  >li{
    &:first-child{
      padding-left: 0;
      margin-left: 0;
    }
    font-size: 14px;
    color: #111;
    padding: 5px;
    margin: 0 5px;
    &:hover{
      background-color: #f0f3f5;
    }
    &:nth-child(1){
      position: relative;
      >ul{
        position: absolute;
        bottom: -100px;
        left: 0px;
        width: 675px;
        background-color: #f0f3f5;
        padding: 5px;
        z-index: 10;
        >li{
          padding: 5px;
          background-color: #fdfdfd;
          margin: 8px;
          border-radius: 5px;
        }
      }
    }
  }

}
</style>