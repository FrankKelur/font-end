<template lang="pug">
  b-dialog.verified-signin(:show="true", :title="renderData.attention", width="38%")
    .left(v-if="dialogIcon")
      b-icon(:icon-name="dialogIcon", :class="{'theme-color-F': dialogIcon === renderData.attentionIcon, 'theme-color-E': dialogIcon === renderData.succeedIcon}", size="40px")
    .right.theme-color-C
      .item(v-text="dialogMsg")
    template(slot="footer")
      b-button(@click="signIn()", type="primary") {{renderData.goLogin}}

</template>
<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import utils from 'common/js/Utils'

  export default {
    name: 'verified-sign',
    data () {
      return {}
    },
    props: {
      renderData: {
        required: true,
        type: Object
      },
      dialogMsg: {
        required: true,
        type: String
      },
      dialogIcon: {
        required: true,
        type: String
      }
    },
    components: {
      BIcon,
      BButton,
      BDialog
    },
    methods: {
      signIn () {
        var params = {
          component_name: 'signin'
        }
        utils.getComponentUrl(params).then(res => {
          if (res.page_url) {
            document.location.pathname = res.page_url
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
