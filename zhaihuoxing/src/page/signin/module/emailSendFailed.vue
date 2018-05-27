<template lang="pug">
  b-dialog.email-send-fail(:show="true", :title="renderData.sendFail",width="38%", :show-close="true", :before-close="beforeClose")
    .left(v-if="renderData.failIcon")
      b-icon.theme-color-G(:icon-name="renderData.failIcon", size="40px")
    .right.theme-color-C
      .item(v-text="renderData.netErrorSendFail")
    template(slot="footer")
      b-button(@click="visible.dialog = null") {{renderData.cancel}}
      b-button(@click="sendEmail()", type="primary") {{renderData.sendAgain}}
</template>
<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import service from '../service'
  export default {
    name: 'send-fail',
    data () {
      return {}
    },
    props: {
      renderData: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      userName: {
        required: true,
        type: String
      },
      email: {
        required: true,
        type: String
      },
      vcode: {
        required: true,
        type: String
      },
      vcodeKey: {
        required: true,
        type: String
      }
    },
    methods: {
      beforeClose: function (done) {
        this.visible.dialog = null
        done()
      },
      sendEmail: function () {
        var params = {
          email: this.email,
          user_name: this.userName,
          vcode: this.vcode,
          vcode_key: this.vcodeKey
        }
        service.forgetPwdEmail(params).then(res => {
          if (res.re === '200') {
            this.visible.dialog = 'send_success'
          } else {
            this.visible.dialog = 'send_fail'
          }
        })
      }
    },
    components: {
      BDialog,
      BButton,
      BIcon
    }
  }
</script>
<style lang="less" scoped>
  .left {
    vertical-align: middle;
    display: inline-block;
    margin-right: 18px;
    svg {
      font-size: 40px !important;
    }
  }
  .right {
    vertical-align: middle;
    display: inline-block;
    .item {
      margin-top: 8px;
      span:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
  .right .item[data-v-5699f9c0] {
    width: 100%;
    margin-top: 8px;
    word-wrap: break-word;
  }
  .right[data-v-5699f9c0] {
    width: 80%;
  }
</style>
