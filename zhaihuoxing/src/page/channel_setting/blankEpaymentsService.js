import { fetch } from '../../common/js/Utils'

export default {
  getSupportCurrencyEpaymentsSelect (params) {
    var url = '/api/resource/channel/get_supportCurrency_epayments_select'
    return fetch(url, params)
  },
  editEpaymentsChannel (params) {
    var url = '/api/resource/channel/edit_epayments_channel'
    return fetch(url, params)
  }
}
