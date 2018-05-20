<template lang="pug">
  .all-user-list-fund-setting
    .amt-more-left-in
      b-title(title="资金存取设置")

    .amt-more-left-in
      fund-setting(:fundSetting="fundSetting", :data="data" v-if="fundSetting!==null && data!==null" ref="deposit", :renderData="renderData", @back="back")
</template>

<script>
  import BTitle from 'components/BTitle'
  import BInput from 'components/BInput'
  import BIcon from 'components/BIcon'
  import BButton from 'components/BButton'
  import FundSetting from './FundSetting'

  import service from '../service'

  export default {
    data () {
      return {
        fundSetting: null,
        data: null,
        renderData: {
          name: 'ssss'
        }
      }
    },
    methods: {
      back () {
        this.$emit('back')
      },
      getAmountSetting () {
        return service.getAmountSetting({}).then(resp => {
          this.fundSetting = resp
        })
      },
      getFundAmountSetting () {
        let params = {
          target_uid: '94dc598cd96d11e7b9fc0050568ba237'
        }
        return service.getFundAmountSetting(params).then(resp => {
          this.data = resp.data
        })
      }
    },
    async mounted () {
      await this.getAmountSetting()
      await this.getFundAmountSetting()
    },
    components: {
      BTitle,
      BInput,
      BIcon,
      BButton,
      FundSetting
    }
  }
</script>

<style lang="less">
  .all-user-list-fund-setting{}
</style>
