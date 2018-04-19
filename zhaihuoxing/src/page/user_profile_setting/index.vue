<template lang="pug">
  .user_profile_setting_component.theme-border-lightenD12.component
    b-title(:title="cTitle")
    .content(v-if="!visible.page")
      .operation.theme-border-lightenD12
        b-button(@click="redirect('diy_setting')") {{renderData.diyField}}
      .left
        .profile-item.theme-bg-lightenD18-hover(v-for="(item, idx) in profileList", :key="idx", :class="{'theme-bg-I': profileInfo.uuid==item.uuid}", @click="editProfileItem(item, idx)")
          span(v-ellipsis-title="") {{item.name}}
          //b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click.native="editProfileItem(item)")
          b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click.stop.native="deleteProfileItem(item, idx)")
          b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="copy", @click.stop.native="copyProfile(item)")
        .profile-item
          b-button(@click="newUserProfileMod", type="primary") {{renderData.newUserProfile}}
      .right.theme-bg-I(v-loading="loading1")
        template(v-if="!profileInfo.empty")
          .body
            el-form(ref="profileInfo", :rules="profileInfoRules", :model="profileInfo" label-width="140px", labelPosition='left')
              el-form-item.perfile-name(prop="name")
                template(slot="label")
                  span.theme-color-C.inline-label(v-text="renderData.profileName", v-ellipsis-title="")
                b-input(:model.sync="profileInfo.name", :placeholder="renderData.pleaseEnter")
              resource-item(v-for="(classItem, idx) in profileInfo.classList", :classItem="classItem", :renderData='renderData', :visible='visible', :key="idx", :profileInfo="profileInfo", @refreshInfo="getProfileInfo")
              .file.clear(v-if="renderData.user_profile_setting_file")
                .title.theme-color-darkenC15 {{renderData.userProfileFile}}
                el-row.margin-other(v-for="(file, idx) in cFileList", :key="idx")
                  b-checkbox.theme-color-darkenC15(:model.sync="file.checked") {{file.label}}
                  b-switch.switch-required(:model.sync="file.show_on_register", :width='switchWidth', @change="updateReg(idx)")
                  span.switch-required(:class="[file.show_on_register ? 'theme-color-C' : 'theme-color-lightenC32']") {{renderData.showOnRegistration}}

              template(v-if="fileStatus")
                el-row.margin-other.title.clear
                  b-checkbox.theme-color-darkenC15(:model.sync="fileStatus.checked") {{fileStatus.label}}
                el-form-item
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.option", v-ellipsis-title="")
                  b-button.tag-group(size="small" v-for="(item, idx) in fileStatus.dataSource", :key="idx")
                    span.tag-group-txt(v-ellipsis-title="") {{item.label}}
                    b-icon(iconName="delete", size="12px", @click.native='deleteFileResource(item, fileStatus)')
                  b-button.add-btn(size="small" style="border:0px;" type="primary", @click="addFileResourceMod(fileStatus)") {{renderData.add}}
          .footer
            b-button(type="primary", @click="saveUserProfile") {{renderData.save}}

    component(:is="visible.page", :renderData='renderData', :visible='visible', v-else, :profileInfo="profileInfo", @refreshList="getProfileList")

    component(:is="visible.dialog", :render-data="renderData", :visible="visible", @refreshInfo="getProfileInfo", :profileInfo="profileInfo", @refreshList="getProfileList")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import AddResource from './module/AddResource.vue'
  import ResourceItem from './module/ResourceItem.vue'
  import NewUserProfile from './module/NewUserProfile.vue'
  import DiySetting from './module/DiySetting.vue'
  import DeleteProfile from './module/DeleteProfile.vue'
  import utils from 'common/js/Utils'
  import BSwitch from 'components/BSwitch'

  export default {
    name: 'user_profile_setting',
    mixins: [componentMixin],
    data () {
      var profileSet = window.renderData.components.user_profile_setting
      var renderData = Object.assign({}, profileSet)
      for (var auth in profileSet) {
        if (auth === 'componentsName') {
          continue
        }
        Object.assign(renderData, profileSet[auth])
      }
      var _this = this
      return {
        loading1: false,
        visible: {
          dialog: null,
          page: null
        },
        dataToSave: {}, // 用户提交数据
        fileList: [], // 文件资源
        profileInfoRules: {
          name: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.qianhouNoSpace,
              trigger: 'blur, change'
            },
            {
              message: renderData.nameExist,
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  name: value,
                  uuid: _this.profileInfo.uuid
                }
                return utils.checkProfileName(params)
              },
              trigger: 'blur'
            }
          ]
        },
        profileInfo: {
          empty: true,
          name: '',
          uuid: '',
          classList: [] // 资源分类列表
        },
        optIdx: 0,
        profileList: [], // 用户profile 列表
        renderData: renderData,
        switchWidth: 45
      }
    },
    computed: {
      cFileList () {
        return this.fileList.filter(item => item.key !== 'file_status')
      },
      fileStatus () {
        console.log(this.fileList.find(item => item.key === 'file_status'))
        return this.fileList.find(item => item.key === 'file_status')
      },
      cTitle () {
        if (this.visible && this.visible.page) {
          return this.renderData.diyFieldSetting
        }
        return this.renderData.userProfileSetting
      }
    },
    methods: {
      updateReg (idx) {
        this.cFileList[idx].show_on_register = !this.cFileList[idx].show_on_register
      },
      addFileResourceMod (resource) {
        this.visible.dialog = 'add_resource'
        this.profileInfo.path = ['files', resource.key]
      },
      deleteFileResource (target, resource) {
        var params = this.profileInfo
        params.key = target.key
        params.label = target.label
        params.path = ['files', resource.key]
        service.deleteResource(params).then(({data}) => {
          for (let i = 0; i < resource.dataSource.length; i++) {
            if (target.label === resource.dataSource[i].label) {
              resource.dataSource.splice(i, 1)
            }
          }
        })
      },
      saveUserProfile () {
        var params = Object.assign({}, this.dataToSave, this.profileInfo)
        delete params['classList']
        service.saveProfile(params).then(({data}) => {
          this.getProfileList()
        })
      },
      copyProfile (profile) {
        this.visible.dialog = 'new_user_profile'
        this.profileInfo.origin = profile.uuid
        this.optIdx = this.profileList.length
      },
      deleteProfileItem (profile, idx) {
        this.profileInfo = profile
        this.optIdx = idx
        this.visible.dialog = 'delete_profile'
      },
      editProfileItem (profile, idx) {
        this.profileInfo = profile
        this.optIdx = idx
        this.getProfileInfo(this.profileInfo)
        this.loading1 = true
        setTimeout(() => {
          this.loading1 = false
        }, 1000)
      },
      newUserProfileMod () {
        this.visible.dialog = 'new_user_profile'
        this.optIdx = this.profileList.length
      },
      redirect (page) {
        this.visible.page = page
      },
      getProfileList () {
        var params = {}
        return service.getProfileList(params).then(({data}) => {
          this.profileList = data
          var locateIdx = this.optIdx
          if (this.profileList.length) {
            if (locateIdx) {
              if (locateIdx >= this.profileList.length) {
                this.editProfileItem(this.profileList[locateIdx - 1], locateIdx)
              } else if (locateIdx >= 0) {
                this.editProfileItem(this.profileList[locateIdx], locateIdx)
              }
            } else {
              this.editProfileItem(this.profileList[0], locateIdx)
            }
          }
          this.loading1 = false
        })
      },
      getProfileInfo (profile) {
        var params = profile || this.profileInfo
        service.getProfileInfo(params).then(res => {
          this.initProfileInfo(res.data, res)
          this.dataToSave = res
        })
      },
      initProfileInfo (data, res) {
        // 把后端返回的数据，组织成前端需要的格式
        var classList = []
        if (this.renderData.user_profile_setting_basic_info) {
          classList.push({
            key: 'base_info',
            title: this.renderData.userProfileBasicInfo,
            dataSource: data.base_info
          })
        }
        if (this.renderData.user_profile_setting_job_info) {
          classList.push({
            key: 'investor_info',
            title: this.renderData.userProfileJobInfo,
            dataSource: data.investor_info
          })
        }
        if (this.renderData.user_profile_setting_file) {
          this.fileList = data.files
        }
        console.log('custom')
        for (var key in res.custom) {
          var label = res.custom[key]
          classList.push({
            key: key,
            title: label,
            dataSource: data[key]
          })
        }
        this.profileInfo = Object.assign({}, this.profileInfo, {
          classList: classList,
          fileList: this.fileList,
          custom: res.custom,
          uuid: res.uuid,
          name: res.name
        })
      }
    },
    async mounted () {
      await this.getProfileList()
    },
    components: {
      'new_user_profile': NewUserProfile,
      'add_resource': AddResource,
      'diy_setting': DiySetting,
      'delete_profile': DeleteProfile,
      ResourceItem,
      BTitle,
      BCheckbox,
      BInput,
      BSelect,
      BIcon,
      BButton,
      BSwitch
    }
  }
</script>

<style lang="less">
  @import '../../common/styleSheet/variable.less';

  .user_profile_setting_component {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .content {
      /*height: 100%;*/
      flex-grow: 1;
      display: flex;
      .margin-other {
        margin: 10px 0;
      }
      .left {
        width: 32%;
        overflow: auto;
        vertical-align: top;
        .profile-item {
          cursor: pointer;
          padding-left: 12%;
          height: 40px;
          .b-button {
            margin-top: 40px;
          }
          /*line-height: 40px;*/
          > span {
            margin-top: 13px;
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
        .operation {
          position: relative;
          line-height: 40px;
          height: 40px;
          border-bottom-width: 1px;
          margin-left: 12%;
          .b-button {
            position: absolute;
            right: 10px;
          }
        }
      }
      .right {
        width: 68%;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        .add-btn{
          border: 0px!important;
          height: 32px;
          position: relative;
          /*top: -1px;*/
        }
        .body {
          padding-top: 42px;
          padding-left: 4%;
          padding-right: 4%;
          padding-bottom: 42px;
          flex-grow: 1;
          overflow: auto;
        }
        .title {
          font-size: 16px;
          padding: 20px 0;
        }
        .perfile-name {
          .el-form-item__content {
            width: 40%;
          }
        }
        .tag-group {
          margin: 1px 8px 6px 0!important;
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
      }
    }
    .info-icon {
      margin-left: 20px;
    }
    .delete-icon {
      margin-left: 5px;
    }
    .new-status-form-item {
      .b-icon {
        width: 4%;
        margin-left: 1%;
        display: inline-block;
      }
      .b-input {
        width: 40%;
      }
    }
    .footer {
      padding-left: 4%;
      margin-top: 40px;
    }
  }
  .user_profile_setting_component .content .left .operation {
    position: absolute !important;
    width: 27% !important;
    /*background-color: white !important;*/
    margin-left: 2% !important;
  }
  .user_profile_setting_component .content .left .operation .b-button {
    right: 3px !important;
  }
  .user_profile_setting_component .content .left {
    margin-bottom: 40px;
  }
  .operation {
    position: absolute;
    right: 68%;
    margin-right: 5px;
    padding: 5px 0;
  }
  .user_profile_setting_component .content .left {
    margin-top: 50px;
  }

</style>
