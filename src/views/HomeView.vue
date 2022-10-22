<template>
  <div>
    <el-header style="height: auto; padding: 0"  >
      <HeaderCom></HeaderCom>
    </el-header>

      <el-main class="border-right">
          <keep-alive >
            <router-view v-if="$route.meta.isKeepAlive">前台二级路由</router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.isKeepAlive"></router-view>
      </el-main>

    <el-footer style="height: auto;">
      <FooterCom></FooterCom>
    </el-footer>

  </div>


</template>

<script>
import HeaderCom from "@/components/HeaderCom";
import FooterCom from "@/components/FooterCom";


export default {
  name: "HomeView",
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  components: {
    HeaderCom,
    FooterCom,
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
.el-footer{
  height: auto;
}
</style>