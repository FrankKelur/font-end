<template lang="pug">
  .resource-item
    template(v-if="resource.name=='withdraw_audit'")
      .left
        el-form(:ref='resource.name', :rules="rules", :model="form", label-width="120px")
          el-radio-group(v-model="withdrawResource.reachAll")
            div
              b-radio.radio-box(:label="true") {{renderData.reachAllResource}}
            div
              b-radio.radio-box(:label="false") {{renderData.reachPartResource}}
          .filter-item(v-for="filter in selectedFilterList", :key="filter" v-if="!withdrawResource.reachAll")
            el-form-item(:label="renderData.filterCondition", label-width="120px")
              b-select(:model.sync="filter", :placeholder="renderData.pleaseSelect")
                el-option(v-for="item in computedFilters", :key="item.field", :label="item.label", :value="item")
              b-icon(@click="deleteFilter(filter)", iconName='delete')
            el-form-item(:label="renderData.range", v-if="filter === 'audit_result'", label-width="120px")
              el-checkbox-group(v-model="withdrawResource.audit_result")
                el-col(v-for="item in auditResultList", :key="item.key", :span="2")
                  b-checkbox(:label="item.key") {{item.val}}
            el-form-item(:label="renderData.range", v-if="filter === 'priority'", label-width="120px")
              el-checkbox-group(v-model="withdrawResource.priority")
                el-col(v-for="item in priorityList", :key="item.key", :span="2")
                  b-checkbox(:label="item.key") {{item.val}}
            el-form-item(:label="renderData.range", v-if="filter === 'apply_time'", label-width="120px")
              el-col(:span="12")
                b-select(:model.sync="withdrawResource.dateRanges", :placeholder="renderData.pleaseSelect", :multiple="true")
                  el-option(v-for="item in dateRangeList", :key="item", :label="item", :value="item")
              el-col(:span="12")
                b-datepicker(:model.sync="tmpRange", :placeholder="renderData.pleaseSelect", @change="addToDateRanges")
          .filter-item(v-if="!withdrawResource.reachAll")
            el-form-item(prop="emptyFilter", :label="renderData.filterCondition", label-width="120px")
              b-select(:model.sync="form.emptyFilter", :placeholder="renderData.pleaseSelect")
                el-option(v-for="item in computedFilters", :key="item.field", :label="item.label", :value="item.field")

            el-form-item(:label="renderData.range", v-if="form.emptyFilter === 'audit_result'", label-width="120px")
              el-checkbox-group(v-model="withdrawResource.audit_result")
                el-col(v-for="item in auditResultList", :key="item.key", :span="2")
                  b-checkbox(:label="item.key") {{item.val}}
            el-form-item(:label="renderData.range", v-if="form.emptyFilter === 'priority'", label-width="120px")
              el-checkbox-group(v-model="withdrawResource.priority")
                el-col(v-for="item in priorityList", :key="item.key", :span="2")
                  b-checkbox(:label="item.key") {{item.val}}
            el-form-item(:label="renderData.range", v-if="form.emptyFilter === 'apply_time'", label-width="120px")
              el-col(:span="12")
                b-select(:model.sync="withdrawResource.dateRanges", :placeholder="renderData.pleaseSelect", :multiple="true")
                  el-option(v-for="item in dateRangeList", :key="item", :label="item", :value="item")
              el-col(:span="12")
                b-datepicker(:model.sync="tmpRange", :placeholder="renderData.pleaseSelect", @change="addToDateRanges")

          b-button(type="primary", @click="addFilter" v-if="!withdrawResource.reachAll") {{renderData.addFilterCondition}}
      .right
        el-radio-group(v-model="withdrawResource.checkAll")
          div
            b-radio.radio-box(:label="true") {{renderData.checkAllResource}}
          div
            b-radio.radio-box(:label="false") {{renderData.checkPartResource}}
    template(v-if="resource.name=='user_audit'")
    template(v-if="resource.name=='deposit_audit'")
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BRadio from 'components/BRadio'
  import BCheckbox from 'components/BCheckbox'
  import BSelect from 'components/BSelect'
  import BDatepicker from 'components/BDatepicker'
  import BIcon from 'components/BIcon'

  export default {
    name: 'resource-item',
    data () {
      return {
        form: {
          emptyFilter: ''
        },
        rules: {
          emptyFilter: [
            {
              required: true,
              message: this.renderData.pleaseSelect
            }
          ]
        },
        dateRangeList: [],
        auditResultList: [],
        priorityList: [],
        selectedFilterList: [],
        filterList: [],
        withdrawResource: {
          checkAll: true,
          dateRanges: [],
          priority: [],
          audit_result: [],
          reachAll: true
        },
        tmpRange: ''
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      resource: {
        type: Object,
        required: true
      }
    },
    computed: {
      computedFilters () {
        return this.filterList.filter(item => {
          return !this.selectedFilterList.some(elm => {
            elm === item.field
          })
        })
      }
    },
    methods: {
      addFilter () {
        this.$refs[this.resource.name].validate(valid => {
          if (valid) {
            this.selectedFilterList.push(this.form.emptyFilter)
            this.form.emptyFilter = ''
          }
        })
      },
      deleteFilter (filter) {
        var idx = this.selectedFilterList.indexOf(filter)
        this.selectedFilterList.splice(idx, 1)
      },
      addToDateRanges () {
        this.dateRangeList.push(this.tmpRange)
        this.withdrawResource.dateRanges.push(this.tmpRange)
        console.log('addToDateRanges', this.tmpRange, this.withdrawResource.dateRanges, this.dateRangeList)
      },
      getFilterList () {
        var params = {}
        return service.getFilterList(params).then(res => {
          if (res.re === '200') {
            this.filterList = res.data
          }
        })
      },
      getPriorityList () {
        var params = {}
        return service.getPrioritySelect(params).then(res => {
          if (res.re === '200') {
            this.priorityList = res.data
          }
        })
      },
      getAuditResultList () {
        var params = {}
        return service.getAuditResultSelect(params).then(res => {
          if (res.re === '200') {
            this.auditResultList = res.data
          }
        })
      }
    },
    async mounted () {
      await this.getFilterList()
      await this.getPriorityList()
      await this.getAuditResultList()
    },
    components: {
      BIcon,
      BButton,
      BRadio,
      BCheckbox,
      BDatepicker,
      BSelect,
      BDialog
    }
  }
</script>

<style lang="less">
  .resource-item {
    position: relative;
    display: flex;
    flex-direction: row;
    .el-radio-group div{
      line-height: 36px;
    }
    .left {
      flex-grow: 1;
      .filter-item {
        .b-icon {
          float: right;
          margin-right: 15px;
        }
        border: 1px solid #E5E9F2;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
        margin: 15px 0;
        padding: 15px 0 5px 0;
      }
    }
    .right {
      padding-left: 15px;
      width: 180px;
    }
  }
</style>
