<template lang="pug">
  .user_setting_component.theme-border-lightenD12.component
    b-title(:title="renderData.userSetting")
<<<<<<< HEAD
    el-col(:span="14")
      .title.theme-color-darkenC15.ellipsis-title {{renderData.basicSetting}}
      el-form(ref="basicForm", :rules="basicRules", :model="userSetting", label-width="150px")
=======
    el-col.align-with-title(:span="14")
      .title.theme-color-darkenC15.ellipsis-title {{renderData.basicSetting}}
      el-form(ref="basicForm", :rules="basicRules", :model="userSetting", label-width="140px", labelPosition='left')
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        el-form-item(:label="renderData.uidRule", prop="user_re")
          b-select(:placeholder="renderData.pleaseSelect", :model.sync="userSetting.user_re")
            el-option(v-for="(rule, idx) in uidRuleList", :key="idx", :value="rule.regex", :label="rule.label")
        el-form-item(:label="renderData.pwdRule", prop="password_re")
          b-select(:placeholder="renderData.pleaseSelect", :model.sync="userSetting.password_re")
            el-option(v-for="(rule, idx) in pwdRuleList", :key="idx", :value="rule.regex", :label="rule.label")
        el-form-item(label=" ")
<<<<<<< HEAD
          b-icon.icon-position(iconName="info", :title="renderData.askUserInfo")
          b-checkbox.ellipsis-title(:model.sync="userSetting.ask_user_change_pwd",:title="renderData.askUserChangePwd") {{renderData.askUserChangePwd}}
=======
          b-checkbox.ellipsis-title(:model.sync="userSetting.ask_user_change_pwd",:title="renderData.askUserChangePwd") {{renderData.askUserChangePwd}}
          el-tooltip(class="item" effect="dark", :content="renderData.askUserInfo" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10(iconName='info')
          //b-icon.theme-color-A-hover.theme-color-lightenD10.icon-position(iconName="info", :title="renderData.askUserInfo")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        el-form-item(:label="renderData.userStatus")
          b-button.user_setting_component_tag(v-for="(item, $idx) in userSetting.status", :key="$idx", size="small")
            | {{item.label}}
            b-icon.delete-icon(@click.native="deleteUserStatus(item, $idx)" v-if="!item.system" iconName='delete' size="12px")
          b-button.add-btn(@click="addUserStatusMod" v-if="!userStatusModShow" size="small" type="primary") {{renderData.add}}

        el-form-item.new-status-form-item(v-if="userStatusModShow", prop="newUserStatus", label=" ")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="newUserStatus")
<<<<<<< HEAD
          b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="closeUserInput")
=======
          b-icon.theme-color-C.theme-color-G-hover.delete(iconName='message_failure', @click.native="closeUserInput")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addUserStatus")

        el-form-item(:label="renderData.emailStatus")
          b-button.user_setting_component_tag(v-for="(item, $idx) in userSetting.email_status", :key="$idx" size="small")
            | {{item.label}}
            b-icon.delete-icon(@click.native="deleteEmailStatus(item, $idx)" v-if="!item.system" iconName='delete' size="12px")
          b-button.add-btn(@click="addEmailStatusMod" v-if="!emailStatusModShow" size="small" type="primary") {{renderData.add}}

        el-form-item.new-status-form-item(v-if="emailStatusModShow", prop="newEmailStatus", label=" ")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="newEmailStatus")
          b-icon.theme-color-C.theme-color-G-hover(iconName='delete', @click.native="closeEmailInput")
          b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addEmailStatus")
        .title.theme-color-darkenC15.ellipsis-title
<<<<<<< HEAD
          b-icon.info-icon(iconName="info", :title="renderData.initialStatusInfo")
          span {{renderData.initialStatusSetting}}
=======
          span {{renderData.initialStatusSetting}}
          el-tooltip(class="item" effect="dark", :content="renderData.initialStatusInfo" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10.info-icon(iconName='info')
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        el-form-item(:label="renderData.registerUser", prop="register_user_status")
          b-select(:model.sync="userSetting.register_user_status", :placeholder='renderData.pleaseSelect')
            el-option(v-for="(status, key) in userSetting.status", :key="key", :value="key", :label="status.label")
        el-form-item(:label="renderData.createUser", prop="create_user_status")
          b-select(:model.sync="userSetting.create_user_status", :placeholder='renderData.pleaseSelect')
            el-option(v-for="(status, key) in userSetting.status", :key="key", :value="key", :label="status.label")
        el-form-item(:label="renderData.registerEmail", prop="register_email_status")
          b-select(:model.sync="userSetting.register_email_status", :placeholder='renderData.pleaseSelect')
            el-option(v-for="(status, key) in userSetting.email_status", :key="key", :value="key", :label="status.label")
        el-form-item(:label="renderData.createEmail", prop="create_email_status")
          b-select(:model.sync="userSetting.create_email_status", :placeholder='renderData.pleaseSelect')
            el-option(v-for="(status, key) in userSetting.email_status", :key="key", :value="key", :label="status.label")

      .footer
        b-button(type="primary", @click="saveUserSetting") {{renderData.save}}


</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import { constants, validator } from 'common/js/Utils'

  export default {
    name: 'user_setting',
    mixins: [componentMixin],
    data () {
      var userSetting = window.renderData.components.user_setting
      var renderData = Object.assign({}, userSetting, userSetting.user_setting_auth)
      return {
        renderData: renderData,
        pwdRuleList: [
          {
            regex: constants.passwordReg.toString(),
            label: renderData.pwdRule0
          },
          {
            regex: constants.pwdRule1.toString(),
            label: renderData.pwdRule1
          },
          {
            regex: constants.pwdRule2.toString(),
            label: renderData.pwdRule2
          }
        ],
        uidRuleList: [
          {
            regex: constants.uidReg.toString(),
            label: renderData.uidRule0
          }
        ],
        emailStatusModShow: false,
        userStatusModShow: false,
        newUserStatus: '',
        newEmailStatus: '',
        basicRules: {
          newEmailStatus: [
            {
              regex: constants.noSpace,
              message: renderData.noSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: renderData.length30Limit,
              validator: validator.validate,
              trigger: 'blur'
            }
          ],
          newUserStatus: [
            {
              regex: constants.noSpace,
              message: renderData.noSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: renderData.length30Limit,
              validator: validator.validate,
              trigger: 'blur'
            }
          ],
          user_re: [
            {
              required: true,
              message: renderData.pleaseSelectUidRule,
              trigger: 'blur'
            }
          ],
          password_re: [
            {
              required: true,
              message: renderData.pleaseSelectPwdRule,
              trigger: 'blur'
            }
          ],
          register_user_status: [
            {
              required: true,
              message: renderData.pleaseSelectRegisterUser,
              trigger: 'blur'
            }
          ],
          create_user_status: [
            {
              required: true,
              message: renderData.pleaseSelectCreateUser,
              trigger: 'blur'
            }
          ],
          register_email_status: [
            {
              required: true,
              message: renderData.pleaseSelectRegisterEmail,
              trigger: 'blur'
            }
          ],
          create_email_status: [
            {
              required: true,
              message: renderData.pleaseSelectCreateEmail,
              trigger: 'blur'
            }
          ]
        },
        userSetting: {
          email_status: {},
          status: {},
          create_email_status: '',
          register_email_status: '',
          create_user_status: '',
          register_user_status: '',
          ask_user_change_pwd: false,
          password_re: '',
          user_re: '',
          newUserStatus: '',
          newEmailStatus: ''
        }
      }
    },
    computed: {
      cRules () {
        var rules = Object.assign({}, this.basicRules)
        if (this.emailStatusModShow && this.userStatusModShow) {
//          return { newEmailStatus: rules.newEmailStatus, newUserStatus: rules.newUserStatus }
          return rules
        }
        if (this.emailStatusModShow) {
          delete rules['newUserStatus']
//          return {newEmailStatus: rules.newEmailStatus}
          return rules
        }
        if (this.userStatusModShow) {
          delete rules['newEmailStatus']
//          return {newUserStatus: rules.newUserStatus}
          return rules
        }
        delete rules['newEmailStatus']
        delete rules['newUserStatus']
        return rules
      }
    },
    methods: {
      deleteUserStatus (item, key) {
        var params = {
          status: key
        }
        service.deleteStatus(params).then(({re}) => {
          if (re === '200') {
            if (this.userSetting.create_user_status === key) {
              this.userSetting.create_user_status = ''
            }
            if (this.userSetting.register_user_status === key) {
              this.userSetting.register_user_status = ''
            }
            delete this.userSetting.status[key]
            this.userSetting.status = Object.assign({}, this.userSetting.status)
//            this.getUserSetting()
          }
        })
      },
      deleteEmailStatus (item, key) {
        var params = {
          email_status: key
        }
        service.deleteStatus(params).then(({re}) => {
          if (re === '200') {
            if (this.userSetting.create_email_status === key) {
              this.userSetting.create_email_status = ''
            }
            if (this.userSetting.register_email_status === key) {
              this.userSetting.register_email_status = ''
            }
            delete this.userSetting.email_status[key]
            this.userSetting.email_status = Object.assign({}, this.userSetting.email_status)
//            this.getUserSetting()
          }
        })
      },
      addEmailStatus () {
        // 应该只会该字段进行表单验证
        this.$refs['basicForm'].validateField('newEmailStatus', (error) => {
          if (!error) {
            console.log('添加邮箱')
            var params = {
              key: 'email_status',
              label: this.newEmailStatus
            }
            service.addStatus(params).then(({re, data}) => {
              console.log('add re', re)
              console.log('add data', data)
              if (re === '200') {
                var key = data.key
                var newStatus = {
                  label: this.newEmailStatus,
                  system: false
                }
                this.userSetting.email_status[key] = newStatus
                this.closeEmailInput()
//                this.getUserSetting()
              }
            })
          }
        })
//        this.$refs['basicForm'].validate((valid) => {
//        })
      },
      addUserStatus () {
        // 应该只会该字段进行表单验证
        this.$refs['basicForm'].validateField('newUserStatus', (error) => {
          if (!error) {
            console.log('添加用户状态')
            var params = {
              key: 'status',
              label: this.newUserStatus
            }
            service.addStatus(params).then(({re, data}) => {
              if (re === '200') {
                var key = data.key
                var newStatus = {
                  label: this.newUserStatus,
                  system: false
                }
                this.userSetting.status[key] = newStatus
                this.closeUserInput()
//                this.getUserSetting()
              }
            })
          }
        })
//        this.$refs['basicForm'].validate((valid) => {
//        })
      },
      addEmailStatusMod () {
        this.emailStatusModShow = true
      },
      addUserStatusMod () {
        this.userStatusModShow = true
      },
      saveUserSetting () {
        this.emailStatusModShow = false
        this.userStatusModShow = false
        this.$refs['basicForm'].validate((valid) => {
          if (valid) {
            var params = this.userSetting
            service.saveUserSetting(params).then(({data}) => {
              console.log('返回数据')
              console.log(data)
              this.getUserSetting()
            })
          }
        })
      },
      getUserSetting () {
        var params = {}
        return service.getUserSetting(params).then(data => {
          Object.assign(this.userSetting, data)
          this.userSetting.newEmailStatus = ''
          this.userSetting.newUserStatus = ''
        })
      },
      closeEmailInput () {
        this.newEmailStatus = ''
        this.emailStatusModShow = false
      },
      closeUserInput () {
        this.newUserStatus = ''
        this.userStatusModShow = false
      }
    },
    async mounted () {
      await this.getUserSetting()
    },
    watch: {
      newUserStatus () {
        this.$set(this.userSetting, 'newUserStatus', this.newUserStatus)
      },
      newEmailStatus () {
        this.$set(this.userSetting, 'newEmailStatus', this.newEmailStatus)
      }
    },
    components: {
      BTitle,
      BCheckbox,
      BInput,
      BSelect,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  @import '../../common/styleSheet/variable.less';

  .user_setting_component {
    height: 100%;
    position: relative;
<<<<<<< HEAD
    .info-icon {
      margin-right: 10px;
=======
    .align-with-title {
      padding-left: 19px;
    }
    .info-icon {
      margin-left: 10px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
    .delete-icon {
      margin-left: 14px;
      text-align: center;
      font-size: 12px;
    }
    .new-status-form-item {
      .b-icon {
        width: 4%;
        margin-left: 1%;
        display: inline-block;
      }
      .b-input {
        width: 40%;
      }
    }
<<<<<<< HEAD
=======
    .delete{
      font-size: 12px;
    }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    .add-btn{
      border: 0px!important;
      height: 32px;
    }
<<<<<<< HEAD
    .el-checkbox {
      margin-left: 10px;
    }
    .el-form-item__content{
      .icon-position{
        position: relative;
        top: -10px;
      }
      label{
        width: 65%!important;
=======
    .el-form-item__content{
      .icon-position{
        position: relative;
        top: -3px;
        left: 3px;
      }
      label{
        width: 50%!important;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    }
    .el-button--small{
      margin-top: 2px;
      font-size: 14px!important;
    }
    .el-form-item label{
      margin-top: 7px;
    }
    .title{
      font-size: 16px;
      margin: 20px 0;
      width: 600px;
    }
    .footer {
<<<<<<< HEAD
      background-color: white;
      padding-top: @footerMarginTop;
      padding-bottom: @footerMarginBottom;
      padding-left: 1.2%;
=======
      padding-top: @footerMarginTop;
      padding-bottom: @footerMarginBottom;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
    .user_setting_component_tag{
      margin-left: 0 !important;
      margin-right: 8px !important;
      margin-top: 3px !important;
      font-size: 14px;
    }
    .el-form-item label {
      margin-top: -1px;
    }
  }

</style>
