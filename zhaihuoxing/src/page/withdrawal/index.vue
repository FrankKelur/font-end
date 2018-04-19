<template lang="pug">
  .withdrawal.theme-border-lightenD12.component#withdrawal
    el-dialog(:visible.sync='dialogVisible', title="", width="30%" v-if="withdrawal.withdrawal_info" center)
      p
        b-icon.theme-color-F(icon-name='attention', size="35px")
      p.theme-color-C {{renderData.attention}}
      p.theme-color-C {{renderData.attentionText}}
      div(slot="footer" class="dialog-footer")
        b-button(@click="dialogVisible=false", type="primary") {{renderData.confirm}}

    b-title(:title="renderData.withdrawal")
    .withdrawal_bodyer
      .collapse(v-if="show === 'collapse'")
        el-collapse(v-model="activeName", accordion)
          el-collapse-item(name="1" v-if="withdrawal.withdrawal_unionpay")
            template(slot="title")
              img(src="../../../static/images/unionpay.png")
              span.title {{renderData.unionpay}}
            unionpay(:renderData="renderData", :unionpayObj="unionpayObj", @changeShow1="changeShow1", @unionpayObj="unionpay", :list="selectList", v-if="selectList.length!==0")

          el-collapse-item(name="2" v-if="withdrawal.withdrawal_wired_transfer")
            template(slot="title")
              img(src="../../../static/images/wired_transfer.png")
              span.title {{renderData.wiredTransfer}}
            wired-transfer(:renderData="renderData", :trans-obj="transferObj", @changeShow2="changeShow2", @stashData="stashWiredTransfer", :list="selectList", v-if="selectList.length!==0")

          el-collapse-item(name="epayments" v-if="withdrawal.withdrawal_epayments")
            template(slot="title")
              img(src="../../../static/images/epayments.png")
              span.title {{renderData.epayments}}
            epayments(:list="selectList", v-if="selectList.length!==0")

          el-collapse-item(name="neteller" v-if="withdrawal.withdrawal_neteller")
            template(slot="title")
              img(src="../../../static/images/neteller.png")
              span.title {{renderData.neteller}}
            neteller(:list="selectList", v-if="selectList.length!==0")

          el-collapse-item(name="skrill" v-if="withdrawal.withdrawal_skrill")
            template(slot="title")
              img(src="../../../static/images/skrill.png")
              span.title {{renderData.skrill}}
            skrill(:list="selectList", v-if="selectList.length!==0")

      .unionpayManageCard(v-else-if="show === 'unionpay' ")
        add-unionpay(:renderData="renderData", v-on:back="back")
      .wiredTransferManageCard(v-else="show === 'wiredTransfer'")
        add-wired-transfer(:renderData="renderData", v-on:back="back")

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BIcon from 'components/BIcon'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import unionpay from './module/unionpay.vue'
  import wiredTransfer from './module/wiredTransfer.vue'
  import addUnionpay from './module/addUnionpay.vue'
  import addWiredTransfer from './module/addWiredTransfer.vue'
  import epayments from './module/epayments.vue'
  import neteller from './module/neteller.vue'
  import skrill from './module/skrill.vue'
  import service from './service'

  export default {
    mixins: [componentMixin],
    name: 'withdrawal',
    data () {
      // 获取账号邮箱
      service.getUserEmailForAccount({}).then(data => {
        window.renderData.components.withdrawal.withdrawal_auth.USEREMAIL = data.account
      })
      var withdrawal = window.renderData.components.withdrawal
      var renderData = Object.assign({}, withdrawal.withdrawal_auth, withdrawal.withdrawal_info, withdrawal.withdrawal_unionpay, withdrawal.withdrawal_wired_transfer, withdrawal.withdrawal_epayments, withdrawal.withdrawal_neteller, withdrawal.withdrawal_skrill)
      return {
        withdrawal: withdrawal,
        unionpayObj: {
          account: '',
          currency: '-',
          currencySymbol: '-',
          amount: '',
          checked: false,
          bank: {
            cardNo: '',
            name: '',
            bankName: '',
            bankBranch: '',
            bankProvince: '',
            bankCity: ''
          },
          others: {}
        },
        transferObj: {
          account: '',
          currency: '-',
          currencySymbol: '-',
          amount: '',
          bank: {
            cardNo: '',
            name: '',
            bankName: '',
            swiftcode: '',
            bankBranch: '',
            bankAddress: '',
            phoneNo: '',
            email: '',
            message: '',
            address: ''
          },
          others: {},
          checked: false
        },
        activeName: 'epayments',
        renderData: renderData,
        dialogVisible: true,
        show: 'collapse',
        selectList: []
      }
    },
    methods: {
      unionpay (data) {
        this.unionpayObj = data
        console.log('暂存的data')
        console.log(data)
      },
      stashWiredTransfer (data) {
        this.transferObj = data
        console.log('暂存的data')
      },
      changeShow1 () {
        this.show = 'unionpay'
      },
      changeShow2 () {
        this.show = 'wiredTransfer'
      },
      back () {
        this.show = 'collapse'
      }
    },
    mounted () {
      service.getTradeAccountSelect({}).then(data => {
        this.selectList = data
      })
    },
    components: {
      BIcon,
      BTitle,
      BButton,
      unionpay,
      wiredTransfer,
      addUnionpay,
      addWiredTransfer,
      epayments,
      neteller,
      skrill
    }
  }
</script>

<style lang="less">
  #withdrawal {
    /* 该页面有多个模态框,所以必须定位到第一个模态框 */
    >.el-dialog__wrapper>.el-dialog {
      .el-dialog__header{
        display: none;
      }
      .el-dialog__body{
        border-bottom: none !important;
        padding: 25px 25px 0!important;
        p:not(:last-child){
          margin-bottom: 15px;
          text-align: center;
        }
      }
    }
    .el-collapse-item__header{
      img{
        vertical-align: middle;
      }
      .title{
        margin-left: 20px;
        vertical-align: middle;
      }
    }
    .el-collapse-item__content {
      padding: 45px 5% !important;
    }
    .unionpay,.wiredTransfer,.epayments,.neteller,.skrill{
      &:after{
        display: block;
        content: " ";
        clear: both;
      }
      .user-operation .el-form-item:last-child{
        margin-bottom: 0 !important;
      }
      .user-operation .manageCard{
        position: relative;
        margin-bottom: 32px;
        span {
          position: absolute;
          right: -70px;
          cursor: pointer;
        }
      }
      .user-operation .el-date-editor{
        width: 100% !important;
      }
      .user-operation,.legal-description{
        float: left;
        width: 50%;
      }
      .input-long-type1 {
        width: 50% !important;
      }
      .input-long-type2 {
        width: 30% !important;
      }
      .p{
        width: 80%;
      }
    }
  }
</style>
