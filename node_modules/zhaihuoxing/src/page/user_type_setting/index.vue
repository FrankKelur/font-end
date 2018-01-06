<template lang="pug">
  .user_type_setting_component.theme-border-lightenD12.component
    b-title(:title="renderData.userTypeSetting")
    .content
      .left
        .type-item.theme-bg-lightenC32-hover(v-for="(item, idx) in typeList", :key="item.uuid", :class="{'theme-bg-I': typeInfo.uuid===item.uuid}", @click="editTypeItem(item)")
          span(v-ellipsis-title="") {{item.name}}
          //b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click.native="editTypeItem(item)")
          b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.native="deleteTypeItem(item, idx)")
          b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="copy", @click.native="copyType(item)")
        .type-item
          b-button(@click="newUserTypeMod", type="primary") {{renderData.newUserType}}
      .right.theme-bg-I
        .right-content(v-if="!typeInfo.empty")
          .body
            el-form(ref="typeInfo", :rules="typeInfoRules", :model="typeInfo" label-width="150px", labelPosition='left')
              el-form-item(:label="renderData.userType", prop="name")
                b-input(:model.sync="typeInfo.name", :placeholder="renderData.pleaseEnter", :disabled="isRoot")
              .title {{renderData.basicSetting}}
              el-form-item(:label="renderData.userGroup", prop="user_group")
                b-select(:model.sync="typeInfo.user_group", :placeholder="renderData.pleaseSelect", :disabled="isRoot")
                  el-option(:label="item.val" v-for="(item, idx) in groupList", :key="idx", :value="item.key")
              el-form-item(:label="renderData.userProfile", prop="user_info")
                b-select(:model.sync="typeInfo.user_info", :placeholder="renderData.pleaseSelect")
                  el-option(:label="item.name" v-for="(item, idx) in profileList", :key="idx", :value="item.uuid")
              el-form-item(:label="renderData.firstPageAfterLogin", prop="login_to_url")
                b-select(:model.sync="typeInfo.login_to_url", :placeholder="renderData.pleaseSelect")
                  el-option(:label="item.label" v-for="(item, idx) in pageList", :key="idx", :value="item.key")

          .footer
            b-button(type="primary", @click="saveUserType") {{renderData.save}}

    component(:is="visible.dialog", :render-data="renderData", :visible="visible", @refresh-type-list="getTypeList", :typeInfo="typeInfo")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import DeleteType from './module/DeleteType.vue'
  import CopyType from './module/CopyType.vue'
  import { validator } from 'common/js/Utils'

  export default {
    name: 'user_type_setting',
    mixins: [componentMixin],
    data () {
      var typeSet = window.renderData.components.user_type_setting
      var renderData = Object.assign({}, typeSet, typeSet.user_type_setting_auth)
      var _this = this
      return {
        isRoot: false,
        visible: {
          dialog: null,
          page: null
        },
        typeInfoRules: {
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
              trigger: 'blur'
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
          ],
          user_group: [
            {
              required: true,
              message: renderData.pleaseSelect,
              trigger: 'blur'
            }
          ],
          login_to_url: [
            {
              required: true,
              message: renderData.pleaseSelect,
              trigger: 'blur'
            }
          ],
          user_info: [
            {
              required: true,
              message: renderData.pleaseSelect,
              trigger: 'blur'
            }
          ]
        },
        typeInfo: {
          uuid: '',
          empty: true,
          login_to_url: '',
          user_info: '',
          user_group: '',
          name: ''
        },
        old_login_to_url: '',
        old_user_info: '',
        old_user_group: '',
        old_name: '',
        data_label: {},
        typeList: [], // 用户type 列表
        pageList: [],
        groupList: [],
        profileList: [],
        renderData: renderData,
        optIdx: -1
      }
    },
    computed: {},
    methods: {
      saveUserType () {
        this.$refs['typeInfo'].validate(valid => {
          if (!valid) {
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
          var params = {
            uuid: this.typeInfo.uuid,
            data: this.typeInfo,
            data_label: this.data_label
          }
          service.saveType(params).then(resp => {
            if (resp.re === '200') {
              this.getTypeList(resp.data.uuid)
            }
          })
        })
      },
      async copyType (type) {
        this.typeInfo.empty = false
        await this.getTypeInfo(type)
//        this.typeInfo.uuid = ''
//        this.typeInfo.name = ''
//        console.log('copyType', this.typeInfo)
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
      editTypeItem (type) {
        this.typeInfo.empty = false
        this.getTypeInfo(type)
        if (type.name === 'SystemRoot') {
          this.isRoot = true
        } else {
          this.isRoot = false
        }
      },
      newUserTypeMod () {
        this.isRoot = false
        this.typeInfo = {
          login_to_url: '',
          user_info: '',
          user_group: '',
          uuid: '',
          name: ''
        }
        this.old_login_to_url = ''
        this.old_user_info = ''
        this.old_user_group = ''
        this.old_name = ''
      },
      getTypeList (uuid) {
        var params = {}
        var vm = this
        return service.getTypeList(params).then(({data}) => {
          vm.typeList = data
          // uuid 复制用户类型的时候，子组件回传一个uuid过来，用于定位当前数据
          if (uuid) {
            for (let i = 0; i < vm.typeList.length; i++) {
              if (vm.typeList[i].uuid === uuid) {
                vm.editTypeItem(vm.typeList[i])
                break
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
          Object.assign(this.typeInfo, data)
          this.old_login_to_url = data.login_to_url
          this.old_user_info = data.user_info
          this.old_user_group = data.user_group
          this.old_name = data.name
        })
      }
    },
    async mounted () {
      await this.getProfileList()
      await this.getGroupList()
      await this.getPageList()
      await this.getTypeList()
    },
    components: {
      'delete_type': DeleteType,
      'copy_type': CopyType,
      BTitle,
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
        padding-top: 42px;
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
        /*padding-top: 40px;*/
        vertical-align: top;
        flex-grow: 1;
        width: 68%;
        padding-top: 42px;
        padding-left: 4%;
        padding-right: 4%;
        padding-bottom: 42px;
        .title {
          font-size: 16px;
          padding: 20px 0;
        }
        .el-form-item__content {
          width: 45%;
        }
      }
    }
  }
</style>
