<template lang="pug">
  el-form.preview-role(label-width="140px")
    .body-container
      el-row(:gutter="80")
        el-col(:span="6", class="roleName1")
          el-form-item
            template(slot="label")
              span.theme-color-C(v-text="renderData.roleName")
            span.theme-color-C(v-text="currRole.role_name")
        el-col(:span="6", class="description1")
          el-form-item
            template(slot="label")
              span.theme-color-C(v-text="renderData.description")
            span.theme-color-C(v-text="currRole.description")
      el-row(:gutter="80")
        el-col(:span="6", class="fromWhere1")
          el-form-item
            template(slot="label")
              b-icon.tooltip-icon.theme-color-A-hover.theme-color-C(iconName='info', :title="renderData.fromWhereDescription")
              span.theme-color-C(v-text="renderData.fromWhere")
            span {{currRole.from_where_label}}
      edit-auth-panels(:render-data="renderData", :editable="editable", :curr-role="currRole", ref="editPanel")
    .fixed-footer
      b-button(@click="toLinkRole") {{renderData.back}}
      b-button(type="primary", @click="toggleLinkRole") {{linked?renderData.disconnectRole:renderData.linkRole}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import EditAuthPanels from 'page/role_management/module/editAuthPanels'

  export default {
    name: 'preview-role',
    data () {
      return {
        editable: false,
        currRole: Object.assign({
          from_where_label: ''
        }, this.currRoleBak)
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currRoleBak: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      config: {
        type: Object,
        showConfirm: true
      }
    },
    computed: {
      linked () {
        console.log('----- computed linked ---------')
        var list = this.currRow.user_role || this.currRow.group_role || []
        return list.some(role => {
          return this.currRole.rid === role.rid
        })
      }
    },
    watch: {
    },
    methods: {
      toLinkRole () {
        this.visible.page = this.config.linkRoleAuth
      },
      toggleLinkRole () {
        var params = {
          uid: this.currRow.uid,
          gid: this.currRow.gid,
          user_role: [this.currRole.rid]
        }
        if (this.linked) {
          service.disconnectRole(params, this.config.origin).then(res => {
            this.$emit('linkchange')
          })
        } else {
          service.linkRole(params, this.config.origin).then(res => {
            this.$emit('linkchange')
          })
        }
      },
      getPermitOfRole () {
        var params = {
          'rid': this.currRoleBak.rid
        }
        return service.getRoleInfo(params).then(res => {
          Object.assign(this.currRole, res)
          console.log('this.currRole', this.currRole)
          this.currRole.source_auth_data = res.source_auth_data
          this.currRole.interface_auth_data = res.interface_auth_data
        })
      }
    },
    async mounted () {
      await this.getPermitOfRole()
      this.$refs['editPanel'].init()
      console.log('previewrole renderData', this.renderData)
    },
    components: {
      BIcon,
      BButton,
      EditAuthPanels
    }
  }
</script>

<style lang="less" scoped>
</style>

<style lang="less">
  .preview-role {
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .body-container {
      padding-right: 40px;
      overflow-y: auto;
    }
    .tooltip-icon {
      margin-left: 4px;
    }
    .roleName1{
      margin-left: -13.56px;
    }
    .description1{
      width: 1000px;
    }
    .fromWhere1{
      margin-left: -13.56px;
    }
  }
</style>
