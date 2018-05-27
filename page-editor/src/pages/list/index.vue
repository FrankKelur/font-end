<template lang="pug">
  .list
    .oper-container.clear-float
      el-row(:gutter="10")
        el-col(:span="3", :offset='18')
          b-button(@click='add' type="primary") {{renderData.add}}
        el-col(:span="3")
          b-button(@click='editConfig' type="secondary") {{renderData.editConfig}}
    b-search-table(:optHandler='optHandler', :render-data="table", :url="page", ref="table")

    component(:is="visible.dialog", :currRow="currRow", :renderData="renderData", :visible="visible", :formItemList="formItemList", @refresh="refresh")
</template>

<script>
  import service from './service'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import renderData from './lang'
  import edit from './modules/edit'

  export default {
    name: 'list',
    data () {
      // z todo 可以增加两个默认字段，创建时间，编辑时间
      // z todo 可以做报表
      // z todo 可以兼容手机端
      return {
        renderData: renderData,
        formItemList: [],
        currRow: {},
        page: this.$router.currentRoute.query.page,
        visible: {
          dialog: null,
          page: null
        },
        table: renderData,
        optHandler: {
          edit: this.edit,
          detail: this.detail,
          delete: this.delete
        }
      }
    },
    computed: {},
    methods: {
      editConfig () {
        this.$router.push({path: `/admin/editor?page=${this.page}`})
      },
      refresh () {
        this.$refs['table'].search()
      },
      add () {
        this.visible.dialog = 'add'
      },
      edit (row) {
        this.currRow = row
        this.visible.dialog = 'edit'
      },
      detail (row) {
        this.currRow = row
        this.visible.dialog = 'detail'
      },
      delete (row) {
        this.currRow = row
        service.delete(row, this.page).then(res => {
          this.$message({type: 'success', message: this.renderData.operateSuccess})
          this.refresh()
        })
      }
    },
    components: {
      BButton,
      'add': edit,
      'detail': edit,
      'edit': edit,
      BSearchTable
    },
    mounted () {
      console.log('log', this.$router.page)
      service.getTableConfig(this.page).then(res => {
        this.table.searchObj.searchFields = res.searchFields
        this.table.listObj.headerCols = res.headerCols
        this.formItemList = res.formItemList
        this.$refs['table'].search()
      })
    },
    watch: {
      'visible.dialog' (newVal) {
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
