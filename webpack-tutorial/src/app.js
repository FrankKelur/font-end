var cat = require('./cat')
var dogs = require('./dog.json')
console.log('cat', cat)
console.log('dogs', dogs)
import './test.css'

/*
function getLang () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        en: 'zhai',
        cn: '翟1'
      })
    }, 3000)
  })
}

async function init () {
  var res = await getLang()
  console.log('res', res)
}

init()
var arr = [1, 2, 3]
arr.forEach(item => {
  console.log(item)
})
console.log('init done')

function addType (type) {
  return function (target) {
    target.type = type
  }
}
function addMethod (...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}
var funcs = {
  eat() {
    console.log('eat')
  },
  run() {
    console.log('run')
  }
}
// @addMethod('animal')
@addMethod(funcs)
class Dog {
  constructor (name) {
    this.name = name
  }
}
var d = new Dog('xiaohua')
console.log(d.name, d.type, Dog.type)
d.eat()
d.run()
*/
