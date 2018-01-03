const superagent = require('superagent')
const cheerio = require('cheerio')

function spiderFun (url, cb) {
  return new Promise((resolve, reject) => {
    superagent.get(url).end((err, res) => {
      if (err) {
        console.log('err', err)
        return
      }
      let $ = cheerio.load(res.text)
      resolve($)
    })
  })
}

async function getArticle (url) {
  // var url = 'http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html'
  var $ = await spiderFun(url)
  var res = {
    title: $('.page-title').text(),
    content: [
      ...Array.from($('#main-content').children()).map(elm => {
        var node = $(elm)
        if (elm.tagName === 'h2') {
          return {
            type: 'h2',
            text: node.text()
          }
        } else {
          if (node.find('img').length) {
            var img = $(node.find('img'))
            return {
              type: 'img',
              src: img.attr('src')
            }
          } else {
            return {
              type: 'p',
              text: node.text()
            }
          }
        }
      }),
      {
        type: 'h2', // p, h2
        text: '编写代码只是软件开发的一小部分，更多的时间往往花在构建（build）和测试（test）。' // pre
      },
      {
        type: 'img',
        src: 'http://www.ruanyifeng.com/blogimg/asset/2017/bg2017121901.png'
      }
    ]
  }
  console.log('getArticle', res)
  return res
}

async function getSubClass ({url, name}) {
  var $ = await spiderFun(url)
  var subGroups = Array.from($('#content .module-content'))
  var groupName = ''
  var articles = subGroups.children().map(grElm => {
    var gr = $(grElm)
    if (grElm.tagName === 'H3') {
      groupName = gr.text()
    } else if (grElm.tagName === 'UL') {
      var links = Array.from(gr.find('a'))
      var articleList = links.map(linkElm => {
        var link = $(linkElm)
        return {
          url: link.attr('src'),
          title: link.text()
        }
      })
      return {
        pageName: groupName,
        articleList: articleList
      }
    }
  })
  articles = articles.filter(Boolean)
  console.log('getSubClass', articles)
  return new Promise((resolve, reject) => {
    var res = []
    articles.forEach(async (page, idx) => {
      var article = await getArticle(page.url)
      res.push(article)
      if (idx === articles.length - 1) {
        resolve(res)
      }
    })
  })
}

async function getCls () {
  var url = 'http://www.ruanyifeng.com/blog/opinions/'
  var $ = await spiderFun(url)
  var lis = Array.from($('#beta-inner .module-list-item a'))
  var res = [
    ...lis.map(li => {
      li = $(li)
      return {
        url: li.attr('src'),
        name: li.text()
      }
    }),
    {
      url: 'http://www.ruanyifeng.com/blog/essays/',
      name: '散文'
    }
  ]
  console.log('getCls', res)
  return new Promise((resolve, reject) => {
    res.forEach((group, idx) => {
      group.children = getSubClass(group)
      if (idx === res.length - 1) {
        resolve(res)
      }
    })
  })
}

var res = JSON.stringify(getCls())
console.log('===============\n\n\n\n', res, '\n\n\n\n===============')
