<template lang="pug">
  el-select.b-select(v-model="tmpModel", :placeholder='currPlaceholder', @change="changeHandle", @blur="blurFun" , @focus="focusFun" , :class="selectCls", :multiple="multiple", :disabled="disabled", :valueKey="valueKey", :filterable="filterable", :clearable="clearable")
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
        currPlaceholder: this.placeholder, // focus的时候placeholder 要求变化
        styleMixinLess: styleMixinLess,
        selectCls: {
          'theme-color-lightenC32 theme-bg-H theme-border-lightenD12 theme-border-lightenD-hover theme-border-A-active': !this.disabled,
          'theme-color-lightenC32 theme-bg-lightenD18 theme-border-lightenD12 theme-color-lightenC32-active theme-bg-lightenD18-active theme-border-lightenD12-active theme-color-lightenC32-hover theme-bg-lightenD18-hover theme-border-lightenD12-hover': this.disabled
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
      }
    },
    methods: {
      changeHandle (value) {
        console.log('select changeHandle', arguments)
        this.$emit('update:model', this.tmpModel)
        this.$emit('change', value)
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
  .el-select {
    width: 100%;
  }
</style>
