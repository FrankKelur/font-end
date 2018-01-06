<template lang="pug">
  b-dialog.edit-group(:show.sync='dialogVisible', width="38%", :title="editGroupForm.status=='list'?renderData.editGroup:renderData.addToGroup", :show-close="true", :before-close="beforeClose")
    el-form(label-width="80px", :model="editGroupForm", :rules="rules", ref="editGroupForm")
      template(v-if='editGroupForm.status=="list"')
        el-form-item
          template(slot="label")
            span.theme-color-C(v-text="renderData.userName")
          span.theme-color-C(v-text="currUser.user_name")
        el-form-item
          template(slot="label")
            span.theme-color-C(v-text="renderData.userGroup")
          el-row.add-group-list(:gutter="10")
            el-col(:span="7" v-for="group in currUser.user_group", :key="group.gid", class="elCol1")
              b-button(size="small")
                span.group-item(v-ellipsis-title="") {{group.group_name}}
                b-icon.group-item-icon.theme-color-C.theme-color-G-hover(iconName="message_failure", @click.native='deleteGroup(group)')

        el-form-item(label=" ")
          b-button(type="primary", @click='addGroup') {{renderData.add}}
      template(v-if='editGroupForm.status=="add"')
        el-form-item(:label='renderData.userGroup', prop="userGroup")
          template(slot="label")
            span.theme-color-C(v-text="renderData.userGroup")
          b-select(:model.sync="editGroupForm.newGroupId")
            el-option(v-for="group in notSelectedGroups", :key="group.gid", :value="group.gid", :label="group.group_name")
    template(slot="footer")
      template(v-if="editGroupForm.status!=='list'")
        span
        b-button(@click="cancelHandler") {{renderData.cancel}}
        b-button(@click="addGroupFun", type="primary") {{renderData.confirm}}
      template(v-else)
        b-button(@click="closeHandler") {{renderData.close}}

</template>

<script>
  import service from '../service'
  import BIcon from 'components/BIcon'
  import BTag from 'components/BTag'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BDialog from 'components/BDialog'

  export default {
    name: 'edit-group',
    data () {
      var _this = this
      return {
        dialogVisible: true,
        editGroupForm: {
          newGroupId: '',
          status: 'list',
          allGroups: []
        },
        rules: {
          userGroup: [
            {
              required: true,
              message: _this.renderData.pleaseSelect,
              trigger: 'blur'
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
      currUser: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteGroup (group) {
        var userGroup = this.currUser.user_group.map(group => {
          return group.gid
        })
        userGroup.splice(userGroup.indexOf(group.gid), 1)
        var params = {
          uid: this.currUser.uid,
          user_group: userGroup
        }
        service.linkGroup(params).then(res => {
          this.getUserInfo()
        })
      },
      cancelHandler () {
        this.editGroupForm.status = 'list'
      },
      closeHandler () {
        this.visible.dialog = null
      },
      addGroupFun () {
        console.log('addGroupFun')
        this.$refs['editGroupForm'].validate(valid => {
          if (valid) {
            var userGroup = this.currUser.user_group.map(group => {
              return group.gid
            })
            userGroup.push(this.editGroupForm.newGroupId)
            var params = {
              uid: this.currUser.uid,
              user_group: userGroup
            }
            service.linkGroup(params).then(res => {
              this.editGroupForm.status = 'list'
              this.editGroupForm.newGroupId = ''
              this.getUserInfo()
            })
          }
        })
      },
      addGroup () {
        this.editGroupForm.status = 'add'
      },
      getGroupList () {
        var params = {}
        return service.getGroupSelect(params).then(res => {
          this.allGroups = res.data
        }).catch(() => {
          this.allGroups = []
        })
      },
      getUserInfo () {
        var params = {
          uid: this.currUser.uid
        }
        return service.getUserInfo(params).then(res => {
          Object.assign(this.currUser, res)
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    computed: {
      notSelectedGroups () {
        var list = Object.assign([], this.allGroups)
        list.forEach(item => {
          item.gid = item.key
          item.group_name = item.val
        })
        var res = list.filter(group => {
          return !this.currUser.user_group.find(elem => {
            return elem.gid === group.gid
          })
        })
        console.log('res', res)
        return res
      }
    },
    async mounted () {
      await this.getGroupList()
      await this.getUserInfo()
    },
    components: {
      BIcon,
      BTag,
      BDialog,
      BSelect,
      BButton
    }
  }
</script>

<style lang="less" >
  .edit-group {
    .delete-icon {
      margin-left: 5px;
    }
    .add-group-list{
      margin-left: 0 !important;
      margin-right: 0 !important;
      .b-button {
        width: 100%;
      }
    }
    .group-item {
      display: inline-block;
      width: 50%;
    }
    .group-item-icon {
      display: inline-block;
      width: 40%;
    }
    .elCol1{
      padding-left: 0 !important;
      margin-bottom: 5px;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }
</style>
