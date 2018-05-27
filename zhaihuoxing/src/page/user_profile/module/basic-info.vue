<template lang="pug">
  .basic-info
    .title.theme-color-darkenC10.theme-bg-fadeA2.theme-border-lightenD12 {{renderData.userProfileBasicInfo}}
    el-form(:model="basicInfo", ref="basicInfo", :rules="rules" label-width="140px" v-if="visible.page === 'base_info'", labelPosition='left')
      b-alert.margin-bottom(v-if="auditFailReason", :title="renderData.auditFail", :description="auditFailReason", :closable="false")
      el-form-item(v-if="permits.last_name", prop="last_name")
        span.inline-label(slot="label", v-ellipsis-title='') {{renderData.lastName}}
        b-input(:model.sync="basicInfo.last_name", :placeholder="renderData.lastNamePlaceholder", :disabled="disabled")
      el-form-item(v-if="permits.middle_name", prop="middle_name")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.middleName}}
        b-input(:model.sync="basicInfo.middle_name", :placeholder="renderData.middleNamePlaceholder", :disabled="disabled")
      el-form-item(v-if="permits.first_name", prop="first_name")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.firstName}}
        b-input(:model.sync="basicInfo.first_name", :placeholder="renderData.firstNamePlaceholder", :disabled="disabled")
      el-form-item(v-if="permits.birthday", prop="birthday")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.birthday}}
        b-datepicker(:model.sync="basicInfo.birthday", :placeholder="renderData.pleaseSelect", type="date", :disabled="disabled")
      el-form-item(v-if="permits.company_name", prop="company_name")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.companyName}}
        b-input(:model.sync="basicInfo.company_name", :placeholder="renderData.pleaseEnter", :disabled="disabled")
      el-form-item(v-if="permits.company_ctime", prop="company_ctime")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.registerTime}}
        b-datepicker(:model.sync="basicInfo.company_ctime", :placeholder="renderData.pleaseSelect", type="date", :disabled="disabled")
      el-form-item(v-if="permits.passport", prop="passport")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.passport}}
        b-input(:model.sync="basicInfo.passport", :placeholder="renderData.pleaseEnter", :disabled="disabled")
      el-form-item(v-if="permits.identity", prop="identity")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.idCard}}
        b-input(:model.sync="basicInfo.identity", :placeholder="renderData.pleaseEnter", :disabled="disabled")

      el-form-item(v-if="permits.phone_no", prop="phone_no")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.phoneNo}}
        b-input(:model.sync="basicInfo.phone_no", :placeholder="renderData.pleaseEnter", :disabled="disabled")
      el-form-item(v-if="permits.lang", prop="lang")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.language}}
        b-select(:model.sync="basicInfo.lang", :placeholder="renderData.pleaseSelect", :disabled="disabled")
          el-option(v-for="(lang, idx) in langList", :key="idx", :label="lang.label", :value="lang.key")
      el-form-item(v-if="permits.country", prop="country")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.nationality}}
        b-select(:model.sync="basicInfo.country", :placeholder="renderData.enterToSearch", :focusPlaceholder="renderData.pleaseSelect", :disabled="disabled", :filterable="true")
          el-option(v-for="(country, idx) in countryList", :key="idx", :label="country.label", :value="country.key")
      el-form-item(v-if="permits.company_register_country", prop="company_register_country")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.registerCountry}}
        b-select(:model.sync="basicInfo.company_register_country", :placeholder="renderData.pleaseSelect", :focusPlaceholder="renderData.pleaseSelect", :disabled="disabled", :filterable="true")
          el-option(v-for="(country, idx) in countryList", :key="idx", :label="country.label", :value="country.key")
      el-form-item(v-if="permits.state", prop="state")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.province}}
        b-input(:model.sync="basicInfo.state", :placeholder="renderData.pleaseEnter", :disabled="disabled")
      el-form-item(v-if="permits.city", prop="city")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.city}}
        b-input(:model.sync="basicInfo.city", :placeholder="renderData.pleaseEnter", :disabled="disabled")
      el-form-item(v-if="permits.address", prop="address")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.address}}
        b-input(:model.sync="basicInfo.address", :placeholder="renderData.pleaseEnter", :disabled="disabled")
      el-form-item(v-if="permits.postcode", prop="postcode")
        span.inline-label(slot="label" v-ellipsis-title='') {{renderData.zipcode}}
        b-input(:model.sync="basicInfo.postcode", :placeholder="renderData.pleaseEnter", :disabled="disabled")

      custom-form.custom-area(:model="basicInfo", ref="customForm", :formItemList="formItemList", :renderData="renderData", label-width="140px", :disabled="disabled", labelPosition='left')
      .footer
        b-button(@click="save", :disabled="disabled") {{renderData.save}}
        b-button(@click="next" type="primary" v-if="!isEnd") {{renderData.next}}
        b-button(@click="submit" type="primary", :disabled="disabled" v-else) {{renderData.submit}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BAlert from 'components/BAlert'
  import BSelect from 'components/BSelect'
  import CustomForm from '@/page/audit_process/module/CustomForm'
  import BDatepicker from 'components/BDatepicker'
  import { validator, constants } from 'common/js/Utils'
  import countries from 'common/js/countries'

  export default {
    name: 'basic-info',
    data () {
      var setting = window.renderData.broker_setting
      var langList = constants.langList.filter(item => setting.own_langs.find(elm => elm.lang_key === item.key))
      return {
        countryList: countries[window.renderData.user_setting.lang],
        langList: langList,
        formItemList: this.setting.custom.base_info,
        basicInfo: this.profileInfo.base_info
      }
    },
    methods: {
      save (cb) {
        if (!this.validate()) {
          return
        }
        var params = {
          group: 'base_info',
          data: this.basicInfo
        }
        service.saveProfileInfo(params).then(res => {
          cb && typeof cb === 'function' && cb()
        })
      },
      submit () {
        if (!this.validate()) {
          return
        }
        this.profileInfo.base_info = this.basicInfo // 把base_info信息传入 profileInfo中用来提交
        service.submitUserProfile(this.profileInfo).then(() => {
          this.$emit('update-status', 'process')
          this.visible.page = 'complete'
        })
      },
      validate () {
        var res = true
        if (!this.disabled) {
          this.$refs['basicInfo'].validate(valid => { res = res && valid })
          this.$refs['customForm'].validate(valid => { res = res && valid })
        }
        return res
      },
      next () {
        if (!this.validate()) {
          return
        }
        var currIdx = this.pageList.indexOf(this.visible.page)
        this.profileInfo.base_info = this.basicInfo // 把base_info信息传入 profileInfo中用来提交
        if (this.disabled) { // 如果当前是disabled状态，就不保存
          this.visible.page = this.pageList[currIdx + 1]
          return
        }
        this.save(() => {
          this.visible.page = this.pageList[currIdx + 1]
        })
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
      BDatepicker,
      BInput,
      BAlert,
      BButton
    },
    computed: {
      isEnd () {
        var currIdx = this.pageList.indexOf(this.visible.page)
        return currIdx === this.pageList.length - 2
      },
      permits () {
        return this.setting.data.base_info.reduce((res, item) => Object.assign(res, {
          [item.key]: {required: !!item.required}
        }), {})
      },
      rules () {
        var ruleObj = {
          last_name: [
            {
              regex: constants.length128Limit,
              validator: validator.validate,
              message: this.renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          middle_name: [
            {
              regex: constants.length128Limit,
              validator: validator.validate,
              message: this.renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          first_name: [
            {
              regex: constants.length128Limit,
              validator: validator.validate,
              message: this.renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          birthday: [],
          passport: [
            {
              validator: validator.validate,
              message: this.renderData.textLength128,
              regex: constants.text0To128Reg,
              trigger: 'blur, change'
            }
          ],
          identity: [
            {
              validator: validator.validate,
              message: this.renderData.textLength128,
              regex: constants.text0To128Reg,
              trigger: 'blur, change'
            }
          ],
          company_name: [
            {
              regex: constants.length128Limit,
              validator: validator.validate,
              message: this.renderData.textLength128,
              trigger: 'blur, change'
            }
          ],
          company_ctime: [],
          phone_no: [
            {
              regex: constants.phoneReg,
              validator: validator.validate,
              message: this.renderData.onlyNumberBracketPlus,
              trigger: 'blur, change'
            }
          ],
          lang: [],
          country: [],
          company_register_country: [],
          state: [
            {
              regex: constants.length32Limit,
              validator: validator.validate,
              message: this.renderData.textLength32,
              trigger: 'blur, change'
            }
          ],
          city: [
            {
              regex: constants.length32Limit,
              validator: validator.validate,
              message: this.renderData.textLength32,
              trigger: 'blur, change'
            }
          ],
          address: [
            {
              regex: constants.length96Limit,
              validator: validator.validate,
              message: this.renderData.textLength96,
              trigger: 'blur, change'
            }
          ],
          postcode: [
            {
              regex: constants.length16Limit,
              validator: validator.validate,
              message: this.renderData.textLength16,
              trigger: 'blur, change'
            }
          ]
        }
        for (var key in ruleObj) {
          var rules = ruleObj[key]
          if (this.permits[key] && this.permits[key].required) {
            rules.push({
              required: true,
              message: ['lang', 'company_register_country', 'company_ctime', 'country', 'birthday'].includes(key) ? this.renderData.pleaseSelect : this.renderData.pleaseEnter,
              trigger: 'blur, change'
            })
            rules.push({
              message: this.renderData.noSpace,
              validator: validator.validate,
              test (val) {
                val = '' + val
                return !val || val.trim() === val
              },
              trigger: 'blur, change'
            })
          }
        }
        return ruleObj
      }
    }
  }
</script>

<style lang="less" scoped>
  .basic-info {
    .title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      border: solid 1px;
      margin-bottom: 20px;
      padding-left: 2%;
    }
  }

  .basic-info .el-form {
    .b-input, .b-select, .b-date-picker {
      width: 100% !important;
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
