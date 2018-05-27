<template lang="pug">
  b-dialog.delete_group-dialog(:show.sync='dialogVisible', :title="renderData.groupManagementDeleteGroup", :show-close="true", width="35%", :before-close="beforeClose")
    el-form(:model="delete_group" label-width="35px")
      el-form-item
        b-radio(:model.sync="delete_group.type", label="single").radio-box
          span.radio-span {{renderData.deleteSingle}}
        b-radio(:model.sync="delete_group.type", label="together").radio-box
          span.radio-span {{renderData.deleteTogether}}
    template(slot="footer")
      b-button(@click="cancel") {{renderData.cancel}}
      b-button(type="primary", @click="confirm") {{renderData.confirm}}
</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BDialog from 'components/BDialog'
  import BRadio from 'components/BRadio'
  import BSelect from 'components/BSelect'
  import service from '../service'

  export default {
    name: 'delete-group',
    data () {
      return {
        rules: {
          subgroup: [{required: true, message: this.renderData.errorPleaseEnter, trigger: 'blur,change'}]
        },
        dialogVisible: true,
        delete_group: {
          type: 'single'
        }
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      confirm () {
        var params = {
          gid: this.currRow.gid,
          type: this.delete_group.type
        }
        service.deleteGroup(params).then(res => {
          this.visible.dialog = null
          var params = {
            gid: this.currRow.father_gid
          }
          service.getGroupList(params).then(({data}) => {
            data.forEach(child => {
              child.father = this.currRow.father
            })
            this.currRow.father.children = data
          })
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

<style lang="less" scoped>
  .radio-box {
    margin-left: 15px;
  }
</style>
