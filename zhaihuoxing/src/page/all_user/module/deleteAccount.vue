<template lang="pug">
  b-dialog.delete_account(:show="activeName1", :title="renderData.operateOpts[0].label", :show-close="true", :before-close="beforeClose")
    .delete_icon
      b-icon.theme-color-F.dialog_icon(icon-name='attention', size="30px")
    .delete_word
      span {{renderData.operateOpts[0].check_trade_account_list_delete_account.deleteAccountText}}
    template(slot="footer")
      b-button(@click="active") {{renderData.operateOpts[0].check_trade_account_list_delete_account.cancel}}
      b-button(@click="active1", type="primary") {{renderData.operateOpts[0].check_trade_account_list_delete_account.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'
  import service from '../service'

  export default {
    data () {
      return {
        activeName1: true
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
      active1 () {
        this.$emit('checkPwdDialog')
        var params = {
          cpne_name: 'all_user',
          target_uid: this.profile.uid,
          target_account_id: this.accountInfo.account_id
        }
        service.deleteAccount(params).then(data1 => {
          console.log(data1)
        })
      },
      active () {
        this.$emit('checkPwdDialog')
      }
    },
    async mounted () {
    },
    components: {
      BDialog,
      BIcon,
      BButton,
      service
    }
  }
</script>

<style lang="less">
  .delete_icon {
    display: inline-block;
    margin-right: 20px;
  }
  .delete_word {
    display: inline-block;
  }
</style>
