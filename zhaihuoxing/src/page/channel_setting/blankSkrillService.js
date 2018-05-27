import { fetch } from '../../common/js/Utils'

export default {
  getSupportCurrencySkrillSelect (params) {
    var url = '/api/resource/channel/get_supportCurrency_skrill_select'
    return fetch(url, params)
  },
  editSkrillChannel (params) {
    var url = '/api/resource/channel/edit_skrill_channel'
    return fetch(url, params)
  }
}
