<template lang="pug">
  .operation_records.theme-border-lightenD12.component#operation_records
    .kongdiv1
      b-title.amt-more-left-in(:title="pageTitle")
    .amt-more-left-in
      el-tabs(v-model="whichTab" type="card")
        el-tab-pane(:label="renderData.resourceModification" name="sourceMod")
          b-search-table(:render-data="tableRenderData", url="/api/resource/records/get_oss_record_list", ref="table", :tableType="tableType", :getRowClass="getRowClass")
            template(slot="expand", slot-scope="props")
              div.expand-row(v-for="(item, index) in props.row.brother", :key='index')
                td
                td(v-for="col in props.computedHeaderCols", :key='col.field')
                  div.cell.show-eplice(v-text='getLabel(item[col.field]).toString()' v-ellipsis-title='getLabel(item[col.field])')
        el-tab-pane(:label="renderData.settingModification" name="settingMod")
          | {{renderData.settingModification}}
</template>

<script>
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'operation_records',
    mixins: [componentMixin],
    data () {
      var operationRecords = window.renderData.components.operation_records
      var renderData = Object.assign({}, operationRecords.operation_records_auth)
      var tableRenderData = Object.assign({}, operationRecords.operation_records_auth)
      tableRenderData.searchObj = operationRecords.operation_records_search_resource
      tableRenderData.listObj = operationRecords.operation_records_list_resource
      return {
        visible: {
          dialog: null,
          page: null
        },
        renderData: renderData,
        tableRenderData: tableRenderData,
        tableType: {
          expand: true
        },
        whichTab: 'sourceMod'
      }
    },
    computed: {
      pageTitle () {
        if (this.visible.page === null) {
          return this.renderData.opeationRecords
        }
      }
    },
    methods: {
      getLabel (field) {
        return field.label || field
      },
      getRowClass ({row, rowIndex}) {
        return row.brother && row.brother.length ? '' : 'hide-expand'
      }
    },
    components: {
      BTitle,
      BSearchTable
    },
    watch: {},
    mounted () {
      console.log('renderData')
      console.log(this.renderData)
      console.log('tableRenderData')
      console.log(this.tableRenderData)
    }
  }
</script>

<style lang="less">
  @import '../../common/styleSheet/variable.less';

  .operation_records {
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
