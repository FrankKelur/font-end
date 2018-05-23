<template lang="pug">
  #basic_setting.basic_setting.component
    b-title(:title="renderData.basicSetting")
    .box-content
      el-form(label-width="140px" label-position='left' ref="form", :model="form", :rules="rules")
        el-form-item(prop="companyName")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.companyName", v-ellipsis-title="")
          b-input(:model.sync="form.companyName", :placeholder="renderData.pleaseEnter", width="50%")
        el-form-item(prop="language")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.language", v-ellipsis-title="")
          b-select(:model.sync="form.language",:placeholder="renderData.pleaseSelect")
            el-option(v-for="(item3, idx) in langlist", :key="idx", :label="item3.label", :value="item3.key")
        el-form-item(prop="domain")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.domain", v-ellipsis-title="")
          b-input(:model.sync="form.domain", :placeholder="renderData.pleaseEnter", :disabled="true")
        el-form-item(prop="timeZone")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.timeZone", v-ellipsis-title="")
          b-select(:model.sync="form.timeZone",:placeholder="renderData.pleaseSelect")
            el-option(v-for="(item1, idx) in timeList", :key="idx", :label="item1.label", :value="item1.key")
        el-form-item(prop="contact")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.contact", v-ellipsis-title="")
          b-input(:model.sync="form.contact", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="registerLinkTimeout")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.registerLinkTimeout", v-ellipsis-title="")
          el-input(v-model="form.registerLinkTimeout", :placeholder="renderData.pleaseEnter")
            template(slot="append") {{renderData.min}}
        el-form-item(prop="contactNo")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.contactNo", v-ellipsis-title="")
          b-input(:model.sync="form.contactNo", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="PWDLinkTimeout", :title="renderData.PwdLinkTimeout")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.PwdLinkTimeout", v-ellipsis-title="")
          el-input(v-model="form.PWDLinkTimeout", :placeholder="renderData.pleaseEnter")
            template(slot="append") {{renderData.min}}
        el-form-item(prop="country")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.country", v-ellipsis-title="")
          b-select(:model.sync="form.country",:placeholder="renderData.pleaseSelect" filterable)
            el-option(v-for="(item, idx) in typeList", :key="idx", :label="item.label", :value="item.key")
        el-form-item(prop="loginTimeout")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.loginTimeout", v-ellipsis-title="")
          el-input(v-model="form.loginTimeout", :placeholder="renderData.pleaseEnter")
            template(slot="append") {{renderData.min}}
        el-form-item
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.province", v-ellipsis-title="")
          b-input(:model.sync="form.province", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="logoDisplay" v-if="basic.basic_setting_logo")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.logoDisplay", v-ellipsis-title="")
          el-checkbox.theme-color-darkenC15(v-model="checked1") {{renderData.headerBeforeLogin}}
          el-checkbox.theme-color-darkenC15(v-model="checked2") {{renderData.headerAfterLogin}}
        el-form-item(prop="city")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.city", v-ellipsis-title="")
          b-input(:model.sync="form.city", :placeholder="renderData.pleaseEnter")
        el-form-item(v-if="basic.basic_setting_contact")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.contactDisplay", v-ellipsis-title="")
          el-checkbox.theme-color-darkenC15(v-model="checked3") {{renderData.headerBeforeLogin}}
          el-checkbox.theme-color-darkenC15(v-model="checked4") {{renderData.headerAfterLogin}}
        el-form-item(prop="address")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.address", v-ellipsis-title="")
          b-input(:model.sync="form.address", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="messageCenterLink" v-if="basic.basic_setting_message")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.messageCenterLink", v-ellipsis-title="")
          b-select(:model.sync="form.messageCenterLink",:placeholder="renderData.pleaseSelect")
            el-option(v-for="(item2, idx) in pageList", :key="idx", :label="item2.label", :value="item2.key")
        el-form-item(prop="zipcode")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.zipcode", v-ellipsis-title="")
          b-input(:model.sync="form.zipcode", :placeholder="renderData.pleaseEnter")
        el-form-item(prop="logoutLink" v-if="basic.basic_setting_logout")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.logoutLink", v-ellipsis-title="")
          b-select(:model.sync="form.logoutLink",:placeholder="renderData.pleaseSelect")
            el-option(v-for="(item3, idx) in logoutPageList", :key="idx", :label="item3.title", :value="item3.url")
        el-form-item(prop="dateFormat")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.dateFormat", v-ellipsis-title="")
          b-select(:model.sync="form.dateFormat",:placeholder="renderData.pleaseSelect")
            el-option(v-for="(item1, idx) in timetypeList", :key="idx", :label="item1.label", :value="item1.key")
        el-form-item(prop="indexLink")
          template(slot="label")
            span.theme-color-C.inline-label(v-text="renderData.homepageLink", v-ellipsis-title="")
          b-input(:model.sync="form.indexLink", :placeholder="renderData.pleaseEnter")
    .footer
      b-button(type="primary", @click="save") {{renderData.save}}
</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import service from './service'
  import BCheckbox from 'components/BCheckbox'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import ElCol from 'element-ui/packages/col/src/col'
  import countries from 'common/js/countries'
  import utils from 'common/js/Utils'

  export default {
    mixins: [componentMixin],
    name: 'basic_setting',
    data () {
      var basic = window.renderData.components.basic_setting
      var renderData = Object.assign({}, basic.basic_setting_auth, basic.basic_setting_logout, basic.basic_setting_message, basic.basic_setting_contact, basic.basic_setting_logo, basic.basic_setting_default)
      return {
        basic: basic,
        renderData: renderData,
        typeList: countries[window.renderData.user_setting.lang],
        pageList: [],
        langlist: utils.constants.langList,
        timeList: [],
        logoutPageList: [],
        form: {
          companyName: '',
          domain: '',
          contact: '',
          registerLinkTimeout: '',
          contactNo: '',
          PWDLinkTimeout: '',
          loginTimeout: '',
          province: '',
          city: '',
          address: '',
          zipcode: '',
          indexLink: ''
        },
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        rules: {
          companyName: [
            { required: true, message: renderData.pleaseEnterCompanyName, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.startEndNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              message: renderData.companyNameExist,
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  companyName: value
                }
                return service.checkUnique(params)
              },
              trigger: 'blur'
            }
          ],
          contact: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.startEndNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          contactNo: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.startEndNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              regex: utils.constants.phoneReg,
              message: renderData.pleaseEnterRightNo,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          province: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.startEndNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          city: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.startEndNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          zipcode: [
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: renderData.startEndNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              regex: utils.constants.variable0To128,
              message: renderData.pleaseEnterRightZipcode,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          language: [
            { required: true, message: renderData.pleaseSelectUnionPayType, trigger: 'blur' }
          ],
          domain: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          timeZone: [
            { required: true, message: renderData.pleaseEnter, trigger: 'blur' }
          ],
          registerLinkTimeout: [
            { required: true, message: renderData.pleaseEnterRegisterLinkTimeout, trigger: 'blur' },
            {
              regex: utils.constants.mustNumber,
              message: renderData.onlyNumber,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          PWDLinkTimeout: [
            { required: true, message: renderData.pleaseEnterPwdLinkTimeout, trigger: 'blur' },
            {
              regex: utils.constants.mustNumber,
              message: renderData.onlyNumber,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          loginTimeout: [
            { required: true, message: renderData.pleaseEnterLoginTimeout, trigger: 'blur' },
            {
              regex: utils.constants.mustNumber,
              message: renderData.onlyNumber,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          logoutLink: [
            { required: true, message: renderData.pleaseSelectLogoutLink, trigger: 'blur' }
          ],
          dateFormat: [
            { required: true, message: renderData.pleaseSelectDataFormat, trigger: 'blur' }
          ],
          indexLink: [
            { required: true, message: renderData.pleaseEnterHomepageLink, trigger: 'blur' },
            {
              regex: utils.constants.noSpace,
              message: renderData.noSpace,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          messageCenterLink: [
            { required: true, message: renderData.pleaseSelectMessageCenterLink, trigger: 'blur' }
          ]
        },
        timetypeList: [
          {
            key: '1',
            label: 'YY-MM-DD'
          },
          {
            key: '2',
            label: 'YY/MM/DD'
          }
        ]
      }
    },
    methods: {
      getPageList () {
        var params = {}
        return service.getPageList(params).then(({data}) => {
          this.pageList = data
        })
      },
      getlogoutPageList () {
        var params = {}
        return service.getlogoutPageList(params).then(({data}) => {
          this.logoutPageList = data
        })
      },
      getTimeList () {
        var params = {}
        return service.getTimeList(params).then(({data}) => {
          this.timeList = data
        })
      },
      getBasicInfo () {
        var params = {}
        return service.getBasicInfo(params).then(({data}) => {
          this.form = data
          this.checked1 = data.logoDisplay.headerBeforeLogin
          this.checked2 = data.logoDisplay.headerAfterLogin
          this.checked3 = data.contactDisplay.headerBeforeLogin
          this.checked4 = data.contactDisplay.headerAfterLogin
        })
      },
      save () {
        this.form.logoDisplay.headerBeforeLogin = this.checked1
        this.form.logoDisplay.headerAfterLogin = this.checked2
        this.form.contactDisplay.headerBeforeLogin = this.checked3
        this.form.contactDisplay.headerAfterLogin = this.checked4
        let pamars = this.form
        this.$refs['form'].validate((valid) => {
          if (valid) {
            return service.saveData(pamars)
          } else {
            return false
          }
        })
      }
    },
    async mounted () {
      this.getPageList()
      this.getTimeList()
      this.getBasicInfo()
      this.getlogoutPageList()
    },
    components: {
      ElCol,
      BSelect,
      BInput,
      service,
      BTitle,
      BCheckbox,
      BButton
    }
  }
</script>

<style lang="less">
  #basic_setting{
    .box-content{
      margin-left: 1.2%;
    }
    .el-form-item{
      width:50%;
      display: inline-block;
      .el-form-item__label{
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .el-input{
        width: 60%;
      }
      .el-select{
        .el-input{
          width: 100%;
        }
        width: 60%;
      }
      .el-checkbox{
        margin-top: 10px;
        margin-left: 0px!important;
        margin-right: 30px!important;
      }
    }
    .footer{
      margin-top: 20px;
      margin-bottom: 45px;
    }
  }
  .el-popper{
    min-width:18%!important;
    max-width:20%!important;
  }
</style>
