<template lang="pug">
  el-dialog.b-dialog(:close-on-click-modal="false", :close-on-press-escape="false", :width="width",
  :visible.sync="visible", @close="emmit('close')", @open="emmit('open')", :title="title", :before-close='handleClose',:show-close="showClose")
    slot
    div(slot="title", v-if="!title").title
      slot(name="title")
    .dialog-footer(slot="footer")
      slot(name="footer")
</template>

<script>
  import Vue from 'vue'
  import { Dialog } from 'element-ui'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(Dialog)
  export default {

    name: 'b-dialog',
    mixins: [styleMixin],
    data () {
      return {
        // maxin less style string
        styleMixinLess: styleMixinLess,
        visible: false
      }
    },
    methods: {
      emmit (event) {
        this.$emit(event)
      },
      handleClose (done) {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(done)
        } else {
          this.visible = false
          done()
        }
      }
    },
    props: {
      width: {
        type: String,
        default: '30%'
      },
      show: {
        type: Boolean,
        default: false
      },
      showClose: {
        type: Boolean,
        default: true
      },
      beforeClose: {
        type: Function
      },
      title: {
        type: String
      }
    },
    watch: {
      show: function (val) {
        this.visible = val
      },
      visible: function (val) {
        this.$emit('update:show', val)
      }
    },
    mounted () {
      this.visible = this.show
    },
    updated () {

    },
    components: {}
  }
</script>

<style lang="less" scoped>
  .b-dialog {
    .title {
      line-height: 38px;
      display: inline-block;
    }
  }

</style>
