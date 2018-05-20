<template lang="pug">
  div#side_nav.theme-bg-D(ref="sideNav")
<<<<<<< HEAD
    el-menu(:default-active='defaultActive', :collapse="collapse", class="menu", :unique-opened="true").theme-bg-D
=======
    el-menu(:default-active='defaultActive', :defaultOpeneds='defaultOpeneds', :collapse="collapse", class="menu", :unique-opened="true").theme-bg-D
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      template(v-for="(firstNav,firstIdx) in navTree" )
        el-submenu(:index="`${firstIdx}`" v-if="hasChildren(firstNav)")
          template(slot="title")
            b-icon.theme-color-lightenC32(:iconName="firstNav.icon")
            span.left-padding(slot="title").theme-color-C.ellip-menu.ellipsis-title {{firstNav.title}}
          template(v-for="(secondNav,secondIdx) in firstNav.children" v-if="!collapse")
            el-submenu(:index="`${firstIdx}-${secondIdx}`" v-if="hasChildren(secondNav)").theme-bg-lightenD32.second-nav
              template(slot="title")
                span(slot="title").theme-color-C.ellip-menu.ellipsis-title {{secondNav.title}}
<<<<<<< HEAD
              el-menu-item(v-for="(thirdNav,thirdIdx) in secondNav.children",:key="thirdNav.title", :index="`${firstIdx}-${secondIdx}-${thirdIdx}`").theme-bg-lightenD32.theme-bg-A-hover.theme-color-H-hover-nav
                a.theme-color-C(:href="thirdNav.url").ellip-menu.ellipsis-title {{thirdNav.title}}
            el-menu-item(:index="`${firstIdx}-${secondIdx}`" v-else).theme-bg-A-hover.theme-color-H-hover-nav.theme-bg-lightenD32.left-padding
=======
              el-menu-item(v-for="(thirdNav,thirdIdx) in secondNav.children",:key="thirdNav.title", :index="`${firstIdx}-${secondIdx}-${thirdIdx}`", :class="{'theme-bg-A': thirdNav.url===currUrl, 'theme-bg-lightenD32': thirdNav.url!==currUrl}").theme-bg-A-hover.theme-color-H-hover-nav
                a.theme-color-C(:href="thirdNav.url").ellip-menu.ellipsis-title {{thirdNav.title}}
            el-menu-item(:index="`${firstIdx}-${secondIdx}`" v-else, :class="{'theme-bg-A': secondNav.url===currUrl, 'theme-bg-lightenD32': secondNav.url!==currUrl}").theme-bg-A-hover.theme-color-H-hover-nav.left-padding
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
              a.theme-color-C(:href="secondNav.url").ellip-menu.ellipsis-title {{secondNav.title}}
          template(v-for="(secondNav,secondIdx) in firstNav.children" v-if="collapse")
            el-submenu(:index="`${firstIdx}-${secondIdx}`" v-if="hasChildren(secondNav)").theme-bg-lightenD18.second-nav
              template(slot="title")
                span(slot="title").theme-color-C.ellip-collapse-menu.ellipsis-title {{secondNav.title}}
<<<<<<< HEAD
              el-menu-item(v-for="(thirdNav,thirdIdx) in secondNav.children",:key="thirdNav.title", :index="`${firstIdx}-${secondIdx}-${thirdIdx}`").theme-bg-lightenD32.theme-bg-A-hover.theme-color-H-hover-nav
                a.theme-color-C(:href="thirdNav.url").ellip-collapse-menu.ellipsis-title {{thirdNav.title}}
            el-menu-item(:index="`${firstIdx}-${secondIdx}`" v-else).theme-bg-A-hover.theme-color-H-hover-nav.theme-bg-lightenD32.left-padding
              a.theme-color-C(:href="secondNav.url").ellip-collapse-menu.ellipsis-title {{secondNav.title}}
        el-menu-item(:index="`${firstIdx}`" v-if="!hasChildren(firstNav)").theme-bg-A-hover.theme-color-H-hover-nav
=======
              el-menu-item(v-for="(thirdNav,thirdIdx) in secondNav.children",:key="thirdNav.title", :index="`${firstIdx}-${secondIdx}-${thirdIdx}`", :class="{'theme-bg-A': thirdNav.url===currUrl, 'theme-bg-lightenD32': thirdNav.url!==currUrl}").theme-bg-A-hover.theme-color-H-hover-nav
                a.theme-color-C(:href="thirdNav.url").ellip-collapse-menu.ellipsis-title {{thirdNav.title}}
            el-menu-item(:index="`${firstIdx}-${secondIdx}`" v-else, :class="{'theme-bg-A': secondNav.url===currUrl, 'theme-bg-lightenD32': secondNav.url!==currUrl}").theme-bg-A-hover.theme-color-H-hover-nav.left-padding
              a.theme-color-C(:href="secondNav.url").ellip-collapse-menu.ellipsis-title {{secondNav.title}}
        el-menu-item(:index="`${firstIdx}`" v-if="!hasChildren(firstNav)", :class="{'theme-bg-A': firstNav.url===currUrl}").theme-bg-A-hover.theme-color-H-hover-nav
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          a(:href="firstNav.url",style={display:'inline'})
            b-icon.theme-color-lightenC32(:iconName="firstNav.icon")
          a.theme-color-C.left-padding(slot="title", :href="firstNav.url").ellip-collapse-menu.ellipsis-title {{firstNav.title}}
    .nav-collapse.theme-bg-lightenD32
<<<<<<< HEAD
        b-icon(iconName="Shape", v-if="collapse", @click="collapse = !collapse").icon.theme-color-C.theme-color-A-hover
        b-icon(iconName="zuo", v-else, @click="collapse = !collapse").icon.theme-color-C.theme-color-A-hover
=======
        b-icon(iconName="Shape", v-if="collapse", @click="toggleCollapse").icon.theme-color-C.theme-color-A-hover
        b-icon(iconName="zuo", v-else, @click="toggleCollapse").icon.theme-color-C.theme-color-A-hover
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
</template>

<script>
  import Vue from 'vue'
  import { Menu, Submenu, MenuItem, MenuItemGroup, Tooltip } from 'element-ui'
  import BIcon from 'components/BIcon'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  Vue.use(MenuItemGroup)
  Vue.use(Tooltip)
  export default {
    name: 'b-side-nav',
    mixins: [styleMixin],
    data () {
      return {
<<<<<<< HEAD
        styleMixinLess: styleMixinLess
=======
        styleMixinLess: styleMixinLess,
        currUrl: window.location.pathname
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
//        activeIdx: '',
//        openIdx: ''
      }
    },
    props: {
      navTree: {
        type: Array,
        required: true
      },
      collapse: {
        type: Boolean,
        required: true
      },
      defaultActive: {
        type: String
      },
<<<<<<< HEAD
      defaultOpened: {
        type: String
=======
      defaultOpeneds: {
        type: Array
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    computed: {
    },
    mounted () {
    },
    methods: {
      hasChildren (node) {
        if (node.children && node.children.length) {
          return true
        }
<<<<<<< HEAD
=======
      },
      toggleCollapse () {
        this.$emit('update:collapse', !this.collapse)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    watch: {
      collapse: function (newVal, oldVal) {
        console.log(newVal)
        console.log(oldVal)
<<<<<<< HEAD
=======
//        var oC = document.getElementById('C')
//        oC.style.backgroundSize = '100% 100%'
//        oC.style.backgroundPosition = '0px 0px'
        setTimeout(function () {
          window.onresize()
        }, 500)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    components: {
      BIcon
    }
  }
</script>

<style lang="less" scoped>
  #side_nav {
    /*position: absolute;*/
    /*width: 300px;*/
    height: 100%;
<<<<<<< HEAD
=======
    padding-bottom: 56px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    a {
      display: inline-block;
      vertical-align: top;
      width: 100%;
      height: 100%;
      text-decoration: none !important;
    }
    .ellip-menu {
      width: 210px;
      display: inline-block;
    }
    .ellip-collapse-menu {
      width: 135px;
      display: inline-block;
    }
    .left-padding {
      padding-left: 10px;
    }
    .menu {
      width: 60px;
      height: 100%;
      span {
        color: inherit;
      }
      .second-nav {
        width: 150px;
      }
      .el-menu-item {
        line-height: 56px;
        height: 56px;
      }
    }
    .menu:not(.el-menu--collapse) {
      width: 300px;
      height: 100%;
      overflow-y: auto;
      .second-nav {
        width: 100%;
      }
    }
<<<<<<< HEAD
=======
    .el-menu--collapse .el-submenu .el-menu .el-menu-item{
      width: 200px;
    }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    .nav-collapse {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 56px;
      text-align: center;
      .icon{
        padding-top: 20px;
        margin-top: 0 !important;
      }
    }
    .ellipsis-title {
      width: 80%;
    }
  }
</style>
