<template>
  <el-card>
    <div slot="header">后台数据统计</div>

    <div class="flex flex-wrap">
      <div id="allDataArea" class="charAll " style="border-bottom: 1px dashed  #ddd"></div>
      <div id="" class="flex-item-0 charOne" style="border-right:1px dashed  #d5d5d5 ;box-sizing: border-box">
            <div style="width: 100%;height: 100% ;margin-top: 50px" id="MoviedataArea"></div>
      </div>
      <div id="" class="charOne flex-item-0">
            <div style="width: 100%;height: 100%;margin-top: 30px" id="userDataArea">

            </div>
      </div>

    </div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import {mapState} from "vuex"
export default {
  name: "IndexView",
  data() {
    return {
      optionUser : {
        title: {
          text: '用户类型统计',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
      option :{
        title: {
          text: '电影统计',
          subtext: '小电影统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      optionAll :{
        title: {
          text: '全部统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      }

    }
  },
  computed: {
    ...mapState(["categoryList","userStatus"])
  },
  watch: {},
  methods: {
    avg(arr){
      let sum = 0
      for (let i = 0; i < arr.length; i++) {
        sum+=arr[i]
      }
      return Math.ceil(sum/arr.length)
    },
    async getAllCount(){
      let {data} = await this.axios.post("/api/getCount")
      console.log(data)
      if (data.status){
        this.optionAll.series[0].data = [
            {value:data.cinemaCount,name:"影院数量"},
            {value:data.moviesCount,name:"电影数量"},
            {value:data.userCount,name:"用户数量"},
        ]
        this.initChart("allDataArea",this.optionAll)
      }
    },

    async getUserCateCount(){
      let {data} = await this.axios.post("/api/getUserCharts");
      console.log(data)
      if (data.status){
        this.optionUser.xAxis.data=this.userStatus
       let avg =this.avg(data.data)

        let newUserdata =data.data.map(item=>{
          if (item<avg){
            return{value:item,itemStyle: {color:'#ff7070'}}
          }else {
            return {value:item,itemStyle: {color:'#7ed3f4'}}
          }
        })
        console.log(newUserdata,"22222222222")
        this.optionUser.series[0].data = newUserdata
        this.initChart('userDataArea',this.optionUser)

       }

    },
    async getMovieCateCount(){
      let {data} = await this.axios.post("/api/getCharts")
      if (data.status){
        console.log(data.data)
        //柱状图数据
        //this.option.series[0].data = data.data

        //饼图的数据
        let arr = this.option.series[0].data
        let newArr = data.data.map((item,index)=>{
          return {value:item,name:this.categoryList[index]}
        })
        console.log(newArr,"11111")
        this.option.series[0].data = newArr

        this.initChart('MoviedataArea',this.option)
      }
    },
    initChart(areaName,data){
      //dom操作 加载 绘图到指定区域
      let myChart = echarts.init(document.getElementById(areaName));
      //加载数据配置项
      data && myChart.setOption(data);
    }
  },
  components: {},
  created() {
    //柱状图的数据
    // this.option.yAxis.data = this.categoryList



  },mounted() {
    //获取各项类型的数量
    // this.getMovieCateCount()
    this.getUserCateCount()
    this.getMovieCateCount()
    this.getAllCount()
  }
}
</script>

<style scoped lang="scss">
.dataArea{
  width: 100%;
  height: 1000px;
}
.charOne{
  width: 50%;
  height: 500px;
}
.charAll{
  width: 100%;
  height: 500px;
}
</style>