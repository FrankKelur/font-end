<template lang="pug">
  .template
    .left
      .info-group.theme-border-D(v-for="group in auditInfo.data", :key="group.key")
        .title {{group.label}}
        .info-item(v-for="item in group.dataSource", :key="item.key")
          | {{item.label + renderData.colon + (item.value||'-')}}
    .right
      .title {{activeTabLabel}}
      custom-form(:model="tempForm", ref="tempForm", :formItemList="auditInfo.formItemList", :disabled="disabled", :renderData="renderData")
</template>

<script>
  import BFormItem from 'components/BFormItem'
  import CustomForm from './CustomForm'

  export default {
    name: 'text-template',
    data () {
      return {
        tempForm: {}
      }
    },
    methods: {
      getFormValue () {
        return this.tempForm
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
    components: {
      BFormItem,
      CustomForm
    }
  }
</script>

<style lang="less", scoped>
.template {
  overflow: auto;
  .left {
    width: 44%;
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
  }
  .right{
    width: 54%;
    overflow: auto;
    margin-left: 2%;
    .title {
      margin: 20px 0;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
