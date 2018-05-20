<template lang="pug">
<<<<<<< HEAD
  el-select.b-select(v-model="tmpModel", :placeholder='placeholder', @change="changeHandle", :class="selectCls", :multiple="multiple", :disabled="disabled", :valueKey="valueKey")
=======
  el-select.b-select(v-model="tmpModel", :placeholder='currPlaceholder', @change="changeHandle", @blur="blurFun" , @focus="focusFun" , :class="selectCls", :multiple="multiple", :disabled="disabled", :valueKey="valueKey", :filterable="filterable", :clearable="clearable")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    slot
</template>

<script>
  import Vue from 'vue'
  import { select, option } from 'element-ui'
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  Vue.use(select)
  Vue.use(option)
  export default {
    name: 'b-select',
    mixins: [styleMixin],
    data () {
      return {
        tmpModel: this.model,
<<<<<<< HEAD
        styleMixinLess: styleMixinLess,
        selectCls: {
          'theme-color-C theme-border-lightenD12 theme-border-lightenD12-hover theme-border-A-active theme-color-H-active': true
=======
        currPlaceholder: this.placeholder, // focus的时候placeholder 要求变化
        styleMixinLess: styleMixinLess,
        selectCls: {
          'theme-color-lightenC32 theme-bg-H theme-border-lightenD12 theme-border-lightenD-hover theme-border-A-active': !this.disabled,
          'theme-color-lightenC32 theme-bg-lightenD18 theme-border-lightenD12 theme-color-lightenC32-active theme-bg-lightenD18-active theme-border-lightenD12-active theme-color-lightenC32-hover theme-bg-lightenD18-hover theme-border-lightenD12-hover': this.disabled
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        }
      }
    },
    props: {
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      model: {
        required: true
      },
      placeholder: {
        type: String
      },
<<<<<<< HEAD
      valueKey: {
        type: String,
        default: 'value'
=======
      focusPlaceholder: {
        type: String
      },
      valueKey: {
        type: String,
        default: 'value'
      },
      filterable: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      changeHandle (value) {
        console.log('select changeHandle', arguments)
        this.$emit('update:model', this.tmpModel)
        this.$emit('change', value)
<<<<<<< HEAD
=======
      },
      focusFun (data) {
        this.$emit('focus')
        if (this.focusPlaceholder) {
          this.currPlaceholder = this.focusPlaceholder
        }
      },
      blurFun (data) {
        this.$emit('blur')
        this.currPlaceholder = this.placeholder
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    watch: {
      model () {
        this.tmpModel = this.model
      }
    },
    mounted () {
      console.log('valueKey', this.valueKey)
    }
  }
</script>

<style lang="less" scoped>
<<<<<<< HEAD
  .el-dialog__body{
    padding-top: 20px
  }
=======
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  .el-select {
    width: 100%;
  }
</style>
