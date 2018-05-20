import { fetch } from 'common/js/utils'

export default {
  getMemberDetail (params = {}, url = '/api/member/get_summary_info') {
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: {
    //       refer_code: 'fdfadfewrdfafdaewfeewre',
    //       total_member: '50',
    //       PIB: '10',
    //       MIB: '10',
    //       IB: '30',
    //       self_member: '8', // 有效一代会员数
    //       total_volume: '1232324.24', // 总交易量
    //       self_Bdeposit: '1232324.24', // 个人入金总量
    //       Bdeposit1: '1232324.24', // 一代会员入金总量
    //       total_Bdeposit: '1232324.24', // 团队总入金量
    //       layout_list: [
    //         {
    //           member_count_total: '200',
    //           member_count_pib: '100',
    //           member_count_mib: '50',
    //           member_count_ib: '50',
    //           trade_amount: '1232324.24',
    //           insurance_amount: '1232324.24'
    //         },
    //         {
    //           member_count_total: '200',
    //           member_count_pib: '100',
    //           member_count_mib: '50',
    //           member_count_ib: '50',
    //           trade_amount: '1232324.24',
    //           insurance_amount: '1232324.24'
    //         }
    //       ]
    //     }
    //   })
    // })
    return fetch(url, params)
  },
  getMemberLayout (params = {}, url = '/api/member/get_summary_others') {
    return fetch(url, params)
  }
}
