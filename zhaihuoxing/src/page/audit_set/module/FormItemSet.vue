<template lang="pug">
  .form-item-set
    el-form(:model="item", :rules="cRules", ref="itemForm", label-width="140px", label-position="left")
      el-form-item(prop="label")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.title", v-ellipsis-title="")
        b-input(:model.sync="item.label", :placeholder="renderData.inputTitle")
      el-form-item(prop="placeholder")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.promptText", v-ellipsis-title="")
        b-input(:model.sync="item.placeholder", :placeholder="renderData.inputPromptText")
      el-form-item(v-show="item.type!='text' && computedRegexList && computedRegexList.length")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.verification", v-ellipsis-title="")
        b-select(:model.sync="item.rules", :placeholder="renderData.inputPromptText", :multiple='true', @change="ruleChange")
          el-option(:label="item.label", :value="item.name", v-for="item in computedRegexList", :key="item.name")

      template(v-if="item.type==='datetimerange'")
        el-form-item(prop="format")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.dateType", v-ellipsis-title="")
          el-radio-group.padding-top-10(v-model="item.format")
            b-radio(label="yyyy-MM-dd mm:ss") {{renderData.yMDTM}}
            b-radio(label="yyyy-MM-dd") {{renderData.yMD}}
        el-form-item(v-if="renderData.lengthCalculation !== undefined")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.lengthCalculation", v-ellipsis-title="")
          b-checkbox(:model.sync="item.hasInterval") {{renderData.enable}}

      template(v-if="item.type==='clause'")
        el-form-item
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.file", v-ellipsis-title="")
          b-upload(action="/upload", v-model="item.file", :uploadFileConfig="uploadFileConfig", @fileTypeNotRight="fileTypeNotRight")
            i.el-icon-upload
            .el-upload__text
              | {{renderData.dragClickUploadPrefix}}
              em {{renderData.dragClickUploadSuffix}}
            .el-upload__tip(slot="tip") {{renderData.formatRestrictionsNarrow}}

      template(v-if="item.type==='cascadeSelect'")
        el-form-item(prop="follow")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.followField", v-ellipsis-title="")
          b-select(:model.sync="item.follow", :placeholder="renderData.pleaseSelect", :multiple="true", valueKey="key")
            el-option(v-for="(op, idx) in allFormItems", :key="idx", :label="op.label", :value="op")
        el-form-item(prop="dataSource")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.optionSource", v-ellipsis-title="")
          b-select(:model.sync="item.dataSource", :placeholder="renderData.pleaseSelect")
            el-option(v-for="(source, idx) in sourceList", :key="idx", :label="source.label", :value="source.key")

      template(v-if="item.type==='select' || item.type==='multiple-select'")
        el-form-item.clear-margin-b(:rules="[{required: true}]")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.selectTerm", v-ellipsis-title="")
          el-row
            el-col(:span="20")
              span {{renderData.limit200MoreTerm40Character}}
        el-form-item.op-group(prop="dataSource")
          b-button.tag-group(size="small" v-for="(opt, $idx) in item.dataSource", :key="opt.key")
            span.tag-group-txt(v-ellipsis-title="") {{opt.label}}
            b-icon(iconName="delete", size="12px", @click.native='deleteOption($idx)')
          b-button(v-if="!addFlag" size="small", type="primary", @click="addFlag=true, initNewOption()") {{renderData.add}}

    el-form(v-if="item.type==='select' || item.type==='multiple-select'", :model="newOption", :rules="dataSourceRule", ref="newOptionForm", label-width="140px")
      el-form-item.addOption-form-item(v-if="addFlag", prop="label")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="newOption.label")
        b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="addFlag=false")
        b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addOption")

</template>

<script>
  //  import service from './service'
  import { constants, validator } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BCheckbox from 'components/BCheckbox'
  import BRadio from 'components/BRadio'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BUpload from 'components/BUpload'
  import BSelect from 'components/BSelect'
  import BFormItem from 'components/BFormItem'

  export default {
    name: 'form-item-set',
    data () {
      var _this = this
      var basicRules = {
        label: [
          {
            required: true,
            message: this.renderData.pleaseEnter,
            trigger: 'blur'
          },
          {
            regex: constants.length30Limit,
            message: this.renderData.textLength30And15,
            validator: validator.validate,
            trigger: 'blur, change'
          },
          {
            test (val) {
              return val.trim() === val
            },
            message: this.renderData.qianhouNoSpace,
            validator: validator.validate,
            trigger: 'blur, change'
          }
        ],
        format: [
          {
            required: true,
            message: this.renderData.pleaseSelect,
            trigger: 'blur'
          }
        ],
        placeholder: [
          {
            required: true,
            message: this.renderData.pleaseEnter,
            trigger: 'blur'
          },
          {
            test (val) {
              return val.trim() === val
            },
            message: this.renderData.qianhouNoSpace,
            validator: validator.validate,
            trigger: 'blur, change'
          },
          {
            regex: constants.length128Limit,
            message: this.renderData.textLength128,
            validator: validator.validate,
            trigger: 'blur, change'
          }
        ],
        dataSource: [],
        follow: [
          {
            required: true,
            message: this.renderData.pleaseSelect,
            trigger: 'blur'
          }
        ]
      }
      if (this.item.type === 'datetimerange' || this.item.type === 'input' || this.item.type === 'textarea') {
        basicRules.placeholder.push({
          required: true,
          message: this.renderData.pleaseEnter,
          trigger: 'blur'
        })
      } else if (this.item.type === 'cascadeSelect') {
        basicRules.dataSource.push({
          required: true,
          message: this.renderData.pleaseSelect,
          trigger: 'blur'
        })
      } else if (this.item.type === 'select' || this.item.type === 'multiple-select') {
        basicRules.dataSource.push({
          required: true,
          message: this.renderData.pleaseEnter,
          trigger: 'blur'
        })
      }
      return {
//        tmpRules: this.item.rules.map(rule => rule.name),
        cRules: basicRules,
        dataSourceRule: {
          label: [
            {
              required: true,
              message: _this.renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              message: _this.renderData.qianhouNoSpace,
              test (val) {
                return val.trim() === val
              },
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.text0To40Reg,
              message: _this.renderData.text0To40Limit,
              validator: validator.validate,
              trigger: 'blur'
            }
          ]
        },
        uploadFileConfig: {
          type: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
          maxSize: 500000 // 500K
        },
        newOption: {
          'label': ''
        },
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
          },
          '/api/audit_start/user_name_exist_validate': {
            name: '/api/audit_start/user_name_exist_validate',
            label: _this.renderData.userNameExistValidate,
            rule: {
              name: 'required',
              required: true,
              message: _this.renderData.pleaseInput,
              trigger: 'blur'
            }
          }
        },
        sourceList: [
//          {
//            label: '获取CODE',
//            key: '/api/get_code_account'
//          },
          {
            label: _this.renderData.getMT4Account,
            key: '/api/resource/audit_start/get_mt4_by_user_name'
          }
        ],
        addFlag: false
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      item: {
        type: Object,
        required: true
      },
      allFormItems: {
        type: Array,
        default () {
          return []
        }
      }
    },
    computed: {
      computedRegexList () {
        var reg = this.regexObj
        if (this.item.type === 'input') {
          return [reg.required, reg.longText, reg.number]
        } else if (this.item.type === 'textarea') {
          return [reg.required, reg.longText]
        } else if (this.item.type === 'cascadeSelect') {
          return [reg.required, reg.longText, reg.number, reg['/api/audit_start/user_name_exist_validate']]
        }
        return [reg.required]
      }
    },
    methods: {
      fileTypeNotRight () {
        this.$message.error('文件不符合规范')
      },
      validate (callback) {
        return this.$refs['itemForm'].validate(callback)
      },
      ruleChange () {
        this.$emit('ruleChange')
      },
      deleteOption (idx) {
        this.item.dataSource.splice(idx, 1)
      },
      addOption () {
        this.newOption.newKey = Date.now()
        this.item.dataSource.push(this.newOption)
        this.addFlag = false
        this.initNewOption()
      },
      initNewOption () {
        this.newOption = {
          label: '',
          key: '',
          newKey: ''
        }
      }
    },
    components: {
      BCheckbox,
      BRadio,
      BButton,
      BIcon,
      BFormItem,
      BUpload,
      BSelect,
      BInput
    },
    watch: {
//      tmpRules () {
//        var rules = []
//        this.computedRegexList.forEach(item => {
//          if (this.tmpRules.indexOf(item.name) !== -1) {
//            rules.push(item.rule)
//          }
//        })
//        console.log('rules', rules)
//        this.item.rules = rules
//      }
    },
    mounted () {}
  }
</script>

<style lang="less">
  .form-item-set {
    .padding-top-10 {
      padding-top: 10px;
    }
    .el-form-item__label{
      text-align: left!important;
    }
    .el-radio-group {
      line-height: 36px !important;
    }
    .margin-top {
      margin-top: 10px;
    }
    .clear-margin-b{
      margin-bottom: 0 !important;
    }
    .add-icon, .delete-icon {
      margin-top: 10px;
      position: relative;
      top: 10px;
      left: 10px;
    }
    .addOption-form-item {
      .b-input {
        width: 80%;
      }
      .b-icon {
        width: 8%;
        text-align: center;
        display: inline-block;
      }
    }

    .tag-group {
      margin: 0 8px 6px 0!important;
      .b-icon {
        margin-left: 14px;
      }
      .tag-group-txt {
        max-width: 300px;
        display: inline-block;
      }
    }
  }
</style>
