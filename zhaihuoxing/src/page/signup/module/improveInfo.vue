<template lang="pug">
  #improve-info
    h1.theme-color-darkenC15(@click="logger") {{renderData.perfectInfo}}
    .split-line.theme-bg-D
    .form
      .on-loading(v-if="onLoading && !getResourceError")
        el-form.attention-content(v-loading="onLoading", :element-loading-text="renderData.loading", :model="form")
      .net-error(v-if="getResourceError && !onLoading")
        .attention-content
          span {{renderData.netErrorClick}}
          a.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="getImproveInfo") {{renderData.refresh}}
      .no-userinfo(v-if="!userTypeInfo.length && !onLoading && !getResourceError")
        p {{renderData.noInfoNotes}}
      el-form( v-if="userTypeInfo.length", :model="form", label-width="140px", :rules="primaryRules", ref="infoForm", label-position="left").info
        el-form-item(v-for="(resource, idx) in userTypeInfo", :prop="resource.key", :key="idx")
          span.inline-label(slot="label", v-ellipsis-title="") {{resource.label}}
          b-input(v-if="resource.type === 'input'", :model.sync="form[resource.key]", :placeholder="resource.placeholder || renderData.pleaseEnter")
          .career-select(v-if="resource.key === 'career_field'")
            b-select(:model.sync="careerGroup", :placeholder="renderData.pleaseSelect", valueKey="key")
              el-option(v-for="(opt, idx) in resource.dataSource", :key="idx", :label="opt.label", :value="opt")
            b-select(:model.sync="form[resource.key]", :placeholder="renderData.pleaseSelect")
              el-option(v-for="(opt, idx) in careerGroup.dataSource", :key="idx", :label="opt.label", :value="opt.key")
          .other-select(v-else)
            b-select(v-if="resource.type==='select' && resource.key!=='country' && resource.key !== 'company_register_country'", :model.sync="form[resource.key]", :placeholder="resource.placeholder || renderData.pleaseSelect")
              el-option(v-for="(opt, idx) in resource.dataSource", :label="opt.label", :key="idx", :value="opt.key")
            b-select(v-if="resource.type === 'select' && (resource.key ==='country' || resource.key === 'company_register_country')", :model.sync="form[resource.key]", :placeholder="countryPlaceholder", filterable, @click.native="countryPlaceholder = renderData.enterToSearch")
              el-option(v-for="(opt, idx) in countryList", :label="opt.label", :key="idx", :value="opt.key")
            b-select(v-if="resource.type === 'multiple-select'", :model.sync="form[resource.key]", :multiple="true", :placeholder="resource.placeholder || renderData.pleaseSelect")
              el-option(v-for="(opt, idx) in resource.dataSource", :label="opt.label", :key="idx", :value="opt.key")
          b-upload(v-if="resource.type === 'upload'", action="/upload", v-model="form[resource.key]", :uploadFileConfig="uploadFileConfig", @fileTypeNotRight="fileTypeNotRight")
            i.el-icon-upload
            .el-upload__text
              | {{renderData.dragFile}}
              em {{renderData.clickUpload}}
            .el-upload__tip(slot="tip") {{renderData.formatRestrictionsWide}}
          b-input(v-if="resource.type === 'textarea' || resource.type === 'text'", :model.sync="form[resource.key]", :rows="2", :placeholder="resource.placeholder || renderData.pleaseEnter")
          b-date-picker(v-if="resource.type === 'datetimerange' && resource.key !== 'birthday' && resource.key !== 'company_ctime'", :model.sync="form[resource.key]", :has-interval="resource.hasInterval", :placeholder="resource.placeholder || renderData.pleaseSelect")
          b-date-picker(v-if="resource.type === 'datetimerange' && (resource.key === 'birthday' || resource.key === 'company_ctime')", :model.sync="form[resource.key]", type="date", :placeholder="renderData.pleaseSelect")

      el-form(v-if="!onLoading && !getResourceError", :model="form", label-width="140px", :rules="rules", ref="agreeForm", label-position="left").agree-form
        el-form-item.agreement(v-if="clauseFiles.length", prop="agree")
          b-checkbox(:model.sync="form.agree")
            span {{renderData.readAgree}}
            a.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(v-for="(file, idx) in clauseFiles", :href="file.file.url", target="_blank", :key="idx") {{file.label}}
              span(v-if="idx < clauseFiles.length-1") {{renderData.comma}}
    .button-box
      b-button(@click="prev").pre-btn {{renderData.back}}
      b-button(v-if="clauseFiles.length === 0", type="primary", @click="toThird", :disabled="getResourceError || onLoading").next-btn
        span {{renderData.next}}
      b-button(v-if="clauseFiles.length", type="primary", @click="toThird", :disabled="getResourceError || onLoading || !form.agree").next-btn
        span {{renderData.next}}
    .to-login
      span {{renderData.haveUser}}
      a.theme-color-A.theme-color-lightenA10-hover.theme-color-darkenA10-active.pointer(@click="toSignin") {{renderData.login}}
</template>

<script>
  let renderData = window.renderData.components.signup.signup_auth
  import Vue from 'vue'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import BCheckbox from 'components/BCheckbox'
  import BFormItem from 'components/BFormItem'
  import BDatePicker from 'components/BDatepicker'
  import BUpload from 'components/BUpload'
  import Utils from 'common/js/Utils'
  import countries from 'common/js/countries'
  import service from '../service'

  export default {
    name: 'improve-info',
    data () {
      return {
        onLoading: false,
        getResourceError: false,
        userTypeInfo: [],
        clauseFiles: [],
        renderData: renderData,
        careerGroup: {
          key: '',
          dataSource: []
        },
        rules: {
          agree: [
            {
              required: true,
              message: renderData.required,
              trigger: 'blur'
            }
          ]
        },
        primaryRules: {
          last_name: [
            {
              regex: Utils.constants.length128Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          middle_name: [
            {
              regex: Utils.constants.length128Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          first_name: [
            {
              regex: Utils.constants.length128Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          birthday: [],
          passport: [
            {
              regex: Utils.constants.length128Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          identity: [
            {
              regex: Utils.constants.length128Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          company_name: [
            {
              regex: Utils.constants.length128Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          company_ctime: [],
          phone_no: [
            {
              regex: Utils.constants.phoneReg,
              validator: Utils.validator.validate,
              message: renderData.onlyNumberBracketPlus,
              trigger: 'blur, change'
            }
          ],
          lang: [],
          country: [],
          company_register_country: [],
          state: [
            {
              regex: Utils.constants.length32Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength32,
              trigger: 'blur, change'
            }
          ],
          city: [
            {
              regex: Utils.constants.length32Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength32,
              trigger: 'blur, change'
            }
          ],
          address: [
            {
              regex: Utils.constants.length96Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength96,
              trigger: 'blur, change'
            }
          ],
          postcode: [
            {
              regex: Utils.constants.length16Limit,
              validator: Utils.validator.validate,
              message: renderData.textLength16,
              trigger: 'blur, change'
            }
          ]
        },
        uploadFileConfig: {
          type: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg'],
          maxSize: 20000000 // 20M
        },
        countryList: countries[window.renderData.user_setting.lang],
        countryPlaceholder: renderData.pleaseSelect
      }
    },
    computed: {
    },
    props: {
      visible: {
        type: Object,
        required: true
      },
      form: {
        type: Object,
        required: true
      },
      userType: {
        required: true,
        type: String
      },
      forThree: {
        required: true,
        type: Object
      }
    },
    methods: {
      prev () {
        this.userTypeInfo = []
        this.visible.page = 'signup'
      },
      toSignin () {
        var params = {
          component_name: 'signin'
        }
        Utils.getComponentUrl(params).then(res => {
          if (res.page_url) {
            document.location.pathname = res.page_url
          }
        })
      },
      logger () {
        console.log('logger', this.form, this.form.user_type)
      },
      toThird () {
        if (this.userTypeInfo.length) {
          var formValid = Boolean
          this.$refs['infoForm'].validate(valid => { formValid = formValid && valid })
          this.$refs['agreeForm'].validate(valid => { formValid = formValid && valid })
          if (formValid) {
            this.visible.page = 'make_fund'
            console.log('form2', this.form)
          }
        } else {
          this.visible.page = 'make_fund'
          console.log('form2', this.form)
        }
      },
      getImproveInfo () {
        var params = {
          user_type: this.userType
        }
        this.userTypeInfo = []
        this.onLoading = true
        this.getResourceError = false
        service.getImproveInfo(params).then(({re, data}) => {
          this.userTypeInfo = []
          this.onLoading = false
          if (re === '200') {
            var infoKeys = Object.keys(data)
            infoKeys.forEach(key => {
              if (data[key].length) {
                data[key].forEach(item => {
                  item.originKey = key
                  if (item.type === 'clause') {
                    this.clauseFiles.push(item)
                  } else {
                    if (item.system) {
                      if (key === 'base_info' && (item.key === 'country' || item.key === 'company_register_country')) {
                        item.type = 'select'
                      }
                      if (key === 'base_info' && item.key === 'lang') {
                        item.type = 'select'
                        var langList = window.renderData.broker_setting.own_langs
                        item.dataSource = []
                        langList.forEach(lang => {
                          var tmpLang = {
                            key: lang.lang_key,
                            label: lang.name
                          }
                          item.dataSource.push(tmpLang)
                        })
                      }
                      if (key === 'base_info' && (item.key === 'birthday' || item.key === 'company_ctime')) {
                        item.type = 'datetimerange'
                      }
                    }
                    if (this.primaryRules[item.key] && this.primaryRules[item.key].length) {
                    } else {
                      this.primaryRules[item.key] = []
                    }
                    if (item.required) {
                      var tmpRule = {
                        required: true,
                        message: this.renderData.required,
                        trigger: 'blur'
                      }
                      if (item.type === 'multiple-select' || item.type === 'select') {
                        tmpRule.trigger = 'change, blur'
                      }
                      this.primaryRules[item.key].push(tmpRule)
                    }
                    if (item.rules && item.rules.length > 0) {
                      item.rules.forEach(ruleObj => {
                        if (ruleObj === 'longText' || ruleObj === 'number') {
                          var ruleText = ruleObj + 'Rule'
                          var tmpRule = {
                            regex: Utils.constants[ruleText],
                            validator: Utils.validator.validate,
                            message: this.renderData[ruleText],
                            trigger: 'blur'
                          }
                          this.primaryRules[item.key].push(tmpRule)
                        }
                      })
                    }
                    this.userTypeInfo.push(item)
                    if (item.type === 'upload') {
                      this.form[item.key] = this.form[item.key] || {name: '', url: ''}
                    } else {
                      this.form[item.key] = this.form[item.key] || ''
                    }
                  }
                })
              }
            })
            this.forThree.userTypeInfo = this.userTypeInfo
            this.forThree.clauseFiles = this.clauseFiles
            this.forThree.originKeys = infoKeys
            console.log('usertypeinfo', this.userTypeInfo)
            console.log('clause files', this.clauseFiles)
          } else {
            this.getResourceError = true
          }
        })
      },
      userTypeChange () {
        this.formFieldMap[this.form.user_type].fields.forEach(item => {
          Vue.set(this.form, item.field, '')
        })
      },
      fileTypeNotRight () {
        this.$message.error('文件不符合111规范')
      }
    },
    async mounted () {
      await this.getImproveInfo()
      console.log('mounted finished', this.formFieldMap)
    },
    components: {
      BDatePicker,
      BButton,
      BSelect,
      BInput,
      BFormItem,
      BCheckbox,
      BUpload
    }
  }
</script>

<style lang="less">
  #improve-info {
    max-height: 70%;
    h1 {
      text-align: center;
      font-size: 36px;
    }
    .el-upload-dragger, .el-upload {
      width: 100%!important;
    }
    .split-line {
      height: 1px;
      width: 100%;
      margin-top: 30px;
    }
    .form {
      margin-top: 20px;
      max-height: 65%;
      min-height: 200px;
      overflow-x: hidden;
      overflow-y: auto;
      .el-form-item {
        margin-bottom: 15px;
      }
      .vcode-input-box {
        .vcode-input {
          width: 72%;
        }
        .vcode-img {
          margin-left: 3%;
          width: 25%;
          height: 40px;
          vertical-align: top;
          border-radius: 4px;
        }
      }
      .change-vcode-box {
        margin-bottom: 10px;
        span {
          float: right;
        }
      }
      .career-select .b-select {
        width: 50% !important;
      }
      .career-select .b-select:first-child {
        padding-right: 15px;
      }
    }
    .el-date-editor {
      width: 100%;
    }
    .attention-content {
      width: 100%;
      height: 100px;
      text-align: center;
    }
    .button-box {
      padding-top: 30px;
      padding-left: 140px;
    }
    .to-login {
      padding-left: 140px;
      padding-top: 15px;
    }
  }
</style>
