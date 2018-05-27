<template lang="pug">
  .template
    .left
      .table-container
        el-tabs(v-model="activeTab", type="card")
          el-tab-pane(:name="idx+''", v-for="(table, idx) in auditInfo.tables", :key="idx", :label="table.label")
            b-table(:renderData="getRenderData(table)", :url="table.url", :params="params")

    .right
      .info-group.theme-border-D(v-for="group in auditInfo.data", :key="group.key")
        .title {{group.label}}
        .info-item(v-for="item in group.dataSource", :key="item.key")
          | {{item.label + '  ' + item.value}}
      .title {{activeTabLabel}}
      custom-form(:model="tempForm", ref="tempForm", :formItemList="auditInfo.formItemList", :disabled="disabled", :renderData="renderData")
</template>

<script>
  import BFormItem from 'components/BFormItem'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BDocumentsViewer from 'components/BDocumentsViewer'
  import BTable from 'components/BTable'
  import CustomForm from './CustomForm'
//  import service from '../service'

  export default {
    name: 'table-template',
    data () {
//      var _this = this
      return {
        activeTab: '0',
        tempForm: {}
      }
    },
    methods: {
      getFormValue () {
        return this.tempForm
      },
      getRenderData (table) {
        table.more = this.renderData.more
        return table
      },
      validate (callback) {
        this.$refs['tempForm'].validate(callback)
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      renderData: {
        type: Object,
        required: true
      },
      params: {
        type: Object,
        required: true
      },
      auditInfo: {
        type: Object,
        required: true
      },
      auditType: {
        type: String,
        required: true
      },
      activeTabLabel: {
        type: String,
        required: true
      }
    },
    mounted () {
    },
    components: {
      CustomForm,
      BFormItem,
      BSelect,
      BDocumentsViewer,
      BTable,
      BInput
    }
  }
</script>


<style lang="less", scoped>
  .template {
    .left {
      width: 64%;
      overflow: auto;
      display: flex;
      flex-direction: column;
      .table-container {
        min-width: 750px;
        flex-grow: 1;
        overflow: auto;
      }
    }
    .right{
      width: 32%;
      overflow: auto;
      margin-left: 2%;
      margin-right: 2%;
      .info-group {
        border-bottom: 1px solid;
        .title {
          font-weight: bold;
          margin: 20px 0;
        }
        .info-item {
          white-space: pre;
          line-height: 20px;
        }
        padding-bottom: 20px;
      }
      .info-group:last-child{
        border-bottom-width: 0;
      }
      .title {
        margin: 20px 0;
        font-weight: bold;
        font-size: 18px;
      }
    }
  }
</style>
