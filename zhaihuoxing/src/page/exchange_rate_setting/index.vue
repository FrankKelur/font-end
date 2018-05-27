<template lang="pug">
  .exchange_rate_setting.theme-border-lightenD12.component#exchange_rate_setting
    b-dialog.delete-dialog(:show.sync='dialogVisible', :title="renderData.deleteExchangeRate", :show-close="true", width="35%")
      .dialog_left
        b-icon.theme-color-F.dialog_icon(icon-name='attention', size="30px")
      .dialog_right
        span.theme-color-C {{renderData.deleteExchangeRateText}}
      template(slot="footer")
        b-button(@click="dialogVisible = false") {{renderData.cancel}}
        b-button(@click="confirmDelete", type="primary") {{renderData.confirm}}
    .exchange_rate_setting_header
      b-title(:title="renderData.exchangeRateSettingAuth")
    .exchange_rate_setting_bodyer
      .bodyer_elrow1
        el-row
          el-col.base(:span="5") {{renderData.baseCurrency}}
          el-col.money(:span="5") {{renderData.moneyOfAmount}}
          el-col.exchangeRate(:span="7") {{renderData.exchangeRate}}
      .form
        .bodyer_elrow2
          el-form(:model="Rows")
            el-row.row(v-for="(itemRow,index) in Rows.data", :key="index")
              el-col.col(:span="5")
                b-select(:placeholder='itemRow.renderData', :model.sync="itemRow.baseCurrency", filterable, @click.native="changePlaceholder(itemRow)", v-on:blur="blur(itemRow)")
                  el-option(v-for="itemSelect in selectItems", :key="itemSelect", :label="itemSelect", :value="itemSelect")
              el-col.col(:span="5")
                b-select(:placeholder='itemRow.renderData1', :model.sync="itemRow.moneyOfAmount", filterable, @click.native="changePlaceholder1(itemRow)", v-on:blur="blur1(itemRow)")
                  el-option(v-for="itemSelect in selectItems", :key="itemSelect", :label="itemSelect", :value="itemSelect")
              el-col.colInput(:span="7")
                el-form-item(:prop="'data.' + index + '.exchangeRate'", label="", :rules="rules")
                  b-input.input(:placeholder="renderData.pleaseEnter", :model.sync="itemRow.exchangeRate")
              el-col.colIcon(:span="5")
                .iconDelete
                  b-icon.theme-color-C.theme-color-G-hover(iconName='delete', @click="deleteRows(index, itemRow.eid)")

        .bodyer_add(@click="addRows")
          i.el-icon-plus.theme-color-darkenA10.theme-color-lightenA10-hover.theme-color-A-active
          span.theme-color-darkenA10.theme-color-lightenA10-hover.theme-color-A-active {{renderData.addSetting}}
    .exchange_rate_setting_footer
      .line.theme-bg-D
      .footer_button
        b-button(type="primary", @click="saveRows") {{renderData.save}}

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BSelect from 'components/BSelect'
  import BInput from 'components/BInput'
  import service from './service'
  import BIcon from 'components/BIcon'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import utils from 'common/js/Utils'

  export default {
    mixins: [componentMixin],
    name: 'exchange_rate_setting',
    data () {
      var exchangeRateSetting = window.renderData.components.exchange_rate_setting
      var renderData = Object.assign({}, exchangeRateSetting.exchange_rate_setting_default, exchangeRateSetting.exchange_rate_setting_auth)
      return {
        thisEid: '',
        dialogVisible: false,
        renderData: renderData,
        selectItems: [],
        Rows: {
          data: [{baseCurrency: '', moneyOfAmount: '', exchangeRate: '', eid: '', renderData: renderData.pleaseSelect, renderData1: renderData.pleaseSelect}]
        },
        rules: [
          {
            regex: utils.constants.onlyNumber,
            message: renderData.onlyNumber,
            validator: utils.validator.validate,
            trigger: 'blur'
          }
        ],
        thisIndex: ''
      }
    },
    methods: {
      blur (item) {
        item.renderData = this.renderData.pleaseSelect
      },
      blur1 (item) {
        item.renderData1 = this.renderData.pleaseSelect
      },
      changePlaceholder (item) {
        console.log(item)
        item.renderData = this.renderData.enterToSearch
      },
      changePlaceholder1 (item) {
        console.log(item)
        item.renderData1 = this.renderData.enterToSearch
      },
      deleteRows (index, eid) {
        this.dialogVisible = true
        this.thisIndex = index
        this.thisEid = eid
      },
      saveRows () {
        console.log(this.Rows.data)
        for (var i = 0; i < this.Rows.data.length; i++) {
          delete this.Rows.data[i].renderData
          delete this.Rows.data[i].renderData1
          if (!this.Rows.data[i].eid) {
            delete this.Rows.data[i].eid
          }
        }
        var params = {
          data: this.Rows.data
        }
        service.saveCurrency(params).then(data => {
          console.log(data)
          service.getList({}).then(data => {
            for (var i = 0; i < data.length; i++) {
              data[i].renderData = this.renderData.pleaseSelect
              data[i].renderData1 = this.renderData.pleaseSelect
            }
            console.log(data)
            this.Rows.data = data
          })
        })
      },
      addRows () {
        this.Rows.data.push({baseCurrency: '', moneyOfAmount: '', exchangeRate: '', eid: '', renderData: this.renderData.pleaseSelect, renderData1: this.renderData.pleaseSelect})
        console.log(this.Rows.data)
      },
      confirmDelete () {
        this.dialogVisible = false
        this.Rows.data.splice(this.thisIndex, 1)
        var params = {
          eid: this.thisEid
        }
        service.deleteCurrency(params).then(data => {
          console.log(data)
        })
      }
    },
    async mounted () {
      service.getCurrency({}).then(data => {
        this.selectItems = data
      })
      service.getList({}).then(data => {
        for (var i = 0; i < data.length; i++) {
          data[i].renderData = this.renderData.pleaseSelect
          data[i].renderData1 = this.renderData.pleaseSelect
        }
        console.log(data)
        this.Rows.data = data
      })
    },
    components: {
      BSelect,
      BInput,
      service,
      BIcon,
      BTitle,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less">
  .exchange_rate_setting {
    position: relative;
    .exchange_rate_setting_bodyer{
      .form{
        height: 72%;
        overflow-y: auto;
      }
    }
    .line {
      width: 100%;
      height: 1px;
    }
    .footer_button {
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: 1.2%;
    }
    .bodyer_elrow1 {
      margin-left: 2.3%;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    .bodyer_elrow2 {
      margin-top: 10px;
      margin-left: 1.2%;
    }
    .bodyer_add {
      cursor:pointer;
      margin-left: 2%;
      margin-bottom: 30px;
      .el-icon-plus{
        font-weight: bolder;
        margin-right: 3px;
      }
    }
    .col {
      margin-right: 8px;
    }
    .colInput {
      margin-left: 8px;
    }
    .colIcon {
      margin-left: 15px;
    }
    .money {
      margin-left: 10px;
    }
    .exchangeRate {
      margin-left: 26px;
    }
    .iconDelete {
      margin-top: 10px;
    }
    .dialog_left {
      display: inline-block;
    }
    .el-dialog__body{
      border-bottom: 0 !important;
    }
    .dialog_right {
      display: inline-block;
      margin-left: 22px;
      position: absolute;
      top: 64px;
    }
    .dialog_icon {
      .icon {
         cursor: default !important;
      }
    }
  }
</style>
