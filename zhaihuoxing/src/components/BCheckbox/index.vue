<template lang="pug">
  el-checkbox.b-box(:value="model", :indeterminate="indeterminate", :disabled="disabled", @change="changeHandler", :title="title", v-if="modelExist")
    slot
  el-checkbox.b-box(:label="label", v-else-if="labelExist")
    slot
  el-checkbox.b-box(:value="value", :indeterminate="indeterminate", :disabled="disabled", @change="changeHandler", title="title", v-else)
    slot
</template>

<script>
  import Vue from 'vue'
  import { Checkbox } from 'element-ui'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(Checkbox)

  export default {
    name: 'b-checkbox',
    mixins: [styleMixin],
    data () {
      return {
        // maxin less style string
        styleMixinLess: styleMixinLess
      }
    },
    mounted () {
      console.log('this.model', this.model, this.model !== 'undefined', this.indeterminate)
    },
    props: {
      value: {
        type: Boolean
      },
      model: {},
      indeterminate: {},
      disabled: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      label: {
        type: String
      }
    },
    computed: {
      modelExist () {
        return typeof this.model !== 'undefined'
      },
      labelExist () {
        return typeof this.label !== 'undefined'
      }
    },
    watch: {
      indeterminate () {
        console.log('indeterminate change')
      }
    },
    methods: {
      changeHandler: function (newVal) {
        console.log('bcheckbox', ...arguments, this.model)
        if (this.modelExist) {
          this.$emit('update:model', newVal)
        }
        this.$emit('change')
        setTimeout(function () {
          console.log('settimeout', this.model)
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>


</style>
