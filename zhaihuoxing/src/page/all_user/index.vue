<template lang="pug">
  .all_user.theme-border-lightenD12.component#all_user
    all-user-list
    //user-details(v-if="activeName==='userDetails'")
    //all-user-list-account-setting(v-if="activeName==='allUserListAccountSetting'", @back="back")
    //all-user-list-fund-setting(v-if="activeName==='allUserListFundSetting'", @back="back")
    //.btn-group(v-if="activeName===''")
      el-button(type="primary", @click="goVueCom('allUserList')") 用户管理业务
      el-button(type="info", @click="goVueCom('allUserListAccountSetting')") 交易及账号设置
      el-button(type="success", @click="goVueCom('allUserListFundSetting')") 资金存取设置
      el-button(type="error", @click="goVueCom('userDetails')") 用户详情

</template>

<script>
  import allUserList from './module/allUserList.vue'
  import allUserListAccountSetting from './module/allUserListAccountSetting.vue'
  import allUserListFundSetting from './module/allUserListFundSetting.vue'
  import componentMixin from 'common/js/componentMixin'
  import userDetails from './module/userDetails.vue'

  export default {
    name: 'all_user',
    mixins: [componentMixin],
    data () {
      var allUser = window.renderData.components.all_user
      var renderData = Object.assign({}, allUser.all_user_auth, allUser.all_user_search, allUser.all_user_list)
      return {
        renderData: renderData
//        activeName: ''
      }
    },
    methods: {
//      goVueCom (name) {
//        this.activeName = name
//      },
//      back () {
//        this.activeName = ''
//      }
    },
    components: {
      allUserList,
      userDetails,
      allUserListAccountSetting,
      allUserListFundSetting
    }
  }
</script>

<style lang="less">
  #all_user {
    position: relative;
  }
</style>
