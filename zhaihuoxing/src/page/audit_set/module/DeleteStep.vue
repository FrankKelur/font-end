<template lang="pug">
  b-dialog.delete-audit-step(:show.sync='dialogVisible', :title="renderData.deleteStep", :show-close="false", width="35%", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDeleteStep")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteStep", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'delete-audit-step',
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
      deleteStep () {
        var params = {
<<<<<<< HEAD
          'uuid': this.currRow.uuid
=======
          'uuid': this.currRow.uuid,
          'key': this.currRow.currStep.name.key
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        }
        service.deleteStep(params).then(res => {
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
  .delete-audit-step {
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
  .delete-audit-step {
  }
</style>
