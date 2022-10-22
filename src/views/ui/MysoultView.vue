<template>
  <dl class="card">
    <dt class="card-header">MysoultView</dt>
    <dd class="card-body">
          <SkBtn>
              <div>
                <button>蓝色按钮</button>
              </div>
          </SkBtn>
      <br>
      <SkBtn2>
            <template v-slot:title>
              这是按钮的标题
            </template>
            <template #content>
              这是按钮的提示内容
            </template>
      </SkBtn2>
    </dd>
    <dd>
      <hr>
      <SkBtnPre>
          <template v-slot="slotProps">
            {{slotProps}}
            <button :class="slotProps.myclass">xx</button>
          </template>

      </SkBtnPre>
    </dd>
  </dl>
</template>

<script>
import SkBtn from "@/components/SkBtn";
import SkBtn2 from "@/components/SkBtn2";
import SkBtnPre from "@/components/SkBtnPre";
export default {
  name: "MysoultView",
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  components: {
    SkBtn,SkBtn2,SkBtnPre
  },
  created() {

  }
}
</script>

<style scoped lang="scss">

</style>