<template lang="pug">
  b-dialog.new-profile(:show='true', :title="renderData.newUserProfile", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="100px", :model="newProfile", ref="newProfile", :rules="rules")
      el-form-item(prop="name", :label="renderData.profileName")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="newProfile.name")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="addProfile('newProfile')", type="primary") {{renderData.confirm}}
</template>

<script>
  import service from '../service'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import utils from 'common/js/Utils'

  export default {
    name: 'new-profile',
    data () {
      var _this = this
//      var checkProfileName = (rule, value, callBack) => {
//        var params = {
//          field: 'name',
//          name: value
//        }
//        service.checkProfileName(params).then(resp => {
//          if (resp.re === 1) {
//            callBack(undefined)
//          } else {
//            callBack(new Error(_this.renderData.nameExist))
//          }
//        })
//      }
      return {
        newProfile: {
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
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.qianhouNoSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length30Limit,
              message: _this.renderData.length30Limit,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              message: _this.renderData.nameExist,
              test (value) {
                var params = {
                  field: 'name',
                  name: value
                }
                return service.checkProfileName(params).then(resp => resp.re === 1)
              },
              trigger: 'input'
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
      addProfile (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = this.newProfile
            if (this.profileInfo.origin) {
              params.uuid = this.profileInfo.origin
              this.profileInfo.origin = ''
              service.copyProfile(params).then(res => {
                this.$emit('refreshList')
                this.visible.dialog = null
              })
            } else {
              service.addProfile(params).then(res => {
                if (res.re === '200') {
                  this.$emit('refreshList')
                  this.visible.dialog = null
                }
              })
            }
          } else {
            return false
          }
        })
//        this.$refs['newProfile'].validate(valid => {
//          if (valid) {
//            var params = this.newProfile
//            if (this.profileInfo.origin) {
//              params.uuid = this.profileInfo.origin
//              this.profileInfo.origin = ''
//              service.copyProfile(params).then(res => {
//                this.$emit('refreshList')
//                this.visible.dialog = null
//              })
//            } else {
//              service.addProfile(params).then(res => {
//                if (res.re === '200') {
//                  this.$emit('refreshList')
//                  this.visible.dialog = null
//                }
//              })
//            }
//          }
//        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    mounted () {
      console.log('传入的数据')
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
