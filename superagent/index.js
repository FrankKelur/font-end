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
  // var url = 'http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html'
  var $ = await spiderFun(url)
  if (!$) {
    return null
  }
  var res = {
    title: $('.page-title').text(),
    content: Array.from($('#main-content').children()).map(elm => {
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
    })
  }
  // console.log('getArticle', res)
  return res
}

async function getSubClass ({url, name}) {
  var $ = await spiderFun(url)
  var subGroups = $($('#content #alpha .module-content')[0])
  var groupName = ''
  var pages = Array.from(subGroups.children()).map(grElm => {
    var gr = $(grElm)
    if (grElm.tagName === 'h3') {
      groupName = gr.text()
    } else if (grElm.tagName === 'ul') {
      var links = Array.from(gr.find('a'))
      var articleList = links.map(linkElm => {
        var link = $(linkElm)
        return {
          url: link.attr('href'),
          title: link.text()
        }
      })
      return {
        pageName: groupName,
        articleList: articleList
      }
    }
  })
  pages = pages.filter(Boolean)
  // console.log('getSubClass', pages)
  return pages
  // return new Promise((resolve, reject) => {
  //   pages.forEach(async (page, idx) => {
  //     page.articleList.forEach(async (article, j) => {
  //       Object.assign(article, await getArticle(article.url))
  //       // console.log('\n\n\narticle\n\n\n')
  //       if (idx === pages.length - 1 && j === page.articleList.length - 1) {
  //         resolve(pages)
  //       }
  //     })
  //   })
  // })
}

async function getCls () {
  var url = 'http://www.ruanyifeng.com/blog/opinions/'
  var $ = await spiderFun(url)
  var lis = Array.from($('#beta-inner .module-list-item a'))
  var res = lis.map(li => {
    li = $(li)
    return {
      url: li.attr('href'),
      name: li.text()
    }
  })
  // console.log('getCls', res)
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
  fs.appendFile('tmp.txt', res, (err) => {
    if (err) {
      console.log('err', err)
    }
  })
  // console.log('===============\n\n\n\n', res, '\n\n\n\n===============')
})