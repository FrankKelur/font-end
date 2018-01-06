<template lang="pug">
  #login.amt-right-in
    h1.theme-color-darkenC15 {{renderData.login}}
    .split-line.theme-bg-D
    el-form(:model="form" label-width="96px", :rules="rules", ref="form").form
      el-form-item.username-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.usernameEmail")
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernameEmailPrompt")
      el-form-item(prop="password").password-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.pwd")
        b-input(type='password', :model.sync="form.password", :placeholder="renderData.pwdPrompt")
        a.forget-password.theme-color-lightenA10.pointer(@click="toPage('forget_password')") {{renderData.forgetPwd}}
      el-form-item(prop="vcode").vcode-input-box
        template(slot="label")
          span.theme-color-C(v-text="renderData.vcode")
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt", @keyup.enter.native="signIn").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc", @click="changeVcode")
      .change-vcode-box.clear-float
        .right-vcode-box.pointer(@click="changeVcode")
          span.theme-color-lightenA10 {{renderData.changeVcode}}
      .button-box
        b-button(type="primary", @click="signIn").signin-btn
          span {{renderData.login}}
        b-button(type="secondary", @click="signUp").signup-btn
          span {{renderData.signup}}

</template>

<script>
  let renderData = window.renderData.components.signin.signin_auth
  import Vue from 'vue'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import vcodeMixin from 'common/js/vcodeMixin'
  import service from '../service'
  import Utils from 'common/js/Utils'
  import { Loading } from 'element-ui'

  Vue.use(Loading.directive)

  export default {
    name: 'signin-part',
    mixins: [vcodeMixin],
    data () {
      var _this = this
      return {
        vcodeError: false,
        pwdError: false,
        vcode_key: '',
        renderData: renderData,
        form: {
          user_name: '',
          password: '',
          vcode: ''
        },
        rules: {
          password: [{
            test (rule, val, callback) {
              console.log('this.pwdError', _this.pwdError)
              return !_this.pwdError
            },
            validator: Utils.validator.validate,
            message: renderData.usernameEmailPwdNotMatch,
            trigger: 'submit'
          }],
          vcode: [{
            validator: Utils.validator.validate,
            test: function (val) {
              return !_this.vcodeError
            },
            message: renderData.vcodeError,
            trigger: 'submit'
          }]
        }
      }
    },
    methods: {
      toPage (page) {
        this.visible.page = page
      },
      signIn () {
        var params = {
          vcode_key: this.vcode_key
        }
        Object.assign(params, this.form)
        service.signIn(params).then(({re}) => {
          this.vcodeError = false
          this.pwdError = false
          if (re === '404' || re === '403') {
            this.pwdError = true
          } else if (re === '402') {
            this.vcodeError = true
          }
          this.$refs['form'].validate(valid => {})
        })
      },
      signUp () {
        var params = {
          component_name: 'signup'
        }
        Utils.getComponentUrl(params).then(({re, data}) => {
          if (re === '200') {
            location.href = data.url
          }
        })
      }
    },
    props: {
      visible: {
        type: Object,
        required: true
      }
    },
    components: {
      BButton,
      BInput
    }
  }
</script>

<style lang="less" scoped>
  #login {
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .split-line {
      height: 2px;
      width: 100%;
      margin-top: 31px;
    }
    .form {
      margin-top: 30px;
      .username-input {
        margin-bottom: 10px;
      }
      .password-input {
        margin-bottom: 6px;
      }
      .prompt-box {
        display: inline-block;
        font-size: 12px;
        margin-bottom: 18px;
      }
      a.forget-password {
        float: right;
      }
      .vcode-input-box {
        margin-bottom: 6px;
        .vcode-input {
          width: 72%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 25%;
          height: 35px;
          vertical-align: top;
          border-radius: 4px;
        }
      }
      .change-vcode-box {
           margin-bottom: 22px;
           .right-vcode-box {
             width: 100px;
             height: 30px;
             float: right;
             span {
               margin-top: 8px;
               float: right;
             }
           }
      }
      .button-box {
        padding-left: 100px;
        .signin-btn {
          width: 180px !important;
          border: none!important;
        }
        .signup-btn {
          width: 100px !important;
          margin-left: 8px;
          border: none!important;
        }
      }
    }
  }
</style>
