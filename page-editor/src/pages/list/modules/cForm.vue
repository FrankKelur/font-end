<template lang="pug">
  el-form.custom-form(:model="model", ref="tempForm", labelPosition='left')
    el-form-item(:label-width="labelWidth", :prop="item.key", :rules="getRules(item)" v-for="(item, idx) in cFormItemList", :key="idx", :label="item.type=='clause'?'':item.label" v-if="show(item)")
      b-form-item(:model.sync='model[item.key]', :item='item', @change="itemChange", :disabled="disabled", :renderData="renderData")
</template>

<script>
  import { constants, validator, fetch } from 'common/js/Utils'
  import BFormItem from 'components/BFormItem'
  //  import service from '../service'

  export default {
    name: 'c-form',
    data () {
      return {
        allFieldsMap: {},
        messageMap: {
          number: this.renderData.numberMessage,
          longText: this.renderData.longTextMessage,
          required: this.renderData.requiredMessage
        }
      }
    },
    props: {
      model: {
        required: true,
        type: Object
      },
      renderData: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      formItemList: {
        required: true,
        type: Array
      },
      disabled: {
        default: false,
        type: Boolean
      },
      labelWidth: {
        default: '140px',
        type: String
      }
    },
    computed: {
      cFormItemList () {
        return this.formItemList.filter(item => item.edit)
      }
    },
    methods: {
      show (item) {
        if (this.visible.dialog === 'add') {
          return true
        }
        return item[this.visible.dialog]
      },
      validate (callback) {
        this.$refs['tempForm'].validate(callback)
      },
      itemChange (item, val) {
        console.log('itemChange item, val', item, val)
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
      getRules (item) {
        return (item.rules || []).reduce((res, ruleItem) => {
          var rule = constants.ruleMap[ruleItem]
          if (ruleItem === 'required' && item.type === 'clause') {
            res.push({
              name: 'required',
              validator: validator.validate,
              test (val) {
                return !!val // 要求checkbox 必须为true
              },
              message: this.messageMap[ruleItem],
              trigger: 'blur,change'
            })
          } else {
            rule.message = this.messageMap[ruleItem]
            res.push(rule)
          }
          if (ruleItem === 'required' && item.type === 'upload') {
            res.push({
              name: 'required',
              validator: validator.validate,
              test (val) {
                return !!val.url // 要求upload 必须为有url
              },
              message: this.messageMap['required'],
              trigger: 'blur,change'
            })
          }
          if (ruleItem.includes('api')) {
            res.push({
              name: ruleItem,
              trigger: 'blur,change',
              test (val) {
                var params = {key: val}
                Object.assign(params, item.params)
                return fetch(ruleItem, params)
              },
              validator: validator.validate
            })
          }
          return res
        }, [])
      }
    },
    components: {
      BFormItem
    },
    watch: {
      formItemList (newVal, oldVal) {
        console.log('watch formItemList newVal, oldVal', newVal, oldVal)
        this.formItemList.forEach(item => {
          this.allFieldsMap[item.key] = item
          item.beDependentItems = []
          // 给每个字段赋值
          this.$set(this.model, item.key, item.value)
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
  .custom-form {
    .inline-label {
      display: inline-block;
      width: 88%;
      vertical-align: top;
    }
    .b-form-item {
      .b-date-picker {
        width: 100%;
      }
    }
  }
</style>
