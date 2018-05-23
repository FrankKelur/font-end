<template lang="pug">
  .all-user-list-account-setting
    .amt-more-left-in
      b-title(title="交易及账号设置")

    .amt-more-left-in
      el-form(ref="form", :rules="formRules", :model="form", label-width="140px", labelPosition='left' style="width: 30%;")
        p.margin-bottom-15 可创建交易账号与数量设置
          el-tooltip(class="item" effect="dark", content="设置各个系统中可以自由创建交易账号的数量" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')
        el-form-item(label="MT4", prop="mt4")
          b-input(placeholder="请输入", :model.sync="form.mt4")
        el-form-item(label="MT5", prop="mt5")
          b-input(placeholder="请输入", :model.sync="form.mt5")
        el-form-item
          b-button(@click="back") 取消
          b-button(type="primary", @click="subForm") 保存
</template>

<script>
  import BTitle from 'components/BTitle'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'
  import { validator } from 'common/js/Utils'

  export default {
    data () {
      return {
        form: {
          mt4: '',
          mt5: ''
        },
        formRules: {
          mt4: [
            { required: true, message: '请输入', trigger: 'blur' },
            {
              regex: /^[1-9]\d*$/,
              validator: validator.validate,
              message: '请输入大于0的整数',
              trigger: 'blur'
            }
          ],
          mt5: [
            { required: true, message: '请输入', trigger: 'blur' },
            {
              regex: /^[1-9]\d*$/,
              validator: validator.validate,
              message: '请输入大于0的整数',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      back () {
        console.log('取消')
        this.$emit('back')
      },
      subForm () {
        console.log('保存')
      }
    },
    components: {
      BTitle,
      BInput,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  .all-user-list-account-setting{}
</style>
