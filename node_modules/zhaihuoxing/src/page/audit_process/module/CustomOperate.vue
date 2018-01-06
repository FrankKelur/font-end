<template lang="pug">
  b-dialog.custom-operate(:show='true', width="38%", :show-close="true", :before-close="beforeClose")
    el-form(:rules="cRules", :model="action", ref="action")
      el-form-item(label-width="80px", :prop="action.field", :label="action.label")
        b-form-item(:model.sync='action.value', :item='action')
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="saveResult", type="primary") {{renderData.save}}
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
          label: ''
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
    mounted () {
      Object.assign(this.action, this.currRow.currAction)
      Object.assign(this.cRules, {
        'value': this.action.rules.map(ruleName => this.regexObj[ruleName].rule)
      })
    },
    components: {
      BFormItem,
      BDialog,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less">
  .custom-operate {
  }
</style>
