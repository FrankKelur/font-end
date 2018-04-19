<template lang="pug">
  #signup
    h1.theme-color-darkenC15 {{renderData.signup}}
    .split-line.theme-bg-D
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
</template>

<script>
  let renderData = window.renderData.components.signup.signup_auth
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import Utils from 'common/js/Utils'
  import service from '../service'

  var {validator, constants, getComponentUrl} = Utils

  export default {
    name: 'signup-part',
    data () {
      var _this = this
      console.log('signup form', this.form)
      return {
        renderData: renderData,
        userTypeList: [],
        hasInvitate: false,
        hasAgentId: false,
        rules: {
          user_name: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              regex: '',
              message: '',
              trigger: 'change, blur'
            },
            {
              validator: validator.validate,
              test: function (val) {
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
            }
          ],
          email: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              regex: constants.emailReg,
              message: renderData.pleaseEnterEmail,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              test: function (val) {
                var params = {
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
            }
          ],
          password: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              regex: '',
              message: '',
              trigger: 'change, blur'
            }
          ],
          confirmPwd: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              test: function (value) {
                return value === _this.form.password
              },
              validator: validator.validate,
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
      }
    },
    methods: {
      next () {
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
    watch: {
      vcode_key () {
        this.form.vcode_key = this.vcode_key
      }
    },
    props: {
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
      BSelect,
      BCheckbox
    }
  }
</script>

<style lang="less">
  #signup {
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .split-line {
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .form {
      margin-top: 20px;
      .el-form-item {
        margin-bottom: 15px;
      }
      .prompt-box {
        font-size: 12px;
        margin-bottom: 18px;
        a.forget-password {
          float: right;
        }
      }
      .button-box {
        padding-top: 30px;
        .next-btn {
          margin-right: 20px;
        }
        padding-left: 140px;
        .signin-btn {
          width: 180px !important;
        }
        .signup-btn {
          width: 100px !important;
          margin-left: 8px;
        }
      }
    }
    .el-loading-spinner {
      text-align: right!important;
    }
    .el-loading-spinner .circular {
      height: 24px!important;
      width: 24px!important;
      margin: 8px 10px 0 0;
    }
  }
</style>
