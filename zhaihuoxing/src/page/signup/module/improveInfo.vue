<template lang="pug">
  #improve-info
    h1.theme-color-darkenC15(@click="logger") {{renderData.signup}}
    el-form(:model="form" label-width="96px", :rules="rules", ref="infoForm").form
      el-form-item(:label="renderData.userType", prop="user_type")
        b-select(:model.sync="form.user_type", @change="userTypeChange", :placeholder="renderData.pleaseSelect")
          el-option(v-for="type in userTypeList", :key="type.key", :value="type.key", :label="type.val")
      el-form-item.form-item-box(v-for="item in fieldList", :key="item.field", :prop="item.field")
        .form-item-label(v-text="item.label", slot="label", v-ellipsis-title="")
        b-form-item(:model.sync='form[item.field]', :item='item')
    .button-box
      b-button(type="primary", @click="submit").next-btn
        span {{renderData.submit}}
      span {{renderData.toSignInPrefix}}
      a(:href="signinUrl") {{renderData.signin}}
</template>

<script>
  let renderData = window.renderData.components.signup.signup_auth
  import Vue from 'vue'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import BCheckbox from 'components/BCheckbox'
  import BFormItem from 'components/BFormItem'
  import Utils from 'common/js/Utils'
  import service from '../service'

  export default {
    name: 'improve-info',
    data () {
      return {
        formFieldMap: {
          '': {
            fields: []
          }
        },
        renderData: renderData,
        primaryRules: {
          user_type: [{
            required: true,
            message: renderData.pleaseSelect
          }]
        }
      }
    },
    computed: {
      fieldList () {
        var list = []
        var obj = Utils.safeGet.call(this.formFieldMap, this.form.user_type, {})
        list = obj ? obj.fields : []
        return list
      },
      rules () {
        var fields = Utils.safeGet.call(this.formFieldMap, this.form.user_type + '.fields', [])
        console.log('fields', fields, typeof fields)
        var rules = Object.assign({}, this.primaryRules)
        fields.forEach(item => {
          var rule = []
          if (item.required) {
            rule.push({
              required: true,
              message: item.requiredMessage
            })
          }
          if (item.regex) {
            rule.push({
              regex: new RegExp(item.regex),
              validator: Utils.validator.validate,
              message: item.regexError
            })
          }
          rules[item.field] = rule
        })
        console.log('rules', rules)
        return rules
      },
      userTypeList () {
        var list = []
        for (var key in this.formFieldMap) {
          var obj = this.formFieldMap[key]
          list.push({
            key: key,
            val: obj.label
          })
        }
        return list
      }
    },
    props: {
      signinUrl: {
        type: String,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      form: {
        type: Object,
        required: true
      }
    },
    methods: {
      logger () {
        console.log('logger', this.form, this.form.user_type)
      },
      submit () {
        this.$refs['infoForm'].validate(valid => {
          var params = Object.assign({}, this.form)
          service.signUp(params)
        })
      },
      getFormFieldMap () {
        var params = {
          name: 'signup'
        }
        return service.getFormFieldMap(params).then(res => {
          this.formFieldMap = res.data
          console.log('getFormFieldMap done')
        })
      },
      userTypeChange () {
        this.formFieldMap[this.form.user_type].fields.forEach(item => {
          Vue.set(this.form, item.field, '')
        })
      }
    },
    async mounted () {
      await this.getFormFieldMap()
      console.log('mounted finished', this.formFieldMap)
    },
    components: {
      BButton,
      BSelect,
      BInput,
      BFormItem,
      BCheckbox
    }
  }
</script>

<style lang="less" scoped>
  #improve-info {
    float: left;
    margin-top: 140px;
    margin-left: 61.5px;
    h1 {
      text-align: center;
      font-size: 36px;
      margin-bottom: 30px;
    }
    .form {
      height: 400px;
      overflow-x: hidden;
      .form-item-label {
        display: inline-block;
        width: 85%;
      }
    }
    .button-box {
      padding-left: 100px;
      .next-btn {
        margin-right: 20px;
      }
    }
  }

  @media screen and  (min-width: 1250px) {
    #improve-info {
      width: 486px;
    }
  }

  @media screen and (max-width: 1250px) {
    #improve-info {
      width: 426px;
    }
  }
</style>
