<template lang="pug">
  .b-range.theme-border-D.theme-border-lightenC32-hover.theme-border-A-active
    b-input(:model.sync="fromModel", @change='changeHandler', :placeholder='startPlaceholder', :disabled="disabled", :clearable="clearable")
    .theme-bg-H.inline-split -
    b-input(:model.sync="toModel", @change='changeHandler', :placeholder='endPlaceholder', :disabled="disabled", :clearable="clearable")

</template>

<script>
  import BInput from 'components/BInput'
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  export default {
    name: 'b-range',
    mixins: [styleMixin],
    data () {
      var modelArr = this.model.split('-')
      return {
        styleMixinLess: styleMixinLess,
        fromModel: modelArr[0] || '',
        toModel: modelArr[1] || ''
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      },
      model: {
        type: String,
        required: true
      },
      startPlaceholder: {
        type: String,
        required: true
      },
      endPlaceholder: {
        type: String,
        required: true
      }
    },
    methods: {
      changeHandler (value) {
        this.$emit('update:model', this.fromModel + '-' + this.toModel)
      }
    },
    watch: {
      model (newVal, oldVal) {
        var arr = newVal.split('-')
        this.formModel = arr[0] || ''
        this.toModel = arr[1] || ''
      }
    },
    mounted () {
    },
    components: {
      BInput
    }
  }
</script>

<style lang="less">
  .b-range {
    border: 1px solid;
    border-radius: 4px;
    padding: 0 1px;
    .b-input {
      width: 49%;
      .el-input__inner {
        border-width: 0 !important;
        height: 38px;
        text-align: center;
      }
    }
    .inline-split {
      width: 2%;
      display: inline-block;
      text-align: center;
    }
  }
</style>
