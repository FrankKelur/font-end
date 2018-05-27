<template lang="pug">
  el-tooltip.b-tooltip(:placement="placement", :content="content", :effect="effect")
    slot
</template>

<script>
  export default {
    name: 'b-tooltip',
    data () {
      return {}
    },
    props: {
      placement: {
        type: String,
        default: 'top'
      },
      content: {
        type: String,
        required: true
      },
      effect: {
        type: String,
        default: 'dark'
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .b-tooltip {
  }
</style>
