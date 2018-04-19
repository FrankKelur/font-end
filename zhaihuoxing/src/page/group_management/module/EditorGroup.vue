<template lang="pug">
  #edit-group
    el-form.form(:model="form" label-width="140px", :rules="rules", :inline="true", ref="form",label-position="left")
      template(v-if="renderData.group_management_edit_group")
        el-row(:gutter="20")
          el-col(:span="12")
            el-form-item(prop='group_name')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.group_management_edit_group.groupName", v-ellipsis-title="")
              b-input(:model.sync="form.group_name", :placeholder="renderData.group_management_edit_group.pleaseEnter", :disabled="form.isSelf")
          el-col(:span="12")
            el-form-item
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.group_management_edit_group.creator", v-ellipsis-title="")
              span.theme-color-C {{form.creator}}
        el-row(:gutter="20")
          el-col(:span="24")
            el-form-item(prop='description')
              template(slot="label")
                span.theme-color-C.inline-label(v-text="renderData.group_management_edit_group.description", v-ellipsis-title="")
              b-input(:model.sync="form.description", :placeholder="renderData.group_management_edit_group.pleaseEnter", class="descriptionInput", :disabled="form.isSelf")
      el-row(:gutter="20")
        el-col(:span="12")
          el-form-item(v-if="renderData.group_management_edit_role &&  !form.isSelf")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.group_management_edit_role.groupManagementEditRole", v-ellipsis-title="")
            span.theme-color-C {{formatList(form.group_role) || '-'}}
            b-icon(iconName="edit", @click="editRoleFun").icon
        //el-col(:span="12")
          el-form-item(:label="renderData.group_management_edit_move_group.dadGroup", v-if="renderData.group_management_edit_move_group")
            template(slot="label")
              span.theme-color-C(v-text="renderData.group_management_edit_group.dadGroup")
            span.theme-color-C {{form.parent.group_name || '-'}}
            b-icon(iconName="edit", @click="editParentGroupFun").icon
      template(v-if="renderData.group_management_edit_member")
        el-row(:gutter="20")
          el-col(:span="12", class="list1")
            el-form-item(:label="renderData.group_management_edit_member.userList")
              template(slot="label")
                span.theme-color-C(v-text="renderData.group_management_edit_group.userList")
              //b-icon(iconName="edit", @click="editUserFun").icon
        b-table(:search-data="searchData", :render-data="tableR", ref="table", :url="url")
      .save-btn-box(v-if="renderData.group_management_edit_group")
        b-button(type="primary", @click="editGroup")
          span {{renderData.group_management_edit_group.save}}

</template>

<script>
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import BPagination from 'components/BPagination'
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import BTable from 'components/BTable'
  import BSelect from 'components/BSelect'
  import service from '../service'

  export default {
    data () {
//      console.log('this.currRow.gid', this.currRow.gid)
      return {
        rules: {
          group_name: [
            {required: true, message: this.renderData.pleaseEnter, trigger: 'blur'}
          ]
        },
        tableR: {
          headerCols: [
            {
              field: 'user_name',
              label: this.renderData.group_management_edit_member.userName
            },
            {
              field: 'email',
              label: this.renderData.group_management_edit_member.email
            }
          ],
          operateOpts: []
        },
        searchData: {
          gid: this.currRow.gid
        },
        url: '/api/rbac/group/get_group_user',
        form: {
          parent: {},
          group_name: '',
          group_role: '',
          description: '',
          creator: '',
          maxRole: '',
          isSelf: false
        },
        tableData: [
          {
            'user_name': 'user2',
            'uid': '457875f08d4c11e7a8640050568b0264',
            'email': 'user2@qq.com',
            'first_name': 'cui',
            'middle_name': 'jin',
            'last_name': 'tao',
            'phone_no': '18888888888'
          },
          {
            'user_name': 'user2',
            'uid': '457875f08d4c11e7a8640050568b0264',
            'email': 'user2xxxxxxxxxxxxxxxxxx@qq.com',
            'first_name': 'cui',
            'middle_name': 'jin',
            'last_name': 'tao',
            'phone_no': '18888888888'
          },
          {
            'user_name': 'user2',
            'uid': '457875f08d4c11e7a8640050568b0264',
            'email': 'user2@qq.com',
            'first_name': 'cui',
            'middle_name': 'jin',
            'last_name': 'tao',
            'phone_no': '18888888888'
          },
          {
            'user_name': 'user2',
            'uid': '457875f08d4c11e7a8640050568b0264',
            'email': 'user2@qq.com',
            'first_name': 'cui',
            'middle_name': 'jin',
            'last_name': 'tao',
            'phone_no': '18888888888'
          },
          {
            'user_name': 'user2',
            'uid': '457875f08d4c11e7a8640050568b0264',
            'email': 'user2@qq.com',
            'first_name': 'cui',
            'middle_name': 'jin',
            'last_name': 'tao',
            'phone_no': '18888888888'
          }
        ]
      }
    },
    methods: {
      formatList (list) {
        if (list) {
          var roleList = list.map(item => item.role_name).join(', ')
          return roleList
        }
      },
      editUserFun () {
        service.editUserFun()
      },
      editGroup () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var params = this.form
            service.editGroup(params).then(data => {
              console.log('currRow', this.currRow)
              var params2 = {
                gid: this.currRow.father_gid
              }
              service.getGroupList(params2).then(({data}) => {
                data.forEach(child => {
                  child.father = this.currRow.father
                })
                this.currRow.father.children = data
              })
            })
          }
        })
      },
      editParentGroupFun () {
        this.$emit('showMoveGroup')
      },
      editRoleFun () {
        this.visible.page = 'group_management_edit_role'
      },
      getGroupInfo () {
        var params = {
          gid: this.currRow.gid
        }
        return service.getGroupInfo(params).then(data => {
          this.form = data
        })
      }
    },
    props: {
      renderData: {
        type: Object
      },
      visible: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      }
    },
    async mounted () {
      await this.getGroupInfo()
    },
//    computed: {
//      searchData () {
//        console.log('searchData currRow.gid')
//        return {
//          gid: this.currRow.gid
//        }
//      }
//    },
    watch: {
      'currRow.gid' () {
        this.getGroupInfo()
        console.log('currRow.gid')
        this.searchData.gid = this.currRow.gid
        this.$refs['table'].search()
      }
    },
    components: {
      BInput,
      BIcon,
      BPagination,
      BButton,
      BTable,
      BDialog,
      BSelect
    }
  }
</script>

<style lang="less" >
  #edit-group {
    height: 760px;
    overflow-y: auto;
    width: 100%;
    padding: 44px 4% 15px 4%;
    position: relative;
    .save-btn-box {
      margin-top: 70px;
    }
    .group-name-input {
      width: 250px;
    }
    .creator {
      margin-left: 50px;
    }
    .edit-group-item {
      line-height: 36px;
      margin-bottom: 22px;
      padding-left: 10px;
      .edit_max {
        margin-left: 80px;
      }
    }
    .icon {
      display: inline;
      margin-left: 10px;
      vertical-align: top;
      margin-top: 10px;
    }
    .edit-button {
      display: inline-block;
      width: 100px;
    }
    .save-box {
      position: absolute;
      bottom: 20px;
    }
    .role-max-item {
      line-height: 36px;
      label {
        width: 80px;
        text-align: right;
        margin-right: 15px;
      }
      .max-rolse-select {
        width: 150px;
        display: inline-block;
      }

    }
    .role-max-item:first-of-type {
      margin-bottom: 15px;
    }
    .list1{
      height: 35px;
    }
    .b-pagination[data-v-a152c63c] {
       display: inline-block !important;
      margin-top: 25px !important;
    }
    .descriptionInput{
      width: 336px !important;
    }
    .el-form-item__label{
      display: table !important;
      float: left;
      vertical-align: top;
    }
    .el-form-item__content{
      display: -webkit-box;
      word-break: break-all;
    }
    .el-table--fit {
      border-left: 1px solid;
      border-top: 1px solid;
    }
  }

</style>
