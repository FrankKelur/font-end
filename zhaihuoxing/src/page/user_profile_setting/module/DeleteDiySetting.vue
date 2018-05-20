<template lang="pug">
  b-dialog.delete-diy-setting(:show='true', :title="renderData.confirmDeleteDiy", width="38%", :show-close="true", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDeleteDiyText")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteResource", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import service from '../service'

  export default {
    name: 'delete-diy-setting',
    data () {
      return {
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
      diyData1: {
        type: Object,
        required: true
      },
      diyData2: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      deleteResource () {
        var path = [this.diyData2.key]
        if (this.diyData1 === this.diyData2) {
          path = []
        }
        var params = {
          path: path,
          key: this.diyData1.key,
          label: this.diyData1.label
        }
        service.deleteCustomResource(params).then(res => {
          if (res.re === '200') {
            this.$emit('refreshList')
            this.visible.dialog = null
          }
        })
      }
    },
    components: {
      BDialog,
      BInput,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less" scoped>
  .delete-diy-setting {
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
