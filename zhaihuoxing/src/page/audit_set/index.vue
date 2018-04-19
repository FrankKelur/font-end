<template lang="pug">
  .audit_set.theme-border-lightenD12.component#audit_set
    b-title(:title="pageTitle")
    template(v-if="!visible.page")
      .oper-container.clear-float
        el-row(:gutter="10")
          el-col(:span="3", :offset='21', v-if="auditSet.audit_set_add_new_audit")
            b-button(@click='newAudit', :disabled="createRenderData.authStatus==='disabled'")
              span.block-text(v-ellipsis-title="") {{createRenderData.auditSetAddNewAudit}}
      b-search-table(:optHandler='optHandler', :render-data="tableRenderData", url="/api/resource/audit_setting/get_audit_setting_list", :opts-filter="optsFilter", ref="table")

    component(:is="visible.page", :render-data="modalRenderData", :currRow="currRow", :visible="visible")

    component(:is="visible.dialog", :render-data="modalRenderData", :currRow="currRow", :visible="visible")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import BButton from 'components/BButton'
  import DeleteAudit from './module/DeleteAudit'
  import NewAudit from './module/NewAudit'
  import NewStep from './module/NewStep'
  import SetTerm from './module/SetTerm'
  import AddCondition from './module/AddCondition'
  import AddAction from './module/AddAction'
  import DisableAudit from './module/DisableAudit'
  import AuditConditionDetail from './module/AuditConditionDetail'
  import AuditPeopleDetail from './module/AuditPeopleDetail'
  import ContentDetail from './module/ContentDetail'
  import DeleteStep from './module/DeleteStep'
  import CopyPage from './module/CopyPage'
  import NoticePeopleDetail from './module/NoticePeopleDetail'
  import SetFlow from './module/SetFlow'
  import FormSet from './module/FormSet'
  import SetPage from './module/SetPage'
  import AuditPeopleAdd from './module/AuditPeopleAdd'
  import NoticePeopleAdd from './module/NoticePeopleAdd'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'

  export default {
    name: 'audit_set',
    mixins: [componentMixin],
    data () {
      var auditSet = window.renderData.components.audit_set
      var renderData = Object.assign({}, auditSet, auditSet.audit_set_auth)
      var tableRenderData = Object.assign({}, auditSet.audit_set_auth)
      tableRenderData.listObj = auditSet.audit_set_list
      tableRenderData.searchObj = auditSet.audit_set_search
      var createRenderData = Object.assign({}, auditSet, auditSet.audit_set_auth, auditSet.audit_set_add_new_audit)
      console.log('createRenderData', createRenderData)
      var _this = this
      var optHandler = {
        audit_set_audit_info (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.dialog = 'audit_set_audit_info'
        },
        audit_set_flow_people_set (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = Object.assign({}, _this.renderData, renderData)
          console.log('renderData', renderData)
          _this.visible.page = 'audit_set_flow_people_set'
        },
        audit_set_form_set (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.page = 'audit_set_form_set'
        },
        audit_set_disable (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.dialog = 'audit_set_disable'
        },
        audit_set_enable (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          var params = {uuid: row.uuid, status: '1'}
          service.toggleAudit(params).then(res => {
            this.$refs['table'].search()
          })
        },
        audit_set_delete (row, renderData) {
          _this.currRow = row
          _this.modalRenderData = renderData
          _this.visible.dialog = 'audit_set_delete'
        }
      }
      return {
        visible: {
          dialog: null,
          page: null
        },
        tableRenderData: tableRenderData,
        createRenderData: createRenderData,
        renderData: renderData,
        auditSet: auditSet,
        modalRenderData: {},
        currRow: null,
        optHandler: optHandler
      }
    },
    computed: {
      pageTitle () {
        if (this.visible.page === null) {
          return this.renderData.auditSet
        } else if (this.visible.page === 'audit_set_flow_people_set') {
          return this.modalRenderData.auditSetFlowPeopleSet
        } else if (this.visible.page === 'audit_set_form_set' || this.visible.page === 'editPageInfo' || this.visible.page === 'auditPageEdit') {
          return this.modalRenderData.auditFormSet
        } else if (this.visible.page === 'NewStep') {
          return this.modalRenderData.createStep
        } else if (this.visible.page === 'StepInfoEdit') {
          return this.modalRenderData.editStep
        } else if (this.visible.page === 'addUser') {
          return this.renderData.audit_set_list.addUser
        } else if (this.visible.page === 'NoticePeopleAdd') {
          return this.renderData.addUser
        } else if (this.visible.page === 'AuditPeopleAdd') {
          return this.renderData.addUser
        }
      }
    },
    methods: {
      toList () {
        this.visible.page = null
      },
      optsFilter (handlers, currRow) {
        console.log('optsFilter', ...arguments)
        var newHandlers = Object.assign([], handlers)
        if (currRow && currRow.uuid) {
          if (currRow.audit_type.key === '0') {
            newHandlers = newHandlers.filter(opt => !['audit_set_audit_info', 'audit_set_form_set', 'audit_set_delete'].includes(opt.auth))
          }
          if (currRow.status.key === '0') {
            newHandlers = newHandlers.filter(opt => !['audit_set_disable'].includes(opt.auth))
          }
          if (currRow.status.key === '1') {
            newHandlers = newHandlers.filter(opt => !['audit_set_enable'].includes(opt.auth))
          }
        }
        return newHandlers
      },
      newAudit () {
        this.visible.dialog = 'audit_set_add_new_audit'
        this.currRow = {}
        this.modalRenderData = Object.assign({}, this.renderData, this.renderData.audit_set_add_new_audit)
      }
    },
    components: {
      'audit_set_delete': DeleteAudit,
      'audit_set_disable': DisableAudit,
      'audit_set_add_new_audit': NewAudit,
      'audit_set_audit_info': NewAudit,
      'audit_set_form_set': SetPage,
      'editPageInfo': FormSet,
      'auditPageEdit': FormSet,
      'copyPage': CopyPage,
      NoticePeopleAdd,
      AuditPeopleAdd,
      'audit_set_flow_people_set': SetFlow,
      'StepInfoEdit': NewStep,
      NewStep,
      AddAction,
      AddCondition,
      SetTerm,
      AuditPeopleDetail,
      ContentDetail,
      DeleteStep,
      NoticePeopleDetail,
      AuditConditionDetail,
      BTitle,
      BButton,
      BSearchTable
    },
    watch: {
      'visible.dialog': function (newVal, oldVal) {
        !newVal && this.$refs['table'] && this.$refs['table'].search()
      },
      'visible.page': function (newVal, oldVal) {
        !newVal && this.$refs['table'] && this.$refs['table'].search()
      }
    }
  }
</script>

<style lang="less">
  @import '../../common/styleSheet/variable.less';

  .audit_set {
    overflow: auto;
    overflow-x: hidden;
    position: relative;

    /*<!--border-style: solid;-->*/
    /*<!--border-width: @componentBorderWidth;-->*/

    .oper-container {
      .el-col {
        .el-button {
          width: 100% !important;
        }
      }
      padding-bottom: 12px;
    }
  }
</style>
