<template lang="pug">
  b-dialog.changeAcconut(:show.sync="activeName3", :title="renderData.operateOpts[2].label", :show-close="true", :before-close="beforeClose")
    .change_body
      el-form(:model="changeAcconutForm", :rules="changeAccountRules", ref="changeAcconutForm", label-width="130")
        el-form-item(:label="renderData.operateOpts[2].check_trade_account_list_change_account_info.accountType", prop="accountType")
          b-select(:model.sync="changeAcconutForm.accountType", @change="changeAccountType")
            el-option(v-for="(item,idx) in accountTypeSelect", :key="idx", :label="item.label", :value="item.label")
        el-form-item(:label="renderData.operateOpts[2].check_trade_account_list_change_account_info.currency", prop="currency")
          b-select(:model.sync="changeAcconutForm.currency")
            el-option(v-for="(item, idx) in currencySelect", :key="idx", :label="item", :value="item")
        el-form-item(:label="renderData.operateOpts[2].check_trade_account_list_change_account_info.leverage", prop="leverage")
          b-select(:model.sync="changeAcconutForm.leverage")
            el-option(v-for="(item, idx) in leverageSelect", :key="idx", :label="item", :value="item")
    template(slot="footer")
      b-button(@click="activeA") {{renderData.operateOpts[2].check_trade_account_list_change_account_info.cancel}}
      b-button(@click="activeB", type="primary") {{renderData.operateOpts[2].check_trade_account_list_change_account_info.confirm}}
</template>

<script>
  import BSelect from 'components/BSelect'
  import BDialog from 'components/BDialog'
  import BTitle from 'components/BTitle'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'
  import service from '../service'

  export default {
    data () {
      return {
        aid: '',
        accountTypeSelect: [],
        currencySelect: [],
        leverageSelect: [],
        activeName3: true,
        changeAcconutForm: {
          accountType: '',
          currency: '',
          leverage: ''
        },
        changeAccountRules: {
          accountType: [
            {required: true, message: this.renderData.requiredEnter, trigger: 'blur'}
          ],
          currency: [
            {required: true, message: this.renderData.requiredEnter, trigger: 'blur'}
          ],
          leverage: [
            {required: true, message: this.renderData.requiredEnter, trigger: 'blur'}
          ]
        }
      }
    },
    props: {
      renderData: {
        type: Object
      },
      accountInfo: {
        type: Object
      },
      profile: {
        type: Object
      }
    },
    methods: {
      changeAccountType () {
        service.editAccount({}).then(data1 => {
          this.changeAcconutForm.currency = ''
          this.changeAcconutForm.leverage = ''
          this.accountTypeSelect = [data1[0].type_name, data1[1].type_name]
          if (this.changeAcconutForm.accountType === data1[0].type_name.label) {
            this.currencySelect = data1[0].currency
            this.leverageSelect = data1[0].leverage
            this.aid = data1[0].aid
          } else {
            this.currencySelect = data1[1].currency
            this.leverageSelect = data1[1].leverage
            this.aid = data1[1].aid
          }
        })
      },
      beforeClose () {
        this.$emit('checkPwdDialog')
      },
      activeA () {
        this.$emit('checkPwdDialog')
      },
      activeB () {
        this.$emit('checkPwdDialog')
        var params = {
          cpne_name: 'all_user',
          target_uid: this.profile.uid,
          target_account_id: this.accountInfo.account_id,
          accountId: this.accountInfo.accountId,
          accountType: this.aid,
          currency: this.changeAcconutForm.currency,
          leverage: this.changeAcconutForm.leverage
        }
        service.confirmEdit(params).then(data1 => {})
      }
    },
    async mounted () {
      this.changeAcconutForm.accountType = this.accountInfo.accoutType
      this.changeAcconutForm.currency = this.accountInfo.currency
      this.changeAcconutForm.leverage = this.accountInfo.leverage
      service.editAccount({}).then(data1 => {
        this.accountTypeSelect = [data1[0].type_name, data1[1].type_name]
        if (this.changeAcconutForm.accountType === data1[0].type_name.label) {
          this.currencySelect = data1[0].currency
          this.leverageSelect = data1[0].leverage
          this.aid = data1[0].aid
        } else {
          this.currencySelect = data1[1].currency
          this.leverageSelect = data1[1].leverage
          this.aid = data1[1].aid
        }
      })
    },
    components: {
      BTitle,
      service,
      BIcon,
      BButton,
      BSelect,
      BDialog
    }
  }
</script>

<style lang="less">
  .all-user-list-fund-setting {
  }
</style>
