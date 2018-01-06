<template lang="pug">
  b-dialog.delete-audit(:show.sync='dialogVisible', :title="renderData.deleteAudit", :show-close="false", width="35%", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDelete")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteAudit", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'delete-audit',
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
      deleteAudit () {
        var params = {
          'uuid': this.currRow.uuid
        }
        service.deleteAudit(params).then(res => {
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
  .delete-audit {
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
