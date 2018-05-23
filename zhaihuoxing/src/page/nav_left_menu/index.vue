<template lang="pug">
  b-side-nav(:nav-tree="this.navTree", :collapse.sync="isCollapse", :default-active="defaultActive", :default-openeds="defaultOpeneds")
</template>

<script>
  import BSideNav from 'components/BSideNav'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'

  export default {
    name: 'nav_left_menu',
    mixins: [componentMixin],
    data () {
      return {
        isCollapse: false,
        navTree: [],
        defaultActive: '',
        defaultOpeneds: []
      }
    },
    methods: {
      getDefaultOpends (navTree) {
        var url = window.location.pathname
        for (var i = 0; i < navTree.length; i++) {
          var firstItem = navTree[i]
          if (firstItem.url === url) {
            return []
          }
          var secondList = firstItem.children || []
          for (var j = 0; j < secondList.length; j++) {
            var secondItem = secondList[j]
            if (secondItem.url === url) {
              return [i + '']
            }
            var thirdList = secondItem.children || []
            for (var k = 0; k < thirdList.length; k++) {
              var thirdItem = thirdList[k]
              if (thirdItem.url === url) {
                return [i + '', i + '-' + j]
              }
            }
          }
        }
        return []
      },
      getPageList () {
        var params = {}
        return service.getPageList(params).then(({data}) => {
          this.navTree = data
          this.defaultOpeneds = this.getDefaultOpends(data)
          console.log('this.defaultOpeneds', this.defaultOpeneds)
        })
      }
    },
    async mounted () {
      await this.getPageList()
      if (window.document.body.clientWidth > 1250) {
        this.isCollapse = false
//        this.$refs['sideNav'].style.width = '300px'
      }
      if (window.document.body.clientWidth < 1250) {
        this.isCollapse = true
//        this.$refs['sideNav'].style.width = '60px'
      }
      window.addEventListener('resize', (e) => {
        if (window.document.body.clientWidth > 1250) {
          this.isCollapse = false
        }
        if (window.document.body.clientWidth < 1250) {
          this.isCollapse = true
        }
      })
    },
    components: {
      BSideNav
    }
  }
</script>

<style lang="less" scoped>

</style>
