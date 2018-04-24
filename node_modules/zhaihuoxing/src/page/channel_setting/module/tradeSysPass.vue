<template lang="pug">
  .trade-sys-pass(v-loading="loading", :element-loading-text="renderData.loading")
    el-collapse(v-model="activeName")
      el-collapse-item(:title="renderData.mt4Channel" name="mt4")
        .no-data.theme-color-C(v-if="searchMt4Data.length===0")
          | {{renderData.noData}}
        .box-warp.theme-bg-H.theme-box-shadow-D(v-for="(item, index) in searchMt4Data", :key="index")
          .box-header.theme-border-bottom-lightenD12
            span.theme-color-C {{item.channel_name}}
          .box-content
            el-form(label-width="130px" label-position='left' ref="form", :model="item")
              .form-detail
                el-form-item(:label="renderData.mt4ServerName", prop="data.mt4ServerName", :rules="{ required: true }")
                  p.theme-color-C(v-text='item.data.mt4ServerName' v-ellipsis-title="")
                el-form-item(:label="renderData.ip", prop="data.ip", :rules="{ required: true }")
                  p.theme-color-C(v-text='item.data.ip' v-ellipsis-title="")
                el-form-item(:label="renderData.port", prop="data.port", :rules="{ required: true }")
                  p.theme-color-C.ellipsis-title(v-text='item.data.port' v-ellipsis-title="")
                el-form-item(:label="renderData.managerLogin", prop="data.managerLogin", :rules="{ required: true }")
                  p.theme-color-C.ellipsis-title(v-text='item.data.managerLogin' v-ellipsis-title="")
                el-form-item(:label="renderData.managerPassword", prop="data.managerPassword", :rules="{ required: true }")
                  p.theme-color-C.ellipsis-title(v-text='item.data.managerPassword' v-ellipsis-title="")
          .box-footer
            i.el-icon-delete.icon.icon-margin-right.theme-color-D.theme-color-lightenA10-hover.theme-color-darkenA10-active(@click="delForm('form',item,index)")
            i.el-icon-edit.icon.theme-color-D.theme-color-lightenA10-hover.theme-color-darkenA10-active(@click="editForm('form',item,index)")
        .add-form
          b-button(@click="addForm") {{renderData.addChannel}}
          // b-button(type="default", @click="checkAllForm") 查看所有表单数据

    component(:is="visible.dialog", :visible="visible", :renderData='renderData', :itemData='itemData', @refreshList="initList")

      el-collapse-item(title="MT5" name="mt5")
        | MT5
</template>

<script>
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import tradeSysPassDialog from './tradeSysPassDialog.vue'
  import service from './../service'

  export default {
    data () {
      var renderData = window.renderData.components.channel_setting.channel_setting_trade
      return {
        loading: true,
        activeName: ['mt4'],
        searchMt4Data: [],
        itemData: null,
        renderData: renderData,
        visible: {
          dialog: null
        }
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
              this.searchMt4Data.splice(index, 1)
              this.$message({
                message: this.renderData.deleteSucceed,
                type: 'success'
              })
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
        this.visible.dialog = 'tradeSysPassDialog'
        this.itemData = JSON.parse(JSON.stringify(item)) // 引用类型值拷贝
      },
      addForm () {
        console.log(this.searchMt4Data)
        var name = ''
        if (this.searchMt4Data.length === 0) {
          name = this.renderData.mt4Channel + 1
        } else {
          var channelName = this.searchMt4Data[this.searchMt4Data.length - 1].channel_name
          var firstName = channelName.substring(0, channelName.length - 1)
          var lastName = parseInt(channelName.substring(channelName.length - 1, channelName.length)) + 1
          name = firstName.toString() + lastName.toString()
        }
        this.visible.dialog = 'tradeSysPassDialog'
        this.itemData = {
          channel_name: name,
          uuid: '',
          data: {
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
        service.getMt4ChannelList({}).then(data => {
          if (data.length === 0) {
            vm.loading = false
            return
          }
          vm.searchMt4Data = data
          vm.loading = false
        })
      },
      checkAllForm () {
        console.log(this.searchMt4Data)
      }
    },
    mounted () {
      this.initList()
    },
    components: {
      'tradeSysPassDialog': tradeSysPassDialog,
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
        .icon{
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
    .no-data{
      padding: 20px;
      text-align: center;
      font-size: 22px;
    }
    .add-form{
      clear: both;
      margin-left: 1.5%;
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
