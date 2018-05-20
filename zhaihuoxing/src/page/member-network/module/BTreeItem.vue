<template lang="pug">
  ul.b-tree-container.move(draggable='true' ondragstart='memberNetWorkDrag' v-if="treeData.isRoot")
    li.b-tree-item
      span.inline-title(@mouseenter="enterFunc", @mouseleave="leaveFunc")
        b-icon.pointer(:iconName="toggleCollapseIcon", :class="{'invisible': !treeData.total_num}", @click="toggleCollapse")
        b-icon.pointer(:url="((treeData.type&&treeData.type.key)||treeData.type) | translateFilter('user_type_icon')", @click="toggleCollapse")
        span.inline-text.pointer(@click="toggleCollapse") {{treeData.user_name}}
        slot(name="more")
        b-icon.float-right.hidden-lg.detail(url="/static/images/details.png", @click='showDetail(treeData)')
      ul.b-tree-container(v-if="treeData.children.length" v-show="!treeData.collapse")
        b-tree-item(v-for="(item, idx) in treeData.children", :key="idx", :treeData="item", @toggle-collapse="emitToggleEvent", :getTreeData="getTreeData", :renderData="renderData", @select-row="showDetail")
          span.link.more.pointer(v-if="treeData.children.length<treeData.total_num&&idx==treeData.children.length-1", @click="getTreeDataFun", slot="more") {{renderData.more}}
  li.b-tree-item.move(draggable='true' ondragstart='memberNetWorkDrag(event)' v-else)
    span.inline-title(@mouseenter="enterFunc", @mouseleave="leaveFunc")
      b-icon.pointer(:iconName="toggleCollapseIcon", :class="{'invisible': !treeData.total_num}", @click="toggleCollapse")
      b-icon.pointer(@click="toggleCollapse", :url="((treeData.type&&treeData.type.key)||treeData.type) |  translateFilter('user_type_icon')")
      span.pointer.inline-text(@click="toggleCollapse") {{treeData.user_name}}
      slot(name="more")
      b-icon.float-right.hidden-lg.detail(url="/static/images/details.png", @click='showDetail(treeData)')
    ul.b-tree-container(v-if="treeData.children.length" v-show="!treeData.collapse")
      b-tree-item(v-for="(item, idx) in treeData.children", :key="idx", :treeData="item", @toggle-collapse="emitToggleEvent", :getTreeData="getTreeData", :renderData="renderData", @select-row="showDetail")
        span.link.more.pointer(v-if="treeData.children.length<treeData.total_num&&idx==treeData.children.length-1", @click="getTreeDataFun", slot="more") {{renderData.more}}

</template>

<script>
  import BIcon from 'components/BIcon'
  import pageMixins from 'common/mixins/pageMixins'

  export default {
    name: 'b-tree-item',
    data () {
      return {}
    },
    mixins: [pageMixins],
    props: {
      renderData: {
        required: true,
        type: Object
      },
      treeData: {
        required: true,
        type: Object
      },
      getTreeData: {
        required: true,
        type: Function
      }
    },
    methods: {
      showDetail (treeData) {
        this.$emit('select-row', treeData || this.treeData)
      },
      getTreeDataFun () {
        var params = {
          parent: this.treeData.user_name,
          pageSize: 50,
          startNum: this.treeData.children.length
        }
        return this.getTreeData(params).then(res => {
          this.treeData.children = this.treeData.children.concat(res.data)
        })
      },
      toggleCollapse () {
        this.treeData.collapse = !this.treeData.collapse
        if (!this.treeData.collapse && !this.treeData.children.length) { // 如果是展开状态
          this.getTreeDataFun().then(res => {
            this.$emit('toggle-collapse')
          })
        } else {
          this.$emit('toggle-collapse')
        }
      },
      leaveFunc () {
        this.$set(this.treeData, 'hover', false)
      },
      enterFunc () {
        this.$set(this.treeData, 'hover', true)
      },
      emitToggleEvent () {
        this.$emit('toggle-collapse')
      }
    },
    mounted () {
      window.memberNetWorkDrag = (ev) => {
        ev.dataTransfer.setData('position', JSON.stringify({x: ev.pageX, y: ev.pageY}))
      }
    },
    computed: {
      toggleCollapseIcon () {
        return this.treeData.collapse ? 'arrow-right' : 'arrow-down'
      }
    },
    components: {
      BIcon
    }
  }
</script>

<style lang="less">
  @import url('../../../common/styleSheet/variable');

  .b-tree-container {
    ul {
      padding-left: 27px;
    }
    .inline-title {
      width: 100%;
      min-width: 200px;
      height: 40px;
      line-height: 40px;
      .b-icon {
        margin-right: 5px;
      }
      .detail {
        margin-top: 12px;
      }
      .more {
        margin-left: 5px;
      }
      &:hover {
        background-color: fade(@primary, 30%);
      }
      .inline-text {
        border-color: white !important;
      }
    }
  }
</style>
