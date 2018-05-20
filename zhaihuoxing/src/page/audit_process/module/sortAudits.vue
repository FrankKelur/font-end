<template lang="pug">
  b-dialog.sort-audits(:show='true', :title="renderData.order", width="38%", :show-close="true", :before-close="beforeClose")
    #sort-audit-container
<<<<<<< HEAD
      .theme-color-A-hover(v-for="(item, $index) in this.auditList", :key="$index", v-draggable="handler", v-dropable="handler", :idx="$index") {{item.label}}
=======
      .theme-color-A-hover(v-for="(item, $index) in this.auditList", :key="$index", v-draggable="handler", v-dropable="handler", :idx="$index")
        i.icon.iconfont.icon-yidong
        span {{item.label}}
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
=======
            var el = event.target
            try { el.className = el.className.replace(/dragenter/g, '').replace(/theme\\-border\\-D/g, '') } catch (ex) {}
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
=======
      },
      origin: {
        type: String,
        default: 'audit_process'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    methods: {
      save () {
        var params = {
          sorted_audit_list: this.auditList
        }
<<<<<<< HEAD
        service.sortAudit(params).then(({re}) => {
          if (re === '200') {
            this.visible.dialog = null
=======
        var url = this.origin === 'audit_history' ? '/api/resource/audit_history/sort_audit' : '/api/resource/audit_process/sort_audit'
        service.sortAudit(params, url).then(({re}) => {
          if (re === '200') {
            location.reload()
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
=======
      .icon-yidong {
        visibility: hidden;
      }
    }
    .draggable-item:hover {
      .icon-yidong {
        visibility: visible;
      }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</style>
