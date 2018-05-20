<template lang="pug">
  //el-tag.theme-bg-H.theme-border-lightenA10.theme-bg-A-hover.theme-color-C(:closable='closable', :disable-transitions="disableTransitions", @close="handleClose", size="size")
    slot
<<<<<<< HEAD
  b-button.tag-group.b-tag(size="small")
=======
  b-button.tag-group.b-tag(:size="size")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    slot(name="content")
    b-icon.theme-color-C.theme-color-G-hover(iconName="delete", size="14px", @click.native='handleClose', v-show="closable")
</template>

<script>
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'

  export default {
    name: 'b-tag',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess
      }
    },
    props: {
      closable: {
        type: Boolean,
        default: true
<<<<<<< HEAD
=======
      },
      size: {
        type: String,
        default: 'small'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      handleClose () {
        this.$emit('close', ...arguments)
      }
    },
    components: {
      BIcon,
      BButton
    }
  }
</script>

<style lang="less" scoped>
  .b-tag {
<<<<<<< HEAD
    display: inline-block;
    .b-icon {
      margin-left: 5px;
=======
    margin: 1px 8px 6px 0 !important;
    padding: 7px 10px;
    display: inline-block;
    .b-icon {
      margin-left: 14px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</style>
