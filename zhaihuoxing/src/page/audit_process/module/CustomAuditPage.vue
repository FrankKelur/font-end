<template lang="pug">
  .custom-audit-page
    .top
      .left
        .info-group.theme-border-D(v-for="group in auditInfo.data", :key="group.key")
          .title {{group.label}}
          .info-item(v-for="item in group.dataSource", :key="item.key")
            | {{item.label + '  ' + item.value}}
      .right
        .title {{auditType}}
        el-form(:rules="cRules", :model="tempForm", ref="tempForm")
          .item(v-for="(item, $index) in formItemList", :key="$index")
            el-form-item(label-width="80px", :prop="item.field", :label="item.label")
              b-form-item(:model.sync='tempForm[item.field]', :item='item')
    .footer.el-form-item.is-required
      label.el-form-item__label {{renderData.auditResult}}
      b-select(:model.sync="auditInfo.result", :placeholder="renderData.pleaseSelect")
      b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="operation", @click.native="showOperation")
      b-button.right(type="primary", @click="submit") {{renderData.submit}}
      b-button.right(type="primary", @click="save", :disabled="!auditInfo.result.value") {{renderData.save}}
      b-button.right(@click="back") {{renderData.back}}
      span.link.right.pointer.theme-color-A.theme-color-lightA10-hover.theme-color-darkenA10-active(@click="cancelTask") {{renderData.cancelTask}}


</template>

<script>
  import service from '../service'
  import { constants } from 'common/js/Utils'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BTable from 'components/BTable'
  import BDialog from 'components/BDialog'

  export default {
    name: 'custom-audit-page',
    data () {
//      var _this = this
      return {
        tempForm: {},
        formItemList: [],
        auditInfo: {}
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
    computed: {
      cRules () {
        var cRules = {}
        var messageMap = {
          number: this.renderData.numberMessage,
          longText: this.renderData.longTextMessage,
          required: this.renderData.requiredMessage
        }
        this.formItemList.forEach(item => {
          this.$set(this.tempForm, item.field, '')
          if (item.type === 'upload') {
            this.$set(this.tempForm, item.field, {})
          }
          cRules[item.field] = item.rules.map(rule => {
            var item = constants.ruleMap[rule]
            item.message = messageMap[item.name]
            return item
          })
        })
        return cRules
      }
    },
    methods: {
      showOperation () {
        this.visible.dialog = 'CustomOperate'
        this.$set(this.currRow, 'currAction', this.auditInfo.result)
      },
      cancelTask () {
        var params = {}
        service.cancelTask(params)
      },
      save () {
        var params = {}
        service.saveCustomAudit(params)
      },
      submit () {
        var params = {}
        service.submitCustomAudit(params)
      },
      back () {
        this.visible.page = null
      },
      getAuditInfo () {
        return service.getAuditInfo().then(res => {
          Object.assign(this.auditInfo, res)
          this.$set(this.auditInfo.result, 'value', '')
          this.$set(this.currRow, 'currStep', {
            name: res.stepName
          })
          this.formItemList = res.formItemList
        })
      }
    },
    async mounted () {
      console.log('renderData', this.renderData)
      await this.getAuditInfo()
    },
    components: {
      BFormItem,
      BButton,
      BIcon,
      BInput,
      BSelect,
      BDialog,
      BTable
    }
  }
</script>

<style lang="less">
  .custom-audit-page {
    display: flex;
    flex-direction: column;
    .top {
      flex-grow: 1;
      display: flex;
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
