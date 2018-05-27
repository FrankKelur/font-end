function MuGuObj () {}
// 个人账号页面，卡片需要类似表格列的权限控制的数据处理方法，console(renderData查看数据格式和individual_account的mock写法)
MuGuObj.prototype.handleHeaderColsAuth = function (data) {
  if (!data.headerCols || !(data.headerCols instanceof Array)) {
    return
  }
  for (let i = 0; i < data.headerCols.length; i++) {
    if (data[data.headerCols[i].auth]) {
      console.warn('权限headerCols中与外层key为：' + data.headerCols[i].auth + '重复,请去重新配置')
      return
    }
    if (data.headerCols[i].authWenAn) {
      data[data.headerCols[i].auth] = data.headerCols[i].authWenAn
      data[data.headerCols[i].auth].label = data.headerCols[i].label
    } else {
      data[data.headerCols[i].auth] = data.headerCols[i].label
    }
  }
  return data
}
var muguObj = new MuGuObj()
export default muguObj
