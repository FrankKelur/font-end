<template lang="pug">
  .channel_setting.theme-border-lightenD12.component#channel_setting
    .kongdiv1
      b-title.amt-more-left-in(:title="renderData.channel_setting_auth.channelSetting")
    .amt-more-left-in
      el-tabs(v-model="whichTab" type="card", v-if="renderData.channel_setting_bank || renderData.channel_setting_trade || renderData.channel_setting_notification || renderData.channel_setting_talk")
        el-tab-pane(v-if="renderData.channel_setting_bank", :label="renderData.channel_setting_bank.channelSettingBank" name="channelSettingBank")
          blank-pass
        el-tab-pane(v-if="renderData.channel_setting_trade", :label="renderData.channel_setting_trade.channelSettingTrade" name="channelSettingTrade")
          trade-sys-pass
        el-tab-pane(v-if="renderData.channel_setting_notification", :label="renderData.channel_setting_notification.channelSettingNotification" name="channelSettingNotification")
          notify-pass
        el-tab-pane(v-if="renderData.channel_setting_talk", :label="renderData.channel_setting_talk.channelSettingTalk" name="channelSettingTalk")
          talk-pass
</template>

<script>
  import tradeSysPass from './module/tradeSysPass'
  import blankPass from './module/blankPass'
  import notifyPass from './module/notifyPass'
  import talkPass from './module/talkPass'
  import BTitle from 'components/BTitle'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'channel_setting',
    mixins: [componentMixin],
    data () {
      var renderData = window.renderData.components.channel_setting
      return {
        whichTab: 'channelSettingTrade',
        renderData: renderData
      }
    },
    computed: {
      pageTitle () {
      }
    },
    methods: {
    },
    components: {
      BTitle,
      tradeSysPass,
      blankPass,
      notifyPass,
      talkPass
    },
    mounted () {
    }
  }
</script>

<style lang="less">
  .channel_setting {
    position: relative;
  }
</style>
