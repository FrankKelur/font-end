<template lang="pug">
  .withdraw_unionpay
    .tooltip.theme-color-C {{renderData.withdrawalUnionpayAttention}}
    .title.theme-color-C {{renderData.withdrawalUnionpayText}}
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
      el-form-item(prop="others.cardNo")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.cardNo}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.cardNo")
      el-form-item(prop="others.name")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.name}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.name")
      el-form-item(prop="others.bankName")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.bankName}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.bankName")
      el-form-item(prop="others.bankBranch")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.bankBranch}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.bankBranch")
      el-form-item(prop="others.bankProvince")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.bankProvince}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.bankProvince")
      el-form-item(prop="others.bankCity")
        .form-label(v-ellipsis-title="" slot="label") {{renderData.bankCity}}
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="info.others.bankCity")
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
    name: 'withdrawal_unionpay',
    data () {
      return {
        info: {
          aid: '',
          username: '',
          account: '',
          currency: '',
          amount: '',
          others: {
            bankBranch: '',
            bankCity: '',
            bankName: '',
            bankProvince: '',
            cardNo: '',
            name: ''
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
            cardNo: [
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
            name: [
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
            bankName: [
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
            bankBranch: [
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
            bankProvince: [
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
            bankCity: [
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
//          'others.cardNo': [
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
//          ],
//          'others.name': [
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
//          ],
//          'others.bankName': [
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
//          ],
//          'others.bankBranch': [
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
//          ],
//          'others.bankProvince': [
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
//          ],
//          'others.bankCity': [
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
  .withdraw_unionpay {
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
