<template lang="pug">
  .diy-setting
    .content
      .left
        el-form(ref="leftForm", :model="customList", :rules="leftRules")
          .class-item(v-for="(classItem, idxClass) in classList", :key="idxClass")
            template(v-show="editingItem!==classItem")
              .title
                span(v-ellipsis-title="") {{classItem.label}}
                b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active.amend(iconName="edit", @click.native="editClsInput(classItem)", v-if="classItem.custom")
                b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.native="deleteResource(classItem, classItem)", v-if="classItem.custom")
            el-form-item.newResource-status-form-item(v-show="editingItem==classItem", prop="newResource")
              b-input(:placeholder="renderData.pleaseEnter", :model.sync="customList.newResource")
              b-icon.theme-color-C.theme-color-G-hover.empty-icon(iconName='message_failure', @click.native="editingItem=null")
              b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="editCls()")

            .resource-item.theme-bg-lightenC32-hover(v-for="(resourceItem, idxResource) in classItem.dataSource", :key="idxResource", :class="{'theme-bg-I': (resourceItem && (resourceInfo.key===resourceItem.key))}", @click="editResource(resourceItem, classItem, idxClass, idxResource)")
              span(v-ellipsis-title="") {{resourceItem.label}}
              //b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click.native="editResource(resourceItem, classItem)")
              b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.native="deleteResource(resourceItem, classItem, idxClass, idxResource)")
            .customize-class.theme-color-A.pointer(v-if="addingItem!=classItem", @click="addResourceMod(classItem, idxClass)")
              b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active.add-icon(iconName="CombinedShapeCopy")
              span.margin-add-icon {{renderData.addDiyField}}
            .resource-item.theme-bg-lightenC32-hover.theme-bg-I(v-if="addingItem==classItem")
              span(v-ellipsis-title="") {{resourceInfo.label}}
            //el-form-item.newResource-status-form-item(v-if="addingItem==classItem", prop="newResource")
            //  b-input(:placeholder="renderData.pleaseEnter", :model.sync="customList.newResource")
            //  b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="addingItem=null")
            //  b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addResource(classItem, idxClass)")
          .class-item
            b-button(size="small", @click.native="addCustomResourceMod('addCls')", type="primary" v-if="addingItem!='addCls'") {{renderData.addDiyCategory}}
            el-form-item.newResource-status-form-item(v-if="addingItem=='addCls'", prop="newResource")
              b-input(:placeholder="renderData.pleaseEnter", :model.sync="customList.newResource")
              b-icon.theme-color-C.theme-color-G-hover.empty-icon(iconName='message_failure', @click.native="addingItem=null")
              b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addResource()")
          .operation-container
            b-button(size="small", @click.native="backProfileSetting") {{renderData.backToUserProfile}}
      .right.theme-bg-I
        template(v-if="!resourceInfo.empty")
          el-form(:model="resourceInfo", ref="resourceInfo", :rules="rules", label-width="80px")
            //el-form-item(prop="key", :label="renderData.diyField")
              b-input(:model.sync="resourceInfo.key", :placeholder="renderData.pleaseEnter")
            el-form-item(prop="type", :label="renderData.diyFieldType")
              b-select(:model.sync="resourceInfo.type", :placeholder="renderData.pleaseSelect", @change="resourceTypeChange")
                el-option(v-for="(item, idx) in typeList", :key="idx", :label="item.label", :value="item.key")
          form-item-set(:item="resourceInfo", :renderData="renderData", ref="formItemSet")
          .footer
            b-button(type="primary" ,@click="saveResource") {{renderData.save}}

</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import FormItemSet from '@/page/audit_set/module/FormItemSet'
  import DeleteDiySetting from './DeleteDiySetting.vue'
  import { constants, validator } from 'common/js/Utils'
  import Bus from 'common/js/bus'

  export default {
    name: 'diy-setting',
    data () {
      var _this = this
      var resInfo = _this.initResource()
      return {
        childValidRes: Boolean,
        leftForm: {},
        rules: {
          type: [
            {
              required: true,
              message: _this.renderData.pleaseSelect,
              trigger: 'blur'
            },
            {
              regex: constants.noSpace,
              message: _this.renderData.noSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: _this.renderData.length30Limit,
              validator: validator.validate,
              trigger: 'blur'
            }
          ]
        },
        customList: {
          newResource: ''
        },
        addingItem: null,
        addingIdx: -1,
        editingItem: null,
        optClass: -1,
        optResource: -1,
        resourceInfo: resInfo,
        typeList: [
          {
            key: 'input',
            type: 'input',
            icon: 'inputbox',
            label: _this.renderData.singleLineInputBox
          },
          {
            key: 'textarea',
            type: 'textarea',
            icon: 'multilineinputbox',
            label: _this.renderData.multipleInputBox
          },
          {
            key: 'select',
            type: 'select',
            icon: 'radio',
            dataSource: [],
            label: _this.renderData.radio
          },
          {
            key: 'multiple-select',
            type: 'select',
            icon: 'checkbox',
            multiple: true,
            dataSource: [],
            label: _this.renderData.checkbox
          },
          {
            key: 'datetimerange',
            type: 'datetimerange',
            icon: 'date',
            label: _this.renderData.dateRange,
            format: 'yyyy-MM-dd mm:ss',
            hasInterval: false
          },
          {
            key: 'text',
            type: 'text',
            icon: 'explanatorytext',
            label: _this.renderData.info
          },
          {
            key: 'clause',
            type: 'clause',
            icon: 'file',
            label: _this.renderData.clause
          }
        ],
        classList: [],
        diyData1: '',
        diyData2: ''
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
      profileInfo: {
        type: Object,
        required: true
      }
    },
    methods: {
      resourceTypeChange () {
        if (this.resourceInfo.type === 'select' || this.resourceInfo.type === 'multiple-select') {
          this.resourceInfo.depth = 2
        } else {
          this.resourceInfo.depth = 1
        }
      },
      backProfileSetting () {
        this.visible.page = null
      },
      addCustomResourceMod (cls, resource) {
        this.customList.newResource = ''
        this.addingItem = cls
        if (cls === 'addCls') {
          this.resourceInfo.empty = true
        }
      },
      addResourceMod (resource, idxClass) {
        this.customList.newResource = ''
        this.addingItem = resource
        this.addingIdx = idxClass
        this.resourceInfo = this.initResource()
      },
      // z todo 编辑分组
      editCls (classItem) {
        this.$refs['leftForm'].validate(valid => {
          if (valid) {
            var params = {
              key: this.editingItem.key,
              label: this.customList.newResource,
              old_label: this.editingItem.label
            }
            service.editCls(params).then(res => {
              this.getCustomizedSetting()
              this.editingItem = ''
            })
          }
        })
      },
      addResource (classItem, idxClass) {
        this.$refs['leftForm'].validate(valid => {
          if (valid) {
            var params = {
              path: [],
              label: this.customList.newResource
            }
            if (classItem) {
              params.path.push(classItem.key)
            }
            service.addCustomResource(params).then(res => {
              if (classItem) {
                var idxResource = this.classList[idxClass].dataSource.length
                this.getCustomizedSetting(idxClass, idxResource)
              } else {
                this.getCustomizedSetting()
              }
              this.addingItem = ''
            })
          }
        })
      },
      deleteResource (resource, cls, idxClass, idxResource) {
        this.$confirm(
          this.renderData.confirmDeleteDiyText,
          this.renderData.prompt,
          {
            confirmButtonText: this.renderData.confirm,
            cancelButtonText: this.renderData.cancel,
            type: 'warning'
          }
        ).then(({ value }) => {
          var path = [cls.key]
          if (resource === cls) {
            path = []
          }
          var params = {
            path: path,
            key: resource.key,
            label: resource.label
          }
          service.deleteCustomResource(params).then(res => {
            if (res.re === '200') {
              this.getCustomizedSetting(idxClass, idxResource)
            }
          })
          this.$message({
            type: 'success',
            message: this.renderData.deleteSucceed
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.renderData.cancel
          })
        })
      },
      editClsInput (cls) {
        this.editingItem = cls
        this.customList.newResource = cls.label
      },
      editResource (resource, cls, idxClass, idxResource) {
        this.addingItem = ''
        this.addingIdx = -1
        this.optClass = idxClass
        this.optResource = idxResource
        var tmp = this.initResource()
        this.resourceInfo = Object.assign(tmp, resource)
        this.resourceInfo.parent = cls
//        this.resourceInfo.empty = false
      },
      async saveResource () {
        Bus.$emit('checkForm', 'checkFormItemSet')
        console.log('resourceInfo', this.resourceInfo)
        this.$refs['resourceInfo'].validate(valid => { this.childValidRes = this.childValidRes && valid })
        this.$refs['formItemSet'].validate(valid => { this.childValidRes = this.childValidRes && valid })
        if (this.childValidRes) {
          var params = this.profileInfo
          if (this.addingIdx >= 0) {
            params.key = this.addingItem.key
          } else {
            params.key = this.resourceInfo.parent && this.resourceInfo.parent.key
          }
          var resourceInfo = Object.assign({}, this.resourceInfo)
          console.log('saveResource', resourceInfo.file, resourceInfo.file.changed)
          if (resourceInfo.file.changed) {
            var {re, url} = await this.uploadCDN(resourceInfo)
            resourceInfo.file.url = url
            console.log('re, url', re, url)
          }
          delete resourceInfo['parent']
          if (resourceInfo['type'] === 'input' || resourceInfo['type'] === 'textarea' || resourceInfo['type'] === 'text') {
            delete resourceInfo['dataSource']
            delete resourceInfo['file']
            delete resourceInfo['dateType']
            delete resourceInfo['format']
            delete resourceInfo['hasInterval']
          }
          if (resourceInfo['type'] === 'datetimerange') {
            delete resourceInfo['dataSource']
            delete resourceInfo['file']
          }
          if (resourceInfo['type'] === 'select' || resourceInfo['type'] === 'multiple-select') {
            delete resourceInfo['file']
            delete resourceInfo['dateType']
            delete resourceInfo['format']
            delete resourceInfo['hasInterval']
          }
          if (resourceInfo['type'] === 'clause') {
            delete resourceInfo['dateType']
            delete resourceInfo['format']
            delete resourceInfo['dataSource']
            delete resourceInfo['hasInterval']
          }
          var isRequired = resourceInfo['rules'].find(rule => rule === 'required')
          if (isRequired) {
            resourceInfo.required = true
          }
          params.data = resourceInfo
          service.saveResource(params).then(res => {
            if (this.addingIdx === -1) {
              this.getCustomizedSetting(this.optClass, this.optResource)
            } else {
              var idxResource = this.classList[this.addingIdx].dataSource.length
              this.getCustomizedSetting(this.addingIdx, idxResource)
              this.addingItem = ''
              this.addingIdx = -1
            }
          })
        }
      },
      uploadCDN (resourceInfo) {
        // 如果文件有改动，则上传至CDN， 然后把url，name让如file中
        var uploadParams = {}
        uploadParams = {originPath: resourceInfo.file.url}
        delete resourceInfo.file['changed']
        return service.uploadCDN(uploadParams)
      },
      getCustomizedSetting (idxClass, idxResource) {
        var params = {}
        service.getCustomizedSetting(params).then(({data, custom}) => {
          var classList = []
          if (this.renderData.user_profile_setting_basic_info_diy) {
            classList.push({
              label: this.renderData.userProfileBasicInfo,
              key: 'base_info',
              dataSource: data.base_info
            })
          }
          if (this.renderData.user_profile_setting_job_info_diy) {
            classList.push({
              key: 'investor_info',
              label: this.renderData.userProfileJobInfo,
              dataSource: data.investor_info
            })
          }
          if (this.renderData.user_profile_setting_file_diy) {
            classList.push({
              key: 'files',
              label: this.renderData.userProfileFile,
              dataSource: data.files
            })
          }
          for (var key in custom) {
            var label = custom[key]
            classList.push({
              key: key,
              label: label,
              custom: true,
              dataSource: data[key]
            })
          }
          this.classList = classList
          if (idxClass >= 0 && idxResource >= 0) {
            var length = classList[idxClass].dataSource.length - 1
            if (idxResource > length) {
              this.editResource(classList[idxClass].dataSource[length], classList[idxClass])
            } else {
              this.editResource(classList[idxClass].dataSource[idxResource], classList[idxClass])
            }
          } else if (classList.length) {
            if (classList[0].dataSource.length) {
              this.editResource(classList[0].dataSource[0], classList[0])
            }
          }
        })
      },
      initResource () {
        return {
          empty: false, // 初始化状态
          checked: false, // 默认为未选中
          required: false,  // 默认非必填
          system: false, // 非系统资源
          type: '',
          name: '',
          key: '',
          dateType: '',
          format: '',
          hasInterval: false,
          label: '',
          placeholder: '',
          rules: [],
          file: {},
          dataSource: []
        }
      }
    },
    mounted () {
      this.getCustomizedSetting()
      var vm = this
      Bus.$on('checkResult', function (val) {
        vm.childValidRes = val
      })
    },
    computed: {
      leftRules () {
        if (this.addingItem || this.editingItem) {
          return {
            newResource: [
              {
                required: true,
                message: this.renderData.pleaseEnter,
                trigger: 'blur'
              },
              {
                regex: constants.qianhouNoSpace,
                message: this.renderData.qianhouNoSpace,
                validator: validator.validate,
                trigger: 'blur'
              },
              {
                test (val) {
                  return val.length <= 30
                },
                validator: validator.validate,
                message: this.renderData.textLength30,
                trigger: ['change', 'blur']
              }
            ]
          }
        }
      }
    },
    components: {
      'delete_diy_setting': DeleteDiySetting,
      FormItemSet,
      BIcon,
      BInput,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less">
  .diy-setting {
    position: absolute;
    width: 100%;
    top: 74px;
    bottom: 0;
    .content{
      position: relative;
      height: 100%;
      .title {
        font-size: 16px;
        padding: 20px 0;
        .amend svg{
          font-size: 14px!important;
        }
        span:nth-child(1) {
          width: 80%;
          display: inline-block;
        }
        span:nth-child(2) {
          width: 6%;
          margin-left: 3%;
          text-align: center;
          display: inline-block;
        }
        span:nth-child(3) {
          width: 6%;
          margin-left: 1%;
          text-align: center;
          display: inline-block;
        }
      }
      flex-grow: 1;
      display: flex;
      .left {
        width: 32%;
        top: 0;
        bottom: 0;
        position: absolute;
        /*overflow: auto;*/
        .customize-class {
          padding-left: 12%;
          line-height: 40px;
          margin: 12px 0;
        }
        .add-icon svg{
          font-size: 14px!important;
        }
        .margin-add-icon {
          margin-left: 5px;
        }
        .el-form-item.newResource-status-form-item {
          /*padding-left: 12%;*/
          .b-icon {
            width: 8%;
            text-align: center;
            display: inline-block;
            text-align: center;
          }
          .empty-icon svg{
            font-size: 12px!important;
          }
          .b-input {
            width: 80%;
          }
        }
        .el-form {
          /*height: 85%;*/
          height: 100%;
          overflow: auto;
        }
        .resource-item {
          cursor: pointer;
          padding-left: 12%;
          /*line-height: 40px;*/
          height: 40px;
          .el-form-item__content {
            padding-left: 12%;
          }
          span:nth-child(1) {
            width: 77%;
            display: inline-block;
            height: 40px;
            line-height: 40px;
          }
          span:nth-child(2) {
            width: 8%;
            margin-left: 11%;
            text-align: center;
            display: inline-block;
            vertical-align: top;
            margin-top: 13px;
          }
          /*span:nth-child(3) {*/
          /*width: 8%;*/
          /*text-align: center;*/
          /*display: inline-block;*/
          /*}*/
        }
        .b-icon {
          marign-right: 10px;
        }
        .operation-container {
          margin-top: 60px;
        }
      }
      .right {
        width: 68%;
        top: 0;
        bottom: 0;
        left: 32%;
        position: absolute;
        flex-grow: 1;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        /*padding-left: 4%;*/
        padding: 4%;
      }
    }
    .el-button--small {
      height: 36px;
    }
  }

</style>
