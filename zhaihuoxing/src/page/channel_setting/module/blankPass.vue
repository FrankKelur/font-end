<template lang="pug">
<<<<<<< HEAD
  .blank-pass(v-loading="loading" element-loading-text="加载中")
    | 银行通道
</template>

<script>
  export default {
    data () {
      return {
        loading: true
      }
    },
    props: {
    },
    methods: {
    },
    mounted () {
      var vm = this
      setTimeout(function () {
        vm.loading = false
      }, 1500)
    },
    components: {
=======
  .blank-pass.theme-color-C(:v-loading="loading", :element-loading-text="renderData.loading")
    el-collapse(v-model="activeName")
      el-collapse-item.theme-color-C(:title="renderData.unionPay", name="unionpay", v-if="unionpayPass")
        .box-warp.theme-bg-H.theme-box-shadow-D(v-for="(item, index) in unionpayList")
          .box-header.theme-border-bottom-lightenD12
            span.theme-color-C {{item.channelName.label}}
          .box-content
            el-form(label-width="140px" label-position='left' ref="form")
              .form-detail
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.unionPayType", v-ellipsis-title="")
                  p.theme-color-C(v-text='item.unionType' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.merchantId", v-ellipsis-title="")
                  p.theme-color-C(v-text='item.merchantId' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.successReturn", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.successReturn.label' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.failureReturn", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.failureReturn.label' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.securityCode", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.securityCode' v-ellipsis-title="")
                el-form-item(prop="")
                  template(slot="label")
                    span.theme-color-C.item-label-left.inline-label(v-text="renderData.productName", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.productName.label' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.usedBank", v-ellipsis-title="")
                  .useingbank.ellipsis-title
                    p.theme-color-C(v-ellipsis-title="") {{item.usedBanks}}

          .box-footer
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deletebankChannel(item)")
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="editForm('form',item,index)")
        .add-form
          b-button(@click="addunionform") {{renderData.addChannel}}
          b-button(@click="manageBank") {{renderData.manageBank}}

      el-collapse-item.theme-color-C(:title="renderData.wiredTransfer" name="wiredtransfer", v-if="wiredtransferPass")
        .box-warp.theme-bg-H.theme-box-shadow-D(v-for="(item, index) in wiredtransferList", :key="")
          .box-header.theme-border-bottom-lightenD12
            span.theme-color-C {{item.channelName.label}}
            .switch
              b-switch(:width='switchWidth', @change="changeswitch(item)", :model="item.switch==0 ? false : true")
              span.theme-color-C(v-if="item.switch===1") {{renderData.able}}
              span.theme-color-C(v-if="item.switch===0") {{renderData.disable}}
          .box-content
            el-form(label-width="140px" label-position='left' ref="form")
              .form-detail
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.payeeBank", v-ellipsis-title="")
                  p.theme-color-C(v-text='item.payeeBank' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.payeeBankAddress", v-ellipsis-title="")
                  p.theme-color-C(v-text='item.payeeBankAddress' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.accountNo", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.accountNo' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.payeeName", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.payeeName' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.payeeAddress", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.payeeAddress' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.swiftCode", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.swiftCode' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.routeNo", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.routeNo' v-ellipsis-title="")
                el-form-item(prop="", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.referenceNo", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.referenceNo' v-ellipsis-title="")
                el-form-item(prop="")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.importantInfo", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.importantInfo' v-ellipsis-title="")
          .box-footer
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deletebankChannel(item)")
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="editwiredtransferForm('form',item,index)")
        .add-form
          b-button(@click="addwiredtransfer") {{renderData.addChannel}}

      el-collapse-item(:title="renderData.wechat", name="wechat", v-if="wechatPass")
        blank-wechat(:data="wechatList", @refreshList="getBankList")

      el-collapse-item(:title="renderData.epayments", name="epayments", v-if="epaymentsPass")
        blank-epayments(:data="epaymentsList", @refreshList="getBankList")

      el-collapse-item(:title="renderData.neteller" name="neteller", v-if="netellerPass")
        blank-neteller(:data="netellerList", @refreshList="getBankList")

      el-collapse-item(:title="renderData.skrill" name="skrill", v-if="skrillPass")
        blank-skrill(:data="skrillList", @refreshList="getBankList")

    component(:is="visible2.dialog", :visible="visible2", :renderData='renderData', :itemData='itemData', @refreshList="getBankList")
    component(:is="visible1.dialog", :visible="visible1", :renderData='renderData', :itemData='itemData', @refreshList="getBankList", :useingbank='useingbank')
    component(:is="visible3.dialog", :visible="visible3")
</template>

<script>
  import BSwitch from 'components/BSwitch'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import bankPassDialog from './bankPassDialog.vue'
  import bankTransferDialog from './bankTransferDialog.vue'
  import service from './../service'
  import manageBank from './manageBank.vue'
  import blankWechat from './blankWechat.vue'
  import blankEpayments from './blankEpayments.vue'
  import blankNeteller from './blankNeteller.vue'
  import blankSkrill from './blankSkrill.vue'

  export default {
    data () {
      var renderData = window.renderData.components.channel_setting.channel_setting_bank
      return {
        renderData: renderData,
        activeName: ['unionpay'],
        useingbank: [],
        unionpayList: [],
        wiredtransferList: [],
        wechatList: null,
        epaymentsList: null,
        netellerList: null,
        skrillList: null,
        unionpayPass: false,
        wiredtransferPass: false,
        wechatPass: false,
        epaymentsPass: false,
        netellerPass: false,
        skrillPass: false,
        loading: false,
        itemData: {
          cid: '',
          data: null
        },
        status: '',
        switchWidth: 45,
        visible1: {
          dialog: null
        },
        visible2: {
          dialog: null
        },
        visible3: {
          dialog: null
        }
      }
    },
    methods: {
      manageBank () {
        this.visible3.dialog = 'manageBank'
      },
      addunionform () {
        this.itemData = {
          cid: '',
          data: {
            channelName: {key: '', label: ''},
            unionType: '',
            merchantId: '',
            successReturn: {key: '', label: ''},
            failureReturn: {key: '', label: ''},
            securityCode: '',
            productName: {key: '', label: ''},
            usedBank: [],
            supportCurrency: []
          }
        }
        this.unionpayList.forEach(item1 => {
          item1.usedBank.forEach(item2 => {
            this.useingbank.push(item2.key)
          })
        })
        this.visible1.dialog = 'bankPassDialog'
      },
      editForm (formName, item) {
        this.itemData.data = JSON.parse(JSON.stringify(item))
        this.itemData.cid = item.cid
        this.useingbank = []
        let arr = []
        item.usedBank.forEach(item3 => {
          arr.push(item3.key)
        })
        this.unionpayList.forEach(item1 => {
          item1.usedBank.forEach(item2 => {
            this.useingbank.push(item2.key)
            this.useingbank = this.useingbank.filter(item => !arr.includes(item))
          })
        })
        this.visible1.dialog = 'bankPassDialog'
      },
      deletebankChannel (item) {
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
            vm.getBankList()
            vm.$message({
              type: 'success',
              message: vm.renderData.deleteSucceed
            })
          })
        })
      },
      addwiredtransfer () {
        this.itemData = {
          cid: '',
          data: {
            channelName: {key: '', label: ''},
            payeeBank: '',
            payeeBankAddress: '',
            accountNo: '',
            payeeName: '',
            payeeAddress: '',
            swiftCode: '',
            routeNo: '',
            referenceNo: '',
//            orderPrefix: '',
            supportCurrency: [],
            importantInfo: ''
          }
        }
        this.visible2.dialog = 'bankTransferDialog'
      },
      editwiredtransferForm (formName, item) {
        this.itemData.data = JSON.parse(JSON.stringify(item))
        this.itemData.cid = item.cid
        this.visible2.dialog = 'bankTransferDialog'
      },
      changeswitch (item) {
        if (item.switch === 0) {
          this.status = 'able'
        } else {
          this.status = 'disable'
        }
        var params = {
          cid: item.cid,
          status: this.status
        }
        service.switchControl(params).then(data => {
          this.getBankList()
        })
      },
      getBankList () {
        let vm = this
        service.getBankList({}).then(data => {
          if (data.unionPay) {
            vm.unionpayPass = true
            vm.unionpayList = data.unionPay
            vm.unionpayList.forEach(item => {
              item.usedBanks = ''
              item.usedBank.forEach(bank => {
                if (item.usedBanks !== '') {
                  item.usedBanks = item.usedBanks + vm.renderData.comma + bank.label
                } else {
                  item.usedBanks = bank.label
                }
              })
            })
          } else {
            vm.unionpayPass = false
          }
          if (data.wiredTransfer) {
            vm.wiredtransferPass = true
            vm.wiredtransferList = data.wiredTransfer
          } else {
            vm.wiredtransferPass = false
          }
          if (data.wechat) {
            vm.wechatPass = true
            vm.wechatList = data.wechat
          } else {
            vm.wechatPass = false
          }
          if (data.epayments) {
            vm.epaymentsPass = true
            vm.epaymentsList = data.epayments
          } else {
            vm.epaymentsPass = false
          }
          if (data.neteller) {
            vm.netellerPass = true
            vm.netellerList = data.neteller
          } else {
            vm.netellerPass = false
          }
          if (data.skrill) {
            vm.skrillPass = true
            vm.skrillList = data.skrill
          } else {
            vm.skrillPass = false
          }
          vm.loading = false
        })
      }
    },
    mounted () {
      this.getBankList()
    },
    components: {
      'bankPassDialog': bankPassDialog,
      'bankTransferDialog': bankTransferDialog,
      'manageBank': manageBank,
      'blankWechat': blankWechat,
      'blankEpayments': blankEpayments,
      'blankNeteller': blankNeteller,
      'blankSkrill': blankSkrill,
      BSwitch,
      BInput,
      BButton,
      BIcon
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</script>

<style lang="less">
  @import '../../../common/styleSheet/common.less';
  .blank-pass{
<<<<<<< HEAD
=======
    .box-warp{
      float: left;
      width: 48%;
      margin-bottom: 25px;
      border-radius: 4px;
      .box-header{
        height: 58px;
        line-height: 58px;
        border-bottom: 1px solid;
        >span:nth-child(1){
          margin-left: 4%;
          font-size: 16px;
          font-weight: bold;
        }
        .switch{
          text-align: right;
          width: 30%;
          float: right;
          margin-right: 5%;
          font-size: 14px;
          .el-switch{
            margin-right: 10%;
          }
        }
      }
      .box-content{
        padding: 25px 4% 30px;
        .el-form-item{
          margin-bottom: 0;
          .item-label-left{
            margin-left: 0 !important;
          }
        }
        .el-form-item:last-child{
          margin-bottom: 0 !important;
        }
        .form-detail{
          p{
            width: 100%;
          }
          .useingbank{
            width: 100%;
          }
        }
      }
      .box-footer{
        padding: 0 5% 25px;
        text-align: right;
        .icon-margin-right{
          margin-right: 4%;
        }
        .b-icon{
          margin-left: 4%;
          margin-bottom: 25px;
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
    .box-warp:nth-of-type(even){
      margin-left: 1%;
    }
    .box-warp:nth-of-type(odd){
      margin-left: 1.5%;
    }
    .no-data{
      padding: 20px;
      text-align: center;
      font-size: 22px;
    }
    .add-form{
      clear: both;
      margin-left: 1.5%;
    }
    .el-collapse-item__header {
      color: inherit;
    }
    .el-collapse-item__content{
      padding: 10px 0 30px !important;
    }
    .el-collapse-item__content:after{
      content: " ";
      display: block;
      clear: both;
    }
    .tooltip-icon{
      display: inline-block;
      margin-left: 5px!important;
    }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  }
</style>
