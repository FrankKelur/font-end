<template lang="pug">
  .com-warp
    .box-warp.theme-bg-H.theme-box-shadow-D(v-for="(item, index) in data", :key="index")
      .box-header.theme-border-bottom-lightenD12
        span.theme-color-C(v-text='item.channelName.label' v-ellipsis-title="")
        .switch
          b-switch(:width="45", @change="changeSwitch(item)", :model="item.switch==0 ? false : true")
          span.theme-color-C(v-if="item.switch===1") {{renderData.able}}
          span.theme-color-C(v-if="item.switch===0") {{renderData.disable}}
      .box-content
        el-form(label-width="140px" label-position='left')
          .form-detail
            el-form-item(:label="renderData.wechatName", class="is-required")
              p.theme-color-C(v-text='item.wechatName' v-ellipsis-title="")
            el-form-item(:label="renderData.wechatMid", class="is-required")
              p.theme-color-C(v-text='item.wechatMid' v-ellipsis-title="")
            el-form-item(:label="renderData.wechatMkey", class="is-required")
              p.theme-color-C(v-text='item.wechatMkey' v-ellipsis-title="")
            el-form-item(:label="renderData.payeeName", class="is-required")
              p.theme-color-C(v-text='item.payeeName' v-ellipsis-title="")
            el-form-item(:label="renderData.returnUrl", class="is-required")
              p.theme-color-C(v-text='item.returnUrl.label' v-ellipsis-title="")
      .box-footer
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deleteChannel(item)")
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="editChannel(item)")
    .add-form
      b-button(@click="addChannel") {{renderData.addChannel}}

    el-dialog(:visible="formDialogModel", :title="renderData.wechatEdit" width="30%", :before-close="beforeClose")
      el-form(label-width="140px" label-position='left' ref="form", :model="formEdit", :rules="rules")
        el-form-item(:label="renderData.channelName" prop="channelName")
          el-input(v-model="formEdit.channelName", :placeholder="renderData.pleaseEnterChannelName")
        el-form-item(:label="renderData.wechatType" prop="wechatType")
          el-select(v-model="formEdit.wechatType", :placeholder="renderData.pleaseSelectWechatType")
            el-option(v-for="item in ['RPN']", :key="item", :label="item", :value="item")
        .has-wecha-type(v-if="formEdit.wechatType!==''")
          el-form-item(:label="renderData.wechatName" prop="wechatName")
            el-input(v-model="formEdit.wechatName", :placeholder="renderData.pleaseEnterWechatName")
          el-form-item(:label="renderData.wechatMid" prop="wechatMid")
            el-input(v-model="formEdit.wechatMid", :placeholder="renderData.pleaseEnterWechatMid")
          el-form-item(:label="renderData.wechatMkey" prop="wechatMkey")
            el-input(v-model="formEdit.wechatMkey", :placeholder="renderData.pleaseEnterWechatMkey")
          el-form-item(:label="renderData.payeeName" prop="payeeName")
            el-input(v-model="formEdit.payeeName", :placeholder="renderData.pleaseEnterPayeeName")
          el-form-item(:label="renderData.returnUrl" prop="returnUrl")
            el-select(v-model="formEdit.returnUrl", :placeholder="renderData.pleaseSelectReturnUrl")
              el-option(v-for="item in urlData", :key="item.key", :label="item.label", :value="item.key")
      div(slot="footer" class="dialog-footer")
        b-button(@click="cancelSubForm") {{renderData.cancel}}
        b-button(type="primary", @click="sureSubForm") {{renderData.confirm}}

</template>

<script>
  import BSwitch from 'components/BSwitch'
  import BSelect from 'components/BSelect'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import service from './../service'
  import componentService from './../blankWechatService'

  export default {
    data () {
      var renderData = window.renderData.components.channel_setting.channel_setting_bank
      return {
        renderData: renderData,
        formDialogModel: false,
        urlData: null,
        itemData: {
          cid: ''
        },
        formEdit: {
          cid: '',
          channelName: '',
          wechatType: '',
          wechatName: '',
          wechatMid: '',
          wechatMkey: '',
          payeeName: '',
          returnUrl: ''
        },
        rules: {
          channelName: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          wechatType: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ],
          wechatName: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          wechatMid: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          wechatMkey: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          payeeName: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          returnUrl: [
            { required: true, message: renderData.pleaseSelect, trigger: 'change' }
          ]
        }
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    methods: {
      changeSwitch (item) {
        let params = {
          cid: item.cid,
          status: ''
        }
        if (item.switch === 0) {
          params.status = 'able'
        } else {
          params.status = 'disable'
        }
        service.switchControl(params).then(data => {
          this.$emit('refreshList')
        })
      },
      deleteChannel (item) {
        let vm = this
        vm.$confirm(vm.renderData.deleteChannelText, vm.renderData.deleteChannel, {
          confirmButtonText: vm.renderData.confirm,
          cancleButtonText: vm.renderData.cancel,
          type: 'warning'
        }).then(() => {
          var params = {
            cid: item.cid
          }
          service.deletebankChannel(params).then(data => {
            if (data.re === '200') {
              vm.$emit('refreshList')
              vm.$message({
                type: 'success',
                message: vm.renderData.deleteSucceed
              })
            }
          })
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: vm.renderData.cancelTool
          })
        })
      },
      addChannel () {
        if (this.urlData === null) {
          this.getPageList()
        }
        this.formEdit = {
          cid: '',
          channelName: '',
          wechatType: '',
          wechatName: '',
          wechatMid: '',
          wechatMkey: '',
          payeeName: '',
          returnUrl: ''
        }
        this.formDialogModel = true
      },
      editChannel (item) {
        this.itemData.cid = item.cid
        if (this.urlData === null) {
          this.getPageList()
        }
        this.formEdit = {
          cid: item.cid,
          channelName: item.channelName.label,
          wechatType: item.wechatType.label,
          wechatName: item.wechatName,
          wechatMid: item.wechatMid,
          wechatMkey: item.wechatMkey,
          payeeName: item.payeeName,
          returnUrl: item.returnUrl.key
        }
        this.formDialogModel = true
      },
      sureSubForm () {
        let vm = this
        vm.$refs['form'].validate((valid) => {
          if (valid) {
            var params = {
              cid: this.formEdit.cid,
              data: {
                channelName: {
                  key: '',
                  label: this.formEdit.channelName
                },
                wechatType: {
                  key: 'rpn',
                  label: this.formEdit.wechatType
                },
                wechatName: this.formEdit.wechatName,
                wechatMid: this.formEdit.wechatMid,
                wechatMkey: this.formEdit.wechatMkey,
                payeeName: this.formEdit.payeeName,
                returnUrl: {
                  key: this.formEdit.returnUrl,
                  label: ''
                }
              }
            }
            for (let i = 0; i < vm.urlData.length; i++) {
              if (vm.urlData[i].key === params.data.returnUrl.key) {
                params.data.returnUrl.label = vm.urlData[i].label
              }
            }
            componentService.editWechatChannel(params).then(data => {
              if (data.re === '200') {
                vm.$emit('refreshList')
                vm.formDialogModel = false
                vm.$message({
                  type: 'success',
                  message: vm.renderData.saveSucceed
                })
              } else {
                vm.formDialogModel = false
                vm.$message({
                  type: 'error',
                  message: vm.renderData.netErrorSaveFail
                })
              }
            })
          }
        })
      },
      cancelSubForm () {
        this.formDialogModel = false
        this.$refs['form'].clearValidate()
      },
      beforeClose (done) {
        this.formDialogModel = false
        this.$refs['form'].clearValidate()
        done()
      },
      getPageList () {
        return service.getPageList({}).then(data => {
          this.urlData = data.data
        })
      }
    },
    mounted () {
    },
    components: {
      BSwitch,
      BSelect,
      BButton,
      BIcon
    }
  }
</script>

<style lang="less">
</style>
