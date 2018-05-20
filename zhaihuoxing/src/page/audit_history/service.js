import { fetch } from 'common/js/Utils'

export default {
  getCustomizedAudit (params) {
<<<<<<< HEAD
    var url = '/api/resource/audit_process/get_customized_audit'
=======
    var url = '/api/resource/audit_history/get_customized_audit'
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    console.log('params', url, params)
    return fetch(url, params)
    // return new Promise((resolve, reject) => {
    //   resolve({
    //     re: '200',
    //     data: [
    //       {
    //         label: '自定义审核1',
    //         name: 'c1'
    //       },
    //       {
    //         label: '自定义审核2',
    //         name: 'c2'
    //       },
    //       {
    //         label: '自定义审核3',
    //         name: 'c3'
    //       },
    //       {
    //         label: '自定义审核4',
    //         name: 'c4'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核5',
    //         description: '自定义审核5',
    //         name: 'c5'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核6',
    //         description: '自定义审核6',
    //         name: 'c6'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核7',
    //         description: '自定义审核7',
    //         name: 'c7'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核8',
    //         description: '自定义审核8',
    //         name: 'c8'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核9',
    //         description: '自定义审核9',
    //         name: 'c9'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核10',
    //         description: '自定义审核10',
    //         name: 'c10'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核11',
    //         description: '自定义审核11',
    //         name: 'c11'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核12',
    //         description: '自定义审核12',
    //         name: 'c12'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核13',
    //         description: '自定义审核13',
    //         name: 'c13'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核14',
    //         description: '自定义审核14',
    //         name: 'c14'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核15',
    //         description: '自定义审核15',
    //         name: 'c15'
    //       },
    //       {
    //         icon: 'delete',
    //         label: '自定义审核16',
    //         description: '自定义审核16',
    //         name: 'c16'
    //       }
    //     ]
    //   })
    // })
  }
}

