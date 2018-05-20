<template lang="pug">
<<<<<<< HEAD
  b-side-nav(:nav-tree="this.navTree", :collapse="isCollapse", :default-active="activeIdx", :default-opened="openIdx")
=======
  b-side-nav(:nav-tree="this.navTree", :collapse.sync="isCollapse", :default-active="defaultActive", :default-openeds="defaultOpeneds")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
        activeIdx: '',
        openIdx: ''
      }
    },
    methods: {
=======
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
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      getPageList () {
        var params = {}
        return service.getPageList(params).then(({data}) => {
          this.navTree = data
<<<<<<< HEAD
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
=======
          this.defaultOpeneds = this.getDefaultOpends(data)
          console.log('this.defaultOpeneds', this.defaultOpeneds)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
        console.log(this.$el.clientWidth)
=======
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
