import { fetch } from '../../common/js/Utils'

export default {
  getMt4ChannelList (params) {
    var url = '/api/resource/channel/get_mt4_channel_list'
    return fetch(url, params)
  },
  addMt4Channel (params) {
    var url = '/api/resource/channel/add_mt4_channel'
    return fetch(url, params)
  },
  deleteMt4Channel (params) {
    var url = '/api/resource/channel/delete_mt4_channel'
    return fetch(url, params)
  },
  editMt4Channel (params) {
    var url = '/api/resource/channel/edit_mt4_channel'
    return fetch(url, params)
  }
}
