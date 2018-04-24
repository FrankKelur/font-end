<template lang="pug">
  b-dialog.delete-page(:show.sync='dialogVisible', :title="renderData.delete", :show-close="false", width="35%", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDeletePage")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deletePage", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'delete-page',
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
      deletePage () {
        var params = {
          'uuid': this.currRow.uuid,
          'key': this.currRow.currPage.key
        }
        service.deletePage(params).then(res => {
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
  .delete-page {
    .left {
      vertical-align: middle;
      display: inline-block;
      width: 20%;
      svg {
        font-size: 40px !important;
      }
    }
    .right {
      vertical-align: middle;
      display: inline-block;
      width: 80%;
      .item {
        margin-top: 8px;
        span:nth-child(2) {
          margin-left: 20px;
        }
      }
    }
  }
</style>
