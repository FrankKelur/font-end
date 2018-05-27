<template lang="pug">
  el-steps.b-steps(:direction="direction", :active='active', :space="space")
    slot
</template>

<script>
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  export default {
    mixins: [styleMixin],
    name: 'b-steps',
    data () {
      return {
        styleMixinLess: styleMixinLess
      }
    },
    props: {
      direction: {
        type: String,
        default: 'vertical'
      },
      active: {
        type: Number,
        required: true
      },
      space: {}
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .b-steps {
  }
</style>
