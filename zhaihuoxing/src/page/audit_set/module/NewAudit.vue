<template lang="pug">
  b-dialog.new-audit-module(:show='true', :title="cTitle", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="140px", :model="auditInfo", ref="auditInfo", :rules="rules", labelPosition='left')
      el-form-item(prop="label")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.auditName", v-ellipsis-title="")
        b-input(:placeholder="renderData.pleaseInput", :model.sync="auditInfo.label")
      el-form-item.unique-name(prop="name")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.uniqueName", v-ellipsis-title="")
        b-input(:placeholder="renderData.pleaseInput", :model.sync="auditInfo.name")
        el-tooltip(class="item" effect="dark", :content="renderData.systemKey" placement="top")
          b-icon.theme-color-A-hover.theme-color-lightenD10(iconName='info')
      el-form-item(prop="description.label")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.description", v-ellipsis-title="")
        b-input(:placeholder="renderData.pleaseInput", :model.sync="auditInfo.description.label")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="addAudit", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import { validator, constants } from 'common/js/Utils'

  export default {
    name: 'new-audit',
    data () {
      var _this = this
      return {
        auditInfo: {
          'name': _this.currRow.name,
          'uuid': _this.currRow.uuid,
          'label': _this.currRow.label,
          'description': {'key': '', 'label': _this.currRow.description}
        },
        rules: {
          label: [
            {
              required: true,
              trigger: 'blur',
              message: _this.renderData.pleaseInput
            },
            {
              trigger: 'blur',
              regex: constants.text0To25Reg,
              validator: validator.validate,
              message: _this.renderData.auditNameErrorRule
            },
            {
              trigger: 'blur',
              test (val) {
                return val.trim() === val
              },
              validator: validator.validate,
              message: _this.renderData.noAllowSpace
            }
          ],
          name: [
            {required: true, trigger: 'blur', message: _this.renderData.pleaseInput},
            {
              trigger: 'blur',
              test (val) {
                var params = {name: val, uuid: _this.auditInfo.uuid}
                return service.checkNameUnique(params).then(res => res.re === 1)
              },
              validator: validator.validate,
              message: _this.renderData.uniqueNameExist
            },
            {
              trigger: 'blur',
              regex: constants.variable0To128,
              validator: validator.validate,
              message: _this.renderData.uniqueNameErrorRule
            },
            {
              trigger: 'blur',
              test (val) { return val.trim() === val },
              validator: validator.validate,
              message: _this.renderData.noAllowSpace
            }
          ],
          'description.label': [
            {
              trigger: 'blur',
              regex: constants.text0To128Reg,
              validator: validator.validate,
              message: _this.renderData.textLength128
            },
            {
              trigger: 'blur',
              test (val) {
                console.log(val)
                return val.trim() === val
              },
              validator: validator.validate,
              message: _this.renderData.noAllowSpace
            }
          ]
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object
      }
    },
    methods: {
      addAudit () {
        this.$refs['auditInfo'].validate(valid => {
          if (valid) {
            var params = this.auditInfo
            if (this.auditInfo.uuid) {
              service.editAudit(params).then(res => {
                if (res.re === '200') {
                  this.visible.dialog = null
                }
              })
            } else {
              service.addAudit(params).then(res => {
                if (res.re === '200') {
                  this.visible.dialog = null
                }
              })
            }
          }
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
    },
    computed: {
      cTitle () {
        if (this.auditInfo && this.auditInfo.uuid) {
          return this.renderData.auditSetAuditInfo
        }
        return this.renderData.auditSetAddNewAudit
      }
    },
    components: {
      BDialog,
      BInput,
      BIcon,
      BButton
    }
  }
</script>

<style lang="less">
  .new-audit-module {
    .unique-name {
      .b-input {
        width: 90%;
      }
      .b-icon {
        margin-left: 5px;
      }
    }
  }
</style>
