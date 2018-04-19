<template lang="pug">
  .agent_id_setting.theme-border-lightenD12.component#agent_id_setting
    .kongdiv1
      b-title.amt-more-left-in(:title="renderData.agentIdSetting")
        template(slot="icon")
          el-tooltip(class="item" effect="dark", :content="renderData.agentIdSettingInfo" placement="top")
            b-icon.theme-color-A-hover.theme-color-lightenD10.margin-left-10(iconName='info')

    el-collapse.amt-more-left-in(v-model="activeName" v-if="comAuth.agent_id_setting_default")
      el-collapse-item(v-for="(item, index) in searchData", :title="item.channel_name", :name="item.channel_name", :key="index")
        el-form(label-position='left' ref="form", :model="item", :rules="rules")
          el-form-item
            b-checkbox(:model.sync="item.showOnRegistration", @change="showAgentIdClick(item, item.showOnRegistration)") {{renderData.showOnRegistration}}

          el-form-item
            b-checkbox(:model.sync="item.required", @change="agentIdRequireClick(item, item.required)") {{renderData.agentIdRequired}}

          el-form-item(label-width="140px" prop="defaultAgentId")
            template(slot="label")
              span.theme-color-C.inline-label(v-text="renderData.defaultAgentId", v-ellipsis-title="")
            b-input(:model.sync="item.defaultAgentId", :placeholder="renderData.pleaseEnter")

        b-button(type="primary", @click.native='saveData(item, index)') {{renderData.save}}
</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BCheckbox from 'components/BCheckbox'
  import BInput from 'components/BInput'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'
  import utils from 'common/js/Utils'

  export default {
    name: 'agent_id_setting',
    mixins: [componentMixin],
    data () {
      var comAuth = window.renderData.components.agent_id_setting
      var renderData = Object.assign({}, comAuth.agent_id_setting_auth, comAuth.agent_id_setting_default)
      return {
        comAuth: comAuth,
        renderData: renderData,
        activeName: [],
        searchData: [],
        rules: {
          defaultAgentId: [
            {
              regex: utils.constants.mustNumber,
              message: renderData.numberOnly,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      saveData (item, formIndex) {
        let vm = this
        vm.$refs['form'][formIndex].validate(valid => {
          if (valid) {
            let params = {
              cid: item.cid,
              data: {
                showOnRegistration: item.showOnRegistration,
                required: item.required,
                defaultAgentId: item.defaultAgentId
              }
            }
            service.editAgentId(params).then(data => {
              if (data.agentid) {
                vm.$message({
                  type: 'success',
                  message: vm.renderData.saveSucceed
                })
              } else {
                vm.$message({
                  type: 'error',
                  message: vm.renderData.netErrorSaveFail
                })
              }
            })
          }
        })
      },
      showAgentIdClick (item, data) {
        if (data === false) {
          item.required = false
        }
      },
      agentIdRequireClick (item, data) {
        if (data === true) {
          item.showOnRegistration = true
        }
      },
      init () {
        service.getAgentIdList({}).then(data => {
          this.searchData = data
          this.activeName.push(data[0].channel_name)
        })
      }
    },
    mounted () {
      let vm = this
      if (vm.comAuth.agent_id_setting_default) {
        vm.init()
      }
    },
    components: {
      BTitle,
      BButton,
      BIcon,
      BCheckbox,
      BInput
    }
  }
</script>

<style lang="less">
  #agent_id_setting {
    .b-title{
      margin-bottom: 5px !important;
    }
    .el-collapse-item__content{
      padding: 25px 1.2% 45px;
      .el-form-item:nth-child(1){
        margin-bottom: 15px;
      }
      .el-form-item:nth-child(2){
        margin-bottom: 20px;
      }
      .el-form-item:nth-child(3){
        margin-bottom: 35px;
        margin-left: -10px;
      }
      .el-input__inner{
        width: 425px;
      }
    }
  }
</style>
