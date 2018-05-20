<template lang="pug">
  .fund_management_setting.component#fund_management_setting
    b-title(:title="renderData.fundManagementSetting")
    el-tabs(v-model="whichTab" type="card")
      el-tab-pane(v-if="renderData.fund_management_setting_deposit" , :label="renderData.fund_management_setting_deposit.fundManagementSettingDeposit" name="deposit")
        deposit-setting(:Data="Data", :StatusData="StatusData")
      el-tab-pane(v-if="renderData.fund_management_setting_withdrawal" , :label="renderData.fund_management_setting_withdrawal.fundManagementSettingWithdrawal" name="withdrawal")
        withdrawal-setting(:Data="Data", :StatusData="StatusData")
      el-tab-pane(v-if="renderData.fund_management_setting_transfer" , :label="renderData.fund_management_setting_transfer.fundManagementSettingTransfer" name="transfer")
        transfer-setting(:Data="Data", :StatusData="StatusData")
</template>

<script>
  import BTitle from 'components/BTitle'
  import DepositSetting from './module/depositSetting'
  import WithdrawalSetting from './module/withdrawalSetting'
  import TransferSetting from './module/transferSetting'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'

  export default {
    name: 'fund_management_setting',
    mixins: [componentMixin],
    data () {
      return {
        renderData: {},
        whichTab: 'transfer',
        Data: {},
        StatusData: {}
      }
    },
    methods: {
      getFundSetting () {
        return service.getFundSetting({}).then(data => {
          this.Data = data
        })
      },
      getFundStatus () {
        return service.getFundStatus({}).then(data => {
          this.StatusData = data
        })
      }
    },
    async mounted () {
      await this.getFundStatus()
      await this.getFundSetting()
      var fundSetting = window.renderData.components.fund_management_setting
      this.renderData = Object.assign({}, fundSetting, fundSetting.fund_management_setting_auth)
    },
    components: {
      BTitle,
      DepositSetting,
      WithdrawalSetting,
      TransferSetting
    }
  }

</script>

<style lang="less">
  #fund_management_setting{
    .b-title{
      margin-bottom: 5px!important;
    }
    #deposit-setting,#withdrawal-setting,#transfer-setting{
      .el-collapse-item__content{
        padding: 25px 1.2% 0 !important;
      }
      .statusForm{
        margin-left: 1.2%;
        .el-form-item{
          margin-bottom: 0 !important;
        }
      }
      .status{
        .el-form-item{
          margin-bottom: 0!important;
        }
        .el-form-item__label{
          width: 100%;
          text-align: left!important;
        }
        .delete-icon{
          margin-left: 10px;
        }
        .add-btn{
          margin-left: 0;
          font-size: 14px;
        }
        button{
          padding-left: 10px;
          padding-right: 10px;
          margin-top: 0;
          margin-bottom: 0;
        }
      }
      .new-status{
        .el-form-item{
          margin-bottom: 0!important;
        }
        .el-input{
          width: 20%;
          margin-top: 10px;
        }
        input{
          width: 100%!important;
        }
        span:nth-child(2) {
          width: 2%;
          margin-left: 0.5%;
          margin-right: 0.5%;
          text-align: center;
          display: inline-block;
        }
      }
      .deposit_setting_component_tag{
        margin-left: 0 !important;
        margin-right: 8px !important;
        margin-top: 3px !important;
        font-size: 14px;
      }
      .el-collapse,.transfer-form{
        margin-top: 10px;
        margin-bottom: 40px;
        .el-form-item__label{
          text-align: left!important;
        }
        .input{
          width: 30%!important;
        }
        .other-item-label{
          display: inline-block;
        }
        .other-item{
          width: 30% !important;
          height: 40px;
          margin-bottom: 15px;
          cursor: pointer;
          .delete{
            margin-left: 12px;
          }
          .el-input{
            width: 80%;
          }
          span:nth-child(1) {
            width: 8%;
            text-align: center;
            vertical-align: top;
          }
        }
        .other-item:last-child{
          margin-bottom: 0;
        }
        .custom-item {
          width: 20% !important;
          height: 40px;
          > span {
            display: inline-block;
          }
          cursor: pointer;
          > span {
            display: inline-block;
          }
          > span:nth-child(1) {
            width: 75%;
            text-align: left;
          }
          span:nth-child(2) {
            width: 8%;
            text-align: center;
            display: inline-block;
            vertical-align: top;
            margin-top: 13px;
          }
          span:nth-child(3) {
            width: 8%;
            margin-left: 10px;
            text-align: center;
            display: inline-block;
            vertical-align: top;
            margin-top: 13px;
          }
        }
        .has-custom {
          margin-top: 15px;
        }
        .footer {
          padding-top: 35px;
          padding-bottom: 25px;
        }
      }
    }
    #transfer-setting{
      .transfer-form{
        padding: 2px 1.2% 0 !important;
      }
    }
  }
</style>
