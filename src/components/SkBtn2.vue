<template>
  <dl class="card">
    <dt class="card-header">SkBtn2</dt>
    <dd class="card-body">
      <button>
        <slot name="title"></slot>
      </button>
      <slot name="content"></slot>
    </dd>
  </dl>
</template>

<script>
export default {
  name: "SkBtn2",
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

</style>