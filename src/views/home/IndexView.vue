<template>
<!--  <dl class="card">-->
<!--    <dt class="card-header">IndexVie</dt>-->
<!--    <dd class="card-body">-->
<!--        首页推荐111-->
<!--    </dd>-->
<!--  </dl>-->
  <div>
    <div class="container">
      <el-container>
        <el-main>
          <el-row :gutter="20" v-if="hotMovie" class="text-center">
            <el-col  :xs="12" :sm="8" :md="8" :lg="6" :xl="2"  style="margin-bottom: 20px;" v-for="item in hotMovie" :key="item._id">
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
        </el-main>
        <el-aside style="width: 350px">
          <div class="padding hidden-md-and-down">
            <!--          广告位-->
            <AdCom >
              <!--            首页显示的方式-->
              <template v-slot="slotProps">
                  <h2 style="font-size: 16px;color: #007722;font-weight: 500">片单推荐</h2>
<!--                {{slotProps.AdMovie}}-->
                <ul v-if="slotProps.AdMovie" class="AdList">
                  <li v-for="(item,index) in slotProps.AdMovie" :key="item._id" style="font-size: 12px;color: #545652">
                    {{index+1}} &nbsp;
                    <a href="http://www.baidu.com">{{item.title}}</a>
                  </li>
                </ul>
              </template>


            </AdCom>
          </div>
        </el-aside>
      </el-container>

    </div>
  </div>
</template>

<script>
import AdCom from "@/components/AdCom";
export default {
  name: "IndexView",
  data() {
    return {
      hotMovie:null,

    }
  },
  computed: {},
  watch: {},
  methods: {
    async getHotData(){
      let {data}= await this.axios.get("/api/gettop");
     if (data.status){
       this.hotMovie = data.data
       console.log( this.hotMovie)
     }else {
       console.log("获取热门数据失败")
     }

      // console.log(this.hotMovie)
    }
  },
  components: {
    AdCom
  },
  created() {

  },
  mounted() {
    this.getHotData()
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
.AdList{
  >li{
    padding: 5px 0;
    border-bottom: 1px dashed #ddd;

    >a {
      font-size: 13px;
      color: #3377AA;
      &:hover{
        background-color: #3377aa;
        color: white;
      }
    }

  }
}
</style>