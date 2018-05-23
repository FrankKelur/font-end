<template lang="pug">
  .user_type_setting_component.theme-border-lightenD12.component
    b-title(:title="renderData.userTypeSetting")
    .content
      .left
        .type-item.theme-bg-lightenD18-hover(v-for="(item, idx) in typeList", :key="item.uuid", :class="{'theme-bg-I': typeInfo.uuid===item.uuid}", @click="editTypeItem(item)")
          span(v-ellipsis-title="") {{item.name}}
          b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.native="deleteTypeItem(item, idx)")
          b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="copy", @click.native="copyType(item)")
        .type-item
          b-button(@click="newUserTypeMod", type="primary") {{renderData.newUserType}}
      .right.theme-bg-I
        .right-content(v-if="!typeInfo.empty")
          .body
            el-form(ref="type", :rules="userTypeRules", :model="typeInfo" label-width="140px", labelPosition='left')
              el-form-item(prop="name")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.userType", v-ellipsis-title="")
                b-input(:model.sync="typeInfo.name", :placeholder="renderData.pleaseEnter", :disabled="isRoot")
            .checkbox-container
              b-checkbox.theme-color-C(:model.sync="typeInfo.show_on_register") {{renderData.showAtRegister}}
            .title {{renderData.basicSetting}}
            el-form(ref="typeInfo", :rules="typeInfoRules", :model="typeInfo" label-width="140px", labelPosition='left')
              el-form-item(prop="user_group")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.userGroup", v-ellipsis-title="")
                b-select(:model.sync="typeInfo.user_group", :placeholder="renderData.pleaseSelect", :disabled="isRoot")
                  el-option(:label="item.val" v-for="(item, idx) in groupList", :key="idx", :value="item.key")
              el-form-item(prop="user_info")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.userProfile", v-ellipsis-title="")
                b-select(:model.sync="typeInfo.user_info", :placeholder="renderData.pleaseSelect")
                  el-option(:label="item.name" v-for="(item, idx) in profileList", :key="idx", :value="item.uuid")
              el-form-item(prop="login_to_url")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.firstPageAfterLogin", v-ellipsis-title="")
                b-select(:model.sync="typeInfo.login_to_url", :placeholder="renderData.pleaseSelect")
                  el-option(:label="item.label" v-for="(item, idx) in pageList", :key="idx", :value="item.key")
            .title {{renderData.depositAmountSetting}}
            fund-setting(:renderData="renderData", ref="deposit", :data="typeInfo", :setting="setting", type="deposit")
            .title {{renderData.withdrawAmountSetting}}
            fund-setting(:renderData="renderData", ref="withdraw", :data="typeInfo", :setting="setting", type="withdraw")
            .title {{renderData.accountNumberSetting}}
              el-tooltip(class="item" effect="dark", :content="renderData.accountNumberSettingInfo" placement="top")
                b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')
            channel-setting(:renderData="renderData", ref="accountNumber", :data="typeInfo")
        .footer
          b-button(type="primary", @click="saveUserType") {{renderData.save}}

    component(:is="visible.dialog", :render-data="renderData", :visible="visible", @refresh-type-list="getTypeList", :typeInfo="typeInfo")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BCheckbox from 'components/BCheckbox'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import DeleteType from './module/DeleteType.vue'
  import CopyType from './module/CopyType.vue'
  import FundSetting from './module/FundSetting.vue'
  import ChannelSetting from './module/ChannelSetting.vue'
  import { validator } from 'common/js/Utils'

  export default {
    name: 'user_type_setting',
    mixins: [componentMixin],
    data () {
      var typeSet = window.renderData.components.user_type_setting
      var renderData = Object.assign({}, typeSet, typeSet.user_type_setting_auth)
      var _this = this
      var defaultTypeInfo = {
        uuid: '',
        empty: true,
        show_on_register: false,
        login_to_url: '',
        user_info: '',
        user_group: '',
        name: '',
        mt4_account_number: ''
      }
      return {
        dataBak: null,
        isRoot: false,
        visible: {
          dialog: null,
          page: null
        },
        userTypeRules: {
          name: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              message: renderData.qianhouNoSpace,
              test (val) {
                return val.trim() === val
              },
              validator: validator.validate,
              trigger: 'blur, change'
            },
            {
              test (val) {
                var params = {
                  name: val,
                  uuid: _this.typeInfo.uuid
                }
                return service.checkTypeName(params).then(({re}) => re)
              },
              validator: validator.validate,
              message: renderData.userTypeExist,
              trigger: 'blur'
            }
          ]
        },
        typeInfoRules: {
          user_group: [
            {
              required: true,
              message: renderData.pleaseSelect,
              trigger: 'blur,change'
            }
          ],
          login_to_url: [
            {
              required: true,
              message: renderData.pleaseSelect,
              trigger: 'blur,change'
            }
          ],
          user_info: [
            {
              required: true,
              message: renderData.pleaseSelect,
              trigger: 'blur,change'
            }
          ]
        },
        defaultTypeInfo: defaultTypeInfo,
        typeInfo: Object.assign({}, defaultTypeInfo),
        old_login_to_url: '',
        old_user_info: '',
        old_user_group: '',
        old_name: '',
        data_label: {},
        typeList: [], // 用户type 列表
        pageList: [],
        groupList: [],
        profileList: [],
        initFundData: {},
        renderData: renderData,
        setting: {
          'deposit': [],
          'withdraw': [],
          'currency': []
        },
        optIdx: -1
      }
    },
    computed: {},
    methods: {
      // 去除层级，获得value为string的对象
      saveUserType () {
        var res = true
        this.$refs['type'].validate(valid => { res = res && valid })
        this.$refs['typeInfo'].validate(valid => { res = res && valid })
        this.$refs['deposit'].validate(valid => { res = res && valid })
        this.$refs['withdraw'].validate(valid => { res = res && valid })
        this.$refs['accountNumber'].validate(valid => { res = res && valid })
        if (!res) {
          return
        }
        // 获取新的label 和 老的label
        for (let i = 0; i < this.groupList.length; i++) {
          if (this.groupList[i].key === this.typeInfo.user_group) {
            this.data_label.user_group_label = this.groupList[i].val
          }
          if (this.groupList[i].key === this.old_user_group) {
            this.data_label.user_group_old_label = this.groupList[i].val
          }
        }
        for (let i = 0; i < this.profileList.length; i++) {
          if (this.profileList[i].uuid === this.typeInfo.user_info) {
            this.data_label.user_info_label = this.profileList[i].name
          }
          if (this.profileList[i].uuid === this.old_user_info) {
            this.data_label.user_info_old_label = this.profileList[i].name
          }
        }
        for (let i = 0; i < this.pageList.length; i++) {
          if (this.pageList[i].key === this.typeInfo.login_to_url) {
            this.data_label.login_to_url_label = this.pageList[i].label
          }
          if (this.pageList[i].key === this.old_login_to_url) {
            this.data_label.login_to_url_old_label = this.pageList[i].label
          }
        }
        this.data_label.old_name = this.old_name
        console.log('this.typeInfo')
        console.log(this.typeInfo)
        var dataToPost = JSON.parse(JSON.stringify(this.typeInfo))
        var dataFlat = {}
        for (var key in dataToPost) {
          dataFlat[key + '_label'] = dataToPost[key]
          if (dataToPost[key] instanceof Array) {
            dataFlat[key + '_label'] = dataToPost[key].join(' ')
          }
        }
        var params = {
          uuid: this.typeInfo.uuid,
          data: dataToPost,
          data_label: Object.assign(this.dataBak, dataFlat, this.data_label)
        }
        console.log('-----------JSON------------\n', JSON.stringify(params))
        service.saveType(params).then(resp => {
          if (resp.re === '200') {
            if (params.uuid) {
              this.getTypeList(params.uuid)
            } else {
              this.optIdx = this.typeList.length
              this.getTypeList()
            }
          }
        })
      },
      async copyType (type) {
        this.typeInfo.empty = false
        this.typeInfo.uuid = ''
        this.visible.dialog = 'copy_type'
      },
      deleteTypeItem (type, idx) {
        if (idx >= this.typeList.length - 1) {
          this.optIdx = this.typeList.length - 2
        } else {
          this.optIdx = idx
        }
        this.visible.dialog = 'delete_type'
        Object.assign(this.typeInfo, type)
      },
      async editTypeItem (type) {
        await this.getTypeInfo(type)
        this.typeInfo.empty = false
        if (type.name === 'SystemRoot') {
          this.isRoot = true
        } else {
          this.isRoot = false
        }
        this.clearValidate()
      },
      clearValidate () {
        this.$refs['typeInfo'] && this.$refs['typeInfo'].clearValidate()
        this.$refs['type'] && this.$refs['type'].clearValidate()
        this.$refs['deposit'] && this.$refs['deposit'].clearValidate()
        this.$refs['withdraw'] && this.$refs['withdraw'].clearValidate()
        this.$refs['accountNumber'] && this.$refs['accountNumber'].clearValidate()
      },
      initTypeInfo (defaultTypeInfo) {
        var res = Object.assign({}, defaultTypeInfo)
        for (var key in this.initFundData) {
          this.$set(res, key, this.initFundData[key])
        }
        return res
      },
      newUserTypeMod () {
        this.isRoot = false
        this.typeInfo = this.initTypeInfo(this.defaultTypeInfo)
        this.typeInfo.empty = false
        var dataBak = JSON.parse(JSON.stringify(this.typeInfo))
        this.dataBak = Object.keys(dataBak).reduce((res, key) => {
          if (dataBak[key] instanceof Array) {
            dataBak[key] = dataBak[key].join(' ')
          }
          res[key + '_old_label'] = dataBak[key]
          return res
        }, {})
        this.old_login_to_url = ''
        this.old_user_info = ''
        this.old_user_group = ''
        this.old_name = ''
        this.clearValidate()
      },
      getTypeList (uuid) {
        var params = {}
        var vm = this
        return service.getTypeList(params).then(({data}) => {
          vm.typeList = data
          // uuid 复制用户类型的时候，子组件回传一个uuid过来，用于定位当前数据
          if (uuid) {
            // uuid 复制用户类型的时候，子组件回传"last"，用于定位到列表最后一项
            if (uuid === 'last') {
              var len = vm.typeList.length - 1
              vm.editTypeItem(vm.typeList[len])
            } else {
              for (let i = 0; i < vm.typeList.length; i++) {
                if (vm.typeList[i].uuid === uuid) {
                  vm.editTypeItem(vm.typeList[i])
                  break
                }
              }
            }
          } else {
            if (vm.typeList.length) {
              if (vm.optIdx < 0) {
                vm.editTypeItem(vm.typeList[0])
              } else {
                vm.editTypeItem(vm.typeList[vm.optIdx])
              }
            }
          }
        })
      },
      getProfileList () {
        var params = {}
        return service.getProfileList(params).then(({data}) => {
          this.profileList = data
        })
      },
      getGroupList () {
        var params = {}
        return service.getGroupList(params).then(({data}) => {
          this.groupList = data
        })
      },
      getPageList () {
        var params = {}
        return service.getPageList(params).then(({data}) => {
          this.pageList = data
        })
      },
      getTypeInfo (type) {
        var params = type
        return service.getTypeInfo(params).then(({data}) => {
          for (var key in this.initFundData) {
            this.$set(this.typeInfo, key, this.initFundData[key])
          }
          Object.assign(this.typeInfo, data)
          var dataBak = JSON.parse(JSON.stringify(this.typeInfo))
          this.dataBak = Object.keys(dataBak).reduce((res, key) => {
            if (dataBak[key] instanceof Array) {
              dataBak[key] = dataBak[key].join(' ')
            }
            res[key + '_old_label'] = dataBak[key]
            return res
          }, {})
          this.old_login_to_url = data.login_to_url
          this.old_user_info = data.user_info
          this.old_user_group = data.user_group
          this.old_name = data.name
        })
      },
      getFundSetting () {
        return service.getFundSetting().then(res => {
          this.setting = res
          this.initFundData = ['deposit', 'withdraw'].reduce((res, typeKey) => {
            this.setting[typeKey].forEach(methodKey => {
              this.setting.currency.forEach(currencyKey => {
                if (methodKey === 'wechat') {
                  res[typeKey + '_' + methodKey + '_' + currencyKey] = []
                  return
                }
                res[typeKey + '_' + methodKey + '_' + currencyKey + '_min_amount'] = ''
                res[typeKey + '_' + methodKey + '_' + currencyKey + '_max_amount'] = ''
              })
            })
            return res
          }, {})
        })
      }
    },
    async mounted () {
      await this.getFundSetting()
      await this.getProfileList()
      await this.getGroupList()
      await this.getPageList()
      await this.getTypeList()
    },
    components: {
      'delete_type': DeleteType,
      'copy_type': CopyType,
      FundSetting,
      ChannelSetting,
      BTitle,
      BCheckbox,
      BInput,
      BSelect,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  @import '../../common/styleSheet/variable.less';

  .user_type_setting_component {
    height: 100%;
    position: relative;
    .content {
      display: flex;
      flex-grow: 1;
      .margin-other {
        margin: 10px 0;

      }
      .left {
        overflow: auto;
        width: 32%;
        padding-top: 30px;
        .type-item {
          padding-left: 12%;
          height: 40px;
          .b-button {
            margin-top: 20px;
          }
          /*line-height: 40px;*/
          cursor: pointer;
          > span {
            display: inline-block;
          }
          > span:nth-child(1) {
            width: 77%;
            text-align: left;
            margin-top: 13px;
          }
          > span.b-icon {
            width: 10%;
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        overflow: auto;
        vertical-align: top;
        flex-grow: 1;
        width: 68%;
        padding-top: 30px;
        padding-bottom: 42px;
        .footer {
          margin-top: 30px;
          padding-left: 4%;
        }
        .title {
          font-size: 16px;
          padding: 20px 1.2%;
        }
        .right-content {
          overflow: auto;
          padding-left: 4%;
          padding-right: 4%;
          .el-form-item__error {
            position: relative !important;
          }
        }
      }
    }
  }
</style>
