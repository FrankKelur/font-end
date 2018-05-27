<template lang="pug">
  b-dialog.delete-type(:show='true', :title="renderData.confirmDeleteUserType", width="38%", :show-close="true", :before-close="beforeClose")
    .left
      b-icon.theme-color-F(icon-name='attention', size="30px")
    .right.theme-color-C
      .item(v-text="renderData.confirmDeleteUserTypeText")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="deleteType", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import service from '../service'

  export default {
    name: 'delete-type',
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
      typeInfo: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      deleteType () {
        var params = this.typeInfo
        service.deleteType(params).then(resp => {
          this.visible.dialog = null
          if (resp.re === '200') {
            this.$emit('refresh-type-list')
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
  .delete-type {
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
