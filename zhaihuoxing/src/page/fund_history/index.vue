<template lang="pug">
  .fund_history.theme-border-lightenD12.component#fund_history
    b-title.amt-more-left-in(:title="renderData.fund_history_auth.fund_history")
    .amt-more-left-in
      el-tabs(v-model="whichTab" type="card", @tab-click="tabClick")
        el-tab-pane(:label="renderData.fund_history_deposit_list.fundHistoryDeposit" name="fundHistoryDeposit")
          b-search-table(:render-data="getDepositTableRenderData()", url="/api/resource/funding/get_deposit_list", ref="table", :tableType="tableType"  v-if="tabSelectArr.indexOf('fundHistoryDeposit') !== -1")
        el-tab-pane(:label="renderData.fund_history_withdrawal_list.fundHistoryWithdrawal" name="fundHistoryWithdrawal")
          b-search-table(:render-data="getWithdrawalTableRenderData()", url="/api/resource/funding/get_withdrawal_list", ref="table", :tableType="tableType", :optHandler='optHandler' v-if="tabSelectArr.indexOf('fundHistoryWithdrawal') !== -1")
        el-tab-pane(:label="renderData.fund_history_transfer_list.fundHistoryTransfer" name="fundHistoryTransfer")
          b-search-table(:render-data="getTransferTableRenderData()", url="/api/resource/funding/get_fund_history_transfer_list", ref="table", :tableType="tableType", :optHandler='optHandler1' v-if="tabSelectArr.indexOf('fundHistoryTransfer') !== -1")
</template>

<script>
  import BTitle from 'components/BTitle'
  import BIcon from 'components/BIcon'
  import { Popover } from 'element-ui'
  import BSearchTable from 'components/BSearchTable'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'

  export default {
    name: 'fund_history',
    mixins: [componentMixin],
    data () {
      var renderData = window.renderData.components.fund_history
      var tableRenderData1 = Object.assign({}, renderData.fund_history_auth)
      tableRenderData1.searchObj = renderData.fund_history_deposit_search
      tableRenderData1.listObj = renderData.fund_history_deposit_list
      var tableRenderData2 = Object.assign({}, renderData.fund_history_auth)
      tableRenderData2.searchObj = renderData.fund_history_withdrawal_search
      tableRenderData2.listObj = renderData.fund_history_withdrawal_list
      var tableRenderData3 = Object.assign({}, renderData.fund_history_auth)
      tableRenderData3.searchObj = renderData.fund_history_transfer_search
      tableRenderData3.listObj = renderData.fund_history_transfer_list
      var _this = this
      var optHandler = {
        fund_history_withdrawal_list_cancel (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.cancle()
        }
      }
      var optHandler1 = {
        fund_history_transfer_list_cancel (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
        }
      }
      return {
        whichTab: 'fundHistoryDeposit',
        tabSelectArr: ['fundHistoryDeposit'],
        visible: {
          dialog: null,
          page: null
        },
        textMap: {
          bank_name: ''
        },
        fieldTextMap: {},
        TextMap: {},
        renderData: renderData,
        tableRenderData1: tableRenderData1,
        tableRenderData2: tableRenderData2,
        tableRenderData3: tableRenderData3,
        tableType: {
          expand: false
        },
        modalRenderData: renderData,
        currRow: {},
        optHandler: optHandler,
        optHandler1: optHandler1
      }
    },
    computed: {},
    methods: {
      tabClick (tab, event) {
        if (this.tabSelectArr.indexOf(tab.name) === -1) {
          this.tabSelectArr.push(tab.name)
        }
      },
      getDepositTableRenderData () {
        var tableRenderData = null
        tableRenderData = this.tableRenderData1
        var h = this.$createElement
        var _this = this
        var popover = Popover
        tableRenderData = JSON.parse(JSON.stringify(tableRenderData))
        var headerCols = tableRenderData.listObj.headerCols
        var otherList = ['fund_history_deposit_list_bank_name']
        headerCols = headerCols.filter(item => {
          return !otherList.includes(item.auth)
        })
        headerCols.forEach(item => {
          _this.textMap[item.field] = item.label
        })
        headerCols.push({
          field: 'others',
          isGroup: true,
          fieldTextMap: _this.textMap,
          label: this.renderData.fund_history_deposit_list.other,
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
        tableRenderData.listObj.headerCols = headerCols
        return tableRenderData
      },
      getWithdrawalTableRenderData () {
        var tableRenderData = null
        tableRenderData = this.tableRenderData2
        var h = this.$createElement
        var _this = this
        var popover = Popover
        tableRenderData = JSON.parse(JSON.stringify(tableRenderData))
        var headerCols = tableRenderData.listObj.headerCols
        var otherList = ['fund_history_withdrawal_list_name', 'fund_history_withdrawal_list_card_no', 'fund_history_withdrawal_list_bank_name', 'fund_history_withdrawal_list_bank_branch', 'fund_history_withdrawal_list_bank_province', 'fund_history_withdrawal_list_bank_city', 'fund_history_withdrawal_list_internation_account', 'fund_history_withdrawal_list_bank_address', 'fund_history_withdrawal_list_swift_code', 'fund_history_withdrawal_list_phone_no', 'fund_history_withdrawal_list_email', 'fund_history_withdrawal_list_address', 'fund_history_withdrawal_list_message']
        headerCols.forEach(item => {
          _this.fieldTextMap[item.field] = item.label
        })
        headerCols = headerCols.filter(item => {
          return !otherList.includes(item.auth)
        })
        console.log('_this.fieldTextMap')
        console.log(headerCols)
        headerCols.push({
          field: 'others',
          isGroup: true,
          fieldTextMap: this.fieldTextMap,
          label: this.renderData.fund_history_withdrawal_list.other,
          formatter (row, col, getLabel) {
            var obj = row[col.property]
            var keys = Object.keys(obj)
            return h(popover, {}, [
              h(BIcon, {slot: 'reference', props: {iconName: 'more'}}, []),
              keys.map(key => h('div', {class: ['el-popover-item-intable']}, [
                h('div', {class: ['left'], directives: [{name: 'ellipsis-title'}]}, _this.fieldTextMap[key]),
                h('div', {class: ['right'], directives: [{name: 'ellipsis-title'}]}, obj[key])
              ]))
            ])
          }
        })
        headerCols.push({
          field: 'custom',
          isGroup: true,
          fieldTextMap: this.fieldTextMap,
          label: this.renderData.fund_history_withdrawal_list.custom,
          formatter (row, col, getLabel) {
            var obj = row[col.property]
            var keys = Object.keys(obj)
            return h(popover, {}, [
              h(BIcon, {slot: 'reference', props: {iconName: 'more'}}, []),
              keys.map(key => h('div', {class: ['el-popover-item-intable']}, [
                h('div', {class: ['left'], directives: [{name: 'ellipsis-title'}]}, key),
                h('div', {class: ['right'], directives: [{name: 'ellipsis-title'}]}, obj[key])
              ]))
            ])
          }
        })
        tableRenderData.listObj.headerCols = headerCols
        return tableRenderData
      },
      getTransferTableRenderData () {
        var tableRenderData = null
        tableRenderData = this.tableRenderData3
        var h = this.$createElement
        var _this = this
        var popover = Popover
        tableRenderData = JSON.parse(JSON.stringify(tableRenderData))
        var headerCols = tableRenderData.listObj.headerCols
        headerCols.forEach(item => {
          _this.TextMap[item.field] = item.label
        })
        headerCols.push({
          field: 'other',
          isGroup: true,
          fieldTextMap: this.TextMap,
          label: this.renderData.fund_history_transfer_list.other,
          formatter (row, col, getLabel) {
            var obj = row[col.property]
            var keys = Object.keys(obj)
            return h(popover, {}, [
              h(BIcon, {slot: 'reference', props: {iconName: 'more'}}, []),
              keys.map(key => h('div', {class: ['el-popover-item-intable']}, [
                h('div', {class: ['left'], directives: [{name: 'ellipsis-title'}]}, key),
                h('div', {class: ['right'], directives: [{name: 'ellipsis-title'}]}, obj[key])
              ]))
            ])
          }
        })
        tableRenderData.listObj.headerCols = headerCols
        return tableRenderData
      },
      cancle () {
        let _this = this
        if (_this.currRow.status.key === '2') {
          var pamars = {
            action_id: _this.currRow.action_id
          }
          service.cancelWithdrawal(pamars).then(data => {
            _this.currRow.status.key = data.key
            _this.currRow.status.label = data.label
          })
        }
      }
    },
    components: {
      BTitle,
      BIcon,
      BSearchTable
    },
    watch: {},
    mounted () {
      console.log('renderData')
      console.log(this.renderData)
      console.log('tableRenderData1')
      console.log(this.tableRenderData1)
      console.log('tableRenderData2')
      console.log(this.tableRenderData2)
      console.log('tableRenderData3')
      console.log(this.tableRenderData3)
    }
  }
</script>

<style lang="less">
  #fund_history {
    position: relative;
    .expand-row {
      display: flex;
      display: -webkit-flex;
      margin-top: -1px;
      .icon-top {
        margin-top: 10px;
      }
      .show-eplice {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inherit;
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
