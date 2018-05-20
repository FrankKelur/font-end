<template lang="pug">
  el-alert.b-alert(:title="title", :description='description', :showIcon="showIcon", :type="type", :closable="closable")
</template>

<script>
  export default {
    name: 'b-alert',
    data () {
      return {}
    },
    props: {
      type: {
        type: String,
        default: 'warning'
      },
      showIcon: {
        type: Boolean,
        default: true
      },
      closable: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        required: true
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .b-alert {
    .el-alert__description {
      white-space: pre !important;
    }
  }
</style>
