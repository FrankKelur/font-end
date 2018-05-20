<template lang="pug">
  b-dialog.audit-people-detail(:show.sync='dialogVisible', :title="renderData.auditPeople", :show-close="true", width="38%", :before-close="beforeClose")
    .left {{renderData.auditPeople + renderData.colon}}
    .right {{users}}
    template(slot="footer")
      b-button(@click="visible.dialog=null", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'audit-people-detail',
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
      getAuditUser () {
        var url = '/api/resource/audit_setting/get_audit_user'
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
<<<<<<< HEAD
        return this.userList.join(' ')
=======
        return this.userList.join(this.renderData.comma)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    async mounted () {
      await this.getAuditUser()
    },
    components: {
//      BIcon,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .audit-people-detail {
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
