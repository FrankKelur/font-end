<template lang="pug">
  #forget-password.amt-right-in
    h1.theme-color-darkenC15 {{renderData.forgetPwd}}
    .split-line.theme-bg-D
    el-form(:model="form" label-width="96px", :rules="rules", ref="form").form
      el-form-item.username-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.usernameEmail")
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernameEmailPrompt")
      el-form-item(prop="pwd").email-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.pwd")
        b-input(:model.sync="form.password", :placeholder="renderData.pwdPrompt")
      el-form-item(prop="vcode").vcode-input-box
        template(slot="label")
          span.theme-color-C(v-text="renderData.vcode")
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc")
      .change-vcode-box.clear-float
        .right-vcode-box.pointer(@click="changeVcode")
          span.theme-color-lightenA10 {{renderData.changeVcode}}
      .button-box
        b-button(type="primary", @click="sendEmail").send-email-btn
          span {{renderData.sendEmail}}
        b-button(type="secondary", @click="toPage('signin')").cancel-btn
          span {{renderData.cancel}}

</template>

<script>
  var comp = window.renderData.components.signin
  let renderData = Object.assign({}, comp.signin_auth, comp.forget_password_auth)

  import vcodeMixin from 'common/js/vcodeMixin'
  import service from '../service'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import { validator } from 'common/js/Utils'

  export default {

    name: 'forget_password',
    mixins: [vcodeMixin],
    data () {
      return {
        vcodeError: false,
        renderData: renderData,
        form: {
          user_name: '',
          password: '',
          vcode: ''
        },
        rules: {
          pwd: [{
            validator: function (rule, val, callback) {
              var params = {
                vcode_key: this.vcode_key
              }
              Object.assign(params, this.form)
              service.sendEmail(params).then(({re}) => {
                this.vcodeError = false
                if (re === '404' || re === '403') {
                  callback(rule.message)
                } else if (re === '402') {
                  this.vcodeError = true
                }
              })
            },
            message: renderData.usernameEmailPwdNotMatch,
            trigger: 'submit'
          }],
          vcode: [{
            validator: validator.validate,
            test: function (val) {
              return !this.vcodeError
            },
            message: renderData.vcodeError,
            trigger: 'submit'
          }]
        }
      }
    },
    components: {
      BButton,
      BInput
    },
    methods: {
      toPage (page) {
        this.visible.page = page
      },
      sendEmail () {
        console.log('sendEmail')
        this.$refs['form'].validate(valid => {})
      }
    },
    props: {
      visible: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="less" scoped>
  #forget-password {
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
      .email-input {
        margin-bottom: 10px;
      }
      .prompt-box {
        font-size: 12px;
        margin-bottom: 18px;
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
        .send-email-btn {
          width: 180px !important;
        }
        .cancel-btn {
          width: 100px !important;
          margin-left: 8px;
        }
      }
    }
  }
</style>
