<template lang="pug">
  .link-role
    el-form(label-width="140px", v-if="visible.page===config.linkRoleAuth", label-position="left")
      .body-container
        el-form-item(v-if="config.showForm")
          template(slot="label")
            span.theme-color-C(v-text="renderData.userName")
          span.theme-color-C(v-text="rowDetail.user_name",class="linkName1")
        el-col(:span="18")
          el-transfer.theme-color-C(:data="linkRoleForm.allRoleList", :button-texts="['>', '<']", :props='{key: "rid"}', v-model="targetRoleIdList", filterable, :filter-method='filterMethod',
          :render-content="renderFunc", :titles="linkRoleForm.titles", @change="handleChange", :filter-placeholder="renderData.pleaseEnterRoleName")
      .fixed-footer.clear
        b-button(@click="toList") {{renderData.back}}

    preview-role(:render-data="renderData", :visible="visible", :curr-role-bak="currRole", v-if="visible.page==='preview_role'", :curr-row='rowDetail', :config="config", @linkchange="refreshRoleInfo")
</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'
  import PreviewRole from './previewRole'

  export default {
    name: 'link-role',
    data () {
      return {
        pageLoading: false,
        pagination: {
          total: 0
        },
        currRole: {},
        targetRoleIdList: [],
        linkRoleForm: {
          titles: [this.renderData.notLinkedRole, this.renderData.linkedRole],
          allRoleList: [],
          selectedRoleList: []
        },
        rowDetail: Object.assign({}, this.currRow)
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      config: {
        type: Object,
        default () {
          return {
            linkRoleAuth: 'group_management_edit_role',
            origin: 'group',
            showForm: false,
            showConfirm: false
          }
        }
      }
    },
    computed: {
      targetRoleList () {
        return this.linkRoleForm.allRoleList.filter(role => {
          return this.targetRoleIdList.indexOf(role.rid) !== -1
        })
      },
      originRoleList () {
        console.log('targetRoleIdList', this.targetRoleIdList)
        return this.linkRoleForm.allRoleList.filter(role => {
          return this.targetRoleIdList.indexOf(role.rid) === -1
        })
      }
    },
    methods: {
      renderFunc (h, role) {
        console.log('role', role, arguments)
        var _this = this
        var item = h('div', {}, [
          h('div', {
            class: ['role-item', 'theme-color-C'],
            directives: [{
              name: 'ellipsis-title',
              value: role.role_name
            }]
          }, role.role_name),
          h('div', {
            class: ['role-item', 'theme-color-C'],
            directives: [{
              name: 'ellipsis-title',
              value: role.role_name
            }]
          }, role.description),
          h(BIcon, {
            props: {
              iconName: 'preview'
            },
            class: ['role-item', 'theme-color-lightenA10-hover', 'theme-color-darkenA10-active'],
            on: {
              click: _this.previewRole(role)
            }
          })
        ])
        return item
      },
      previewRole (role) {
        console.log('previewRole ')
        var _this = this
        return function () {
          _this.currRole = role
          _this.visible.page = 'preview_role'
        }
      },
      getUserInfo () {
        var params = {
          uid: this.currRow.uid
        }
        return service.getUserInfo(params).then(res => {
          Object.assign(this.rowDetail, res)
          this.linkRoleForm.selectedRoleList = res.user_role
          this.targetRoleIdList = res.user_role.map(item => item.rid)
        })
      },
      handleChange (value, direction, moveKeys) {
        console.log(arguments)
        var params = {
          uid: this.rowDetail.uid,
          user_role: moveKeys
        }
        if (this.config.origin === 'group') {
          params.gid = this.currRow.gid
        }
        this.pageLoading = true
        if (direction === 'left') { // 取消关联
          service.disconnectRole(params, this.config.origin).then(res => {
            this.pageLoading = false
          }).then(res => {
            this.getUserInfo()
          })
        } else {
          service.linkRole(params, this.config.origin).then(res => {
            this.pageLoading = false
          }).then(res => {
            this.getUserInfo()
          })
        }
      },
      filterMethod (query, item) {
        return item.role_name.indexOf(query) > -1
      },
      getAllRoleList () {
        var params = {}
        service.getRoleListForConnect(params).then(res => {
          this.linkRoleForm.allRoleList = res.data
//          this.linkRoleForm.allRoleList.forEach(function (role) {
//            role.disabled = true
//          })
        }).catch(() => {
          this.linkRoleForm.allRoleList = []
        })
      },
      getSelectedRoleList () {
        console.log('this.currRow', this.currRow)
        var params = {
          gid: this.currRow.gid
        }
        return service.getSelectedRoleList(params).then(res => {
          var dataall = res.data || res
          console.log('----------- selected role --------')
          console.log(dataall)
          this.linkRoleForm.selectedRoleList = dataall
          this.targetRoleIdList = dataall.map(item => item.rid)
          console.log(this.targetRoleIdList)
//          this.rowDetail.group_role = dataall
          this.$set(this.rowDetail, 'group_role', dataall)
        })
      },
      toList () {
        this.visible.page = null
      },
      refreshRoleInfo () {
        if (this.config.origin === 'group') {
          this.getSelectedRoleList()
        } else if (this.config.origin === 'user') {
          this.getUserInfo()
        }
      }
    },
    async mounted () {
      if (this.config.origin === 'user') {
        await this.getUserInfo()
      } else if (this.config.origin === 'group') {
        await this.getSelectedRoleList()
      }
      this.getAllRoleList()
    },
    components: {
      BButton,
      PreviewRole
    }
  }
</script>

<style lang="less">

  .link-role {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .el-transfer {
      .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
        line-height: 40px;
        color: inherit;
        span {
          color: inherit;
        }
      }
      .el-checkbox {
        color: inherit;
      }
      .el-transfer-panel__item {
        width: 100%;
      }
      .el-transfer-panel__body {
        height: 291px !important;
        .el-transfer-panel__filter {
          padding: 15px;
          margin: 0;
          .el-input__prefix {
            left: 15px;
          }
        }
      }
      .role-item {
        display: inline-block;
        width: 30%;
        vertical-align: middle;
        .icon{
          float: right;
        }
      }
      .b-icon:nth-child(1) {
        display: none;
      }
      .el-transfer__buttons {
        float: right;
        margin-top: 80px;
        margin-left: 10px;
        margin-right: 10px;
        width: 57px;
        padding: 0 !important;
        button{
          width: 100%;
        }
        .el-button {
          i {
            display: none !important;
          }
          span {
            font-weight: bold !important;
            font-size: 16px !important;
          }
        }
        .el-button+.el-button {
          margin-left: 0px !important;
        }
      }
      .el-transfer-panel {
        width: 42%;
        float: right;
      }
      .el-checkbox + .el-checkbox {
        margin-left: 0px !important;
      }
    }

    .el-col-18 {
      width: 75%;
      margin-left: -5%;
    }
    .el-form-item__label {
      //margin-left: -20px;
    }
    .linkName1{
      margin-left: -20px;
    }
    .fixed-footer {
      padding-top: 40px;
      padding-bottom: 45px;
      padding-left: 10px;
    }
    .el-transfer-panel__header{
      color: inherit;
    }
    .el-transfer-panel__empty{
      color: inherit;
    }
    .el-transfer-panel .el-transfer-panel__footer .el-checkbox {
      color: inherit;
    }
    .el-transfer-panel__filter .el-input__inner {
      border-radius: 4px;
    }
  }
</style>
