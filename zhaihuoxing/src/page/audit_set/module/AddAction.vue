<template lang="pug">
  b-dialog.add-action(:show.sync='dialogVisible', :title="renderData.addAction", :show-close="true", width="38%", :before-close="beforeClose")
    el-form(:model="action", ref="addAction", :rules="rules", label-width="140px", label-position="left")
      //el-form-item(:label="renderData.fieldName", prop="name.label")
        b-input(:model.sync="action.name", :placeholder="renderData.pleaseInput")
      el-form-item(prop="key")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.inputType", v-ellipsis-title="")
        b-select(:model.sync="action.key", :placeholder="renderData.pleaseSelect", @change="actionKeyChange")
          el-option(v-for="(item, idx) in typeList", :key="idx", :label="item.label", :value="item.key")
      form-item-set(:item="action", :renderData="renderData", ref="formItemSet" v-show="action.key")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="addAction", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
//  import { constants, validator } from 'common/js/Utils'
  import FormItemSet from '@/page/audit_set/module/FormItemSet'
  //  import service from '../service'

  export default {
    name: 'add-action',
    data () {
      var _this = this
      return {
        dialogVisible: true,
        showClose: false,
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
//          {
//            key: 'text',
//            type: 'text',
//            icon: 'explanatorytext',
//            label: _this.renderData.info
//          },
          {
            key: 'clause',
            type: 'clause',
            icon: 'file',
            label: _this.renderData.clause
          }
        ],
        action: {
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
        },
        rules: {
//          'name.label': [
//            {
//              required: true,
//              message: _this.renderData.pleaseInput,
//              trigger: 'blur'
//            },
//            {
//              regex: constants.length128Limit,
//              validator: validator.validate,
//              message: _this.renderData.textLength128,
//              trigger: 'blur'
//            },
//            {
//              test (val) {
//                return val.trim() === val
//              },
//              validator: validator.validate,
//              message: _this.renderData.noAllowSpace,
//              trigger: 'blur'
//            }
//          ],
          key: [
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
      actionKeyChange () {
        var typeInfo = this.typeList.find(type => this.action.key === type.key)
        Object.assign(this.action, typeInfo)
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      addAction () {
        var validRes = true
        this.$refs['addAction'].validate(valid => {
          validRes = validRes && valid
        })
        this.$refs['formItemSet'].validate(valid => {
          validRes = validRes && valid
        })
        if (validRes) {
          var result = this.currRow.stepInfo.currResult
          this.$set(result, 'action', this.action)
          this.visible.dialog = null
        }
      }
    },
    mounted () {
      var action = this.currRow.stepInfo.currResult.action
      Object.assign(this.action, action)
    },
    components: {
//      BIcon,
      FormItemSet,
      BSelect,
      BInput,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .add-action {
  }
</style>
