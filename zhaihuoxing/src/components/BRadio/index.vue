<template lang="pug">
  el-radio(v-model="data", :label="label", v-if="propModelExist").b-radio
    slot
  el-radio(:label="label", v-else).b-radio
    slot
</template>

<script>
  import Vue from 'vue'
  import { Radio } from 'element-ui'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(Radio)

  export default {

    name: 'b-radio',
    mixins: [styleMixin],
    data () {
      return {
        // maxin less style string
        styleMixinLess: styleMixinLess,
        data: this.model
      }
    },
    props: ['label', 'model'],
    watch: {
      model: function (val) {
        this.data = val
      },
      data: function (val) {
        this.$emit('update:model', val)
        this.$emit('change')
      }
    },
    mounted () {

    },
    computed: {
      propModelExist: function () {
        return typeof this.model !== 'undefined'
      }
    }
  }
</script>

<style lang="less" scoped>


</style>
