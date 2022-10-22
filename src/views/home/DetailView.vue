<template>
 <el-container class="container">
   <el-main v-if="movie" >
     <h1 style="font-size: 26px;color: #494949">{{movie.title}}
      <span style="color:#888;">({{movieTime.split("-")[0]}})</span>
     </h1>
     <div class="clearfix" style="padding-right:40px;">
          <div class="float-left">
                <div class="float-left" style="margin-right: 30px">
                  <img :src="movie.image" alt="" style="width: 135px">
                </div>
            <div class="float-left movieContText" style="width: 300px" >
                <span>导演:<span><a href="#">xxx</a></span></span><br>
                <span>编剧:<span><a href="#">xxx</a></span></span><br>
                <span>主演:<span>{{movie.actor.split(":")[1]}}</span></span><br>
                <span>类型:<span>{{categoryList[movie.category]}}</span></span><br>
                <span>官网网站:<span><a href="http://www.baidu.com">{{movie.link}}</a></span></span><br>
                <span>制片国家:<span>{{movie.areaName}}</span></span><br>
                <span>语言:<span>{{movie.language}}</span></span><br>
                <span>上映时间:<span>{{movie.pbtime|skSetDate('yyyy年MM月dd日')}}</span></span><br>
                <span>片长:<span>{{movie.timeCount}}分钟</span></span><br>
                <span>状态:<span>{{movie.state|skSetState}}</span></span><br>
            </div>
          </div>
          <div class="float-right moveRating " style="width: 155px">
              <div class="MovieRatingText">豆瓣评分</div>
              <div class="ratingNum clearfix">
              <span class="float-left" style="margin-right: 7px" >{{movie.rating}}</span>
                <div class="float-left">
                  <el-rate
                      v-model="movie.rating/2"
                      disabled
                      text-color="#ff9900"
                     >
                  </el-rate>
                  <span class="judgeSize">{{movie.judge}}人评论</span>
                </div>



            </div>
              <div>
                <el-progress :percentage="50" status="warning"></el-progress>
              </div>
          </div>
     </div>
   </el-main>
   <el-aside style="border-left: 1px solid red" class="hidden-md-and-down">
      广告
   </el-aside>
 </el-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "DetailView",
  props:["id"],
  data() {
    return {
      movie:null,
      movieTime:null,
    }
  },
  computed: {
    ...mapState(['categoryList'])
  },
  watch: {},
  methods: {
    async getDetail(){
      let id = this.id
      console.log("634ba15c7914a3a3fc37ba5e");
      console.log(id)
      let {data} = await this.axios.get("/api/getShow",{params:{id}})
      if (data.status){
        this.movie = data.data
        this.movieTime =  this.getTime(data.data.pbtime)  ;
      }else {
        this.$message("电影查询失败")
        this.$router.push("/home")
        console.log("电影详情查询失败")
      }

    },
    getTime(time) {
//1、实例化时间对象
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let date1 = date.getDate()
      let hour = date.getHours()
      let min = date.getMinutes()
      let sec = date.getSeconds()
      let newTime = `${year}-${month}-${date1} ${hour}:${min}:${sec}`
      return newTime
    },
  },
  filters:{
    // 时间处理
    // skSetDate(self,str="yyyy年MM月dd日 HH mm ss"){
    //   console.log(self)
    //   let skDate=new Date(self);
    //   //获取时间对象
    //   let year = skDate.getFullYear()   //获取年
    //       , moth = skDate.getMonth() + 1   //获取月
    //       , _day = skDate.getDate()      //获取日
    //       , hours = skDate.getHours()    //小时
    //       , minutes = skDate.getMinutes() //分钟
    //       , seconds = skDate.getSeconds(); //秒
    //   hours = hours < 10 ? "0" + hours : hours;             //判断小时如果小于10则与0字符拼接
    //   minutes = minutes < 10 ? "0" + minutes : minutes;
    //   seconds = seconds < 10 ? "0" + seconds : seconds;
    //   str = str.replace("yyyy", year);
    //   str = str.replace("MM", moth);
    //   str = str.replace("dd", _day);
    //   str = str.replace("HH", hours);
    //   str = str.replace("mm", minutes);
    //   str = str.replace("ss", seconds);
    //   return str; //返回
    // },
  },
  components: {},
  created() {

  },mounted() {
    this.getDetail()

  },directives: {
    'link': {
        bind(el,binding){

        },
      inserted(el,binding){

      },update(){

      }

    }
  }
}
</script>

<style scoped lang="scss">
//.ratingNum>.el-rate>span{
//  width: 20px;
//}
.judgeSize{
  font-size: 12px;
  color: #3377AA;
}
.el-rate__icon{
 margin: 0;
}
.moveRating{
  padding-left: 15px;
  border-left: 1px solid #eaeaea;
}
.MovieRatingText{
  font-size: 12px;
  color: #9b9b9b;
}
.ratingNum{
  font-size: 28px;
  color: #494949;
}
.movieContText{
  >span{
    font-size: 13px;
    color: #666;


    >span{
      padding: 4px;
      color: #111;
      >a{
        font-size: 13px;
        color: #3377AA;
      }
    }
  }
}
</style>