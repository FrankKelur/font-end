<template lang="pug">
  b-dialog.verified-signin(:show="true", :title="renderData.attention", width="38%")
    .left(v-if="dialogIcon")
      b-icon.theme-color-F(:icon-name="dialogIcon", size="40px")
    .right.theme-color-C
      .item(v-text="dialogMsg")
    template(slot="footer")
      b-button(@click="sendAgain()", type="primary") {{renderData.sendAgain}}

</template>
<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import service from '../service'
  import utils from 'common/js/Utils'

  export default {
    name: 'verified-send',
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
      searchObj: {
        required: true,
        type: Object
      }
    },
    components: {
      BIcon,
      BButton,
      BDialog
    },
    methods: {
      sendAgain () {
        var params = this.searchObj
        service.sendActivateEmail(params).then(({re}) => {
          if (re === '200') {
            var params = {
              component_name: 'signin'
            }
            utils.getComponentUrl(params).then(res => {
              if (res.page_url) {
                document.location.pathname = res.page_url
              }
            })
          } else {
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
</style>
