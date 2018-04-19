<template lang="pug">
  .trade_history.theme-border-lightenD12.component#trade_history
    .kongdiv1
      b-title.amt-more-left-in(:title="renderData.tradeHistory")

    .amt-more-left-in
      b-search-table(:render-data="tableRenderData", url="/api/resource/records/get_trade_records_list", ref="table", :initSearch="initSearch" v-if="initSearch.server_id!==null")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import service from './service'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'trade_history',
    mixins: [componentMixin],
    data () {
      var tradeHistory = window.renderData.components.trade_history
      var renderData = Object.assign({}, tradeHistory.trade_history_auth)
      var tableRenderData = Object.assign({}, tradeHistory.trade_history_auth)
      tableRenderData.searchObj = tradeHistory.trade_history_search_resource
      tableRenderData.listObj = tradeHistory.trade_history_list_resource
      tableRenderData.searchObj.searchFields.unshift({
        'type': 'select',
        'field': 'server_id',
        'placeholder': tableRenderData.searchObj.tradeHistorySearchServerId,
        'width': 6,
//        'valueField': 'val',
        'initField': 'abled',
        'dataSource': '/api/resource/records/get_mt4_channel_select'
      })
      return {
        renderData: renderData,
        tableRenderData: tableRenderData,
        initSearch: {
          mt4_id: '',
          server_id: null         // 直接进入该页面时,需要异步获取默认值
        }
      }
    },
    created () {
      let vm = this
      if (sessionStorage.getItem('trade_history_id') !== null) {
        vm.initSearch.mt4_id = sessionStorage.getItem('trade_history_id').toString()
      }
      if (sessionStorage.getItem('server_id') !== null) {
        vm.initSearch.server_id = sessionStorage.getItem('server_id').toString()
      } else {
        service.getMt4ChannelSelect({}).then(resp => {
          resp.data.forEach(function (val) {
            if (val.abled) {
              vm.initSearch.server_id = val.key
            }
          })
        })
      }
    },
    mounted () {
      // 点击浏览器刷新，清除session（需求）
      window.onbeforeunload = function () {
        sessionStorage.removeItem('trade_history_id')
      }
    },
    components: {
      BTitle,
      BSearchTable
    }
  }
</script>

<style lang="less">
  .trade_history {
  }
</style>
