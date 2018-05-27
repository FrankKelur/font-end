// import { fetch } from 'common/js/utils'

export default {
  getTreeRootData (params = {}, url = '/api/member/get_self_info') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            user_name: 'uutest1',
            type: '3',
            join_time: '2017/09/09',
            name: 'Frank',
            email: 'frank@kelur.com',
            Bdeposit: '200',
            Bbalance: '100',
            total_num: 300,
            children: []
          }
        })
      }, 1000)
    })
    // return fetch(url, params)
  },
  getTreeData (params = {}, url = '/api/member/get_member_tree') {
    return new Promise((resolve, reject) => {
      setTimeout(res => {
        resolve({
          data: [
            {
              user_name: 'uutest1',
              type: '3',
              join_time: '2017/09/09',
              name: 'Frank',
              email: 'frank@kelur.com',
              Bdeposit: '200',
              Bbalance: '100',
              total_num: 300,
              children: []
            },
            {
              user_name: 'uutest2',
              type: '1',
              join_time: '2017/09/09',
              name: 'Frank',
              email: 'frank@kelur.com',
              Bdeposit: '200',
              Bbalance: '100',
              total_num: 300,
              children: []
            },
            {
              user_name: 'uutest3',
              type: '1',
              join_time: '2017/09/09',
              name: 'Frank',
              email: 'frank@kelur.com',
              Bdeposit: '200',
              Bbalance: '100',
              total_num: 300,
              children: []
            },
            {
              user_name: 'uutest4',
              type: '1',
              join_time: '2017/09/09',
              name: 'Frank',
              email: 'frank@kelur.com',
              Bdeposit: '200',
              Bbalance: '100',
              total_num: 300,
              children: []
            },
            {
              user_name: 'uutest5',
              type: '1',
              join_time: '2017/09/09',
              name: 'Frank',
              email: 'frank@kelur.com',
              Bdeposit: '500',
              Bbalance: '500',
              total_num: 300,
              children: []
            }
          ]
        })
      }, 1000)
    })
    // return fetch(url, params)
  }
}
