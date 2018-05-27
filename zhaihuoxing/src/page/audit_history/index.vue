<template lang="pug">
  .audit_history.audit-history-component.theme-border-lightenD12.component#auditHistory
    b-title(:title="pageTitle")
    template(v-if="!visible.page")
      .oper-container.clear-float
        el-row(:gutter="10")
          el-col(:span="3", :offset='21')
            b-button(@click='sortAudit') {{renderData.order}}
      el-tabs(v-model="activeTab", type="card")
        el-tab-pane(v-for='tab in auditTabs', :name="tab.name", :key="tab.name", :label="tab.label")
          b-search-table(:ref="tab.name + '_table'", :optHandler='optHandler', :render-data="getTableRenderData(tab)", :opts-filter="optsFilter",
          :url="tableUrl", :params="getTableParams(tab)", v-if="activeTab===tab.name", :tableType="tableType", :getRowClass="getRowClass")
            template(slot="expand", slot-scope="props")
              div.expand-row(v-for="(item, index) in props.row.history", :key='index')
                td
                td(v-for="col in props.computedHeaderCols", :key='col.field')
                  .cell
                    .show-ellipsis(v-text='getLabel(item[col.field])' v-ellipsis-title='')
                td(v-if="props.otherCols.length")
                  .cell.top-padding
                    el-popover.theme-border-lightenD12.theme-color-H(trigger="click" placement="bottom" ref="popoverMore")
                      .el-popover-item-intable(v-for="(col, idx) in props.otherCols", :key="idx")
                        template(v-if="!col.isGroup")
                          .left(v-text='col.label' v-ellipsis-title="")
                          .right(v-text='getLabel(props.row[col.field])' v-ellipsis-title="")
                        template(v-else)
                          .title.theme-color-D {{col.label}}
                          .line-item(v-for="(item, key) in props.row[col.field]", :key="key")
                            .left(v-text='col.fieldTextMap[key]' v-ellipsis-title="")
                            .right(v-text='getLabel(item)' v-ellipsis-title="")
                      b-icon.pointer.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="more", slot="reference")
                td.text-center(v-if="props.operateOpts.length")
                  .cell
                    a.show-ellipsis.link.theme-color-A.pointer(v-if="getCheckPermit(props.operateOpts)", @click="check(item, props.operateOpts)") {{getCheckPermit(props.operateOpts).label}}

    component(:is="visible.page", :render-data="modalRenderData", :visible="visible", :curr-row="currRow", :auditType="activeTab", :activeTabLabel="activeTabLabel")

    component(:is="visible.dialog", :render-data="modalRenderData", :curr-row="currRow", :visible="visible", :auditType="activeTab", :auditList="customizedAudits", :activeTabLabel="activeTabLabel" origin="audit_history")

</template>

<script>
  import { Popover } from 'element-ui'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BSearchTable from 'components/BSearchTable'
  import SorAudits from 'page/audit_process/module/sortAudits'
  import SetPriority from 'page/audit_process/module/setPriority'
  import CustomAuditPage from 'page/audit_process/module/CustomAuditPage'
  import CustomOperate from 'page/audit_process/module/CustomOperate'
  import service from './service'
  import commonMixin from 'common/js/commonMixin'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'audit_history',
    mixins: [commonMixin, componentMixin],
    data () {
      var auditHistory = window.renderData.components.audit_history
      var renderData = Object.assign({}, auditHistory, auditHistory.audit_history_auth)
      var depositTable = Object.assign({}, auditHistory.audit_history_auth)
      depositTable.listObj = auditHistory.audit_history_list_deposit_audit
      depositTable.searchObj = auditHistory.audit_history_search_deposit_audit
      var withdrawTable = Object.assign({}, auditHistory.audit_history_auth)
      withdrawTable.listObj = auditHistory.audit_history_list_withdraw_audit
      withdrawTable.searchObj = auditHistory.audit_history_search_withdraw_audit
      var customTable = Object.assign({}, auditHistory.audit_history_auth)
      customTable.listObj = renderData.audit_history_list_custom_audit
      customTable.searchObj = renderData.audit_history_search_custom_audit
      var _this = this
      var optHandler = {
        audit_history_list_deposit_see_more (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.page = 'CustomAuditPage'
          _this.$set(_this.currRow, 'origin', 'audit_history_component')
          _this.$set(_this.currRow, 'currHistory', row)
        },
        audit_history_list_deposit_priority_set (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.dialog = 'audit_history_list_deposit_priority_set'
        }
      }
      optHandler.audit_history_list_withdraw_see_more = optHandler.audit_history_list_deposit_see_more
      optHandler.audit_history_list_withdraw_priority_set = optHandler.audit_history_list_deposit_priority_set
      optHandler.audit_history_custom_see_more = optHandler.audit_history_list_deposit_see_more
      optHandler.audit_history_custom_priority_set = optHandler.audit_history_list_deposit_priority_set
      var auditTabs = []
      if (renderData.audit_history_list_withdraw_audit) {
        auditTabs.push({
          label: renderData.audit_history_list_withdraw_audit.withdrawAudit,
          name: 'withdraw_audit'
        })
      }
      if (renderData.audit_history_list_deposit_audit) {
        auditTabs.push({
          label: renderData.audit_history_list_deposit_audit.depositAudit,
          name: 'deposit_audit'
        })
      }
      return {
        tableType: {
          expand: true
        },
        visible: {
          dialog: null,
          page: null
        },
        fieldTextMap: {
          order_ref: '',
          trade_system: '',
          account: '',
          method: '',
          amount: ''
        },
        activeTab: null,
        params: {},
        customizedAudits: [],
        tableUrl: '/api/resource/audit_history/get_audit_list',
        auditTabs: auditTabs,
        depositTable: depositTable,
        withdrawTable: withdrawTable,
        customTable: customTable,
        renderData: renderData,
        modalRenderData: renderData,
        currRow: {},
        optHandler: optHandler
      }
    },
    async mounted () {
      await this.appendCustomizedAudit()
    },
    computed: {
      activeTabLabel () {
        var currTab = this.auditTabs.find(tab => tab.name === this.activeTab) || {}
        return currTab.label
      },
      pageTitle () {
        if (!this.visible.page) {
          return this.renderData.auditHistory
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
      check (row, allPermits) {
        var renderData = Object.assign({}, this.renderData, this.getCheckPermit(allPermits))
        this.optHandler.audit_history_list_deposit_see_more(row, renderData)
      },
      getCheckPermit (allPermits) {
        return allPermits.find(permit => ['audit_history_list_withdraw_see_more', 'audit_history_list_deposit_see_more', 'audit_history_custom_see_more'].includes(permit.auth)) || ''
      },
      optsFilter (handlers, currRow) {
        return handlers.filter(opt => !['audit_history_list_withdraw_see_more', 'audit_history_list_deposit_see_more', 'audit_history_custom_see_more'].includes(opt.auth))
      },
      getLabel (field) {
        return (field && field.label) || field
      },
      getTableRenderData (tab) {
        var tableRenderData = tab.name === 'deposit_audit' ? this.depositTable : (tab.name === 'withdraw_audit' ? this.withdrawTable : this.customTable)
        var h = this.$createElement
        var _this = this
        var popover = Popover
        tableRenderData = JSON.parse(JSON.stringify(tableRenderData))
        // 用_headerCols而不是headerCols, 因为配置中心生成权限
        tableRenderData.listObj.headerCols = tableRenderData.listObj.headerCols || tableRenderData.listObj._headerCols
        tableRenderData.listObj.operateOpts = tableRenderData.listObj.operateOpts || tableRenderData.listObj._operateOpts
        tableRenderData.searchObj.searchFields = tableRenderData.searchObj.searchFields || tableRenderData.searchObj._searchFields
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
          this.fieldTextMap[item.field] = item.label
        })
        if (tab.name === 'deposit_audit' || tab.name === 'withdraw_audit') {
          var otherList = ['audit_history_list_deposit_amount', 'audit_history_list_deposit_type', 'audit_history_list_deposit_account', 'audit_history_list_deposit_trade_system', 'audit_history_list_deposit_currency', 'audit_history_list_deposit_no']
          if (tab.name === 'withdraw_audit') {
            otherList = ['audit_history_list_withdraw_amount', 'audit_history_list_withdraw_type', 'audit_history_list_withdraw_account', 'audit_history_list_withdraw_trade_system', 'audit_history_list_withdraw_currency', 'audit_history_list_withdraw_no']
          }
          headerCols = headerCols.filter(item => !otherList.includes(item.auth))
          headerCols.push({
            field: 'others',
            isGroup: true,
            label: this.renderData.other,
            fieldTextMap: this.fieldTextMap,
            formatter (row, col, getLabel) {
              var obj = row[col.property]
              return h(popover, {}, [
                h(BIcon, {slot: 'reference', props: {iconName: 'more'}}, []),
                Object.keys(obj).map(key => h('div', {class: ['el-popover-item-intable']}, [
                  h('div', {class: ['left'], directives: [{name: 'ellipsis-title'}]}, _this.fieldTextMap[key]),
                  h('div', {class: ['right'], directives: [{name: 'ellipsis-title'}]}, obj[key])
                ]))
              ])
            }
          })
        }
        tableRenderData.listObj.headerCols = headerCols
        console.log('tableRenderData', tableRenderData, tableRenderData.listObj.headerCols.length)
        return tableRenderData
      },
      appendCustomizedAudit () {
        var params = {}
        return service.getCustomizedAudit(params).then(res => {
          this.auditTabs = this.auditTabs.concat(res.data)
          this.customizedAudits = res.data
          console.log('appendCustomizedAudit', this.auditTabs)
        })
      },
      sortAudit () {
        this.visible.dialog = 'SorAudits'
      },
      getTableParams (tab) {
        return {
          audit_type: tab.name
        }
      },
      getRowClass ({row, rowIndex}) {
        return row.history && row.history.length ? '' : 'hide-expand'
      }
    },
    watch: {
      visible: {
        handler: function (val, oldVal) {
          console.log('refresh', val, oldVal)
          if (!val.dialog) {
            this.$refs[this.activeTab + '_table'][0].search()
          }
        },
        deep: true
      },
      auditTabs () {
        if (this.auditTabs && this.auditTabs.length) {
          console.log('auditTabs')
          this.activeTab = this.auditTabs[0].name
        }
      }
    },
    components: {
      BButton,
      BIcon,
      BTitle,
      CustomAuditPage,
      CustomOperate,
      'audit_history_list_deposit_priority_set': SetPriority,
      SorAudits,
      BSearchTable
    }
  }
</script>

<style lang="less">
  #auditHistory {
    overflow: auto;
    overflow-x: hidden;
    position: relative;
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
    .expand-row {
      display: flex;
      display: -webkit-flex;
      margin-top: -1px;
      .icon-top {
        margin-top: 10px;
      }
      .top-padding {
        padding-top: 12px;
      }
      .show-ellipsis {
        width: 100%;
      }
      .text-center {
        text-align: center;
      }
      > td:first-child {
        box-sizing: border-box;
        width: 49px;
        border-bottom: none;
      }
      > td:not(:first-child) {
        box-sizing: border-box;
        flex: 1;
        border-bottom: none;
      }
      > td {
        > .cell {
          height: 40px;
          line-height: 40px;
          .more-icon {
            display: inline-block;
            margin-top: 12px;
          }
        }
      }
    }
  }
</style>
