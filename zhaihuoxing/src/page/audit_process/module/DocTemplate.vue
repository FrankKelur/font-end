<template lang="pug">
  .template
    .left
      .document-container
        b-documents-viewer(:fileList="auditInfo.audit_file", @select-file="selectFile", :renderData="renderData")
      .operation-footer
        el-form(:model="currFile", :rules="fileFormRules", ref="fileForm", :inline="true", label-width="140px", label-position="left")
          .file-type
            span {{renderData.fileType}}
            span {{currFile.file_type}}
          el-form-item(prop="file_status")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.fileStatus", v-ellipsis-title="")
            b-select(:model.sync="currFile.file_status", :placeholder="renderData.pleaseSelect", :disabled="disabled")
              el-option(v-for="status in currFile.status_data_source", :key="status.key", :value="status.key", :label="status.label")
          el-form-item(prop="remarks")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.remarks", v-ellipsis-title="")
            b-input(:model.sync="currFile.file_remarks", :placeholder="renderData.pleaseEnter", :disabled="disabled")
    .right
      .info-group.theme-border-D(v-for="group in auditInfo.data", :key="group.key")
        .title {{group.label}}
        .info-item(v-for="item in group.dataSource", :key="item.key")
          | {{item.label + '  ' + item.value}}
      .title {{activeTabLabel}}
      custom-form(:model="tempForm", ref="tempForm", :formItemList="auditInfo.formItemList", :disabled="disabled", :renderData="renderData")
</template>

<script>
  import CustomForm from './CustomForm'
  import BFormItem from 'components/BFormItem'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BDocumentsViewer from 'components/BDocumentsViewer'

  export default {
    name: 'doc-template',
    data () {
      var _this = this
      return {
        tempForm: {},
        currFile: {
          file_type: '',
          file_status: '',
          file_remarks: '',
          dataSource: []
        },
        fileFormRules: {
          file_status: [
            {
              required: true,
              trigger: 'blur, change',
              message: _this.renderData.pleaseSelect
            }
          ]
        }
      }
    },
    methods: {
      selectFile (file) {
        this.currFile = file
      },
      getFormValue () {
        return this.tempForm
      },
      validate (callback) {
        var res = true
        this.$refs['fileForm'].validate(valid => { res = res && valid })
        this.$refs['tempForm'].validate(valid => { res = res && valid })
        callback(res)
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
      BInput
    }
  }
</script>


<style lang="less" , scoped>
  .template {
    .left {
      width: 64%;
      display: flex;
      flex-direction: column;
      .document-container {
        flex-grow: 1;
        overflow: auto;
      }
      .operation-footer {
        line-height: 36px;
        .file-type {
          span:nth-child(1) {
            display: inline-block;
            width: 80px;
          }
        }
      }
    }
    .right {
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
      .info-group:last-child {
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
