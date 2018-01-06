<template lang="pug">
  #signup
    h1.theme-color-darkenC15 {{renderData.signup}}
    .split-line.theme-bg-D
    el-form(:model="form" label-width="96px", :rules="rules", ref="basicForm").form
      el-form-item(:label="renderData.username", prop="user_name").username-input
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernamePrompt")
      el-form-item(:label="renderData.email", prop="email").email-input
        b-input(:model.sync="form.email", :placeholder="renderData.emailPrompt")
      el-form-item(:label="renderData.pwd", prop="password").password-input
        b-input(type='password', :model.sync="form.password", :placeholder="renderData.pwdPrompt")
      el-form-item(:label="renderData.confirmPwd" , prop="confirmPwd").confirmPwd-input
        b-input(type='password', :model.sync="form.confirmPwd", :placeholder="renderData.confirmPwdPrompt")
      el-form-item(:label="renderData.referral").referral-input
        b-input(:model.sync="form.referral", :placeholder="renderData.referralNoOprional")
      el-form-item(:label="renderData.vcode" , prop="vcode").vcode-input-box
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc")
      .change-vcode-box.clear-float
        span.theme-color-lightenA10.pointer(@click="changeVcode") {{renderData.changeVcode}}
      el-form-item.agreement(prop="agree")
        b-checkbox(:model.sync="form.agree")
          span {{renderData.clausePrefix}}
          a(:href="renderData.clauseUrl") {{renderData.clause}}
      .button-box
        b-button(type="primary", @click="next").next-btn
          span {{renderData.next}}
        span {{renderData.toSignInPrefix}}
        a(:href="signinUrl") {{renderData.signin}}
</template>

<script>
  let renderData = window.renderData.components.signup.signup_auth
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BCheckbox from 'components/BCheckbox'
  import vcodeMixin from 'common/js/vcodeMixin'
  import Utils from 'common/js/Utils'
  import service from '../service'

  var {checkUnique, validator, constants} = Utils

  export default {
    name: 'signup-part',
    mixins: [vcodeMixin],
    data () {
      var _this = this
      console.log('signup form', this.form)
      return {
        renderData: renderData,
        rules: {
          user_name: [
            {
              required: true,
              message: renderData.usernamePrompt
            },
            {
              validator: validator.validate,
              regex: constants.uidReg,
              message: renderData.lettersOrNumbersNoChange
            },
            {
              validator: validator.validate,
              test: function (val) {
                var params = {
                  field: 'user_name',
                  value: val
                }
                return checkUnique(params)
              },
              message: renderData.usernameExists
            }
          ],
          email: [
            {
              required: true,
              message: renderData.emailPrompt
            },
            {
              validator: validator.validate,
              regex: constants.emailReg,
              message: renderData.EnterRightEmail
            },
            {
              validator: validator.validate,
              test: function (val) {
                var params = {
                  field: 'email',
                  value: val
                }
                return checkUnique(params)
              },
              message: renderData.emailExists
            }
          ],
          password: [
            {
              required: true,
              message: renderData.pwdPrompt,
              trigger: 'change'
            },
            {
              validator: validator.validate,
              regex: constants.passwordReg,
              message: renderData.passwordErrorRule,
              trigger: 'change'
            }
          ],
          confirmPwd: [
            {
              required: true,
              message: renderData.confirmPwdPrompt,
              trigger: 'change'
            },
            {
              validator: validator.validate,
              regex: constants.passwordReg,
              message: renderData.passwordErrorRule,
              trigger: 'change'
            }, {
              test: function (value) {
                return value === _this.form.password
              },
              validator: validator.validate,
              message: renderData.twoPwdNoConsistent,
              trigger: 'change'
            }
          ],
          vcode: [
            {
              required: true,
              message: renderData.vcodePrompt
            },
            {
              test: function (value) {
                var params = {
                  vcode_key: _this.vcode_key,
                  vcode: value
                }
                return service.vcodeValidate(params)
              },
              validator: validator.validate,
              message: renderData.vcodeError
            }
          ],
          agree: [
            {
              required: true,
              message: renderData.pleaseSelect
            }
          ]
        }
      }
    },
    methods: {
      next () {
//        this.$refs['basicForm'].validate(valid => {
//          if (valid) {
        this.visible.page = 'improve_info'
//          }
//        })
      }
    },
    watch: {
      vcode_key () {
        this.form.vcode_key = this.vcode_key
      }
    },
    props: {
      signinUrl: {
        type: String,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      form: {
        type: Object,
        required: true
      }
    },
    components: {
      BButton,
      BInput,
      BCheckbox
    }
  }
</script>

<style lang="less" scoped>
  #signup {
    float: left;
    margin-top: 140px;
    margin-left: 61.5px;
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
      .prompt-box {
        font-size: 12px;
        margin-bottom: 18px;
        a.forget-password {
          float: right;
        }
      }
      .vcode-input-box {
        margin-bottom: 6px;
        .vcode-input {
          width: 77%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 20%;
          height: 35px;
          vertical-align: top;
          border-radius: 4px;
        }
      }
      .change-vcode-box {
        margin-bottom: 10px;
        span {
          float: right;
        }
      }
      .button-box {
        .next-btn {
          margin-right: 20px;
        }
        padding-left: 100px;
        .signin-btn {
          width: 180px !important;
        }
        .signup-btn {
          width: 100px !important;
          margin-left: 8px;
        }
      }
    }
  }

  @media screen and  (min-width: 1250px) {
    #signup {
      width: 486px;
    }
  }

  @media screen and (max-width: 1250px) {
    #signup {
      width: 426px;
    }
  }
</style>
