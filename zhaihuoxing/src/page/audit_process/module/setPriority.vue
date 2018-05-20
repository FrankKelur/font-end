<template lang="pug">
  b-dialog.set-priority(:show='true', :title="renderData.prioritySet", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="80px", :model="setPriority", :rules="rules", ref="setForm")
      el-form-item(:label="renderData.priority", prop="priority")
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
            service.setPriorityFun(params).then(res => {
              this.visible.dialog = null
            })
          }
        })
      },
      getPriorityList () {
        var params = {}
        return service.getPrioritySelect(params).then(({re, data}) => {
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
