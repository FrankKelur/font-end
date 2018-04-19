<template lang="pug">
  b-dialog.trade-sys-pass-dialog(:show='true', :title="renderData.channelEdit", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="140px" label-position='left' ref="form", :model="itemData.data", :rules="rules")
      el-form-item(prop="channelName.label", :rules="rules.channelName")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.channelName", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.channelName.label", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="mt4ServerName")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.mt4ServerName", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.mt4ServerName", :placeholder="renderData.pleaseEnter", :disabled="optType==='edit'")
      el-form-item(prop="ip")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.ip", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.ip", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="port")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.port", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.port", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="managerLogin")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.managerLogin", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.managerLogin", :placeholder="renderData.pleaseEnter")
      el-form-item(prop="managerPassword")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.managerPassword", v-ellipsis-title="")
        b-input(:model.sync="itemData.data.managerPassword", :placeholder="renderData.pleaseEnter")
    template(slot="footer")
      b-button(@click="cancelForm") {{renderData.cancel}}
      b-button(@click="submitForm" type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import utils from 'common/js/Utils'
  import service from './../service'

  export default {
    name: 'trade-sys-pass-dialog',
    data () {
      var vm = this
      return {
        rules: {
          channelName: [
            { required: true, message: vm.renderData.pleaseEnterChannelName, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.qianhouNoSpace,
              trigger: 'blur'
            }
          ],
          mt4ServerName: [
            { required: true, message: vm.renderData.pleaseEnterMt4ServerName, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.qianhouNoSpace,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test: function (value) {
                let params = {
                  uuid: vm.itemData.uuid,
                  mt4ServerName: value
                }
                return utils.checkMt4ServerName(params)
              },
              message: vm.renderData.mt4ServerNameExist,
              trigger: 'blur'
            }
          ],
          ip: [
            { required: true, message: vm.renderData.pleaseEnterIp, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.qianhouNoSpace,
              trigger: 'blur'
            }
          ],
          port: [
            { required: true, message: vm.renderData.pleaseEnterPort, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.qianhouNoSpace,
              trigger: 'blur'
            }
          ],
          managerLogin: [
            { required: true, message: vm.renderData.pleaseEnterManagerLogin, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.qianhouNoSpace,
              trigger: 'blur'
            }
          ],
          managerPassword: [
            { required: true, message: vm.renderData.pleaseEnterManagerPassword, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.qianhouNoSpace,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      itemData: {
        type: Object,
        required: true
      },
      optType: {
        type: String
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      cancelForm () {
        this.visible.dialog = null
      },
      submitForm () {
        let vm = this
        vm.$refs['form'].validate((valid) => {
          if (valid) {
            if (vm.itemData.uuid === '') {
              service.addMt4Channel(vm.itemData).then(data => {
                if (data.re === '200') {
                  this.$emit('refreshList')
                  this.visible.dialog = null
                  vm.$message({
                    message: this.renderData.saveSucceed,
                    type: 'success'
                  })
                } else {
                  this.visible.dialog = null
                  vm.$message({
                    message: this.renderData.netErrorSaveFail,
                    type: 'error'
                  })
                }
              })
            } else {
              service.editMt4Channel(vm.itemData).then(data => {
                if (data.re === '200') {
                  this.$emit('refreshList')
                  this.visible.dialog = null
                  vm.$message({
                    message: this.renderData.saveSucceed,
                    type: 'success'
                  })
                } else {
                  this.visible.dialog = null
                  vm.$message({
                    message: this.renderData.netErrorSaveFail,
                    type: 'error'
                  })
                }
              })
            }
          } else {
            return false
          }
        })
      }
    },
    mounted () {
    },
    components: {
      BDialog,
      BInput,
      BButton
    }
  }
</script>

<style lang="less">
  .trade-sys-pass-dialog{
    .el-dialog .el-dialog__body {
      max-height: 50%!important;
      overflow-y: auto!important;
    }
    .el-form-item:last-child{
      margin-bottom: 0 !important;
    }
  }
</style>
