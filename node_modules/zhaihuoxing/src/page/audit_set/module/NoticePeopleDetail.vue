<template lang="pug">
  b-dialog.notice-people-detail(:show.sync='dialogVisible', :title="renderData.noticePeople", :show-close="true", width="38%", :before-close="beforeClose")
    .left {{renderData.noticePeople + renderData.colon}}
    .right {{users}}
    template(slot="footer")
      b-button(@click="visible.dialog=null", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'notice-people-detail',
    data () {
      return {
        userList: [],
        dialogVisible: true,
        showClose: false
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      getNoticeUser () {
        var url = '/api/resource/audit_setting/get_audit_noti_user'
        var params = {
          uuid: this.currRow.uuid,
          key: this.currRow.currStep.name.key
        }
        service.getSelectedUserList(params, url).then(res => {
          this.userList = res
        })
      }
    },
    computed: {
      users () {
        return this.userList.join(' ')
      }
    },
    async mounted () {
      await this.getNoticeUser()
    },
    components: {
//      BIcon,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .notice-people-detail {
    .left {
      display: inline-block;
      vertical-align: top;
      width: 15%;
    }
    .right {
      display: inline-block;
      width: 85%;
    }
  }
</style>
