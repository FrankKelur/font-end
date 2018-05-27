// import fetch from 'common/js/Utils'

export default {
  getData (url, params = {}) {
    var formItemList = JSON.parse(localStorage.getItem(url)) || []
    return Promise.resolve({
      total_num: 50,
      detail: new Array(10).fill('').map(() => formItemList.reduce((res, item, idx) => Object.assign(res, {[item.key]: 'val' + idx}), {}))
    })
  }
}
