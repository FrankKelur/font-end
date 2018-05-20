<template lang="pug">
  .deposit.theme-border-lightenD12.component#deposit
    el-dialog(:visible.sync="epaymentsDialog", :title="renderData.epaymentsTitle", width="30%")
      p {{renderData.epaymentsText}}
      el-checkbox.margin-top-15(v-model="epaymentsAgreement") {{renderData.epaymentsAgreement}}
      span(slot="footer" class="dialog-footer")
        b-button(@click="epaymentsDialog = false") {{renderData.epaymentsCancel}}
        b-button(type="primary", @click="epaymentsDialog = false") {{renderData.epaymentsConfirm}}

    .amt-more-left-in
      b-title(:title="renderData.deposit")

    .amt-more-left-in
      el-collapse(v-model="activeName", accordion)
        el-collapse-item(name="unionpay")
          template(slot="title")
            img(src="../../../static/images/unionpay.png")
            span.title {{renderData.unionpay}}
          unionpay(:list="selectList", v-if="selectList.length!=0", :customField="unionpayCustomField")

        el-collapse-item(name="wechat")
          template(slot="title")
            img(src="../../../static/images/wechat.png")
            span.title {{renderData.wechat}}
          wechat(:list="selectList", v-if="selectList.length!=0", :customField="wechatCustomField")

        el-collapse-item(name="wiredTransfer")
          template(slot="title")
            img(src="../../../static/images/wired_transfer.png")
            span.title {{renderData.wiredTransfer}}
          wired-transfer(:list="selectList", v-if="selectList.length!=0", :customField="wiredtransferCustomField")

        el-collapse-item(name="epayments")
          template(slot="title")
            img(src="../../../static/images/epayments.png")
            span.title {{renderData.epayments}}
          epayments(:list="selectList", v-if="selectList.length!=0", :customField="epaymentsCustomField")

        el-collapse-item(name="neteller")
          template(slot="title")
            img(src="../../../static/images/neteller.png")
            span.title {{renderData.neteller}}
          neteller(:list="selectList", v-if="selectList.length!=0", :customField="netellerCustomField")

        el-collapse-item(name="skrill")
          template(slot="title")
            img(src="../../../static/images/skrill.png")
            span.title {{renderData.skrill}}
          skrill(:list="selectList", v-if="selectList.length!=0", :customField="skrillCustomField")

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import unionpay from './module/unionpay.vue'
  import wechat from './module/wechat.vue'
  import wiredTransfer from './module/wiredTransfer.vue'
  import epayments from './module/epayments.vue'
  import neteller from './module/neteller.vue'
  import skrill from './module/skrill.vue'
  import service from './service'

  export default {
    mixins: [componentMixin],
    name: 'deposit',
    data () {
      // 获取账号邮箱
      service.getUserEmailForAccount({}).then(data => {
        window.renderData.components.deposit.deposit_auth.USEREMAIL = data.account
      })
      // 获取自定义字段设置
      let vm = this
      service.getFundSetting({}).then(data => {
        data.deposit.forEach(function (val) {
          switch (val.name) {
            case 'unionPayDeposit':
              vm.unionpayCustomField = val.data.customField
              break
            case 'weixinDeposit':
              vm.wechatCustomField = val.data.customField
              break
            case 'wiredTransferDeposit':
              vm.wiredtransferCustomField = val.data.customField
              break
            case 'skrillDeposit':
              vm.skrillCustomField = val.data.customField
              break
            case 'netellerDeposit':
              vm.netellerCustomField = val.data.customField
              break
            case 'epaymentsDeposit':
              vm.epaymentsCustomField = val.data.customField
              break
          }
        })
      })
      var comAuth = window.renderData.components.deposit
      var renderData = window.renderData.components.deposit.deposit_auth
      return {
        unionpayCustomField: null,
        wechatCustomField: null,
        wiredtransferCustomField: null,
        epaymentsCustomField: null,
        netellerCustomField: null,
        skrillCustomField: null,
        epaymentsAgreement: false,
        epaymentsDialog: false,
        comAuth: comAuth,
        renderData: renderData,
        activeName: 'unionpay',
        selectList: []
      }
    },
    mounted () {
      service.getTradeAccountSelect({}).then(data => {
        this.selectList = data
      })
    },
    watch: {
      activeName: function (newVal, oldVal) {
        if (newVal === 'epayments') {
          if (this.epaymentsAgreement === false) {
            this.epaymentsDialog = true
          }
        }
      }
    },
    components: {
      BTitle,
      BButton,
      unionpay,
      wechat,
      wiredTransfer,
      epayments,
      neteller,
      skrill
    }
  }
</script>

<style lang="less">
  #deposit{
    .el-collapse-item__header{
      img{
        vertical-align: middle;
      }
      .title{
        margin-left: 20px;
        vertical-align: middle;
      }
    }
    .el-collapse-item__content {
      padding: 45px 5% !important;
    }
    .unionpay,.wechat,.wiredTransfer,.epayments,.neteller,.skrill{
      &:after{
        display: block;
        content: " ";
        clear: both;
      }
      .user-operation .el-form-item:last-child{
        margin-bottom: 0 !important;
      }
      .user-operation,.legal-description{
        float: left;
        width: 50%;
      }
      .input-long-type1 {
        width: 50% !important;
      }
      .input-long-type2 {
        width: 30% !important;
      }
      .p{
        width: 80%;
      }
    }
  }
</style>
