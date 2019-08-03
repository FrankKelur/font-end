const fs = require('fs');
const path = require('path');

let text = fs.readFileSync(path.join(__dirname, 'full-essay.txt'));

var reg = /[A-z]+/g;

var map = {};
var it;
// console.log('text.length', text.length);
while ((it = reg.exec(text))) {
  let [word] = it;
  word = word.toLowerCase();
  // console.log('word', word);
  if (word.length < 5) {
    continue;
  }
  let count = map[word];
  if (!count) {
    count = 1;
  } else {
    count++;
  }
  map[word] = count;
}
let arr = Object.keys(map).map(key => {
  return {
    key,
    val: map[key]
  }
});
arr = arr.sort(({ val: v1 }, { val: v2 }) => {
  return v2 - v1;
});
var map = arr.reduce((re, { key, val }) => ({
  ...re,
  [key]: val
}), {});
fs.writeFileSync(path.join(__dirname, 'writing-vocabulary.json'), JSON.stringify(map));