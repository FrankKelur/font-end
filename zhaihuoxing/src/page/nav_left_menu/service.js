import { fetch } from 'common/js/Utils'

export default {
  getPageList (params) {
    var url = '/api/resource/nav/get_page_list'
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     data: [
    //       {
    //         'children': [
    //           {
    //             'children': [
    //               {
    //                 'children': [],
    //                 'has_children': false,
    //                 'icon': 'message_success',
    //                 'pid': 'fa3e143e78fe11e7aaee0050569e12e',
    //                 'title': '1-1-1',
    //                 'url': '/test2'
    //               }
    //             ],
    //             'has_children': true,
    //             'icon': 'delete',
    //             'pid': 'fa3e143e78fe11e7aaee0050569e12e',
    //             'title': '1-1',
    //             'url': ''
    //           }
    //         ], // array<object> 子页面列表
    //         'has_children': true, // bool 是否有子页面
    //         'icon': 'error', // string icon
    //         'pid': 'fa3e143e78fe11e7aaee0050569e145e',
    //         'title': '1', // string 页面标题
    //         'url': '' // string 页面url
    //       },
    //       {
    //         'children': [], // array<object> 子页面列表
    //         'has_children': false, // bool 是否有子页面
    //         'icon': 'message_success', // string icon
    //         'pid': 'fa3e143e78fe11e7aaee0050569e145e',
    //         'title': '2', // string 页面标题
    //         'url': '/test' // string 页面url
    //       }
    //     ]
    //   })
    // })
  }
}
