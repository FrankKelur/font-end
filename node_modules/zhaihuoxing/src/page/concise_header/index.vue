<template lang="pug">
  #concise_header.clear-float.theme-bg-J
    .logo
      img(:src="brokerSetting.header_logo_url" v-if="brokerSetting.header_logo_url")
    .drop-down-grop
      b-nav-drop.nav-item(v-if="renderData.concise_header_language")
        b-icon(:iconName="currLang.icon" slot="nav-item").nav-item-icon.theme-color-H
        ul(slot="drop-item").drop-menu
          li.pointer(@click="chooseLang(item)", v-for="(item, $index) in langList", :key="$index")
            b-icon(:iconName="item.icon" slot="nav-item").item-icon
            | {{item.text}}
      b-nav-drop.nav-item(v-if="renderData.concise_header_contact_information")
        b-icon(iconName="contact" slot="nav-item").nav-item-icon.theme-color-H
        ul(slot="drop-item").drop-menu
          li(v-if="!computedContactList.length") {{renderData.concise_header_contact_information.noContact}}
          li.pointer(@click="clickContact(item)", v-for="(item, $index) in computedContactList", :key="$index")
            b-icon(:iconName="item.icon" slot="nav-item").item-icon
            | {{item.text}}
      b-nav-drop.nav-item(v-if="renderData.concise_header_message_center")
        b-icon(iconName="xiaoxizhongxin" slot="nav-item").nav-item-icon.theme-color-H
        ul(slot="drop-item").drop-menu
          li(v-for="item in messageList" v-ellipsis-title="") {{item}}
          li
            a.more-link(@click="clickMore") {{renderData.concise_header_message_center.more}}
      b-nav-drop.nav-item(v-if="renderData.concise_header_account_info")
        b-icon(iconName="zhanghaoxinxi" slot="nav-item").nav-item-icon.theme-color-H
        ul(slot="drop-item").drop-menu
          li {{userInfo.name}}
          li.pointer(v-if="userInfo.status.val == '1'")
            span.theme-color-E {{userInfo.status.label}}
          li(v-if="userInfo.status.val != '1'")
            a.theme-color-G.link(@click="toActivate") {{userInfo.status.label}}
            //b-icon.theme-color-G(iconName="attention", :title="renderData.concise_header_account_info.activationText")
            b-icon.theme-color-G(iconName="attention")
          li.wrap-li(v-if="userInfo.status.val != '1'")
            span {{renderData.concise_header_account_info.activationText}}
          li.pointer.wrap-li(@click="signOut") {{renderData.concise_header_account_info.signOut}}
</template>

<script>
  import BNavDrop from 'components/BNavDrop'
  import BIcon from 'components/BIcon'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import cookie from 'cookie'

  export default {
    name: 'concise_header',
    mixins: [componentMixin],
    data () {
      var header = window.renderData.components.concise_header
      var setting = window.renderData.broker_setting
      var renderData = Object.assign({}, header, header.concise_header_auth)
      var langList = []
      if (renderData.concise_header_language) {
        langList = renderData.concise_header_language.langList.filter(item => {
          return setting.own_langs.find(elm => {
            return elm.lang_key === item.lang
          })
        })
      }
      var lang = cookie.get('lang')
      var currLang = langList[0]
      if (lang) {
        currLang = renderData.concise_header_language.langList.filter(item => {
          return item.lang === lang
        })[0]
      }
      return {
        renderData: renderData,
        currLang: currLang,
        messageList: [],
        userInfo: {
          name: '',
          status: {
            val: '',
            label: ''
          }
        },
        contactList: [
          {
            name: 'qq',
            icon: 'qq',
            text: 'QQ'
          },
          {
            name: 'skype',
            icon: 'skype',
            text: 'Skype'
          }
        ],
        brokerInfo: {
          contactMethods: []
        },
        langList: langList,
        brokerSetting: setting
      }
    },
    methods: {
      chooseLang (lang) {
        if (this.currLang === lang) {
        } else {
          this.currLang = lang
          cookie.set('lang', lang.lang)
          window.location.reload()
        }
      },
      signOut () {
        service.signOut({})
      },
      toActivate () {
        service.toActivate({})
      },
      clickMore () {
        service.clickMore({})
      },
      getContactMethods () {
        var params = {}
        return service.getContactMethods(params).then(({data}) => {
          this.brokerInfo.contactMethods = data
        })
      },
      getMessages () {
        var params = {}
        return service.getMessages(params).then(({data}) => {
          this.messageList = data
        })
      },
      getUserInfo () {
        var params = {}
        return service.getUserInfo(params).then(({data}) => {
          this.userInfo = data
        })
      }
    },
    computed: {
      computedContactList () {
        return this.contactList.filter(item => {
          return this.brokerInfo.contactMethods.indexOf(item.name)
        })
      }
    },
    async mounted () {
      var header = window.renderData.components.concise_header
      if (header.concise_header_account_info) {
        await this.getUserInfo()
      }
      if (header.concise_header_contact_information) {
        await this.getContactMethods()
      }
      if (header.concise_header_message_center) {
        await this.getMessages()
      }
    },
    components: {
      BNavDrop,
      BIcon
    }
  }
</script>

<style lang="less">
  #concise_header {
    /*min-width: 900px;*/
    height: 50px;
    line-height: 44px;
    /*padding: 8px 10px;*/
    padding: 10px 10px;
    div.logo {
      /*float: left;*/
      height: 100%;
      /*max-width: 600px;*/
      /*overflow: hidden;*/
      width: 300px;
      display: inline-block;
      >img{
        height: 100%;
        max-width: 100%;
      }
    }
    .drop-down-grop {
      line-height: 44px;
      float: right;
      .nav-item {
        height: 100%;
        margin-right: 28px;
        .more-link {
          /*float: r;*/
        }
        .nav-item-icon {
          display: block;
          position: relative;
          top: 50%;
          transform: translate(0, -50%);
          -ms-transform: translate(0);
        }
      }
    }
  }
</style>

<style lang="less" scoped>
  .drop-menu {
    .link {
      cursor: pointer;
    }
    .link:hover{
      text-decoration: underline!important;
    }
    padding: 0px 11px;
    .wrap-li {
      height: auto;
      span {
        width: auto;
        word-break: normal;
        display: block;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow: hidden;
      }
    }
    li {
      height: 40px;
      padding: 10px 0;
      width: 150px;
      .item-icon {
        margin-right: 8px;
      }
    }
  }
</style>
