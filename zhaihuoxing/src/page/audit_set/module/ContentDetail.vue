<template lang="pug">
  b-dialog.audit-condition-detail(:show.sync='dialogVisible', :title="renderData.auditObject", :show-close="true", width="38%", :before-close="beforeClose")
    template(v-for="(auditItem, idx) in targetList")
      .audit-item
        span {{renderData.auditObject + (idx+1) + renderData.colon}}
        span {{auditItem.label}}
      .audit-item
        span {{renderData.auditTerm + renderData.colon}}
        span {{auditItem.text}}
    template(slot="footer")
      b-button(@click="visible.dialog=null", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
//  import service from '../service'

  export default {
    name: 'content-detail',
    data () {
      var targetList = this.currRow.currStep.audit_target.map(con => {
        var text = ''
        if (con.all) {
          text = this.renderData.checkAll
        } else {
          text = con.dataSource.map(item => item.label).join(' ')
        }
        return {
          label: con.label,
          text: text
        }
      })
      return {
        targetList: targetList,
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
      }
//      getAuditItemList () {
//        service.getAuditItemList().then(res => {
//          this.auditItemList = res.data
//        })
//      }
    },
    components: {
//      BIcon,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .audit-condition-detail {
    .audit-item {
      line-height: 26px;
      span:nth-child(1) {
        display: inline-block;
        vertical-align: top;
        width: 20%;
      }
      span:nth-child(2) {
        display: inline-block;
        vertical-align: top;
        width: 80%;
      }
    }
  }
</style>
