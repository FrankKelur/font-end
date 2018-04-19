import { fetch } from '../../common/js/Utils'

export default {
  getMt4ChannelSelect (params) {
    var url = '/api/resource/records/get_mt4_channel_select'
    return fetch(url, params)
  }
}
