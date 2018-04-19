<template lang="pug">
  .complete.theme-border-D
    .img
      i.icon.iconfont(:class="{'icon-user_profile_icon_': submitSucceed, 'icon-user_profile_icon_1': !submitSucceed}")
    .result {{submitSucceed?renderData.auditSucceed:renderData.submitSucceed}}
    .message.theme-border-C {{submitSucceed?renderData.auditSucceedInfo:renderData.submitSucceedInfo}}
    .operation
      b-button(@click="back") {{renderData.checkProfile}}
      b-button(@click="deposit" v-if="submitSucceed", type="primary") {{renderData.deposit}}

</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BAlert from 'components/BAlert'
  import BSelect from 'components/BSelect'
  import CustomForm from '@/page/audit_process/module/CustomForm'

  export default {
    name: 'complete',
    data () {
      var _this = this
      // z todo 用profileInfo.investor_info 里的数据给 formItemList 赋值
      return {
        formItemList: _this.setting.custom.investor_info,
        investorInfo: _this.profileInfo.investor_info
      }
    },
    methods: {
      back () {
        this.visible.page = this.pageList[0]
      },
      deposit () {
        service.deposit()
      }
    },
    props: {
      pageList: {
        required: true,
        type: Array
      },
      renderData: {
        required: true,
        type: Object
      },
      setting: {
        required: true,
        type: Object
      },
      auditFailReason: {
        required: true,
        type: String
      },
      profileInfo: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components: {
      BSelect,
      CustomForm,
      BAlert,
      BButton
    },
    computed: {
      submitSucceed () {
        return this.status === 'success'
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .complete {
    border: 1px solid;
    padding-top: 130px;
    padding-bottom: 192px;
    height: 600px;
    .img, .message, .result, .operation {
      width: 260px;
      text-align: center;
      margin: auto;
    }
    .b-button:nth-child(2) {
      margin-left: 10px;
    }
    .message {
      margin-top: 13px;
      margin-bottom: 10px;
      line-height: 22px;
    }
    i {
      font-size: 160px;
    }
  }
</style>
