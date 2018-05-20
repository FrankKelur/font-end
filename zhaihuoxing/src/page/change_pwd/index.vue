<template lang="pug">
  #change-pwd
    h1.theme-color-darkenC15 {{renderData.changePwd}}
    .split-line.theme-bg-D
    el-form(:model="form" label-width="96px").form
      el-form-item(:label="renderData.newPwd" ).newPwd-input
        b-input(type='password', :model.sync="form.newPwd", :placeholder="renderData.newPwdPrompt")
      el-form-item(:label="renderData.confirmPwd" ).confirmPwd-input
        b-input(type='password', :model.sync="form.confirmPwd", :placeholder="renderData.confirmPwdPrompt")
      el-form-item(:label="renderData.vcode" ).vcode-input-box
        b-input(:model.sync="form.vcode", :placeholder="renderData.vcodePrompt").vcode-input
        b-button.vcode-img
          span 123
      .change-vcode-box.clear-float
        span.theme-color-lightenA10 {{renderData.changeVcode}}
      .button-box
        b-button(type="primary").confirm-btn
          span {{renderData.confirm}}
        b-button(type="secondary").cancel-btn
          span {{renderData.cancel}}
</template>

<script>
  let renderData = window.renderData.components.change_pwd.change_pwd_auth
  import Vue from 'vue'
  import { Form, FormItem } from 'element-ui'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import componentMixin from 'common/js/componentMixin'

  Vue.use(Form)
  Vue.use(FormItem)
  export default {
    mixins: [componentMixin],
    name: 'change_pwd',
    data () {
      return {
        renderData: renderData,
        form: {
          newPwd: '',
          confirmPwd: '',
          vcode: ''
        }
      }
    },
    methods: {
      text () {
      }
    },
    components: {
      BButton,
      BInput,
      BIcon
    }
  }
</script>

<style lang="less" scoped>
  #change-pwd {
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
          width: 77%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 20%;
        }
      }
      .change-vcode-box {
        margin-bottom: 53px;
        span {
          float: right;
        }
      }
      .button-box {
        padding-left: 100px;
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

  @media screen and  (min-width: 1250px) {
    #change-pwd {
      width: 486px;
    }
  }

  @media screen and (max-width: 1250px) {
    #change-pwd {
      width: 426px;
    }
  }
</style>
