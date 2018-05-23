import { fetch } from '../../common/js/Utils'

export default {
  editWechatChannel (params) {
    var url = '/api/resource/channel/edit_wechat_channel'
    return fetch(url, params)
  }
}
