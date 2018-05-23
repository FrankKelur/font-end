<template lang="pug">
  .trade-sys-pass(v-loading="loading", :element-loading-text="renderData.loading")
    el-collapse(v-model="activeName")
      el-collapse-item.theme-color-C(:title="renderData.mt4Channel" name="mt4" v-if="mt4Pass")
        .box-warp.theme-bg-H.theme-box-shadow-D(v-for="(item, index) in searchMt4Data", :key="index")
          .box-header.theme-border-bottom-lightenD12
            span.theme-color-C {{item.data.channelName.label}}
            .switch
              b-switch(:width="45", :model="item.switch === 0 ? false : true", @change="changeSwitch(item)")
              span.theme-color-C(v-if="item.switch===1") {{renderData.able}}
              span.theme-color-C(v-if="item.switch===0") {{renderData.disable}}
          .box-content
            el-form(label-width="140px" label-position='left' ref="form", :model="item")
              .form-detail
                el-form-item(prop="data.mt4ServerName", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.mt4ServerName", v-ellipsis-title="")
                  p.theme-color-C(v-text='item.data.mt4ServerName' v-ellipsis-title="")
                el-form-item(prop="data.ip", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.ip", v-ellipsis-title="")
                  p.theme-color-C(v-text='item.data.ip' v-ellipsis-title="")
                el-form-item(prop="data.port", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.port", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.data.port' v-ellipsis-title="")
                el-form-item(prop="data.managerLogin", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.managerLogin", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.data.managerLogin' v-ellipsis-title="")
                el-form-item(prop="data.managerPassword", :rules="{ required: true }")
                  template(slot="label")
                    span.theme-color-C.inline-label(v-text="renderData.managerPassword", v-ellipsis-title="")
                  p.theme-color-C.ellipsis-title(v-text='item.data.managerPassword' v-ellipsis-title="")
          .box-footer
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="delForm('form',item,index)")
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="editForm('form',item,index)")
        .add-form
          b-button(@click="addForm") {{renderData.addChannel}}

    component(:is="visible.dialog", :visible="visible", :renderData='renderData', :itemData='itemData', :optType='optType', @refreshList="initList")

</template>

<script>
  import BSwitch from 'components/BSwitch'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import tradeSysPassDialog from './tradeSysPassDialog.vue'
  import service from './../service'

  export default {
    data () {
      var renderData = window.renderData.components.channel_setting.channel_setting_trade
      return {
        loading: true,
        activeName: [],
        searchMt4Data: [],
        searchMt5Data: [],
        mt4Pass: false,
        mt5Pass: false,
        itemData: null,
        renderData: renderData,
        visible: {
          dialog: null
        },
        optType: ''
      }
    },
    methods: {
      delForm (formName, item, index) {
        console.log(formName, item, index)
        this.$confirm(this.renderData.deleteChannelText, this.renderData.toolText, {
          confirmButtonText: this.renderData.confirm,
          cancelButtonText: this.renderData.cancel,
          type: 'warning'
        }).then(() => {
          let params = {
            uuid: item.uuid
          }
          service.deleteMt4Channel(params).then(data => {
            if (data.re === '200') {
              this.$message({
                message: this.renderData.deleteSucceed,
                type: 'success'
              })
              this.initList()
            } else {
              this.$message({
                message: this.renderData.netErrorDeleteFail,
                type: 'error'
              })
            }
          })
        }).catch(() => {
        })
      },
      editForm (formName, item, index) {
        console.log(formName, item, index)
        this.optType = 'edit'
        this.visible.dialog = 'tradeSysPassDialog'
        this.itemData = JSON.parse(JSON.stringify(item)) // 引用类型值拷贝
      },
      addForm () {
        console.log(this.searchMt4Data)
//        var name = this.renderData.channelAdd
//        if (this.searchMt4Data.length === 0) {
//          name = this.renderData.mt4Channel + 1
//        } else {
//          var channelName = this.searchMt4Data[this.searchMt4Data.length - 1].channel_name
//          var firstName = channelName.substring(0, channelName.length - 1)
//          var lastName = parseInt(channelName.substring(channelName.length - 1, channelName.length)) + 1
//          name = firstName.toString() + lastName.toString()
//        }
        this.optType = 'add'
        this.visible.dialog = 'tradeSysPassDialog'
        this.itemData = {
//          channel_name: name,
          uuid: '',
          data: {
            channelName: {
              key: '',
              label: ''
            },
            mt4ServerName: '',
            ip: '',
            port: '',
            managerLogin: '',
            managerPassword: ''
          }
        }
      },
      initList () {
        let vm = this
        service.getTradeChannelList({}).then(data => {
          console.log('mt4 channel data', data)
          if (data.mt5) {
            vm.searchMt5Data = data.mt5
            vm.activeName[0] = 'mt5'
            vm.mt5Pass = true
          }
          if (data.mt4) {
            vm.searchMt4Data = data.mt4
            vm.activeName[0] = 'mt4'
            vm.mt4Pass = true
          }
          vm.loading = false
        })
      },
      changeSwitch (item) {
        var switchStatus = ''
        if (item.switch === 0) {
          switchStatus = 'able'
        } else {
          switchStatus = 'disable'
        }
        var params = {
          cid: item.uuid,
          status: switchStatus
        }
        service.switchMt4Channel(params).then(data => {
          this.initList()
        })
      }
    },
    mounted () {
      this.initList()
    },
    components: {
      BSwitch,
      'tradeSysPassDialog': tradeSysPassDialog,
      BIcon,
      BInput,
      BButton
    }
  }
</script>

<style lang="less">
  @import '../../../common/styleSheet/common.less';
  .trade-sys-pass{
    .box-warp{
      float: left;
      width: 48%;
      margin-bottom: 25px;
      border-radius: 4px;
      .box-header{
        height: 58px;
        line-height: 58px;
        border-bottom: 1px solid;
        >span{
          margin-left: 4%;
          font-size: 16px;
          font-weight: bold;
        }
        .switch{
          text-align: right;
          width: 30%;
          float: right;
          margin-right: 5%;
          font-size: 14px;
          .el-switch{
            margin-right: 10%;
          }
        }
      }
      .box-content{
        padding: 25px 4% 30px;
        .el-form-item{
          margin-bottom: 0;
        }
        .form-detail{
          p{
            width: 100%;
          }
        }
      }
      .box-footer{
        padding: 0 5% 25px;
        text-align: right;
        .icon-margin-right{
          margin-right: 4%;
        }
        .b-icon{
          margin-left: 4%;
          margin-bottom: 25px;
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
    .box-warp:nth-of-type(even){
      margin-left: 1%;
    }
    .box-warp:nth-of-type(odd){
      margin-left: 1.5%;
    }
    .add-form{
      clear: both;
      margin-left: 1.5%;
    }
    .el-collapse-item__header {
      color: inherit;
    }
    .el-collapse-item__content{
      padding: 10px 0 30px !important;
    }
    .el-collapse-item__content:after{
      content: " ";
      display: block;
      clear: both;
    }
  }
</style>
