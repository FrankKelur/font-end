<template lang="pug">
  el-button.b-button(@click="handleClick", :class="btnCls", :disabled="disabled", :size="size", :type="type")
    slot
</template>

<script>
  import Vue from 'vue'
  import { Button } from 'element-ui'

  Vue.use(Button)
  export default {
    name: 'b-button',
    data () {
      return {
//        btnCls: {
//          'theme-bg-A  theme-bg-darkenA10-active theme-color-H': !this.disabled && this.type === 'primary',
//          'theme-bg-B theme-bg-lightenB10-hover theme-bg-darkenB10-active theme-color-H': !this.disabled && this.type === 'secondary',
//          'theme-bg-H theme-color-C theme-border-D theme-color-A-hover theme-border-A-hover theme-color-darken10-A-active theme-border-darken10-D-active': !this.disabled && this.type === 'default',
//          'theme-bg-H theme-color-lightenC32 theme-border-lightenD12': this.disabled
//        }
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'default'// default,primary color,secondary color,disable
      },
      size: {
        type: String,
        default: ''
      }
    },
    computed: {
      btnCls () {
        if (!this.disabled && this.type === 'primary') {
          return 'theme-bg-A theme-border-A theme-bg-lightenA10-hover theme-border-lightenA10-hover theme-bg-darkenA10-active theme-border-darkenA10-active theme-color-H'
        }
        if (!this.disabled && this.type === 'secondary') {
          return 'theme-bg-B theme-border-B theme-bg-lightenB10-hover theme-border-lightenB10-hover theme-bg-darkenB10-active theme-border-darkenB10-active theme-color-H'
        }
        if (!this.disabled && this.type === 'default') {
          return 'theme-bg-H theme-color-C theme-border-D theme-color-A-hover theme-border-A-hover theme-color-darkenA10-active theme-border-darkenD10-active'
        }
        if (!this.disabled && this.type === 'text') {
          return 'theme-color-A theme-color-lightenA10-hover theme-color-darkenA10-active'
        }
        if (this.disabled) {
          return 'theme-bg-H theme-color-lightenC32 theme-border-lightenD12'
        }
      }
    },
    methods: {
      handleClick () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="less">
  .el-button:hover {
    /*border-color: #71DAF9;*/
  }
  .b-button.el-button {
    .block-text {
      display: inline-block;
      width: 100%;
    }
  }
</style>
