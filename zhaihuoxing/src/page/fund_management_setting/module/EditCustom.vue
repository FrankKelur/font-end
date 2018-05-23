<template lang="pug">
  b-dialog.edit_custom(:show='true', :title="renderData.customFieldEdit", width="38%", :show-close="true", :before-close="beforeClose")
    .status_one(v-show="isShow")
      el-form(:model="resourceInfo", ref="resourceInfo", :rules="rules", label-width="140px", label-position="left")
        el-form-item(prop="type")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.fieldType", v-ellipsis-title="")
          b-select(:model.sync="resourceInfo.type", :placeholder="renderData.pleaseSelect", @change="resourceTypeChange")
            el-option(v-for="(item, idx) in typeList", :key="idx", :label="item.label", :value="item.key")
      form-item-set(:item="resourceInfo", :renderData="renderData", ref="formItemSet")
    .status_two(v-show="isShow1")
      el-form(:model="resourceInfo", ref="resourceInfo", :rules="rules", label-width="140px", label-position="left")
        el-form-item(prop="label")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.option", v-ellipsis-title="")
          b-input(:model.sync="resourceInfo.label", :placeholder="renderData.pleaseEnter")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="saveResource", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import FormItemSet from '@/page/audit_set/module/FormItemSet'
  import service from '../service'

  export default {
    name: 'edit_custom',
    data () {
      var resInfo = this.initResource()
      return {
        isShow: true,
        isShow1: false,
        resourceInfo: resInfo,
        childValidRes: Boolean,
        addingIdx: -1,
        addingItem: null,
        optClass: -1,
        optResource: -1,
        rules: {
          type: [
            {
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'blur,change'
            }
          ]
        },
        typeList: [
          {
            key: 'input',
            type: 'input',
            icon: 'inputbox',
            label: this.renderData.singleLineInputBox
          },
          {
            key: 'textarea',
            type: 'textarea',
            icon: 'multipleLineInputBox',
            label: this.renderData.multipleLineInputBox
          },
          {
            key: 'select',
            type: 'select',
            icon: 'select',
            dataSource: [],
            label: this.renderData.select
          },
          {
            key: 'multiple-select',
            type: 'select',
            icon: 'multipleSelect',
            multiple: true,
            dataSource: [],
            label: this.renderData.multipleSelect
          },
          {
            key: 'datetimerange',
            type: 'datetimerange',
            icon: 'date',
            label: this.renderData.dateRange,
            format: 'yyyy-MM-dd mm:ss',
            hasInterval: false
          },
          {
            key: 'clause',
            type: 'clause',
            icon: 'file',
            label: this.renderData.clause
          }
        ]
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
      prop: {
        type: Object,
        required: true
      },
      idx: {
        type: Number,
        required: true
      },
      idx1: {
        type: Number,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      initResource () {
        return {
          empty: false, // 初始化状态
          checked: false, // 默认为未选中
          required: true,  // 默认非必填
          system: false, // 非系统资源
          type: '',
          key: '',
          label: '',
          placeholder: '',
          file: {},
          dataSource: []
        }
      },
      resourceTypeChange () {
        if (this.resourceInfo.type === 'select' || this.resourceInfo.type === 'multiple-select') {
          this.resourceInfo.depth = 2
        } else {
          this.resourceInfo.depth = 1
        }
      },
      async saveResource () {
        this.$refs['resourceInfo'].validate(valid => { this.childValidRes = this.childValidRes && valid })
        this.$refs['formItemSet'].validate(valid => { this.childValidRes = this.childValidRes && valid })
        if (this.childValidRes) {
          var vm = this.prop.data.customField
          if (this.addingIdx >= 0) {
            vm.key = this.addingItem.key
          } else {
            vm.key = this.resourceInfo.parent && this.resourceInfo.parent.key
          }
          var resourceInfo = Object.assign({}, this.resourceInfo)
          if (resourceInfo.file.changed) {
            var {url} = await this.uploadCDN(resourceInfo)
            resourceInfo.file.url = url
          }
          delete resourceInfo['parent']
          if (resourceInfo['type'] === 'input' || resourceInfo['type'] === 'textarea') {
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
          if (resourceInfo['rules'] !== undefined) {
            var isRequired = resourceInfo['rules'].find(rule => rule === 'required')
          } else {
            isRequired = false
          }
          if (isRequired) {
            resourceInfo.required = true
          }
          vm.data = resourceInfo
          var data = vm.data
          var idx = this.idx
          this.$emit('sendEditData', data, idx, this.idx1)
          this.visible.dialog = null
        }
      },
      getSetting () {
        this.addingIdx = -1
        this.addingItem = ''
        this.optClass = this.idx
        this.optResource = this.idx1
        var tmp = this.initResource()
        this.resourceInfo = Object.assign(tmp, this.prop.data.customField[this.optResource])
        this.resourceInfo.parent = this.prop
        if (this.isShow1) {
          this.isShow1 = false
          this.isShow = true
        }
        if (this.resourceInfo.parent.key === 'files') {
          this.isShow = false
          this.isShow1 = true
        }
      },
      uploadCDN (resourceInfo) {
        // 如果文件有改动，则上传至CDN， 然后把url，name让如file中
        var uploadParams = {}
        uploadParams = {originPath: resourceInfo.file.filename}
        delete resourceInfo.file['changed']
        return service.uploadCDN(uploadParams)
      }
    },
    async mounted () {
      await this.getSetting()
    },
    components: {
      BDialog,
      BInput,
      BButton,
      FormItemSet,
      BSelect
    }
  }
</script>

<style lang="less" scoped>
  .status_one{
    .form-item-set{
      margin-top: 20px;
    }
  }
</style>
