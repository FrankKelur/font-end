<template lang="pug">
  h2 这是是开始任务页面
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
    name: 'audit-task',
    data () {
      var _this = this
      return {
        tableData: [],
        dialogVisible: false,
        newUser: {
          password: '',
          email: '',
          confirmPassword: '',
          user_type: '',
          user_name: ''
        },
        createForm: {
          groups: [],
          newGroupId: 'password',
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
              trigger: 'blur'
            }, {
              regex: utils.constants.passwordReg,
              message: _this.renderData.passwordErrorRule,
              validator: utils.validator.validate,
              trigger: 'blur'
            }],
            email: [{
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
              trigger: 'blur'
            }, {
              test: function (value) {
                return value === _this.newUser.password
              },
              validator: utils.validator.validate,
              message: _this.renderData.confirmPasswordErrorRule,
              trigger: 'blur'
            }],
            user_type: [{
              required: true,
              message: this.renderData.pleaseSelect,
              trigger: 'blur'
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
        var list = Object.assign([], this.createForm.allGroups)
        return list.filter(group => {
          return !this.createForm.groups.indexOf(elem => {
            return elem.id === group.id
          })
        })
      }
    },
    methods: {
      toList () {
        this.visible.page = null
      },
      disableFunc (row) {
        // 角色是从用户组来的
        return !!this.createForm.groups.find(group => {
          return group.roles.indexOf(row.id) !== -1
        })
      },
      addGroup () {
        var params = {
          uid: this.currUser.uid,
          user_group: [this.editGroupForm.newGroupId]
        }
        service.linkGroup(params).then(res => {
          this.editGroupForm.status = null
          this.getGroupList()
        })
      },
      hideModal () {
        this.dialogVisible = false
      },
      saveNewUser () {
        this.$refs['createForm'].validate(valid => {
          if (valid) {
            var params = {
              'user_group': this.newUser.groups.map(item => item.id),
              'role': this.createForm.tableData.filter(role => !!role.checked).map(item => item.id)
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
      },
      getAllGroups () {
        var params = {}
        service.getGroupListForCreate(params).then(res => {
          this.createForm.allGroups = res.data
        }).catch(() => {
          this.createForm.allGroups = []
        })
      }
    },
    mounted () {
      console.log('renderData', this.renderData)
      this.getAllGroups()
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

<style lang="less" scoped>
  .basic-info {
    margin-top: 20px;
    margin-bottom: 25px;
  }

  .b-table {
    width: 56%;
  }

  .footer {
    margin-top: 45px;
    margin-bottom: 40px;
    margin-left: 1.2%;
  }
</style>
