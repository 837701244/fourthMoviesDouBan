<template>
  <dl class="card">
    <dt class="card-header">SkBtnPre带有传参的组件</dt>
    <dd class="card-body">
      <slot :myclass = "myclass">子组件</slot>

    </dd>
  </dl>
</template>

<script>
export default {
  name: "SkBtnPre",
  data() {
    return {
      myclass:"bg-red",
    }
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

</style>