<template lang="pug">
  b-dialog.check_pwd(:show="activeName2", :title="renderData.operateOpts[1].label", :show-close="true", :before-close="beforeClose")
    .check_body
      p {{renderData.operateOpts[1].check_trade_account_list_check_account_pwd.account}}&nbsp; : &nbsp;&nbsp;&nbsp;{{accountId}}
      p {{renderData.operateOpts[1].check_trade_account_list_check_account_pwd.mainPwd}}&nbsp; : &nbsp;&nbsp;&nbsp;{{masterPwd}}
      p {{renderData.operateOpts[1].check_trade_account_list_check_account_pwd.agentPwd}}&nbsp; : &nbsp;&nbsp;&nbsp;{{investorPwd}}
    template(slot="footer")
      b-button(@click="active", type="primary") {{renderData.operateOpts[1].check_trade_account_list_check_account_pwd.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BTitle from 'components/BTitle'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'
  import service from '../service'

  export default {
    data () {
      return {
        activeName2: true,
        accountId: '',
        investorPwd: '',
        masterPwd: ''
      }
    },
    props: {
      renderData: {
        type: Object
      },
      accountInfo: {
        type: Object
      },
      profile: {
        type: Object
      }
    },
    methods: {
      beforeClose () {
        this.$emit('checkPwdDialog')
      },
      active () {
        this.$emit('checkPwdDialog')
      }
    },
    async mounted () {
      var vm = this
      var params = {
        cpne_name: 'all_user',
        target_uid: this.profile.uid,
        target_aid: this.accountInfo.account_id
      }
      await service.checkPwd(params).then(data1 => {
        console.log(data1)
        vm.accountId = data1.data.accountId
        console.log(vm.accountId)
        vm.investorPwd = data1.data.investorPwd
        vm.masterPwd = data1.data.masterPwd
      })
    },
    components: {
      BDialog,
      BTitle,
      service,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  .all-user-list-fund-setting{}
</style>

