<template lang="pug">
  b-dialog.verified-attention(:show="true", :title="renderData.attention", width="38%", :show-close="showClose")
    .left(v-if="renderData.attentionIcon")
      b-icon.theme-color-F(:icon-name="renderData.attentionIcon", size="40px")
    .right.theme-color-C
      .item(v-text="renderData.emailNotVerified")
    template(slot="footer")
      b-button(@click="sendEmail()") {{renderData.sendAgain}}
      b-button(@click="visible.dialog = null", type="primary") {{renderData.confirm}}

</template>
<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import service from '../service'

  export default {
    name: 'verified-attention',
    data () {
      return {
        showClose: false
      }
    },
    props: {
      renderData: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      userName: {
        required: true,
        type: String
      },
      vcode: {
        type: String,
        required: true
      },
      vcodeKey: {
        style: String,
        required: true
      }
    },
    methods: {
      sendEmail: function () {
        var params = {
          user_name: this.userName,
          vcode: this.vcode,
          vcode_key: this.vcodeKey
        }
        service.sendActivateEmail(params).then(res => {
          if (res.re === '200') {
            this.visible.dialog = null
          } else {
            this.visible.dialog = null
          }
        })
      }
    },
    mounted () {
    },
    components: {
      BDialog,
      BButton,
      BIcon
    }
  }
</script>
<style lang="less" scoped>
  .left {
    vertical-align: middle;
    display: inline-block;
    margin-right: 18px;
    svg {
      font-size: 40px !important;
    }
  }
  .right {
    vertical-align: middle;
    display: inline-block;
    .item {
      margin-top: 8px;
      span:nth-child(2) {
        margin-left: 20px;
      }
    }
  }
  .right .item[data-v-5699f9c0] {
    width: 100%;
    margin-top: 8px;
    word-wrap: break-word;
  }
  .right[data-v-5699f9c0] {
    width: 80%;
  }
</style>
