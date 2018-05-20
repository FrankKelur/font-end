<template lang="pug">
  .investor-info
    .title.theme-color-darkenC10.theme-bg-fadeA2.theme-border-lightenD12 {{renderData.userProfileJobInfo}}
    el-form(:model="investorInfo", ref="investorInfo", :rules="rules" label-width="140px" v-if="visible.page === 'investor_info'", labelPosition='left')
      b-alert.margin-bottom(v-if="auditFailReason", :title="renderData.auditFail", :description="auditFailReason", :closable="false")
      el-form-item(:label="permit.working_condition.label", prop="working_condition", v-if="permit.working_condition")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.working_condition.label}}
        b-select(:model.sync="investorInfo.working_condition", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(elem, idx) in permit.working_condition.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      el-form-item(:label="permit.career_field.label", prop="career_field", v-if="permit.career_field")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.career_field.label}}
        .career-select
          b-select(:model.sync="careerGroup", :placeholder="renderData.pleaseSelect", :disabled="disabled", valueKey="key")
            el-option(v-for="(elem, idx) in permit.career_field.dataSource", :key="idx", :label="elem.label", :value="elem")
          b-select(:model.sync="investorInfo.career_field", :placeholder="renderData.pleaseSelect", :disabled="disabled")
            el-option(v-for="(elem, idx) in careerGroup.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      el-form-item(:label="permit.source_funds.label", prop="source_funds", v-if="permit.source_funds")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.source_funds.label}}
        b-select(:model.sync="investorInfo.source_funds", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(elem, idx) in permit.source_funds.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      el-form-item(:label="permit.annual_revenue.label", prop="annual_revenue", v-if="permit.annual_revenue")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.annual_revenue.label}}
        b-select(:model.sync="investorInfo.annual_revenue", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(elem, idx) in permit.annual_revenue.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      el-form-item(:label="permit.net_worth.label", prop="net_worth", v-if="permit.net_worth")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.net_worth.label}}
        b-select(:model.sync="investorInfo.net_worth", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(elem, idx) in permit.net_worth.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      el-form-item(:label="permit.engaged_transaction.label", prop="engaged_transaction", v-if="permit.engaged_transaction")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.engaged_transaction.label}}
        b-select(:model.sync="investorInfo.engaged_transaction", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(elem, idx) in permit.engaged_transaction.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      el-form-item(:label="permit.invest_knowledge.label", prop="invest_knowledge", v-if="permit.invest_knowledge")
        span.inline-label(slot="label" v-ellipsis-title='') {{permit.invest_knowledge.label}}
        b-select(:model.sync="investorInfo.invest_knowledge", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(elem, idx) in permit.invest_knowledge.dataSource", :key="idx", :label="elem.label", :value="elem.key")
      custom-form.custom-area(:model="investorInfo", ref="customForm", :formItemList="formItemList", :renderData="renderData", label-width="140px", :disabled="disabled", labelPosition='left')
      .footer
        b-button(@click="prev") {{renderData.previous}}
        b-button(@click="save", :disabled="disabled") {{renderData.save}}
        b-button(@click="next" type="primary" v-if="!isEnd") {{renderData.next}}
        b-button(@click="submit" type="primary", :disabled="disabled" v-else) {{renderData.submit}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BAlert from 'components/BAlert'
  import BSelect from 'components/BSelect'
  import CustomForm from '@/page/audit_process/module/CustomForm'

  export default {
    name: 'investor-info',
    data () {
      // 用profileInfo.investor_info 里的数据给 formItemList 赋值
      var info = this.profileInfo.investor_info
      var formItemList = this.setting.custom.investor_info
      var formItemListSys = this.setting.data.investor_info
      var careerGroup = {
        key: '',
        dataSource: []
      }
      formItemList.forEach(formItem => {
        formItem.value = info[formItem.key]
      })
      formItemListSys.forEach(formItem => {
        var value = info[formItem.key]
        if (formItem.key === 'career_field' && value) {
          careerGroup = formItem.dataSource.find(item => !!item.dataSource.find(elm => elm.key === value))
          console.log('careerGroup', careerGroup)
        }
      })
      console.log('careerGroup', careerGroup)
      return {
        careerGroup: careerGroup,
        formItemList: formItemList,
        investorInfo: this.profileInfo.investor_info
      }
    },
    methods: {
      save (cb) {
        var res = true
        this.$refs['investorInfo'].validate((valid) => { res = res && valid })
        this.$refs['customForm'].validate((valid) => { res = res && valid })
        if (!res) { return }
        var params = {
          group: 'investor_info',
          data: this.investorInfo
        }
        service.saveProfileInfo(params).then(res => {
          cb && typeof cb === 'function' && cb()
        })
      },
      submit () {
        var res = true
        this.$refs['investorInfo'].validate((valid) => { res = res && valid })
        this.$refs['customForm'].validate((valid) => { res = res && valid })
        if (!res) { return }
        this.profileInfo.investor_info = this.investorInfo // 把信息传入 profileInfo中用来提交
        service.submitUserProfile(this.profileInfo).then(() => {
          this.$emit('update-status', 'process')
          this.visible.page = 'complete'
        })
      },
      next () {
        this.profileInfo.investor_info = this.investorInfo // 把信息传入 profileInfo中用来提交
        var currIdx = this.pageList.indexOf(this.visible.page)
        if (this.disabled) { // 如果当前是disabled状态，就不保存
          this.visible.page = this.pageList[currIdx + 1]
          return
        }
        this.save(() => { // 下一步之前，先保存
          this.visible.page = this.pageList[currIdx + 1]
        })
      },
      prev () {
        var currIdx = this.pageList.indexOf(this.visible.page)
        if (currIdx) {
          this.visible.page = this.pageList[currIdx - 1]
        }
      }
    },
    props: {
      pageList: {
        required: true,
        type: Array
      },
      renderData: {
        required: true,
        type: Object
      },
      setting: {
        required: true,
        type: Object
      },
      auditFailReason: {
        required: true,
        type: String
      },
      profileInfo: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components: {
      BSelect,
      CustomForm,
      BAlert,
      BButton
    },
    computed: {
      isEnd () {
        var currIdx = this.pageList.indexOf(this.visible.page)
        return currIdx === this.pageList.length - 2
      },
      permit () {
        return this.setting.data.investor_info.reduce((res, item) => {
          return Object.assign(res, {
            [item.key]: item
          })
        }, {})
      },
      rules () {
        return this.setting.data.investor_info.reduce((res, item) => {
          var rule = {}
          if (item.required) {
            rule = {
              [item.key]: [{
                required: true,
                message: this.renderData.pleaseSelect,
                trigger: 'blur, change'
              }]
            }
          }
          return Object.assign(res, rule)
        }, {})
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .investor-info {
    .title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      border: solid 1px;
      margin-bottom: 20px;
      padding-left: 2%;
    }
  }

  .investor-info .el-form {
    .b-input, .b-select, .b-date-picker {
      width: 100% !important;
    }
    .career-select .b-select {
      width: 50% !important;
    }
    .inline-label {
      display: inline-block;
      width: 88%;
      vertical-align: top;
    }
    .margin-bottom {
      margin-bottom: 20px;
    }
  }
</style>
