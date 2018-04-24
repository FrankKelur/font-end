import { fetch } from '../../common/js/Utils'

export default {
  addUser (params) {
    var url = '/api/rbac/user/add_user'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     'target_components': {
    //       'bubble': {
    //         'action': 'show',
    //         'params': {
    //           'type': 'success',
    //           'title': '保存成功!'
    //         }
    //       }
    //     },
    //     'type': 'operateComponents'
    //   })
    // })
  }
}
