<template lang="pug">
  .form-set
    .oper-container.clear-float.theme-border-D
      el-col(:span="3", :offset='18')
        b-button(@click='back') {{renderData.back}}
      el-col(:span="3")
        b-button(@click='saveEnable')
          span.block-text(v-ellipsis-title="") {{renderData.saveEnable}}
    .content
      .left.draggable-item-container.theme-bg-I
        .title.theme-color-A {{renderData.controlBase}}
        .item.theme-bg-H.theme-border-D.theme-border-A-hover.theme-color-C(v-for="(temp, $index) in templateList", :key="temp.icon", :idx="$index",  v-draggable="handler", origin='left')
          b-icon.template-icon(:iconName="temp.icon")
          span {{temp.label}}
      .middle
        el-form.middle-container(label-width="140px", :model="tempForm", ref="tempForm", label-position="left")
          .title {{auditInfo.name}}
          .item(v-for="(item, $index) in formItemList", :key="item.key", :idx="$index",  v-dropable="handler", @click="currItem=item")
            .operate-menu
              .icon-conatainer(v-draggable="handler", :idx="$index", origin='middle')
                b-icon(iconName='move')
              .icon-conatainer
                b-icon(iconName='delete', @click.native="deleteFormItem($index)")
            el-form-item(:prop="item.key")
              template(slot="label")
                span.theme-color-C.inline-label(v-text="item.label", v-ellipsis-title="", :class="{'theme-color-A': currItem===item}")
              b-form-item(:model.sync='tempForm[item.key]', :item='item')
          .blank-item(v-dropable="handler", :idx="formItemList.length")
            .line
              b-icon(iconName='move1', size="50px")
            .line {{renderData.addControlCreatorAudit}}
      .right.theme-bg-I
        el-tabs(v-model='activePane', type="card")
          el-tab-pane(name="1", :label="renderData.workflowInfo")
            el-form(ref="auditInfoForm", :rules="rules", label-width="140px", :model="auditInfo", label-position="left")
              el-form-item(prop="name")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.workflowName", v-ellipsis-title="")
                b-input(:model.sync="auditInfo.name", :placeholder="renderData.pleaseInput")
              //el-form-item(:label="renderData.taskType", prop="taskType")
                b-input(:model.sync="auditInfo.task_type", :placeholder="renderData.pleaseInput")
              template(v-if="visible.page!=='auditPageEdit'")
                el-form-item(prop="description.label")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.description", v-ellipsis-title="")
                  b-input(:model.sync="auditInfo.description.label", :placeholder="renderData.pleaseInput", :rows="3")
                el-form-item
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.auditIcon", v-ellipsis-title="")
                  el-row(v-if="!auditInfo.icon.url")
                    .icon-item(v-for="icon in iconList", :key="icon", :class="{'theme-border-A':auditInfo.icon.icon===icon, 'theme-border-C':auditInfo.icon.icon!==icon}")
                      b-icon(:iconName='icon', @click.native="toggleIcon(icon)", size="26px")
                  el-row(v-show="!auditInfo.icon.icon")
                    b-upload(action="/upload", v-model="auditInfo.icon", @fileTypeNotRight="fileTypeNotRight")
                      i.el-icon-upload
                      .el-upload__text {{renderData.clickUpload}}
                      .el-upload__tip(slot="tip") {{renderData.formatRestrictionsNarrow}}
          el-tab-pane(name="2", :label="renderData.controlSet")
            form-item-set(v-for="(item, $index) in formItemList",:key='$index', v-show="currItem==item", :item="item", :renderData="renderData", :allFormItems="formItemList", ref="formItemSet")

</template>

<script>
  import service from '../service'
  import { validator, constants } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BUpload from 'components/BUpload'
  import BFormItem from 'components/BFormItem'
  import FormItemSet from './FormItemSet'

  export default {
    name: 'form-set',
    data () {
      var _this = this
      return {
        formSet: {},
        currItem: null,
        auditInfo: {
          name: '',
//          task_type: '',
          description: {
            label: '',
            key: ''
          },
          icon: {url: '', name: '', icon: ''}
        },
        tempForm: {},
        activePane: '1',
        formItemList: [],
        fileList: [],
        iconList: ['record', 'notebook', 'CloudIconCopy', 'usergroup_manage'],
        rules: {
          name: [
            {
              required: true,
              message: this.renderData.pleaseInput,
              trigger: 'blur'
            },
            {
              regex: constants.text0To30Reg,
              validator: validator.validate,
              message: this.renderData.text0To30Limit,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              message: this.renderData.noAllowSpace,
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
              message: this.renderData.textLength128,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              message: this.renderData.noAllowSpace,
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
              var template = JSON.parse(JSON.stringify(_this.templateList[sourceIdx])) // 深拷贝
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
            label: _this.renderData.singleLineInputBox
          },
          {
            type: 'textarea',
            icon: 'multilineinputbox',
            label: _this.renderData.multipleInputBox
          },
          {
            type: 'select',
            icon: 'radio',
            dataSource: [],
            label: _this.renderData.radio
          },
          {
            type: 'select',
            icon: 'checkbox',
            multiple: true,
            dataSource: [],
            label: _this.renderData.checkbox
          },
          {
            type: 'datetimerange',
            icon: 'date',
            label: _this.renderData.dateRange,
            format: 'yyyy-MM-dd mm:ss',
            hasInterval: false
          },
          {
            type: 'upload',
            icon: 'file',
            label: _this.renderData.enclosure
          },
          {
            type: 'text',
            icon: 'explanatorytext',
            label: _this.renderData.caption
          },
          {
            type: 'cascadeSelect',
            icon: 'Group',
            label: _this.renderData.cascadeInquire,
            follow: [],
            dataSource: ''
          }
        ],
        regexObj: {
          longText: {
            name: 'longText',
            label: _this.renderData.longTextRule,
            rule: {
              name: 'longText',
              regex: constants.longTextRule,
              validator: validator.validate,
              message: _this.renderData.content1000More,
              trigger: 'blur'
            }
          },
          number: {
            name: 'number',
            label: _this.renderData.numberRule,
            rule: {
              name: 'number',
              regex: constants.numberRule,
              validator: validator.validate,
              message: _this.renderData.pleaseInput,
              trigger: 'blur'
            }
          },
          required: {
            name: 'required',
            label: _this.renderData.required,
            rule: {
              name: 'required',
              required: true,
              message: _this.renderData.pleaseInput,
              trigger: 'blur'
            }
          }
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      backWithoutValidate () {
        if (this.visible.page === 'auditPageEdit') {
          this.visible.page = 'audit_set_flow_people_set'
        } else {
          this.visible.page = 'audit_set_form_set'
        }
      },
      back () {
        // z todo 判断信息是否发生变化，然后弹框
        this.$confirm(this.renderData.setNotSave, this.renderData.prompt, {
          confirmButtonText: this.renderData.confirm,
          cancelButtonText: this.renderData.cancel,
          type: 'warning'
        }).then(() => {
          this.backWithoutValidate()
        })
      },
      fileTypeNotRight () {
        var params = {
          type: 'warning',
          showClose: true,
          message: this.renderData.fileTypeNotRight
        }
        this.$message(params)
      },
      uploadCDN (file) {
        // 如果文件有改动，则上传至CDN， 然后把url，name让如file中
        var uploadParams = {}
        uploadParams = {originPath: file.filename}
        return service.uploadCDN(uploadParams)
      },
      async saveEnable () {
        var valid = true
        console.log('saveEnable')
        this.$refs['auditInfoForm'].validate(res => {
          valid = res && valid
          if (!valid) {
            this.activePane = '1'
          }
        })
        if (this.$refs['formItemSet']) {
          this.$refs['formItemSet'].forEach((form, idx) => {
            form.validate(res => {
              valid = res && valid
              if (!res) {
                this.activePane = '2'
                this.currItem = this.formItemList[idx]
              }
            })
          })
        }

        if (valid) {
          var params = {
            uuid: this.currRow.uuid,
            data: this.auditInfo
          }
          params.data.dataSource = this.formItemList
          if (this.visible.page === 'auditPageEdit') {
            service.editAuditForm(params).then(res => {
              if (res.re === '200') {
                this.backWithoutValidate()
              }
            })
          } else {
            if (this.auditInfo.icon.changed) {
              var {url} = await this.uploadCDN(this.auditInfo.icon)
              this.auditInfo.icon.url = url
              delete this.auditInfo.icon.changed
            }
            if (this.auditInfo.key) {
              service.editEnable(params).then(res => {
                if (res.re === '200') {
                  this.backWithoutValidate()
                }
              })
            } else {
              service.saveEnable(params).then(res => {
                if (res.re === '200') {
                  this.backWithoutValidate()
                }
              })
            }
          }
        }
      },
      toggleIcon (icon) {
        if (this.auditInfo.icon.icon === icon) {
          this.$set(this.auditInfo.icon, 'icon', '')
        } else {
          this.$set(this.auditInfo.icon, 'icon', icon)
        }
      },
      deleteFormItem (idx) {
        this.formItemList.splice(idx, 1)
      }
    },
    async mounted () {
      console.log('mounted formset')
      Object.assign(this.auditInfo, this.currRow && this.currRow.currPage)
      if (this.currRow && this.currRow.currPage) {
        this.formItemList = this.currRow.currPage.dataSource
      }
    },
    components: {
      BButton,
      BIcon,
      BFormItem,
      FormItemSet,
      BUpload,
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .form-set {
    overflow-x: auto;
    overflow-y: hidden;
    .oper-container {
      border: solid;
      border-bottom-width: 1px;
      border-top-width: 0;
      border-left-width: 0;
      border-right-width: 0;
      padding-bottom: 12px;
      .el-col:nth-child(1) {
        padding-right: 5px;
      }
      .el-col:nth-child(2) {
        padding-left: 5px;
      }
    }
    .content {
      display: flex;
      align-items: stretch;

      .left {
        padding: 15px 10px;
        overflow-y: auto;
        display: inline-block;
        vertical-align: top;
        width: 13%;
        min-width: 165px;
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
        width: 45%;
        .title {
          font-size: 16px;
          letter-spacing: 0;
          line-height: 14px;
          margin-bottom: 20px;
        }
        .middle-container {
          height: 100%;
          display: flex;
          flex-direction: column;
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
