<template lang="pug">
<<<<<<< HEAD
  .b-tree-box(:style="`height:${height};overflow:auto`")
    el-tree(:data="data" ,:props="props", node-key="nodeKey", :render-content="renderContent", :expand-on-click-node="false", @node-expand="nodeExpand", @node-collapse="nodeCollapse").b-tree
=======
  .b-tree-box(:style="`height:${height};overflow:auto`" v-if="searchKey")
    el-input(placeholder="输入关键字进行过滤" v-model="filterText")
    el-tree(:data="data" ,:props="props", node-key="nodeKey", :render-content="renderContent", :expand-on-click-node="false", @node-expand="nodeExpand", @node-collapse="nodeCollapse", :filter-node-method="filterNode", ref="treeSelf").b-tree
  .b-tree-box(:style="`height:${height};overflow:auto`" v-else)
    el-tree(:data="data" ,:props="props", node-key="nodeKey", :render-content="renderContent", :expand-on-click-node="false", @node-expand="nodeExpand", @node-collapse="nodeCollapse",ref="treeSelf").b-tree

>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
        styleMixinLess: styleMixinLess
=======
        styleMixinLess: styleMixinLess,
        filterText: ''
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
=======
      },
      searchPlaceholder: {
        type: String,
        default: ''
      },
      searchKey: {
        type: String,
        default: ''
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    mounted () {

    },
<<<<<<< HEAD
=======
    watch: {
      filterText (val) {
        this.$refs.treeSelf.filter(val)
      }
    },
    methods: {
      filterNode (value, data) {
//        var key = this.searchKey
        if (!value) return true
        return data[this.searchKey].indexOf(value) !== -1
      }
    },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    components: {
      BIcon
    }
  }
</script>

<style lang="less">
  .b-tree-box {
<<<<<<< HEAD
=======
    .el-input {
      margin-bottom: 15px;
    }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
