<template lang="pug">
  .role_management.theme-border-lightenD12.component#role_management
    .kongdiv1
      b-title.amt-more-left-in(:title="pageTitle" v-if="!visible.page")
    .kongdiv2
      b-title.amt-more-left-in(:title="pageTitle" v-if="visible.page")
    template(v-if="!visible.page")
      .oper-container.clear-float.amt-more-left-in
        el-row(:gutter="10")
          el-col(:span="3", :offset='21', v-if="roleManagement.role_management_new_role")
            b-button(@click='createRole', :disabled="createRenderData.authStatus==='disabled'") {{createRenderData.newRole}}
      b-search-table.amt-more-left-in(:optHandler='optHandler', :render-data="tableRenderData", url="/api/rbac/role/get_role_list", ref="table")

    component.amt-more-left-in(:is="visible.page", :render-data="pageRenderData", :visible="visible", :rid="currRole.rid")

    component(:is="visible.dialog", :render-data="modalRenderData", :visible="visible", :curr-role="currRole")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import LinkUser from './module/linkUser'
  import DeleteRole from './module/deleteRole'
  import NewRole from './module/newRole'
  import componentMixin from 'common/js/componentMixin'

  export default {
    mixins: [componentMixin],
    name: 'role_management',
    data () {
      var roleManagement = window.renderData.components.role_management
      var renderData = Object.assign({}, roleManagement.role_management_auth)
      var tableRenderData = Object.assign({}, roleManagement.role_management_auth)
      tableRenderData.listObj = roleManagement.role_management_list_role
      tableRenderData.searchObj = roleManagement.role_management_search_role
      var createRenderData = Object.assign({}, roleManagement, roleManagement.role_management_auth, roleManagement.role_management_new_role)
      var _this = this
      var optHandler = {}
      var cmdList = ['role_management_edit_auth', 'role_management_link_user', 'role_management_copy_role', 'role_management_delete_role']
      cmdList.forEach(cmd => {
        optHandler[cmd] = function (row, renderData) {
          console.log('row, renderData', ...arguments)
          _this.currRole = row
          /* remove the role_management_link_user temporarily */
          if (cmd === 'role_management_link_user' || cmd === 'role_management_copy_role' || cmd === 'role_management_edit_auth') {
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
        pageRenderData: {},
        tableRenderData: tableRenderData,
        createRenderData: createRenderData,
        renderData: renderData,
        roleManagement: roleManagement,
        modalRenderData: {},
        currRole: {rid: ''},
        optHandler: optHandler
      }
    },
    computed: {
      pageTitle () {
        if (this.visible.page === null) {
          return this.renderData.roleManagement
        } else if (this.visible.page === 'role_management_edit_auth') {
          return this.pageRenderData.editAuth
        } else if (this.visible.page === 'role_management_copy_role') {
          return this.pageRenderData.copyRole
        } else {
          return this.pageRenderData.newRole
        }
      }
    },
    methods: {
      createRole () {
        this.visible.page = 'role_management_new_role'
        this.currRole = {rid: ''}
        this.pageRenderData = Object.assign({}, this.renderData, this.roleManagement.role_management_new_role)
      }
    },
    components: {
      'role_management_link_user': LinkUser,
      'role_management_copy_role': NewRole,
      'role_management_new_role': NewRole,
      'role_management_edit_auth': NewRole,
      'role_management_delete_role': DeleteRole,
      BTitle,
      BButton,
      BSearchTable
    },
    watch: {
      'visible.dialog': function (newVal, oldVal) {
        !newVal && this.$refs['table'].search()
      }
    }
  }
</script>

<style lang="less">
  .role_management {
    position: relative;
<<<<<<< HEAD
    /*border-style: solid;*/
    /*border-width: 1px;*/
=======
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    .oper-container {
      .el-col {
        .el-button {
          width: 100% !important;
        }
      }
      padding-bottom: 12px;
    }
<<<<<<< HEAD
=======
    .tabPopover1 {
      top: 4px;
    }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  }
</style>
