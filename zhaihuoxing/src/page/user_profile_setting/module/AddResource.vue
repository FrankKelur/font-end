<template lang="pug">
  b-dialog.add-resource(:show='true', :title="renderData.addOption", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="100px", :model="newResource", ref="newResource", :rules="rules")
      el-form-item(prop="name", :label="renderData.profileName")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="newResource.name")
        b-input(:placeholder="renderData.pleaseEnter", v-show="none", :model.sync="newResource.name")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="addResource", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import { constants, validator } from 'common/js/Utils'

  export default {
    name: 'add-resource',
    data () {
      var _this = this
      return {
        none: false,
        newResource: {
          name: ''
        },
        rules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              message: _this.renderData.pleaseEnter
            },
            {
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.qianhouNoSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              regex: constants.length128Limit,
              message: this.renderData.textLengthErrorShort,
              validator: validator.validate,
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
      profileInfo: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      addResource () {
        this.$refs['newResource'].validate(valid => {
          if (valid) {
            var paths = this.profileInfo.path
            var params = this.profileInfo
            params.label = this.newResource.name
            service.addResource(params).then(res => {
              console.log('addResource')
              console.log('addResource', params)
              console.log('addResource', this.profileInfo)
//              this.$emit('refreshInfo')
              // 添加新的 resource 到其parent
              var parent = null
              if (paths[0] === 'files') {
                parent = this.profileInfo.fileList.find(cls => paths[1] === cls.key)
              } else {
                paths.forEach(path => {
                  if (!parent) {
                    parent = this.profileInfo.classList.find(cls => path === cls.key)
                  } else {
                    parent = parent.dataSource.find(item => path === item.key)
                  }
                })
              }
              if (parent === undefined) {
//                this.$emit('refreshInfo')
                this.visible.dialog = null
                return
              }
              // 新增的标签没有该属性,需要初始化
              if (!parent.dataSource) {
                parent.dataSource = []
              }
              if (parent.depth === 3) {
                parent.dataSource.push({
                  key: res.key,
                  label: params.label,
                  checked: false,
                  required: false,
                  dataSource: []
                })
              } else {
                parent.dataSource.push({
                  key: res.key,
                  label: params.label,
                  checked: false,
                  required: false
                })
              }
              console.log('parent', parent)
//              this.$emit('refreshInfo')
              this.visible.dialog = null
            })
          }
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
      console.log('传进来的数据')
      console.log(this.profileInfo)
    },
    components: {
      BDialog,
      BInput,
      BButton
    }
  }
</script>

<style lang="less" scoped>
</style>
