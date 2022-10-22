<template>
  <div class="container  flex flex-space-between" style="padding: 3px 0;border-top: 1px dashed #ddd">
    <div>
      <span class="spanFont">
        © 2005－2022 douban.com, all rights reserved 北京豆网科技有限公司
      </span>
    </div>
    <div class="aFont">
      关于豆瓣 · 在豆瓣工作 · 联系我们 · 法律声明 · 帮助中心 · 移动应用 · 豆瓣广告
    </div>

  </div>
</template>

<script>
export default {
  name: "FooterCom",
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
.fa {
  height: 100%;
}
.spanFont{
  font-size: 12px;
  color: #999;
}
.aFont{
  font-size: 12px;
  color: #3377AA;
}
</style>