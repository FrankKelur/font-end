<template lang="pug">
  el-menu.admin-nav(:default-active="activePage", @open="handleOpen" @close="handleClose"
  background-color="#545c64" text-color="#fff" active-text-color="#ffd04b")
    el-menu-item(:index='page._key' v-for="page in pages", @click="toPage(page._key)", :key="page._key")
      span(slot='title') {{page.name}}
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
        pages.unshift({name: '编辑器', _key: 'editor'})
        this.pages = pages
        this.activePage = pages[0]._key
      },
      toPage (page) {
        if (page === 'editor') {
          this.$router.push({path: '/admin/editor'})
        } else {
          this.$router.push({path: '/admin/list?page=' + page})
          console.log('this.$router', this.$router.currentRoute)
          if (this.$router.currentRoute.name !== 'editor') {
//            location.reload()
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
