// import { fetch } from 'common/js/Utils'

export default {
  saveEnable (params) {
    var url = '/api/resource/audit_setting/add_custom_audit_start_page'
    console.log('params', url, params)
    localStorage.setItem(params.data.name, JSON.stringify(params.data.dataSource))
    var pages = JSON.parse(localStorage.getItem('pages')) || []
    if (!pages.includes(params.data.name)) {
      pages.push(params.data.name)
      localStorage.setItem('pages', JSON.stringify(pages))
    }
    // return fetch(url, params)
    return new Promise((resolve) => {
      resolve({
        'target_components': {
          'bubble': {
            'action': 'show',
            'params': {
              'type': 'failed',
              'title': '网络错误！'
            }
          }
        },
        'type': 'operateComponents'
      })
    })
  },
  getAuditInfo (params) {
    var url = '/api/resource/audit_setting/getAuditInfo'
    console.log(url, params)
    // return fetch(url, params)
    // var formItemList = JSON.parse(localStorage.getItem(page)) || []
    return new Promise((resolve) => {
      resolve({
        re: '200',
        data: {
          name: '',
          description: '',
          formItemList: []
        }
      })
    })
  }
}
