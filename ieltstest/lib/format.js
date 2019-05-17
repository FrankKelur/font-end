var fs = require('fs');
var str = require('./p1.js');
console.log(typeof str);
console.log(str.length);
var array1;
let reg = /[a-zA-Z]+/g
var res = [];
let preIdx = 0;
let preLen = 0;
while ((array1 = reg.exec(str)) !== null) {
  // console.log('pre, next, preLen', preIdx, array1.index, preLen);
  // console.log('word: ', array1[0]);
  let preStr = str.substring(preIdx + preLen, array1.index);
  res.push(preStr, array1[0]);
  preLen = array1[0].length;
  preIdx = array1.index;
}
res.push(str.substring(preIdx));
var finalRes = {};
var preKey = '';
res.shift();
var arr = res.map((item, idx) => {
  item = item.trim();
  if (idx % 2 === 0) {
    preKey = item;
  } else {
    finalRes[preKey] = item;
  }
});

fs.writeFileSync('./res.json', JSON.stringify(finalRes));