<template lang="pug">
  .transfer.theme-border-lightenD12.component#transfer
    b-title.amt-more-left-in(:title="title")
    account-transfer.amt-more-left-in(v-if="comAuth.transfer_default")

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BTitle from 'components/BTitle'
  import accountTransfer from './module/accountTransfer.vue'

  export default {
    mixins: [componentMixin],
    name: 'transfer',
    data () {
      let comAuth = window.renderData.components.transfer
      return {
        title: window.renderData.components.transfer.transfer_auth.transfer,
        comAuth: comAuth
      }
    },
    components: {
      BTitle,
      accountTransfer
    }
  }
</script>

<style lang="less">
  #transfer {
    .account-transfer{
      padding: 35px 6% 50px 1.2%;
      &:after{
        display: block;
        content: " ";
        clear: both;
      }
      .user-operation .el-form-item:last-child{
        margin-bottom: 0 !important;
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
