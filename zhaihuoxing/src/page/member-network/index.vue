<template lang="pug">
  .member-network
    b-title(url="/static/images/members-net.png", :title="renderData.memberLayout")
    .content
      .member-title
        .item
          b-icon(url="/static/images/pib.png")
          span PIB
        .item
          b-icon(url="/static/images/mib.png")
          span MIB
        .item
          b-icon(url="/static/images/ib.png")
          span IB
        .item
          b-icon(url="/static/images/trader.png")
          span Trader
      .tree-container.clear-float
        .tree#tree(ondrop="memberNetWorkDrop(event)" ondragover="allowDrop(event)")
          .tree-title {{renderData.memberTree}}
          b-tree-item(:treeData="treeData", @toggle-collapse="toggleCollapse", :getTreeData="getTreeData", :renderData="renderData", @select-row="selectRow", ref="tree")
        .table-container.hidden-md-and-down
          b-table(:cols="table.cols", :getData="getMemberData", ref="table", :renderData="renderData", :hidePagination="true")
    component(:is="visible.dialog", :renderData="renderData", :currRow="currRow", :visible="visible")
</template>

<script>
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BTitle from 'components/BTitle'
  import BTreeItem from './module/BTreeItem'
  import BTable from 'components/BTable'
  import renderData from './lang.js'
  import service from './service.js'
  import CheckDetail from './module/CheckDetail'
  import { translateMap } from 'common/js/filters'

  export default {
    name: 'member-network',
    data () {
      return {
        visible: {
          dialog: null
        },
        currRow: {},
        renderData: renderData,
        treeData: {
          isRoot: true,
          children: []
        },
        table: {
          cols: [
            {
              label: renderData.joinDate,
              field: 'join_time'
            },
            {
              label: renderData.role,
              field: 'type'
            },
            {
              label: renderData.username,
              field: 'name'
            },
            {
              label: renderData.email,
              field: 'email'
            },
            {
              label: renderData.insuranceAccountDepositAmount,
              field: 'Bdeposit'
            },
            {
              label: renderData.insuranceAccountAmount,
              field: 'Bbalance'
            }
          ]
        }
      }
    },
    methods: {
      selectRow (row) {
        this.visible.dialog = 'check-detail'
        Object.assign(this.currRow, row)
      },
      toggleCollapse () {
        this.$refs['table'] && this.$refs['table'].refresh()
      },
      getMemberData () {
        return new Promise((resolve, reject) => {
          var data = this.generateTableData()
          data.forEach(item => {
            if (typeof item.type !== 'object') {
              item.type = {
                key: item.type,
                label: translateMap('user_type')[item.type]
              }
              item.Bdeposit = '$ ' + item.Bdeposit
              item.Bbalance = '$ ' + item.Bbalance
            }
          })
          resolve({data: data})
        })
      },
      getTreeRootData (params = {}) {
        return service.getTreeRootData(params).then(res => {
          Object.assign(this.treeData, res.data)
          this.$set(this.treeData, 'isRoot', true)
          this.$set(this.treeData, 'collapse', false)
          this.treeData.children.forEach(item => {
            this.$set(item, 'collapse', true)
          })
          this.toggleCollapse()
        })
      },
      getTreeData (params = {}) {
        return service.getTreeData(params).then(res => {
          res.data.forEach(item => {
            this.$set(item, 'collapse', true)
          })
          return res
        })
      },
      treeToList (item, list) {
        list.push(item)
        !item.collapse && item.children.forEach(child => {
          this.treeToList(child, list)
        })
      },
      generateTableData () {
        var list = []
        this.treeToList(this.treeData, list)
        return list
      }
    },
    async mounted () {
      await this.getTreeRootData()
      this.$refs['tree'].toggleCollapse()
      window.memberNetWorkDrop = (ev) => {
        var {x} = JSON.parse(ev.dataTransfer.getData('position'))
        var tree = document.getElementById('tree')
        tree.scrollLeft += x - ev.pageX
      }
      window.allowDrop = (ev) => {
        ev.preventDefault()
      }
    },
    components: {
      BIcon,
      CheckDetail,
      BTitle,
      BTreeItem,
      BTable,
      BInput
    }
  }
</script>

<style lang="less">
  @import url('../../common/styleSheet/variable');

  .member-network {
    height: 100%;
    display: flex;
    flex-direction: column;
    > .content {
      padding: 0 1%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
    }
    .member-title {
      margin: 20px 0;
      line-height: 40px;
      background: fade(@primary, 20%);
      border-radius: 4px;
      padding: 5px 0;
      .item {
        display: inline-block;
        border: 0px solid #FFFFFF;
        width: 100px;
        text-align: center;
        line-height: 30px;
        .b-icon {
          margin-right: 10px;
        }
        &:not(:last-child) {
          border-right-width: 1px;
        }
      }
    }
    .tree-container {
      flex-grow: 1;
      .table-container {
        overflow-y: auto;
        float: left;
        width: 70%;
        .b-table-row {
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
        }
      }
      .tree {
        overflow: auto;
        float: left;
        width: 30%;
        padding-bottom: 6px;
        min-height: 20px;
        margin-bottom: 20px;
        .tree-title {
          line-height: 41px;
          height: 41px;
          font-weight: bold;
        }
      }
      .tree li {
        list-style-type: none;
        margin: 0;
        padding: 0px;
        position: relative
      }
      .tree li::before, .tree li::after {
        content: '';
        left: -20px;
        position: absolute;
        right: auto
      }
      .tree li::before {
        border-left: 1px dashed #999;
        bottom: 50px;
        height: 100%;
        top: 0;
        width: 1px
      }
      .tree li::after {
        border-top: 1px dashed #999;
        height: 20px;
        top: 24px;
        width: 17px
      }
      .tree li span {
        border: 0px solid white;
        display: inline-block;
        padding: 0px;
        padding-top: 2px;
        text-decoration: none
      }
      .tree li.parent_li > span {
        cursor: pointer
      }
      .tree > ul > li::before, .tree > ul > li::after {
        border: 0
      }
      .tree li:last-child::before {
        height: 26px
      }
      .tree li.parent_li > span:hover, .tree li.parent_li > span:hover + ul li span {
        background: #eee;
        border: 1px solid #94a0b4;
        color: #000
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .member-network {
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .member-network {
      .tree-container {
        .tree {
          width: 100%;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .member-network {
      > .content {
        padding: 0 20px;
      }
      .member-title {
        .item {
          width: 25%;
        }
      }
      .tree-container {
        .tree {
          width: 100%;
        }
      }
    }
  }
</style>
