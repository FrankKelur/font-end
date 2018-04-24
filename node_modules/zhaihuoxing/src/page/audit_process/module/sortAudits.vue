<template lang="pug">
  b-dialog.sort-audits(:show='true', :title="renderData.order", width="38%", :show-close="true", :before-close="beforeClose")
    #sort-audit-container
      .theme-color-A-hover(v-for="(item, $index) in this.auditList", :key="$index", v-draggable="handler", v-dropable="handler", :idx="$index") {{item.label}}
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="save", type="primary") {{renderData.save}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'sort-audits',
    data () {
      var _this = this
      return {
        handler: {
          drop (event) {
            console.log('event drop')
            var sourceIdx = parseInt(event.dataTransfer.getData('sourceIdx'))
            var targetIdx = parseInt(event.target.getAttribute('idx'))
            var sourceData = _this.auditList[sourceIdx]
            _this.auditList.splice(targetIdx + 1, 0, sourceData)
            if (sourceIdx < targetIdx + 1) {
              _this.auditList.splice(sourceIdx, 1)
            } else {
              _this.auditList.splice(sourceIdx + 1, 1)
            }
          },
          dragstart (event) {
            event.dataTransfer.setData('sourceIdx', event.target.getAttribute('idx'))
          }
        }
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
      auditList: {
        type: Array,
        required: true
      }
    },
    methods: {
      save () {
        var params = {
          sorted_audit_list: this.auditList
        }
        service.sortAudit(params).then(({re}) => {
          if (re === '200') {
            this.visible.dialog = null
          }
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
    },
    components: {
      BDialog,
      BButton
    }
  }
</script>

<style lang="less">
  .sort-audits {
    .draggable-item {
      line-height: 30px;
    }
  }
</style>
