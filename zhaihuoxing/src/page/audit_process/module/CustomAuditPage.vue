<template lang="pug">
  .custom-audit-page
    text-template.top(:auditInfo="auditInfo", :auditType="auditType", :activeTabLabel="activeTabLabel", :renderData="renderData", v-if="auditInfo.template == '0'", ref="template", :disabled="disabled")
    doc-template.top(:auditInfo="auditInfo", :auditType="auditType",  :activeTabLabel="activeTabLabel", :renderData="renderData", v-else-if="auditInfo.template == '1'", ref="template", :disabled="disabled")
    table-template.top(:auditInfo="auditInfo", :auditType="auditType",  :activeTabLabel="activeTabLabel", :renderData="renderData", v-else-if="auditInfo.template == '2'", ref="template", :disabled="disabled", :params="params")
    .footer.el-form-item.is-required
      label.el-form-item__label {{renderData.auditResult}}
      b-select(:model.sync="auditInfo.result.value.audit_result", :placeholder="renderData.pleaseSelect", valueKey="key" , :disabled="disabled")
        el-option(v-for="item in auditInfo.result.dataSource", :key="item.key", :label="item.label", :value="item.key")
      b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(iconName="operation", @click="showOperation", :disabled="!auditInfo.result.value.audit_result" v-if="hasOperation")
      b-button.right(type="primary", @click="submit", :disabled="!auditInfo.result.value.audit_result"  v-if="!disabled") {{renderData.submit}}
      b-button.right(type="primary", @click="save", :disabled="!auditInfo.result.value.audit_result"  v-if="!disabled") {{renderData.save}}
      b-button.right(@click="back") {{renderData.back}}
      span.link.right.pointer.theme-color-A.theme-color-lightA10-hover.theme-color-darkenA10-active(@click="cancelTask"  v-if="!disabled") {{renderData.cancelTask}}

</template>

<script>
  import service from '../service'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BTable from 'components/BTable'
  import BDialog from 'components/BDialog'
  import TextTemplate from './TextTemplate'
  import DocTemplate from './DocTemplate'
  import TableTemplate from './TableTemplate'

  export default {
    name: 'custom-audit-page',
    data () {
      return {
        params: {
          progress_id: this.currRow.progress_id.val,
          task_id: this.currRow.task_id,
          audit_type: this.auditType
        },
        auditInfo: {
          template: '0', // 0: text, 1: doc 2: table
          auditName: '',
          audit_file: [],
          data: [],
          formItemList: [],
          result: {
            value: {},
            dataSource: []
          }
        }
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
      },
      activeTabLabel: {
        type: String,
        required: true
      }
    },
    methods: {
      showOperation () {
        var res = this.auditInfo.result.dataSource.find(item => item.key === this.auditInfo.result.value.audit_result)
        this.$set(this.currRow, 'currResult', res)
        this.visible.dialog = 'CustomOperate'
      },
      cancelTask () {
        var url = (this.origin === 'audit_history' || this.origin === 'audit_history_component') ? '/api/resource/audit_history/cancel_process_task' : '/api/resource/audit_process/cancel_process_task'
        var params = {
          task_id: this.currRow.task_id,
          audit_type: this.auditType
        }
        service.cancelTask(params, url).then(({re}) => {
          if (re === '200') {
            this.back()
          }
        })
      },
      save () {
        var params = {
          task_id: this.currRow.task_id,
          audit_type: this.auditType
        }
        Object.assign(params, this.auditInfo)
        var valid = false
        this.$refs['template'].validate(re => { valid = re })
        if (!valid) {
          return
        }
        params.formItemList = this.$refs['template'].getFormValue()
        var resKey = this.auditInfo.result.value.audit_result
        var result = this.auditInfo.result.dataSource.find(item => item.key === resKey) || {}
        params.audit_result = {
          audit_result: resKey,
          audit_action: result.action && result.action.value
        }
        delete params['result']
        var url = (this.origin === 'audit_history' || this.origin === 'audit_history_component') ? '/api/resource/audit_history/save_audit_info' : '/api/resource/audit_process/save_audit_info'
        service.saveCustomAudit(params, url)
      },
      submit () {
        var valid = false
        this.$refs['template'].validate(re => { valid = re })
        if (!valid) {
          return
        }
        var params = {
          task_id: this.currRow.task_id,
          audit_type: this.auditType
        }
        Object.assign(params, this.auditInfo)
        params.formItemList = this.$refs['template'].getFormValue()
        var resKey = this.auditInfo.result.value.audit_result
        var result = this.auditInfo.result.dataSource.find(item => item.key === resKey) || {}
        params.audit_result = {
          audit_result: resKey,
          audit_action: result.action && result.action.value
        }
        delete params['result']
        var url = (this.origin === 'audit_history' || this.origin === 'audit_history_component') ? '/api/resource/audit_history/submit_audit_info' : '/api/resource/audit_process/submit_audit_info'
        service.submitCustomAudit(params, url).then(({re}) => {
          if (re === '200') {
            this.$emit('get-audit-count')
            this.back()
          }
        })
      },
      back () {
        this.visible.page = (this.currRow.origin === 'audit_history' && 'audit_process_deposit_audit_history') || null
      },
      getAuditInfo () {
        var params = {
          task_id: this.currRow.task_id,
          audit_type: this.auditType,
          progress_id: this.currRow.origin === 'audit_history' ? this.currRow.currHistory.progress_id.val : this.currRow.progress_id.val
        }
        var url = (this.origin === 'audit_history' || this.origin === 'audit_history_component') ? '/api/resource/audit_history/get_audit_page_info' : '/api/resource/audit_process/get_audit_page_info'
        return service.getAuditInfo(params, url).then(res => {
          Object.assign(this.auditInfo, res)
          console.log('this.auditInfo', this.auditInfo)
          // 获取当前action，value塞上相应的 value.audit_action
          var resKey = this.auditInfo.result.value.audit_result
          var action = this.auditInfo.result.dataSource.find(item => item.key === resKey) || {}
          action.value = this.auditInfo.result.value.audit_action
          this.$set(this.currRow, 'currStep', {
            name: res.stepName
          })
        })
      }
    },
    computed: {
      disabled () {
        return (this.currRow.origin === 'audit_history' || this.currRow.origin === 'audit_history_component')
      },
      origin () {
        return this.currRow.origin
      },
      hasOperation () {
        var result = this.auditInfo.result
        var curr = result.dataSource.find(item => item.key === result.value.audit_result)
        return curr && curr.action
      }
    },
    async beforeMount () {
      await this.getAuditInfo()
    },
    components: {
      BFormItem,
      BButton,
      BIcon,
      BInput,
      BSelect,
      BDialog,
      BTable,
      TextTemplate,
      TableTemplate,
      DocTemplate
    }
  }
</script>

<style lang="less">
  .custom-audit-page {
    height: 100%;
    display: flex;
    flex-direction: column;
    .top {
      flex-grow: 1;
      display: flex;
    }
    .footer {
      line-height: 36px;
      margin: 15px 0;
      .b-select {
        width: 400px !important;
      }
      .b-icon {
        margin-left: 25px;
      }
      .right {
        margin-left: 25px;
        float: right;
      }
    }
  }
</style>
