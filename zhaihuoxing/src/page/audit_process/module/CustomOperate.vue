<template lang="pug">
  b-dialog.custom-operate(:show='true', width="38%", :show-close="true", :before-close="beforeClose")
    el-form.margin-top(:rules="cRules", :model="action", ref="action", label-width="140px", label-position="left")
      el-form-item(prop="value")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="action.label", v-ellipsis-title="")
        b-form-item(:model.sync='action.value', :item='action', :disabled="disabled")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="saveResult", type="primary", v-if="!disabled") {{renderData.save}}
</template>

<script>
  import { constants, validator } from 'common/js/Utils'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BFormItem from 'components/BFormItem'

  export default {
    name: 'custom-operate',
    data () {
      var _this = this
      return {
        action: {
          dataSource: [],
          dateType: '',
          file: {},
          format: '',
          hasInterval: false,
          icon: 'inputbox',
          key: 'input',
          label: '',
          name: '',
          placeholder: '',
          rules: [],
          type: '',
          value: ''
        },
        cRules: {},
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
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    computed: {
      disabled () {
        return this.currRow.origin === 'audit_history' || this.currRow.origin === 'audit_history_component'
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      saveResult () {
        this.$refs['action'].validate(valid => {
          if (valid) {
            this.visible.dialog = null
          }
        })
      }
    },
    watch: {
      action: {
        handler () {
          Object.assign(this.currRow.currResult.action, this.action)
        },
        deep: true
      }
    },
    mounted () {
      Object.assign(this.action, this.currRow.currResult.action)
      this.cRules = {
        'value': (this.action.rules || []).map(ruleName => this.regexObj[ruleName].rule)
      }
    },
    components: {
      BFormItem,
      BDialog,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less" scoped>
  .custom-operate {
    .margin-top {
      margin-top: 30px;
    }
  }
</style>
