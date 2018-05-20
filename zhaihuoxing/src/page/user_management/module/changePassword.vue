<template lang="pug">
  b-dialog.change-password(:title="renderData.changePassword", :show.sync='dialogVisible', width="38%", :show-close="true", :before-close="beforeClose")
    el-form(:model="changePwdForm", label-width="80px", :rules="computedRules", ref="changePwdForm")
      el-form-item(:label-width="childLabelWidth")
        el-radio-group(v-model="changePwdForm.type")
          b-radio(label="auto").theme-color-C {{renderData.autoPassword}}
          b-radio(label="manual").theme-color-C  {{renderData.manualPassword}}
      el-form-item
        template(slot="label")
          span.theme-color-C(v-text="renderData.userName")
        span.theme-color-C(v-text="currUser.user_name")

      el-form-item(v-show="changePwdForm.type==='auto'")
        template(slot="label")
          span.theme-color-C(v-text="renderData.newPassword")
        span.theme-color-C {{changePwdForm.newPasswordAuto}}
      template(v-if="changePwdForm.type!=='auto'")
        el-form-item(prop="newPassword")
          template(slot="label")
            span.theme-color-C(v-text="renderData.newPassword")
          b-input(:model.sync="changePwdForm.newPassword", :placeholder="renderData.newPassword", type="password")
        el-form-item(prop="confirmPassword")
          template(slot="label")
            span.theme-color-C(v-text="renderData.confirmPassword")
          b-input(:model.sync="changePwdForm.confirmPassword", :placeholder="renderData.confirmPassword", type="password", @change="pwdConfirm")

      el-form-item(:label-width="childLabelWidth")
        b-checkbox.theme-color-C(:model.sync="changePwdForm.send_email") {{renderData.sendEmail}}
      el-form-item(:label-width="childLabelWidth")
        b-checkbox.theme-color-C(:model.sync="changePwdForm.password_reset") {{renderData.changeNextTime}}

    template(slot="footer", class="dialog-footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="changePassword", type="primary", :disabled="btnDisabled && changePwdForm.type!=='auto'") {{renderData.confirm}}

</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BRadio from 'components/BRadio'
  import BCheckbox from 'components/BCheckbox'
  import BInput from 'components/BInput'
  import utils from 'common/js/Utils'

  export default {
    name: 'change-password',
    data () {
      var _this = this
      console.log('this.dialogVisible', this.dialogVisible)
      return {
        btnDisabled: true,
        childLabelWidth: '26px',
        dialogVisible: true,
        changePwdForm: {
          newPassword: '',
          confirmPassword: '',
          newPasswordAuto: '',
          password_reset: false,
          send_email: false,
          type: 'auto',
          rules: {
            newPassword: [
              {
                required: true,
                message: _this.renderData.pleaseEnter,
                trigger: ['blur', 'change']
              },
              {
                regex: '',
                message: '',
                validator: utils.validator.validate,
                trigger: ['blur', 'change']
              }
            ],
            confirmPassword: [
              {
                required: true,
                message: _this.renderData.pleaseEnter,
                trigger: 'blur'
              },
              {
                test: function (value) {
                  console.log('newPassword valid')
                  return value === _this.changePwdForm.newPassword
                },
                validator: utils.validator.validate,
                message: _this.renderData.confirmPasswordErrorRule,
                trigger: 'blur'
              }
            ]
          }
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currUser: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    computed: {
      computedRules () {
        if (this.changePwdForm.type === 'auto') {
          return {}
        }
        return this.changePwdForm.rules
      }
    },
    methods: {
      getPwdExp () {
        var params = {}
        var vm = this
        return service.getPwdExp(params).then(({data}) => {
          console.log('接口数据')
          console.log(data)
          for (var dataKey in data.biaodanguize) {
            vm.changePwdForm.rules.newPassword[1].regex = new RegExp(data.biaodanguize[dataKey].slice(1, data.biaodanguize[dataKey].length - 1))
            console.log('表单使用的规则')
            console.log(vm.changePwdForm.rules.newPassword[1].regex)
            console.log(vm.renderData)
            for (var key in vm.renderData) {
              if (dataKey === key) {
                vm.changePwdForm.rules.newPassword[1].message = vm.renderData[key]
                console.log('该规则对应的错误提示')
                console.log(vm.changePwdForm.rules.newPassword[1].message)
                break
              }
            }
          }
        })
      },
//      pwdNew () {
//        this.$refs['newPwd'].validate(valid => {
//          if (valid) {
//          } else {
//            this.btnDisabled = true
//          }
//        })
//      },
      pwdConfirm () {
        this.$refs['changePwdForm'].validate(valid => {
          if (valid) {
            this.btnDisabled = false
          } else {
            this.btnDisabled = true
          }
        })
      },
      changePassword () {
        this.$refs['changePwdForm'].validate(valid => {
          if (valid) {
            var params = {
              uid: this.currUser.uid,
              send_email: this.changePwdForm.send_email,
              password_reset: this.changePwdForm.password_reset
            }
            params.password = this.changePwdForm.type === 'auto' ? this.changePwdForm.newPasswordAuto : this.changePwdForm.newPassword
            service.changePassword(params).then(res => {
              this.visible.dialog = null
            })
          }
        })
      },
      getAutoPassword () {
        console.log(1)
        var params = {}
        service.getAutoPassword(params).then(res => {
          this.changePwdForm.newPasswordAuto = res.password
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    components: {
      BDialog,
      BInput,
      BCheckbox,
      BRadio,
      BButton
    },
    async mounted () {
      this.$nextTick(() => {
        this.getAutoPassword()
      })
      await this.getPwdExp()
    },
    watch: {
      'changePwdForm.type' (newVal, oldVal) {
        if (newVal === 'auto') {
          this.childLabelWidth = '26px'
        } else {
          this.childLabelWidth = '3px'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-button.is-disabled{
    color: #bfcbd9 !important;
    background-color: #eef1f6 !important;;
    border-color: #d1dbe5 !important;
    cursor: not-allowed !important;
  }
</style>
