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

// getCls().then(res => {
//   var res = JSON.stringify(res)
//   fs.appendFile('csdn.txt', res, (err) => {
//     if (err) {
//       console.log('err', err)
//     }
//   })
//   // console.log('===============\n\n\n\n', res, '\n\n\n\n===============')
// })

var csdn = [
  {
    'url': 'https://www.csdn.net//',
    'name': '推荐',
    'children': [
      {
        'pageName': '\n                            京东京麦交易平台设计与实现                        ',
        'articleList': [
          {
            'title': '\n                            京东京麦交易平台设计与实现                        ',
            'url': 'http://blog.csdn.net/dev_csdn/article/details/78981674'
          }
        ]
      },
      {
        'pageName': '\n                            Android逆向之旅---Android中分析某短视频的数据请求加密协议(IDA动态调试SO)第二篇                        ',
        'articleList': [
          {
            'title': '\n                            Android逆向之旅---Android中分析某短视频的数据请求加密协议(IDA动态调试SO)第二篇                        ',
            'url': 'http://blog.csdn.net/jiangwei0910410003/article/details/78967031'
          }
        ]
      },
      {
        'pageName': '\n                            如何搭建视频通信服务器架构                        ',
        'articleList': [
          {
            'title': '\n                            如何搭建视频通信服务器架构                        ',
            'url': 'http://blog.csdn.net/wjmnju/article/details/78969475'
          }
        ]
      },
      {
        'pageName': '\n                            SpringBoot之事务处理机制                        ',
        'articleList': [
          {
            'title': '\n                            SpringBoot之事务处理机制                        ',
            'url': 'http://blog.csdn.net/smartdt/article/details/78834005'
          }
        ]
      },
      {
        'pageName': '\n                            Java基础语法篇（1）                        ',
        'articleList': [
          {
            'title': '\n                            Java基础语法篇（1）                        ',
            'url': 'http://blog.csdn.net/u012834152/article/details/78803989'
          }
        ]
      },
      {
        'pageName': '\n                            这里有几个高手常用的信息渠道                        ',
        'articleList': [
          {
            'title': '\n                            这里有几个高手常用的信息渠道                        ',
            'url': 'http://blog.csdn.net/IMbRl71u7pt5X29rlEu7/article/details/78976855'
          }
        ]
      },
      {
        'pageName': '\n                            你该如何打破自己停滞不前的状态？                        ',
        'articleList': [
          {
            'title': '\n                            你该如何打破自己停滞不前的状态？                        ',
            'url': 'http://blog.csdn.net/IaC743nj0b/article/details/78976654'
          }
        ]
      },
      {
        'pageName': '\n                            中美将依旧引领2018年区块链潮流？                        ',
        'articleList': [
          {
            'title': '\n                            中美将依旧引领2018年区块链潮流？                        ',
            'url': 'http://blog.csdn.net/kXYOnA63Ag9zqtXx0/article/details/78976406'
          }
        ]
      },
      {
        'pageName': '\n                            1月12日，真格基金 X 明星创业公司硅谷招聘会 - 第一波公司名单新鲜出炉！                        ',
        'articleList': [
          {
            'title': '\n                            1月12日，真格基金 X 明星创业公司硅谷招聘会 - 第一波公司名单新鲜出炉！                        ',
            'url': 'http://blog.csdn.net/kXYOnA63Ag9zqtXx0/article/details/78976404'
          }
        ]
      },
      {
        'pageName': '\n                            面向对象：如果你刚好喜欢我，而我又喜欢你，那就在一起吧                        ',
        'articleList': [
          {
            'title': '\n                            面向对象：如果你刚好喜欢我，而我又喜欢你，那就在一起吧                        ',
            'url': 'http://blog.csdn.net/P5dEyT322JACS/article/details/78956424'
          }
        ]
      },
      {
        'pageName': '\n                            成为优秀程序员的10条黄金法则                        ',
        'articleList': [
          {
            'title': '\n                            成为优秀程序员的10条黄金法则                        ',
            'url': 'http://blog.csdn.net/EK02114FS/article/details/78948691'
          }
        ]
      },
      {
        'pageName': '\n                            来硅谷黑科技峰会，看北美最性感科技创新企业                        ',
        'articleList': [
          {
            'title': '\n                            来硅谷黑科技峰会，看北美最性感科技创新企业                        ',
            'url': 'http://blog.csdn.net/kXYOnA63Ag9zqtXx0/article/details/78976400'
          }
        ]
      },
      {
        'pageName': '\n                            面向对象：相信让自己更好才会遇到更喜欢的人，但是也相信人生缘分始于足下，我来找你                        ',
        'articleList': [
          {
            'title': '\n                            面向对象：相信让自己更好才会遇到更喜欢的人，但是也相信人生缘分始于足下，我来找你                        ',
            'url': 'http://blog.csdn.net/VhWfR2u02Q/article/details/78974597'
          }
        ]
      },
      {
        'pageName': '\n                            十位安卓开发者的 17 年总结                        ',
        'articleList': [
          {
            'title': '\n                            十位安卓开发者的 17 年总结                        ',
            'url': 'http://blog.csdn.net/D29h1jQy3akVx/article/details/78950096'
          }
        ]
      },
      {
        'pageName': '\n                            程序员偷偷深爱的 9 个不良编程习惯                        ',
        'articleList': [
          {
            'title': '\n                            程序员偷偷深爱的 9 个不良编程习惯                        ',
            'url': 'http://blog.csdn.net/UW63ZqpKxwlRL1/article/details/78729612'
          }
        ]
      },
      {
        'pageName': '\n                            程序员如何培养第二技能？                        ',
        'articleList': [
          {
            'title': '\n                            程序员如何培养第二技能？                        ',
            'url': 'http://blog.csdn.net/bjweimengshu/article/details/78975522'
          }
        ]
      },
      {
        'pageName': '\n                            IEEE Spectrum 2017 编程语言排行榜：Python跃居第1，Swift大爆发，Java持续下滑                        ',
        'articleList': [
          {
            'title': '\n                            IEEE Spectrum 2017 编程语言排行榜：Python跃居第1，Swift大爆发，Java持续下滑                        ',
            'url': 'http://blog.csdn.net/UzV80PX5V412NE/article/details/78950764'
          }
        ]
      },
      {
        'pageName': '\n                            李彦宏、马化腾、雷军，程序员国服三强中谁的编程能力更胜一筹？                        ',
        'articleList': [
          {
            'title': '\n                            李彦宏、马化腾、雷军，程序员国服三强中谁的编程能力更胜一筹？                        ',
            'url': 'http://blog.csdn.net/csdnsevenn/article/details/78823757'
          }
        ]
      },
      {
        'pageName': '\n                            Java工程师面试题整理[社招篇]                        ',
        'articleList': [
          {
            'title': '\n                            Java工程师面试题整理[社招篇]                        ',
            'url': 'http://blog.csdn.net/HD243608836/article/details/78784822'
          }
        ]
      },
      {
        'pageName': '\n                            为什么有些程序员悄无声息渡过35岁中年危机？                        ',
        'articleList': [
          {
            'title': '\n                            为什么有些程序员悄无声息渡过35岁中年危机？                        ',
            'url': 'http://blog.csdn.net/tTU1EvLDeLFq5btqiK/article/details/78955436'
          }
        ]
      },
      {
        'pageName': '更多专栏', 'articleList': [
        {'title': '更多专栏', 'url': 'http://blog.csdn.net/column.html'}
      ]
      }
    ]
  },
  {
    'url': 'https://www.csdn.net//nav/news',
    'name': '资讯',
    'children': [
      {
        'pageName': '\n                            碾压「中国素质教育」，STEM 是个怎样高大上的东西？                        ',
        'articleList': [
          {
            'title': '\n                            碾压「中国素质教育」，STEM 是个怎样高大上的东西？                        ',
            'url': 'http://blog.csdn.net/GitChat/article/details/78410102'
          }
        ]
      },
      {
        'pageName': '\n                            迈外迪一口气发布四款产品，从商用Wi-Fi转型智能商业                        ',
        'articleList': [
          {
            'title': '\n                            迈外迪一口气发布四款产品，从商用Wi-Fi转型智能商业                        ',
            'url': 'http://blog.csdn.net/Dzz2seiN13YV/article/details/78692504'
          }
        ]
      },
      {
        'pageName': '\n                            敏态和稳态之间不应该有“选择困难症”                        ',
        'articleList': [
          {
            'title': '\n                            敏态和稳态之间不应该有“选择困难症”                        ',
            'url': 'http://blog.csdn.net/Z1Y492Vn3ZYD9et3B06/article/details/78809131'
          }
        ]
      },
      {
        'pageName': '\n                            阿里巴巴、腾讯、百度和京东金融落户雄安新区 | 亚马逊加入FB与微软阵营，共同支持开源AI平台ONNX                        ',
        'articleList': [
          {
            'title': '\n                            阿里巴巴、腾讯、百度和京东金融落户雄安新区 | 亚马逊加入FB与微软阵营，共同支持开源AI平台ONNX                        ',
            'url': 'http://blog.csdn.net/Z1Y492Vn3ZYD9et3B06/article/details/78809130'
          }
        ]
      },
      {
        'pageName': '\n                            一场巡展搞这么大动静 新华三客户业务发展可见一斑                        ',
        'articleList': [
          {
            'title': '\n                            一场巡展搞这么大动静 新华三客户业务发展可见一斑                        ',
            'url': 'http://blog.csdn.net/ZPWhPdjl/article/details/78590303'
          }
        ]
      },
      {
        'pageName': '\n                            【​头条】从超融合市场的探索与创新 看浪潮全面云化时代关键词                        ',
        'articleList': [
          {
            'title': '\n                            【​头条】从超融合市场的探索与创新 看浪潮全面云化时代关键词                        ',
            'url': 'http://blog.csdn.net/Tf3fC4gsZrGUQX94Oo7/article/details/78464544'
          }
        ]
      },
      {
        'pageName': '\n                            大数据早报：甲骨文公司投资4300万美元在总部建高中 18项全球互联网领先科技成果公布中国占6成 （12.6）                        ',
        'articleList': [
          {
            'title': '\n                            大数据早报：甲骨文公司投资4300万美元在总部建高中 18项全球互联网领先科技成果公布中国占6成 （12.6）                        ',
            'url': 'http://blog.csdn.net/op07p6Aaqo9u71/article/details/78728175'
          }
        ]
      },
      {
        'pageName': '\n                            移动办公OA行业的普及推动力——泛微三季报披露                        ',
        'articleList': [
          {
            'title': '\n                            移动办公OA行业的普及推动力——泛微三季报披露                        ',
            'url': 'http://blog.csdn.net/ZPWhPdjl/article/details/78400324'
          }
        ]
      },
      {
        'pageName': '\n                            你写的代码，是别人的噩梦吗？                        ',
        'articleList': [
          {
            'title': '\n                            你写的代码，是别人的噩梦吗？                        ',
            'url': 'http://blog.csdn.net/b0Q8cpra539haFS7/article/details/78809743'
          }
        ]
      },
      {
        'pageName': '\n                            支付宝内测版曝光：将很快支持这个功能！                        ',
        'articleList': [
          {
            'title': '\n                            支付宝内测版曝光：将很快支持这个功能！                        ',
            'url': 'http://blog.csdn.net/M7720EIoSi6oA9/article/details/78612043'
          }
        ]
      },
      {
        'pageName': '\n                            阿里传奇工程师多隆的程序世界                        ',
        'articleList': [
          {
            'title': '\n                            阿里传奇工程师多隆的程序世界                        ',
            'url': 'http://blog.csdn.net/b0Q8cpra539haFS7/article/details/78652212'
          }
        ]
      },
      {
        'pageName': '\n                            余承东炮轰iPhone X：卖点除了贵没剩下什么                        ',
        'articleList': [
          {
            'title': '\n                            余承东炮轰iPhone X：卖点除了贵没剩下什么                        ',
            'url': 'http://blog.csdn.net/M7720EIoSi6oA9/article/details/78464620'
          }
        ]
      },
      {
        'pageName': '\n                            大数据早报：第四届世界互联网大会开幕 比特币一度突破11700美元（12.5）                        ',
        'articleList': [
          {
            'title': '\n                            大数据早报：第四届世界互联网大会开幕 比特币一度突破11700美元（12.5）                        ',
            'url': 'http://blog.csdn.net/op07p6Aaqo9u71/article/details/78717328'
          }
        ]
      },
      {
        'pageName': '\n                            数据科学工作者(Data Scientist) 的日常工作内容包括什么？                        ',
        'articleList': [
          {
            'title': '\n                            数据科学工作者(Data Scientist) 的日常工作内容包括什么？                        ',
            'url': 'http://blog.csdn.net/op07p6Aaqo9u71/article/details/78676010'
          }
        ]
      },
      {
        'pageName': '\n                            深度学习和普通机器学习之间有何区别？                        ',
        'articleList': [
          {
            'title': '\n                            深度学习和普通机器学习之间有何区别？                        ',
            'url': 'http://blog.csdn.net/op07p6Aaqo9u71/article/details/78717325'
          }
        ]
      },
      {
        'pageName': '\n                            大数据早报：海量大数据重度孵化器获A+轮融资 阿里自然语言处理技术获突破（11.30）                        ',
        'articleList': [
          {
            'title': '\n                            大数据早报：海量大数据重度孵化器获A+轮融资 阿里自然语言处理技术获突破（11.30）                        ',
            'url': 'http://blog.csdn.net/op07p6Aaqo9u71/article/details/78676011'
          }
        ]
      },
      {
        'pageName': '\n                            腾讯《绝地求生》官方手游不止一款？《光荣使命》不限号开测                        ',
        'articleList': [
          {
            'title': '\n                            腾讯《绝地求生》官方手游不止一款？《光荣使命》不限号开测                        ',
            'url': 'http://blog.csdn.net/Dzz2seiN13YV/article/details/78682768'
          }
        ]
      },
      {
        'pageName': '\n                            【​头条】EMC：数字化转型，咨询先行                        ',
        'articleList': [
          {
            'title': '\n                            【​头条】EMC：数字化转型，咨询先行                        ',
            'url': 'http://blog.csdn.net/Tf3fC4gsZrGUQX94Oo7/article/details/78612079'
          }
        ]
      },
      {
        'pageName': '\n                            赠阅！《阿里巴巴Java开发手册》实体书开启预售！                        ',
        'articleList': [
          {
            'title': '\n                            赠阅！《阿里巴巴Java开发手册》实体书开启预售！                        ',
            'url': 'http://blog.csdn.net/b0Q8cpra539haFS7/article/details/78839337'
          }
        ]
      },
      {
        'pageName': '\n                            这一年，边缘计算产业联盟（ECC）竟然做了这么多事！                        ',
        'articleList': [
          {
            'title': '\n                            这一年，边缘计算产业联盟（ECC）竟然做了这么多事！                        ',
            'url': 'http://blog.csdn.net/ZPWhPdjl/article/details/78757585'
          }
        ]
      }
    ]
  },
  {'url': 'https://www.csdn.net//nav/ai', 'name': '人工智能'},
  {
    'url': 'https://www.csdn.net//nav/cloud',
    'name': '云计算/大数据'
  },
  {
    'url': 'https://www.csdn.net//nav/blockchain',
    'name': '区块链',
    'children': [
      {
        'pageName': '\n                            支付宝API接口--移动端网页支付（沙箱）                        ',
        'articleList': [
          {
            'title': '\n                            支付宝API接口--移动端网页支付（沙箱）                        ',
            'url': 'http://blog.csdn.net/swj524152416/article/details/56677486'
          }
        ]
      },
      {
        'pageName': '\n                            图解区块链：14张图看懂什么是“区块链技术”？                        ',
        'articleList': [
          {
            'title': '\n                            图解区块链：14张图看懂什么是“区块链技术”？                        ',
            'url': 'http://blog.csdn.net/wo541075754/article/details/54743138'
          }
        ]
      },
      {
        'pageName': '\n                            重大改革！教育部将Python纳入全国计算机等级考试科目                        ',
        'articleList': [
          {
            'title': '\n                            重大改革！教育部将Python纳入全国计算机等级考试科目                        ',
            'url': 'http://blog.csdn.net/BF02jgtRS00XKtCx/article/details/78771382'
          }
        ]
      },
      {
        'pageName': '\n                            首次安装Qt后，创建项目时出现“No valid kits found” 的解决办法                        ',
        'articleList': [
          {
            'title': '\n                            首次安装Qt后，创建项目时出现“No valid kits found” 的解决办法                        ',
            'url': 'http://blog.csdn.net/aseity/article/details/55095052'
          }
        ]
      },
      {
        'pageName': '\n                            2018 年，物联网需要关注的重大趋势！                        ',
        'articleList': [
          {
            'title': '\n                            2018 年，物联网需要关注的重大趋势！                        ',
            'url': 'http://blog.csdn.net/DP29syM41zyGndVF/article/details/78831901'
          }
        ]
      },
      {
        'pageName': '\n                            Visual Studio 2017正式版离线安装及介绍                        ',
        'articleList': [
          {
            'title': '\n                            Visual Studio 2017正式版离线安装及介绍                        ',
            'url': 'http://blog.csdn.net/tmchongye/article/details/63537341'
          }
        ]
      },
      {
        'pageName': '\n                            Go开发：Mac上安装Go环境和VS Code                        ',
        'articleList': [
          {
            'title': '\n                            Go开发：Mac上安装Go环境和VS Code                        ',
            'url': 'http://blog.csdn.net/gnhxsk2015/article/details/74137142'
          }
        ]
      },
      {
        'pageName': '\n                            商城转账到卖家账户的支付宝方案：支付宝单笔转账                        ',
        'articleList': [
          {
            'title': '\n                            商城转账到卖家账户的支付宝方案：支付宝单笔转账                        ',
            'url': 'http://blog.csdn.net/qq_35703234/article/details/70145929'
          }
        ]
      },
      {
        'pageName': '\n                            比特币(Bitcoin)伪挖矿教程                        ',
        'articleList': [
          {
            'title': '\n                            比特币(Bitcoin)伪挖矿教程                        ',
            'url': 'http://blog.csdn.net/a1291985595/article/details/76018296'
          }
        ]
      },
      {
        'pageName': '\n                            世界国家及中国各省市级地图ArcGIS MXD/SHP/QGIS/JSON/SQL数据文件【免费下载】                        ',
        'articleList': [
          {
            'title': '\n                            世界国家及中国各省市级地图ArcGIS MXD/SHP/QGIS/JSON/SQL数据文件【免费下载】                        ',
            'url': 'http://blog.csdn.net/sinat_34719507/article/details/70544164'
          }
        ]
      },
      {
        'pageName': '\n                            面向 Java 开发人员的区块链链代码                        ',
        'articleList': [
          {
            'title': '\n                            面向 Java 开发人员的区块链链代码                        ',
            'url': 'http://blog.csdn.net/oHaHaChao/article/details/73648299'
          }
        ]
      },
      {
        'pageName': '\n                            他丢了一亿多美元，被20吨的垃圾山压着……                        ',
        'articleList': [
          {
            'title': '\n                            他丢了一亿多美元，被20吨的垃圾山压着……                        ',
            'url': 'http://blog.csdn.net/m68FUTKMUrmtj/article/details/78807192'
          }
        ]
      },
      {
        'pageName': '\n                            使用docker搭建gitlab                        ',
        'articleList': [
          {
            'title': '\n                            使用docker搭建gitlab                        ',
            'url': 'http://blog.csdn.net/u011704394/article/details/54729921'
          }
        ]
      },
      {
        'pageName': '\n                            AI 与区块链会碰撞出什么样的火花？要取代传统银行系统！？                        ',
        'articleList': [
          {
            'title': '\n                            AI 与区块链会碰撞出什么样的火花？要取代传统银行系统！？                        ',
            'url': 'http://blog.csdn.net/DP29syM41zyGndVF/article/details/78831893'
          }
        ]
      },
      {
        'pageName': '\n                            Qt for Mac：配置/搭建开发环境                        ',
        'articleList': [
          {
            'title': '\n                            Qt for Mac：配置/搭建开发环境                        ',
            'url': 'http://blog.csdn.net/wsj18808050/article/details/70544293'
          }
        ]
      },
      {
        'pageName': '\n                            苹果公司发力区块链技术，未来系统将可创建和验证时间戳                        ',
        'articleList': [
          {
            'title': '\n                            苹果公司发力区块链技术，未来系统将可创建和验证时间戳                        ',
            'url': 'http://blog.csdn.net/Ag0JAB/article/details/78787567'
          }
        ]
      },
      {
        'pageName': '\n                            韩国创业公司Hdac试图通过区块链保障物联网未来                        ',
        'articleList': [
          {
            'title': '\n                            韩国创业公司Hdac试图通过区块链保障物联网未来                        ',
            'url': 'http://blog.csdn.net/Ag0JAB/article/details/78798343'
          }
        ]
      },
      {
        'pageName': '\n                            虚拟币开发专题(山寨币现在都有什么矿池在支持)                        ',
        'articleList': [
          {
            'title': '\n                            虚拟币开发专题(山寨币现在都有什么矿池在支持)                        ',
            'url': 'http://blog.csdn.net/jQQ53016353/article/details/76998607'
          }
        ]
      },
      {
        'pageName': '\n                            区块链共识算法 PBFT（拜占庭容错）、PAXOS、RAFT简述                        ',
        'articleList': [
          {
            'title': '\n                            区块链共识算法 PBFT（拜占庭容错）、PAXOS、RAFT简述                        ',
            'url': 'http://blog.csdn.net/jerry81333/article/details/74303194'
          }
        ]
      },
      {
        'pageName': '\n                            github上开源的优秀android项目                        ',
        'articleList': [
          {
            'title': '\n                            github上开源的优秀android项目                        ',
            'url': 'http://blog.csdn.net/sinat_25957705/article/details/72369565'
          }
        ]
      }
    ]
  },
  {'url': 'https://www.csdn.net//nav/db', 'name': '数据库'},
  {
    'url': 'https://www.csdn.net//nav/career',
    'name': '程序人生'
  },
  {
    'url': 'https://www.csdn.net//nav/game',
    'name': '游戏开发',
    'children': [
      {
        'pageName': '\n                            从零开始丨使用Unity3D进行VIVE VR游戏开发                        ',
        'articleList': [
          {
            'title': '\n                            从零开始丨使用Unity3D进行VIVE VR游戏开发                        ',
            'url': 'http://blog.csdn.net/caodongfang126/article/details/54134121'
          }
        ]
      },
      {
        'pageName': '\n                            【Python学习】 之 Turtle库                        ',
        'articleList': [
          {
            'title': '\n                            【Python学习】 之 Turtle库                        ',
            'url': 'http://blog.csdn.net/fanfan4569/article/details/54784143'
          }
        ]
      },
      {
        'pageName': '\n                            前方高能 | 你写过什么有趣的程序？最后一个笑出猪叫                        ',
        'articleList': [
          {
            'title': '\n                            前方高能 | 你写过什么有趣的程序？最后一个笑出猪叫                        ',
            'url': 'http://blog.csdn.net/UFv59to8/article/details/78787616'
          }
        ]
      },
      {
        'pageName': '\n                            【Unity3D】3D模型的使用——FBX的使用与Animation设置                        ',
        'articleList': [
          {
            'title': '\n                            【Unity3D】3D模型的使用——FBX的使用与Animation设置                        ',
            'url': 'http://blog.csdn.net/yongh701/article/details/73001312'
          }
        ]
      },
      {
        'pageName': '\n                            十五分钟学会用python编写小游戏                        ',
        'articleList': [
          {
            'title': '\n                            十五分钟学会用python编写小游戏                        ',
            'url': 'http://blog.csdn.net/T7SFOKzorD1JAYMSFk4/article/details/78758380'
          }
        ]
      },
      {
        'pageName': '\n                            Unity3D 发布成PC端常用设置                        ',
        'articleList': [
          {
            'title': '\n                            Unity3D 发布成PC端常用设置                        ',
            'url': 'http://blog.csdn.net/qq_24642743/article/details/71747794'
          }
        ]
      },
      {
        'pageName': '\n                            关注我就能达到大师级水平，这话我终于敢说了                        ',
        'articleList': [
          {
            'title': '\n                            关注我就能达到大师级水平，这话我终于敢说了                        ',
            'url': 'http://blog.csdn.net/LSpQ35k7O5AJ21l1H9o/article/details/78327345'
          }
        ]
      },
      {
        'pageName': '\n                            【计算几何】点定位（线段，三角形，多边形）                        ',
        'articleList': [
          {
            'title': '\n                            【计算几何】点定位（线段，三角形，多边形）                        ',
            'url': 'http://blog.csdn.net/qq_33199236/article/details/57075005'
          }
        ]
      },
      {
        'pageName': '\n                            麻省理工学院科学家组成的一个团队教导人们通过电影获得情感                        ',
        'articleList': [
          {
            'title': '\n                            麻省理工学院科学家组成的一个团队教导人们通过电影获得情感                        ',
            'url': 'http://blog.csdn.net/JtNbCOC8N2I9/article/details/78778467'
          }
        ]
      },
      {
        'pageName': '\n                            UE4 新手常用C++API                        ',
        'articleList': [
          {
            'title': '\n                            UE4 新手常用C++API                        ',
            'url': 'http://blog.csdn.net/u014532636/article/details/71735282'
          }
        ]
      },
      {
        'pageName': '\n                            iOS开发常用三方库、插件、知名博客等等（Swift版）                        ',
        'articleList': [
          {
            'title': '\n                            iOS开发常用三方库、插件、知名博客等等（Swift版）                        ',
            'url': 'http://blog.csdn.net/YLGWHYH/article/details/70853202'
          }
        ]
      },
      {
        'pageName': '\n                            波士顿Atlas机器人再次完成进化，距人类灭绝又进一步！                        ',
        'articleList': [
          {
            'title': '\n                            波士顿Atlas机器人再次完成进化，距人类灭绝又进一步！                        ',
            'url': 'http://blog.csdn.net/JtNbCOC8N2I9/article/details/78785336'
          }
        ]
      },
      {
        'pageName': '\n                            斗地主AI算法——第二章の数据结构                        ',
        'articleList': [
          {
            'title': '\n                            斗地主AI算法——第二章の数据结构                        ',
            'url': 'http://blog.csdn.net/sm9sun/article/details/70804909'
          }
        ]
      },
      {
        'pageName': '\n                            opencv3之目标跟踪（单目标、多目标）                        ',
        'articleList': [
          {
            'title': '\n                            opencv3之目标跟踪（单目标、多目标）                        ',
            'url': 'http://blog.csdn.net/m0_37901643/article/details/72820891'
          }
        ]
      },
      {
        'pageName': '\n                            Unity3d 控制物体transform移动的几种方法                        ',
        'articleList': [
          {
            'title': '\n                            Unity3d 控制物体transform移动的几种方法                        ',
            'url': 'http://blog.csdn.net/renkai0406/article/details/63800248'
          }
        ]
      },
      {
        'pageName': '\n                            高通将在骁龙845移动平台上对网易游戏进行优化                        ',
        'articleList': [
          {
            'title': '\n                            高通将在骁龙845移动平台上对网易游戏进行优化                        ',
            'url': 'http://blog.csdn.net/a2Ni5KFDaIO1E6/article/details/78795609'
          }
        ]
      },
      {
        'pageName': '\n                            《寻梦环游记》背后：一出“硅谷”遇上“好莱坞”的好戏                        ',
        'articleList': [
          {
            'title': '\n                            《寻梦环游记》背后：一出“硅谷”遇上“好莱坞”的好戏                        ',
            'url': 'http://blog.csdn.net/kXYOnA63Ag9zqtXx0/article/details/78739862'
          }
        ]
      },
      {
        'pageName': '\n                            先锋机器人走到目标点和走四方形                        ',
        'articleList': [
          {
            'title': '\n                            先锋机器人走到目标点和走四方形                        ',
            'url': 'http://blog.csdn.net/qq_35508344/article/details/73909944'
          }
        ]
      },
      {
        'pageName': '\n                            Source Insight 中文注释为乱码解决办法（完美解决，一键搞定）                        ',
        'articleList': [
          {
            'title': '\n                            Source Insight 中文注释为乱码解决办法（完美解决，一键搞定）                        ',
            'url': 'http://blog.csdn.net/BjarneCpp/article/details/70174752'
          }
        ]
      },
      {
        'pageName': '\n                            Python绘图Turtle库详解                        ',
        'articleList': [
          {
            'title': '\n                            Python绘图Turtle库详解                        ',
            'url': 'http://blog.csdn.net/zengxiantao1994/article/details/76588580'
          }
        ]
      }
    ]
  },
  {
    'url': 'https://www.csdn.net//nav/fund',
    'name': '计算机基础',
    'children': [
      {
        'pageName': '\n                            ARKit从入门到精通（10）-ARKit让飞机绕着你飞起来                        ',
        'articleList': [
          {
            'title': '\n                            ARKit从入门到精通（10）-ARKit让飞机绕着你飞起来                        ',
            'url': 'http://blog.csdn.net/u013263917/article/details/73161072'
          }
        ]
      },
      {
        'pageName': '\n                            Java 常用工具类 Collections 源码分析                        ',
        'articleList': [
          {
            'title': '\n                            Java 常用工具类 Collections 源码分析                        ',
            'url': 'http://blog.csdn.net/u011240877/article/details/78348578'
          }
        ]
      },
      {
        'pageName': '\n                            大家都懂的 JSON 解析器原理（一）简介 & 低配版入门                        ',
        'articleList': [
          {
            'title': '\n                            大家都懂的 JSON 解析器原理（一）简介 & 低配版入门                        ',
            'url': 'http://blog.csdn.net/zhangxin09/article/details/77132093'
          }
        ]
      },
      {
        'pageName': '\n                            【C++笔记】变量和基本类型                        ',
        'articleList': [
          {
            'title': '\n                            【C++笔记】变量和基本类型                        ',
            'url': 'http://blog.csdn.net/u013165921/article/details/78530923'
          }
        ]
      },
      {
        'pageName': '\n                            【C++笔记】字符串、向量和数组                        ',
        'articleList': [
          {
            'title': '\n                            【C++笔记】字符串、向量和数组                        ',
            'url': 'http://blog.csdn.net/u013165921/article/details/78570226'
          }
        ]
      },
      {
        'pageName': '\n                            C语言交换两个变量（不创建临时变量）（位运算简介）                        ',
        'articleList': [
          {
            'title': '\n                            C语言交换两个变量（不创建临时变量）（位运算简介）                        ',
            'url': 'http://blog.csdn.net/AuZeonFung/article/details/76123282'
          }
        ]
      },
      {
        'pageName': '\n                            数据结构顺序表的增删查改                        ',
        'articleList': [
          {
            'title': '\n                            数据结构顺序表的增删查改                        ',
            'url': 'http://blog.csdn.net/qq_39056803/article/details/73033406'
          }
        ]
      },
      {
        'pageName': '\n                            【OpenCV】轮廓与凸包                        ',
        'articleList': [
          {
            'title': '\n                            【OpenCV】轮廓与凸包                        ',
            'url': 'http://blog.csdn.net/u013165921/article/details/78549330'
          }
        ]
      },
      {
        'pageName': '\n                            c语言实现求最大公约数的三种方法                        ',
        'articleList': [
          {
            'title': '\n                            c语言实现求最大公约数的三种方法                        ',
            'url': 'http://blog.csdn.net/Landscape_/article/details/64941031'
          }
        ]
      },
      {
        'pageName': '\n                            C++连接CTP接口实现简单量化交易（行情、交易、k线、策略）                        ',
        'articleList': [
          {
            'title': '\n                            C++连接CTP接口实现简单量化交易（行情、交易、k线、策略）                        ',
            'url': 'http://blog.csdn.net/u012234115/article/details/70195889'
          }
        ]
      },
      {
        'pageName': '\n                            基于C语言的学生成绩管理系统                        ',
        'articleList': [
          {
            'title': '\n                            基于C语言的学生成绩管理系统                        ',
            'url': 'http://blog.csdn.net/qq_33735635/article/details/73605336'
          }
        ]
      },
      {
        'pageName': '\n                            C语言位运算应用一：求一个数的二进制表示中1的个数                        ',
        'articleList': [
          {
            'title': '\n                            C语言位运算应用一：求一个数的二进制表示中1的个数                        ',
            'url': 'http://blog.csdn.net/AuZeonFung/article/details/76131370'
          }
        ]
      },
      {
        'pageName': '\n                            学会一种数据结构一：队列                        ',
        'articleList': [
          {
            'title': '\n                            学会一种数据结构一：队列                        ',
            'url': 'http://blog.csdn.net/u010173095/article/details/78622694'
          }
        ]
      },
      {
        'pageName': '\n                            python中用xpath解析网页的基本方法                        ',
        'articleList': [
          {
            'title': '\n                            python中用xpath解析网页的基本方法                        ',
            'url': 'http://blog.csdn.net/zwq912318834/article/details/78178316'
          }
        ]
      },
      {
        'pageName': '\n                            C# WinForm开发系列之c# 通过.net自带的chart控件绘制饼图,柱形图和折线图的基础使用和扩展                        ',
        'articleList': [
          {
            'title': '\n                            C# WinForm开发系列之c# 通过.net自带的chart控件绘制饼图,柱形图和折线图的基础使用和扩展                        ',
            'url': 'http://blog.csdn.net/DannyIsCoder/article/details/70225163'
          }
        ]
      },
      {
        'pageName': '\n                            js的DOM节点操作：创建 ，插入，删除，复制，查找节点                        ',
        'articleList': [
          {
            'title': '\n                            js的DOM节点操作：创建 ，插入，删除，复制，查找节点                        ',
            'url': 'http://blog.csdn.net/Torrex/article/details/54376633'
          }
        ]
      },
      {
        'pageName': '\n                            ACM竞赛路上亲爱的坑们                        ',
        'articleList': [
          {
            'title': '\n                            ACM竞赛路上亲爱的坑们                        ',
            'url': 'http://blog.csdn.net/calabash_boy/article/details/76576666'
          }
        ]
      },
      {
        'pageName': '\n                            二叉树的先、中、后序遍历及层次遍历的迭代版算法                        ',
        'articleList': [
          {
            'title': '\n                            二叉树的先、中、后序遍历及层次遍历的迭代版算法                        ',
            'url': 'http://blog.csdn.net/qq_24034545/article/details/62228417'
          }
        ]
      },
      {
        'pageName': '\n                            glibc malloc和free                        ',
        'articleList': [
          {
            'title': '\n                            glibc malloc和free                        ',
            'url': 'http://blog.csdn.net/W952622442/article/details/78712699'
          }
        ]
      }
    ]
  },
  {'url': 'https://www.csdn.net//nav/engineering', 'name': '研发管理'},
  {
    'url': 'https://www.csdn.net//nav/web',
    'name': '前端'
  },
  {
    'url': 'https://www.csdn.net//nav/mobile',
    'name': '移动开发',
    'children': [
      {
        'pageName': '\n                            Android：你要的WebView与 JS 交互方式 都在这里了                        ',
        'articleList': [
          {
            'title': '\n                            Android：你要的WebView与 JS 交互方式 都在这里了                        ',
            'url': 'http://blog.csdn.net/carson_ho/article/details/64904691'
          }
        ]
      },
      {
        'pageName': '\n                            我为什么放弃java学习Kotlin？                        ',
        'articleList': [
          {
            'title': '\n                            我为什么放弃java学习Kotlin？                        ',
            'url': 'http://blog.csdn.net/sw950729/article/details/72566523'
          }
        ]
      },
      {
        'pageName': '\n                            OkHttp之发起Http请求过程概述                        ',
        'articleList': [
          {
            'title': '\n                            OkHttp之发起Http请求过程概述                        ',
            'url': 'http://blog.csdn.net/chunqiuwei/article/details/76913352'
          }
        ]
      },
      {
        'pageName': '\n                            一个强悍而优美的Android视频播放器                        ',
        'articleList': [
          {
            'title': '\n                            一个强悍而优美的Android视频播放器                        ',
            'url': 'http://blog.csdn.net/androidstarjack/article/details/69526279'
          }
        ]
      },
      {
        'pageName': '\n                            Android Studio 中的调试技巧                        ',
        'articleList': [
          {
            'title': '\n                            Android Studio 中的调试技巧                        ',
            'url': 'http://blog.csdn.net/c6E5UlI1N/article/details/78708440'
          }
        ]
      },
      {
        'pageName': '\n                            Kotlin 踩坑日记（五）aapt2 编译 bug                        ',
        'articleList': [
          {
            'title': '\n                            Kotlin 踩坑日记（五）aapt2 编译 bug                        ',
            'url': 'http://blog.csdn.net/soslinken/article/details/72828495'
          }
        ]
      },
      {
        'pageName': '\n                            打造自己的框架之使用注解制作IOC组件                        ',
        'articleList': [
          {
            'title': '\n                            打造自己的框架之使用注解制作IOC组件                        ',
            'url': 'http://blog.csdn.net/c6E5UlI1N/article/details/78708441'
          }
        ]
      },
      {
        'pageName': '\n                            Android Studio 3.0全新时代：带来的一些新功能                        ',
        'articleList': [
          {
            'title': '\n                            Android Studio 3.0全新时代：带来的一些新功能                        ',
            'url': 'http://blog.csdn.net/guolipeng_network/article/details/74596265'
          }
        ]
      },
      {
        'pageName': '\n                            android全屏／沉浸式状态栏下，各种键盘挡住输入框解决办法                        ',
        'articleList': [
          {
            'title': '\n                            android全屏／沉浸式状态栏下，各种键盘挡住输入框解决办法                        ',
            'url': 'http://blog.csdn.net/smileiam/article/details/69055963'
          }
        ]
      },
      {
        'pageName': '\n                            Nginx源码阅读（模块）                        ',
        'articleList': [
          {
            'title': '\n                            Nginx源码阅读（模块）                        ',
            'url': 'http://blog.csdn.net/hz5034/article/details/54647276'
          }
        ]
      },
      {
        'pageName': '\n                            Android 开源热库汇总-基本库                        ',
        'articleList': [
          {
            'title': '\n                            Android 开源热库汇总-基本库                        ',
            'url': 'http://blog.csdn.net/Yuequnchen/article/details/70799728'
          }
        ]
      },
      {
        'pageName': '\n                            钉钉极速打卡与自动打卡只有一步之遥，然而这一步我们实现了                        ',
        'articleList': [
          {
            'title': '\n                            钉钉极速打卡与自动打卡只有一步之遥，然而这一步我们实现了                        ',
            'url': 'http://blog.csdn.net/github_2011/article/details/72953762'
          }
        ]
      },
      {
        'pageName': '\n                            微信公众号 授权登录 JAVA                        ',
        'articleList': [
          {
            'title': '\n                            微信公众号 授权登录 JAVA                        ',
            'url': 'http://blog.csdn.net/qq_36020545/article/details/56011311'
          }
        ]
      },
      {
        'pageName': '\n                            支付宝APP支付——支付流程说明及示例                        ',
        'articleList': [
          {
            'title': '\n                            支付宝APP支付——支付流程说明及示例                        ',
            'url': 'http://blog.csdn.net/flygoa/article/details/54891473'
          }
        ]
      },
      {
        'pageName': '\n                            微信小程序支付，微信支付【小白专用】                        ',
        'articleList': [
          {
            'title': '\n                            微信小程序支付，微信支付【小白专用】                        ',
            'url': 'http://blog.csdn.net/xieshunhai/article/details/72829232'
          }
        ]
      },
      {
        'pageName': '\n                            Android Studio 2.3、3.0 升级后问题解决                        ',
        'articleList': [
          {
            'title': '\n                            Android Studio 2.3、3.0 升级后问题解决                        ',
            'url': 'http://blog.csdn.net/ww897532167/article/details/54617087'
          }
        ]
      },
      {
        'pageName': '\n                            Android性能优化-过度绘制解决方案                        ',
        'articleList': [
          {
            'title': '\n                            Android性能优化-过度绘制解决方案                        ',
            'url': 'http://blog.csdn.net/c6E5UlI1N/article/details/78663946'
          }
        ]
      },
      {
        'pageName': '\n                            微信小程序填坑：上传头像；wx.chooseImage，wx.uploadFile                        ',
        'articleList': [
          {
            'title': '\n                            微信小程序填坑：上传头像；wx.chooseImage，wx.uploadFile                        ',
            'url': 'http://blog.csdn.net/sinat_17775997/article/details/62247880'
          }
        ]
      },
      {
        'pageName': '\n                            小项目-Java开发简单的计算器                        ',
        'articleList': [
          {
            'title': '\n                            小项目-Java开发简单的计算器                        ',
            'url': 'http://blog.csdn.net/dancheren/article/details/54577036'
          }
        ]
      },
      {
        'pageName': '\n                            微信订阅号点击菜单栏获取用户信息                        ',
        'articleList': [
          {
            'title': '\n                            微信订阅号点击菜单栏获取用户信息                        ',
            'url': 'http://blog.csdn.net/u014520797/article/details/54705716'
          }
        ]
      }
    ]
  },
  {
    'url': 'https://www.csdn.net//nav/lang',
    'name': '编程语言',
    'children': [
      {
        'pageName': '\n                            各大公司Java后端开发面试题总结                        ',
        'articleList': [
          {
            'title': '\n                            各大公司Java后端开发面试题总结                        ',
            'url': 'http://blog.csdn.net/sinat_35512245/article/details/59056120'
          }
        ]
      },
      {
        'pageName': '\n                            Java实现图片上传到服务器，并把上传的图片读取出来                        ',
        'articleList': [
          {
            'title': '\n                            Java实现图片上传到服务器，并把上传的图片读取出来                        ',
            'url': 'http://blog.csdn.net/weixin_36380516/article/details/58594664'
          }
        ]
      },
      {
        'pageName': '\n                            史上最难的一道Java面试题 (分析篇)                        ',
        'articleList': [
          {
            'title': '\n                            史上最难的一道Java面试题 (分析篇)                        ',
            'url': 'http://blog.csdn.net/lirenzuo/article/details/78253481'
          }
        ]
      },
      {
        'pageName': '\n                            Pycharm无法import自己安装的第三方module                        ',
        'articleList': [
          {
            'title': '\n                            Pycharm无法import自己安装的第三方module                        ',
            'url': 'http://blog.csdn.net/zhujianing1993/article/details/67029852'
          }
        ]
      },
      {
        'pageName': '\n                            竞价排名Demo - after insert / after update更新记录（防止递归）                        ',
        'articleList': [
          {
            'title': '\n                            竞价排名Demo - after insert / after update更新记录（防止递归）                        ',
            'url': 'http://blog.csdn.net/itsme_web/article/details/73650543'
          }
        ]
      },
      {
        'pageName': '\n                            OCR图像识别技术的JAVA实现（一）                        ',
        'articleList': [
          {
            'title': '\n                            OCR图像识别技术的JAVA实现（一）                        ',
            'url': 'http://blog.csdn.net/weistin/article/details/78839804'
          }
        ]
      },
      {
        'pageName': '\n                            【常用函数使用总结】php                        ',
        'articleList': [
          {
            'title': '\n                            【常用函数使用总结】php                        ',
            'url': 'http://blog.csdn.net/qq_33862644/article/details/78445573'
          }
        ]
      },
      {
        'pageName': '\n                            Java 基础 积累-不断更新                        ',
        'articleList': [
          {
            'title': '\n                            Java 基础 积累-不断更新                        ',
            'url': 'http://blog.csdn.net/bestcxx/article/details/74937365'
          }
        ]
      },
      {
        'pageName': '\n                            java简单的人机猜拳小游戏                        ',
        'articleList': [
          {
            'title': '\n                            java简单的人机猜拳小游戏                        ',
            'url': 'http://blog.csdn.net/jayzym/article/details/56019384'
          }
        ]
      },
      {
        'pageName': '\n                            selenium+python京东自动登录及秒杀                        ',
        'articleList': [
          {
            'title': '\n                            selenium+python京东自动登录及秒杀                        ',
            'url': 'http://blog.csdn.net/u013042248/article/details/53966185'
          }
        ]
      },
      {
        'pageName': '\n                            SpringMVC自动注入空指针                        ',
        'articleList': [
          {
            'title': '\n                            SpringMVC自动注入空指针                        ',
            'url': 'http://blog.csdn.net/rixingbeioul46364/article/details/76190184'
          }
        ]
      },
      {
        'pageName': '\n                            JavaScript高级程序设计（第六章）——读书笔记                        ',
        'articleList': [
          {
            'title': '\n                            JavaScript高级程序设计（第六章）——读书笔记                        ',
            'url': 'http://blog.csdn.net/douyabb/article/details/78835673'
          }
        ]
      },
      {
        'pageName': '\n                            利用anaconda搞定所有Python问题，各种安装包                        ',
        'articleList': [
          {
            'title': '\n                            利用anaconda搞定所有Python问题，各种安装包                        ',
            'url': 'http://blog.csdn.net/Errors_In_Life/article/details/65936133'
          }
        ]
      },
      {
        'pageName': '\n                            python中使用xlrd、xlwt操作excel表格详解                        ',
        'articleList': [
          {
            'title': '\n                            python中使用xlrd、xlwt操作excel表格详解                        ',
            'url': 'http://blog.csdn.net/chengxuyuanyonghu/article/details/54951399'
          }
        ]
      },
      {
        'pageName': '\n                            Excel导出                        ',
        'articleList': [
          {
            'title': '\n                            Excel导出                        ',
            'url': 'http://blog.csdn.net/shi750989074/article/details/78394273'
          }
        ]
      },
      {
        'pageName': '\n                            windows下多版本python安装与pip安装和pip使用   吐血总结                        ',
        'articleList': [
          {
            'title': '\n                            windows下多版本python安装与pip安装和pip使用   吐血总结                        ',
            'url': 'http://blog.csdn.net/silence2015/article/details/56483892'
          }
        ]
      },
      {
        'pageName': '\n                            Spring MVC 实现文件的上传和下载                        ',
        'articleList': [
          {
            'title': '\n                            Spring MVC 实现文件的上传和下载                        ',
            'url': 'http://blog.csdn.net/qian_ch/article/details/69258465'
          }
        ]
      },
      {
        'pageName': '\n                            完美解决SpringMVC中静态资源无法找到（No mapping found for HTTP request with URI）问题                        ',
        'articleList': [
          {
            'title': '\n                            完美解决SpringMVC中静态资源无法找到（No mapping found for HTTP request with URI）问题                        ',
            'url': 'http://blog.csdn.net/jdjdndhj/article/details/54907891'
          }
        ]
      },
      {
        'pageName': '\n                            python中文字符串居中/中文居中python/python汉字字符串居中：手撕比方法好用                        ',
        'articleList': [
          {
            'title': '\n                            python中文字符串居中/中文居中python/python汉字字符串居中：手撕比方法好用                        ',
            'url': 'http://blog.csdn.net/PlusChang/article/details/72997037'
          }
        ]
      },
      {
        'pageName': '\n                            利用反射实现子类继承父类的值                        ',
        'articleList': [
          {
            'title': '\n                            利用反射实现子类继承父类的值                        ',
            'url': 'http://blog.csdn.net/woshiyidaocai/article/details/78833252'
          }
        ]
      }
    ]
  },
  {'url': 'https://www.csdn.net//nav/arch', 'name': '架构'},
  {
    'url': 'https://www.csdn.net//nav/ops',
    'name': '运维',
    'children': [
      {
        'pageName': '\n                            java搭建阿里云服务器环境（java环境+mysql+tomcat）和部署 JavaWeb 项目到云服务器（十分详细）                        ',
        'articleList': [
          {
            'title': '\n                            java搭建阿里云服务器环境（java环境+mysql+tomcat）和部署 JavaWeb 项目到云服务器（十分详细）                        ',
            'url': 'http://blog.csdn.net/sihai12345/article/details/73381151'
          }
        ]
      },
      {
        'pageName': '\n                            Windows中实现不依赖账户登录的开机启动程序                        ',
        'articleList': [
          {
            'title': '\n                            Windows中实现不依赖账户登录的开机启动程序                        ',
            'url': 'http://blog.csdn.net/CJF_iceKing/article/details/71725935'
          }
        ]
      },
      {
        'pageName': '\n                            CentOS配置本地yum源/阿里云yum源/163yuan源，并配置yum源的优先级                        ',
        'articleList': [
          {
            'title': '\n                            CentOS配置本地yum源/阿里云yum源/163yuan源，并配置yum源的优先级                        ',
            'url': 'http://blog.csdn.net/kangvcar/article/details/73477730'
          }
        ]
      },
      {
        'pageName': '\n                            CentOS7网络配置(ping不同的原因及解决方法)                        ',
        'articleList': [
          {
            'title': '\n                            CentOS7网络配置(ping不同的原因及解决方法)                        ',
            'url': 'http://blog.csdn.net/r8l8q8/article/details/73330296'
          }
        ]
      },
      {
        'pageName': '\n                            网盘不靠谱 那就自己搭建256TB的网盘呗 — Nextcloud搭建过程                        ',
        'articleList': [
          {
            'title': '\n                            网盘不靠谱 那就自己搭建256TB的网盘呗 — Nextcloud搭建过程                        ',
            'url': 'http://blog.csdn.net/zhywbp/article/details/73268158'
          }
        ]
      },
      {
        'pageName': '\n                            使用Api分析器与Windows兼容包来编写智能的跨平台.NET Core应用                        ',
        'articleList': [
          {
            'title': '\n                            使用Api分析器与Windows兼容包来编写智能的跨平台.NET Core应用                        ',
            'url': 'http://blog.csdn.net/sD7O95O/article/details/78801781'
          }
        ]
      },
      {
        'pageName': '\n                            如何清理 Linux 系统开机启动项？                        ',
        'articleList': [
          {
            'title': '\n                            如何清理 Linux 系统开机启动项？                        ',
            'url': 'http://blog.csdn.net/Ki8Qzvka6Gz4n450m/article/details/78750627'
          }
        ]
      },
      {
        'pageName': '\n                            超简单的卸载vs2015总结(亲测可用)                        ',
        'articleList': [
          {
            'title': '\n                            超简单的卸载vs2015总结(亲测可用)                        ',
            'url': 'http://blog.csdn.net/YaoDeBiAn/article/details/74315632'
          }
        ]
      },
      {
        'pageName': '\n                            shell脚本（一）基础知识                        ',
        'articleList': [
          {
            'title': '\n                            shell脚本（一）基础知识                        ',
            'url': 'http://blog.csdn.net/lasoup/article/details/78785198'
          }
        ]
      },
      {
        'pageName': '\n                            Linux下使用shadowsocks（以ubuntu16.04为例，非服务器）                        ',
        'articleList': [
          {
            'title': '\n                            Linux下使用shadowsocks（以ubuntu16.04为例，非服务器）                        ',
            'url': 'http://blog.csdn.net/superbfly/article/details/54950451'
          }
        ]
      },
      {
        'pageName': '\n                            彻底找到 Tomcat 启动速度慢的元凶                        ',
        'articleList': [
          {
            'title': '\n                            彻底找到 Tomcat 启动速度慢的元凶                        ',
            'url': 'http://blog.csdn.net/u013939884/article/details/72860358'
          }
        ]
      },
      {
        'pageName': '\n                            vue嵌套路由-query传递参数（三）                        ',
        'articleList': [
          {
            'title': '\n                            vue嵌套路由-query传递参数（三）                        ',
            'url': 'http://blog.csdn.net/k491022087/article/details/70214664'
          }
        ]
      },
      {
        'pageName': '\n                            更改Jupyter Notebook起始目录的4种方法                        ',
        'articleList': [
          {
            'title': '\n                            更改Jupyter Notebook起始目录的4种方法                        ',
            'url': 'http://blog.csdn.net/qq_33039859/article/details/54604533'
          }
        ]
      },
      {
        'pageName': '\n                            完全激活win server 2012的方法（亲测可行！）                        ',
        'articleList': [
          {
            'title': '\n                            完全激活win server 2012的方法（亲测可行！）                        ',
            'url': 'http://blog.csdn.net/oqqHuTu12345678/article/details/70260052'
          }
        ]
      },
      {
        'pageName': '\n                            OpenCV3.2.0+VS2017环境配置与常见问题（巨细坑爹版）                        ',
        'articleList': [
          {
            'title': '\n                            OpenCV3.2.0+VS2017环境配置与常见问题（巨细坑爹版）                        ',
            'url': 'http://blog.csdn.net/qq_36285879/article/details/71909067'
          }
        ]
      },
      {
        'pageName': '\n                            Linux 运维工程师学习成长路线上要经历哪四个阶段？                        ',
        'articleList': [
          {
            'title': '\n                            Linux 运维工程师学习成长路线上要经历哪四个阶段？                        ',
            'url': 'http://blog.csdn.net/Ki8Qzvka6Gz4n450m/article/details/78764267'
          }
        ]
      },
      {
        'pageName': '\n                            Mac下kernel_task进程cpu占用率久高不下解决记录                        ',
        'articleList': [
          {
            'title': '\n                            Mac下kernel_task进程cpu占用率久高不下解决记录                        ',
            'url': 'http://blog.csdn.net/github_36186488/article/details/72725783'
          }
        ]
      },
      {
        'pageName': '\n                            Linux文件系统的硬链接与软链接                        ',
        'articleList': [
          {
            'title': '\n                            Linux文件系统的硬链接与软链接                        ',
            'url': 'http://blog.csdn.net/DP29syM41zyGndVF/article/details/78771228'
          }
        ]
      },
      {
        'pageName': '\n                            Linux运维之ntpdate同步网络时间                        ',
        'articleList': [
          {
            'title': '\n                            Linux运维之ntpdate同步网络时间                        ',
            'url': 'http://blog.csdn.net/Ki8Qzvka6Gz4n450m/article/details/78709285'
          }
        ]
      },
      {
        'pageName': '\n                            关于idea在运行web项目时部署的位置                        ',
        'articleList': [
          {
            'title': '\n                            关于idea在运行web项目时部署的位置                        ',
            'url': 'http://blog.csdn.net/joenqc/article/details/58044953'
          }
        ]
      }
    ]
  },
  {
    'url': 'https://www.csdn.net//nav/iot',
    'name': '物联网',
    'children': [
      {
        'pageName': '\n                            NB-IoT移远BC95调试笔记 02 CoAP协议                        ',
        'articleList': [
          {
            'title': '\n                            NB-IoT移远BC95调试笔记 02 CoAP协议                        ',
            'url': 'http://blog.csdn.net/iotisan/article/details/78277135'
          }
        ]
      },
      {
        'pageName': '\n                            业界最小封装SOT23-6单芯片I2C转PWM                        ',
        'articleList': [
          {
            'title': '\n                            业界最小封装SOT23-6单芯片I2C转PWM                        ',
            'url': 'http://blog.csdn.net/fgh00000/article/details/78797378'
          }
        ]
      },
      {
        'pageName': '\n                            lorawan在嵌入式系统中的实现--节点端(一)--SX1278介绍                        ',
        'articleList': [
          {
            'title': '\n                            lorawan在嵌入式系统中的实现--节点端(一)--SX1278介绍                        ',
            'url': 'http://blog.csdn.net/gaojn/article/details/76695169'
          }
        ]
      },
      {
        'pageName': '\n                            Linux内核笔记(1)                        ',
        'articleList': [
          {
            'title': '\n                            Linux内核笔记(1)                        ',
            'url': 'http://blog.csdn.net/gwx123wan/article/details/78449313'
          }
        ]
      },
      {
        'pageName': '\n                            Intel正式发布银牌奔腾和两款赛扬：新一代6W的超低功耗平台CPU                        ',
        'articleList': [
          {
            'title': '\n                            Intel正式发布银牌奔腾和两款赛扬：新一代6W的超低功耗平台CPU                        ',
            'url': 'http://blog.csdn.net/Dzz2seiN13YV/article/details/78790814'
          }
        ]
      },
      {
        'pageName': '\n                            PLC 上位机 算法 源代码 方案 品牌 历经十年升级改造 数代更新 梯形图算法全部公开 梯形图转指令表的算法源代码                        ',
        'articleList': [
          {
            'title': '\n                            PLC 上位机 算法 源代码 方案 品牌 历经十年升级改造 数代更新 梯形图算法全部公开 梯形图转指令表的算法源代码                        ',
            'url': 'http://blog.csdn.net/yunhaiC/article/details/74518176'
          }
        ]
      },
      {
        'pageName': '\n                            基于RISC-V架构的开源处理器及SoC研究综述（二）                        ',
        'articleList': [
          {
            'title': '\n                            基于RISC-V架构的开源处理器及SoC研究综述（二）                        ',
            'url': 'http://blog.csdn.net/leishangwen/article/details/55006804'
          }
        ]
      },
      {
        'pageName': '\n                            虚拟化技术kvm,xen,vmware比较                        ',
        'articleList': [
          {
            'title': '\n                            虚拟化技术kvm,xen,vmware比较                        ',
            'url': 'http://blog.csdn.net/Gavinlib/article/details/72421852'
          }
        ]
      },
      {
        'pageName': '\n                            Google工程师：教你用树莓派+Arduino+TensorFlow搭建图像识别小车                        ',
        'articleList': [
          {
            'title': '\n                            Google工程师：教你用树莓派+Arduino+TensorFlow搭建图像识别小车                        ',
            'url': 'http://blog.csdn.net/x32sky/article/details/69526137'
          }
        ]
      },
      {
        'pageName': '\n                            微软“出轨”高通，英特尔“正室”地位会受到影响吗？                        ',
        'articleList': [
          {
            'title': '\n                            微软“出轨”高通，英特尔“正室”地位会受到影响吗？                        ',
            'url': 'http://blog.csdn.net/Dzz2seiN13YV/article/details/78795160'
          }
        ]
      },
      {
        'pageName': '\n                            别再只关注骁龙845的性能了，因为它真正重要的是这些                        ',
        'articleList': [
          {
            'title': '\n                            别再只关注骁龙845的性能了，因为它真正重要的是这些                        ',
            'url': 'http://blog.csdn.net/Dzz2seiN13YV/article/details/78795194'
          }
        ]
      },
      {
        'pageName': '\n                            重大改变！Python或将取代VBA，成为Excel官方脚本语言！                        ',
        'articleList': [
          {
            'title': '\n                            重大改变！Python或将取代VBA，成为Excel官方脚本语言！                        ',
            'url': 'http://blog.csdn.net/DP29syM41zyGndVF/article/details/78841421'
          }
        ]
      },
      {
        'pageName': '\n                            手机插到电脑上后adb查不到连接（只教你最后一招）                        ',
        'articleList': [
          {
            'title': '\n                            手机插到电脑上后adb查不到连接（只教你最后一招）                        ',
            'url': 'http://blog.csdn.net/huajuanaini/article/details/64444892'
          }
        ]
      },
      {
        'pageName': '\n                            如何利用树莓派打造一款机器人                        ',
        'articleList': [
          {
            'title': '\n                            如何利用树莓派打造一款机器人                        ',
            'url': 'http://blog.csdn.net/p23onzq/article/details/78758576'
          }
        ]
      },
      {
        'pageName': '\n                            明天，这样的嵌入式工程师将秒杀普通程序员？                        ',
        'articleList': [
          {
            'title': '\n                            明天，这样的嵌入式工程师将秒杀普通程序员？                        ',
            'url': 'http://blog.csdn.net/p23onzq/article/details/78758577'
          }
        ]
      },
      {
        'pageName': '\n                            马斯克首次证实特斯拉正在研发AI芯片：用途不限于自动驾驶                        ',
        'articleList': [
          {
            'title': '\n                            马斯克首次证实特斯拉正在研发AI芯片：用途不限于自动驾驶                        ',
            'url': 'http://blog.csdn.net/Uwr44UOuQcNsUQb60zk2/article/details/78794586'
          }
        ]
      },
      {
        'pageName': '\n                            【重磅来袭：系列二】史上最全NB-IoT技术方面的系列问题和联盟答案                        ',
        'articleList': [
          {
            'title': '\n                            【重磅来袭：系列二】史上最全NB-IoT技术方面的系列问题和联盟答案                        ',
            'url': 'http://blog.csdn.net/NBIoT/article/details/54906465'
          }
        ]
      },
      {
        'pageName': '\n                            2017年的Linux内核防护依然脆弱                        ',
        'articleList': [
          {
            'title': '\n                            2017年的Linux内核防护依然脆弱                        ',
            'url': 'http://blog.csdn.net/a26r2kF967hGAi/article/details/78798116'
          }
        ]
      },
      {
        'pageName': '\n                            stm32不小心把SWD和JTAG都给关了，程序下载不进去，解决办法                        ',
        'articleList': [
          {
            'title': '\n                            stm32不小心把SWD和JTAG都给关了，程序下载不进去，解决办法                        ',
            'url': 'http://blog.csdn.net/Ace_Shiyuan/article/details/60139865'
          }
        ]
      },
      {
        'pageName': '\n                            在Linux中，如何找到并杀掉僵尸进程？                        ',
        'articleList': [
          {
            'title': '\n                            在Linux中，如何找到并杀掉僵尸进程？                        ',
            'url': 'http://blog.csdn.net/DP29syM41zyGndVF/article/details/78831897'
          }
        ]
      }
    ]
  },
  {'url': 'https://www.csdn.net//nav/avi', 'name': '音视频开发'},
  {
    'url': 'https://www.csdn.net//nav/sec',
    'name': '安全'
  },
  {
    'url': 'https://www.csdn.net//nav/other',
    'name': '其他',
    'children': [
      {
        'pageName': '\n                            Amazon Alexa系列介绍(1)--综述                        ',
        'articleList': [
          {
            'title': '\n                            Amazon Alexa系列介绍(1)--综述                        ',
            'url': 'http://blog.csdn.net/gybseu/article/details/54564997'
          }
        ]
      },
      {
        'pageName': '\n                            全球首款NB-IoT模块推出 适用于水表                        ',
        'articleList': [
          {
            'title': '\n                            全球首款NB-IoT模块推出 适用于水表                        ',
            'url': 'http://blog.csdn.net/NBIoT/article/details/54943718'
          }
        ]
      },
      {
        'pageName': '\n                            Intellij Idea安装主题包                        ',
        'articleList': [
          {
            'title': '\n                            Intellij Idea安装主题包                        ',
            'url': 'http://blog.csdn.net/laiwenqiang/article/details/72456496'
          }
        ]
      },
      {
        'pageName': '\n                            马云说双十一不挣钱 原来4亿亏在这里！                        ',
        'articleList': [
          {
            'title': '\n                            马云说双十一不挣钱 原来4亿亏在这里！                        ',
            'url': 'http://blog.csdn.net/e848lip6R/article/details/78540258'
          }
        ]
      },
      {
        'pageName': '\n                            聊聊淘宝天猫个性化推荐技术演进史                        ',
        'articleList': [
          {
            'title': '\n                            聊聊淘宝天猫个性化推荐技术演进史                        ',
            'url': 'http://blog.csdn.net/bystarlight/article/details/71522191'
          }
        ]
      },
      {
        'pageName': '\n                            <辨析>-06-日语学习“が”和“は”的区别                        ',
        'articleList': [
          {
            'title': '\n                            <辨析>-06-日语学习“が”和“は”的区别                        ',
            'url': 'http://blog.csdn.net/y7_lucky/article/details/78917244'
          }
        ]
      },
      {
        'pageName': '\n                            大数据24小时：百度发布大数据产品“百度数说”，国内首个媒体人工智能平台宣布上线                        ',
        'articleList': [
          {
            'title': '\n                            大数据24小时：百度发布大数据产品“百度数说”，国内首个媒体人工智能平台宣布上线                        ',
            'url': 'http://blog.csdn.net/YMPzUELX3AIAp7Q/article/details/78919539'
          }
        ]
      },
      {
        'pageName': '\n                            数据猿荣获2017 ECI Festival国际数字商业创新节“最佳大数据媒体奖”                        ',
        'articleList': [
          {
            'title': '\n                            数据猿荣获2017 ECI Festival国际数字商业创新节“最佳大数据媒体奖”                        ',
            'url': 'http://blog.csdn.net/YMPzUELX3AIAp7Q/article/details/78919536'
          }
        ]
      },
      {
        'pageName': '\n                            你看不惯的千禧一代，马云和马化腾都要捧着！                        ',
        'articleList': [
          {
            'title': '\n                            你看不惯的千禧一代，马云和马化腾都要捧着！                        ',
            'url': 'http://blog.csdn.net/cindycinderella/article/details/73838604'
          }
        ]
      },
      {
        'pageName': '\n                            投资逻辑：是追风口，还是等待技术溢出？                        ',
        'articleList': [
          {
            'title': '\n                            投资逻辑：是追风口，还是等待技术溢出？                        ',
            'url': 'http://blog.csdn.net/YMPzUELX3AIAp7Q/article/details/78919591'
          }
        ]
      },
      {
        'pageName': '\n                            全国首个NB-IoT规模化商用 - BC95模块                        ',
        'articleList': [
          {
            'title': '\n                            全国首个NB-IoT规模化商用 - BC95模块                        ',
            'url': 'http://blog.csdn.net/NBIoT/article/details/54893464'
          }
        ]
      },
      {
        'pageName': '\n                            英伟达惹怒诸多客户只为“十一倍收益” ？                        ',
        'articleList': [
          {
            'title': '\n                            英伟达惹怒诸多客户只为“十一倍收益” ？                        ',
            'url': 'http://blog.csdn.net/q1ZG4Sw/article/details/78919689'
          }
        ]
      },
      {
        'pageName': '\n                            您的网站是响应式网站吗？                        ',
        'articleList': [
          {
            'title': '\n                            您的网站是响应式网站吗？                        ',
            'url': 'http://blog.csdn.net/freestyleone/article/details/78711282'
          }
        ]
      },
      {
        'pageName': '\n                            亏损数亿，阿里也要强推99元白菜价智能音箱！背后逻辑到底是啥？                        ',
        'articleList': [
          {
            'title': '\n                            亏损数亿，阿里也要强推99元白菜价智能音箱！背后逻辑到底是啥？                        ',
            'url': 'http://blog.csdn.net/dQCFKyQDXYm3F8rB0/article/details/78631399'
          }
        ]
      },
      {
        'pageName': '\n                            中国省市列表的JSON数据                        ',
        'articleList': [
          {
            'title': '\n                            中国省市列表的JSON数据                        ',
            'url': 'http://blog.csdn.net/qq_33613696/article/details/70847041'
          }
        ]
      },
      {
        'pageName': '\n                            从事GIS开发多年,2017年对GIS行业的心得,尤其对三维GIS的理解                        ',
        'articleList': [
          {
            'title': '\n                            从事GIS开发多年,2017年对GIS行业的心得,尤其对三维GIS的理解                        ',
            'url': 'http://blog.csdn.net/happyduoduo1/article/details/55051626'
          }
        ]
      },
      {
        'pageName': '\n                            win10专业版激活（试试水）                        ',
        'articleList': [
          {
            'title': '\n                            win10专业版激活（试试水）                        ',
            'url': 'http://blog.csdn.net/qq_38628659/article/details/78616486'
          }
        ]
      },
      {
        'pageName': '\n                            <基础>-02-日语中为何会有体言用言？                        ',
        'articleList': [
          {
            'title': '\n                            <基础>-02-日语中为何会有体言用言？                        ',
            'url': 'http://blog.csdn.net/y7_lucky/article/details/78916954'
          }
        ]
      },
      {
        'pageName': '\n                            斯诺登给普通人开发了个「反监控」的 App                        ',
        'articleList': [
          {
            'title': '\n                            斯诺登给普通人开发了个「反监控」的 App                        ',
            'url': 'http://blog.csdn.net/po86BHac10C4/article/details/78915273'
          }
        ]
      },
      {
        'pageName': '\n                            世界主要国家和地区及中国天气气象CSV/JSON/KML数据【免费下载】                        ',
        'articleList': [
          {
            'title': '\n                            世界主要国家和地区及中国天气气象CSV/JSON/KML数据【免费下载】                        ',
            'url': 'http://blog.csdn.net/sinat_34719507/article/details/70567974'
          }
        ]
      }
    ]
  }
]
