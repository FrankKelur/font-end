<template lang="pug">
  b-dialog.audit-condition-detail(:show.sync='dialogVisible', :title="renderData.auditCondition", :show-close="true", width="38%", :before-close="beforeClose")
    .content
      .item(v-for="(con, idx) in conditionList", :key="idx")
        label {{con.label + renderData.colon}}
        span {{con.text}}
    template(slot="footer")
      b-button(@click="visible.dialog=null", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'audit-condition-detail',
    data () {
      var conditionList = this.currRow.currStep.parent.reduce((arr, parent) => {
        return arr.concat(parent.condition.map(con => {
          var text = con.type === 'select' ? con.dataSource.map(item => item.label).join(' ') : con.conditionLabel + ' ' + con.value
          return {label: con.label, text: text}
        }))
      }, [])
      return {
        dialogVisible: true,
        conditionList: conditionList,
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
    computed: {},
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
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
    .content {
      white-space: pre;
      .item {
        line-height: 36px;
        label {
          font-weight: bold;
          margin-right: 15px;
        }
      }
    }
  }
</style>
