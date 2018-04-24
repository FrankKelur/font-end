<template lang="pug">
  b-dialog.delete-user(:show.sync='dialogVisible', :title="renderData.deleteUser", :show-close="false", width="35%", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDelete")
      .item
        span(v-text='renderData.userName')
        span(v-text='currUser.user_name')
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteUser", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'delete-user',
    data () {
      return {
        dialogVisible: true,
        showClose: false
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currUser: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteUser () {
        var params = {
          'uid': this.currUser.uid // string 用户id
        }
        service.deleteUser(params).then(res => {
          this.visible.dialog = null
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
      console.log('renderData', this.renderData)
    },
    components: {
      BIcon,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .delete-user {
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
  }
</style>
<style lang="less">
  .delete-user {

  }
</style>
