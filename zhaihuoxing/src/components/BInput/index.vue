<template lang="pug">
  div.b-password(v-if="type==='password'")
    el-input.b-input(:value="model", :placeholder='placeholder', @input="changeHandle", :class="inputCls", :type='computedType', :disabled="disabled", :size="size", @blur="only", :clearable="clearable")

    //b-icon.icon(icon-name="preview" , @click="togglePassword" , :class="{'theme-color-A':inputStatus , 'theme-color-D':!inputStatus }")
  el-input.b-input(:value="model", :placeholder='placeholder', :class="inputCls", v-else, :rows="rows", :type="cType", :disabled="disabled", @input='changeHandle', @blur="only", :size="size", :clearable="clearable")

</template>

<script>
  import Vue from 'vue'
  import { input } from 'element-ui'
  import BIcon from 'components/BIcon'
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  Vue.use(input)
  export default {
    name: 'b-input',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess,
        inputStatus: false
      }
    },
    props: {
      model: {
        type: String,
        required: true
      },
      placeholder: {
        type: String
      },
      size: {
        type: String
      },
      rows: {
        type: Number,
        default: 1
      },
      type: {
        type: String,
        default: 'input'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      only () {
        this.$emit('blur')
      },
      changeHandle (value) {
        console.log('input changeHandle')
//        this.$emit('update:model', value || '')
        this.$emit('update:model', value)
        this.$emit('change', value)
      },
      togglePassword () {
        this.inputStatus = !this.inputStatus
      }
    },
    computed: {
      computedType () {
        if (this.inputStatus) {
          return 'input'
        }
        return 'password'
      },
      cType () {
        if (this.rows > 1) {
          return 'textarea'
        }
        return 'input'
      },
      inputCls () {
        return {
          'theme-color-C': true,
          'input-status': this.type === 'password' && this.inputStatus
        }
      }
    },
    mounted () {
    },
    components: {
      BIcon
    }
  }
</script>

<style lang="less" scoped>
  .b-password {
    display: inline;
    line-height: 1em;
    position: relative;
    .icon {
      user-select: none;
      display: inline-block;
      position: absolute;
      right: 20px;
      top: -5px;
      background: #fff;
      width: 37px;
      height: 28px;
      padding: 5px 10px;
    }
  }
</style>
