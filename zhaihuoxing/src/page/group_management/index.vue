<template lang="pug">
  .group_management.component.theme-border-lightenD12
    .title
      b-title.amt-more-left-in(:title='cTitle' v-if="!visible.page")
    .title
      b-title.amt-more-left-in(:title='cTitle' v-if="visible.page")
    //.search-form
      b-search-form(:search-fields="searchGroup.searchFields", :search-data="searchGroup.searchData", @search='getGroupList', @reset='reset', :render-data="searchGroup.searchRenderData")
    div.list-edit-box.clear-float.amt-more-left-in(v-if="!visible.page")
      .group-list.list-group
        .switch-show(style="display:none")
          b-button {{renderData.switchMode}}
        .tree-model
          b-tree(:data="listData", :props="defaultProps" node-key="gid", :render-content="renderContent", :node-expand='expandHandler', :node-collapse='collapseHandler', :search-placeholder="searchPlaceholder", :search-key="searchKey")
        ul.popover(:style="`left:${popover.left};top:${popover.top}`" v-show="popover.isShow", @mouseleave = "closePopover", @mouseover="showPopover(false)")
          template(v-for="(operateOpt,index) in renderData.operateOpts")
            li(@click="showDialog(operateOpt.auth)", :class="{'disabled': operateOpt.authStatus==='disabled', 'theme-bg-lightenD10-hover': operateOpt.authStatus!=='disabled'}") {{operateOpt.label}}
      .edit-group.theme-bg-I
        editor-group(:render-data="renderData", ref="editGroup", :visible="visible", :currRow="currRow", @showMoveGroup="showDialog('group_management_move_group')", v-if="currRow.gid", class="edG")

    component.amt-more-left-in(:is="visible.page", :renderData="linkRoleR", :visible="visible", :currRow="currRow" v-else)

    component(:is="visible.dialog", :renderData="modalRenderData", :visible="visible", :currRow="currRow", :openedNode="openedNode")
</template>

<script>
  import BTitle from 'components/BTitle'
  import BSearchForm from 'components/BSearchForm'
  import NewGroup from './module/NewGroup'
  import EditorGroup from './module/EditorGroup'
  import MoveGroup from './module/MoveGroup'
  import NewSubgroup from './module/NewSubgroup'
  import DeleteGroup from './module/DeleteGroup'
  import LinkRole from '@/page/user_management/module/linkRole'
  import componentMixin from 'common/js/componentMixin'
  import BButton from 'components/BButton'
  import BTree from 'components/BTree'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BDialog from 'components/BDialog'
  import BRadio from 'components/BRadio'
  import BSelect from 'components/BSelect'
  import service from './service'

  var comp = window.renderData.components.group_management
  var R = Object.assign({}, comp, comp.group_management_auth)
  console.log('R', R)
  var operateOpts = []
  if (R.group_management_new_subgroup) {
    R.group_management_new_subgroup.label = R.group_management_new_subgroup.groupManagementNewSubgroup
    R.group_management_new_subgroup.auth = 'group_management_new_subgroup'
    operateOpts.push(R.group_management_new_subgroup)
  }
  if (R.group_management_move_group) {
    R.group_management_move_group.label = R.group_management_move_group.groupManagementMoveGroup
    R.group_management_move_group.auth = 'group_management_move_group'
    operateOpts.push(R.group_management_move_group)
  }
  if (R.group_management_delete_group) {
    R.group_management_delete_group.label = R.group_management_delete_group.groupManagementDeleteGroup
    R.group_management_delete_group.auth = 'group_management_delete_group'
    operateOpts.push(R.group_management_delete_group)
  }
  R.operateOpts = operateOpts
  var linkRoleR = Object.assign({}, R, comp.group_management_edit_role)
  export default {
    name: 'group_management',
    mixins: [componentMixin],
    data () {
      return {
        renderData: R,
        linkRoleR: linkRoleR,
        visible: {
          page: null,
          dialog: null
        },
        searchGroup: {
          // two way bind
          searchData: {},
          // page text
          searchRenderData: comp.group_management_search_group
          // render form
//          searchFields: comp.group_management_search_group.searchFields
        },
        newGroup: {
          renderData: comp.group_management_new_group
        },
        listData: [],
        openedNode: [],
        currRow: {},
        defaultProps: {
          children: 'children',
          label: 'group_name'
        },
        popover: {
          isShow: false,
          top: '0px',
          left: '0px'
        },
        modalRenderData: {},
        new_subgroup: {
          input: ''
        },
        searchPlaceholder: R.searchPlaceholder,
        searchKey: 'group_name'
      }
    },
    methods: {
      reset () {
        console.log('reset')
        for (var key in this.searchGroup.searchData) {
          this.searchGroup.searchData[key] = ''
        }
      },
      collapseHandler (row) {
        var closedNode = {
          gid: row.gid,
          row: row
        }
        var closedIdx = this.openedNode.findIndex(node => {
          return node.gid === closedNode.gid
        })
        if (closedIdx > 0) {
          this.openedNode.splice(closedIdx, 1)
        }
      },
      expandHandler (row) {
        console.log('row', row)
//        this.fatherRow = Object.assign({}, this.currRow)
        this.currRow = row
        this.getGroupList(this.currRow.gid)
        var node = {
          gid: row.gid,
          row: this.currRow
        }
        var isExist = this.openedNode.findIndex(existNode => {
          return existNode.gid === node.gid
        })
        if (isExist > 0) {
          this.openedNode.splice(isExist, 1)
        }
        this.openedNode.push(node)
      },
      renderContent (h, {node, data, store}) {
        let iconName = data.user ? 'usergroup' : 'emptyusergroup'
        let iconColor = data.user ? 'theme-color-A' : 'theme-color-G'
        let iconTitle = data.user ? '' : this.renderData.addUser
        let opetateClass = operateOpts.length === 0 ? 'no-operate' : 'group-operate'
        var elm = h('span', {
          on: {
//            mouseover: this.showPopover,
            mouseleave: this.closePopover,
            click: this.chooseGroup(data)
          }
        }, [
          h(BIcon, {props: {iconName: iconName, title: iconTitle}, class: [iconColor]}, null),
          h('span', {
            class: ['inner-text'],
            directives: [{
              name: 'ellipsis-title'
            }]
          }, data.group_name),
          h(BIcon, {props: {iconName: 'operation'},
            class: [opetateClass],
            nativeOn: {
              click: this.showPopover
            }
          }, null),
          h('span',
            {
              class: ['edit-list']
            },
            [].map((item, idx) => h('div', {class: ['theme-bg-A', 'opt-item'], attrs: {key: idx}}))
          )
        ])
        return elm
//      return (
//        <span>
//          <span class={data.children.length === 0 ? 'theme-color-G' : 'theme-color-D'}>
//            <svg className="icon" aria-hidden="true" style="width: 1em; height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;font-size:20px;vertical-align: middle">
//              <use xlinkHref={`#icon-${iconName}`}></use>
//            </svg>
//          </span>
//          <span style="margin-left:8px;padding-right:20px;"> {node.label + 'test'}</span>
//          <span style="position:relative;margin-left:5px;visibility:hidden" class="edit-list" on-mouseover={(e) => this.showPopover(e, true)} on-mouseleave={(e) => this.closePopover()}>
//            {['', '', ''].map((n, index) => {
//              return (<div class="theme-bg-A" key={index} style="display:inline-block;width:4px;height:4px;border-radius:50%;vertical-align:middle;margin-right:2px;pos"> </div>)
//            })}
//          </span>
//        </span>
//      )
      },
      showPopover (e) {
        console.log('e', e)
        if (typeof e !== 'boolean') {
          this.popover.top = e.currentTarget.getBoundingClientRect().top + 'px'
          this.popover.left = e.currentTarget.getBoundingClientRect().right + 'px'
        }
        this.popover.isShow = true
      },
      closePopover () {
        this.popover.isShow = false
      },
      chooseGroup (row) {
        var _this = this
        return function () {
//          _this.fatherRow = Object.assign({}, _this.currRow)
          _this.currRow = row
//          console.log('row', row)
          _this.getGroupList(_this.currRow.gid)
        }
      },
      showDialog (auth) {
        console.log('auth', auth)
        if (this.renderData[auth].authStatus === 'disabled') {
          return
        }
        this.popover.isShow = false
        this.visible.dialog = auth
        Object.assign(this.modalRenderData, this.renderData, this.renderData[auth])
      },
      getGroupList (gid) {
        var params = Object.assign({
          gid: gid
        }, this.searchGroup.searchData)
        return service.getGroupList(params).then(({data}) => {
          if (gid) {
            data.forEach(child => {
              child.father = this.currRow
            })
//            console.log('group data', data)
            this.$set(this.currRow, 'children', data)
          } else {
            this.listData = data
            if (data.length) {
              this.currRow = data[0]
              this.rootGid = data[0].gid
//              this.$set(this.currRow, 'children', data)
            }
          }
        })
      },
      updateGroupRole () {
        var params = {
          gid: this.currRow.gid
        }
        service.getGroupInfo(params).then(data => {
          this.$set(this.currRow, 'group_role', data.group_role)
//          this.currRow.group_role = data.group_role
        })
      }
    },
    components: {
      BTitle,
      BButton,
      BTree,
      BIcon,
      BInput,
      BDialog,
      BRadio,
      BSelect,
      BSearchForm,
      NewGroup,
      EditorGroup,
      'group_management_edit_role': LinkRole,
      'preview_role': LinkRole,
      'group_management_delete_group': DeleteGroup,
      'group_management_new_subgroup': NewSubgroup,
      'group_management_move_group': MoveGroup
    },
    async mounted () {
      await this.getGroupList()
    },
    computed: {
      cTitle () {
        if (this.visible.page === 'group_management_edit_role') {
          return this.linkRoleR.groupManagementEditRole
        } else if (this.visible.page === 'preview_role') {
          return this.linkRoleR.previewRole
        } else {
          return this.renderData.groupManagement
        }
      }
    },
    watch: {
      'visible.dialog': function (newVal, oldVal) {
        if (!newVal) {
          if (oldVal === 'group_management_new_subgroup') {
            this.getGroupList(this.currRow.gid)
          } else if (oldVal === 'group_management_delete_group') {
          } else if (oldVal === 'group_management_move_group') {
          }
          console.log('------------ dialog oldval ------------')
          console.log(oldVal)
        }
      }
    }
  }
</script>

<style lang="less">
  .group_management {
    .new-group {
      margin-top: 18px;
    }
    .no-operate {
      visibility: hidden;
    }
    .list-group {
      position: relative;
      .inner-text {
        margin: 0 30px 0 10px !important;
        display:inline-block;
        vertical-align: middle;
        width: 120px;
      }
      .tree-model {
        .opts-panel {
          margin-left: 8px;
          padding-right: 20px;
        }
      }
      .switch-show {
        margin-bottom: 5px;
      }
      .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
      .b-tree .el-tree-node__content{
        .inner-text{
          margin-bottom: 3px !important;
        }
        .el-tree-node__expand-icon{
          margin-bottom: 3px !important;
        }
      }
      .b-tree .el-tree-node__content:hover .edit-list {
        visibility: initial !important;
        position: relative;
        margin-left: 5px;
        visibility: hidden;
      }
      .popover {
        width: 130px;
        position: fixed;
        background: #fff;
        z-index: 9999;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .12);
        padding: 5px 0;
        overflow: hidden;
        animation: show-popver .1s ease-in;
        -webkit-animation: show-popver .1s ease-in;
        -moz-animation: show-popver .1s ease-in;
        -o-animation: show-popver .1s ease-in;
        animation-fill-mode: forwards;
        -webkit-animation-fill-mode: forwards;
        -moz-animation-fill-mode: forwards;
        -o-animation-fill-mode: forwards;
        @keyframes show-popver{
          from { height: 0;}
          to { height: 117px;}
        }
        li {
          line-height: 36px;
          text-align: center;
          cursor: pointer;
        }
      }
      .new_subgroup-dialog {
        .form-input {
          width: 260px;
        }
      }
      .move_group-dialog, .delete_group-dialog {
        .radio-box {
          margin-right: 20px;
          .radio-span {

          }
        }
        .select-box {
          width: 200px;
        }
        .icon-box {
          float: left;
          margin-right: 20px;
        }
        .info-word {

        }
        .group-name {
          margin-top: 20px;
          span {
            margin-left: 20px;
          }
        }
      }
    }

    .list-edit-box {
      margin-top: 12px;
      width: 100%;
      min-width: 700px;
      margin-bottom: 30px;
      .group-list {
        width: 31%;
        float: left;
      }
      .edit-group {
        width: 68%;
        float: right;
      }
    }
    .el-tree-node__content>.el-tree-node__expand-icon {
      width: 13px;
      height: 13px;
    }
    .list-group .icon {
      display: inline-block;
      margin-left: 10px;
    }
    .list-group .b-tree .el-tree-node__content .el-tree-node__expand-icon {
      margin-bottom: 15px !important;
      margin-left: 11px;
    }
  }

</style>
