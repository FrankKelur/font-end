<template lang="pug">
  .account_setting.theme-border-lightenD12.component#account_setting
    .kongdiv1
      b-title.amt-more-left-in(title="账号设置")

    el-collapse.amt-more-left-in(v-model="activeName")
      el-collapse-item(title="MT4通道1" name="mt4")
        //.no-data.theme-color-C(v-if="searchData.length===0")
        //  | 暂无数据
        .box-content
          el-form(label-width="130px" label-position='left' ref="form")
            el-form-item(label="杠杆")
              .list-item
                b-button.tag-group(size="small" v-for="(item, index) in [1,2,3]", :key="index")
                  span.tag-group-txt(v-ellipsis-title="") 44
                  b-icon.theme-color-C.theme-color-G-hover(iconName="delete", size="12px", @click.native='deleteResource')
                b-button.add-btn(size="small", type="primary") 添加
            el-form-item(label="货币")
              .list-item
                b-button.tag-group(size="small" v-for="(item, index) in [1,2,3]", :key="index")
                  span.tag-group-txt(v-ellipsis-title="") 44
                  b-icon.theme-color-C.theme-color-G-hover(iconName="delete", size="12px", @click.native='deleteResource')
                b-button.add-btn(size="small", type="primary") 添加
            el-form-item(label="账号种类")
              .list-item
                .list-item-left 种类名称
                .list-item-right 起始账号
              .list-item(v-for="item in [1,2,3,4,5]")
                .list-item-left
                  b-checkbox.theme-color-darkenC15() 交易账号
                  i.el-icon-info
                .list-item-right
                  b-input(:model.sync="profileInfo")
</template>

<script>
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BCheckbox from 'components/BCheckbox'
  import BInput from 'components/BInput'
  import componentMixin from 'common/js/componentMixin'
  import service from './service'

  export default {
    name: 'account_setting',
    mixins: [componentMixin],
    data () {
      return {
        profileInfo: '',
        activeName: ['mt4'],
        searchData: []
      }
    },
    methods: {
      deleteResource () {
        alert('删除')
      },
      getAllLeverage () {
        service.getAllLeverage({}).then(data => {
          console.log('杠杆集合', data)
        })
      },
      getAllCurrency () {
        service.getAllCurrency({}).then(data => {
          console.log('货币集合', data)
        })
      },
      getAccountSettingList () {
        service.getAccountSettingList({}).then(data => {
          console.log('账号设置列表', data)
        })
      }
    },
    components: {
      BTitle,
      BButton,
      BIcon,
      BCheckbox,
      BInput
    },
    mounted () {
      this.getAllLeverage()
      this.getAllCurrency()
      this.getAccountSettingList()
    }
  }
</script>

<style lang="less">
  .account_setting {
    position: relative;
    .box-content{
      .list-item{
        .list-item-left{
          display: inline-block;
          width: 180px;
          height: 42px;
          line-height: 42px;
          vertical-align: middle;
        }
        .list-item-right{
          display: inline-block;
          width: 250px;
          height: 42px;
        }
        .tag-group {
          margin: 0 8px 6px 0!important;
          .b-icon {
            margin-left: 14px;
            position: relative;
            bottom: 3px;
          }
          .tag-group-txt {
            max-width: 300px;
            display: inline-block;
            font-size: 14px!important;
          }
        }
      }
    }
  }
</style>
