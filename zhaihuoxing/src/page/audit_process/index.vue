<template lang="pug">
  .audit_process.theme-border-lightenD12.component#auditProcess
    b-title(:title="pageTitle")
    template(v-if="!visible.page")
      .oper-container.clear-float
        el-row(:gutter="10")
          el-col(:span="3", :offset='21')
            b-button(@click='sortAudit') {{renderData.order}}
      el-tabs(v-model="activeTab", type="card")
        el-tab-pane(v-for='tab in auditTabs', :name="tab.name", :key="tab.name")
          el-badge(slot="label", :value="auditCount[tab.name]")
            .item.pointer(v-text="tab.label")
          b-search-table(:ref="tab.name + '_table'", :optHandler='optHandler', :render-data="getTableRenderData(tab)", :url="tableUrl", :params="getTableParams(tab)", v-if="activeTab===tab.name")

    component(:is="visible.page", :render-data="modalRenderData", :visible="visible", :curr-row="currRow", :auditType="activeTab", :activeTabLabel="activeTabLabel", @getAuditCount="getAuditCount")

    component(:is="visible.dialog", :render-data="modalRenderData", :curr-row="currRow", :visible="visible", :audit-list="customizedAudits", :auditType="activeTab", :activeTabLabel="activeTabLabel", @refresh-sort="appendCustomizedAudit")

</template>

<script>
  import { Popover } from 'element-ui'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BSearchTable from 'components/BSearchTable'
  import SetPriority from './module/setPriority'
  import AuditHistory from './module/AuditHistory'
  import SortAudits from './module/sortAudits'
  import AuditTask from './module/AuditTask'
  import CustomAuditPage from './module/CustomAuditPage'
  import CustomOperate from './module/CustomOperate'
  import service from './service'
  import commonMixin from 'common/js/commonMixin'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'audit_process',
    mixins: [commonMixin, componentMixin],
    data () {
      var auditProcess = window.renderData.components.audit_process
      var renderData = Object.assign({}, auditProcess, auditProcess.audit_process_auth)
      var tableRenderData = Object.assign({}, auditProcess.audit_process_auth)
      tableRenderData.listObj = auditProcess.audit_process_list_deposit
      tableRenderData.searchObj = auditProcess.audit_process_search_deposit_audit
      var withdrawTable = Object.assign({}, auditProcess.audit_process_auth)
      withdrawTable.listObj = auditProcess.audit_process_list_withdraw
      withdrawTable.searchObj = auditProcess.audit_process_search_withdraw_audit
      var customTable = Object.assign({}, auditProcess.audit_process_auth)
      customTable.listObj = renderData.audit_process_list_custom
      customTable.listObj.operateOpts.forEach(opt => {
        opt.auth = opt._auth  // 自定义审核里面的操作不是权限，要避免被后端过滤，写成了_auth而不是auth
      })
      customTable.searchObj = renderData.audit_process_search_custom_audit
      var _this = this
      var optHandler = {
        audit_process_deposit_audit_task (row, renderData) {
          console.log('audit_process_deposit_audit_task ', renderData)
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.processTask()
        },
        audit_process_deposit_audit_history (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.page = 'audit_process_deposit_audit_history'
        },
        audit_process_deposit_priority_set (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.dialog = 'audit_process_deposit_priority_set'
        }
      }
      optHandler.audit_process_withdraw_audit_task = optHandler.audit_process_deposit_audit_task
      optHandler.audit_process_withdraw_audit_history = optHandler.audit_process_deposit_audit_history
      optHandler.audit_process_withdraw_priority_set = optHandler.audit_process_deposit_priority_set
      optHandler.audit_process_custom_audit_task = optHandler.audit_process_deposit_audit_task
      optHandler.audit_process_custom_audit_history = optHandler.audit_process_deposit_audit_history
      optHandler.audit_process_custom_priority_set = optHandler.audit_process_deposit_priority_set
      var auditTabs = []
      if (renderData.audit_process_list_withdraw) {
        auditTabs.push({
          label: renderData.audit_process_list_withdraw.auditProcessWithdrawAudit,
          name: 'withdraw_audit'
        })
      }
      if (renderData.audit_process_list_deposit) {
        auditTabs.push({
          label: renderData.audit_process_list_deposit.auditProcessDepositAudit,
          name: 'deposit_audit'
        })
      }
      return {
        visible: {
          dialog: null,
          page: null
        },
        textMap: {
          order_ref: '',
          trade_system: '',
          account: '',
          method: '',
          amount: ''
        },
        auditCount: {},
        activeTab: null,
        params: {},
        customizedAudits: [],
        tableUrl: '/api/resource/audit_process/get_audit_list',
        auditTabs: auditTabs,
        defaultAuditTabs: Object.assign([], auditTabs),
        tableRenderData: tableRenderData,
        withdrawTable: withdrawTable,
        customTable: customTable,
        renderData: renderData,
        modalRenderData: renderData,
        currRow: {},
        optHandler: optHandler
      }
    },
    async mounted () {
      await this.getAuditCount()
      await this.appendCustomizedAudit()
    },
    computed: {
      activeTabLabel () {
        var currTab = this.auditTabs.find(tab => tab.name === this.activeTab) || {}
        return currTab.label
      },
      pageTitle () {
        if (!this.visible.page) {
          return this.renderData.auditProcessAudit
        } else if (this.visible.page === 'audit_process_deposit_audit_history') {
          return this.modalRenderData.auditHistory + '-' + this.currRow.task_id
        } else if (this.visible.page === 'CustomAuditPage') {
          return this.currRow.currStep && this.currRow.currStep.name
        }
      },
      auditUserParams () {
        return {
          audit_type: this.activeTab
        }
      }
    },
    methods: {
      getTableRenderData (tab) {
        var tableRenderData = null
        if (tab.name === 'deposit_audit') {
          tableRenderData = this.tableRenderData
        } else if (tab.name === 'withdraw_audit') {
          tableRenderData = this.withdrawTable
        } else {
          tableRenderData = this.customTable
        }
        var h = this.$createElement
        var _this = this
        var popover = Popover
        tableRenderData = JSON.parse(JSON.stringify(tableRenderData))
        var headerCols = tableRenderData.listObj.headerCols
        tableRenderData.searchObj.searchFields.forEach(item => {
          if (item.field === 'audit_user') {
            item.params = {audit_type: tab.name}
          }
        })
        var map = {
          '1': {cls: ['theme-color-G'], iconName: 'up'},
          '2': {cls: ['theme-color-G'], iconName: 'up'},
          '3': {cls: ['theme-color-F'], iconName: 'up'},
          '4': {cls: ['theme-color-E'], iconName: 'down'},
          '5': {cls: ['theme-color-E'], iconName: 'down'}
        }
        headerCols.forEach(item => {
          if (item.field === 'priority') {
            item.formatter = (row, column, getLabel) => {
              var {cls, iconName} = map[row[item.field].val]
              return h('div', {}, [
                h(BIcon, {props: {iconName: iconName}, class: cls}, null),
                h('span', {}, getLabel(row[column.property]))
              ])
            }
          }
          this.textMap[item.field] = item.label
        })
        if (tab.name === 'deposit_audit' || tab.name === 'withdraw_audit') {
          var otherList = ['audit_process_deposit_amount', 'audit_process_deposit_type', 'audit_process_deposit_account', 'audit_process_deposit_trade_system', 'audit_process_deposit_currency', 'audit_process_deposit_no']
          if (tab.name === 'withdraw_audit') {
            otherList = ['audit_process_withdraw_amount', 'audit_process_withdraw_type', 'audit_process_withdraw_account', 'audit_process_withdraw_trade_system', 'audit_process_withdraw_currency', 'audit_process_withdraw_no']
          }
          headerCols = headerCols.filter(item => {
            return !otherList.includes(item.auth)
          })
          headerCols.push({
            field: 'others',
            isGroup: true,
            fieldTextMap: this.textMap,
            label: this.renderData.other,
            formatter (row, col, getLabel) {
              var obj = row[col.property]
              var keys = Object.keys(obj)
              return h(popover, {}, [
                h(BIcon, {slot: 'reference', props: {iconName: 'more'}}, []),
                keys.map(key => h('div', {class: ['el-popover-item-intable']}, [
                  h('div', {class: ['left'], directives: [{name: 'ellipsis-title'}]}, _this.textMap[key]),
                  h('div', {class: ['right'], directives: [{name: 'ellipsis-title'}]}, obj[key])
                ]))
              ])
            }
          })
        }
        tableRenderData.listObj.headerCols = headerCols
        return tableRenderData
      },
      appendCustomizedAudit () {
        var params = {}
        return service.getCustomizedAudit(params).then(res => {
          this.auditTabs = this.defaultAuditTabs.concat(res.data)
          this.customizedAudits = res.data
        })
      },
      getAuditCount () {
        var params = {}
        return service.getAuditCount(params).then(res => {
          for (var key in res.data) {
            var val = res.data[key]
            this.$set(this.auditCount, key, val)
          }
        })
      },
      sortAudit () {
        this.visible.dialog = 'sort'
      },
      processTask () {
        var params = {
          task_id: this.currRow.task_id,
          audit_type: this.activeTab
        }
        service.processTask(params).then(res => {
          if (res.re === '200') {
            this.$refs[this.activeTab + '_table'][0].search()
            this.visible.page = 'CustomAuditPage'
          }
        })
      },
      toPage (params) {
        this.visible.page = params.toPage // z todo 告诉彬哥，如果当前用户与当前审核人不一致且审核处于进行中过的时候，调用该接口，跳转
      },
      getDotStatus (tabName) {
        var count = 0
        for (var sub in this.auditCount[tabName]) {
          count += parseInt(this.auditCount[tabName][sub])
        }
        return !!count
      },
      getTableParams (tab) {
        return {
          audit_type: tab.name
        }
      }
    },
    watch: {
      visible: {
        handler: function (val, oldVal) {
          if (!val.dialog) {
            this.$refs[this.activeTab + '_table'][0].search()
          }
        },
        deep: true
      },
      auditTabs () {
        if (this.auditTabs && this.auditTabs.length) {
          this.activeTab = this.auditTabs[0].name
        }
      }
    },
    components: {
      'audit_process_deposit_audit_task': AuditTask,
//      'audit_process_deposit_redo_task': AuditTask,
      'audit_process_deposit_audit_history': AuditHistory,
      'sort': SortAudits,
      'audit_process_deposit_priority_set': SetPriority,
      CustomAuditPage,
      CustomOperate,
      BButton,
      BIcon,
      BTitle,
      BSearchTable
    }
  }
</script>

<style lang="less">
  #auditProcess {
    overflow: auto;
    overflow-x: hidden;
    position: relative;

    /*border-style: solid;*/
    /*border-width: 1px;*/
    .oper-container {
      .el-col {
        .el-button {
          width: 100% !important;
        }
      }
      margin-bottom: 12px;
    }
    .el-tabs__header {
      .el-badge__content.is-fixed {
        right: 15px;
        top: 10px;
      }
      .el-icon-arrow-left:before, .el-icon-arrow-right:before {
        line-height: 42px;
      }
    }
    /*.tab-line {*/
    /*margin-top: 10px;*/
    /*margin-bottom: 10px;*/
    /*margin-left: 17px;*/
    /*.line:last-child {*/
    /*display: none;*/
    /*}*/
    /*.item {*/
    /*vertical-align: top;*/
    /*display: inline-block;*/
    /*line-height: 24px;*/
    /*}*/
    /*.line {*/
    /*height: 24px;*/
    /*vertical-align: top;*/
    /*display: inline-block;*/
    /*width: 1px;*/
    /*margin: 0 10px 0 20px;*/
    /*}*/
    /*}*/
  }
</style>
