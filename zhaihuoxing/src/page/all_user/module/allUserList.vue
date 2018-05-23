<template lang="pug">
  .all-user-list
    b-title(:title="renderData.allUser", v-if="!visible.page")
    .list(v-if="!visible.page")
      b-search-table(:optHandler='optHandler', :render-data="tableRenderData", ref="table", url="/api/resource/user/all_user_list")
    component(:is="visible.page", :render-data="pageRenderData", :visible="visible", :profile="profile")
    //component(:is="visible.dialog", :render-data="modalRenderData", :visible="visible")
</template>

<script>
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import userDetails from './userDetails'
  import allUserListAccountSetting from './allUserListAccountSetting'
  import allUserListFundSetting from './allUserListFundSetting'
  export default {
    data () {
      var allUser = window.renderData.components.all_user
      var renderData = Object.assign({}, allUser.all_user_auth, allUser.all_user_search, allUser.all_user_list)
      var tableRenderData = Object.assign({}, allUser.all_user_auth)
      tableRenderData.listObj = allUser.all_user_list
      tableRenderData.searchObj = allUser.all_user_search
      var _this = this
      var optHandler = {}
      var cmdList = ['all_user_list_user_profile', 'all_user_list_account_setting', 'all_user_list_fund_setting']
      cmdList.forEach(cmd => {
        optHandler[cmd] = function (row, renderData) {
          console.log('row, renderData', ...arguments)
          _this.profile = row
          console.log(row)
          if (cmd === 'all_user_list_user_profile' || cmd === 'all_user_list_account_setting' || cmd === 'all_user_list_fund_setting') {
            _this.visible.page = cmd
            _this.pageRenderData = renderData
          } else {
            _this.modalRenderData = renderData
            _this.visible.dialog = cmd
          }
        }
      })
      return {
        visible: {
          dialog: null,
          page: null
        },
        profile: {},
        renderData: renderData,
        tableRenderData: tableRenderData,
        optHandler: optHandler,
        pageRenderData: {},
        modalRenderData: {}
      }
    },
    components: {
      BTitle,
      BSearchTable,
      'all_user_list_account_setting': allUserListAccountSetting,
      'all_user_list_fund_setting': allUserListFundSetting,
      'all_user_list_user_profile': userDetails
    }
  }
</script>

<style lang="less">
  .all-user-list {
    position: relative;
  }
</style>
