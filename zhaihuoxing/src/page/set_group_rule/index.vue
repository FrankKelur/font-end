<template lang="pug">
  .set_group_rule.theme-border-lightenD12.component#set_group_rule
    .kongdiv1
      b-title.amt-more-left-in(:title="renderData.setGroupRuleSetting")
        template(slot="icon")
          el-tooltip(class="item" effect="dark", :content="renderData.setGroupRuleSettingInfo" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')

    el-collapse.amt-more-left-in(v-model="activeName", @change="collapseChange" v-if="comAuth.set_group_rule_default")
      el-collapse-item(v-for="(item, parIndex) in searchData", :title="item.channel_name", :name="item.channel_name", :key="parIndex")
        .content
          .rule
            .rule-title {{renderData.setGroupRule}}
            .rule-list
              b-button.tag-group(size="small" v-for="(rule, index) in item.rule_used", :key="index")
                span.tag-group-txt(v-ellipsis-title="") {{rule.label}}
                b-icon.theme-color-C.theme-color-G-hover(iconName="delete", size="12px", @click='deleteRule(item, rule)')
              b-button(size="small" type="primary" v-if="!item.ruleSelectFlag", @click='addRule(item)') {{renderData.addField}}

              .select-area(v-if="item.ruleSelectFlag")
                b-select(:placeholder="renderData.pleaseSelect", :model.sync="item.ruleSelectData" filterable)
                  el-option(v-for="ruleItem in item.rule_not_used", :key="ruleItem.key", :label="ruleItem.label", :value="ruleItem.key")
                b-icon.theme-color-C.theme-color-G-hover.margin-left-15(iconName='delete', @click='cancelAddRule(item)')
                b-icon.theme-color-C.theme-color-E-hover.margin-left-15(iconName='message_success', @click='sureAddRule(item)')

          .mg-table-box
            .mg-table.theme-border-lightenD12
              .table-header.theme-bg-lightenD18.theme-border-bottom-lightenD12
                .table-header-tr
                  .table-header-th(v-for="(thData, index) in item.rule_used", :key="index") {{thData.label}}
                    el-tooltip(class="item" effect="dark", :content="renderData.currencyInfo" placement="top" v-if="thData.key === 'currency'")
                      b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info', size="14px")
                  .table-header-th
                    span group
                    el-tooltip(class="item" effect="dark", :content="renderData.groupInfo" placement="top")
                      b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info', size="14px")
              .table-body
                .table-body-tr.theme-bg-H.theme-border-bottom-lightenD12(v-for="(trData, trDataIndex) in item.newDataArr", :key="trDataIndex")
                  .table-body-td(v-for="(tdData, tdDataIndex) in trData" v-if="tdData.key !== 'aid' && tdData.key !== 'jiLian'", :key="tdDataIndex")
                    el-form(v-if="tdData.key === 'commission' || tdData.key === 'pip'", :ref="'tdForm'+parIndex", :model="tdData")
                      el-form-item(prop="label", :rules="pipAndCommission")
                        b-input(:model.sync="tdData.label", :placeholder="renderData.pleaseEnter")

                    b-select(:placeholder="renderData.pleaseSelect", :model.sync="tdData.label" filterable v-if="tdData.key === 'accountCategory'" clearable)
                      el-option(v-for="category in item.categoryArr", :key="category.key", :value="category.label", :label="category.label")

                    b-select(:placeholder="renderData.pleaseSelect", :model.sync="tdData.label" filterable v-if="tdData.key === 'accountType'" clearable @change="accountTypeChange(tdData.label, trData)")
                      el-option(v-for="accountType in item.accountTypeArr", :key="accountType.key", :value="accountType.label", :label="accountType.label")

                    b-select(:placeholder="renderData.pleaseSelect", :model.sync="tdData.label" filterable clearable v-if="tdData.key === 'currency'")
                      el-option(v-for="jiLian in trData[trData.length -1 ].arr", :key="jiLian", :value="jiLian", :label="jiLian")

                    .div-icon(v-if="tdData.key === 'group'")
                      .left(style="display: inline-block; width: 85%;")
                        el-form(:ref="'tdForm'+parIndex", :model="tdData")
                          el-form-item(prop="label", :rules="groupRules")
                            b-input(:model.sync="tdData.label", :placeholder="renderData.pleaseEnter")
                      .right(style="display: inline-block; width: 15%; text-align: center;")
                        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deleteTr(item, trDataIndex, trData)")

                .table-body-tr.theme-bg-H.text-center
                  .table-body-td
                    span.add-rule.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active(@click="tableAddRule(item)")
                      i.el-icon-plus.font-weight
                      span.margin-left-15 {{renderData.addRule}}

          .rule-default
            el-form(label-width="130px" label-position='left' ref="form", :rules="rules", :model="item")
              el-form-item(prop="defaultGroup")
                template(slot="label")
                  span.theme-color-C(v-text="renderData.defaultGroup")
                  el-tooltip(class="item" effect="dark", :content="renderData.defaultGroupInfo" placement="top")
                    b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info', size="14px")
                b-input(:model.sync="item.defaultGroup", :placeholder="renderData.pleaseEnter")
            b-button.margin-bottom-45(type="primary", @click='saveData(item, parIndex)') {{renderData.save}}
</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BIcon from 'components/BIcon'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import utils from 'common/js/Utils'

  export default {
    name: 'set_group_rule',
    mixins: [componentMixin],
    data () {
      var comAuth = window.renderData.components.set_group_rule
      var renderData = Object.assign({}, comAuth.set_group_rule_auth, comAuth.set_group_rule_default)
      return {
        comAuth: comAuth,
        renderData: renderData,
        activeName: [],
        searchData: [],
        rules: {
          defaultGroup: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.qianhouNoSpace,
              trigger: 'blur'
            }
          ]
        },
        jiLianTemp: null,
        pipAndCommission: [
          {
            regex: utils.constants.mustNumber2,
            message: renderData.onlyNumberNoSpace,
            validator: utils.validator.validate,
            trigger: 'blur'
          }
        ],
        groupRules: [
          {
            validator: utils.validator.validate,
            test (val) {
              return val.trim() === val
            },
            message: renderData.qianhouNoSpace,
            trigger: 'blur'
          }
        ]
      }
    },
    methods: {
      addRule (item) {
        item.ruleSelectFlag = !item.ruleSelectFlag
      },
      sureAddRule (item) {
        let vm = this
        item.ruleSelectFlag = !item.ruleSelectFlag
        if (item.ruleSelectData !== '') {
          var params = {
            'uuid': item.cid,
            'key': item.ruleSelectData
          }
          service.addSetGroupRule(params).then(function (resp) {
            if (resp.re === '200') {
              for (let i = 0; i < item.rule_not_used.length; i++) {
                if (item.ruleSelectData === item.rule_not_used[i].key) {
                  item.rule_used.push({
                    key: item.rule_not_used[i].key,
                    label: item.rule_not_used[i].label
                  })
                  item.rule_not_used.splice(i, 1)
                  break
                }
              }
              for (let i = 0; i < item.newDataArr.length; i++) {
                item.newDataArr[i].splice(item.newDataArr[i].length - 3, 0, {
                  key: item.ruleSelectData,
                  label: ''
                })
              }
              console.log(item)
              item.ruleSelectData = ''
              vm.$message({
                message: vm.renderData.addSuccess,
                type: 'success'
              })
            }
          })
        }
      },
      cancelAddRule (item) {
        item.ruleSelectData = ''
        item.ruleSelectFlag = !item.ruleSelectFlag
      },
      tableAddRule (item) {
        console.log(item)
        var template = []
        item.rule_used.forEach(function (val) {
          template.push({
            key: val.key,
            label: ''
          })
        })
        template.push(
          {
            key: 'group',
            label: ''
          },
          {
            key: 'aid',
            label: ''
          },
          {
            key: 'jiLian',
            label: this.jiLianTemp.label,
            arr: this.jiLianTemp.arr
          }
        )
        item.newDataArr.push(template)
        console.log(template)
      },
      deleteRule (item, rule) {
        let vm = this
        var tooltip = vm.renderData.deleteRuleText
        var accAndCur = false
        if (rule.key === 'accountType') {
          for (let i = 0; i < item.rule_used.length; i++) {
            if (item.rule_used[i].key === 'currency') {
              tooltip = vm.renderData.deleteRuleAccountType
              accAndCur = true
              break
            }
          }
        }
        console.log(accAndCur)
        console.log(rule)
        console.log(item)
        vm.$confirm(tooltip, vm.renderData.toolTip, {
          confirmButtonText: vm.renderData.confirm,
          cancelButtonText: vm.renderData.cancel,
          type: 'warning'
        }).then(() => {
          let params = {
            key: rule.key,
            uuid: item.cid
          }
          service.deleteSetGroupRule(params).then(function (resp) {
            if (resp.re === '200') {
              for (let i = 0; i < item.rule_used.length; i++) {
                if (rule.key === item.rule_used[i].key) {
                  item.rule_used.splice(i, 1)
                  item.rule_not_used.push(rule)
                  break
                }
              }
              for (let i = 0; i < item.newDataArr.length; i++) {
                for (let j = 0; j < item.newDataArr[i].length; j++) {
                  if (rule.key === item.newDataArr[i][j].key) {
                    item.newDataArr[i].splice(j, 1)
                    break
                  }
                }
              }
              vm.$message({
                type: 'success',
                message: vm.renderData.deleteSucceed
              })
            }
          })
          if (accAndCur) {
            let params = {
              key: 'currency',
              uuid: item.cid
            }
            service.deleteSetGroupRule(params).then(function (resp) {
              if (resp.re === '200') {
                for (let i = 0; i < item.rule_used.length; i++) {
                  if (item.rule_used[i].key === 'currency') {
                    item.rule_not_used.push({
                      key: item.rule_used[i].key,
                      label: item.rule_used[i].label
                    })
                    item.rule_used.splice(i, 1)
                    break
                  }
                }
                for (let i = 0; i < item.newDataArr.length; i++) {
                  for (let j = 0; j < item.newDataArr[i].length; j++) {
                    if (item.newDataArr[i][j].key === 'currency') {
                      item.newDataArr[i].splice(j, 1)
                      break
                    }
                  }
                }
              }
            })
          }
        }).catch(() => {
          vm.$message({
            type: 'info',
            message: vm.renderData.cancelTool
          })
        })
      },
      deleteTr (item, trDataIndex, trData) {
        let vm = this
        this.$confirm(vm.renderData.deleteTrData, vm.renderData.toolTip, {
          confirmButtonText: vm.renderData.confirm,
          cancelButtonText: vm.renderData.cancel,
          type: 'warning'
        }).then(() => {
          let aid = ''
          trData.forEach(function (val) {
            if (val.key === 'aid' && val.label !== '') {
              aid = val.label
            }
          })
          if (aid !== '') {
            service.deleteSetGroupData({
              uuid: item.cid,
              aid: aid
            }).then(function (resp) {
              item.newDataArr.splice(trDataIndex, 1)
            })
          } else {
            item.newDataArr.splice(trDataIndex, 1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: vm.renderData.cancelTool
          })
        })
      },
      collapseChange (nameArr) {
        console.log(nameArr)
        console.log(nameArr.length - 1)
        console.log(nameArr[nameArr.length - 1])
        let vm = this
        if (nameArr.length === 0) {
          return
        }
        vm.searchData.forEach(function (val, searchDataIndex) {
          if (nameArr[nameArr.length - 1] === val.channel_name) {
            if (val.getApi === false) {
              service.getAccountCategorySelect({
                uuid: val.cid
              }).then(function (resp) {
                val.categoryArr = resp
                val.getApi = true
              })
              service.getAccountTypeSelect({
                uuid: val.cid
              }).then(function (resp) {
                resp.forEach(function (respVal) {
                  val.accountTypeArr.push(respVal.type_name)
                })
                console.log('该通道的账号类型和货币联动', resp)
                vm.jiLianTemp = {
                  key: 'jiLian',
                  label: resp,
                  arr: []
                }
                vm.searchData[searchDataIndex].newDataArr.forEach(function (val) {
                  val.push({
                    key: 'jiLian',
                    label: resp,
                    arr: []
                  })
                  for (let i = 0; i < val.length; i++) {
                    if (val[i].key === 'accountType' && val[i].label) {
                      console.log(val[val.length - 1].label)
                      val[val.length - 1].label.forEach(function (arr) {
                        if (val[i].label === arr.type_name.label) {
                          val[val.length - 1].arr = JSON.parse(JSON.stringify(arr.currency))
                        }
                      })
                      break
                    }
                  }
                })
              })
              console.log('use api')
            }
          }
        })
      },
      accountTypeChange (value, trData) {
        console.log(value)
        console.log(trData)
        console.log(trData[trData.length - 1])
        for (let i = 0; i < trData.length; i++) {
          if (trData[i].key === 'currency') {
            trData[trData.length - 1].arr = []
            trData[i].label = ''
            break
          }
        }
        trData[trData.length - 1].label.forEach(function (val) {
          if (value === val.type_name.label) {
            trData[trData.length - 1].arr = JSON.parse(JSON.stringify(val.currency))
          }
        })
      },
      saveData (item, parIndex) {
        console.log(this.$refs)
        console.log(this.$refs['tdForm' + parIndex])
        let vm = this
        let next = true
        // 表格中有表单就进行验证
        if (this.$refs['tdForm' + parIndex]) {
          for (let y = 0; y < this.$refs['tdForm' + parIndex].length; y++) {
            this.$refs['tdForm' + parIndex][y].validate(valid => {
              console.log(valid)
              if (!valid) {
                next = false
              }
            })
            if (next === false) {
              break
            }
          }
        }
        if (next === false) {
          return
        }
        vm.$refs['form'][parIndex].validate(valid => {
          if (!valid) {
            next = false
          }
        })
        if (next === false) {
          return
        }
        var params = {
          uuid: item.cid,
          data: [],
          defaultGroup: item.defaultGroup
        }
        item.newDataArr.forEach(function (val) {
          var childData = {
            accountCategory: {
              key: '',
              label: ''
            },
            accountType: {
              key: '',
              label: ''
            },
            currency: '',
            pip: '',
            commission: '',
            group: '',
            aid: ''
          }
          val.forEach(function (objData) {
            if (objData.key === 'pip') {
              childData.pip = objData.label
            }
            if (objData.key === 'commission') {
              childData.commission = objData.label
            }
            if (objData.key === 'group') {
              childData.group = objData.label
            }
            if (objData.key === 'aid') {
              childData.aid = objData.label
            }
            if (objData.key === 'currency') {
              childData.currency = objData.label
            }
            if (objData.key === 'accountType') {
              for (let i = 0; i < item.accountTypeArr.length; i++) {
                if (item.accountTypeArr[i].label === objData.label) {
                  childData.accountType.key = item.accountTypeArr[i].key
                  childData.accountType.label = objData.label
                  break
                }
              }
            }
            if (objData.key === 'accountCategory') {
              for (let i = 0; i < item.categoryArr.length; i++) {
                if (item.categoryArr[i].label === objData.label) {
                  childData.accountCategory.key = item.categoryArr[i].key
                  childData.accountCategory.label = objData.label
                  break
                }
              }
            }
          })
          for (let x in childData) {
            if (x === 'accountCategory' || x === 'accountType') {
              if (childData[x].key === '') {
                delete childData[x]
              }
            } else {
              if (childData[x] === '') {
                delete childData[x]
              }
            }
          }
          params.data.push(childData)
        })
        service.addSetGroupData(params).then(function (resp) {
          vm.init(parIndex)
          vm.$message({
            message: vm.renderData.saveSucceed,
            type: 'success'
          })
        })
      },
      init (dataIndex) {               // 取第几个通道的数据
        let vm = this
        vm.activeName = []
        service.getSetGroupRuleList({}).then(function (ruleList) {
          service.getSetGroupDataList({}).then(function (data) {
            vm.activeName.push(data[dataIndex].channel_name)
            data.forEach(function (val, index) {
              val.getApi = false
              val.ruleSelectFlag = false
              val.ruleSelectData = ''
              val.accountTypeArr = []
              val.categoryArr = []
              val.newDataArr = []
              val.group_data.forEach(function () {
                val.newDataArr.push([])
              })
              val.newDataArr.forEach(function (newDataArrVal) {
                val.rule_used.forEach(function (ruleUsedVal) {
                  newDataArrVal.push({
                    key: ruleUsedVal,
                    label: ''
                  })
                })
                newDataArrVal.push({
                  key: 'group',
                  label: ''
                })
              })
              for (let i = 0; i < val.group_data.length; i++) {
                for (let j = 0; j < val.group_data[i].length; j++) {
                  if (val.group_data[i][j].key === 'aid') {
                    val.newDataArr[i].push({
                      key: val.group_data[i][j].key,
                      label: val.group_data[i][j].value
                    })
                  }
                  for (let q = 0; q < val.newDataArr[i].length; q++) {
                    if (val.group_data[i][j].key === val.newDataArr[i][q].key) {
                      val.newDataArr[i][q].label = val.group_data[i][j].value
                      break
                    }
                  }
                }
              }
              val.rule_used.forEach(function (ruleUsedVal, ruleUsedIndex, ruleUsedArr) {
                ruleList.forEach(function (ruleListVal) {
                  if (ruleUsedVal === ruleListVal.key) {
                    ruleUsedArr[ruleUsedIndex] = {
                      key: ruleListVal.key,
                      label: ruleListVal.label
                    }
                  }
                })
              })
              val.rule_not_used = JSON.parse(JSON.stringify(ruleList))
              for (let i = 0; i < val.rule_used.length; i++) {
                for (let j = 0; j < val.rule_not_used.length; j++) {
                  if (val.rule_used[i].key === val.rule_not_used[j].key) {
                    val.rule_not_used.splice(j, 1)
                    break
                  }
                }
              }
            })
            service.getAccountCategorySelect({
              uuid: data[dataIndex].cid
            }).then(function (resp) {
              data[dataIndex].categoryArr = resp
              data[dataIndex].getApi = true
            })
            service.getAccountTypeSelect({
              uuid: data[dataIndex].cid
            }).then(function (resp) {
              resp.forEach(function (val) {
                data[dataIndex].accountTypeArr.push(val.type_name)
              })
              console.log('该通道的账号类型和货币联动', resp)
              vm.jiLianTemp = {
                key: 'jiLian',
                label: resp,
                arr: []
              }
              data[dataIndex].newDataArr.forEach(function (val) {
                val.push({
                  key: 'jiLian',
                  label: resp,
                  arr: []
                })
                console.log('data[dataIndex].newDataArr', val)
                for (let i = 0; i < val.length; i++) {
                  if (val[i].key === 'accountType' && val[i].label) {
                    console.log(val[val.length - 1].label)
                    val[val.length - 1].label.forEach(function (arr) {
                      if (val[i].label === arr.type_name.label) {
                        val[val.length - 1].arr = JSON.parse(JSON.stringify(arr.currency))
                      }
                    })
                    break
                  }
                }
              })
            })
            console.log('searchData', data)
            vm.searchData = data
          })
        })
      }
    },
    async mounted () {
      let vm = this
      if (vm.comAuth.set_group_rule_default) {
        vm.init(0)
      }
    },
    components: {
      BTitle,
      BButton,
      BInput,
      BSelect,
      BIcon
    }
  }
</script>

<style lang="less">
  .set_group_rule {
    .b-title{
      margin-bottom: 5px !important;
    }
    .el-collapse-item__content{
      padding-bottom: 0 !important;
    }
    .content{
      .rule{
        padding: 25px 0 10px 2.65%;
        &:after{
          display: block;
          content: " ";
          clear: both;
        }
        .rule-title{
          float: left;
          width: 130px;
          height: 36px;
          line-height: 36px;
          margin-right: 10px;
        }
        .rule-list{
          float: left;
          height: 36px;
          line-height: 36px;
          .tag-group {
            margin: 0 8px 6px 0!important;
            .b-icon {
              margin-left: 14px;
              position: relative;
              bottom: 3px;
            }
            .tag-group-txt {
              max-width: 300px;
              display: inline-block;
              font-size: 14px!important;
            }
          }
          .el-button+.el-button {
            margin-left: 0;
          }
          .select-area{
            display: inline-block;
            .el-select{
              width: auto;
            }
          }
        }
      }
      .mg-table{
        border: 1px solid;
        .table-header{
          margin-bottom: 1px;
          border-bottom: 1px solid;
          .table-header-tr{
            display: flex;
            .table-header-th{
              flex: 1;
              height: 44px;
              line-height: 44px;
              padding: 0 20px;
            }
          }
        }
        .table-body{
          max-height: 300px;
          overflow-y: auto;
          overflow-x: hidden;
          .table-body-tr{
            display: flex;
            .table-body-td{
              flex: 1;
              min-height: 44px;
              line-height: 44px;
              padding: 0 15px;
              .add-rule{
                font-size: 16px;
                cursor: pointer;
              }
            }
            .table-body-td:last-child{
              .el-input{
                /*width: auto;*/
              }
            }
          }
          .table-body-tr:not(:last-child){
            border-bottom: 1px solid;
          }
        }
      }
      .mg-table-box{
        margin: 0 1.2% 15px;
      }
      .el-input__inner{
        margin-top: 2px;
      }
      .rule-default{
        padding-left: 2.65%;
        .el-form-item{
          margin-bottom: 40px;
          .el-input__inner{
            width: 260px;
          }
        }
      }
    }
    .margin-left-15{
      margin-left: 15px;
    }
    .margin-bottom-45{
      margin-bottom: 45px;
    }
    .margin-left-10{
      margin-left: 10px;
    }
    .font-weight{
      font-weight: bold;
    }
    .el-form-item{
      margin-bottom: 0;
    }
    .el-form-item__error {
      padding-bottom: 6px;
      position: relative;
    }
  }
</style>
