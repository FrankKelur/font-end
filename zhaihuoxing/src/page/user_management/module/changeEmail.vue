<template lang="pug">
  b-dialog.change-email(:title="renderData.userManagementListChangeEmail", :show.sync='dialogVisible', width="38%", :show-close="true", :before-close="beforeClose")
    el-form(:model="changeEmailForm", label-width="100px", :rules="rules", ref="changeEmailForm")
      el-form-item(prop="newEmail")
        span.block-label.theme-color-C(v-ellipsis-title='' slot="label") {{renderData.newEmail}}
        b-input(:model.sync="changeEmailForm.newEmail", :placeholder="renderData.pleaseEnter")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="changeEmail", type="primary") {{renderData.confirm}}

</template>

<script>
  import service from '../service'
  import { validator, constants } from 'common/js/Utils'
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'

  export default {
    name: 'change-email',
    data () {
      return {
        dialogVisible: true,
        changeEmailForm: {
          newEmail: ''
        },
        rules: {
          newEmail: [
            {
              required: true,
              message: this.renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: constants.emailReg,
              validator: validator.validate,
              message: this.renderData.formatError,
              trigger: 'blur'
            },
            {
              validator: validator.validate,
              message: this.renderData.emailExist,
              test (val) {
                var params = {
                  field: 'email',
                  value: val
                }
                return service.emailUnique(params).then(res => {
                  return !!res.re
                })
              },
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
      currUser: {
        type: Object,
        required: true
      }
    },
    methods: {
      changeEmail () {
        this.$refs['changeEmailForm'].validate(valid => {
          if (!valid) {
            return
          }
          var params = {
            uid: this.currUser.uid,
            email: this.changeEmailForm.newEmail
          }
          service.changeEmail(params).then(res => {
            if (res.re === '200') {
              this.visible.dialog = null
            }
          })
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      }
    },
    components: {
      BDialog,
      BInput,
      BButton
    },
    async mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .block-label {
    line-height: 1em;
  }
</style>
