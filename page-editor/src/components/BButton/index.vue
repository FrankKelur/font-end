<template lang="pug">
  el-button.b-button(@click="handleClick", :class="btnCls", :disabled="disabled", :size="size")
    slot
</template>

<script>
  export default {
    name: 'b-button',
    data () {
      return {
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
          return 'theme-bg-A  theme-bg-darkenA10-active theme-color-H'
        }
        if (!this.disabled && this.type === 'secondary') {
          return 'theme-bg-B theme-bg-lightenB10-hover theme-bg-darkenB10-active theme-color-H'
        }
        if (!this.disabled && this.type === 'default') {
          return 'theme-bg-H theme-color-C theme-border-D theme-color-A-hover theme-border-A-hover theme-color-darken10-A-active theme-border-darken10-D-active'
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
    border-color: #71DAF9;
  }
</style>
