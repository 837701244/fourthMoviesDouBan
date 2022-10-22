<template>
  <el-card class="box-card" v-if="movie">
     <div slot="header">
        <span>电影修改</span>
     </div>
    <div>
      <el-form ref="myform" label-position="left" label-width="80px" :model="movie">
        <el-form-item label="电影名称">
          <el-input v-model="movie.title"></el-input>
        </el-form-item>
        <el-form-item label="电影演员">
          <el-input v-model="movie.actor"></el-input>
        </el-form-item>
        <el-form-item label="电影简介">
          <el-input type="textarea" v-model="movie.brief" :autosize="true"></el-input>
        </el-form-item>
        <el-form-item label="电影类型">
          <el-select v-model="movie.category" placeholder="请选择电影类型">
            <el-option
                v-for="(item,index) in categoryList"
                :key="index"
                :label="item"
                :value="index"
            >

            </el-option>

          </el-select>

        </el-form-item>
        <el-form-item label="电影语言">
          <el-input v-model="movie.language"></el-input>
        </el-form-item>
        <el-form-item label="电影评分">
          <el-rate v-model="movie.rating" :max="10"></el-rate>
        </el-form-item>
        <el-form-item label="电影状态">
          <el-radio-group v-model="movie.state">
            <el-radio :label="1">上架</el-radio>
            <el-radio :label="2">下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上映时间">
          <el-date-picker
            v-model="movie.pbtime"
            type="datetime"
            placeholder="选择日期时间"
          >

          </el-date-picker>
        </el-form-item>
        <el-form-item label="图片">
          <img :src="movie.image" style="width: 200px">
          <el-upload
              name="img"
              class="upload-demo"
              :on-success="handlerSuccess"
              action="/api/upload"
              multiple
              :limit="3">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onUpdate">修改</el-button>
          <el-button @click="goBack">取消</el-button>
        </el-form-item>
      </el-form>

    </div>
    {{id}}
    {{movie}}
  </el-card>
</template>

<script>
import { mapState} from 'vuex';
export default {
  name: "EditMovieView",
  props:["id"],
  data() {
    return {
      movie:null,
      options:[
        {
          value:0,
          label:"默认"
        },
        {
          value:1,
          label:"动漫"
        },
        {
          value:2,
          label:"动作"
        },
        {
          value:3,
          label:"爱情"
        },
        {
          value:4,
          label:"喜剧"
        },
        {
          value:5,
          label:"科幻"
        },
        {
          value:6,
          label:"其他"
        },
      ],
      oldOptions:["动作","爱情","动漫","恐怖","动作","爱情","动漫","恐怖","动作","爱情","动漫","恐怖","动作","爱情","动漫","恐怖",,"动作","爱情","动漫","恐怖"]
    }
  },
  computed: {
    ...mapState(['categoryList'])
  },
  watch: {},
  methods: {
    async getDetail() {
      let id = this.id
      let {data:res} = await this.axios.get("/api/getShow",{params:{id}})
      if (res.status){
        this.movie = res.data
        console.log(this.movie)
      }else {
        console.log("未找到电影数据")
      }

    },

    handlerSuccess(res,file){
        this.movie.image = "http://localhost:6600/"+res.path
    },
    async onUpdate(){
          let obj = {...this.movie}
          obj.pbtime = +new Date(obj.pbtime)
          let {data} = await  this.axios.post("/api/updateMovie",obj)
          let {status} = data
      if (status){
        this.$router.push("/admin/moviemanage")
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }else {
        this.$message({
          message: '修改失败',
          type: 'warning'
        });
      }
    },
    goBack(){
      this.$router.push("/admin/moviemanage")
    },
  },
  components: {},
  created() {

  },mounted() {
    this.getDetail()
  }
}
</script>

<style scoped >
/deep/ .el-upload-list{display: none}

.el-upload__tip{
  display: none;
}


</style>