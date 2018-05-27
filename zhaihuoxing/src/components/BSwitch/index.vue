<template lang="pug">
  el-switch(v-model="beRequired", :width="width", @change="changeHandle")
</template>

<script>
  import Vue from 'vue'
  import { Switch } from 'element-ui'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(Switch)
  export default {
    name: 'b-switch',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess,
        beRequired: this.model
      }
    },
    mounted () {
    },
    watch: {
      model: function (newVal, oldVal) {
        this.beRequired = newVal
      }
    },
    methods: {
      changeHandle () {
//        console.log('change', this.beRequired)
        this.$emit('change')
      }
    },
    props: {
      model: {
        type: Boolean,
        required: true,
        default: false
      },
      width: {
        type: Number,
        required: true
      }
    }
  }

</script>
<style lang="less">

</style>
