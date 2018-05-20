<template lang="pug">
  .add-user.add-user-component(v-if="renderData.audit_set_add_user_list")
    .selected-user
      .title.theme-bg-I {{renderData.addUserSelectedUser}}
      .list
        b-tag(@close="deleteUser", v-for="(user, idx) in selectedUserList",  :key="idx")
          template(slot="content")
            b-icon(iconName="user_manage")
            .name {{user.user_name}}
<<<<<<< HEAD
    el-tabs(v-model="activeTab", type="card")
=======
    el-tabs(v-model="activeTab", type="card" v-if="renderData.audit_set_add_user_list&&renderData.audit_set_add_user_list.headerCols.length")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      el-tab-pane(:label="renderData.audit_set_add_user_list.addUserSearchAddUser", name="1", v-if="renderData.audit_set_add_user_list")
        b-search-table(:render-data="tableRenderData", :url="searchUserUrl", ref="table", :selectedRows="selectedUserList", @selection-change="selectionChange", valueKey="user_name")
          template(slot="batchOperate", slot-scope="props")
            span {{tableRenderData.listObj.selected}}
            span {{selectedUserList.length}}
            span /
            span {{props.total}}
            span {{tableRenderData.listObj.term}}
        .footer
          b-button(@click="cancel") {{renderData.cancel}}
          b-button(@click="saveUsers", type="primary") {{renderData.confirm}}
      //el-tab-pane(:label="renderData.audit_set_add_user_list.setVar", name="2", v-if="renderData.audit_set_direct_children_user_group||renderData.audit_set_direct_dad_user_group||renderData.audit_set_all_children_user_group")
        el-checkbox-group.set-var-container.theme-border-D(v-model="userVar")
          b-checkbox(label="parent") {{renderData.audit_set_direct_dad_user_group.addUserDirectDadUserGroup}}
          b-checkbox(label="all") {{renderData.audit_set_all_children_user_group.addUserAllChildrenUserGroup}}
          b-checkbox(label="child") {{renderData.audit_set_direct_children_user_group.addUserDirectChildrenUserGroup}}
        .footer
          b-button(@click="cancel") {{renderData.cancel}}
          b-button(@click="saveVariable", type="primary") {{renderData.confirm}}

</template>

<script>
  import service from '../service'
  import BCheckbox from 'components/BCheckbox'
  import BIcon from 'components/BIcon'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import BTag from 'components/BTag'

  export default {
    data () {
      var tableRenderData = Object.assign({}, this.renderData)
      tableRenderData.listObj = this.renderData.audit_set_add_user_list
      tableRenderData.searchObj = this.renderData.audit_set_add_user_search
      return {
        activeTab: '1',
        userVar: [],
        selectedUserList: [],
        tableRenderData: tableRenderData,
        searchUserUrl: '/api/rbac/user/search_user'
      }
    },
    methods: {
      selectionChange (selectedRows, unselectedRows) {
        console.log('selectionChange', ...arguments)
        var notInList = selectedRows.filter(row => !this.selectedUserList.find(item => item.user_name === row.user_name))
        this.selectedUserList = this.selectedUserList.concat(notInList)
        this.selectedUserList = this.selectedUserList.filter(row => !unselectedRows.find(item => item.user_name === row.user_name))
      },
      cancel () {
        this.visible.page = 'audit_set_flow_people_set'
      },
      saveUsers () {
        var params = {
          uuid: this.currRow.uuid,
          key: this.currRow.currStep.name.key,
          userVar: this.userVar,
          users: this.selectedUserList.map(item => item.user_name)
        }
<<<<<<< HEAD
        service.saveUsers(params, this.saveSelectedUserUrl)
=======
        service.saveUsers(params, this.saveSelectedUserUrl).then(res => {
          if (res.re === '200') {
            this.cancel()
          }
        })
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      },
      saveVariable () {
        var params = {
          uuid: this.currRow.uuid,
          key: this.currRow.currStep.name.key,
          userVar: this.userVar,
          users: this.selectedUserList.map(item => item.user_name)
        }
        service.saveVariable(params, this.saveSelectedUserUrl)
      },
      deleteUser (user) {
        var idx = this.selectedUserList.indexOf(user)
        this.selectedUserList.splice(idx, 1)
      },
      getSelectedUserList () {
        var params = {
          uuid: this.currRow.uuid,
          key: this.currRow.currStep.name.key
        }
        return service.getSelectedUserList(params, this.getSelectedUserUrl).then(res => {
          this.selectedUserList = res.map(name => ({'user_name': name}))
        })
      }
    },
    computed: {},
    props: {
      renderData: {
        type: Object,
        required: true
      },
<<<<<<< HEAD
=======
      permit: {
        type: Object,
        required: true
      },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      currRow: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      getSelectedUserUrl: {
        type: String,
        required: true
      },
      saveSelectedUserUrl: {
        type: String,
        required: true
      }
    },
    components: {
      BSearchTable,
      BCheckbox,
      BIcon,
      BTag,
      BButton
    },
    async mounted () {
<<<<<<< HEAD
      await this.getSelectedUserList(this.getSelectedUserUrl)
=======
      await this.getSelectedUserList()
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</script>

<style lang="less" scoped>
  .add-user {
    .selected-user {
      margin: 10px 0;
      .title {
        font-weight: bold;
        line-height: 36px;
        height: 36px;
      }
      .list {
        line-height: 36px;
        height: 36px;
        .name {
          display: inline-block;
        }
      }
    }
    .set-var-container {
      padding: 20px 0;
      border-bottom-width: 1px;
      border-bottom-style: solid;
    }
    .footer {
      margin-top: 40px;
    }
  }
</style>
