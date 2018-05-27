<template lang="pug">
  .form-set
    el-row(:gutter="10").oper-container.clear-float.theme-border-D
      el-col(:span="3", :offset='18')
        b-button(@click='saveEnable' v-ellipsis-title="" type="primary") {{renderData.save}}
      el-col(:span="3")
        b-button(@click='validateForm') {{renderData.validateForm}}
    .content
      .left.draggable-item-container.theme-bg-I
        .title.theme-color-A {{renderData.controlBase}}
        .item.theme-bg-H.theme-border-D.theme-border-A-hover.theme-color-C(v-for="(temp, $index) in templateList", :key="temp.icon", :idx="$index",  v-draggable="handler", origin='left')
          b-icon.template-icon(:iconName="temp.icon")
          span {{temp.label}}
      .middle
        el-form.middle-container(label-width="140px", :model="model", ref="tempForm", label-position="left")
          .title {{auditInfo.name}}
          .item(v-for="(item, $index) in formItemList", :key="item.key", :idx="$index",  v-dropable="handler", @click="currItem=item")
            .operate-menu
              .icon-conatainer(v-draggable="handler", :idx="$index", origin='middle')
                b-icon(iconName='move')
              .icon-conatainer
                b-icon(iconName='delete', @click.native="deleteFormItem($index)")
            el-form-item(label-width="140px", :prop="item.key", :rules="getRules(item)", :key="$index")
              span.inline-label(slot="label", v-ellipsis-title="", :class="{'theme-color-A': currItem===item}") {{item.type=='clause'?'':item.label}}
              b-form-item(:model.sync='model[item.key]', :item='item', @change="itemChange", :renderData="renderData")
          .blank-item(v-dropable="handler", :idx="formItemList.length")
            .line
              b-icon(iconName='move1', size="50px")
            .line {{renderData.addControlCreatorAudit}}
      .right.theme-bg-I
        el-tabs(v-model='activePane')
          el-tab-pane(name="1", :label="renderData.workflowInfo")
            el-form(ref="auditInfoForm", :rules="rules", :model="auditInfo", label-position="left")
              el-form-item(prop="name", :label="renderData.workflowName")
                b-input(:model.sync="auditInfo.name", :placeholder="renderData.pleaseInput")
              //el-form-item(prop="description.label")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.description", v-ellipsis-title="")
                b-input(:model.sync="auditInfo.description.label", :placeholder="renderData.pleaseInput", :rows="3")
          el-tab-pane(name="2", :label="renderData.controlSet")
            form-item-set(v-for="(item, $index) in formItemList",:key='$index', v-show="currItem==item", :item="item", :renderData="renderData", :allFormItems="formItemList", ref="formItemSet")

</template>

<script>
  import service from './service'
  import { validator, constants } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BUpload from 'components/BUpload'
  import BFormItem from 'components/BFormItem'
  import FormItemSet from './modules/FormItemSet'
  import renderData from './lang.js'

  export default {
    name: 'form-set',
    data () {
      var _this = this
      return {
        page: this.$router.currentRoute.query.page,
        messageMap: {
          number: renderData.numberMessage,
          longText: renderData.longTextMessage,
          required: renderData.requiredMessage
        },
        allFieldsMap: {},
        renderData: renderData,
        formSet: {},
        currItem: {},
        auditInfo: {
          name: '',
          description: {
            label: '',
            key: ''
          }
        },
        activePane: '1',
        formItemList: [],
        rules: {
          name: [
            {
              required: true,
              message: renderData.pleaseInput,
              trigger: 'blur'
            },
            {
              regex: constants.text0To10Reg,
              validator: validator.validate,
              message: renderData.text0To10Limit,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              message: renderData.noAllowSpace,
              test (val) {
                return val.trim() === val
              },
              trigger: 'blur'
            }
          ],
          'description.label': [
            {
              regex: constants.text0To128Limit,
              validator: validator.validate,
              message: renderData.textLength128,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              message: renderData.noAllowSpace,
              test (val) {
                return val.trim() === val
              },
              trigger: 'blur'
            }
          ]
        },
        handler: {
          drop (event) {
            var el = event.target
            if (!el.getAttribute('dropable')) {
              return
            }
            console.log('drop handler')
            var origin = event.dataTransfer.getData('origin')
            var sourceIdx = parseInt(event.dataTransfer.getData('sourceIdx'))
            var targetIdx = parseInt(event.target.getAttribute('idx'))
            if (origin === 'middle') {
              var sourceData = _this.formItemList[sourceIdx]
              _this.formItemList.splice(targetIdx + 1, 0, sourceData)
              if (sourceIdx < targetIdx + 1) {
                _this.formItemList.splice(sourceIdx, 1)
              } else {
                _this.formItemList.splice(sourceIdx + 1, 1)
              }
            } else {
              // 添加到target下
              var template = _this.templateList[sourceIdx]
              var newItem = Object.assign({
                label: '',
                placeholder: '',
                key: '_' + new Date().getTime(), // 这里获取取uid加上timestamp作为key
                rules: []
              }, template)
              if (targetIdx === _this.formItemList.length) {
                _this.formItemList.splice(0, 0, newItem)
              } else {
                _this.formItemList.splice(targetIdx + 1, 0, newItem)
              }
            }
            el.className = el.className.replace(/dragenter/g, '').replace(/theme\\-border\\-D/g, '')
          },
          dragstart (event) {
            event.dataTransfer.setData('sourceIdx', event.target.getAttribute('idx'))
            event.dataTransfer.setData('origin', event.target.getAttribute('origin'))
          }
        },
        templateList: [
          {
            type: 'input',
            icon: 'inputbox',
            label: renderData.singleLineInputBox,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'textarea',
            icon: 'multilineinputbox',
            label: renderData.multipleInputBox,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'select',
            icon: 'radio',
            dataSource: [],
            label: renderData.radio,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
          {
            type: 'select',
            icon: 'checkbox',
            multiple: true,
            dataSource: [],
            label: renderData.checkbox,
            list: true,
            detail: true,
            search: true,
            edit: true
          },
//          {
//            type: 'datetimerange',
//            icon: 'date',
//            label: renderData.dateRange,
//            format: 'yyyy-MM-dd mm:ss',
//            hasInterval: false,
//            list: true,
//            detail: true,
//            search: true,
//            edit: true
//          },
          {
            type: 'text',
            icon: 'explanatorytext',
            label: renderData.caption,
            list: false,
            detail: true,
            search: false,
            edit: true
          }
          // {
          //   type: 'upload',
          //   icon: 'file',
          //   label: renderData.enclosure
          // },
          // {
          //   type: 'cascadeSelect',
          //   icon: 'Group',
          //   label: renderData.cascadeInquire,
          //   follow: [],
          //   dataSource: ''
          // }
        ],
        regexObj: {
          longText: {
            name: 'longText',
            label: renderData.longTextRule,
            rule: {
              name: 'longText',
              regex: constants.longTextRule,
              validator: validator.validate,
              message: renderData.content1000More,
              trigger: 'blur'
            }
          },
          number: {
            name: 'number',
            label: renderData.numberRule,
            rule: {
              name: 'number',
              regex: constants.numberRule,
              validator: validator.validate,
              message: renderData.pleaseInput,
              trigger: 'blur'
            }
          },
          required: {
            name: 'required',
            label: renderData.required,
            rule: {
              name: 'required',
              required: true,
              message: renderData.pleaseInput,
              trigger: 'blur'
            }
          }
        },
        model: {}
      }
    },
    methods: {
      getRules (item) {
        var res = (item.rules || []).reduce((res, ruleItem) => {
          var rule = constants.ruleMap[ruleItem]
          if (ruleItem === 'required' && item.type === 'clause') {
            res.push({
              name: 'required',
              validator: validator.validate,
              test (val) {
                return !!val // 要求checkbox 必须为true
              },
              message: this.messageMap[ruleItem],
              trigger: ['blur', 'change']
            })
          } else if (ruleItem === 'required' && item.type === 'upload') {
            res.push({
              name: 'required',
              validator: validator.validate,
              test (val) {
                return !!val.url // 要求upload 必须为有url
              },
              message: this.messageMap['required'],
              trigger: ['blur', 'change']
            })
          } else if (ruleItem.includes('api')) {
            res.push({
              name: ruleItem,
              trigger: ['blur', 'change'],
              test (val) {
                var params = {key: val}
                Object.assign(params, item.params)
                return fetch(ruleItem, params)
              },
              validator: validator.validate
            })
          } else {
            rule.message = this.messageMap[ruleItem]
            res.push(rule)
          }

          return res
        }, [])
        console.log('get rules', res)
        return res
      },
      itemChange (item, val) {
        var beDependentItems = item.beDependentItems || []
        beDependentItems.forEach(elm => {
          this.model[elm.key] = ''
          this.itemChange(elm, '')
          if (!elm.params) {
            this.$set(elm, 'params', {[item.key]: this.model[item.key]})
          } else {
            elm.params[item.key] = this.model[item.key]
          }
        })
      },
      validateForm () {
        this.$refs['tempForm'].validate()
      },
      saveEnable () {
        var valid = true
        console.log('saveEnable')
        this.$refs['auditInfoForm'].validate(re => {
          valid = re && valid
          if (!valid) {
            this.activePane = '1'
          }
        })
        this.$refs['formItemSet'].forEach((form, idx) => {
          console.log('formItemSet', form, form.validate)
          form.validate(res => {
            if (!valid) return
            valid = valid && res
            if (!valid) {
              this.activePane = '2'
              this.currItem = this.formItemList[idx]
            }
          })
        })
        if (valid) {
          var params = {
            ...this.auditInfo,
            dataSource: this.formItemList,
            _key: this.page ? this.page : '_p' + new Date().getTime()
          }
          service.saveEnable(params).then(res => {
            this.$message({type: 'success', message: this.renderData.operateSuccess})
            window.location.reload()
          })
        }
      },
      deleteFormItem (idx) {
        this.formItemList.splice(idx, 1)
      },
      getAuditInfo (page) {
        return service.getAuditInfo(page).then(res => {
          Object.assign(this.auditInfo, res.data)
          this.formItemList = res.data.formItemList
          // 给每个formItem 加上value: '' (type == file 的时候 value: {})
          this.formItemList.forEach(item => {
            this.$set(item, 'value', item.type === 'upload' ? {} : '')
          })
        })
      }
    },
    mounted () {
      if (this.page) {
        this.getAuditInfo(this.page)
      }
    },
    components: {
      BButton,
      BIcon,
      BFormItem,
      FormItemSet,
      BUpload,
      BInput
    },
    watch: {
      formItemList (newVal, oldVal) {
        if (this.formItemList.length === 1) {
          this.currItem = this.formItemList[0]
        }
        console.log('watch formItemList newVal, oldVal', newVal, oldVal)
        this.formItemList.forEach(item => {
          this.allFieldsMap[item.key] = item
          item.beDependentItems = []
          // 给每个字段赋值
          this.$set(this.model, item.key, item.value || '')
        })
        // 给每个被依赖的form-item 添加 beDependentItems 数组，存放哪些form-item依赖该 form-item
        this.formItemList.forEach(item => {
          (item.follow || []).forEach(elm => {
            var target = this.allFieldsMap[elm.key]
            target.beDependentItems.push(item)
          })
        })
      }
    }
  }
</script>

<style lang="less">
  .oper-container {
    .el-col {
      .el-button {
        width: 100% !important;
      }
    }
    padding-bottom: 12px;
  }

  .form-set {
    height: 100%;
    min-width: 1153px;
    overflow: hidden;
    .oper-container {
      border: solid;
      border-bottom-width: 1px;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      padding-bottom: 12px;
    }
    .content {
      height: 100%;
      display: flex;
      align-items: stretch;

      .left {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        width: 13%;
        .title {
          font-size: 16px;
          letter-spacing: 0;
          line-height: 14px;
          margin-bottom: 20px;
        }
        .item {
          border-width: 1px;
          border-style: dotted;
          border-radius: 4px;
          line-height: 36px;
          height: 36px;
          padding: 0px 10px;
          margin-bottom: 8px;
        }
        .template-icon {
          margin-right: 5px;
        }
      }

      .middle {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        .el-form-item.is-required .el-form-item__label:before {
          position: relative;
          top: -14px;
        }
        .title {
          font-size: 16px;
          letter-spacing: 0;
          line-height: 14px;
          margin-bottom: 20px;
        }
        .middle-container {
          display: flex;
          flex-direction: column;
          .b-date-picker {
            width: 100%;
          }
          .item {
            position: relative;
            &:hover {
              .operate-menu {
                display: block !important;
              }
            }
            .operate-menu {
              position: absolute;
              right: 0;
              z-index: 1;
              display: none;
              .icon-conatainer {
                display: inline-block;
              }
              .b-icon {
                margin-left: 15px;
              }
            }
            .el-form-item {
              margin-top: 20px !important;
            }
          }
          .blank-item {
            padding: 55px 0;
            flex-grow: 1;
            min-height: 250px;
            .line {
              text-align: center;
            }
          }
        }
      }

      .right {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        flex-grow: 1;
        .icon-item {
          width: 36px;
          height: 36px;
          position: relative;
          display: inline-block;
          border-width: 1px;
          border-style: solid;
          margin-right: 20px;
          text-align: center;
          .b-icon {
            position: relative;
            top: 3px;
          }
        }
        .b-upload {
          margin-top: 20px;
        }
      }
    }
  }
</style>
