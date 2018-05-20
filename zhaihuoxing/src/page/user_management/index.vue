<template lang="pug">
  .user_management.theme-border-lightenD12.component#user_management
    .kongdiv1
      b-title.amt-more-left-in(:title="pageTitle" v-if="!visible.page")
    .kongdiv2
      b-title.amt-more-left-in(:title="pageTitle" v-if="visible.page")
    template(v-if="!visible.page")
      .oper-container.clear-float.amt-more-left-in
        el-row(:gutter="10")
          el-col(:span="3", :offset='21', v-if="userManagement.user_management_new_user")
            b-button(@click='createUser', :disabled="createRenderData.authStatus==='disabled'") {{createRenderData.newUser}}
<<<<<<< HEAD
      b-search-table.amt-more-left-in(:optHandler='optHandler', :render-data="tableRenderData", url="/api/rbac/user/get_user_list", ref="table", class="tabFont1")
=======
      b-search-table.amt-more-left-in(:optHandler='optHandler', :render-data="tableRenderData", url="/api/rbac/user/get_user_list", ref="table", class="tabFont1", :opts-filter="optsFilter")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb

    component.amt-more-left-in(:is="visible.page", :render-data="modalRenderData", :visible="visible", :curr-row="currUser", :config="linkRoleConfig")

    component(:is="visible.dialog", :render-data="modalRenderData", :curr-user="currUser", :visible="visible")

</template>

<script>
<<<<<<< HEAD
=======
  import service from './service'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import ChangePassword from './module/changePassword'
<<<<<<< HEAD
=======
  import ChangeEmail from './module/changeEmail'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  import LinkRole from './module/linkRole'
  import DeleteUser from './module/deleteUser'
  import EditGroup from './module/editGroup'
  import ChangeMax from './module/changeMax'
  import NewUser from './module/newUser'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'user_management',
    mixins: [componentMixin],
    data () {
      var userManagement = window.renderData.components.user_management
      var renderData = Object.assign({}, userManagement.user_management_auth)
      var tableRenderData = Object.assign({}, userManagement.user_management_auth)
      tableRenderData.listObj = userManagement.user_management_list_user
      tableRenderData.searchObj = userManagement.user_management_search_user
      var createRenderData = Object.assign({}, userManagement, userManagement.user_management_auth, userManagement.user_management_new_user)
<<<<<<< HEAD
      console.log('createRenderData', createRenderData)
      var _this = this
      var optHandler = {}
      var cmdList = ['user_management_change_password', 'user_management_change_max', 'user_management_link_role', 'user_management_edit_group', 'user_management_delete_user']
      cmdList.forEach(cmd => {
        optHandler[cmd] = function (row, renderData) {
          console.log('操作', cmd)
=======
      var _this = this
      var optHandler = {}
      var cmdList = ['user_management_change_password', 'user_management_change_max', 'user_management_link_role', 'user_management_edit_group', 'user_management_delete_user', 'user_management_list_change_email']
      cmdList.forEach(cmd => {
        optHandler[cmd] = function (row, renderData) {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          _this.currUser = row
          _this.modalRenderData = renderData
          if (cmd === 'user_management_link_role') {
            _this.visible.page = cmd
          } else {
            _this.visible.dialog = cmd
          }
        }
      })
<<<<<<< HEAD
=======
      // 'user_management_list_disable_user', 'user_management_list_enable_user'
      optHandler.user_management_list_disable_user = function (row, renderData) {
        _this.$confirm(renderData.confirmText, renderData.userManagementListDisableUser, {
          confirmButtonText: _this.renderData.confirm,
          cancelButtonText: _this.renderData.cancel,
          type: 'warning'
        }).then(() => {
          var params = {
            uid: row.uid,
            disabled: true
          }
          service.toggleUserStatus(params).then(res => {
            if (res.re === '200') {
              _this.$refs['table'].search()
            }
          })
        })
      }
      optHandler.user_management_list_enable_user = function (row, renderData) {
        _this.$confirm(renderData.confirmText, renderData.userManagementListEnableUser, {
          confirmButtonText: _this.renderData.confirm,
          cancelButtonText: _this.renderData.cancel,
          type: 'warning'
        }).then(() => {
          var params = {
            uid: row.uid,
            disabled: false
          }
          service.toggleUserStatus(params).then(res => {
            if (res.re === '200') {
              _this.$refs['table'].search()
            }
          })
        })
      }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      return {
        visible: {
          dialog: null, // 【用户管理】组件初始化，null: 不弹框， delete_user: 删除用户弹框， edit_group: 编辑分组弹框， change_max: 设置角色上限弹框， change_password: 更改用户密码弹框
          page: null  // 【用户管理】组件初始化， list: 用户列表页面  link_role: 关联角色页面， new_user: 创建用户页面
        },
        linkRoleConfig: {
          linkRoleAuth: 'user_management_link_role',
          origin: 'user',
          showForm: true,
          showConfirm: true
        },
        tableRenderData: tableRenderData,
        createRenderData: createRenderData,
        renderData: renderData,
        userManagement: userManagement,
        modalRenderData: {},
        currUser: {},
        optHandler: optHandler
      }
    },
    computed: {
      pageTitle () {
        if (this.visible.page === null) {
          return this.renderData.userManagement
        } else if (this.visible.page === 'user_management_link_role') {
          console.log('this.modalRenderData.label', this.modalRenderData.label)
          return this.modalRenderData.linkRole
        } else if (this.visible.page === 'preview_role') {
          return this.modalRenderData.previewRole
        } else {
          return this.createRenderData.newUser
        }
      }
    },
    methods: {
      createUser () {
        this.visible.page = 'new_user'
        this.modalRenderData = this.createRenderData
<<<<<<< HEAD
=======
      },
      optsFilter (handlers, currRow) {
        return handlers.filter(permit => {
          if (!(currRow && currRow.status && currRow.status.key)) {
            return true
          }
          if (currRow.status.key === '3') { // 禁用状态
            return permit.auth !== 'user_management_list_disable_user'
          } else {
            return permit.auth !== 'user_management_list_enable_user'
          }
        })
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    components: {
      'user_management_link_role': LinkRole,
      'preview_role': LinkRole,
      'new_user': NewUser,
      'user_management_change_password': ChangePassword,
<<<<<<< HEAD
=======
      'user_management_list_change_email': ChangeEmail,
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      'user_management_edit_group': EditGroup,
      'user_management_change_max': ChangeMax,
      'user_management_delete_user': DeleteUser,
      BTitle,
      BButton,
      BSearchTable
    },
    watch: {
      'visible.dialog': function (newVal, oldVal) {
        console.log('visible.dialog change')
        !newVal && this.$refs['table'].search()
      }
    }
  }
</script>

<style lang="less">
<<<<<<< HEAD
  @import '../../common/styleSheet/variable.less';

  .user_management {
    position: relative;
    /*height: @componentHeight;*/
    /*overflow: auto;*/
    /*overflow-x: hidden;*/
    /*<!--border-style: solid;-->*/
    /*<!--border-width: @componentBorderWidth;-->*/
=======
  .user_management {
    position: relative;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    .oper-container {
      .el-col {
        .el-button {
          width: 100% !important;
        }
      }
      margin-bottom: 12px;
    }
  }
<<<<<<< HEAD
  .tabFont1{
=======

  .tabFont1 {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    font-size: 12px !important;
  }
</style>
