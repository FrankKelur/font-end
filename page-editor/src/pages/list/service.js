/* eslint-disable */
// import { fetch } from 'common/js/Utils'

export default {
  delete (row, page) {
    if (!window._cache['_data' + page]) {
      window._cache['_data' + page] = JSON.parse(localStorage.getItem('_data' + page)) || []
    }
    var list = window._cache['_data' + page]
    console.log('delete', row._key, list)
    var list = list.filter(item => item._key !== row._key)
    localStorage.setItem('_data' + page, JSON.stringify(list))
    window._cache['_data' + page] = list
    return Promise.resolve({
      re: 200
    })
  },
  getDetail (row, page) {
    if (!window._cache['_data' + page]) {
      window._cache['_data' + page] = JSON.parse(localStorage.getItem('_data' + page)) || []
    }
    var list = window._cache['_data' + page] || []
    var target = list.find(item => item._key === row._key)
    return Promise.resolve({
      data: target || {}
    })
  },
  edit ({page: page, data: params}) {
    if (!window._cache['_data' + page]) {
      window._cache['_data' + page] = JSON.parse(localStorage.getItem('_data' + page)) || []
    }
    var list = window._cache['_data' + page] || []
    var target = list.find(item => item._key === params._key)
    if (target) {
      Object.assign(target, params)
    } else {
      list.unshift(params)
    }
    localStorage.setItem('_data' + page, JSON.stringify(list))
    window._cache['_data' + page] = list
    return Promise.resolve({
      re: 200
    })
  },
  getTableConfig (page = '', params = {}) {
    // var formItemList = JSON.parse(localStorage.getItem(url)) || []
    var formItemList = JSON.parse(localStorage.getItem(page)) || []
    return Promise.resolve({
      formItemList: formItemList,
      headerCols: formItemList.map(item => ({field: item.key, label: item.label, list: item.list})),
      searchFields: formItemList.map(item => ({
        search: item.search,
        field: item.key,
        dataSource: item.dataSource,
        type: item.type,
        label: item.label,
        width: 3,
        placeholder: item.placeholder
      }))
    })
  }
}
