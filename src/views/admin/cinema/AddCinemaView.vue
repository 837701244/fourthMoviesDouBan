<template>
  <el-card>

    <div slot="header" >
      <span>影院增加</span>
    </div>
    <div>
      <el-form :label-position="labelPosition" label-width="80px" :model="formdata">
        <el-form-item label="影院名称" style="width: 450px">
          <el-input v-model="formdata.brandName"></el-input>
        </el-form-item>
        <el-form-item label="影院地址"  style="width: 450px">
          <el-input v-model="formdata.cinemaAddress" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址选择"  style="width: 750px"  >
          <el-select v-model="pro"  placeholder="请选择省">
            <el-option
                v-for="(item,index) in address"
                :key="index"
                :label="item.name"
                :value="index"
            ></el-option>
          </el-select>
          <el-select v-model="city" placeholder="请选择市" v-if="pro!=-1">
            <el-option
                v-for="(item,index) in address[pro].areaList"
                :key="index"
                :label="item.name"
                :value="index"
            ></el-option>

          </el-select>
          <el-select v-model="country" placeholder="请选择区" v-if="city!=-1">
            <el-option
                v-for="(item,index) in address[pro].areaList[city].areaList"
                :key="index"
                :label="item.name"
                :value="index"
            ></el-option>

          </el-select>
          <div>
              <span v-if="pro!=-1">{{address[pro].name}}</span>&nbsp;
               <span v-if="city!=-1">{{address[pro].areaList[city].name}}</span>&nbsp;
               <span v-if="country!=-1">{{address[pro].areaList[city].areaList[country].name}}</span>&nbsp;
            <el-button size="mini" round @click="addressFn">确定</el-button>
          </div>
        </el-form-item>
        <el-form-item label="影院电话"  style="width: 450px">
          <el-input v-model="formdata.cinemaPhone"></el-input>
        </el-form-item>


        <el-form-item >
          <div style="width: 500px">
            <el-image :src="formdata.brandlogo" fit="fill"></el-image>
          </div>


          <el-upload
              class="upload-demo"
              drag
              name="img"
              action="/api/upload"
              :on-success="handlerSuccess"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">增加影院</el-button>
        </el-form-item>
      </el-form>
    </div >
  </el-card>
</template>

<script>

export default {
  name: "AddMovieView",
  data() {
    return {
      labelPosition: 'right',
      formdata: {
        brandName: '',
        cinemaAddress: '',
        cinemaPhone: '',
        brandlogo:''
      },
      address:null,
      pro:-1,
      city:-1,
      country:-1,
      lastCity:"",


    }
  },
  computed: {

  },
  watch: {
    pro(n,o){
      if (n!=o){
        this.city=-1;
        this.country=-1;
      }
    },
    city(n,o){
      if (n!=o){
        this.country=-1;
      }
    }
  },
  methods: {
    openMes(tex,statu) {
      this.$message({
        message: tex,
        type:statu
      });
    },
    async  onSubmit(){
      let obj = {...this.formdata}
      console.log(this.formdata)
      let {status,data} = await this.axios.post("/api/addCm",obj)
      if (status){
        this.formdata = {
          brandName: '',
          cinemaAddress: '',
          cinemaPhone: '',
          brandlogo:''
        }
        this.openMes("添加成功","success")
        this.$router.push("/admin/cinemamanage")
      }else {
        this.openMes("添加失败","error")
      }
    },
    handleRemove(file, fileList) {
      this.formdata.brandlogo = ""
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
      // this.fileList = fileList.slice(-3);
    },
    handlerSuccess(res, file){
      console.log(res.path, file)
      this.formdata.brandlogo = "http://localhost:6600/"+res.path
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    async getcity(){
      let {data} = await this.axios.get("/api/getCity")
      this.address = data
    },
    addressFn(){
      if (this.pro === -1 || this.city ===-1 || this.country ===-1){
        return this.$message({
         message: "地址未填写完成",
          type:"error"
        })
      }
      this.formdata.cinemaAddress = this.address[this.pro].name +"" +this.address[this.pro].areaList[this.city].name +"" +this.address[this.pro].areaList[this.city].areaList[this.country].name
    }
  },
  components: {},
  created() {

  },
  mounted() {
    this.getcity()
  }
}
</script>

<style scoped lang="scss">

</style>