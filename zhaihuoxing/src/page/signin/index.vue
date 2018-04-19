<template lang="pug">
  div.hei-100
    signin-part(v-if="visible.page === 'signin'", :visible="visible", :render-data="renderData", :form="signForm")
    forget-password(v-if="visible.page === 'forget_password'", :visible="visible", :render-data="renderData", :form="forgetForm")
    component(v-if="visible.dialog === 'verified_attention'", :is="visible.dialog", :render-data="renderData", :visible="visible", :user-name="signForm.user_name", :vcode="signForm.vcode", :vcode-key="signForm.vcode_key")
    component(v-else, :is="visible.dialog", :render-data="renderData", :visible="visible", :user-name="forgetForm.user_name", :email="forgetForm.email", :vcode="forgetForm.vcode", :vcode-key="forgetForm.vcode_key")
    component(v-if="visible.verified === 'sign_in'", :is="visible.verified", :render-data="renderData", :dialog-msg="dialogMsg", :dialog-icon="dialogIcon")
    component(v-if="visible.verified === 'send_again'", :is="visible.verified", :render-data="renderData", :dialog-msg="dialogMsg", :search-obj="searchObj")
</template>

<script>
  let renderData = window.renderData.components.signin.signin_auth
  import SigninPart from './module/signin'
  import ForgetPassword from './module/forgetPassword'
  import verifiedAttention from './module/verifiedAttention'
  import emailSendSucceed from './module/emailSendSucceed'
  import emailSendFailed from './module/emailSendFailed'
  import verifiedSign from './module/verifiedToSignIn'
  import verifiedSend from './module/verifiedSendAgain'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import Vue from 'vue'
  import { Form, FormItem } from 'element-ui'

  Vue.use(Form)
  Vue.use(FormItem)
  export default {
    name: 'signin',
    mixins: [componentMixin],
    data () {
      return {
        renderData: renderData,
        visible: {
          page: 'signin',
          dialog: null,
          verified: null
        },
        signForm: {
          user_name: '',
          password: '',
          vcode: '',
          vcode_key: ''
        },
        forgetForm: {
          user_name: '',
          password: '',
          vcode: '',
          vcode_key: ''
        },
        searchObj: {},
        dialogMsg: '',
        dialogIcon: ''
      }
    },
    methods: {
      verifyEmail () {
        var params = this.searchObj
        service.verifyEmail(params).then(({re}) => {
          if (re === '200') {
            this.dialogMsg = this.renderData.emailActivate
            this.dialogIcon = this.renderData.succeedIcon
            this.visible.verified = 'sign_in'
          } else if (re === '407') {
            this.dialogMsg = this.renderData.emailCodeFail
            this.visible.verified = 'send_again'
          } else if (re === '406') {
            this.dialogMsg = this.renderData.emailCodeOutOfDate
            this.visible.verified = 'send_again'
          } else if (re === '405') {
            this.dialogMsg = this.renderData.emailActivated
            this.dialogIcon = this.renderData.attentionIcon
            this.visible.verified = 'sign_in'
          } else if (re === '402') {
            console.log('没有邮件激活码')
          }
        })
      }
    },
    components: {
      'verified_attention': verifiedAttention,
      'send_success': emailSendSucceed,
      'send_fail': emailSendFailed,
      'sign_in': verifiedSign,
      'send_again': verifiedSend,
      SigninPart,
      ForgetPassword
    },
    mounted () {
      var search = document.location.search
      if (search) {
        search = search.slice(1, search.length)
        var searchArr = search.split('&')
        searchArr.forEach(item => {
          var tmpArr = item.split('=')
          var key = tmpArr[0]
          var value = tmpArr[1]
          this.searchObj[key] = value
        })
        this.verifyEmail()
        console.log('search obj: ', this.searchObj)
      }
    }
  }
</script>

<style lang="less" scoped>
  .hei-100{
    height: 100%;
  }
</style>
