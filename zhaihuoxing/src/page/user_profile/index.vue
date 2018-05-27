<template lang="pug">
  .user_profile_component.theme-border-lightenD12.component
    b-title(:title="renderData.userProfile")
    .top
      .message {{renderData.userProfileInfo}}
    .bottom
      .left
        component(:is="visible.page", :renderData='renderData', :visible='visible', :profileInfo="profileInfo", :setting="setting", :auditFailReason="auditFailReason", :pageList="pageList", :disabled="disabled", :status="status", @update-status='updateStatus' v-if="isSys")
        custom-page(:renderData='renderData', :visible='visible', :profileInfo="profileInfo", :setting="setting", :auditFailReason="auditFailReason", :pageList="pageList", :disabled="disabled", :pages="pages", :status="status", @update-status='updateStatus'  v-for="page in customList", :key="page", v-if="page==visible.page", labelPosition='left')
      .right
        b-steps(direction="vertical", :active='currStep' v-if="pageList.length", :space='180')
          el-step(v-for="key in pageList", :title="(pages[key]&&pages[key].title)||key", :description="(pages[key]&&pages[key].description)||''", :key="key")

</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSteps from 'components/BSteps'
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import BasicInfo from './module/basic-info.vue'
  import CustomPage from './module/custom-page.vue'
  import complete from './module/complete.vue'
  import files from './module/files'
  import InvestorInfo from './module/investor-info.vue'

  export default {
    name: 'user_profile',
    mixins: [componentMixin],
    data () {
      var profileSet = window.renderData.components.user_profile
      var renderData = Object.assign({}, profileSet.user_profile_auth, profileSet.user_profile_default)
//      var _this = this
      return {
        pageList: [],
        status: '', // process, success, fail
        pages: {
          base_info: {
            title: renderData.userProfileBasicInfo,
            description: renderData.basicInfoText
          },
          investor_info: {
            title: renderData.userProfileJobInfo,
            description: renderData.jobInfoText
          },
          files: {
            title: renderData.userProfileFile,
            description: renderData.fileText
          },
          complete: {
            title: renderData.complete,
            description: ''
          }
        },
        auditFailReason: '',
        visible: {
          dialog: null,
          page: null
        },
        profileInfo: {
          base_info: {},
          investor_info: {},
          files: {}
        },
        setting: {
          data: {
            base_info: [],
            investor_info: [],
            custom_01: [],
            files: []
          },
          custom: {
            base_info: [],
            investor_info: []
          }
        },
        renderData: renderData
      }
    },
    methods: {
      updateStatus (status) {
        this.status = status
      },
      getProfileSetting () {
        var params = {}
        return service.getProfileSetting(params).then(res => {
          this.setting = res
          // 设置steps 上面的文案
          Object.keys(res.data).forEach(key => {
            if (!this.pages[key]) {
              this.$set(this.pages, key, {
                title: res.customMap[key],
                description: ''
              })
            }
          })

          var defaultPage = ['base_info', 'investor_info', 'files']
          // pageList 用于存放页面（base_info, investor_info....），如果profile 配置了该页面系统信息，或者自定义信息
          this.pageList = defaultPage.filter(page => {
            var data = res.data[page]
            var custom = res.custom[page]
            return (data && data.length) || (custom && custom.length)
          })
          this.pageList = this.pageList.concat(Object.keys(res.data).filter(key => !defaultPage.includes(key)))
          console.log('pageList', this.pageList)
          this.pageList.push('complete')
          this.visible.page = this.pageList[0]
          // 初始化 profileInfo, basic_info, file, investor_info
          var basicInfo = this.profileInfo.base_info
          var basicForm = this.setting.custom.base_info
          var basicFormSys = this.setting.data.base_info
          basicForm.concat(basicFormSys).forEach(item => {
            this.$set(basicInfo, item.key, '')
          })
          var investorInfo = this.profileInfo.investor_info
          var investorForm = this.setting.custom.investor_info
          var investorFormSys = this.setting.data.investor_info
          investorForm.concat(investorFormSys).forEach(item => {
            this.$set(investorInfo, item.key, '')
          })
          var fileInfo = this.profileInfo.files
          var filesForm = this.setting.custom.files
          var filesFormSys = this.setting.data.files
          filesForm.concat(filesFormSys).forEach(item => {
            this.$set(fileInfo, item.key, {url: '', name: '', status: '', remark: '', id: ''})
          })
        })
      },
      getProfileInfo () {
        var params = {}
        service.getProfileInfo(params).then(res => {
          for (var key in res) {
            if (this.profileInfo[key]) {
              Object.assign(this.profileInfo[key], res[key])
            } else {
              this.$set(this.profileInfo, key, res[key])
            }
          }
        })
      },
      getAuditResult () {
        var params = {}
        service.getAuditResult(params).then(res => {
          if (res.re === '400') {
            this.auditFailReason = this.renderData.auditFailReason + '\n' + res.data
            this.status = 'fail'
          } else if (res.re === '200') {
            this.status = 'success'
          } else if (res.re === '401') {
            this.status = 'process'
          }
        })
      }
    },
    computed: {
      disabled () {
        return this.status === 'success' || this.status === 'process'
      },
      currStep () {
        if (this.status === 'success') {
          return this.pageList.length
        } else if (this.status === 'process') {
          return this.pageList.length - 1
        }
        return this.pageList.indexOf(this.visible.page)
      },
      isSys () {
        return ['base_info', 'investor_info', 'files', 'complete'].includes(this.visible.page) || this.visible.page === null
      },
      customList () {
        return this.pageList.filter(page => !['base_info', 'investor_info', 'files', 'complete'].includes(page))
      }
    },
    async mounted () {
      await this.getAuditResult()
      await this.getProfileSetting()
      await this.getProfileInfo()
    },
    components: {
      'base_info': BasicInfo,
      'investor_info': InvestorInfo,
      CustomPage,
      complete,
      files,
      BTitle,
      BCheckbox,
      BInput,
      BSelect,
      BSteps,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  .user_profile_component {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    .top {
      margin: 30px 0;
      width: 60%;
      .message {
        line-height: 22px;
        padding-left: 2%;
      }
    }
    .bottom {
      display: flex;
      flex-grow: 1;
      .left {
        width: 60%;
      }
      .right {
        width: 33%;
        margin-left: 7%;
        .el-step__description.is-wait, .el-step__description.is-finish {
          display: none;
        }
      }
    }
  }
  .el-step.is-vertical .el-step__line {
    border-color: initial !important;
  }
  .el-step__icon.is-text {
    border-color: initial !important;
  }

</style>
