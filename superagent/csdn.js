const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

function spiderFun (url, cb) {
  return new Promise((resolve, reject) => {
    superagent.get(url).end((err, res) => {
      if (err) {
        console.log('url', url)
        resolve(null)
        return
      }
      let $ = cheerio.load(res.text)
      resolve($)
    })
  })
}

async function getArticle (url) {
  var url = 'http://blog.csdn.net/jiangwei0910410003/article/details/78967031'
  var $ = await spiderFun(url)
  if (!$) {
    return null
  }
  var res = {
    title: $('#article_details .article_title').text(),
    content: Array.from($('#article_details #article_content').children()).map(elm => {
      var node = $(elm)
      if (elm.tagName === 'h1') {
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
    })
  }
  return res
}

async function getSubClass ({url, name}) {
  var $ = await spiderFun(url)
  var lis = Array.from($('#feedlist_id li h2 a'))
  var pages = lis.map(liElm => {
    var li = $(liElm)
    var articleList = [{
      title: li.text(),
      url: li.attr('href')
    }]
    return {
      pageName: li.text(),
      articleList: articleList
    }
  })
  return pages
}


async function getCls () {
  var url = 'https://www.csdn.net/'
  var $ = await spiderFun(url)
  var lis = Array.from($('#nav ul li a'))
  var res = lis.map(li => {
    li = $(li)
    return {
      url: url + li.attr('href'),
      name: li.text()
    }
  })
  console.log('getCls', res)
  return new Promise((resolve, reject) => {
    res.forEach(async (group, idx) => {
      group.children = await getSubClass(group)
      // console.log('\n\n\ngroup.children\n\n\n')
      if (idx === res.length - 1) {
        resolve(res)
      }
    })
  })
}

getCls().then(res => {
  var res = JSON.stringify(res)
  fs.appendFile('csdn.txt', res, (err) => {
    if (err) {
      console.log('err', err)
    }
  })
  // console.log('===============\n\n\n\n', res, '\n\n\n\n===============')
})