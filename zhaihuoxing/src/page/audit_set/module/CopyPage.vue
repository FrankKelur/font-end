<template lang="pug">
  b-dialog.copy-page(:show.sync='dialogVisible', :title="renderData.copyPage", :show-close="true", width="38%", :before-close="beforeClose")
    el-form(:rules="rules", ref="copyPage", :model="copyPageInfo", label-width="140px", label-position="left")
      el-form-item(prop="name")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.auditPageName", v-ellipsis-title="")
        b-input(:model.sync="copyPageInfo.name", :placeholder="renderData.pleaseInput")
      el-form-item(prop="description.label")
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.description", v-ellipsis-title="")
        b-input(:model.sync="copyPageInfo.description.label", :placeholder="renderData.pleaseInput")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="copyPage", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BInput from 'components/BInput'
  import service from '../service'
  import { validator } from 'common/js/Utils'

  export default {
    name: 'copy-page',
    data () {
      var _this = this
      return {
        copyPageInfo: {
          name: '',
          description: {
            label: '',
            key: ''
          }
        },
        rules: {
          name: [
            {
              required: true,
              trigger: 'blur',
              message: _this.renderData.pleaseInput
            },
            {
              validator: validator.validate,
              test (val) {
                return val.trim() === val
              },
              trigger: 'blur',
              message: _this.renderData.noAllowSpace
            }
          ],
          'description.label': [
            {
              validator: validator.validate,
              test (val) {
                return val.trim() === val
              },
              trigger: 'blur',
              message: _this.renderData.noAllowSpace
            }
          ]
        },
        dialogVisible: true,
        showClose: false
      }
    },
    props: {
      renderData: {
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
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      copyPage () {
        var params = {
          uuid: this.currRow.uuid,
          key: this.currRow.currPage.key
        }
        Object.assign(params, this.copyPageInfo)
        service.copyPage(params)
        this.visible.dialog = null
      }
    },
    mounted () {
    },
    components: {
//      BIcon,
      BInput,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .copy-page {
  }
</style>
