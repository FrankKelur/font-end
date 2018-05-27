<template lang="pug">
  .audit_start_custom
    custom-form(:model="tempForm", ref="tempForm", :formItemList="formItemList", :renderData="renderData", label-width="140px", label-position="left")
    .footer
      b-button(@click="back") {{renderData.back}}
      b-button(type="primary", @click="submit") {{renderData.submit}}
</template>

<script>
  import CustomForm from '@/page/audit_process/module/CustomForm'
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import service from '../service'

  export default {
    name: 'custom_form_page',
    data () {
      return {
        tempForm: {},
        formItemList: []
      }
    },
    props: {
      visible: {
        required: true
      },
      renderData: {
        type: Object,
        required: true
      },
      currAudit: {
        required: true
      }
    },
    methods: {
      back () {
        this.visible.page = null
      },
      submit () {
        this.$refs['tempForm'].validate(valid => {
          if (valid) {
            this.$refs['tempForm'].uploadCDN()
            var params = {
              audit_type: this.currAudit.name,
              start_page: this.currAudit.start_page,
              data: this.tempForm
            }
            service.submitAudit(params)
          }
        })
      },
      getFormItemList () {
        var params = {
          start_page: this.currAudit.start_page,
          audit_type: this.currAudit.name
        }
        return service.getFormItemList(params).then(res => {
          this.formItemList = res.data
          // 给每个formItem 加上value: '' (type == file 的时候 value: {})
          this.formItemList.forEach(item => {
            this.$set(item, 'value', '')
            if (item.type === 'upload') {
              this.$set(item, 'value', {})
            }
          })
        })
      }
    },
    async mounted () {
      await this.getFormItemList()
    },
    components: {
      BIcon,
      BFormItem,
      CustomForm,
      BButton
    }
  }
</script>

<style lang="less">
  .custom-form {
    width: 50%;
    .item {
      position: relative;
      .el-form-item {
        margin-top: 20px !important;
      }
    }
  }
</style>
