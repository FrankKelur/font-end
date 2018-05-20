<template lang="pug">
  #login.amt-right-in
    h1.theme-color-darkenC15 {{renderData.login}}
    .split-line.theme-bg-D
<<<<<<< HEAD
    el-form(:model="form" label-width="96px", :rules="rules", ref="form").form
      el-form-item.username-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.usernameEmail")
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernameEmailPrompt")
=======
    el-form(:model="form", label-width="140px", :rules="rules", ref="form", label-position="left").form
      el-form-item.username-input(prop="user_name")
        template(slot="label")
          span.theme-color-C(v-text="renderData.username")
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernamePrompt")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      el-form-item(prop="password").password-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.pwd")
        b-input(type='password', :model.sync="form.password", :placeholder="renderData.pwdPrompt")
<<<<<<< HEAD
        a.forget-password.theme-color-lightenA10.pointer(@click="toPage('forget_password')") {{renderData.forgetPwd}}
=======
      .forget-password
        a.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="toPage('forget_password')") {{renderData.forgetPwd}}
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      el-form-item(prop="vcode").vcode-input-box
        template(slot="label")
          span.theme-color-C(v-text="renderData.vcode")
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt", @keyup.enter.native="signIn").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc", @click="changeVcode")
      .change-vcode-box.clear-float
        .right-vcode-box.pointer(@click="changeVcode")
<<<<<<< HEAD
          span.theme-color-lightenA10 {{renderData.changeVcode}}
=======
          span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer {{renderData.changeVcode}}
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      .button-box
        b-button(type="primary", @click="signIn").signin-btn
          span {{renderData.login}}
        b-button(type="secondary", @click="signUp").signup-btn
          span {{renderData.signup}}

</template>

<script>
<<<<<<< HEAD
  let renderData = window.renderData.components.signin.signin_auth
=======
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  import Vue from 'vue'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import vcodeMixin from 'common/js/vcodeMixin'
  import service from '../service'
<<<<<<< HEAD
  import Utils from 'common/js/Utils'
=======
  import utils from 'common/js/Utils'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
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
=======
        rules: {
          user_name: [
            {
              required: true,
              message: this.renderData.required,
              trigger: 'blur'
            },
            {
              test: function (value) {
                return !_this.pwdError
              },
              validator: utils.validator.validate,
              message: '',
              trigger: 'submit'
            }
          ],
          password: [
            {
              test: function (value) {
                return !_this.pwdError
              },
              validator: utils.validator.validate,
              message: this.renderData.usernamePwdNotMatch,
              trigger: 'submit'
            }, {
              required: true,
              message: this.renderData.required,
              trigger: 'blur'
            }
          ],
          vcode: [
            {
              required: true,
              message: this.renderData.required,
              trigger: 'blur'
            },
            {
              test: function (val) {
                return !_this.vcodeError
              },
              validator: utils.validator.validate,
              message: this.renderData.vcodeError,
              trigger: 'submit'
            },
            {
              test: function (val) {
                var params = {
                  vcode: _this.form.vcode,
                  vcode_key: _this.vcode_key
                }
                return service.vcodeValidate(params).then(({re}) => {
                  if (re === '200') {
                    return true
                  } else if (re === '402') {
                    return false
                  } else {
                    return true
                  }
                })
              },
              validator: utils.validator.validate,
              message: this.renderData.vcodeError,
              trigger: 'blur'
            }
          ]
        },
        searchObj: {}
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      toPage (page) {
        this.visible.page = page
      },
<<<<<<< HEAD
      signIn () {
=======
      async signIn () {
        this.form.vcode_key = this.vcode_key
//        this.visible.dialog = 'verified_attention'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        var params = {
          vcode_key: this.vcode_key
        }
        Object.assign(params, this.form)
<<<<<<< HEAD
        service.signIn(params).then(({re}) => {
=======
        await service.signIn(params).then(({re}) => {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          this.vcodeError = false
          this.pwdError = false
          if (re === '404' || re === '403') {
            this.pwdError = true
<<<<<<< HEAD
          } else if (re === '402') {
            this.vcodeError = true
          }
          this.$refs['form'].validate(valid => {})
=======
            console.log('pwdError: ', this.pwdError)
          } else if (re === '402') {
            this.vcodeError = true
            console.log('vcodeError: ', this.vcodeError)
          } else if (re === '407') {
//          邮箱未验证
            this.visible.dialog = 'verified_attention'
          } else if (re === '406') {
//           强制修改密码
//            this.visible.page = 'forget_password'
          } else if (re === '405') {
//            禁止登陆
          }
        })
        this.$refs['form'].validate(valid => {
          console.log('valid: ', valid)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        })
      },
      signUp () {
        var params = {
          component_name: 'signup'
        }
<<<<<<< HEAD
        Utils.getComponentUrl(params).then(({re, data}) => {
          if (re === '200') {
            location.href = data.url
          }
        })
=======
        utils.getComponentUrl(params).then(res => {
          if (res.page_url) {
            document.location.pathname = res.page_url
          }
        })
      },
      initFrom () {
        this.form.user_name = ''
        this.form.password = ''
        this.form.vcode = ''
        this.form.vcode_key = this.vcode_key
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    props: {
      visible: {
        type: Object,
        required: true
<<<<<<< HEAD
=======
      },
      form: {
        type: Object,
        required: true
      },
      renderData: {
        type: Object,
        required: true
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    components: {
      BButton,
      BInput
<<<<<<< HEAD
=======
    },
    mounted () {
      this.initFrom()
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
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
=======
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .form {
      margin-top: 20px;
      .username-input {
        margin-bottom: 15px;
      }
      .password-input {
        margin-bottom: 0;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
      .prompt-box {
        display: inline-block;
        font-size: 12px;
        margin-bottom: 18px;
      }
<<<<<<< HEAD
      a.forget-password {
        float: right;
      }
      .vcode-input-box {
        margin-bottom: 6px;
=======
      .forget-password {
        line-height: 14px;
        margin-top: 4px;
        height: 29px;
        a {
          float: right;
        }
      }
      .vcode-input-box {
        margin-bottom: 0;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        .vcode-input {
          width: 72%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 25%;
<<<<<<< HEAD
          height: 35px;
=======
          height: 40px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          vertical-align: top;
          border-radius: 4px;
        }
      }
      .change-vcode-box {
<<<<<<< HEAD
           margin-bottom: 22px;
=======
           margin-bottom: 19px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
           .right-vcode-box {
             width: 100px;
             height: 30px;
             float: right;
<<<<<<< HEAD
             span {
               margin-top: 8px;
=======
             margin-top: 4px;
             span {
               /*margin-top: 8px;*/
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
               float: right;
             }
           }
      }
      .button-box {
<<<<<<< HEAD
        padding-left: 100px;
=======
        padding-left: 140px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
