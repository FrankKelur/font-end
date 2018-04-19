<template lang="pug">
  .user-details
    b-dialog.editUserProfile(:show.sync="activeName4", :title="renderData.editPersonalInfo", :show-close="true")
      .editPersonalInfo_body
        el-form(:model="editPersonalInfoForm", ref="editPersonalInfoForm", label-width="130")
          el-form-item(:prop="'editPersonalInfo.' + item.key", v-for="(item, idx) in commonBaseInfo", :key="idx", :label="item.label", :rules="{required: item.required, message: renderData.requiredEnter, trigger: 'blur'}")
            b-form-item(:model.sync="editPersonalInfoForm.editPersonalInfo[item.key]", :item="item", :renderData="renderData")
      template(slot="footer")
        b-button(@click="activeName4 = false") {{renderData.cancel}}
        b-button(@click="editPersonal", type="primary") {{renderData.confirm}}

    b-dialog.investorInfo(:show.sync="activeName5", :title="renderData.jobInfo", :show-close="true")
      .investorInfo
        el-form(:model="investorInfoForm", ref="investorInfoForm", label-width="130")
          el-form-item(:prop="'editInvestorInfo.' + item.key", v-for="(item, idx) in commonInvestorInfo", :key="idx", :label="item.label", :rules="{required: item.required, message: renderData.requiredEnter, trigger: 'blur'}")
            b-form-item(:model.sync="investorInfoForm.editInvestorInfo[item.key]", :item="item", :renderData="renderData")
      template(slot="footer")
        b-button(@click="activeName5 = false") {{renderData.cancel}}
        b-button(@click="editInvestor", type="primary") {{renderData.confirm}}


    b-title(:title="renderData.userIinfo", v-if="!visible.page")
    .card(v-if="!visible.page")
      el-tabs(v-model="activeName", type="card", @tab-click="handleClick")
        el-tab-pane(:label="renderData.userProfile", name="first")
          .user_profile.theme-border-darkenA10
            .header.theme-border-darkenA10
              span {{renderData.userBasicInfo}}
            .body.theme-border-darkenA10
              span {{renderData.userName}}&nbsp; : &nbsp;&nbsp;&nbsp;{{profile.user_name}}
              span {{renderData.email}}&nbsp; : &nbsp;&nbsp;&nbsp;{{profile.email}}
          .personal_information.theme-border-darkenA10
            .header.theme-border-darkenA10
              span {{renderData.personalInfo}}
              .icon(@click="edit")
                b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit")
            .body.theme-border-darkenA10
              .base_info(v-for="item in baseInfoKey")
                span {{allBaseInfo[item]}}&nbsp; : &nbsp;&nbsp;&nbsp;{{baseInfo[item]}}
          .career_trade.theme-border-darkenA10
            .header.theme-border-darkenA10
              span {{renderData.jobInfo}}
              .icon(@click="edit1")
                b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit")
            .body.theme-border-darkenA10
              .investorInfo(v-for="item in commonInvestorInfo")
                span {{item.label}}&nbsp; : &nbsp;&nbsp;&nbsp;{{item.dataSource[investorInfo[item.key]].label}}
          .file.theme-border-darkenA10
            .header.theme-border-darkenA10
              span {{renderData.profile}}
              .icon
                b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit")
        el-tab-pane(:label="renderData.account", name="second")
          b-search-table(:optHandler='optHandler', :render-data="tableRenderData", ref="table", url="/api/resource/account/get_user_accounts", :uid="uid")
    component(:is="visible.dialog", :render-data="modalRenderData", :visible="visible", :accountInfo="accountInfo", :profile="profile", v-on:checkPwdDialog="checkPwdDialog")
    .footer(v-if="!visible.page")
      .btn
        b-button(@click="backAllUserList") {{renderData.back}}
    component(:is="visible.page", :render-data="renderData", :visible="visible")

</template>

<script>
//  import { Popover } from 'element-ui'
  import changeAccount from './changeAccount.vue'
  import checkPwd from './checkPwd.vue'
  import deleteAccount from './deleteAccount.vue'
  import allUserList from './allUserList'
  import BTitle from 'components/BTitle'
  import BSearchTable from 'components/BSearchTable'
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BButton from 'components/BButton'
//  import countries from 'common/js/countries'
  import BFormItem from 'components/BFormItem'
  export default {
    data () {
      var allUser = window.renderData.components.all_user
      var renderData = Object.assign({}, allUser.all_user_auth, allUser.check_user_profile, allUser.edit_user_profile, allUser.check_trade_account_search, allUser.check_trade_account_list)
      var tableRenderData = Object.assign({}, allUser.all_user_auth)
      tableRenderData.listObj = allUser.check_trade_account_list
      tableRenderData.searchObj = allUser.check_trade_account_search
      var _this = this
      var optHandler = {}
      var cmdList = ['check_trade_account_list_delete_account', 'check_trade_account_list_check_account_pwd', 'check_trade_account_list_change_account_info']
      cmdList.forEach(cmd => {
        optHandler[cmd] = function (row, renderData) {
          console.log('row, renderData', ...arguments)
          _this.accountInfo = row
          _this.modalRenderData = renderData
          console.log(row)
          if (cmd === 'check_trade_account_list_delete_account' || cmd === 'check_trade_account_list_check_account_pwd' || cmd === 'check_trade_account_list_change_account_info') {
            _this.modalRenderData = renderData
            _this.visible.dialog = cmd
          }
        }
      })
      console.log('renderData')
      console.log(renderData)
      return {
        TextMap: {
        },
        optHandler: optHandler,
        accountInfo: {},
        modalRenderData: {},
        uid: this.profile.uid,
        visible: {
          page: null,
          dialog: null
        },
        commonInvestorInfo: [],
        allInvestorInfo1: [],
        investorInfoKey: [],
        investorInfo: {},
        allInvestorInfo: {
          working_condition: renderData.employmentStatus,
          source_funds: renderData.fundSource,
          annual_revenue: renderData.estimatedEquity,
          net_worth: renderData.estimatedAnnualIncome,
          engaged_transaction: renderData.previousTrading,
          invest_knowledge: renderData.tradeKnowledge
        },
        allBaseInfo1: [],
        commonBaseInfo: [],
        baseInfoKey: [],
//        0
//          :
//          "last_name"
//        1
//          :
//          "middle_name"
//        2
//          :
//          "first_name"
        baseInfo: {},
//        "base_info": {
//          "1517205442": "4444",
//          "first_name": "3333",
//          "last_name": "11111",
//          "middle_name": "2222"
//        }
        allBaseInfo: {
          last_name: renderData.lastName,
          middle_name: renderData.middleName,
          first_name: renderData.firstName,
          birthday: renderData.birthday,
          company_name: renderData.companyName,
          company_ctime: renderData.registerTime,
          phone_on: renderData.phoneNo,
          lang: renderData.language,
          country: renderData.country,
          company_register_country: renderData.registerCountry,
          state: renderData.province,
          city: renderData.city,
          address: renderData.address,
          postcode: renderData.zipcode
        },
        userProfile: {},
        renderData: renderData,
        activeName: 'first',
        tableRenderData: tableRenderData,
        activeName4: false,
        activeName5: false,
//        languageSelect: [],
//        registerCountrySelect: [],
//        countryList: countries[window.renderData.user_setting.lang],
//        countryPlaceholder: renderData.pleaseSelect,
        editPersonalInfoForm: {
          editPersonalInfo: {}
        },
        investorInfoForm: {
          editInvestorInfo: {}
        }
      }
    },
    props: {
      profile: {
        type: Object,
        required: true
      }
    },
    methods: {
//      getTransferTableRenderData () {
//        var tableRenderData = null
//        tableRenderData = this.tableRenderData
//        var h = this.$createElement
//        var _this = this
//        var popover = Popover
//        tableRenderData = JSON.parse(JSON.stringify(tableRenderData))
//        var headerCols = tableRenderData.listObj.headerCols
//        headerCols.forEach(item => {
//          _this.TextMap[item.field] = item.label
//        })
//        headerCols.push({
//          field: 'more',
//          isGroup: true,
//          fieldTextMap: this.TextMap,
//          label: this.renderData.check_trade_account_list.more,
//          formatter (row, col, getLabel) {
//            var obj = row[col.property]
//            var keys = Object.keys(obj)
//            return h(popover, {}, [
//              h(BIcon, {slot: 'reference', props: {iconName: 'more'}}, []),
//              keys.map(key => h('div', {class: ['el-popover-item-intable']}, [
//                h('div', {class: ['left'], directives: [{name: 'ellipsis-title'}]}, key),
//                h('div', {class: ['right'], directives: [{name: 'ellipsis-title'}]}, obj[key])
//              ]))
//            ])
//          }
//        })
//        tableRenderData.listObj.headerCols = headerCols
//        return tableRenderData
//      },
      checkPwdDialog () {
        this.visible.dialog = null
      },
      backAllUserList () {
        this.visible.page = allUserList
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      edit () {
        this.activeName4 = true
      },
      edit1 () {
        this.activeName5 = true
      },
      editInvestor () {
        this.activeName5 = false
        var params = {
          cpne_name: 'all_user',
          target_uid: this.profile.uid,
          user_info: {
            group: 'investor_info',
            data: this.investorInfoForm.editInvestorInfo
          }
        }
        service.setPersonalInfo(params).then(data => {
          this.investorInfo = this.investorInfoForm.editInvestorInfo
        })
      },
      editPersonal () {
        this.activeName4 = false
        var params = {
          cpne_name: 'all_user',
          target_uid: this.profile.uid,
          user_info: {
            group: 'base_info',
            data: this.editPersonalInfoForm.editPersonalInfo
          }
        }
        service.setPersonalInfo(params).then(data => {
          this.baseInfo = this.editPersonalInfoForm.editPersonalInfo
        })
      }
    },
    watch: {
      'visible.dialog': function (newVal, oldVal) {
        !newVal && this.$refs['table'].search()
      }
    },
    async mounted () {
      var params = {
        cpne_name: 'all_user',
        target_uid: this.profile.uid
      }
      await service.getUserInfo(params).then(data => {
        console.log(data)
        this.baseInfo = data.base_info
        for (var key in this.allBaseInfo) {
          for (var key1 in this.baseInfo) {
            if (key1 === key) {
              this.baseInfoKey.push(key)
              this.editPersonalInfoForm.editPersonalInfo[key] = this.baseInfo[key1]
            }
          }
        }
        this.investorInfo = data.investor_info
        for (var key2 in this.allInvestorInfo) {
          for (var key3 in this.investorInfo) {
            if (key3 === key2) {
              this.investorInfoKey.push(key2)
              this.investorInfoForm.editInvestorInfo[key2] = this.investorInfo[key3]
            }
          }
        }
      })
      var params1 = {
        cpne_name: 'all_user',
        target_uid: this.profile.uid
      }
      var vm = this
      await service.getUserInfoSetting(params1).then(data1 => {
        this.allBaseInfo1 = data1.data.base_info
        for (var i = 0; i < vm.baseInfoKey.length; i++) {
          for (var j = 0; j < vm.allBaseInfo1.length; j++) {
            if (vm.baseInfoKey[i] === vm.allBaseInfo1[j].key) {
              vm.commonBaseInfo.push(vm.allBaseInfo1[j])
            }
          }
        }

        this.allInvestorInfo1 = data1.data.investor_info
        for (var ii = 0; ii < vm.investorInfoKey.length; ii++) {
          for (var jj = 0; jj < vm.allInvestorInfo1.length; jj++) {
            if (vm.investorInfoKey[ii] === vm.allInvestorInfo1[jj].key) {
              vm.commonInvestorInfo.push(vm.allInvestorInfo1[jj])
            }
          }
        }
      })
    },
    components: {
      BSearchTable,
      BTitle,
      BIcon,
      BDialog,
      BSelect,
      BInput,
      BButton,
      BFormItem,
      allUserList,
      'check_trade_account_list_delete_account': deleteAccount,
      'check_trade_account_list_check_account_pwd': checkPwd,
      'check_trade_account_list_change_account_info': changeAccount
    }
  }
</script>

<style lang="less">
  .user-details {
    position: relative;
    .footer {
      margin-top: 40px;
    }
    .header {
      width: 100%;
      height: 40px;
      border: 1px solid ;
      line-height: 40px;
      span {
        display: inline-block;
        margin-left: 20px;
      }
      .icon {
        float: right;
        margin-top: 5px;
        margin-right: 10px;
      }
    }
    .body {
      border: 1px solid;
      padding: 20px 30px;
    }
    .personal_information {
      .body {
        width: 100%;
        .base_info {
          display: inline-block;
          width: 50%;
          margin-bottom: 10px;
        }
      }
    }
    .user_profile {
      .body {
        width: 100%;
        span {
          display: inline-block;
          width: 50%;
        }
      }
    }
    .career_trade {
      .body {
        width: 100%;
        .investorInfo{
          display: inline-block;
          width: 50%;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
