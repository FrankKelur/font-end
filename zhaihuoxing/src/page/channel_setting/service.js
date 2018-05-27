import { fetch } from '../../common/js/Utils'

export default {
  getTradeChannelList (params) {
    var url = '/api/resource/channel/get_trade_channel_list'
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
  },
  switchMt4Channel (params) {
    var url = '/api/resource/channel/switch_mt4_channel'
    return fetch(url, params)
  },
  getAllCurrency (params) {
    var url = '/api/resource/accountset/get_all_currency'
    return fetch(url, params)
  },
  getPageList (params) {
    var url = '/api/resource/config/get_page_list'
    console.log('params', url, params)
    return fetch(url, params)
  },
  getBankmanageList (params) {
    var url = '/api/resource/channel/get_manager_bank_list'
    console.log('params', url, params)
    return fetch(url, params)
  },
  deleteBankmanage (params) {
    var url = '/api/resource/channel/delete_manager_bank'
    console.log('params', url, params)
    return fetch(url, params)
  },
  checkUnique (params) {
    var url = '/api/resource/channel/check_merchantId_same'
    return fetch(url, params).then(res => {
      return !!res.re
    }).catch(() => {
      return false
    })
  },
  editManageBank (params) {
    var url = '/api/resource/channel/edit_manager_bank'
    console.log('params', url, params)
    return fetch(url, params)
  },
  addbankChannel (params) {
    var url = '/api/resource/channel/add_unionPay_channel'
    return fetch(url, params)
  },
  editbankChannel (params) {
    var url = '/api/resource/channel/edit_unionPay_channel'
    return fetch(url, params)
  },
  editBankChannel (params) {
    var url = '/api/resource/channel/edit_wiredTransfer_channel'
    return fetch(url, params)
  },
  deletebankChannel (params) {
    var url = '/api/resource/channel/delete_bank_channel'
    return fetch(url, params)
  },
  switchControl (params) {
    var url = '/api/resource/channel/switch_bank_channel'
    return fetch(url, params)
  },
  getUnionPayTypeSelect (params) {
    var url = '/api/resource/channel/get_unionPayType_select'
    return fetch(url, params)
  },
  getBankList (params) {
    var url = '/api/resource/channel/get_bank_channel_list'
    return fetch(url, params)
  }
}
