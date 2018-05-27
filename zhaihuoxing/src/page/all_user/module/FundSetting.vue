<template lang="pug">
  .fund-setting
    p.p1 入金金额设置
    el-collapse(v-model="depositActiveName")
      el-collapse-item(v-for="(item, index) in fundSetting.deposit", :title="item", :name="item")
        el-form(:model="data", ref="depositForm", :rules="depositRules" v-if="item !== 'wechat'")
          el-row(v-for="(currency, idx) in fundSetting.currency", :key="idx", :gutter="20")
            el-col(:span="2" style="margin-top: 8px;")
              span.theme-color-C {{currency.toUpperCase()}}
            el-col(:span="5")
              el-form-item(:prop="'deposit_' + item + '_' + currency + '_min_amount'")
                b-input(placeholder="最小金额", :model.sync="data['deposit_' + item + '_' + currency + '_min_amount']")
            el-col(:span="5")
              el-form-item(:prop="'deposit_' + item + '_' + currency + '_max_amount'")
                b-input(placeholder="最大金额", :model.sync="data['deposit_' + item + '_' + currency + '_max_amount']")

        el-form(ref="wechatForm", :rules="wechatRules", :model="weChatForm" v-if="item === 'wechat'")
          el-row(v-for="(currency, idx) in fundSetting.currency", :key="idx", :gutter="20" style="margin-bottom: 10px;")
            el-col(:span="2" style="margin-top: 8px;")
              span.theme-color-C {{currency.toUpperCase()}}
            el-col(:span="22")
              el-form-item(style="margin-bottom: 0 !important;")
                b-tag(@close="deleteAmount(index, data['deposit_' + item + '_' + currency])", v-for="(amount, index) in data['deposit_' + item + '_' + currency]", :key="index", size="medium")
                  span.tag-group-txt(v-ellipsis-title="", slot="content") {{amount}}
                b-button(type="primary", @click="editItem(currency)", v-if="editingItem!=currency") 添加
              el-form-item.input-container(v-if="editingItem==currency" prop="newAmount" style="margin-bottom: 0 !important;")
                b-input(placeholder="请输入", :model.sync="weChatForm.newAmount")
                b-icon.theme-color-C.theme-color-G-hover.delete(iconName='message_failure', @click.native="cancelEditing")
                b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addAmount(data['deposit_' + item + '_' + currency])")

    p.p2 出金金额设置
    el-collapse(v-model="withdrawalActiveName")
      el-collapse-item(v-for="(item, index) in fundSetting.withdraw", :title="item", :name="item")
        el-form(:model="data", ref="withdrawForm", :rules="withdrawRules")
          el-row(v-for="(currency, idx) in fundSetting.currency", :key="idx", :gutter="20")
            el-col(:span="2" style="margin-top: 8px;")
              span.theme-color-C {{currency.toUpperCase()}}
            el-col(:span="5")
              el-form-item(:prop="'withdraw_' + item + '_' + currency + '_min_amount'")
                b-input(placeholder="最小金额", :model.sync="data['withdraw_' + item + '_' + currency + '_min_amount']")
            el-col(:span="5")
              el-form-item(:prop="'withdraw_' + item + '_' + currency + '_max_amount'")
                b-input(placeholder="最大金额", :model.sync="data['withdraw_' + item + '_' + currency + '_max_amount']")

    b-button(@click="saveForm" type="primary" style="margin-left: 1.2%;") 保存
    b-button(@click="back") 取消

</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BTag from 'components/BTag'
  import { constants, validator } from 'common/js/Utils'

  export default {
    name: 'fund-setting',
    data () {
      return {
        depositActiveName: 'epayments',
        withdrawalActiveName: '',
        editingItem: null,
        weChatForm: {
          newAmount: ''
        },
        wechatRules: {
          newAmount: [
            {
              validator: validator.validate,
              regex: /^[0-9]*$/,
              message: '请输入数字',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    props: {
      fundSetting: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: true
      },
      renderData: {
        type: Object,
        required: true
      }
    },
    computed: {
      depositRules () {
        var res = {}
        var _this = this
        this.fundSetting.deposit.forEach(methodKey => {
          this.fundSetting.currency.forEach(currencyKey => {
            var key = 'deposit_' + methodKey + '_' + currencyKey
            res[key + '_min_amount'] = [
              {
                regex: constants.floatNumberRule,
                validator: validator.validate,
                message: '请输入大于0的整数',
                trigger: 'blur'
              },
              {
                validator: validator.validate,
                message: '最小金额不能大于最大金额',
                test (val) {
                  var targetKey = 'deposit_' + methodKey + '_' + currencyKey + '_max_amount'
                  if (val === '' && _this.data[targetKey] === '') {
                    return true
                  }
                  var valid = parseFloat(val || 0) <= parseFloat(_this.data[targetKey] || Infinity)
                  return valid
                },
                trigger: 'blur'
              }
            ]
            res[key + '_max_amount'] = [
              {
                regex: constants.floatNumberRule,
                validator: validator.validate,
                message: '请输入大于0的整数',
                trigger: 'blur'
              },
              {
                validator: validator.validate,
                message: '最大金额不能小于最小金额',
                test (val) {
                  var targetKey = 'deposit_' + methodKey + '_' + currencyKey + '_min_amount'
                  if (val === '' && _this.data[targetKey] === '') {
                    return true
                  }
                  var valid = parseFloat(val || 0) >= parseFloat(_this.data[targetKey] || Infinity)
                  return valid
                },
                trigger: 'blur'
              }
            ]
          })
        })
        return res
      },
      withdrawRules () {
        var res = {}
        var _this = this
        this.fundSetting.withdraw.forEach(methodKey => {
          this.fundSetting.currency.forEach(currencyKey => {
            var key = 'withdraw_' + methodKey + '_' + currencyKey
            res[key + '_min_amount'] = [
              {
                regex: constants.floatNumberRule,
                validator: validator.validate,
                message: '请输入大于0的整数',
                trigger: 'blur'
              },
              {
                validator: validator.validate,
                message: '最小金额不能大于最大金额',
                test (val) {
                  var targetKey = 'withdraw_' + methodKey + '_' + currencyKey + '_max_amount'
                  if (val === '' && _this.data[targetKey] === '') {
                    return true
                  }
                  var valid = parseFloat(val || 0) <= parseFloat(_this.data[targetKey] || Infinity)
                  return valid
                },
                trigger: 'blur'
              }
            ]
            res[key + '_max_amount'] = [
              {
                regex: constants.floatNumberRule,
                validator: validator.validate,
                message: '请输入大于0的整数',
                trigger: 'blur'
              },
              {
                validator: validator.validate,
                message: '最大金额不能小于最小金额',
                test (val) {
                  var targetKey = 'withdraw_' + methodKey + '_' + currencyKey + '_min_amount'
                  if (val === '' && _this.data[targetKey] === '') {
                    return true
                  }
                  var valid = parseFloat(val || 0) >= parseFloat(_this.data[targetKey] || Infinity)
                  return valid
                },
                trigger: 'blur'
              }
            ]
          })
        })
        return res
      }
    },
    methods: {
      saveForm () {
        let res = true
        this.$refs.depositForm.forEach(function (ref) {
          ref.validate(valid => { res = res & valid })
        })
        this.$refs.withdrawForm.forEach(function (ref) {
          ref.validate(valid => { res = res & valid })
        })
        if (res) {
          console.log('表单通过')
          console.log(this.data)
        }
      },
      deleteAmount (idx, list) {
        list.splice(idx, 1)
      },
      editItem (item) {
        this.weChatForm.newAmount = ''
        this.editingItem = item
      },
      cancelEditing () {
        this.editingItem = null
      },
      addAmount (list) {
        console.log('this.$refs')
        console.log(this.$refs)
        this.$refs['wechatForm'][0].validate(valid => {
          if (valid) {
            list.push(this.weChatForm.newAmount)
            this.weChatForm.newAmount = ''
            this.editingItem = null
          }
        })
      },
      back () {
        this.$emit('back')
      }
    },
    components: {
      BTag,
      BInput,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  .fund-setting {
    .el-collapse-item__content {
      padding: 15px 1.2% !important;
    }
    .p1 {
      padding: 0 1.2% 15px 1.2%;
    }
    .p2 {
      padding: 30px 0 15px 1.2%;
    }
    .input-container {
      .b-input {
        width: 30%;
      }
      .b-icon {
        margin-left: 10px;
      }
    }
  }
</style>
