var fs = require('fs')
var tmpDir = __dirname + '/../tmp'
if (!fs.existsSync(tmpDir)) {
  fs.mkdir(tmpDir)
}
module.exports = {}
