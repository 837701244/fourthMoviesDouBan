<template>
  <dl class="card">
    <dt class="card-header">testcity</dt>
    <dd class="card-body">
      <div class="block">
        <span class="demonstration">默认 click 触发子菜单</span>
        <el-cascader
            v-model="value"
            :options="citys"
           ></el-cascader>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "testcity",
  data() {
    return {
      citys:null,
    }
  },
  computed: {},
    watch: {},
  methods: {
    async getDate(){
      let {data} = await this.axios.get("/api/getCity")
      console.log(data)
      this.citys = data
      this.citys =this.setNewDate(data);
    },
    setNewDate(arr){
      return arr.map(item=>{
          return {value:item.name,label:item.name,children:item.areaList? this.setNewDate(item.areaList):null}
      })
    }
  },
  components: {},
  created() {

  },mounted() {
    this.getDate();
  }
}
</script>

<style scoped lang="scss">

</style>