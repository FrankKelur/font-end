<template lang="pug">
<<<<<<< HEAD
  .notify-pass(v-loading="loading" element-loading-text="加载中")
=======
  .notify-pass.theme-color-C(v-loading="loading" element-loading-text="加载中")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    | 通知通道
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
  .notify-pass{
  }
</style>
