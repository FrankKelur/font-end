<template lang="pug">
  el-form.custom-form(:model="tempForm", ref="tempForm")
    .item(v-for="(item, $index) in formItemList", :key="$index")
      el-form-item(label-width="100px", :prop="item.key", :rules="getRules(item)")
        span(slot="label") {{item.label}}
        b-form-item(:model.sync='tempForm[item.key]', :item='item', @change="itemChange")
    .footer
      b-button(@click="back") {{renderData.back}}
      b-button(type="primary", @click="submit") {{renderData.submit}}
</template>

<script>
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import service from '../service'
  import { constants, validator, fetch } from 'common/js/Utils'

  export default {
    name: 'custom_form',
    data () {
      var _this = this
      return {
        tempForm: {},
        allFieldsMap: {},
        formItemList: [],
        messageMap: {
          number: _this.renderData.numberMessage,
          longText: _this.renderData.longTextMessage,
          required: _this.renderData.requiredMessage
        }
      }
    },
    props: {
      visible: {
        required: true
      },
      renderData: {
        type: Object,
        required: true
      },
      currAudit: {
        required: true
      }
    },
    methods: {
      back () {
        this.visible.page = null
      },
      submit () {
        this.$refs['tempForm'].validate(valid => {
          if (valid) {
            var params = {
              audit_type: this.currAudit.name,
              data: this.tempForm
            }
            service.submitAudit(params)
          }
        })
      },
      getFormItemList () {
        var params = {
          audit_type: this.currAudit.name
        }
        return service.getFormItemList(params).then(res => {
          var list = res.data
          list.forEach(item => {
            this.allFieldsMap[item.key] = item
            this.$set(item, 'beDependentItems', [])
          })
          // 给每个被依赖的form-item 添加 beDependentItems 数组，存放哪些form-item依赖该 form-item
          list.forEach(item => {
            (item.follow || []).forEach(key => {
              var target = this.allFieldsMap[key]
              target.beDependentItems.push(item)
            })
          })
          this.formItemList = res.data
          this.formItemList.forEach(item => {
            this.$set(this.tempForm, item.key, '')
            if (item.type === 'upload') {
              this.$set(this.tempForm, item.key, {})
            }
          })
        })
      },
      itemChange (item, val) {
        console.log('itemChange item, val', item, val)
        item.beDependentItems.forEach(elm => {
          this.tempForm[elm.key] = ''
          this.itemChange(elm, '')
          this.$set(elm, 'params', {
            [item.key]: this.tempForm[item.key]
          })
        })
      },
      getRules (item) {
        var rules = item.rules.map(rule => {
          var res = constants.ruleMap[rule]
          if (rule.includes('api') && !res) {
            res = {
              name: rule,
              trigger: 'blur,change',
              test (val) {
                var params = {
                  key: val
                }
                return fetch(rule, params)
              },
              validator: validator.validate
            }
            return res
          }
          res.message = this.messageMap[res.name]
          return res
        })
        console.log('rules', rules)
        return rules
      }
    },
//    computed: {
//      cRules () {
//        var rules = {}
//        var messageMap = {
//          number: this.renderData.numberMessage,
//          longText: this.renderData.longTextMessage,
//          required: this.renderData.requiredMessage
//        }
//        this.formItemList.forEach(item => {
//          rules[item.key] = item.rules.map(rule => {
//            var item = constants.ruleMap[rule]
//            if (rule.includes('api') && !item) {
//              item = {
//                name: rule,
//                trigger: 'blur,change',
//                test () {
//                  var params = {}
//                  return fetch(rule, params)
//                },
//                validator: validator.validate
//              }
//              return item
//            }
//            item.message = messageMap[item.name]
//            return item
//          })
//        })
//        return rules
//      }
//    },
    async mounted () {
      await this.getFormItemList()
//      this.getCRules()
    },
    components: {
      BIcon,
      BFormItem,
      BButton
    }
  }
</script>

<style lang="less">
  .custom-form {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .item {
      position: relative;
      .el-form-item {
        margin-top: 20px !important;
      }
    }
    .footer {
    }

  }
</style>
