<template lang="pug">
  el-select.b-select(v-model="tmpModel", :placeholder='placeholder', @change="changeHandle", :class="selectCls", :multiple="multiple", :disabled="disabled", :valueKey="valueKey")
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
        styleMixinLess: styleMixinLess,
        selectCls: {
          'theme-color-C theme-border-lightenD12 theme-border-lightenD12-hover theme-border-A-active theme-color-H-active': true
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
      valueKey: {
        type: String,
        default: 'value'
      }
    },
    methods: {
      changeHandle (value) {
        console.log('select changeHandle', arguments)
        this.$emit('update:model', this.tmpModel)
        this.$emit('change', value)
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
  .el-dialog__body{
    padding-top: 20px
  }
  .el-select {
    width: 100%;
  }
</style>
