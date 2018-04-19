<template lang="pug">
  .withdraw_neteller
    .tooltip.theme-color-C {{renderData.withdrawalNetellerAttention}}
    .title.theme-color-C {{renderData.withdrawalNetellerText}}
    el-form(:model="info", ref="infoForm", :rules="rules" label-width="140px", labelPosition='left')
      el-form-item(prop="username")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.username}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.username", @blur="getAccountByUsername")
      el-form-item(prop="account")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.tradeAccount}}
        b-select(:placeholder="renderData.pleaseSelect", :model.sync="info.account")
          el-option(v-for="(item, idx) in accountList", :key="idx", :label='item.key', :value="item.key")
      el-form-item(prop="currency")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.currency}}
        b-input(:placeholder="renderData.pleaseSelect", :model.sync="info.currency", :disabled="true")
      el-form-item(prop="amount")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.withdrawalAmount}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.amount")
      el-form-item(prop="others.netellerAccount")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.netellerAccount}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.netellerAccount")
      .email-tooltip {{renderData.netellerEmailNotes}}
    custom-form.custom-area(:model="info", ref="customForm", :formItemList="formItemList", :renderData="renderData", label-width="140px")
    .footer
      b-button(@click="back") {{renderData.back}}
      b-button(@click="submit" type="primary") {{renderData.submit}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BAlert from 'components/BAlert'
  import BSelect from 'components/BSelect'
  import CustomForm from '@/page/audit_process/module/CustomForm'
  import BDatepicker from 'components/BDatepicker'
  import { validator, constants } from 'common/js/Utils'

  export default {
    name: 'withdrawal_neteller',
    data () {
      return {
        info: {
          aid: '',
          username: '',
          account: '',
          currency: '',
          amount: '',
          others: {
            netellerAccount: ''
          }
        },
        formItemList: [],
        accountList: [],
        rules: {
          username: [
            {
              required: true,
              message: this.renderData.pleaseEnter,
              trigger: 'blur,change'
            },
            {
              validator: validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: this.renderData.noSpace,
              trigger: 'blur,change'
            }
          ],
          account: [
            {
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'blur,change'
            },
            {
              validator: validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: this.renderData.noSpace,
              trigger: 'blur,change'
            }
          ],
          currency: [
            {
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'blur,change'
            },
            {
              validator: validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: this.renderData.noSpace,
              trigger: 'blur,change'
            }
          ],
          amount: [
            {
              required: true,
              message: this.renderData.pleaseEnter,
              trigger: 'blur,change'
            },
            {
              validator: validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: this.renderData.noSpace,
              trigger: 'blur,change'
            },
            {
              validator: validator.validate,
              regex: constants.floatNumberRule,
              message: this.renderData.onlyFloatNumber,
              trigger: 'blur,change'
            }
          ],
          others: {
            netellerAccount: [
              {
                required: true,
                message: this.renderData.pleaseEnter,
                trigger: 'blur,change'
              },
              {
                validator: validator.validate,
                test (val) {
                  return val.trim() === val
                },
                message: this.renderData.noSpace,
                trigger: 'blur,change'
              }
            ]
          }
//          'others.netellerAccount': [
//            {
//              required: true,
//              message: this.renderData.pleaseEnter,
//              trigger: 'blur,change'
//            },
//            {
//              validator: validator.validate,
//              test (val) {
//                return val.trim() === val
//              },
//              message: this.renderData.noSpace,
//              trigger: 'blur,change'
//            }
//          ]
        }
      }
    },
    methods: {
      back (cb) {
        this.visible.page = null
      },
      submit () {
        var res = true
        this.$refs['infoForm'].validate((valid) => { res = res && valid })
        this.$refs['customForm'].validate((valid) => { res = res && valid })
        if (!res) {
          return
        }
        var params = {
          audit_type: this.currAudit.name,
          data: this.info
        }
        service.submitAudit(params)
      },
      getFormItemList () {
        var params = {
          audit_type: this.currAudit.name
        }
        return service.getFormItemList(params).then(({re, data}) => {
          if (re === '200') {
            this.formItemList = data
            this.formItemList.forEach(item => {
              this.$set(item, 'value', '')
              if (item.type === 'upload') {
                this.$set(item, 'value', {url: '', name: ''})
              }
            })
          }
        })
      },
      getAccountByUsername () {
        var params = {
          username: this.info.username
        }
        service.getAccountByUsername(params).then(({re, data}) => {
          if (re === '200') {
            this.accountList = data
          }
        })
      }
    },
    props: {
      renderData: {
        required: true,
        type: Object
      },
      currAudit: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      }
    },
    watch: {
      'info.account': {
        handler (newVal, oldVal) {
          var account = this.accountList.find(item => item.key === this.info.account)
          this.info.currency = account.currency
          this.info.aid = account.aid
        }
      }
    },
    components: {
      BSelect,
      CustomForm,
      BDatepicker,
      BInput,
      BAlert,
      BButton
    },
    async mounted () {
      await this.getFormItemList()
    }
  }
</script>

<style lang="less" scoped>
  .withdraw_neteller {
    .title {
      line-height: 22px;
      white-space: pre;
      margin-bottom: 20px;
    }
    .form-label {
      display: inline-block;
      vertical-align: top;
      width: 90%;
    }
    .footer {
      margin-left: 140px;
    }
    .el-form {
      width: 60%;
    }
  }
</style>
