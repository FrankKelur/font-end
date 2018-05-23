<template lang="pug">
  .talk-pass.theme-color-C(v-loading="loading" element-loading-text="加载中")
    | 沟通通道
</template>

<script>
  export default {
    data () {
      return {
        loading: true
      }
    },
    props: {
    },
    methods: {
    },
    mounted () {
      var vm = this
      setTimeout(function () {
        vm.loading = false
      }, 1500)
    },
    components: {
    }
  }
</script>

<style lang="less">
  @import '../../../common/styleSheet/common.less';
  .talk-pass{
  }
</style>
