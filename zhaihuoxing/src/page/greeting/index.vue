<template lang="pug">
  div.hei-100.amt-left-in
     #greeting
      .logo
        img(:src="brokerSetting.logo_url")
      h1.theme-color-C {{renderData.greetingText}}
      p.theme-color-C(v-for="text in textList") {{text}}
</template>

<script>
  import componentMixin from 'common/js/componentMixin'

  export default {

    name: 'greeting',
    mixins: [componentMixin],
    created () {
      console.log(4444444444)
      console.log(window.renderData.broker_setting)
      console.log(window.renderData)
    },
    data () {
      return {
        renderData: Object.assign({}, window.renderData.components.greeting, window.renderData.components.greeting.greeting_auth),
        brokerSetting: Object.assign({}, window.renderData.broker_setting)
      }
    },
    computed: {
      textList () {
        return this.renderData.greetingTitle.split('\n')
      }
    },
    components: {}
  }
</script>

<style lang="less" scoped>
  .hei-100{
    height: 100%;
  }
  #greeting {
    .logo {
      height: 44px;
      margin-bottom: 50px;
      img {
        height: 100%;
        max-width: 100%;
      }
    }
    h1 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    p {
      line-height: 24px;
      overflow: hidden;
      text-align: justify;
    }
  }
</style>
