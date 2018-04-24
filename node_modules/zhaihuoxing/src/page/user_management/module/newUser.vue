<template lang="pug">
  el-form.basic-info-newUser.amt-more-left-in(:model='newUser', ref='createForm', :rules='createForm.rules', label-width="130px")
    el-row(:gutter="40")
      el-col(:span="10")
        el-form-item(prop="user_name")
          template(slot="label")
            span.theme-color-C(v-text="renderData.userName")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="newUser.user_name")
        el-form-item(prop="password", :required="true")
          template(slot="label")
            span.theme-color-C(v-text="renderData.password")
          b-input(type='password', :placeholder="renderData.pleaseEnter", :model.sync="newUser.password")
        el-form-item(prop="confirmPassword", :required="true")
          template(slot="label")
            span.theme-color-C(v-text="renderData.confirmPassword")
          b-input(type='password', :placeholder="renderData.pleaseEnter", :model.sync="newUser.confirmPassword")
      el-col(:span="10")
        el-form-item(prop="email")
          template(slot="label")
            span.theme-color-C(v-text="renderData.email")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="newUser.email")
        el-form-item(prop="user_type")
          template(slot="label")
            span.theme-color-C(v-text="renderData.userType")
          b-select(:placeholder="renderData.pleaseSelect", :model.sync="newUser.user_type")
            el-option(v-for="type in createForm.userTypeList", :key="type.key", :value="type.key", :label="type.val")

    el-row(:gutter="40")
      el-col(:span="10")
        el-form-item(label-width="130px", prop="tempGroup")
          template(slot="label")
            span.theme-color-C(v-text="renderData.userGroup")
          b-input(v-show="inputShow", :model.sync="newUser.tempGroup")
          span.blank1(v-if="blank1") 无
          el-row.addGroup1(:gutter="10")
            el-col(:span="7" v-for="group in newUser.groups", :key="group.group_name")
              b-button(size="small")
                span.group-item(v-ellipsis-title="") {{group.group_name}}
                b-icon.group-item-icon.theme-color-C.theme-color-G-hover(iconName="message_failure", @click.native='deleteGroup(group, newUser.groups)')
              //.group-item.el-button
                span.theme-color-A.ellipsis-title(v-text='group.group_name', :title='group.group_name')
                b-icon.theme-color-A.delete-icon(@click="deleteGroup(group, newUser.groups)", iconName="delete")
        el-form-item(label-width="137px")
          b-button(type="primary", @click='addGroupModal') {{renderData.add}}
    .footer
      b-button(@click="toList") {{renderData.back}}
      b-button(type="primary", @click="saveNewUser") {{renderData.save}}

    b-dialog.add-group(:show.sync='dialogVisible', width="38%", :title="renderData.addToGroup", :show-close="true", :before-close="beforeClose")
      el-form(label-width="80px", :model="createForm", :rules="rules", ref="editGroupForm")
        el-form-item(:label='renderData.userGroup', prop="newGroupId")
          b-select(:model.sync="createForm.newGroupId", :placeholder="renderData.pleaseSelect")
            el-option(v-for="group in notSelectedGroups", :key="group.gid", :value="group.gid", :label="group.group_name",style={  width: '100%' })
              span(v-ellipsis-title='',v-text='group.group_name',style={ display:'inline-block', width: '100%' })
      template(slot="footer")
        b-button(@click="hideModal") {{renderData.cancel}}
        b-button(@click="addGroup", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import utils from 'common/js/Utils'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BTable from 'components/BTable'
  import BDialog from 'components/BDialog'

  export default {
    name: 'new-user',
    data () {
      var _this = this
      return {
        inputShow: false,
        blank1: true,
        tableData: [],
        dialogVisible: false,
        newUser: {
          password: '',
          groups: [],
          tempGroup: '',
          email: '',
          confirmPassword: '',
          user_type: '',
          user_name: '',
          userGroup: ''
        },
        rules: {
          newGroupId: [
            {
              required: true,
              message: _this.renderData.pleaseSelect,
              trigger: 'blur'
            }
          ]
        },
        createForm: {
          allGroups: [],
          newGroupId: '',
          confirmpasswordType: '',
          passwordType: 'password',
          userTypeList: [],
          rules: {
            user_name: [{
              required: true,
              message: this.renderData.pleaseEnter,
              trigger: 'blur'
            }, {
              regex: utils.constants.uidReg,
              message: _this.renderData.errorNameRule,
              validator: utils.validator.validate,
              trigger: 'blur'
            }, {
              message: _this.renderData.errorNameExist,
              validator: utils.validator.validate,
              test: function (value) {
                var params = {
                  field: 'user_name',
                  value: value
                }
                return utils.checkUnique(params)
              },
              trigger: 'blur'
            }],
            password: [{
              required: true,
              message: _this.renderData.pleaseEnter,
              trigger: ['blur', 'change']
            }, {
              regex: '',
              message: '',
              validator: utils.validator.validate,
              trigger: ['blur', 'change']
            }],
//            tempGroup: [{
//              required: true,
//              message: _this.renderData.pleaseEnter,
//              trigger: 'blur'
//            }],
            email: [{
              required: true,
              message: _this.renderData.pleaseEnter,
              trigger: 'blur'
            }, {
              regex: utils.constants.emailReg,
              message: _this.renderData.errorEmailRule,
              validator: utils.validator.validate,
              trigger: 'blur'
            }, {
              message: _this.renderData.errorEmailExist,
              validator: utils.validator.validate,
              test: function (value) {
                console.log('user_name', _this.newUser.user_name)
                var params = {
                  field: 'email',
                  value: value
                }
                return utils.checkUnique(params)
              },
              trigger: 'blur'
            }],
            confirmPassword: [{
              required: true,
              message: _this.renderData.pleaseEnter,
              trigger: ['blur', 'change']
            }, {
              test: function (value) {
                return value === _this.newUser.password
              },
              validator: utils.validator.validate,
              message: _this.renderData.confirmPasswordErrorRule,
              trigger: ['blur', 'change']
            }, {
              regex: '',
              message: '',
              validator: utils.validator.validate,
              trigger: ['blur', 'change']
            }],
            user_type: [{
              required: true,
              trigger: 'change'
            }]
          }
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
      }
    },
    computed: {
      notSelectedGroups () {
        var list = this.createForm.allGroups
        list.forEach(item => {
          item.gid = item.key
          item.group_name = item.val
        })
        console.log('list', list)
        return list.filter(group => {
          return !this.newUser.groups.find(elem => {
            return elem.gid === group.gid
          })
        })
      }
    },
    methods: {
      getPwdExp () {
        var params = {}
        var vm = this
        return service.getPwdExp(params).then(({data}) => {
          console.log('接口数据')
          console.log(data)
          for (var dataKey in data.biaodanguize) {
            vm.createForm.rules.password[1].regex = new RegExp(data.biaodanguize[dataKey].slice(1, data.biaodanguize[dataKey].length - 1))
            console.log('表单使用的规则')
            console.log(vm.createForm.rules.password[1].regex)
            for (var key in vm.renderData.user_management_new_user) {
              if (dataKey === key) {
                vm.createForm.rules.password[1].message = vm.renderData.user_management_new_user[key]
                console.log('该规则对应的错误提示')
                console.log(vm.createForm.rules.password[1].message)
                break
              }
            }
          }
        })
      },
      getUserTypeSelect () {
        var params = {}
        return service.getUserTypeSelect(params).then(({data}) => {
          this.createForm.userTypeList = data
        })
      },
      toList () {
        this.visible.page = null
      },
      addGroup () {
        console.log('addGroup')
        this.$refs['editGroupForm'].validate(valid => {
          if (valid) {
            var group = this.createForm.allGroups.find(item => {
              return item.gid === this.createForm.newGroupId
            })
            this.newUser.groups.push(group)
            this.hideModal()
            this.createForm.newGroupId = ''
          }
        })
        this.blank1 = false
      },
      hideModal () {
        this.dialogVisible = false
      },
      saveNewUser () {
        this.$refs['createForm'].validate(valid => {
          console.log('valid', valid)
          if (valid) {
            var userGroup = this.newUser.groups.map(item => item.gid)
            var params = {
              'user_group': userGroup
            }
            Object.assign(params, this.newUser)
            service.addUser(params).then(res => {})
          }
        })
      },
      addGroupModal (group, groupList) {
        this.dialogVisible = true
      },
      deleteGroup (group, groupList) {
        var idx = groupList.indexOf(group)
        groupList.splice(idx, 1)
        if (groupList.length === 0) {
          this.blank1 = true
        }
      },
      getAllGroups () {
        var params = {}
        service.getGroupListForCreate(params).then(res => {
          this.createForm.allGroups = res.data
        }).catch(() => {
          this.createForm.allGroups = []
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    watch: {
      'newUser.groups': {
        handler (newVal, oldVal) {
          this.newUser.tempGroup = newVal.join(',')
        },
        deep: true
      }
    },
    async mounted () {
      console.log('renderData', this.renderData)
      this.getAllGroups()
      await this.getUserTypeSelect()
      await this.getPwdExp()
    },
    components: {
      BButton,
      BIcon,
      BInput,
      BSelect,
      BDialog,
      BTable
    }
  }
</script>

<style lang="less">
  .basic-info-newUser {
    margin-left: -32px;
    margin-top: 20px;
    margin-bottom: 25px;
    .delete-icon {
      margin-left: 5px;
    }
    .group-item {
      display: inline-block;
      width: 50%;
    }
    .group-item-icon {
      display: inline-block;
      width: 40%;
    }
    .b-table {
      width: 56%;
    }
    .footer {
      margin-top: 45px;
      margin-bottom: 40px;
      margin-left: 1.2%;
    }
    .el-option{
      width: 200px;
    }
    .el-option span{
      display: inline-block;
      width: 100%;
    }
    .el-form-item__content{
      margin-bottom: 15px !important;
    }

    .el-form-item {
      margin-bottom: 5px;
    }
    .el-col-7 {
      width: 51%;
      margin-bottom: 10px;
    }
    .addGroup1{
      margin-left: 1px !important;
      .b-button {
        width: 100%;
      }
    }
    .blank1{
      display: inline-block;
      width: 200px;
      margin-left: 17px;

    }
    .el-input__inner {
      margin-left: 0;
    }
    .footer {
      margin-left: 65px !important;
    }

  }
</style>
