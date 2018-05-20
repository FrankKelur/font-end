<template lang="pug">
  .basic-info
    .title.theme-color-darkenC10.theme-bg-fadeA2.theme-border-lightenD12 {{title}}
    el-form(:model="info", ref="info", :rules="rules" label-width="140px", :labelPosition='labelPosition')
      b-alert.margin-bottom(v-if="auditFailReason", :title="renderData.auditFail", :description="auditFailReason", :closable="false")
      custom-form.custom-area(:model="info", ref="customForm", :formItemList="formItemList", :renderData="renderData", label-width="140px", :disabled="disabled")
      .footer
        b-button(@click="prev") {{renderData.previous}}
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

  export default {
    name: 'custom-page',
    data () {
      var _this = this
      // 用info 里的信息，给formItemList 初始化
      var info = _this.profileInfo[this.visible.page]
      var formItemList = _this.setting.data[this.visible.page]
      formItemList.forEach(formItem => {
        formItem.value = info[formItem.key]
      })
      return {
        info: info,
        formItemList: formItemList
      }
    },
    methods: {
      save (cb) {
        var res = true
        this.$refs['customForm'].validate((valid) => { res = res && valid })
        if (!res) {
          return
        }
        var params = {
          group: this.visible.page,
          data: this.info
        }
        service.saveProfileInfo(params).then(res => {
          cb && typeof cb === 'function' && cb()
        })
      },
      submit () {
        var res = true
        this.$refs['customForm'].validate((valid) => { res = res && valid })
        if (!res) {
          return
        }
        this.profileInfo[this.visible.page] = this.info // 把信息传入 profileInfo中用来提交
        service.submitUserProfile(this.profileInfo).then(() => {
          this.$emit('update-status', 'process')
          this.visible.page = 'complete'
        })
      },
      next () {
        this.profileInfo[this.visible.page] = this.info // 把信息传入 profileInfo中用来提交
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
    watch: {
      profileInfo: {
        handler () {
          Object.assign(this.info, this.profileInfo[this.visible.page])
        },
        deep: true
      },
      'setting.data': {
        handler () {
          this.formItemList = [...this.setting.data[this.visible.page]]
        },
        deep: true
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
      },
      pages: {
        type: Object,
        default: {}
      },
      labelPosition: {
        type: String,
        default: 'left'
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
      title () {
        var pages = this.pages || {}
        var page = pages[this.visible.page] || {}
        return page.title
      },
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
                return val.trim() === val
              },
              trigger: 'blur, change'
            })
          }
        }
        return ruleObj
      }
    },
    mounted () {
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
    .margin-bottom {
      margin-bottom: 20px;
    }
  }
</style>
