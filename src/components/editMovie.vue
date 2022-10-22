<template>

    <div v-if="editDate">
      <el-form :label-position="labelPosition" label-width="80px" :model="formdata">
        <el-form-item label="电影名称">
          <el-input v-model="formdata.title"></el-input>
        </el-form-item>
        <el-form-item label="上映区域">
          <el-input v-model="formdata.areaName"></el-input>
        </el-form-item>
        <el-form-item label="电影简介">
          <el-input v-model="formdata.brief"></el-input>
        </el-form-item>
        <el-form-item label="电影语言">
          <el-input v-model="formdata.language"></el-input>
        </el-form-item>
        <el-form-item label="电影类型">
          <el-select v-model="formdata.rating" placeholder="请选择电影类型">
            <el-option label="动漫" value="1"></el-option>
            <el-option label="恐怖" value="2"></el-option>
          </el-select>
        </el-form-item>

        <!--        <el-form-item label="电影状态">-->
        <!--          <el-input v-model="formdata.state"></el-input>-->
        <!--        </el-form-item>-->

        <!--        <el-form-item label="电影状态">-->
        <!--          <el-radio-group v-model="formdata.state">-->
        <!--            <el-radio label="1" value="上映"></el-radio>-->
        <!--            <el-radio label="0" value="下线"></el-radio>-->
        <!--          </el-radio-group>-->
        <!--        </el-form-item>-->
        <el-form-item label="电影状态">
          <el-select v-model="formdata.state" placeholder="请选择电影类型">
            <el-option label="上映" value="1"></el-option>
            <el-option label="下线" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <div style="width: 500px">
            <el-image :src="formdata.image" fit="fill"></el-image>

          </div>


          <el-upload
              class="upload-demo"
              drag
              name="img"
              action="/api/upload"
              :on-success="handlerSuccess"
              :before-remove="beforeRemove"
              :on-change="handleChange"
              :on-remove="handleRemove"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onEdit">修改电影</el-button>
        </el-form-item>
      </el-form>
    </div>

</template>

<script>
export default {
  name: "editMovie",
  data() {
    return {
      editDate:{}
    }
  },
  computed: {},
  watch: {},
  methods: {
    onEdit(){

    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    handleRemove(file, fileList) {
      this.editDate.image = ""
    },
    handlerSuccess(res, file){
      console.log(res.path, file)
      this.editDate.image = "http://localhost:6600/"+res.path
    },

  },
  components: {},
  created() {

  }
}
</script>

<style scoped lang="scss">

</style>