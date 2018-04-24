<template lang="pug">
  .set-flow
    .audit-info
      span.audit-info-item
        span {{renderData.auditName + renderData.colon + ' ' + auditInfo.label}}
        span {{renderData.task + renderData.colon + ' ' + auditInfo.task_number}}
        span {{renderData.createTime + renderData.colon + ' ' + auditInfo.ctime}}
        span {{renderData.description + renderData.colon + ' ' + auditInfo.description}}
    .step-list
      .step-item(v-for="(stepInfo, idx) in stepList", :key="idx", @click="checkCurrStep(stepInfo)")
        el-card.box-card
          .clearfix.theme-bg-I(slot="header")
            .title {{stepInfo.name.label}}
            .operate
              el-dropdown.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(@command="handleCommand" trigger='click')
                span.el-dropdown-link
                  b-icon(iconName="operation")
                el-dropdown-menu.ipt-class.theme-bg-H.theme-border-lightenD12(slot="dropdown")
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='StepInfoEdit') {{renderData.stepInfoEdit}}
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='auditPageEdit') {{renderData.auditPageEdit}}
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='DeleteStep') {{renderData.deleteStep}}
          .content
              .item
                .label(v-ellipsis-title="") {{renderData.stepDad + renderData.colon}}
                .info(v-ellipsis-title="")
                  | {{(stepInfo.parent && stepInfo.parent.label) || '-'}}
                  b-icon(iconName="info", :title="renderData.decisionWorkflow")
              .item
                .label(v-ellipsis-title="") {{renderData.description + renderData.colon}}
                .info(v-ellipsis-title="") {{(stepInfo.description && stepInfo.description.label) || '-'}}
              .item
                .label(v-ellipsis-title="") {{renderData.auditCondition + renderData.colon}}
                .info(v-ellipsis-title="")
                  span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="auditConditionDetail(stepInfo)") {{renderData.seeMore}}
              .item
                .label(v-ellipsis-title="") {{renderData.auditContent + renderData.colon}}
                .info(v-ellipsis-title="")
                  span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="contentDetail(stepInfo)") {{renderData.seeMore}}
              .item
                .label(v-ellipsis-title="") {{renderData.auditPeople + renderData.colon}}
                .info(v-ellipsis-title="")
                  span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="auditPeopleDetail(stepInfo)") {{renderData.seeMore}}
                  span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="auditPeopleAdd(stepInfo)" v-if="renderData.audit_set_list") {{renderData.add}}
              .item
                .label(v-ellipsis-title="") {{renderData.noticePeople + renderData.colon}}
                .info(v-ellipsis-title="")
                  span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="noticePeopleDetail(stepInfo)") {{renderData.seeMore}}
                  span.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="noticePeopleAdd(stepInfo)" v-if="renderData.audit_set_list") {{renderData.add}}

      .step-item.blank-step.theme-border-D
        .icon-container(@click="addStep")
          b-icon(iconName="CombinedShapeCopy" size="50px")
          .info.theme-color-A {{renderData.add}}
    .footer.theme-border-D
      b-button(@click="back") {{renderData.back}}
      //b-button(type="primary", @click="saveFlow") {{renderData.save}}

</template>

<script>
  import service from '../service'
  //  import { validator, constants } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'

  export default {
    name: 'set-flow',
    data () {
//      var _this = this
      return {
        stepList: [],
        currStep: null,
        auditInfo: {
          name: '',
          task_number: '',
          ctime: '',
          description: '',
          detail: []
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
      }
    },
    computed: {
      cRules () {
        var cRules = {}
        this.formItemList.forEach(item => {
          this.$set(this.tempForm, item.field, '')
          if (item.type === 'upload') {
            this.$set(this.tempForm, item.field, {})
          }
          cRules[item.field] = item.rules
        })
        return cRules
      }
    },
    methods: {
      checkCurrStep (stepInfo) {
        console.log('stepInfo', stepInfo)
        this.currStep = stepInfo
        this.$set(this.currRow, 'currStep', this.currStep)
      },
      addStep () {
        this.visible.page = 'NewStep'
        this.$set(this.currRow, 'currStep', null)
      },
      getStepList () {
        var params = {
          uuid: this.currRow.uuid
        }
        return service.getStepList(params).then(res => {
          this.stepList = res.detail
          Object.assign(this.auditInfo, this.currRow)
        })
      },
      auditConditionDetail (stepInfo) {
        this.checkCurrStep(stepInfo)
        this.visible.dialog = 'AuditConditionDetail'
      },
      contentDetail (stepInfo) {
        this.checkCurrStep(stepInfo)
        this.visible.dialog = 'ContentDetail'
      },
      auditPeopleDetail (stepInfo) {
        this.checkCurrStep(stepInfo)
        this.visible.dialog = 'AuditPeopleDetail'
      },
      auditPeopleAdd (stepInfo) {
        this.checkCurrStep(stepInfo)
        this.visible.page = 'AuditPeopleAdd'
      },
      noticePeopleDetail (stepInfo) {
        this.checkCurrStep(stepInfo)
        this.visible.dialog = 'NoticePeopleDetail'
      },
      noticePeopleAdd (stepInfo) {
        this.checkCurrStep(stepInfo)
        this.visible.page = 'NoticePeopleAdd'
      },
      back () {
        this.visible.page = null
      },
      handleCommand (cmd) {
        if (cmd === 'DeleteStep') {
          this.visible.dialog = 'DeleteStep'
        } else if (cmd === 'auditPageEdit') {
          this.visible.page = 'auditPageEdit'
          this.$set(this.currRow, 'currPage', {
            name: this.currStep.name.label,
            key: this.currStep.name.key,
            dataSource: this.currStep.audit_form
          })
        } else if (cmd === 'StepInfoEdit') {
          this.visible.page = 'StepInfoEdit'
        }
      }
    },
    async mounted () {
      await this.getStepList()
    },
    components: {
      BButton,
      BIcon,
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .set-flow {
    .box-card {
      .operate {
        float: right;
      }
      .title {
        display: inline;
      }
      margin-bottom: 20px;
    }
    .audit-info {
      .audit-info-item {
        white-space: pre;
        line-height: 48px;
        span {
          margin-left: 10px;
        }
      }
    }
    .step-item:nth-child(even) {
      margin-left: 2%;
    }
    .step-item.blank-step {
      text-align: center;
      position: relative;
      border-style: dotted;
      border-width: 2px;
      .icon-container {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -25px;
      }
      .info {
        margin-top: 5px;
        text-align: center;
      }
    }
    .step-item {
      vertical-align: top;
      width: 48%;
      display: inline-block;
      height: 250px;
      margin-bottom: 20px;
      .content .item{
        .label {
          display: inline-block;
          vertical-align: top;
          text-align: left;
          width: 12%;
          line-height: 26px;
        }
        .info {
          padding-left: 5px;
          display: inline-block;
          vertical-align: top;
          text-align: left;
          width: 88%;
          line-height: 26px;
          span {
            margin-right: 10px;
          }
          .b-icon {
            margin-left: 8px;
          }
        }
      }
    }
    .footer {
      border-top-width: 1px;
      border-style: solid;
      padding: 20px 0;
    }
  }
</style>
