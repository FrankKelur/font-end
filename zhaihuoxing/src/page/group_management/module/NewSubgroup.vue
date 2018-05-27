<template lang="pug">
  b-dialog.new_subgroup-dialog(:show.sync='dialogVisible', :title="renderData.groupManagementNewSubgroup", :show-close="true", width="38%", :before-close="beforeClose")
    el-form(:model="new_subgroup" label-width="25%", :inline="true", :rules="rules", ref="form")
      el-form-item(prop="subgroup")
        template(slot="label")
          span.theme-color-C(v-text="renderData.groupName")
        b-input(:model.sync="new_subgroup.subgroup", :placeholder="renderData.pleaseEnter").form-input
    template(slot="footer")
      b-button(@click="cancel")
        span {{renderData.cancel}}
      b-button( type="primary", @click="confirm")
        span {{renderData.confirm}}
</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BDialog from 'components/BDialog'
  import BRadio from 'components/BRadio'
  import BSelect from 'components/BSelect'
  import utils from 'common/js/Utils'
  import service from '../service'

  export default {
    name: 'new-subgroup',
    data () {
      return {
        rules: {
          subgroup: [
            {required: true, message: this.renderData.errorPleaseEnter, trigger: 'blur'},
            {
              regex: utils.constants.length30Limit,
              validator: utils.validator.validate,
              message: this.renderData.length30Limit,
              trigger: 'blur'
            }]
        },
        dialogVisible: true,
        new_subgroup: {
          subgroup: ''
        }
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      confirm () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var params = {
              parent: this.currRow.gid,
              group_name: this.new_subgroup.subgroup
            }
            service.newSubgroup(params).then(res => {
              this.visible.dialog = null
            })
          }
        })
      },
      cancel () {
        this.visible.dialog = null
      }
    },
    props: {
      visible: {
        type: Object,
        required: true
      },
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      }
    },
    components: {
      BButton,
      BIcon,
      BInput,
      BDialog,
      BRadio,
      BSelect
    }
  }
</script>

<style lang="less">
  .new_subgroup-dialog{
    .el-form-item{
      width: 100% !important;
      .el-form-item__content{
        width: 75% !important;
      }
    }
  }

</style>
