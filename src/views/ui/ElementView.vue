<template>
 <div>
        <h2>外层布局</h2>
       <el-header class="bg-silver">header</el-header>
      <el-container class="container" >
        <el-aside>Aside</el-aside>
        <el-container>
          <el-main>Main</el-main>
        </el-container>
      </el-container>
        <el-footer class="bg-pink">footer</el-footer>
    <h2>行列布局</h2>
   <el-row>
     <el-col :span="24" class="bg-danger">通栏</el-col>
      <el-col :span="12" class="bg-success">半栏</el-col>
      <el-col :span="12" class="bg-info">半栏</el-col>
      <el-col :span="8" class="bg-pink">半栏</el-col>
      <el-col :span="6" class="bg-green">半栏</el-col>
      <el-col :span="4" class="bg-yellow">半栏</el-col>
      <el-col :span="2" class="bg-orange">半栏</el-col>
   </el-row>


   <el-row :gutter="10">
     <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
       超小屏幕8/24
       小屏 6/24
       中屏幕 4/24
       大屏 3/24
       超大屏 1/24
     </el-col>
     <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">超小屏幕8/24</el-col>
     <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">超小屏幕8/24</el-col>
     <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">超小屏幕8/24</el-col>

     <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4"></el-col>


   </el-row>
 </div>
</template>

<script>
export default {
  name: "ElementView",
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  components: {},
  created() {

  }
}
</script>

<style scoped lang="scss">
//.container{
//  width: 1200px;
//}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>