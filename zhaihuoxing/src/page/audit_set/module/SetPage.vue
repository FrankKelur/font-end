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
                  b-icon(iconName="operation")
                el-dropdown-menu.ipt-class.theme-bg-H.theme-border-lightenD12(slot="dropdown")
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='editPageInfo') {{renderData.editPageInfo}}
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='copyPage') {{renderData.copyPage}}
                  el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C-hover(command='deletePage') {{renderData.deletePage}}
          .content
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
      handleCommand (cmd) {
        console.log('this.currPage', this.currPage)
        this.$set(this.currRow, 'currPage', this.currPage)
        if (cmd === 'deletePage') {
          this.visible.dialog = 'deletePage'
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
        margin-left: -50px;
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
      .content .item{
        line-height: 36px;
        .label {
          display: inline-block;
          vertical-align: top;
          text-align: left;
          width: 12%;
        }
        .info {
          padding-left: 5px;
          display: inline-block;
          vertical-align: top;
          text-align: left;
          width: 88%;
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
