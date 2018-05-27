<template lang="pug">
  el-dialog(:title="renderData.tooltip", :visible="true", :beforeClose='handleClose').check-detail
    .content
      .item {{renderData.joinDate + ': ' + currRow.join_time}}
      .item {{renderData.role + ': ' + currRow.type.label}}
      .item {{renderData.username + ': ' + currRow.name}}
      .item {{renderData.email + ': ' + currRow.email}}
      .item {{renderData.insuranceAccountDepositAmount + ': ' + currRow.Bdeposit}}
      .item {{renderData.insuranceAccountAmount + ': ' + currRow.Bbalance}}
    span(slot="footer").dialog-footer
      b-button(type="primary", @click="handleClose") {{renderData.confirm}}
</template>

<script>
  import BButton from 'components/BButton'

  export default {
    data () {
      return {}
    },
    methods: {
      handleClose () {
        this.visible.dialog = null
      }
    },
    mounted () {},
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      }
    },
    components: {
      BButton
    }
  }
</script>

<style lang="less">
  .check-detail {
    .el-dialog {
      width: 420px;
    }
    .el-dialog__header {
      font-weight: bold;
    }
  }
  @media screen and (max-width: 767px) {
    .check-detail {
      .el-dialog {
        width: 300px;
      }
    }
  }
</style>
