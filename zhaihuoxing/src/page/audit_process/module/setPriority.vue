<template lang="pug">
  b-dialog.set-priority(:show='true', :title="renderData.prioritySet", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="140px", :model="setPriority", :rules="rules", ref="setForm", label-position="left")
      el-form-item(prop="priority")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.priority", v-ellipsis-title="")
        b-select(:model.sync="setPriority.priority", :placeholder="renderData.pleaseSelect")
          el-option(v-for='item in setPriority.priorityList', :key="item.key", :value="item.key", :label="item.val")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="setPriorityFun", type="primary") {{renderData.save}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'

  export default {
    name: 'set-priority',
    data () {
      return {
        setPriority: {
          priority: '',
          priorityList: []
        },
        rules: {
          priority: [{
            required: true,
            message: this.renderData.pleaseSelect
          }]
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      auditType: {
        type: String,
        required: true
      },
      origin: {
        type: String,
        default: ''
      }
    },
    methods: {
      setPriorityFun () {
        this.$refs['setForm'].validate(valid => {
          if (valid) {
            var params = {
              task_id: this.currRow.task_id,
              priority: this.setPriority.priority,
              audit_type: this.auditType
            }
            var url = this.origin === 'audit_history' ? '/api/resource/audit_history/set_priority' : '/api/resource/audit_process/set_priority'
            service.setPriorityFun(params, url).then(res => {
              this.visible.dialog = null
            })
          }
        })
      },
      getPriorityList () {
        var params = {}
        var url = this.origin === 'audit_history' ? '/api/resource/audit_history/get_priority_select' : '/api/resource/audit_process/get_priority_select'
        return service.getPrioritySelect(params, url).then(({re, data}) => {
          if (re === '200') {
            this.setPriority.priorityList = data
          }
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    async mounted () {
      await this.getPriorityList()
      this.setPriority.priority = this.currRow.priority.val
    },
    components: {
      BDialog,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less">
  .set-priority {}
</style>
