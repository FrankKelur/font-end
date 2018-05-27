<template lang="pug">
  #trade-account-apply
    h1.theme-color-darkenC15 {{renderData.account_apply}}
    .split-line.theme-bg-D
    el-form(:model="form" label-width="140px", ref="form", :rules="rules", label-position="left").form
      el-form-item(prop="account_type")
        h4(v-text="renderData.apply_mt4")
      el-form-item(prop="account_type").select-box
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.accountType", v-ellipsis-title="")
        b-select(:model.sync="form.account_type", :placeholder="renderData.pleaseSelect")
          el-option(:value="item.key", :label="item.val", v-for="item in accountTypeList", :key="item.key")
      el-form-item(prop="currency").select-box
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.currency", v-ellipsis-title="")
        b-select(:model.sync="temp", :placeholder="renderData.pleaseSelect", @change="tempChange")
          el-option(:value="item.key", :label="item.val", v-for="item in currencyList", :key="item.key")
      el-form-item(prop="leverage").select-box
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.leverage", v-ellipsis-title="")
        b-select(:model.sync="form.leverage", :placeholder="renderData.pleaseSelect")
          el-option(:value="item.key", :label="item.val", v-for="item in leverageList", :key="item.key")
      .button-box
        b-button(type="primary", @click="submit").confirm-btn
          span {{renderData.submit}}
        span {{renderData.toSignInPrefix}}
        a {{renderData.signin}}
</template>

<script>
  let renderData = window.renderData.components.before_apply_mt4.before_apply_mt4_auth
  import Vue from 'vue'
  import { Form, FormItem, Option } from 'element-ui'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import service from './service'
  import componentMixin from 'common/js/componentMixin'

  Vue.use(Form)
  Vue.use(Option)
  Vue.use(FormItem)
  export default {
    mixins: [componentMixin],
    name: 'before_apply_mt4',
    data () {
      return {
        renderData: renderData,
        accountTypeList: [],
        currencyList: [],
        temp: {},
        leverageList: [],
        rules: {
          account_type: [{
            required: true,
            message: renderData.pleaseSelect
          }],
          currency: [{
            required: true,
            message: renderData.pleaseSelect
          }],
          leverage: [{
            required: true,
            message: renderData.pleaseSelect
          }]
        },
        form: {
          account_type: '',
          currency: '',
          leverage: ''
        }
      }
    },
    methods: {
      tempChange () {
        console.log(this.temp)
        this.currencyList.forEach(item => {
          console.log(item, item === this.temp)
        })
      },
      submit () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var params = Object.assign({}, this.form)
            service.applyMt4(params)
          }
        })
      },
      getLeverageList () {
        var params = {}
        return service.getLeverageList(params).then(({re, data}) => {
          if (re === '200') {
            this.leverageList = data
          }
        })
      },
      getCurrencyList () {
        var params = {}
        return service.getCurrencyList(params).then(({re, data}) => {
          if (re === '200') {
            this.currencyList = data
            this.currencyList = [{key: 'zhai', val: '宅'}, {key: 'peng', val: '朋'}]
          }
        })
      },
      getAccountTypeList () {
        var params = {}
        return service.getAccountTypeList(params).then(({re, data}) => {
          if (re === '200') {
            this.accountTypeList = data
          }
        })
      }
    },
    async mounted () {
      // first render ajax & close loading
      await this.getLeverageList()
      await this.getCurrencyList()
      await this.getAccountTypeList()
    },
    components: {
      BButton,
      BSelect
    }
  }
</script>

<style lang="less" scoped>
  #trade-account-apply {
    float: left;
    margin-top: 140px;
    margin-left: 61.5px;
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .split-line {
      height: 2px;
      width: 100%;
      margin-top: 31px;
    }
    .form {
      margin-top: 30px;
      .button-box {
        padding-left: 100px;
        .confirm-btn {
          margin-right: 20px;
        }
      }
    }
  }

  @media screen and  (min-width: 1250px) {
    #trade-account-apply {
      width: 486px;
    }
  }

  @media screen and (max-width: 1250px) {
    #trade-account-apply {
      width: 426px;
    }
  }
</style>
