<template lang="pug">
  b-dialog.delete-role(:show.sync='dialogVisible', :title="renderData.deleteRole", :show-close="false", width="35%", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDeleteRole")
      .item
        span(v-text='renderData.roleName')
        span(v-text='currRole.role_name')
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteRole", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'delete-role',
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
      currRole: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteRole () {
        var params = {
          'rid': this.currRole.rid // 角色的id
        }
        service.deleteRole(params).then(res => {
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
  .delete-role {
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
  .delete-role {
  }
</style>
