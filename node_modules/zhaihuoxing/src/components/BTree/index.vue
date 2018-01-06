<template lang="pug">
  .b-tree-box(:style="`height:${height};overflow:auto`")
    el-tree(:data="data" ,:props="props", node-key="nodeKey", :render-content="renderContent", :expand-on-click-node="false", @node-expand="nodeExpand", @node-collapse="nodeCollapse").b-tree
</template>

<script>
  import Vue from 'vue'
  import { Tree } from 'element-ui'
  import BIcon from 'components/BIcon'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(Tree)

  export default {

    name: 'BTree',
    mixins: [styleMixin],
    data () {
      return {
        // maxin less style string
        styleMixinLess: styleMixinLess
      }
    },
    props: {
      data: {
        type: Array,
        required: true
      },
      props: {
        type: Object,
        required: true
      },
      nodeKey: {
        type: String,
        required: true
      },
      renderContent: {
        type: Function,
        required: true
      },
      nodeExpand: {
        type: Function,
        default: function () {
          return function () {}
        }
      },
      nodeCollapse: {
        type: Function,
        defalut: function () {
          return function () {}
        }
      },
      height: {
        type: String,
        default: '760px'
      }
    },
    mounted () {

    },
    components: {
      BIcon
    }
  }
</script>

<style lang="less">
  .b-tree-box {
    .el-tree{
      /*overflow-x: scroll;*/
    }
    .el-tree-node > .el-tree-node__children {
      /*overflow: inherit !important;*/
    }
  }

  .b-tree {
    border: 0px;
    .el-tree-node:first-child {
      /*overflow: initial*/ //影响了树动画的渲染？
    }
  }

  .el-tree-node > .el-tree-node__children {
    /*overflow: initial !important*/
  }

  .el-tree-node__content {

  }
</style>
