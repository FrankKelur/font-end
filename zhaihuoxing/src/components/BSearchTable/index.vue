<template lang="pug">
  .b-search-table
    .search-container
      b-search-form(:search-fields="renderData.searchObj.searchFields", :search-data="searchData", :params="params", @search='search', @reset='reset', :render-data="searchRenderData")
    .table.form-area
<<<<<<< HEAD
      b-table(:search-data="searchData", :render-data="tableRenderData", ref="table", :url="url", :params="params", :opt-handler="optHandler",
      :opts-filter="optsFilter", :tableType="tableType", :selectedRows="selectedRows", @selection-change="selectionChange", :valueKey="valueKey", :getRowClass="getRowClass")
        template(slot="batchOperate", slot-scope="props")
          slot(name="batchOperate", :total="props.total")
        template(slot="expand", slot-scope="props")
          slot(name="expand", :row="props.row", :otherCols="props.otherCols", :computedOpts="props.computedOpts", :computedHeaderCols="props.computedHeaderCols")
=======
      b-table.theme-bg-H(:search-data="searchData", :render-data="tableRenderData", ref="table", :url="url", :params="params", :opt-handler="optHandler", :initSearch="initSearch",
      :opts-filter="optsFilter", :tableType="tableType", :selectedRows="selectedRows", @selection-change="selectionChange", :valueKey="valueKey", :getRowClass="getRowClass", :uid="uid")
        template(slot="batchOperate", slot-scope="props")
          slot(name="batchOperate", :total="props.total")
        template(slot="expand", slot-scope="props")
          slot(name="expand", :row="props.row", :otherCols="props.otherCols", :computedOpts="props.computedOpts", :computedHeaderCols="props.computedHeaderCols", :operateOpts="props.operateOpts")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    .clear
</template>

<script>
  import BSearchForm from 'components/BSearchForm'
  import BTable from 'components/BTable'

  export default {
    name: 'b-search-table',
    data () {
      console.log('this.renderData.listObj', this.renderData.listObj)
//      if (this.renderData.searchObj._searchFields) {
//        this.renderData.searchObj.searchFields = this.renderData.searchObj._searchFields
//      }
//      if (this.renderData.listObj._headerCols) {
//        this.renderData.listObj.headerCols = this.renderData.listObj._headerCols
//      }
//      if (this.renderData.listObj._operateOpts) {
//        this.renderData.listObj.operateOpts = this.renderData.listObj._operateOpts
//      }
      return {
        currRow: {},
        searchRenderData: this.renderData.searchObj,
        tableRenderData: Object.assign({}, this.renderData, this.renderData.listObj),
        searchData: {}
      }
    },
    props: {
<<<<<<< HEAD
=======
      uid: {
        type: String
      },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      params: {
        type: Object,
        default: function () {
          return {}
        }
      },
      getRowClass: {
        type: Function
      },
      selectedRows: {
        type: Array
      },
      url: {
        type: String,
        required: true
      },
      valueKey: {
        type: String
      },
      optsFilter: {
        type: Function
      },
      optHandler: {
        type: Object
      },
      renderData: {
        type: Object,
        required: true
      },
      tableType: {
        type: Object
<<<<<<< HEAD
=======
      },
      initSearch: {
        type: Object
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      selectionChange () {
        this.$emit('selection-change', ...arguments)
      },
      search () {
<<<<<<< HEAD
        console.log('changeHandle ', this.searchData)
=======
        console.log('searchData ', this.searchData)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        this.$refs.table.search()
      },
      reset () {
        console.log('reset')
        for (var key in this.searchData) {
          this.searchData[key] = ''
        }
<<<<<<< HEAD
=======
        for (var o in this.initSearch) {
          this.initSearch[o] = ''
        }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    components: {
      BTable,
      BSearchForm
    }
  }
</script>

<style lang="less">
  .pagination {
    margin-top: 20px;
    margin-bottom: 50px;
  }
<<<<<<< HEAD
=======
  .el-table--fit {
    border-left: 1px solid;
  }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
</style>
