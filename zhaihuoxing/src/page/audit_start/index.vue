<template lang="pug">
  .audit_start.theme-border-lightenD12.component#audit_start
    b-title(:title="cTitle")
    el-tabs(v-model="activeTab", type="card" v-if="!visible.page")
      el-tab-pane(name="sys", :label="renderData.auditStartSystemAudit", v-if="sysList.length")
        el-row(:gutter="10")
          el-col(v-for="(item, idx) in sysList", :span="6", :key="idx")
            .audit-card.theme-bg-H.theme-border-D.theme-border-C-hover(@click="triggerSysAudit(item)")
              b-icon(:iconName='item.icon.icon||item.icon', size="50px")
              .text-area
                .label.theme-color-C(v-text="item.label")
                .description.theme-color-lightenC32(v-text="item.description", v-ellipsis-title='')

      el-tab-pane(name="custom", :label="renderData.auditStartDiyAudit", v-if="customizedList.length")
        el-row(:gutter="10")
          el-col(v-for="(item, idx) in customizedList", :span="6", :key="idx")
            .audit-card.theme-bg-H.theme-border-D.theme-border-C-hover(@click="triggerAudit(item)")
              b-icon(:iconName='item.icon.icon||item.icon', size="50px")
              .text-area
                .label.theme-color-C(v-text="item.label")
                .description.theme-color-lightenC32(v-text="item.description", v-ellipsis-title='')

    component(:is="visible.page", :currAudit="currAudit", :visible="visible", :renderData="generateRenderData()" v-else)
</template>

<script>
  import BTitle from 'components/BTitle'
  import BIcon from 'components/BIcon'
  import service from './service'
  import commonMixin from 'common/js/commonMixin'
  import componentMixin from 'common/js/componentMixin'
  import CustomForm from './module/CustomFormPage'
  import DepositWiredTransfer from './module/DepositWiredTransfer'
  import WithdrawalUnionpay from './module/WithdrawalUnionpay'
  import WithdrawalEpayments from './module/WithdrawalEpayments'
  import WithdrawalNeteller from './module/WithdrawalNeteller'
  import WithdrawalSkrill from './module/WithdrawalSkrill'
  import WithdrawalWiredTransfer from './module/WithdrawalWiredTransfer'

  export default {
    name: 'audit_start',
    mixins: [commonMixin, componentMixin],
    data () {
      var auditStart = window.renderData.components.audit_start
      var sysList = []
      var auth = ''
      if (auditStart.audit_start_deposit_wired_transfer) {
        auth = auditStart.audit_start_deposit_wired_transfer
        sysList.push({
          name: 'deposit_wired_transfer',
          auth: 'audit_start_deposit_wired_transfer',
          label: auth.depositWiredTransfer,
          description: auth.depositWiredTransferNotes,
          icon: auth.wiredTransferIcon
        })
      }
      if (auditStart.audit_start_withdrawal_wired_transfer) {
        auth = auditStart.audit_start_withdrawal_wired_transfer
        sysList.push({
          name: 'withdrawal_wired_transfer',
          auth: 'audit_start_withdrawal_wired_transfer',
          label: auth.withdrawalWiredTransfer,
          description: auth.withdrawalWiredTransferNotes,
          icon: auth.wiredTransferIcon
        })
      }
      if (auditStart.audit_start_withdrawal_unionpay) {
        auth = auditStart.audit_start_withdrawal_unionpay
        sysList.push({
          name: 'withdrawal_unionpay',
          auth: 'audit_start_withdrawal_unionpay',
          label: auth.unionpay,
          description: auth.unionpayNotes,
          icon: auth.unionpayIcon
        })
      }
      if (auditStart.audit_start_withdrawal_skrill) {
        auth = auditStart.audit_start_withdrawal_skrill
        sysList.push({
          name: 'withdrawal_skrill',
          auth: 'audit_start_withdrawal_skrill',
          label: auth.skrill,
          description: auth.skrillNotes,
          icon: auth.skrillIcon
        })
      }
      if (auditStart.audit_start_withdrawal_neteller) {
        auth = auditStart.audit_start_withdrawal_neteller
        sysList.push({
          name: 'withdrawal_neteller',
          auth: 'audit_start_withdrawal_neteller',
          label: auth.neteller,
          description: auth.netellerNotes,
          icon: auth.netellerIcon
        })
      }
      if (auditStart.audit_start_withdrawal_epayments) {
        auth = auditStart.audit_start_withdrawal_epayments
        sysList.push({
          name: 'withdrawal_epayments',
          auth: 'audit_start_withdrawal_epayments',
          label: auth.epayments,
          description: auth.epaymentsNotes,
          icon: auth.epaymentsIcon
        })
      }
      return {
        visible: {
          page: null,
          dialog: null
        },
        currAudit: {
          icon: '',
          label: '',
          description: '',
          name: ''
        },
        customizedList: [],
        activeTab: 'sys',
        renderData: Object.assign({}, auditStart, auditStart.audit_start_auth),
        sysList: sysList
      }
    },
    async mounted () {
//      await this.getSysAuditIcon()
      await this.getCustomizedAudit()
    },
    methods: {
      generateRenderData () {
        var auth = this.currAudit.auth
        return Object.assign({}, this.renderData, this.renderData[auth])
      },
      getCustomizedAudit () {
        var params = {}
        return service.getCustomizedAudit(params).then(({re, data}) => {
          if (re === '200') {
            this.customizedList = data
          }
        })
      },
      triggerSysAudit (audit) {
        this.currAudit = audit
        this.visible.page = audit.name
      },
      triggerAudit (audit) {
        this.currAudit = audit
        this.visible.page = 'custom_form_page'
      }
//      getSysAuditIcon () {
//        var params = {}
//        return service.getSysAuditIcon(params).then(({re, data}) => {
//          if (re === '200') {
//            this.sysList.map(sys => {
//              sys.icon = data[sys.name].icon
//            })
//          }
//        })
//      }
    },
    computed: {
      cTitle () {
        return !this.visible.page ? this.renderData.auditStartAuditStart : this.currAudit.label
      }
    },
    components: {
      'custom_form_page': CustomForm,
      'deposit_wired_transfer': DepositWiredTransfer,
      'withdrawal_wired_transfer': WithdrawalWiredTransfer,
      'withdrawal_unionpay': WithdrawalUnionpay,
      'withdrawal_skrill': WithdrawalSkrill,
      'withdrawal_neteller': WithdrawalNeteller,
      'withdrawal_epayments': WithdrawalEpayments,
      BTitle,
      BIcon
    }
  }
</script>

<style lang="less">
  #audit_start {
    overflow: auto;
    overflow-x: hidden;
    position: relative;

    .el-tabs__header {
      margin-bottom: 5px !important;
    }
    .audit-card {
      margin: 15px 0;
      padding: 15px 0;
      height: 80px;
      border: 1px solid;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.07), 0 0 4px 0 rgba(0, 0, 0, 0.03);
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      &:hover {
        bottom: 2px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.08), 0 0 4px 0 rgba(0, 0, 0, 0.04);
      }
      .b-icon {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        padding: 0 15px;
      }
      .text-area {
        max-width: 70%;
        display: inline-block;
        vertical-align: top;
        height: 100%;
        .label {
          font-size: 16px;
          font-weight: bold;
        }
        .description {
          width: 100%;
          line-height: 30px;
        }
      }
    }
  }
</style>
