<template lang="pug">
  div#text_center_footer.theme-bg-J.theme-color-H {{renderData.centerFooterText}}
</template>

<script>
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'text_center_footer',
    mixins: [componentMixin],
    data () {
      var footer = window.renderData.components.text_center_footer
      var renderData = Object.assign({}, footer, footer.text_center_footer_auth)
      return {
        renderData: renderData
      }
    },
    components: {}
  }
</script>

<style lang="less" scoped>
  div#text_center_footer {
    line-height: 36px;
    font-size: 12px;
    text-align: center;
  }
</style>
