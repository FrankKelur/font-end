import { fetch } from '../../common/js/Utils'

export default {
  cancelWithdrawal (params) {
    var url = '/api/resource/funding/cancel_withdrawal'
    console.log('params', url, params)
    return fetch(url, params)
  },
  getDiy (params) {
    var url = '/api/resource/funding/get_withdrawal_list'
    console.log('params', url, params)
    return fetch(url, params)
  }
}
