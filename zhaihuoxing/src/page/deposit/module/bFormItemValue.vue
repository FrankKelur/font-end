<template lang="pug">
  .b-form-item
    el-form(:model="form", ref="form", label-width="140px", label-position="left")
      el-form-item(v-for="(item, idx) in formItemList", :key="idx", :prop="'others.' + item.key", :rules="getRules(item)")
        span(slot="label") {{item.type=='clause'?'':item.label}}
        b-form-item.input-long-type1(:model.sync="form.others[item.key]", :item="item", @change="itemChange", :renderData="renderData")
</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BFormItem from 'components/BFormItem'
  import utils from 'common/js/Utils'

  export default {
    mixins: [componentMixin],
    name: '',
    data () {
      let renderData = window.renderData.components.deposit.deposit_auth
      return {
        renderData: renderData,
        messageMap: {
          number: renderData.numberMessage,
          longText: renderData.longTextMessage,
          required: renderData.requiredMessage
        },
        formItemList: {},
        data: {},
        form: {
          others: {}
        }
      }
    },
    props: {
      customField: {
        required: true
      }
    },
    methods: {
      getRules (item) {
        var rules = (item.rules || []).map(rule => {
          let res = utils.constants.ruleMap[rule]
          if (rule === 'required' && item.type === 'multiple-select') {
            res = {
              name: 'required',
              validator: utils.validator.validate,
              test (val) {
                if (val.length === 0) {
                  return false
                } else {
                  return true
                }
              },
              trigger: 'blur,change'
            }
          }
          if (rule === 'required' && item.type === 'clause') {
            res = {
              name: 'required',
              validator: utils.validator.validate,
              test (val) {
                return !!val // 要求checkbox 必须为true
              },
              trigger: 'blur,change'
            }
          }
          if (rule.includes('api') && !res) {
            res = {
              name: rule,
              trigger: 'blur,change',
              test (val) {
                let params = {key: val}
                Object.assign(params, item.params)
                return fetch(rule, params)
              },
              validator: utils.validator.validate
            }
            return res
          }
          res.message = this.messageMap[res.name]
          return res
        })
        return rules
      },
      itemChange (item) {
        let beDependentItems = []
        beDependentItems.forEach(elm => {
          this.form.others[elm.key] = ''
          this.itemChange(elm, '')
          if (!elm.params) {
            this.$set(elm, 'params', {[item.key]: this.form.others[item.key]})
          } else {
            elm.params[item.key] = this.form.others[item.key]
          }
        })
      },
      validate (cb) {
        var res = true
        this.$refs['form'] && this.$refs['form'].validate(valid => { res = res & valid })
        cb(res, this.form)
      }
    },
    mounted () {
      this.formItemList = this.customField
      this.formItemList.forEach(formItem => {
        formItem.value = this.form.others[formItem.key]
      })
    },
    components: {
      BFormItem
    }
  }
</script>

<style lang="less">
</style>
