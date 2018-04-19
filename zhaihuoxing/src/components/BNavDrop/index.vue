<template lang="pug">
  el-dropdown(placement="bottom-start")
    slot(name="nav-item")
    el-dropdown-menu(slot="dropdown")
      slot(name="drop-item")
        li 123
</template>

<script>
  import Vue from 'vue'
  import { Dropdown, DropdownMenu } from 'element-ui'
  Vue.use(Dropdown)
  Vue.use(DropdownMenu)
  export default {
    name: 'b-nav-drop',
    data () {
      return {
        a: null
      }
    },
    props: {

    },
    mounted () {

    }
  }
</script>

<style lang="less" scoped>

</style>
