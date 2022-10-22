<template>
  <dl class="card">

    <dd class="card-body">
        <slot :adList="adList" :AdMovie="AdMovie">
        </slot>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "AdCom",
  data() {
    return {
      pageInfo:{
        pageSize:10,
        page:1
      },
      AdMovie:null,
      adList:[
        {
          name:"ad 1",
          pic:"http://localhost:6600/upload/top250/1.jpg",
          link:"http://www.baidu.com",
        },
        {
          name:"ad 2",
          pic:"http://localhost:6600/upload/top250/3.jpg",
          link:"http://www.baidu.com",
        },
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    async getAdData() {
      let {data}= await this.axios.get("/api/gettop");
      this.AdMovie = data.data
    }
  },
  components: {},
  created() {

  },mounted() {
    this.getAdData()
  }
}
</script>

<style scoped lang="scss">

</style>