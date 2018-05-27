<template lang="pug">
  el-form.new-step(:model="stepInfo", ref="stepInfo", :rules="rules", label-width="140px", label-position="left")
    .basic-info.theme-border-D
      .title {{renderData.auditInfoSet}}
      el-form-item(prop="name")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.stepName", v-ellipsis-title="")
        b-input(:model.sync="stepInfo.name.label", :placeholder="renderData.pleaseInput")
      el-form-item.is-required(prop="parent")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.stepDad", v-ellipsis-title="")
        b-select(:model.sync="stepInfo.parent", :placeholder="renderData.pleaseSelect", :multiple='true', @change="parentChange", valueKey="key")
          el-option(v-for="item in parentStepList", :label="item.label", :value="item", :key="item.key")
        b-icon.margin-left(iconName="info", :title="renderData.decisionWorkflow")
      el-form-item(prop="description.label")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.stepDescription", v-ellipsis-title="")
        b-input(:model.sync="stepInfo.description.label", :placeholder="renderData.pleaseInput")
    .condition-info.theme-border-D
      .title
        | {{renderData.auditConditionSet}}
        b-icon.margin-left(iconName="info", :title="renderData.auditConditionSetDescription")
      .dad-step(v-for="(dad, idx) in stepInfo.parent", :key="idx")
        .title {{dad.label}}
        el-form-item(v-for="(cond, idx) in dad.condition", :key="idx")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="cond.label", v-ellipsis-title="")
          b-select(:model.sync="cond.dataSource", :placeholder="renderData.pleaseSelect", v-if="cond.type==='select'", valueKey="key", :multiple="true")
            el-option(v-for="(opt, idx) in getFieldDataSource(dad, cond)", :key="idx", :label="opt.label", :value="opt")
          .time-range(v-if="cond.type=='datetimerange'")
            b-select(:model.sync="cond.condition", :placeholder="renderData.pleaseSelect")
              el-option(:label="r.label", :value="r.key", v-for="r in rList", :key="r.key")
            b-input(:model.sync="cond.value", :placeholder="renderData.pleaseInput")
          span.pointer.theme-color-A.theme-color-lightA10-hover.theme-color-darkenA10-active(@click="deleteCondition(cond, dad)")
            b-icon.margin-left.margin-right(iconName="message_failure")
            | {{renderData.deleteCondition}}
        .add-condition
          span.pointer.theme-color-A.theme-color-lightA10-hover.theme-color-darkenA10-active(@click="addCondition(dad)")
            b-icon.margin-right(iconName="CombinedShapeCopy")
            | {{renderData.addCondition}}
    .content-info.theme-border-D
      .title
        | {{renderData.auditContentSet}}
        b-icon.margin-left(iconName="info", :title="renderData.contentMustSet")
      el-form-item(prop="audit_page.key")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.auditTemplate", v-ellipsis-title="")
        b-select(:model.sync="stepInfo.audit_page", :placeholder="renderData.pleaseSelect", valueKey="key")
          el-option(:label="item.label", :value="item", v-for="item in templateList", :key="item.key")
      el-form-item(v-for="(target, idx) in stepInfo.audit_target", :key="idx", :prop="'audit_target.'+ idx + '.key'" , :rules="auditObjRule")
        template(slot="label")
          span.theme-color-C.inline-label(v-ellipsis-title="") {{idx!='0'?' ':renderData.auditObject}}
        b-select(:model.sync="target.key", :placeholder="renderData.pleaseSelect")
          el-option(v-for="(obj, idx) in auditTargetMap[stepInfo.audit_page.key]", :key="idx", :label="obj.label", :value="obj.key" v-show="!hidden(obj, target)")
        b-icon.pointer.theme-color-A.theme-color-lightA10-hover.theme-color-darkenA10-active.margin-left(iconName="message_failure", @click="deleteAuditTarget(idx)")
        el-radio-group.margin-left(v-model="target.all")
          b-radio(:label="true") {{renderData.checkAll}}
          b-radio(:label="false") {{renderData.checkPart}}
        b-icon.margin-left(iconName="termset" v-show="!target.all", @click="setAuditObject(target)")
      el-form-item(label=" ")
        b-button(type="primary", @click="addAuditObject") {{renderData.add}}
    .res-info.theme-border-D
      .title {{renderData.auditResultSet}}
      .res-item-container
        .res-item(v-for="(res, idx) in stepInfo.result", :key="idx")
          b-tag(:closable="true", @close="deleteResult(idx)")
            span.tag-group-txt(v-ellipsis-title="", slot="content", size="small") {{res.label}}
          br
          span.pointer.theme-color-A.theme-color-lightA10-hover.theme-color-darkenA10-active(@click="addAction(res)") {{renderData.editAction}}
        .res-item.blank
          b-button(size="small", @click="showInput" v-if="!addingRes") {{renderData.add}}
          template(v-else)
            b-input(:placeholder="renderData.pleaseInput", :model.sync="newResult", size="small")
            b-icon.margin-left.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="closeInput")
            b-icon.margin-left.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addResult")
    .footer.theme-border-D
      b-button(@click="back") {{renderData.back}}
      b-button(type="primary", @click="saveStep") {{renderData.save}}

</template>

<script>
  import service from '../service'
  import { validator, constants } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BTag from 'components/BTag'
  import BRadio from 'components/BRadio'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'

  export default {
    name: 'new-step',
    data () {
      var _this = this
      return {
        allFieldsMap: {},
        newResult: '',
        addingRes: false,
        auditTargetMap: {},
        rList: [],
        stepInfo: {
          name: {key: '', label: ''},
          parent: [],
          description: {key: '', label: ''},
          audit_page: {key: '', label: ''},
          audit_target: [
            {
              'key': '',
              'all': true,
              'dataSource': []
            }
          ],
          result: []
        },
        auditObjRule: [
          {
            required: true,
            message: _this.renderData.pleaseSelect,
            trigger: 'blur'
          }
        ],
        templateList: [],
        parentStepList: [],
        rules: {
          'name': [
            {
              required: true,
              message: _this.renderData.pleaseInput,
              trigger: 'blur'
            },
            {
              validator (rule, name, cb) {
                console.log('rule, name, cb', rule, name, cb)
                var label = name.label || ''
                if (!label) {
                  cb(_this.renderData.pleaseInput)
                } else if (label.trim() !== label) {
                  cb(_this.renderData.noAllowSpace)
                } else if (!constants.text0To128Limit.test(label)) {
                  cb(_this.renderData.textLength128)
                } else {
                  cb()
                }
              },
              trigger: 'blur,change'
            }
          ],
          'parent': [
//              {
//                required: true,
//                message: _this.renderData.pleaseSelect,
//                trigger: 'blur'
//              },
            {
              test (val) {
                return !!(val && val.length)
              },
              validator: validator.validate,
              message: _this.renderData.pleaseSelect,
              trigger: 'blur'
            }
          ],
          'description.label': [
            {
              regex: constants.text0To10000Limit,
              validator: validator.validate,
              message: _this.renderData.textLength10000,
              trigger: 'blur'
            },
            {
              test (val) {
                return val.trim() === val
              },
              validator: validator.validate,
              message: _this.renderData.noAllowSpace,
              trigger: 'blur'
            }
          ],
          'audit_page.key': [
            {
              required: true,
              message: _this.renderData.pleaseSelect,
              trigger: 'blur'
            }
          ]
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
    methods: {
      hidden (item, curr) {
        // 已经选中的那些项隐藏, 保留当前选中的
        if (this.stepInfo && this.stepInfo.audit_target) {
          return this.stepInfo.audit_target.find(ele => ele.key === item.key) && curr.key !== item.key
        }
        return false
      },
      showInput () {
        this.addingRes = true
        this.newResult = ''
      },
      closeInput () {
        this.addingRes = false
      },
      deleteAuditTarget (idx) {
        this.stepInfo.audit_target.splice(idx, 1)
      },
      addResult () {
        // z todo 验证，result
        this.stepInfo.result.push({
          key: '',
          label: this.newResult
        })
        this.addingRes = false
      },
      saveStep () {
        this.$refs['stepInfo'].validate(valid => {
          if (valid) {
            var params = JSON.parse(JSON.stringify(this.stepInfo))
            delete params.currTarget
            delete params.currParent
            delete params.currResult
            params.audit_target.forEach(target => {
              delete target.allDataSource
            })
            params.parent.forEach(parent => {
              delete parent.allDataSource
            })
            params.uuid = this.currRow.uuid
            service.saveStep(params).then(res => {
              this.visible.page = 'audit_set_flow_people_set'
            })
          }
        })
      },
      back () {
        // z todo 判断信息是否发生变化，然后弹框
        this.$confirm(this.renderData.confirmBack, this.renderData.back, {
          confirmButtonText: this.renderData.confirm,
          cancelButtonText: this.renderData.cancel,
          type: 'warning'
        }).then(() => {
          this.visible.page = 'audit_set_flow_people_set'
        })
      },
      async parentChange () {
        // 根据当前选中过的 parent，获取相应的字段列表
        for (var i = 0; i < this.stepInfo.parent.length; i++) {
          var parent = this.stepInfo.parent[i]
          if (!this.allFieldsMap[parent.key]) {
            await this.getStepFields(parent.key)
          }
        }
      },
      addAuditObject () {
        var target = {
          'key': '',
          'all': true,
          'dataSource': []
        }
        this.stepInfo.audit_target.push(target)
      },
      setAuditObject (target) {
        this.visible.dialog = 'SetTerm'
        var targetList = this.auditTargetMap[this.stepInfo.audit_page.key]
        Object.assign(target, targetList.find(item => target.key === item.key))
        console.log('target ', target)
        this.$set(this.stepInfo, 'currTarget', target)
      },
      getFieldDataSource (dad, condition) {
        console.log('getFieldDataSource ', this.allFieldsMap, dad.key, condition.key)
        if (this.allFieldsMap[dad.key] && this.allFieldsMap[dad.key][condition.key]) {
          return this.allFieldsMap[dad.key][condition.key].dataSource || []
        }
        return {}
      },
      addCondition (parent) {
        console.log('addCondition', parent)
        this.visible.dialog = 'AddCondition'
        var allDataSource = []
        var fieldsMap = this.allFieldsMap[parent.key]
        for (var key in fieldsMap) {
          var item = Object.assign({}, fieldsMap[key])
          item.key = key
          item.dataSource = []
          allDataSource.push(item)
        }
        // 去除掉已经存在的condition
        !parent.condition && this.$set(parent, 'condition', [])
        allDataSource = allDataSource.filter(item => !parent.condition.find(existItem => existItem.key === item.key))
        this.$set(parent, 'allDataSource', allDataSource)
        this.$set(this.stepInfo, 'currParent', parent)
      },
      deleteResult (idx) {
        this.stepInfo.result.splice(idx, 1)
      },
      addAction (res) {
        this.visible.dialog = 'AddAction'
        this.$set(this.stepInfo, 'currResult', res || {})
      },
      deleteCondition (condition, dad) {
        var idx = dad.condition.indexOf(condition)
        dad.condition.splice(idx, 1)
      },
      getDadStepList () {
        var params = {
          uuid: this.currRow.uuid
        }
        return service.getDadStepList(params).then(res => {
          this.parentStepList = res
        })
      },
      getStepFields (key) {
        console.log('getStepFields 开始')
        var params = {
          uuid: this.currRow.uuid,
          key: key
        }
        return service.getStepFields(params).then(res => {
          var obj = {}
          res.forEach(item => {
            obj[item.key] = item
          })
          this.$set(this.allFieldsMap, key, obj)
          console.log('getStepFields 结束')
        })
      },
      getTemplateList () {
        var params = {}
        return service.getTemplateList(params).then(res => {
          this.templateList = res
        })
      },
      getAuditTargetMap () {
        var params = {
          uuid: this.currRow.uuid
        }
        return service.getAuditTargetMap(params).then(res => {
          for (var key in res) {
            res[key].forEach(item => {
              item.allDataSource = item.dataSource
              delete item.dataSource
            })
          }
          this.auditTargetMap = res
        })
      },
      getRList () {
        var params = {
          uuid: this.currRow.uuid
        }
        return service.getRList(params).then(res => {
          this.rList = res.data
        })
      }
    },
    async mounted () {
      await this.getDadStepList()
      await this.getTemplateList()
      await this.getRList()
      await this.getAuditTargetMap()
      Object.assign(this.stepInfo, this.currRow.currStep)
//      await this.getStepInfo()
      for (var i = 0; i < this.stepInfo.parent.length; i++) {
        var parent = this.stepInfo.parent[i]
        if (!this.allFieldsMap[parent.key]) {
          await this.getStepFields(parent.key)
        }
      }
      this.$set(this.currRow, 'stepInfo', this.stepInfo)
    },
    components: {
      BButton,
      BIcon,
      BTag,
      BRadio,
      BSelect,
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .new-step {
    .basic-info, .condition-info, .content-info, .res-info {
      border-bottom-width: 1px;
      border-style: solid;
      .title {
        font-weight: bold;
        margin: 20px 0;
      }
      .b-input, .b-select {
        width: 50%;
      }
      .time-range {
        display: inline-block;
        width: 50%;
        .b-select {
          width: 30%;
        }
        .b-input {
          width: 70%;
        }
      }
      .margin-left {
        margin-left: 10px;
      }
      .margin-right {
        margin-right: 10px;
      }
      .tag-group-txt {
        max-width: 300px;
        display: inline-block;
      }
      .add-condition {
        margin-bottom: 20px;
      }
      .res-item-container {
        .res-item {
          display: inline-block;
          vertical-align: top;
          margin-right: 10px;
          margin-bottom: 20px;
          .b-tag {
            margin-bottom: 5px;
          }
        }
      }
    }
    .footer {
      /*border-top-width: 1px;*/
      /*border-style: solid;*/
      padding: 20px 0;
    }
  }
</style>
