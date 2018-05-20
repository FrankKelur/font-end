<template lang="pug">
  b-side-nav(:nav-tree="this.navTree", :collapse="isCollapse", :default-active="activeIdx", :default-opened="openIdx")
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
        activeIdx: '',
        openIdx: ''
      }
    },
    methods: {
      getPageList () {
        var params = {}
        return service.getPageList(params).then(({data}) => {
          this.navTree = data
          var pageUrl = window.location.pathname
          var _this = this
          var first = 0
          var second = 0
          var infirst = this.navTree.findIndex(item => {
            return item.url === pageUrl
          })
          if (infirst < 0) {
            this.navTree.forEach(menu => {
              var insecond = menu.children.findIndex(item => {
                return item.url === pageUrl
              })
              if (insecond < 0) {
                menu.children.forEach(subMenu => {
                  var inthird = subMenu.children.findIndex(item => {
                    return item.url === pageUrl
                  })
                  if (inthird < 0) {
                    // url error
                  } else {
                    _this.openIdx = first.toString() + '-' + second.toString()
                    _this.activeIdx = first.toString() + '-' + second.toString() + '-' + inthird.toString()
                  }
                  second = 1 + second
                })
              } else {
                _this.activeIdx = first.toString() + '-' + second.toString()
                _this.openIdx = first.toString()
              }
              first = first + 1
            })
          } else {
            _this.activeIdx = infirst.toString()
          }
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
        console.log(this.$el.clientWidth)
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
