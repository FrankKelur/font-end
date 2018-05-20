<template lang="pug">
  .b-title.theme-border-D
    div.color-block.theme-bg-A.theme-color-darken15-C
    .inline-text(v-text="this.title")
</template>

<script>
  export default {
    name: 'b-title',
    data () {
      return {
      }
    },
    props: {
      title: String,
      required: true
    },
    mounted () {

    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/styleSheet/variable.less';

  .b-title {
    padding: 6px 0;
    box-sizing: border-box;
    width: 100%;
    font-size: 16px;
    margin-bottom: @headerMargin;
    border: solid;
    border-bottom-width: 1px;
    border-top-width: 0;
    border-left-width: 0;
    border-right-width: 0;
    .inline-text {
      padding-top: 2px;
      display: inline-block;
      margin-left: 1.2%;
      position: relative;
      left: -4px;
    }
    .color-block {
      height: 20px;
      width: 4px;
      display: inline-block;
      vertical-align: sub;
      vertical-align: top;
    }
  }
</style>
