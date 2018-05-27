export default {
  getData (page, params = {}) {
    if (!window._cache['_data' + page]) {
      window._cache['_data' + page] = JSON.parse(localStorage.getItem('_data' + page)) || []
    }
    var data = window._cache['_data' + page].filter(row => Object.keys(params.searchData).every(field => row[field] === params.searchData[field] || !params.searchData[field]))
    var {pageNum: num, pageSize: size} = params
    return Promise.resolve({
      total_num: data.length,
      detail: data.slice(num * (size - 1), size)
    })
  }
}
