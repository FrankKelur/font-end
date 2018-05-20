<template lang="pug">
  .set-page
    .audit-info
      span.audit-info-item
        span {{renderData.auditName + renderData.colon + ' ' + auditInfo.label}}
        span {{renderData.task + renderData.colon + ' ' + auditInfo.task_number}}
        span {{renderData.createTime + renderData.colon + ' ' + auditInfo.ctime}}
        span {{renderData.description + renderData.colon + ' ' + auditInfo.description}}
    .page-list
      .page-item(v-for="(pageInfo, idx) in pageList", :key="idx", @click="currPage=pageInfo")
        el-card.box-card
          .clearfix.theme-bg-I(slot="header")
            .title {{pageInfo.name}}
            .operate
              el-dropdown.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(@command="handleCommand" trigger='click')
                span.el-dropdown-link
<<<<<<< HEAD
                  b-icon(iconName="operation")
=======
                  b-icon.pointer(iconName="operation")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
                el-dropdown-menu.ipt-class.theme-bg-H.theme-border-lightenD12(slot="dropdown")
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='editPageInfo') {{renderData.editPageInfo}}
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='copyPage') {{renderData.copyPage}}
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='deletePage') {{renderData.deletePage}}
          .content
<<<<<<< HEAD
              //.item
                .label(v-ellipsis-title="") {{renderData.taskType + renderData.colon}}
                .info(v-ellipsis-title="") {{pageInfo.type}}
              .item
                .label(v-ellipsis-title="") {{renderData.description + renderData.colon}}
                .info(v-ellipsis-title="") {{pageInfo.description.label}}
              .item
                .label(v-ellipsis-title="") {{renderData.auditIcon + renderData.colon}}
                .info
                  b-icon(:iconName="pageInfo.icon.icon||pageInfo.icon", size="26px")
=======
            //.item
              .label(v-ellipsis-title="") {{renderData.taskType + renderData.colon}}
              .info(v-ellipsis-title="") {{pageInfo.type}}
            .item
              .label(v-ellipsis-title="") {{renderData.description + renderData.colon}}
              .info(v-ellipsis-title="") {{pageInfo.description.label}}
            .item
              .label(v-ellipsis-title="") {{renderData.auditIcon + renderData.colon}}
              .info
                b-icon(:iconName="pageInfo.icon.icon||pageInfo.icon", size="26px")
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb

      .page-item.blank-page.theme-border-D
        .icon-container(@click="addPage")
          b-icon(iconName="CombinedShapeCopy" size="50px")
          .info.theme-color-A {{renderData.add}}
    .footer.theme-border-D
      b-button(@click="back") {{renderData.back}}

</template>

<script>
  import service from '../service'
  //  import { validator, constants } from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'

  export default {
    name: 'set-page',
    data () {
//      var _this = this
      return {
        pageList: [],
        currPage: {},
        auditInfo: {
          auditName: '',
          task: '',
          createTime: '',
          description: ''
        }
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
    watch: {
      'visible.dialog': function (newVal, oldVal) {
        !newVal && this.getPageList()
      }
    },
    methods: {
      addPage () {
        this.$set(this.currRow, 'currPage', null)
        this.visible.page = 'editPageInfo'
      },
      getPageList () {
        var params = {
          uuid: this.currRow.uuid
        }
        return service.getPageList(params).then(res => {
          this.auditInfo = res
          this.pageList = res.start
          Object.assign(this.auditInfo, this.currRow)
        })
      },
      back () {
        this.visible.page = null
      },
<<<<<<< HEAD
=======
      deletePage () {
        this.$confirm(this.renderData.confirmDeletePage, this.renderData.delete, {
          confirmButtonText: this.renderData.confirm,
          cancelButtonText: this.renderData.cancel,
          type: 'warning'
        }).then(() => {
          var params = {
            'uuid': this.currRow.uuid,
            'key': this.currRow.currPage.key
          }
          service.deletePage(params).then(res => {
            this.getPageList()
          })
        })
      },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      handleCommand (cmd) {
        console.log('this.currPage', this.currPage)
        this.$set(this.currRow, 'currPage', this.currPage)
        if (cmd === 'deletePage') {
<<<<<<< HEAD
          this.visible.dialog = 'deletePage'
=======
//          this.visible.dialog = 'deletePage'
          this.deletePage()
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        } else if (cmd === 'copyPage') {
          this.visible.dialog = 'copyPage'
        } else if (cmd === 'editPageInfo') {
          this.visible.page = 'editPageInfo'
        }
      }
    },
    async mounted () {
      console.log('mounted setpage')
      await this.getPageList()
    },
    components: {
      BButton,
      BIcon,
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .set-page {
    .box-card {
      .operate {
        float: right;
      }
      .title {
        display: inline;
      }
      margin-bottom: 20px;
    }
    .audit-info {
      .audit-info-item {
        white-space: pre;
        line-height: 48px;
        span {
          margin-left: 10px;
        }
      }
    }
    .page-item:nth-child(even) {
      margin-left: 2%;
    }
    .page-item.blank-page {
      text-align: center;
      position: relative;
      border-style: dotted;
      border-width: 2px;
      .icon-container {
        position: absolute;
        left: 50%;
        top: 50%;
<<<<<<< HEAD
        margin-left: -50px;
=======
        margin-left: -25px;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        margin-top: -25px;
      }
      .info {
        margin-top: 5px;
        text-align: center;
      }
    }
    .page-item {
      vertical-align: top;
      width: 48%;
      display: inline-block;
      height: 165px;
      margin-bottom: 20px;
<<<<<<< HEAD
      .content .item{
=======
      .content .item {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        line-height: 36px;
        .label {
          display: inline-block;
          vertical-align: top;
          text-align: left;
<<<<<<< HEAD
          width: 12%;
=======
          width: 17%;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        }
        .info {
          padding-left: 5px;
          display: inline-block;
          vertical-align: top;
          text-align: left;
<<<<<<< HEAD
          width: 88%;
=======
          width: 83%;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
          span {
            margin-right: 10px;
          }
          .b-icon {
            margin-left: 8px;
          }
        }
      }
    }
    .footer {
      border-top-width: 1px;
      border-style: solid;
      padding: 20px 0;
    }
  }
</style>
