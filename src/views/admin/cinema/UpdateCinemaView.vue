<template>
  <el-card class="box-card" >
    <div slot="header">
      <span>用户修改</span>
    </div>
    <div v-if="cmEdit">
      <el-form label-position="left" label-width="80px" :model="cmEdit">
        <el-form-item label="影院名稱" style="width: 450px">
          <el-input v-model="cmEdit.brandName"></el-input>
        </el-form-item>
        <el-form-item label="影院地址" >
          <el-input v-model="cmEdit.cinemaAddress"  :disabled="true" style="width: 370px;"></el-input>
          <el-button size="mini" round @click="onOff = !onOff" style="margin-left: 10px">重新填写</el-button>
        </el-form-item>
        <el-form-item label="地址选择"  style="width: 750px"  v-if="onOff">
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
            <el-button size="mini" round @click="addressFn">确定修改</el-button>
          </div>
        </el-form-item>


        <el-form-item label="影院電話" style="width: 450px">
          <el-input v-model="cmEdit.cinemaPhone"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="width: 500px">
            <el-image :src="cmEdit.brandlogo" fit="fill"></el-image>
          </div>
          <el-upload
              class="upload-demo"
              drag
              name="img"
              action="/api/upload"
              :on-success="handlerSuccess"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">修改影院</el-button>
        </el-form-item>
      </el-form>
    </div >
    {{id}}
    {{cmEdit}}
  </el-card>
</template>

<script>
export default {
  name: "updateUserView",
  props:['id'],
  data() {
    return {
     cmEdit:null,
      onOff:false,
      address:null,
      pro:-1,
      city:-1,
      country:-1,
    }
  },
  computed: {

  },
  watch: {},
  methods: {
    async getUser(){
      let {data} = await  this.axios.post("/api/findByIdCm",{id:this.id})
      if (data.status){
        this.cmEdit = data.data
      }
    },
    handlerSuccess(res, file){
      console.log(res.path, file)
      this.cmEdit.brandlogo = "http://localhost:6600/"+res.path
    },
    async onSubmit(){
      let obj = {...this.cmEdit}
      delete obj.pwd;
      let {data} = await this.axios.post("/api/updataCm",obj)
      console.log(data)
      if (obj == this.cmEdit){
       return  this.$router.replace("/admin/cinemamanage")
      }
      if (data.status){
        this.$message({
          message:"修改成功",
          type:"success"
        })
        this.$router.replace("/admin/cinemamanage")
      }else {
        this.$message({
          message:"修改失败",
          type:"error"
        })
      }
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
      this.cmEdit.cinemaAddress = this.address[this.pro].name +"" +this.address[this.pro].areaList[this.city].name +"" +this.address[this.pro].areaList[this.city].areaList[this.country].name
      this.onOff = !this.onOff
    }
  },
  components: {},
  created() {

  },mounted() {
    this.getUser()
    this.getcity()
  }
}
</script>

<style scoped lang="scss">

</style>