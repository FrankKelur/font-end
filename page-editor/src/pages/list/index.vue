<template lang="pug">
  .list
    .oper-container.clear-float
      el-row(:gutter="10")
        el-col(:span="3", :offset='21')
          b-button(@click='add') {{renderData.add}}
    b-search-table(:optHandler='optHandler', :render-data="table", :url="tableUrl", ref="table")

</template>

<script>
  import service from './service'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import renderData from './lang'

  export default {
    name: 'list',
    data () {
      return {
        renderData: renderData,
        tableUrl: this.$router.currentRoute.query.page,
        visible: {
          dialog: null,
          page: null
        },
        table: renderData,
        optHandler: {
          edit: {
            label: '编辑',
            handler: this.edit
          },
          detail: {
            label: '详情',
            handler: this.detail
          },
          delete: {
            label: '删除',
            handler: this.delete
          }
        }
      }
    },
    computed: {},
    methods: {
      add () {
        this.visible.dialog = 'add'
      },
      edit (row) {
        this.visible.dialog = 'edit'
      },
      detail (row) {
        this.visible.dialog = 'detail'
      },
      delete (row) {
        service.delete(row).then()
      }
    },
    components: {
      BButton,
      BSearchTable
    },
    mounted () {
      console.log('log', this.$router.page)
      service.getTableConfig(this.tableUrl).then(res => {
        this.table.searchObj.searchFields = res.searchFields
        this.table.listObj.headerCols = res.headerCols
        this.$refs['table'].search()
      })
    },
    watch: {
      'visible.dialog': function (newVal) {
        console.log('visible.dialog change')
        !newVal && this.$refs['table'].search()
      },
      'page' () {
        console.log('currentRoute.dialog change')
      }
    }
  }
</script>

<style lang="less">
  .oper-container {
    .el-col {
      .el-button {
        width: 100% !important;
      }
    }
    margin-bottom: 12px;
  }
</style>
