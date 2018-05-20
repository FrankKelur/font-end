<template lang="pug">
  div
    signup-part(v-if="visible.page=='signup'", :visible="visible", signin-url='signinUrl', :form="form")
    improve-info(v-if="visible.page=='improve_info'", :visible="visible", signin-url='signinUrl', :form="form")
</template>

<script>
  import signupPart from './module/signup'
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
        form: {
          user_name: '',
          email: '',
          password: '',
          confirmPwd: '',
          referral: '',
          vcode: '',
          vcode_key: '',
          user_type: '',
          agree: false
        }
      }
    },
    methods: {
      getSignInUrl () {
        Utils.getComponentUrl({
          component_name: 'signin'
        }).then(res => {
          if (res.re === '200') {
            this.signinUrl = res.data.url
          }
        })
      }
    },
    mounted () {
      this.getSignInUrl()
    },
    components: {
      signupPart,
      improveInfo
    }
  }
</script>

<style lang="less" scoped>

</style>
