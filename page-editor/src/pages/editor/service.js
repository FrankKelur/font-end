// import { fetch } from 'common/js/Utils'

export default {
  saveEnable (params) {
    localStorage.setItem(params._key, JSON.stringify(params.dataSource))
    var pages = JSON.parse(localStorage.getItem('pages')) || []
    var target = pages.find(item => item._key === params._key)
    if (!target) {
      pages.push({
        name: params.name,
        _key: params._key
      })
    } else {
      Object.assign(target, {
        name: params.name,
        _key: params._key
      })
    }
    localStorage.setItem('pages', JSON.stringify(pages))
    return Promise.resolve({
      re: 200
    })
  },
  getAuditInfo (key) {
    var pages = JSON.parse(localStorage.getItem('pages')) || []
    var target = pages.find(item => item._key === key) || {}
    var formItemList = JSON.parse(localStorage.getItem(key)) || []
    return new Promise((resolve) => {
      resolve({
        re: '200',
        data: {
          name: target.name || '',
          formItemList: formItemList
        }
      })
    })
  }
}
