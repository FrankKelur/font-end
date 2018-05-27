<template lang="pug">
  b-dialog.email-send-success(:show="true", :title="renderData.sendSucceed", width="38%", :show-close="true", :before-close="beforeClose")
    .left(v-if="renderData.succeedIcon")
      b-icon.theme-color-E(:icon-name="renderData.succeedIcon", size="40px")
    .right.tehme-color-C
      .item(v-text="renderData.pleaseChangePwd")
    template(slot="footer")
      b-button(v-if="sendDisabled", disabled) {{renderData.sendAgain}}({{sendDisableTime}}s)
      b-button(v-if="!sendDisabled", @click="sendEmail()") {{renderData.sendAgain}}
      b-button(@click="toSignIn()", type="primary") {{renderData.confirm}}

</template>
<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import service from '../service'
  export default {
    name: 'send-success',
    data () {
      return {
        sendDisabled: true,
        sendDisableTime: 60
      }
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
        document.location.reload()
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
      },
      sendEmailCountDown: function () {
        var myTime, myInterval
        this.sendDisableTime = 60
        clearInterval(myTime)
        clearTimeout(myInterval)
        myTime = setInterval(() => {
          this.sendDisableTime = this.sendDisableTime - 1
//          console.log('time: ', this.sendDisableTime)
        }, 1000)
        myInterval = setTimeout(() => {
          clearInterval(myTime)
          this.sendDisabled = false
//          console.log('time disabled: ', this.sendDisabled)
        }, 60000)
      },
      toSignIn: function () {
//        document.location.reload()
        this.visible.page = 'signin'
        this.visible.dialog = null
      }
    },
    mounted () {
      this.sendEmailCountDown()
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
