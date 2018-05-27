<template lang="pug">
  b-dialog.change-max(:show='true', :title="renderData.changeMax", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="80px", :model="changeMaxForm")
      el-form-item(:label='renderData.userName')
        span(v-text="currUser.user_name")
      el-form-item(:label="renderData.roleMax")
        el-select(v-model="currUser.roleMax")
          el-option(v-for='(roleSize, idx) in changeMaxForm.roleSizeList', :key="idx", :value="roleSize") {{roleSize}}
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="changeMax", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'

  export default {
    name: 'change-max',
    data () {
      return {
        changeMaxForm: {
          status: 'list',
          roleSizeList: []
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
      changeMax () {
        var params = {
          uid: this.currUser.uid,
          role_max: this.currUser.roleMax
        }
        service.setRoleMax(params).then(res => {
          this.visible.dialog = null
        })
      },
      getRoleSizeList () {
        var params = {}
        service.getRoleMaxInfo(params).then(res => {
          var list = []
          for (var i = res.role_max; i <= res.role_max_limit; i++) {
            list.push(i)
          }
          this.changeMaxForm.roleSizeList = list
        }).catch(() => {
          this.changeMaxForm.roleSizeList = []
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
      this.getRoleSizeList()
    },
    components: {
      BDialog,
      BButton
    }
  }
</script>

<style lang="less" scoped>
</style>
