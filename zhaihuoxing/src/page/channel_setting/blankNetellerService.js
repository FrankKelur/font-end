import { fetch } from '../../common/js/Utils'

export default {
  getSupportCurrencyNetellerSelect (params) {
    var url = '/api/resource/channel/get_supportCurrency_neteller_select'
    return fetch(url, params)
  },
  editNetellerChannel (params) {
    var url = '/api/resource/channel/edit_neteller_channel'
    return fetch(url, params)
  }
}
