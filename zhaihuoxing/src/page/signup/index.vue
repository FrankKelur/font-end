<template lang="pug">
  div.hei-100
    signup-part(v-if="visible.page==='signup'", :visible="visible", :form="stepOne")
    improve-info(v-if="visible.page==='improve_info'", :visible="visible", :form="stepTwo", :user-type="stepOne.user_type", :for-three="forThree")
    make-fund(v-if="visible.page==='make_fund'", :visible="visible", :form="stepThree", :step-one="stepOne", :step-two="stepTwo", :for-three="forThree")
</template>

<script>
  import signupPart from './module/signup'
  import makeFund from './module/makeFund'
  import improveInfo from './module/improveInfo'
  import componentMixin from 'common/js/componentMixin'
  import Utils from 'common/js/Utils'
  import Vue from 'vue'
  import { Form, FormItem } from 'element-ui'

  Vue.use(Form)
  Vue.use(FormItem)

  export default {
    name: 'signup',
    mixins: [componentMixin],
    data () {
      return {
        signinUrl: '',
        visible: {
          page: 'signup'
        },
        stepOne: {
          user_name: '',
          email: '',
          password: '',
          confirmPwd: '',
          user_type: ''
        },
        stepTwo: {
          agree: false
        },
        stepThree: {
          vcode: '',
          vcode_key: '',
          account_type: '',
          currency: '',
          leverage: ''
        },
        forThree: {}
      }
    },
    methods: {
      getSignInUrl () {
        Utils.getComponentUrl({
          component_name: 'signin'
        }).then(res => {
          if (res.page_url) {
            this.signinUrl = res.page_url
          }
        })
      }
    },
    mounted () {
      this.getSignInUrl()
    },
    components: {
      signupPart,
      improveInfo,
      makeFund
    }
  }
</script>

<style lang="less">
  .hei-100 {
    height: 100%;
  }
</style>
