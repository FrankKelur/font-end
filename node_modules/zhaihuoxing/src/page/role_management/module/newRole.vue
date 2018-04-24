<template lang="pug">
  el-form.new-role(label-width="120px", :model="currRole", ref="editRoleForm", :rules="cRules")
    .body-container
      el-row(:gutter="80")
        el-col(:span="10")
          el-form-item( prop="role_name")
            template(slot="label")
              span.theme-color-C(v-text="renderData.roleName")
            b-input(:model.sync="currRole.role_name", :placeholder="renderData.roleName")
      el-row(:gutter="80")
        el-col(:span="10")
          el-form-item
            template(slot="label")
              span.theme-color-C(v-text="renderData.description")
            b-input(:model.sync="currRole.description", :placeholder="renderData.description")
      el-row(:gutter="80")
        el-col(:span="10")
          el-form-item(prop="from_where")
            template(slot="label")
              b-icon.tooltip-icon.theme-color-A-hover.theme-color-C.role-icon(iconName='info', :title="renderData.fromWhereDescription")
              span.theme-color-C(v-text="renderData.fromWhere")
            b-select(:model.sync="currRole.from_where", :placeholder="renderData.pleaseSelect", @change="fromWhereChange", :disabled="isEdit||isCopy", prop="from_where")
              el-option(:value="from.key", :label="from.val", :key="from.key", v-for="from in fromList")
      edit-auth-panels(:render-data="renderData", :editable="editable", ref="authPanel", :curr-role="currRole")
    .fixed-footer
      b-button(@click="toRoleManage") {{renderData.back}}
      b-button(type="primary", @click="save") {{renderData.save}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BIcon from 'components/BIcon'
  import EditAuthPanels from 'page/role_management/module/editAuthPanels'
  import utils from 'common/js/Utils'

  export default {
    name: 'new-role',
    data () {
      return {
        fromList: [],
        editable: true,
        currRole: {
          rid: this.rid,
          role_name: '',
          from_where: '',
          description: '',
          interface_auth_data: [],
          source_auth_data: {}
        },
        interfaceData: {}
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
      rid: {
        type: String
      }
    },
    computed: {
      cRules () {
        var _this = this
        var rules = {
          role_name: [
            {
              required: true,
              message: this.renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length30Limit,
              validator: utils.validator.validate,
              message: this.renderData.length30Limit,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.errorNameRule,
              trigger: 'blur'
            }, {
              message: _this.renderData.errorNameExist,
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  field: 'role_name',
                  value: value
                }
                return utils.checkUnique(params)
              },
              trigger: 'blur'
            }
          ],
          from_where: [
            {
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'blur'
            }
          ]
        }
        return rules
      },
      isEdit () {
        return this.visible.page === 'role_management_edit_auth'
      },
      isCopy () {
        return this.visible.page === 'role_management_copy_role'
      }
    },
    methods: {
      toRoleManage () {
        this.visible.page = null
      },
      fromWhereChange () {
        console.log('fromWhereChange ')
        if (this.currRole.from_where) {
          this.$refs['authPanel'].init()
        }
      },
      save () {
        console.log('this.currRole', this.currRole)
        this.$refs['editRoleForm'].validate(valid => {
          if (valid) {
            var params = Object.assign({}, this.currRole)
            params.interface_auth_data = this.$refs['authPanel'].generateParams()
            if (this.isEdit) {
              service.editRole(params)
            } else {
              service.addRole(params)
            }
          }
        })
      },
      getFromList () {
        var params = {}
        return service.getFromList(params).then(res => {
          this.fromList = res.data
        })
      },
      getRoleInfo () {
        var params = {
          'rid': this.currRole.rid
        }
        return service.getRoleInfo(params).then(res => {
          this.currRole = Object.assign(this.currRole, res)
        })
      }
    },
    async mounted () {
      await this.getFromList()
      if (this.isEdit || this.isCopy) {
        await this.getRoleInfo()
      }
    },
    components: {
      BIcon,
      BSelect,
      BInput,
      BButton,
      EditAuthPanels
    }
  }
</script>

<style lang="less">
  .new-role {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .body-container {
      flex-grow: 1;
      padding-right: 40px;
      overflow-y: auto;
    }
    .el-input {
      min-width: 300px;
    }
    .role-icon{
      position: relative;
      right: 5px;
    }
    .fixed-footer {
      background-color: white;
      padding-top: 40px;
      padding-bottom: 45px;
      padding-left: 1.2%;
    }
  }
</style>
