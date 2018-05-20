<template lang="pug">
  el-tabs.edit-auth-panel(v-model="editAuthPanels.activeTab", type="card")
    el-tab-pane(name="1")
      span.theme-color-A(slot="label") {{renderData.interfaceAuth}}
      el-collapse(v-model="editAuthPanels.activeComponents")
        el-collapse-item(:name="comp.auth", v-for="comp in componentsAuth", :key="comp.auth")
          template(slot="title")
            b-checkbox.theme-color-C(:value="permitStatus(comp)", :indeterminate='indeterminateFun(comp)', @change="parentStatusChange($event, comp)", :disabled="!editable") {{comp.label}}
          el-table(:data="comp.children", border, style="width:100%", :show-header="false")
            el-table-column(prop="checked", width="200")
              template(slot-scope="scope")
                b-checkbox.theme-color-C(:value="permitStatus(scope.row)", :indeterminate='indeterminateFun(scope.row, 1)', @change="parentStatusChange($event, scope.row)", :disabled="!editable", v-if="!(scope.row.canDisabled&&scope.row.canEnabled)&&scope.row.children.length") {{scope.row.label}}
                b-checkbox.theme-color-C(:model.sync="scope.row.checked", :indeterminate='indeterminateFun(scope.row, 1)', @change="permitChange(scope.row)", :disabled="!editable", v-if="!(scope.row.canDisabled&&scope.row.canEnabled)&&!scope.row.children.length") {{scope.row.label}}
                el-dropdown(v-if="(scope.row.canDisabled&&scope.row.canEnabled)")
                  span.el-dropdown-link
                    b-checkbox.theme-color-C(:value="permitStatus(scope.row)", :indeterminate='indeterminateFun(scope.row, 1)', @change="parentStatusChange($event, scope.row)", :disabled="!editable", v-if='scope.row.children.length') {{scope.row.label}}
                    b-checkbox.theme-color-C(:model.sync="scope.row.checked", :indeterminate='indeterminateFun(scope.row, 1)', @change="permitChange(scope.row)", :disabled="!editable", v-else) {{scope.row.label}}
                    i.el-icon-caret-bottom.el-icon--right
                  el-dropdown-menu(slot="dropdown")
                    el-dropdown-item
                      b-checkbox.theme-color-C(:model.sync="scope.row.enabled", :disabled="!scope.row.checked || !editable") {{renderData.enableOperate}}
            el-table-column(prop="children")
              template(slot-scope="scope")
                el-row(:gutter="10")
                  el-col.permit-item(v-for="secondPermit in scope.row.children", :key="secondPermit.auth", :span="6")
                    b-checkbox.theme-color-C(:model.sync="secondPermit.checked", :indeterminate='indeterminateFun(secondPermit)', @change="permitChange(secondPermit)", :disabled="!editable" v-if="!(secondPermit.canDisabled && secondPermit.canEnabled)") {{secondPermit.label}}
                    el-dropdown(v-else)
                      span.el-dropdown-link
                        b-checkbox.theme-color-C(:model.sync="secondPermit.checked", :indeterminate='indeterminateFun(secondPermit)', @change="permitChange(secondPermit)", :disabled="!editable") {{secondPermit.label}}
                        i.el-icon-caret-bottom.el-icon--right
                      el-dropdown-menu(slot="dropdown")
                        el-dropdown-item
                          b-checkbox.theme-color-C(:model.sync="secondPermit.enabled", :disabled="!secondPermit.checked || !editable") {{renderData.enableOperate}}

<<<<<<< HEAD
    //el-tab-pane(:label="renderData.resourceAuth", name="2")
      el-collapse(v-model="editAuthPanels.activeResource")
        el-collapse-item(:name="resource.name", v-for="resource in resourceList", :key="resource.name", :title="resource.label")
          resource-item(:resource="resource", :render-data="generateRenderData(resource)")
=======
    el-tab-pane(name="2")
      span.theme-color-A(slot="label") 资源访问权限
      el-collapse.ziyuan(v-model="activeName")
        el-collapse-item(v-for="item in ziyuanData", :key="item.comName", :name="item.comName", :title="item.comName")
          .box-left
            .radio-box
              el-radio(v-model="item.visitType" label="all") 访问全部资源
            .radio-box
              el-radio(v-model="item.visitType" label="one") 访问特定资源
            .search-box(v-if="item.visitType==='one'")
              .search-type(v-for="searchChild in item.searchArr")
                el-form(label-width="140px" label-position='left' ref="form", :model="item")
                  el-form-item(label="赛选条件")
                    b-select.input-long-type1(placeholder="请选择", :model.sync="searchChild.type")
                      el-option(v-for="arr in tiaojianArr", :key="arr.type", :label="arr.label", :value="arr.type")

                    b-select.input-long-type1(placeholder="请选择", :model.sync="searchChild.data" v-if="searchChild.type!=='' && searchChild.optType==='select'")
                      el-option(v-for="data in searchChild.source", :key="data", :label="data", :value="data")

                    el-date-picker(v-model="searchChild.data" align="right" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期", :picker-options="searchChild.disabledTime" v-if="searchChild.type!=='' && searchChild.optType==='dataPicker'")
              .search-btn
                el-button(type="primary", @click="addSearch(item)") 添加赛选条件
          .box-right
            .radio-box
              el-radio(v-model="item.checkType" label="all") 查看全部资源
            .radio-box
              el-radio(v-model="item.checkType" label="one") 查看特定资源
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
</template>

<script>
  import Vue from 'vue'
<<<<<<< HEAD
=======
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  import service from '../service'
  import ResourceItem from './ResourceItem'
  import BCheckbox from 'components/BCheckbox'

  export default {
    name: 'edit-auth-panels',
    data () {
      return {
        componentsAuth: [],
        authMap: new Map(),
        resourceList: [],
        editAuthPanels: {
          activeTab: '1',
          activeComponents: []
<<<<<<< HEAD
        }
=======
        },
        activeName: 'role',
        ziyuanData: [
          {
            comName: 'user',
            visitType: 'all',
            searchArr: [],
            checkType: 'all'
          },
          {
            comName: 'role',
            visitType: 'one',
            searchArr: [
              {
                type: 'time',
                data: ['2018-03-07', '2018-03-21'],
                optType: 'dataPicker',
                disabledTime: {
                  disabledDate (time) {
                    console.log('时间禁用区间')
                    console.log(time.getTime())
                    console.log(Date.now())
                    return ((time.getTime() > (Date.now() + 4000008524)))
                  }
                }
              },
              {
                type: 'userType',
                data: '钻石用户',
                optType: 'select',
                source: [
                  'vip1', 'vip2', 'vip3', 'vip4', 'vip5', '钻石用户'
                ]
              },
              {
                type: 'country',
                data: '中国',
                optType: 'select',
                source: [
                  '中国', '韩国', '美国', '日本', '意大利', '法国', '英国'
                ]
              },
              {
                type: 'status',
                data: '激活',
                optType: 'select',
                source: [
                  '激活', '未激活', '等待中', '处理中', '冻结前', '已冻结', '销毁'
                ]
              }
            ],
            checkType: 'one'
          }
        ],
        tiaojianArr: [
          {
            type: 'time',
            label: '创建/注册时间'
          },
          {
            type: 'userType',
            label: '用户类型'
          },
          {
            type: 'country',
            label: '国籍'
          },
          {
            type: 'status',
            label: '状态'
          }
        ]
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      }
    },
    props: {
      currRole: {
        type: Object,
        required: true
      },
      renderData: {
        type: Object,
        required: true
      },
      editable: {
        type: Boolean,
        required: true
      }
    },
    computed: {},
    methods: {
      generateRenderData (resource) {
        return Object.assign({}, this.renderData, this.renderData.resourceList.find(item => {
          return item.name === resource.name
        }))
      },
      permitStatus (permit) {
//        console.log('-------- permit -------')
        console.log(permit)
        var res = permit.children.some(first => {
          if (first.children.length) {
            return first.children.some(second => {
              return second.checked
            })
          } else {
            return first.checked
          }
        })
        if (!permit.children.length) {
          res = true
        }
        return res
      },
      changeRelatedAuth (permit) {
        if (permit.checked) { // check 选中其依赖的权限
          permit.dependentAuths.forEach(auth => {
            console.log('auth', auth, permit, permit.component)
            var targetAuth = this.authMap.get(auth)
            this.permitChange(targetAuth, true)
          })
        } else { // uncheck 取消被其依赖的权限
          permit.beDependentAuths.forEach(auth => {
            var targetAuth = this.authMap.get(auth)
            this.permitChange(targetAuth, false)
          })
        }
      },
      permitChange (permit, checked, disabled) {
        if (typeof checked !== 'undefined') {
          if (permit.checked === checked) {
            return
          } else {
            permit.checked = checked
          }
        }
        console.log('permitChange', permit, permit.type, permit.children)
        if (typeof disabled !== 'undefined') {
          permit.enabled = !disabled
        } else {
          permit.enabled = permit.checked
        }
        this.changeRelatedAuth(permit)
      },
      parentStatusChange (event, permit, checked) {
        if (typeof checked !== 'boolean') {
          checked = !this.permitStatus(permit)
        }
        permit.children.forEach(child => {
          if (child.children.length) {
            this.parentStatusChange(null, child, checked)
          } else {
            this.permitChange(child, checked)
          }
        })
      },
      indeterminateFun (permit, type) {
        var res = ''
        if (permit.canDisabled && permit.canEnabled) { // 当前权限可禁止，且用户组有enable的权限
          // 有children的权限，canDisabled 不会为true
          res = (!permit.enabled && permit.checked) || (permit.enabled && !permit.checked)
        } else {
          var someChecked = permit.children.some(child => {
            if (child.children.length) {
              return child.children.some(grandChild => {
                return grandChild.checked
              })
            } else {
              return child.checked
            }
          })
          var someNotChecked = permit.children.some(child => {
            if (child.children.length) {
              return child.children.some(grandChild => {
                return !grandChild.checked
              })
            } else {
              return !child.checked
            }
          })
          res = someChecked && someNotChecked
        }
        return res
      },
      generateParams () {
        var res = {}
        // z todo 添加资源权限的参数
        this.componentsAuth.forEach(compItem => {
          compItem.children.forEach(first => {
            if (first.children.length) {
              first.children.forEach(second => {
                if (second.checked) {
                  if (!res[compItem.auth]) {
                    res[compItem.auth] = []
                  }
                  res[compItem.auth].push({
                    name: second.auth,
                    disable: (second.canDisabled && !second.canEnabled) ? true : !second.enabled
                  })
                }
              })
            } else {
              if (first.checked) {
                if (!res[compItem.auth]) {
                  res[compItem.auth] = []
                }
                res[compItem.auth].push({
                  name: first.auth,
                  disable: (first.canDisabled && !first.canEnabled) ? true : !first.enabled
                })
              }
            }
          })
        })
        return res
      },
      renderByRoleInfo () {
        var roleMap = this.currRole.interface_auth_data
        console.log('renderByRoleInfo ', roleMap, this.componentsAuth)
        this.componentsAuth.forEach(comp => {
          var compList = roleMap[comp.auth] || []
          var compMap = {}
          compList.forEach(item => {
            compMap[item.name] = item
          })
          comp.children.forEach(child => {
            if (child.children.length) {
              child.children.forEach(grandChild => {
                if (compMap[grandChild.auth]) {
                  var {disable} = compMap[grandChild.auth]
                  grandChild.checked = true
                  grandChild.enabled = !disable
                }
              })
            } else {
              if (compMap[child.auth]) {
                var {disable} = compMap[child.auth]
                child.checked = true
                child.enabled = !disable
              }
            }
          })
        })
      },
      getAllAuth () {
        var params = {}
        //          'from_where': this.currRole.from_where,
        //          'rid': this.currRole.rid
        if (this.currRole.from_where !== undefined) {
          params.from_where = this.currRole.from_where
        } else {
          params.rid = this.currRole.rid
        }
        console.log('params')
        return service.getAllAuth(params).then(res => {
          console.log('res', res)
          this.componentsAuth = res
<<<<<<< HEAD
=======
          console.log('test init 1', this.componentsAuth.length)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        })
      },
      getResourceList () {
        return service.getResourceList({'from_where': this.currRole.from_where}).then(res => {
          if (res.re === '200') {
            this.resourceList = res.data
          }
        })
      },
      async init () {
<<<<<<< HEAD
        await this.getAllAuth()
        this.editAuthPanels.activeComponents = this.componentsAuth.map(comp => comp.auth)
=======
        console.log('test init 0')
        await this.getAllAuth()
        console.log('test init 2', this.componentsAuth.length)
        if (this.componentsAuth.length) {
          this.editAuthPanels.activeComponents = this.componentsAuth.map(comp => comp.auth)
        }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
        // 生成 authMap 添加beDependentAuths
        this.authMap = new Map()
        this.componentsAuth.forEach(comp => {
          this.authMap.set(comp.auth, comp)
          Object.assign(comp, {beDependentAuths: [], component: comp})
          comp.children.forEach(child => {
            this.authMap.set(child.auth, child)
            Object.assign(child, {beDependentAuths: [], type: '1', component: comp})
            child.children.forEach(grandChild => {
              this.authMap.set(grandChild.auth, grandChild)
              Object.assign(grandChild, {beDependentAuths: [], type: '-1', component: comp})
            })
          })
        })
        this.authMap.forEach((auth, key) => {
          auth.dependentAuths.forEach(dependentKey => {
            var dependentAuth = this.authMap.get(dependentKey)
            console.log('dependentKey', dependentKey, auth, key, this.authMap)
            dependentAuth.beDependentAuths.push(key)
          })
          Vue.set(auth, 'checked', false) // 默认checked false
          Vue.set(auth, 'enabled', false)  // 默认enabled true
        })
        this.renderByRoleInfo()
        // await this.getResourceList() // z todo 资源管理暂时不做
<<<<<<< HEAD
      }
    },
    components: {BCheckbox, ResourceItem},
=======
      },
      addSearch (item) {
        let targetData = item.searchArr
        if (targetData.length === 0) {
          item.searchArr.push({
            type: '',
            data: ''
          })
          return
        }
        if (targetData[targetData.length - 1].type === '' || targetData[targetData.length - 1].data === '') {
          this.$message('请选择完成最后一项')
          return
        }
        item.searchArr.push({
          type: '',
          data: ''
        })
      }
    },
    components: {BCheckbox, ResourceItem, BSelect, BInput},
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    mounted () {
//      this.init()
    }
  }
</script>

<style lang="less">
  .edit-auth-panel {
    .el-collapse-item__header {
      margin-left: 3px;
<<<<<<< HEAD
    }
    .el-collapse-item__content {
=======
      .el-checkbox {
        margin-top: 10px;
      }
    }
    .el-collapse-item__content {
      padding-bottom: 0px!important;
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      .el-table {
        .permit-item {
          margin-bottom: 8px;
          margin-top: 8px;
        }
      }
    }
    .el-table--fit{
<<<<<<< HEAD
      border-bottom: 0 !important;
      border-right: 0 !important;
=======
      background-color: inherit;
      tr {
        background-color: inherit;
      }
    }
    .ziyuan{
      .box-left{
        float: left;
        width: 70%;
        border: 1px solid #ccc;
      }
      .box-right{
        float: left;
        width: 30%;
        border: 1px solid #ccc;
      }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    }
  }
</style>
