/* eslint-disable */
// import { fetch } from 'common/js/Utils'

export default {
  getList (params = {}, url = '') {
    return Promise.resolve({
      data: [],
      total: '100'
    })
  },
  delete (row, page) {
    // z todo delete row from page data
    return Promise.resolve({
      re: 200
    })
  },
  getTableConfig (url = '', params = {}) {
    // var page = JSON.parse(localStorage.getItem('pages'))[0]
    // var formItemList = JSON.parse(localStorage.getItem(page)) || []
    var formItemList = JSON.parse(localStorage.getItem(url)) || []
    return Promise.resolve({
      headerCols: formItemList.map(item => ({field: item.key, label: item.label})),
      searchFields: formItemList.map(item => ({
        field: item.key,
        type: item.type,
        label: item.label,
        width: 3,
        placeholder: item.placeholder
      }))
    })
  }
}
