<template lang="pug">
  b-dialog.delete-profile(:show='true', :title="renderData.confirmDeleteProfile", width="38%", :show-close="true", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDeleteProfileText")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteProfile", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import service from '../service'

  export default {
    name: 'delete-profile',
    data () {
      return {
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      profileInfo: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      deleteProfile () {
        var params = this.profileInfo
        service.deleteProfile(params).then(res => {
          this.$emit('refreshList')
          this.visible.dialog = null
        })
      }
    },
    components: {
      BDialog,
      BInput,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less" scoped>
  .delete-profile {
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
  }
</style>
