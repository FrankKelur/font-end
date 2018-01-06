<template lang="pug">
  .audit_start.theme-border-lightenD12#audit_start
    b-title(:title="cTitle")
    el-tabs(v-model="activeTab", type="card" v-if="!visible.page")
      el-tab-pane(name="sys", :label="renderData.auditStartSystemAudit", v-if="sysList.length")
        el-row(:gutter="10")
          el-col(v-for="item in sysList", :span="6", :key="item.name")
            .audit-card.theme-bg-H.theme-border-D.theme-border-C-hover(@click="triggerAudit(item)")
              b-icon(:iconName='item.icon', size="50px")
              .text-area
                .label.theme-color-C(v-text="item.label")
                .description.theme-color-lightenC32(v-text="item.description", v-ellipsis-title='')

      el-tab-pane(name="custom", :label="renderData.auditStartDiyAudit", v-if="customizedList.length")
        el-row(:gutter="10")
          el-col(v-for="item in customizedList", :span="6", :key="item.name")
            .audit-card.theme-bg-H.theme-border-D.theme-border-C-hover(@click="triggerAudit(item)")
              b-icon(:iconName='item.icon', size="50px")
              .text-area
                .label.theme-color-C(v-text="item.label")
                .description.theme-color-lightenC32(v-text="item.description", v-ellipsis-title='')

    component(:is="visible.page", :currAudit="currAudit", :visible="visible", :renderData="renderData" v-else)
</template>

<script>
  import BTitle from 'components/BTitle'
  import BIcon from 'components/BIcon'
  import service from './service'
  import commonMixin from 'common/js/commonMixin'
  import componentMixin from 'common/js/componentMixin'
  import CustomForm from './module/CustomForm'

  export default {
    name: 'audit_start',
    mixins: [commonMixin, componentMixin],
    data () {
      var auditStart = window.renderData.components.audit_start
      var sysList = []
      if (auditStart.audit_start_deposit) {
        var depositAuth = auditStart.audit_start_deposit
        sysList.push({
          name: 'deposit',
          label: depositAuth.deposit,
          description: depositAuth.auditStartDepositNotes,
          icon: 'deposit'
        })
      }
      if (auditStart.audit_start_withdraw) {
        var withdrawAuth = auditStart.audit_start_withdraw
        sysList.push({
          name: 'withdraw',
          label: withdrawAuth.withdraw,
          description: withdrawAuth.auditStartWithdrawNotes,
          icon: 'withdraw'
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
      await this.getSysAuditIcon()
      await this.getCustomizedAudit()
    },
    methods: {
      getCustomizedAudit () {
        var params = {}
        return service.getCustomizedAudit(params).then(({re, data}) => {
          if (re === '200') {
            this.customizedList = data
          }
        })
      },
      triggerAudit (audit) {
        this.currAudit = audit
        this.visible.page = 'custom_form'
//        var params = audit
//        return service.triggerAudit(params)
      },
      getSysAuditIcon () {
        var params = {}
        return service.getSysAuditIcon(params).then(({re, data}) => {
          if (re === '200') {
            this.sysList.map(sys => {
              sys.icon = data[sys.name].icon
            })
          }
        })
      }
    },
    computed: {
      cTitle () {
        if (!this.visible.page) {
          return this.renderData.auditStartAuditStart
        }
        return this.currAudit.label
      }
    },
    components: {
      'custom_form': CustomForm,
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
      box-shadow: 0 2px 3px 0 rgba(0,0,0,0.07), 0 0 4px 0 rgba(0,0,0,0.03);
      border-radius: 4px;
      position: relative;
      cursor: pointer;
      &:hover{
        bottom: 2px;
        box-shadow: 0 2px 3px 0 rgba(0,0,0,0.08), 0 0 4px 0 rgba(0,0,0,0.04);
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
          line-height: 30px;
        }
      }
    }
  }
</style>
