<template lang="pug">
  b-dialog.copy-type(:show='true', :title="renderData.copyUserType", width="38%", :show-close="true", :before-close="beforeClose")
    el-form(label-width="100px", :model="copyForm", ref="copyForm", :rules="rules")
      el-form-item(prop="userType", :label="renderData.userType")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="copyForm.userType")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="copyData", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import service from '../service'
  import { constants, validator } from 'common/js/Utils'

  export default {
    name: 'copy-type',
    data () {
      var renderData = Object.assign({}, this.renderData)
      return {
        copyForm: {
          userType: ''
        },
        rules: {
          userType: [
            {
              required: true,
              message: renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: constants.length30Limit,
              message: renderData.length30LimitNoSpace,
              validator: validator.validate,
              trigger: 'blur'
            },
            {
              message: renderData.qianhouNoSpace,
              test (val) {
                return val.trim() === val
              },
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
      visible: {
        type: Object,
        required: true
      },
      typeInfo: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      copyData () {
        this.$refs['copyForm'].validate(valid => {
          if (!valid) {
            return
          }
          this.typeInfo.uuid = ''
          this.typeInfo.name = this.copyForm.userType
          var params = {
            uuid: '',
            data: this.typeInfo
          }
          service.saveType(params).then(resp => {
            if (resp.re === '200') {
              this.visible.dialog = null
              this.$emit('refresh-type-list', resp.data.uuid)
            }
          })
        })
      }
    },
    mounted () {
      console.log('传进来的数据')
      console.log(this.typeInfo)
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
