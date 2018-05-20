<template lang="pug">
  .audit-history
    .oper-container.clear-float
      el-row(:gutter="10")
        el-col(:span="3", :offset='21')
          b-button(@click='back') {{renderData.back}}
    b-search-table(:optHandler='optHandler', :render-data="tableRenderData", url="/api/resource/audit_process/get_audit_history", :params="params")
</template>

<script>
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'

  export default {
    name: 'audit-history',
    data () {
<<<<<<< HEAD
      var tableRenderData = this.renderData
      tableRenderData.listObj = Object.assign({}, tableRenderData)
      tableRenderData.listObj.operateOpts = [{
        label: this.renderData.check,
=======
      var _this = this
      var tableRenderData = this.renderData
      tableRenderData.listObj = Object.assign({}, tableRenderData)
      tableRenderData.listObj.operateOpts = [{
        label: this.renderData.auditSee,
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        auth: 'check',
        check: {}
      }]
      tableRenderData.searchObj = Object.assign({}, tableRenderData)
      tableRenderData.searchObj.searchFields.forEach(item => {
        if (item.field === 'audit_user') {
          item.params = {
            audit_type: this.auditType
          }
        }
      })
      return {
        params: {
          task_id: this.currRow.task_id,
          audit_type: this.auditType
        },
        tableRenderData: tableRenderData,
        optHandler: {
<<<<<<< HEAD
          check () {
            console.log('check 查看')
            // z todo 查看， 跳转到和处理任务一样的页面
=======
          check (row) {
            _this.visible.page = 'CustomAuditPage'
            _this.$set(_this.currRow, 'origin', 'audit_history')
            _this.$set(_this.currRow, 'currHistory', row)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          }
        }
      }
    },
    methods: {
      back () {
        this.visible.page = null
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      },
      auditType: {
        type: String,
        required: true
      }
    },
    components: {
      BSearchTable,
      BButton
    }
  }
</script>

<style lang="less" scoped>
  .basic-info {
    margin-top: 20px;
    margin-bottom: 25px;
  }

  .b-table {
    width: 56%;
  }

  .footer {
    margin-top: 45px;
    margin-bottom: 40px;
    margin-left: 1.2%;
  }
</style>
