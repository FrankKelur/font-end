<template lang="pug">
<<<<<<< HEAD
  div
    signup-part(v-if="visible.page=='signup'", :visible="visible", signin-url='signinUrl', :form="form")
    improve-info(v-if="visible.page=='improve_info'", :visible="visible", signin-url='signinUrl', :form="form")
=======
  div.hei-100
    signup-part(v-if="visible.page==='signup'", :visible="visible", :form="stepOne")
    improve-info(v-if="visible.page==='improve_info'", :visible="visible", :form="stepTwo", :user-type="stepOne.user_type", :for-three="forThree")
    make-fund(v-if="visible.page==='make_fund'", :visible="visible", :form="stepThree", :step-one="stepOne", :step-two="stepTwo", :for-three="forThree")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
</template>

<script>
  import signupPart from './module/signup'
<<<<<<< HEAD
=======
  import makeFund from './module/makeFund'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
        form: {
=======
        stepOne: {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          user_name: '',
          email: '',
          password: '',
          confirmPwd: '',
<<<<<<< HEAD
          referral: '',
          vcode: '',
          vcode_key: '',
          user_type: '',
          agree: false
        }
=======
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
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      getSignInUrl () {
        Utils.getComponentUrl({
          component_name: 'signin'
        }).then(res => {
<<<<<<< HEAD
          if (res.re === '200') {
            this.signinUrl = res.data.url
=======
          if (res.page_url) {
            this.signinUrl = res.page_url
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          }
        })
      }
    },
    mounted () {
      this.getSignInUrl()
    },
    components: {
      signupPart,
<<<<<<< HEAD
      improveInfo
=======
      improveInfo,
      makeFund
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</script>

<<<<<<< HEAD
<style lang="less" scoped>

=======
<style lang="less">
  .hei-100 {
    height: 100%;
  }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
</style>
