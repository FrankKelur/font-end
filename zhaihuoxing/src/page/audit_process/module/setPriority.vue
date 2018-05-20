<template lang="pug">
  b-dialog.set-priority(:show='true', :title="renderData.prioritySet", width="38%", :show-close="true", :before-close="beforeClose")
<<<<<<< HEAD
    el-form(label-width="80px", :model="setPriority", :rules="rules", ref="setForm")
      el-form-item(:label="renderData.priority", prop="priority")
=======
    el-form(label-width="140px", :model="setPriority", :rules="rules", ref="setForm", label-position="left")
      el-form-item(prop="priority")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.priority", v-ellipsis-title="")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
=======
      },
      origin: {
        type: String,
        default: ''
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
            service.setPriorityFun(params).then(res => {
=======
            var url = this.origin === 'audit_history' ? '/api/resource/audit_history/set_priority' : '/api/resource/audit_process/set_priority'
            service.setPriorityFun(params, url).then(res => {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
              this.visible.dialog = null
            })
          }
        })
      },
      getPriorityList () {
        var params = {}
<<<<<<< HEAD
        return service.getPrioritySelect(params).then(({re, data}) => {
=======
        var url = this.origin === 'audit_history' ? '/api/resource/audit_history/get_priority_select' : '/api/resource/audit_process/get_priority_select'
        return service.getPrioritySelect(params, url).then(({re, data}) => {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
