<template lang="pug">
  .hei-100
    #change-pwd
      h1.theme-color-darkenC15 {{renderData.changePwd}}
      .split-line.theme-bg-D
      el-form(:model="form", label-width="140px", :rules="rules", label-position="left", ref="pwdForm").form
        el-form-item(prop="newPwd").newPwd-input
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.newPwd", v-ellipsis-title="")
          b-input(type='password', :model.sync="form.newPwd", :placeholder="renderData.newPwdPrompt")
        el-form-item(prop="confirmPwd").confirmPwd-input
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.confirmPwd", v-ellipsis-title="")
          b-input(type='password', :model.sync="form.confirmPwd", :placeholder="renderData.confirmPwdPrompt")
        el-form-item(prop="vcode").vcode-input-box
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.vcode", v-ellipsis-title="")
          b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt", @keyup.enter.native="changePwd").vcode-input
          img.vcode-img(v-loading='vcodeLoading', :src="vcodeSrc")
        .change-vcode-box.clear-float
          span.theme-color-lightenA10 {{renderData.changeVcode}}
        .button-box
          b-button(type="primary", @click="changePwd()").confirm-btn
            span {{renderData.confirm}}
          b-button(type="secondary", @click="toSignIn()").cancel-btn
            span {{renderData.cancel}}
</template>

<script>
  import Vue from 'vue'
  import { Form, FormItem, Loading } from 'element-ui'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import componentMixin from 'common/js/componentMixin'
  import utils from 'common/js/Utils'
  import vcodeMixin from 'common/js/vcodeMixin'
  import service from './service'

  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Loading.directive)
  export default {
    mixins: [componentMixin, vcodeMixin],
    name: 'change_pwd',
    data () {
      let renderData = window.renderData.components.change_pwd.change_pwd_auth
      var _this = this
      return {
        renderData: renderData,
        form: {
          newPwd: '',
          confirmPwd: '',
          vcode: ''
        },
        vcodeError: false,
        searchObj: {},
        rules: {
          newPwd: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              regex: '',
              message: '',
              validator: utils.validator.validate,
              trigger: 'blur, change'
            }
          ],
          confirmPwd: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              test: function (value) {
                return value === _this.form.newPwd
              },
              message: renderData.twoPwdNotMatch,
              validator: utils.validator.validate,
              trigger: 'blur, change'
            }
          ],
          vcode: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            },
            {
              test: function (value) {
                return !_this.vcodeError
              },
              message: renderData.vcodeError,
              validator: utils.validator.validate,
              trigger: 'submit'
            },
            {
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
              validator: utils.validator.validate,
              message: renderData.vcodeError,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      text () {
      },
      getPasswdRule () {
        var params = {
          email_code: this.searchObj.email_code,
          user_name: this.searchObj.user_name
        }
        service.getPasswdRule(params).then(({re, data}) => {
          if (re === '200') {
            var passRule = data.password_re
            var ruleObj = Object.keys(utils.constants)
            ruleObj.forEach(item => {
              var tmpRule = utils.constants[item].toString()
              if (tmpRule === passRule) {
                this.rules.newPwd[1].regex = utils.constants[item]
                this.rules.newPwd[1].message = this.renderData[item]
              }
            })
          } else {
            this.rules.newPwd[1].regex = ''
            this.rules.newPwd[1].message = ''
          }
        })
      },
      async changePwd () {
        var params = {
          new_password: this.form.newPwd,
          new_password_again: this.form.confirmPwd,
          vcode: this.form.vcode,
          vcode_key: this.vcode_key
        }
        Object.assign(params, this.searchObj)
        console.log('post data: ', params)
        this.vcodeError = false
        await service.changePwd(params).then(({re}) => {
          if (re === '402') {
            this.vcodeError = true
          } else if (re === '200') {
//           跳转到登陆页面
            this.toSignIn()
          }
        })
        this.$refs['pwdForm'].validate(valid => {})
      },
      toSignIn () {
        var params = {
          component_name: 'signin'
        }
        utils.getComponentUrl(params).then(res => {
          if (res.page_url) {
            document.location.pathname = res.page_url
          }
        })
        console.log('跳转到登陆页面')
      }
    },
    async mounted () {
      var search = document.location.search
      search = search.slice(1, search.length)
      var searchArr = search.split('&')
      searchArr.forEach(item => {
        var tmpArr = item.split('=')
        var key = tmpArr[0]
        var value = tmpArr[1]
        this.searchObj[key] = value
      })
      console.log('search obj: ', this.searchObj)
      await this.getPasswdRule()
    },
    components: {
      BButton,
      BInput,
      BIcon
    }
  }
</script>

<style lang="less" scoped>
  .hei-100 {
    height: 100%;
  }
  #change-pwd {
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .split-line {
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .form {
      margin-top: 30px;
      .newPwd-input {
        position: relative;
        margin-bottom: 10px;
      }
      .confirmPwd-input {
        position: relative;
        margin-bottom: 10px;
      }
      .vcode-input-box {
        margin-bottom: 10px;
        .vcode-input {
          width: 72%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 25%;
          height: 40px;
          border-radius: 4px;
          vertical-align: top;
        }
      }
      .change-vcode-box {
        margin-bottom: 53px;
        span {
          float: right;
        }
      }
      .button-box {
        padding-left: 140px;
        .confirm-btn {
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
