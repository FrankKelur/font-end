<template lang="pug">
  .user-type-setting-channel
    el-form(label-position="left" labelWidth="140px", :model="data", ref="form")
      el-form-item(prop='mt4_account_number', :rules="totalMax")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.mt4", v-ellipsis-title="")
        el-input(:placeholder="renderData.pleaseEnter", v-model="data.mt4_account_number")

</template>

<script>
  import { validator } from 'common/js/Utils'

  export default {
    name: 'user-type-setting-channel',
    data () {
      var rule = {
        regex: /^[1-9]\d*$/,
        validator: validator.validate,
        message: this.renderData.onlyIntAboveZero,
        trigger: 'blur'
      }
      return {
        totalMax: [rule]
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      data: {
        type: Object,
        required: true
      }
    },
    methods: {
      clearValidate () {
        this.$refs['form'] && this.$refs['form'].clearValidate()
      },
      validate (cb) {
        var res = true
        this.$refs['form'] && this.$refs['form'].validate(valid => { res = res & valid })
        cb(res)
      }
    }
  }
</script>

<style lang="less">
  .user-type-setting-channel {
    .el-input__inner {
      width: 300px;
    }
    .el-form-item__label{
      padding-left: 11.5px !important;
    }
    @media screen and (max-width:1250px) {
      .el-input__inner {
        width: 250px;
      }
    }
  }
</style>
