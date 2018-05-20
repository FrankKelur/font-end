<template lang="pug">
  #signup
    h1.theme-color-darkenC15 {{renderData.signup}}
    .split-line.theme-bg-D
<<<<<<< HEAD
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
=======
    el-form(:model="form", label-width="140px", :rules="rules", ref="basicForm", label-position="left").form
      el-form-item(prop="user_name").username-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.username}}
        b-input(:model.sync="form.user_name", :placeholder="renderData.pleaseEnter", v-loading="usernameLoading")
      el-form-item(prop="email").email-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.email}}
        b-input(:model.sync="form.email", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="password").password-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.pwd}}
        b-input(type='password', :model.sync="form.password", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="confirmPwd").confirmPwd-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.confirmPwd}}
        b-input(type='password', :model.sync="form.confirmPwd", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="user_type").userType-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.userType}}
        b-select(:model.sync="form.user_type", :placeholder="renderData.pleaseSelect")
          el-option(v-for="(item, idx) in userTypeList", :key="idx", :label="item.name", :value="item.uuid")
      el-form-item(v-if="hasInvitate", prop="invitation_code").invitationCode-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.invitationCode}}
        b-input(:model.sync="form.invitation_code", :placeholder="renderData.pleaseEnter")
      el-form-item(v-if="hasAgentId", prop="agent_id").agentId-input
        span.inline-label(slot="label", v-ellipsis-title="") {{renderData.agentId}}
        b-input(:model.sync="form.agent_id", :placeholder="renderData.pleaseEnter")
      .button-box
        b-button(type="primary", @click="next").next-btn
          span {{renderData.next}}
        span {{renderData.haveUser}}
        a.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="toSignin()") {{renderData.login}}
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
</template>

<script>
  let renderData = window.renderData.components.signup.signup_auth
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
<<<<<<< HEAD
  import BCheckbox from 'components/BCheckbox'
  import vcodeMixin from 'common/js/vcodeMixin'
  import Utils from 'common/js/Utils'
  import service from '../service'

  var {checkUnique, validator, constants} = Utils

  export default {
    name: 'signup-part',
    mixins: [vcodeMixin],
=======
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import Utils from 'common/js/Utils'
  import service from '../service'

  var {validator, constants, getComponentUrl} = Utils

  export default {
    name: 'signup-part',
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    data () {
      var _this = this
      console.log('signup form', this.form)
      return {
        renderData: renderData,
<<<<<<< HEAD
=======
        userTypeList: [],
        hasInvitate: false,
        hasAgentId: false,
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        rules: {
          user_name: [
            {
              required: true,
<<<<<<< HEAD
              message: renderData.usernamePrompt
            },
            {
              validator: validator.validate,
              regex: constants.uidReg,
              message: renderData.lettersOrNumbersNoChange
=======
              message: renderData.required,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              regex: '',
              message: '',
              trigger: 'change, blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            },
            {
              validator: validator.validate,
              test: function (val) {
<<<<<<< HEAD
                var params = {
                  field: 'user_name',
                  value: val
                }
                return checkUnique(params)
              },
              message: renderData.usernameExists
=======
                _this.usernameLoading = true
                var params = {
                  data: [{
                    key: 'user_name',
                    val: val
                  }]
                }
                return service.checkMatch(params).then(({re}) => {
                  _this.usernameLoading = false
                  if (re === '200') {
                    return false
                  } else if (re === '402') {
                    return true
                  } else {
                    return false
                  }
                })
              },
              message: renderData.usernameExist,
              trigger: 'blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            }
          ],
          email: [
            {
              required: true,
<<<<<<< HEAD
              message: renderData.emailPrompt
=======
              message: renderData.required,
              trigger: 'blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            },
            {
              validator: validator.validate,
              regex: constants.emailReg,
<<<<<<< HEAD
              message: renderData.EnterRightEmail
=======
              message: renderData.pleaseEnterEmail,
              trigger: 'blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            },
            {
              validator: validator.validate,
              test: function (val) {
                var params = {
<<<<<<< HEAD
                  field: 'email',
                  value: val
                }
                return checkUnique(params)
              },
              message: renderData.emailExists
=======
                  data: [{
                    key: 'email',
                    val: val
                  }]
                }
                return service.checkMatch(params).then(({re}) => {
                  if (re === '200') {
                    return false
                  } else if (re === '402') {
                    return true
                  } else {
                    return false
                  }
                })
              },
              message: renderData.emailExist,
              trigger: 'blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            }
          ],
          password: [
            {
              required: true,
<<<<<<< HEAD
              message: renderData.pwdPrompt,
              trigger: 'change'
            },
            {
              validator: validator.validate,
              regex: constants.passwordReg,
              message: renderData.passwordErrorRule,
              trigger: 'change'
=======
              message: renderData.required,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              regex: '',
              message: '',
              trigger: 'change, blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            }
          ],
          confirmPwd: [
            {
              required: true,
<<<<<<< HEAD
              message: renderData.confirmPwdPrompt,
              trigger: 'change'
            },
            {
              validator: validator.validate,
              regex: constants.passwordReg,
              message: renderData.passwordErrorRule,
              trigger: 'change'
            }, {
=======
              message: renderData.required,
              trigger: 'blur'
            },
            {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
              test: function (value) {
                return value === _this.form.password
              },
              validator: validator.validate,
<<<<<<< HEAD
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
=======
              message: renderData.twoPwdNotMatch,
              trigger: 'change, blur'
            }
          ],
          user_type: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur, change'
            }
          ]
        },
        usernameLoading: false
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      next () {
<<<<<<< HEAD
//        this.$refs['basicForm'].validate(valid => {
//          if (valid) {
        this.visible.page = 'improve_info'
//          }
//        })
      }
    },
=======
        this.$refs['basicForm'].validate(valid => {
          if (valid) {
            this.visible.page = 'improve_info'
          }
        })
      },
      toSignin () {
        var params = {
          component_name: 'signin'
        }
        getComponentUrl(params).then(res => {
          if (res.page_url) {
            document.location.pathname = res.page_url
          }
        })
      },
      getUserTypeList () {
        service.getUserTypeList({}).then(res => {
          this.userTypeList = res.data
        })
      },
      getResource () {
        service.getSignupResource({}).then(({data}) => {
          if (data.length) {
            data.forEach(item => {
              if (item.key === 'invitation_code') {
                this.hasInvitate = true
                if (item.required) {
                  this.rules.invitation_code = [{
                    required: true,
                    message: this.renderData.required,
                    trigger: 'blur'
                  }]
                }
                this.form.invitation_code = this.form.invitation_code || ''
              }
              if (item.key === 'agent_id') {
                this.hasAgentId = true
                this.form.agent_id = this.form.agent_id || ''
                if (item.required) {
                  this.rules.agent_id = [{
                    required: true,
                    message: this.renderData.required,
                    trigger: 'blur'
                  }]
                }
              }
            })
          }
        })
      },
      getRules () {
        service.getUsernameRule({}).then(({re, data}) => {
          if (re === '200') {
            if (data.username_re || data.password_re) {
              var ruleObjs = Object.keys(constants)
              ruleObjs.forEach(item => {
                var tmpRule = constants[item].toString()
                if (tmpRule === data.username_re) {
                  this.rules.user_name[1].regex = constants[item]
                  this.rules.user_name[1].message = this.renderData[item]
                }
                if (tmpRule === data.password_re) {
                  this.rules.password[1].regex = constants[item]
                  this.rules.password[1].message = this.renderData[item]
                }
              })
            }
          }
        })
      }
    },
    async mounted () {
      await this.getUserTypeList()
      await this.getResource()
      await this.getRules()
    },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    watch: {
      vcode_key () {
        this.form.vcode_key = this.vcode_key
      }
    },
    props: {
<<<<<<< HEAD
      signinUrl: {
        type: String,
        required: true
      },
=======
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
=======
      BSelect,
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      BCheckbox
    }
  }
</script>

<<<<<<< HEAD
<style lang="less" scoped>
  #signup {
    float: left;
    margin-top: 140px;
    margin-left: 61.5px;
=======
<style lang="less">
  #signup {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
=======
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .form {
      margin-top: 20px;
      .el-form-item {
        margin-bottom: 15px;
      }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      .prompt-box {
        font-size: 12px;
        margin-bottom: 18px;
        a.forget-password {
          float: right;
        }
      }
<<<<<<< HEAD
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
=======
      .button-box {
        padding-top: 30px;
        .next-btn {
          margin-right: 20px;
        }
        padding-left: 140px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        .signin-btn {
          width: 180px !important;
        }
        .signup-btn {
          width: 100px !important;
          margin-left: 8px;
        }
      }
    }
<<<<<<< HEAD
  }

  @media screen and  (min-width: 1250px) {
    #signup {
      width: 486px;
    }
  }

  @media screen and (max-width: 1250px) {
    #signup {
      width: 426px;
=======
    .el-loading-spinner {
      text-align: right!important;
    }
    .el-loading-spinner .circular {
      height: 24px!important;
      width: 24px!important;
      margin: 8px 10px 0 0;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</style>
