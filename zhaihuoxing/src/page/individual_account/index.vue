<template lang="pug">
  .individual_account.theme-border-lightenD12.component#individual_account
    trade-account.amt-more-left-in(v-if="page==='tradeAccount'", @changePage="changePage")

    create-mt4-account.amt-more-left-in(v-if="page==='createAccount'", @changePage="changePage")

</template>

<script>
  import tradeAccount from './module/tradeAccount.vue'
  import createMt4Account from './module/createMt4Account.vue'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'individual_account',
    mixins: [componentMixin],
    data () {
      var renderData = window.renderData.components.individual_account
      return {
        renderData: renderData,
        page: 'tradeAccount'
      }
    },
    methods: {
      changePage (data) {
        this.page = data
      }
    },
    mounted () {
    },
    components: {
      tradeAccount,
      createMt4Account
    }
  }
</script>

<style lang="less">
  .individual_account {
  }
</style>
