<template lang="pug">
  div.hei-100
    signin-part(v-if="visible.page === 'signin'", :visible="visible")
    forget-password(v-if="visible.page === 'forget_password'", :visible="visible")
</template>

<script>
  import SigninPart from './module/signin'
  import ForgetPassword from './module/forgetPassword'
  import componentMixin from 'common/js/componentMixin'
  import Vue from 'vue'
  import { Form, FormItem } from 'element-ui'

  Vue.use(Form)
  Vue.use(FormItem)
  export default {
    name: 'signin',
    mixins: [componentMixin],
    data () {
      return {
        visible: {
          page: 'signin'
        }
      }
    },
    methods: {},
    components: {
      SigninPart,
      ForgetPassword
    }
  }
</script>

<style lang="less" scoped>
  .hei-100{
    height: 100%;
  }
</style>
