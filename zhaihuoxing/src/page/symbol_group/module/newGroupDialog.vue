<template lang="pug">
  b-dialog.new-group-dialog(:show='true', :title="renderData.newSymbolGroup", :show-close="true", :before-close="beforeClose")
    el-form(:model="name", ref="name", label-width="140" label-position='left')
      el-form-item(:label="renderData.groupName", prop="groupName", :rules="rules.groupName")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="name.groupName")
    template(slot="footer")
      b-button(@click="cancelForm") {{renderData.cancel}}
      b-button(@click="confirm" type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BIcon from 'components/BIcon'
  import utils from 'common/js/Utils'

  export default {
    name: 'new-group-dialog',
    data () {
      var vm = this
      return {
        name: {
          groupName: ''
        },
        rules: {
          groupName: [
            { required: true, message: vm.renderData.pleaseEnterGroupName, trigger: 'blur' },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: vm.renderData.noSpace,
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
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      cancelForm () {
        this.visible.dialog = null
      },
      confirm () {
        this.visible.dialog = null
        this.$emit('listenToDialog')
      }
    },
    mounted () {
    },
    components: {
      BIcon,
      BDialog,
      BInput,
      BButton,
      BSelect
    }
  }
</script>

<style lang="less">
  .new-group-dialog{}
</style>
