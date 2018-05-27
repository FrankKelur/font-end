<template lang="pug">
  el-menu.admin-nav(:default-active="activePage" @open="handleOpen" @close="handleClose"
  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b")
    el-menu-item(:index='page' v-for="page in pages" @click="toPage(page)" :key="page")
      span(slot='title') {{page}}
</template>

<script>
  export default {
    name: 'admin-nav',
    data () {
      return {
        pages: [],
        activePage: ''
      }
    },
    methods: {
      getPageList () {
        var pages = JSON.parse(localStorage.getItem('pages')) || []
        pages.unshift('编辑器')
        this.pages = pages
        this.activePage = pages[0]
      },
      toPage (page) {
        if (page === '编辑器') {
          this.$router.push({path: '/admin/editor'})
        } else {
          this.$router.push({path: '/admin/list?page=' + page})
          console.log('this.$router', this.$router.currentRoute)
          if (this.$router.currentRoute.name !== 'editor') {
            location.reload()
          }
        }
      },
      handleOpen () {
      },
      handleClose () {
      }
    },
    mounted () {
      this.getPageList()
    }
  }
</script>

<style lang="less" scoped>
  .admin-nav {
  }
</style>
