<template lang="pug">
  b-dialog.manageBank(:show='true', :title="renderData.bankManagement", :show-close="true", :before-close="beforeClose")
    span {{renderData.bankName}}
    el-form(ref="form")
      el-form-item.short-form-item(v-for="(item,index) in data", :key="index")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="item.label")
      el-form-item.short-form-item(v-for="(item,index) in data", :key="index")
        b-input(:placeholder="renderData.pleaseEnter", :model.sync="item.label")
        b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active.margin-left-10(iconName="delete1", @click="deleteitem(item)")
    .add(@click="add")
      i.el-icon-plus.theme-color-darkenA10.theme-color-lightenA10-hover.theme-color-A-active
      span.theme-color-darkenA10.theme-color-lightenA10-hover.theme-color-A-active {{renderData.addBank}}
    template(slot="footer")
      b-button(@click="save" type="primary") {{renderData.confirm}}
      b-button(@click="cancelForm") {{renderData.back}}
</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import service from './../service'

  export default {
    name: 'manageBank',
    data () {
      var renderData = window.renderData.components.channel_setting.channel_setting_bank
      return {
        renderData: renderData,
        data: [{label: ''}]
      }
    },
    props: {
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      deleteitem (item) {
        let params = { managerbank_id: item.managerbank_id }
        return service.deleteBankmanage(params).then(data => {
          this.getBankmanageList()
        })
      },
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      cancelForm () {
        this.visible.dialog = null
      },
      add () {
        if (this.data.length > 0 && this.data[this.data.length - 1].label === '' && !this.data[this.data.length - 1].key) {
          return
        }
        this.data.push({label: ''})
        console.log(this.data)
      },
      save () {
        let params = { data: this.data }
        return service.editManageBank(params).then(data => {
          this.visible.dialog = null
        })
      },
      getBankmanageList () {
        var params = {}
        return service.getBankmanageList(params).then(data => {
          this.data = data
        })
      }
    },
    mounted () {
      this.getBankmanageList()
    },
    components: {
      BInput,
      BIcon,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less">
  @import '../../../common/styleSheet/common.less';
  .manageBank{
    .el-dialog .el-dialog__body {
      max-height: 50%!important;
      overflow-y: auto!important;
    }
    .el-form-item{
      margin-bottom: 15px;
    }
    .short-form-item{
      display: inline-block;
      width: 40%;
    }
    .add {
      margin-top: 10px;
      cursor:pointer;
      margin-left: 2%;
      .el-icon-plus{
        font-weight: bolder;
        margin-right: 3px;
      }
    }
  }
</style>
