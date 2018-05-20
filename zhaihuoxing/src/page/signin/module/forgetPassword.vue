<template lang="pug">
  #forget-password.amt-right-in
    h1.theme-color-darkenC15 {{renderData.forgetPwd}}
    .split-line.theme-bg-D
<<<<<<< HEAD
    el-form(:model="form" label-width="96px", :rules="rules", ref="form").form
      el-form-item.username-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.usernameEmail")
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernameEmailPrompt")
      el-form-item(prop="pwd").email-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.pwd")
        b-input(:model.sync="form.password", :placeholder="renderData.pwdPrompt")
      el-form-item(prop="vcode").vcode-input-box
        template(slot="label")
          span.theme-color-C(v-text="renderData.vcode")
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc")
=======
    el-form(:model="form" label-width="140px", :rules="rules", ref="form", label-position="left").form
      el-form-item.username-input(prop="user_name")
        template(slot="label")
          span.theme-color-C(v-text="renderData.username")
        b-input(:model.sync="form.user_name", :placeholder="renderData.usernamePrompt")
      el-form-item(prop="email").email-input
        template(slot="label")
          span.theme-color-C(v-text="renderData.email")
        b-input(:model.sync="form.email", :placeholder="renderData.emailPrompt")
      el-form-item(prop="vcode").vcode-input-box
        template(slot="label")
          span.theme-color-C(v-text="renderData.vcode")
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt", @keyup.enter.native="sendEmail").vcode-input
        img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc", @click="changeVcode")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      .change-vcode-box.clear-float
        .right-vcode-box.pointer(@click="changeVcode")
          span.theme-color-lightenA10 {{renderData.changeVcode}}
      .button-box
        b-button(type="primary", @click="sendEmail").send-email-btn
          span {{renderData.sendEmail}}
        b-button(type="secondary", @click="toPage('signin')").cancel-btn
          span {{renderData.cancel}}

</template>

<script>
<<<<<<< HEAD
  var comp = window.renderData.components.signin
  let renderData = Object.assign({}, comp.signin_auth, comp.forget_password_auth)

=======
  import Vue from 'vue'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  import vcodeMixin from 'common/js/vcodeMixin'
  import service from '../service'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
<<<<<<< HEAD
  import { validator } from 'common/js/Utils'

  export default {

    name: 'forget_password',
    mixins: [vcodeMixin],
    data () {
      return {
        vcodeError: false,
        renderData: renderData,
        form: {
          user_name: '',
          password: '',
          vcode: ''
        },
        rules: {
          pwd: [{
            validator: function (rule, val, callback) {
              var params = {
                vcode_key: this.vcode_key
              }
              Object.assign(params, this.form)
              service.sendEmail(params).then(({re}) => {
                this.vcodeError = false
                if (re === '404' || re === '403') {
                  callback(rule.message)
                } else if (re === '402') {
                  this.vcodeError = true
                }
              })
            },
            message: renderData.usernameEmailPwdNotMatch,
            trigger: 'submit'
          }],
          vcode: [{
            validator: validator.validate,
            test: function (val) {
              return !this.vcodeError
            },
            message: renderData.vcodeError,
            trigger: 'submit'
=======
  import utils from 'common/js/Utils'
  import { Loading } from 'element-ui'

  Vue.use(Loading.directive)
  export default {
    name: 'forget_password',
    mixins: [vcodeMixin],
    data () {
      var _this = this
      return {
        vcodeError: false,
        notMatch: false,
        rules: {
          user_name: [
            {
              required: true,
              message: this.renderData.required,
              trigger: 'blur'
            },
            {
              regex: utils.constants.noChinese,
              validator: utils.validator.validate,
              message: this.renderData.usernameNoExist,
              trigger: 'change, blur'
            },
            {
              test: function (value) {
                var params = {
                  data: [{
                    key: 'user_name',
                    val: value
                  }]
                }
                return service.checkMatch(params).then(res => {
                  if (res.re === '200') {
                    return true
                  } else if (res.re === '402') {
                    return false
                  } else {
                    return true
                  }
                })
              },
              validator: utils.validator.validate,
              message: this.renderData.usernameNoExist,
              trigger: 'blur'
            },
            {
              test: function (value) {
                return !_this.notMatch
              },
              message: '',
              validator: utils.validator.validate,
              trigger: 'submit'
            }
          ],
          email: [
            {
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  data: [{
                    key: 'email',
                    val: value
                  }]
                }
                return service.checkMatch(params).then(({re}) => {
                  if (re === '200') {
                    return true
                  } else if (re === '402') {
                    return false
                  } else {
                    return true
                  }
                })
              },
              message: this.renderData.emailNoExist,
              trigger: 'blur'
            },
            {
              message: this.renderData.required,
              required: true,
              trigger: 'blur'
            },
            {
              test: function (value) {
                return !_this.notMatch
              },
              message: this.renderData.usernameEmailNotMatch,
              validator: utils.validator.validate,
              trigger: 'submit'
            }
          ],
          vcode: [{
            validator: utils.validator.validate,
            test: function (val) {
              return !_this.vcodeError
            },
            message: this.renderData.vcodeError,
            required: true,
            trigger: 'submit'
          }, {
            validator: utils.validator.validate,
            test: function (val) {
              var params = {
                vcode: _this.form.vcode,
                vcode_key: _this.vcode_key
              }
              return service.vcodeValidate(params).then(({re}) => {
                if (re === '200') {
                  return true
                } else if (re === '402') {
                  return false
                } else {
                  return true
                }
              })
            },
            message: this.renderData.vcodeError,
            trigger: 'blur'
          }, {
            validator: utils.validator.validate,
            message: this.renderData.required,
            required: true,
            trigger: 'blur'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          }]
        }
      }
    },
    components: {
      BButton,
      BInput
    },
    methods: {
      toPage (page) {
        this.visible.page = page
      },
<<<<<<< HEAD
      sendEmail () {
        console.log('sendEmail')
        this.$refs['form'].validate(valid => {})
      }
    },
=======
      async sendEmail () {
        this.form.vcode_key = this.vcode_key
        console.log('sendEmail')
//        this.visible.dialog = 'send_success'
        var params = {
          email: this.form.email,
          user_name: this.form.user_name,
          vcode: this.form.vcode,
          vcode_key: this.vcode_key
        }
        await service.forgetPwdEmail(params).then(res => {
          this.vcodeError = false
          this.notMatch = false
          if (res.re === '200') {
            this.visible.dialog = 'send_success'
          } else if (res.re === '402') {
            this.vcodeError = true
            console.log('vcode error: ', this.vcodeError)
          } else if (res.re === '404') {
            this.notMatch = true
          } else {
            this.visible.dialog = 'send_fail'
          }
        })
        this.$refs['form'].validate(valid => {
          console.log('valid: ', valid)
        })
      },
      initForm () {
        this.form.user_name = ''
        this.form.email = ''
        this.form.vcode = ''
        this.form.vcode_key = this.vcode_key
      },
      checkUserAndEmail () {
        var params = {
          data: [{
            key: 'user_name',
            val: this.form.user_name
          }, {
            key: 'email',
            val: this.form.email
          }]
        }
        service.checkMatch(params).then(res => {
          if (res.re === '200') {
            this.notMatch = false
          } else if (res.re === '402') {
            this.notMatch = true
          } else {
            this.notMatch = false
          }
        })
      }
    },
    mounted () {
      this.initForm()
    },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    props: {
      visible: {
        type: Object,
        required: true
<<<<<<< HEAD
=======
      },
      renderData: {
        type: Object,
        required: true
      },
      form: {
        type: Object,
        required: true
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    }
  }
</script>

<style lang="less" scoped>
  #forget-password {
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .split-line {
<<<<<<< HEAD
      height: 2px;
      width: 100%;
      margin-top: 31px;
    }
    .form {
      margin-top: 30px;
      .username-input {
        margin-bottom: 10px;
      }
      .email-input {
        margin-bottom: 10px;
      }
      .prompt-box {
=======
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .form {
      margin-top: 20px;
      .username-input, .email-input {
        margin-bottom: 15px;
      }
      .prompt-box {
        display: inline-block;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        font-size: 12px;
        margin-bottom: 18px;
      }
      .vcode-input-box {
<<<<<<< HEAD
        margin-bottom: 6px;
=======
        margin-bottom: 0;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        .vcode-input {
          width: 72%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 25%;
<<<<<<< HEAD
          height: 35px;
=======
          height: 40px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          vertical-align: top;
          border-radius: 4px;
        }
      }
      .change-vcode-box {
<<<<<<< HEAD
        margin-bottom: 22px;
=======
        margin-bottom: 19px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        .right-vcode-box {
          width: 100px;
          height: 30px;
          float: right;
<<<<<<< HEAD
          span {
            margin-top: 8px;
=======
          margin-top: 4px;
          span {
            /*margin-top: 8px;*/
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            float: right;
          }
        }
      }
      .button-box {
<<<<<<< HEAD
        padding-left: 100px;
=======
        padding-left: 140px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        .send-email-btn {
          width: 180px !important;
        }
        .cancel-btn {
          width: 100px !important;
          margin-left: 8px;
        }
      }
    }
  }
</style>
