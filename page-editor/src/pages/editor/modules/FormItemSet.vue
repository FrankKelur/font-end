<template lang="pug">
  el-form.form-item-set(:model="item", :rules="cRules", ref="itemForm")
    el-form-item(:label="renderData.title", label-width="80px", prop="label")
      b-input(:model.sync="item.label", :placeholder="renderData.inputTitle")
    el-form-item(:label="renderData.promptText", label-width="80px", prop="placeholder")
      b-input(:model.sync="item.placeholder", :placeholder="renderData.inputPromptText")
    el-form-item(:label="renderData.verification", label-width="80px", v-show="item.type!='text' && computedRegexList && computedRegexList.length")
      b-select(:model.sync="item.rules", :placeholder="renderData.inputPromptText", :multiple='true', @change="ruleChange")
        el-option(:label="item.label", :value="item.name", v-for="item in computedRegexList", :key="item.name")
    el-form-item(:label="renderData.showAuth")
      b-checkbox(:model.sync="item.list") {{renderData.list}}
      b-checkbox(:model.sync="item.detail") {{renderData.detail}}
      b-checkbox(:model.sync="item.edit") {{renderData.edit}}
      b-checkbox(:model.sync="item.search") {{renderData.search}}
    template(v-if="item.type==='datetimerange'")
      el-form-item(:label="renderData.dateType", label-width="80px", prop="format")
        el-radio-group(v-model="item.format")
          b-radio(label="yyyy-MM-dd mm:ss") {{renderData.yMDTM}}
          b-radio(label="yyyy-MM-dd") {{renderData.yMD}}
      //el-form-item(:label="renderData.verification", label-width="80px")
        b-checkbox(:model.sync="item.hasInterval") {{renderData.enable}}

    template(v-if="item.type==='select' || item.type==='multiple-select'")
      el-form-item.clear-margin-b(:label="renderData.selectTerm", label-width="80px", :rules="[{required: true}]")
        el-row
          el-col(:span="20")
            span {{renderData.limit200MoreTerm40Character}}
      el-form-item.op-group(prop="dataSource")
        b-button.tag-group(size="small" v-for="(opt, $idx) in item.dataSource", :key="opt.key")
          span.tag-group-txt(v-ellipsis-title="") {{opt.label}}
          b-icon(iconName="delete", size="12px", @click.native='deleteOption($idx)')
        b-button(v-if="!addFlag" size="small", type="primary", @click="addFlag=true, initNewOption") {{renderData.add}}
      el-form-item.addOption-form-item(v-if="addFlag", prop="newOption", :rules="dataSourceRule")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="newOption.label")
        b-icon.theme-color-C.theme-color-G-hover(iconName='message_failure', @click.native="addFlag=false, initNewOption")
        b-icon.theme-color-C.theme-color-E-hover(iconName='message_success', @click.native="addOption")

    template(v-if="item.type==='clause'")
      el-form-item(:label="renderData.file", label-width="80px")
        b-upload(action="/upload", v-model="item.file", :uploadFileConfig="uploadFileConfig", @fileTypeNotRight="fileTypeNotRight")
          i.el-icon-upload
          .el-upload__text
            | {{renderData.dragClickUploadPrefix}}
            em {{renderData.dragClickUploadSuffix}}
          .el-upload__tip(slot="tip") {{renderData.formatRestrictionsNarrow}}

    template(v-if="item.type==='cascadeSelect'")
      el-form-item(:label="renderData.followField", label-width="80px", prop="follow")
        b-select(:model.sync="item.follow", :placeholder="renderData.pleaseSelect", :multiple="true")
          el-option(v-for="(op, idx) in allFormItems", :key="idx", :label="op.label", :value="op.key")
      el-form-item(:label="renderData.optionSource", label-width="80px", prop="dataSource")
        b-select(:model.sync="item.dataSource", :placeholder="renderData.pleaseSelect")
          el-option(v-for="(source, idx) in sourceList", :key="idx", :label="source.label", :value="source.key")
</template>

<script>
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
      return {
//        tmpRules: this.item.rules.map(rule => rule.name),
        dataSourceRule: [
          {
            required: true,
            message: _this.renderData.pleaseEnter,
            trigger: 'blur'
          },
          {
            regex: constants.qianhouNoSpace,
            message: _this.renderData.qianhouNoSpace,
            validator: validator.validate,
            trigger: 'blur'
          },
          {
            regex: constants.text0To40Reg,
            message: _this.renderData.text0To40Limit,
            validator: validator.validate,
            trigger: 'blur'
          }
        ],
        uploadFileConfig: {
          type: ['pdf', 'msword', 'wordprocessingml.document', 'ms-excel'],
          maxSize: 500000 // 500K
        },
        newOption: {
          'label': '',
          'key': ''
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
        if (this.item.type === 'input' || this.item.type === 'textarea') {
          return [reg.required, reg.longText, reg.number]
        } else if (this.item.type === 'cascadeSelect') {
          return [reg.required, reg.longText, reg.number, reg['/api/audit_start/user_name_exist_validate']]
        }
        return [reg.required]
      },
      cRules () {
        var basicRules = {
          label: [
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
            }
          ],
          format: [
            {
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'change'
            }
          ],
          placeholder: [
            {
              regex: constants.text0To10Reg,
              message: this.renderData.text0To10Limit,
              validator: validator.validate,
              trigger: 'blur'
            }
          ],
          dataSource: [],
          follow: [
            {
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'change'
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
            trigger: 'change'
          })
        } else if (this.item.type === 'select' || this.item.type === 'multiple-select') {
          basicRules.dataSource.push({
            required: true,
            message: this.renderData.pleaseEnter,
            trigger: 'change, blur'
          })
        }
        return basicRules
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
        this.newOption.key = this.newOption.label
        this.item.dataSource.push(this.newOption)
        this.addFlag = false
        this.initNewOption()
      },
      initNewOption () {
        this.newOption = {
          label: '',
          key: ''
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
    mounted () {
    }
  }
</script>

<style lang="less">
  .form-item-set {
    .el-radio-group {
      line-height: 36px !important;
    }
    .margin-top {
      margin-top: 10px;
    }
    .clear-margin-b {
      margin-bottom: 0 !important;
    }
    .add-icon, .delete-icon {
      margin-top: 10px;
      position: relative;
      top: 10px;
      left: 10px;
    }
    .op-group {
      margin-left: 80px;
    }
    .addOption-form-item {
      width: 300px;
      margin-left: 80px;
      .b-input {
        width: 220px;
      }
      .b-icon {
        width: 8%;
        text-align: center;
        display: inline-block;
        text-align: center;
      }
    }

    .tag-group {
      margin: 0 8px 6px 0 !important;
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
