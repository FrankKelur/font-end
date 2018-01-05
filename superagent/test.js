function getData () {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      console.log('test')
      resolve({re: 200})
    }, 200)
  })
}

async function test () {
  var d1 = await getData()
  var res = [d1]
  return new Promise((resolve, reject) => {
    new Array(2).fill('zhai').forEach(async (elm, idx) => {
      var data = await getData()
      res.push(data)
      if (idx === 1) {
        resolve(res)
      }
    })
  })

}

test().then(res => {
  console.log('===============\n\n\n\n', res, '\n\n\n\n===============')

})

var ruanyifeng = [
  {
    'url': 'http://www.ruanyifeng.com/blog/essays/',
    'name': '散文',
    'children': [
      {
        'pageName': '2017年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/12/qiang-tang.html',
            'title': '北方的空地'
          },
          {'url': 'http://www.ruanyifeng.com/blog/2017/11/road-ahead.html', 'title': '博客文集《前方的路》发布'}]
      },
      {
        'pageName': '2016年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/12/year_summary.html',
            'title': '我的 2016 年'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/05/time-management.html',
            'title': '时间管理的七句话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/04/you-and-your-research.html',
            'title': '理查德·汉明《你和你的研究》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/03/death.html',
            'title': '《最好的告别》读后感'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/02/youth-by-coetzee.html',
            'title': '库切的《青春》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/02/minsky.html',
            'title': ' "人工智能之父"马文・明斯基'
          }, {'url': 'http://www.ruanyifeng.com/blog/2016/01/ian-murdock.html', 'title': '更多的人死于心碎'}]
      },
      {
        'pageName': '2015年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/stay_hungry_stay_foolish.html',
            'title': 'Stay hungry, Stay foolish 的原义'
          }, {'url': 'http://www.ruanyifeng.com/blog/2015/02/turing-interview.html', 'title': '图灵访谈'}]
      },
      {
        'pageName': '2013年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/09/liang_shuming.html',
            'title': '梁漱溟：做学问的八个境界'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/08/influence_the_psychology_of_persuasion.html',
            'title': '人类的心理行为模式----《影响力》笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/05/one-billion-consumers.html',
            'title': '如何理解当代中国----《十亿消费者》读后感'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/04/entropy.html',
            'title': '熵的社会学意义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/03/apple_inc_and_division_of_labor.html',
            'title': '苹果公司与分工原理'
          }, {'url': 'http://www.ruanyifeng.com/blog/2013/02/chiang_kai-shek.html', 'title': '《蒋介石与现代中国的奋斗》读后感'}]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/09/linus_torvalds.html',
            'title': '《Linus Torvalds自传》摘录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/07/chiang_ching-kuo.html',
            'title': '蒋经国与台湾民主进程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/06/how_to_win_friends_and_influence_people.html',
            'title': '卡耐基人际关系指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/05/ray_huang_s_memoir.html',
            'title': '失败的总和----读《黄河青山：黄仁宇回忆录》'
          }, {'url': 'http://www.ruanyifeng.com/blog/2012/04/hu_shih.html', 'title': '胡适的三个主义'}]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/12/zen_and_the_art_of_motorcycle_maintenance.html',
            'title': '《禅与摩托车维修艺术》读后感'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/12/pain_builds_character.html',
            'title': '痛苦造就性格（也许还造就产品）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/12/ode_to_a_nightingale.html',
            'title': '济慈的《夜莺颂》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/dennis_ritchie.html',
            'title': '保持简单----纪念丹尼斯•里奇（Dennis Ritchie）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/what_I_have_lived_for.html',
            'title': '活着的三个理由'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/steve_jobs_farewell.html',
            'title': '乔布斯的告别'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/09/michael_s_hart_passed_away.html',
            'title': 'Michael S. Hart去世了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/cooking_technology_innovation_movement.html',
            'title': '做饭技术革新运动'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/copyright_of_academic_papers.html',
            'title': '论文的版权属于谁？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/gao_ertai.html',
            'title': '高尔泰的《寻找家园》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/06/jiabian_ditch.html',
            'title': '小说集《夹边沟记事》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/06/unjust_laws_and_disobedient_citizens.html',
            'title': '不正义的法律，不服从的公民'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/900-month_lifespan.html',
            'title': '人生只有900个月'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/zhan_hongzhi.html',
            'title': '詹宏志谈教育、阅读和创业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/03/brave_new_world.html',
            'title': '《美丽新世界》读后感'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/03/what_chinese_government_should_do_now.html',
            'title': '中国经济：转变和对策'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/02/three_kinds_of_chinese_revolution.html',
            'title': '孙中山的三种革命'
          }, {
            'url': 'http://www.ruanyifeng.com/blog/2011/02/book_excerpt_of_the_ju_liu_river.html',
            'title': '《巨流河》书摘'
          }]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/12/hackers_heroes_of_the_computer_revolution.html',
            'title': '《黑客英雄》书摘'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/sovereignty.html',
            'title': '什么是主权？ '
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/what_is_margin.html',
            'title': '什么是边际？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/how_did_nevada_develop_its_economy.html',
            'title': '内华达如何发展经济？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/interesting_economic_history.html',
            'title': '《经济史的趣味》书摘'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/01/until_they_are_old_and_dead.html',
            'title': '等他们老了，死了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/01/why_we_should_tolerate_wrong_words.html',
            'title': '为什么要容忍错误言论？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/01/england_in_16th_century_vs_china_in_21st_century.html',
            'title': '16世纪的英国，21世纪的中国'
          }
        ]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/deciding_or_making_a_decision.html',
            'title': '决定，还是做决定'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/everything_is_possible.html',
            'title': '一切皆有可能'
          }, {'url': 'http://www.ruanyifeng.com/blog/2009/08/why_we_are_anxious.html', 'title': '现代人为什么焦虑？'}]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/internet_and_rebuilding_society.html',
            'title': '互联网和改造社会 '
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/is_luxun_a_optimist.html',
            'title': '鲁迅是乐观主义者吗？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/thoughts_on_one_hundredth_anniversaries_of_li_hongzhang_s_death.html',
            'title': '李鸿章百年祭（旧文重贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/randy_pausch_the_last_lecture.html',
            'title': 'Randy Pausch教授的《最后一课》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/a_reader_in_search_of_the_author.html',
            'title': '一个寻找作者的读者'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/when_you_say_this_egg_is_not_good.html',
            'title': '这鸡蛋真难吃'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/potato_and_peasant_uprisings_of_qing_dynasty.html',
            'title': '土豆和清朝农民起义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/a_lonely_drifter_off_to_see_th.html',
            'title': 'A Lonely Drifter Off To See The World'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/who_will_feed_china.html',
            'title': '谁来养活中国？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2008/03/the_origin_of_violence.html', 'title': '暴力的根源'}]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/interest_rate_and_job.html',
            'title': '利率和职业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/alan_dershowitz.html',
            'title': '为什么给坏人辩护？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/09/the_scarcest_resource_in_the_world.html',
            'title': '世界上最稀缺的资源'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/oration_on_the_dignity_of_man_by_mirandola.html',
            'title': '米兰多拉《论人的尊严》中的一段话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/heroes.html',
            'title': '美国电视剧《英雄》（Heroes）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/self_and_freedom_part_ii.html',
            'title': '自我和自由（续）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/where_the_hell_is_matt.html',
            'title': 'Where the hell is Matt?'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/megatrends_by_john_naisbitt_part_ii.html',
            'title': '奈斯比特《大趋势》笔记（II）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/megatrends_by_john_naisbitt_part_i.html',
            'title': '奈斯比特《大趋势》笔记（I）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/all_my_dreams_are_lost.html',
            'title': '十年书剑皆抛却，一寸丹心半似灰'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/weakness_and_strength.html',
            'title': '弱与力'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/hushih_s_switch_part_i.html',
            'title': '胡适的改行'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/quotes_of_confucius.html',
            'title': '《论语》摘抄'
          }, {'url': 'http://www.ruanyifeng.com/blog/2007/01/the_blood_of_the_world.html', 'title': '骆一禾《世界的血》'}]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/quotes_from_oscar_wilde.html',
            'title': '王尔德的几句话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/full_moon.html',
            'title': '月圆之夜（Full Moon）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/how_to_get_an_idea.html',
            'title': '如何变得有思想？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/a_wicked_report.html',
            'title': '一则邪恶的报道'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/world_bank_say_the_poor_in_china_is_getting_poorer.html',
            'title': '世界银行说，中国的穷人正在变得更穷'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/quotes_from_rich_dad_poor_dad_part_ii.html',
            'title': '《富爸爸，穷爸爸》摘录（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/why_does_government_become_bigger_and_bigger.html',
            'title': '政府为什么会膨涨？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/quotes_from_rich_dad_poor_dad.html',
            'title': '《富爸爸，穷爸爸》摘录（一）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/does_the_cricket_chirp_in_winter.html',
            'title': '冬天有没有蟋蟀？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/memoirs_of_goran_malmqvist.html',
            'title': '马悦然回忆录（Memoirs of Goran Malmqvist）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/technology_disciplines_and_thought_disciplines.html',
            'title': '技术类专业和思想类专业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/paul_getty.html',
            'title': '保罗·格蒂（Paul Getty）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/quotes_from_shiing-shen_chern_a_commemorative_anthology.html',
            'title': '《纪念陈省身先生文集》摘录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/love_letters_of_juliette_drouet.html',
            'title': '朱丽叶·德鲁埃致雨果的情书'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/desires_are_already_memories.html',
            'title': '欲望已成记忆----卡尔维诺《看不见的城市》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/how_to_treat_the_increased_earnings_inequality.html',
            'title': '如何看待贫富差距扩大？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/quentin_suicide_from_sound_and_fury_by_william_faulkner.html',
            'title': '福克纳《喧哗与骚动》：昆丁的自杀'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/control.html',
            'title': '电影《黑客帝国》的台词'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/hamlet_2.html',
            'title': '《哈姆莱特》（Hamlet）：摘录（第三部分）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/hamlet.html',
            'title': '《哈姆莱特》（Hamlet）：摘录（第二部分）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/hamlet_1.html',
            'title': '《哈姆莱特》（Hamlet）：摘录（第一部分）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/albert_einstein.html',
            'title': '爱因斯坦语录（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/post_250.html',
            'title': '美国建国的宗旨'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/post_238.html',
            'title': '《傲慢与偏见》中的几句翻译'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/post_236.html',
            'title': '江声浩荡：《约翰·克里斯朵夫》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/post_235.html',
            'title': '爱好读书的强盗'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/undertaking.html',
            'title': '托马斯·林奇《殡葬人手记》（Undertaking）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/v_for_vendetta.html',
            'title': '《复仇者V》：思想改变世界（V for Vendetta）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/post_229.html',
            'title': '追求生活的道路----读卡尔维诺《树上的男爵》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/propoor_growth.html',
            'title': '亚洲：经济增长没有失业快（pro-poor growth）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/electric_chair.html',
            'title': '电椅的故事（Electric Chair）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/post_220.html',
            'title': '黑塞摘录（一）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/starry_night.html',
            'title': '凡高的星星为什么如此明亮？（Starry Night）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/04/post_207.html',
            'title': '生命中那些虚无的期待'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/post_180.html',
            'title': '人生真相'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/post_177.html',
            'title': '《英国简史》的序言'
          }, {'url': 'http://www.ruanyifeng.com/blog/2006/01/post_167.html', 'title': '身之察察，物之汶汶'}]
      },
      {
        'pageName': '2005年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/11/post_156.html',
            'title': '关于黄仲则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/11/post_155.html',
            'title': '罗马的三位一体'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/11/post_154.html',
            'title': '中世纪的异端'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/09/post_151.html',
            'title': '谈谈《曾国藩家书》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/09/post_148.html',
            'title': '经济权利法案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/09/post_147.html',
            'title': '《天演论》的第一段'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/09/post_146.html',
            'title': '两封信'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_144.html',
            'title': '四种自由'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_141.html',
            'title': '石油和未来的世界经济'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_139.html',
            'title': '陈寅恪的"恪"怎么读？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_134.html',
            'title': '美丽心灵的永恒阳光'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/07/post_131.html',
            'title': '《罗马假日》电影剧本节选'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/07/post_128.html',
            'title': '关于爱德蒙·伯克的笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/07/post_126.html',
            'title': '在等待中消失----读哈金的小说《等待》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/06/post_124.html',
            'title': '拉兹之歌'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/05/post_120.html',
            'title': '爱因斯坦的私生活（三）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/04/post_119.html',
            'title': '爱因斯坦的私生活（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/04/post_118.html',
            'title': '爱因斯坦的私生活（一）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/04/post_115.html',
            'title': '《进步与贫困》读后感'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/04/post_114.html',
            'title': '居里夫人的不伦之恋'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/04/post_113.html',
            'title': '需要爱'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/03/post_110.html',
            'title': '重获自由'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/03/post_109.html',
            'title': '春天，想起海子'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/03/post_104.html',
            'title': '学术著作与可读性'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/03/10.html',
            'title': '10年可以发生什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/03/post_103.html',
            'title': '一个美国政治家的理想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/02/post_101.html',
            'title': '乒乓球水平提高了'
          }, {'url': 'http://www.ruanyifeng.com/blog/2005/02/almost_famous.html', 'title': '电影《Almost Famous》'}]
      },
      {
        'pageName': '2004年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/12/post_95.html',
            'title': '上海下雪了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/12/post_94.html',
            'title': '奥威尔：在神化和真实之间'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/11/post_93.html',
            'title': '冬季一日游'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/11/post_88.html',
            'title': '又见"达官贵人"'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/10/post_86.html',
            'title': '北美殖民地的初婚年龄'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/06/post_82.html',
            'title': '限制房租对谁有利？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/06/post_81.html',
            'title': '创造力来自自由，还是来自财富？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/06/post_79.html',
            'title': '《光荣与梦想》作者去世了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/06/post_75.html',
            'title': '回了一次母校'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/05/post_64.html',
            'title': '关于传记文学'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/04/post_63.html',
            'title': '体制与个性'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/04/post_58.html',
            'title': '中国的四种文学'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/03/post_51.html',
            'title': '手机被窃'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/03/post_48.html',
            'title': '两个永恒之间的布尔斯廷'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/02/80g.html',
            'title': '80G硬盘送修了......'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/02/1001.html',
            'title': '致维克多.雨果的1001封情书'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/02/post_38.html',
            'title': '作者希特勒'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/02/post_31.html',
            'title': '阿特伍德《盲刺客》'
          }, {'url': 'http://www.ruanyifeng.com/blog/2004/01/post_26.html', 'title': '贝克特《等待戈多》'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/opinions/',
    'name': '观点与感想',
    'children': [
      {
        'pageName': '2017年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/11/technology-training.html',
            'title': '技术教育的兴起'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/10/head-transplant.html',
            'title': '换头术'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/09/unabomber.html',
            'title': '卡辛斯基的警告'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/08/smart-shoes.html',
            'title': '你的鞋都比你聪明'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/07/working-poor.html',
            'title': '穷忙的人生'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/06/life-after-45.html',
            'title': '45岁以后的人生'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/05/technology-is-future.html',
            'title': '技术决定历史'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/04/entropy.html',
            'title': '熵：宇宙的终极规则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/03/boundary.html',
            'title': '技术的边界'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/03/crispr.html',
            'title': '高级人类的崛起'
          }, {'url': 'http://www.ruanyifeng.com/blog/2017/01/entainment.html', 'title': '未来的娱乐业'}]
      },
      {
        'pageName': '2016年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/10/online_education.html',
            'title': '网络文凭，你要不要'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/08/useless-people.html',
            'title': '那些无用的人----《人类简史》读后感'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/07/hen-and-front-end-engineer.html',
            'title': '母鸡与前端工程师'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/06/your-destiny-is-not-like-a-mule.html',
            'title': '你的命运不是一头骡子'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/05/group-chat.html',
            'title': '要聊天，先付费'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/04/personality.html',
            'title': '个性也是一种竞争力'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/03/techonology-vs-equality.html',
            'title': '技术会带来社会平等吗？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/03/plan-b.html',
            'title': '你的B计划在哪里？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2016/01/white-collar.html', 'title': '白领的消亡'}]
      },
      {
        'pageName': '2015年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/12/safe-job.html',
            'title': '有没有安全的工作？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/08/password-fatigue.html',
            'title': '密码疲劳'
          }, {'url': 'http://www.ruanyifeng.com/blog/2015/01/border-of-copyright.html', 'title': '版权的边界'}]
      },
      {
        'pageName': '2014年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/12/my-blog-book.html',
            'title': '《如何变得有思想》出版了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/05/my_blog_book.html',
            'title': '我的博客文集上架了！'
          }, {'url': 'http://www.ruanyifeng.com/blog/2014/01/technology_s_future.html', 'title': '技术有什么未来？'}]
      },
      {
        'pageName': '2013年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/11/being-toward-future.html',
            'title': '向着未来而生----《黑客与画家（精装本）》序言'
          }, {'url': 'http://www.ruanyifeng.com/blog/2013/02/tpb.html', 'title': '纪录片《TPB AFK》与现行版权制度'}]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/11/failure_of_healthcare_reform.html',
            'title': '中国医疗改革的失败原因'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/09/extreme_points_of_taiwan.html',
            'title': '台湾四极'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/07/micropayment_result.html',
            'title': '小额支付试验的结果'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/06/taipei.html',
            'title': '台北印象'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/04/museum_of_institute_of_history_and_philology.html',
            'title': '居延汉简和安阳殷墟1001号大墓'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/01/richard_stallman_was_right_all_along.html',
            'title': '理查德·斯托曼一直是对的'
          }, {'url': 'http://www.ruanyifeng.com/blog/2012/01/why_sopa_is_evil.html', 'title': 'SOPA为什么是一部恶法'}]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/09/germany_pirate_party_s_victory.html',
            'title': '德国盗版党选举获胜的感想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/the_pains_of_economic_growth.html',
            'title': '经济增长是如何换来的？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/my_poems.html',
            'title': '我的诗歌'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/google_adsense_continued.html',
            'title': '我的Google Adsense帐户被关（续）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/my_google_adsense_is_disabled.html',
            'title': '我的Google Adsense帐户被关 '
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/on_book_price.html',
            'title': '谈谈书价'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/03/how_mp3_changed_the_music_industry.html',
            'title': 'MP3是如何颠覆音乐行业的'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/01/egypt_shut_down_the_internet.html',
            'title': '当埃及切断了互联网'
          }, {'url': 'http://www.ruanyifeng.com/blog/2011/01/2010_my_blogging_summary.html', 'title': '2010年我的网志总结'}]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/12/in_memory_of_renlan.html',
            'title': '悼任兰'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/when_japan_collapses.html',
            'title': '日本何时崩溃？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/global_map_of_pm25.html',
            'title': '全球空气颗粒污染形势图'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/where_i_am_going.html',
            'title': '何去何从----读六六的《心术》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/it_book_publishing.html',
            'title': '关于IT出版业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/unaccomplished_revolution.html',
            'title': '未完成的革命'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/contributions_for_ma_lizhi.html',
            'title': '关于马粒之的捐款'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/saving_the_boy_ma_lizhi.html',
            'title': '探望白血病儿童马粒之'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/sky_blue_and_black.html',
            'title': '咖啡，还有一首歌'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/what_the_blue_lion_publishing_house_is_like.html',
            'title': '蓝狮子与唐骏博士之绝配'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/immigration_company_ad.html',
            'title': '移民公司的广告（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/shanghai_acid_rain.html',
            'title': '上海的酸雨'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/good_at_talking_good_at_doing.html',
            'title': '善于说，善于做'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/an_unsinkable_tpb.html',
            'title': '不会沉没的海盗湾'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/talk_with_wangjianshuo.html',
            'title': '与王建硕的对话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/about_campus_folk.html',
            'title': '关于高晓松，以及其他的记忆'
          }, {'url': 'http://www.ruanyifeng.com/blog/2010/01/google_to_quit_china.html', 'title': '壮士断腕，义无再辱'}]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/2009_my_blogging_summary.html',
            'title': '2009年我的网志总结'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/i_will_translate_paul_graham.html',
            'title': '我要翻译Paul Graham了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/merry_christmas_from_tpb.html',
            'title': '海盗湾的圣诞祝词'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/should_isp_bear_joint_liabilities.html',
            'title': '网络接入商不应承担连带责任'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/30th_anniversary_of_kaohsiung_incident.html',
            'title': '美丽岛事件30周年纪念及其启示'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/why_i_love_piratebay.html',
            'title': '为什么我喜欢海盗湾？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/tang_jia_ling.html',
            'title': '关于唐家岭'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/professor_tang_degang.html',
            'title': '关于唐德刚先生'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/a_ridiculous_ruling.html',
            'title': '一份超级搞笑的判决书'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/october_10th_2009.html',
            'title': '2009年10月10日'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/living_in_a_library.html',
            'title': '在图书馆定居'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/what_the_government_said_about_shanghai_house_price.html',
            'title': '关于上海房价的政府观点'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/we_are_in_the_gloomy_dark_night_of_storm.html',
            'title': '风雨如晦，夜深似海'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/about_chinese_website_licensing_system.html',
            'title': '关于网站备案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/house_price_is_not_a_moral_problem.html',
            'title': '房价高不是道德问题'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/up_the_tata_without_a_tutu.html',
            'title': '他山之石，不可攻玉'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/06/an_honourable_death_is_better_than_a_disgraceful_life.html',
            'title': '宁为玉碎，不为瓦全'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/about_wang_yifan_s_education.html',
            'title': '关于王建硕儿子的上学问题'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/depreciated_masters_degree.html',
            'title': '硕士学位的贬值'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/after_credentials.html',
            'title': '学历证书的终结'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/apple_notebook_packaging_comparison.html',
            'title': '苹果电脑的包装'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/some_thoughts_on_the_pirate_bay_guilty.html',
            'title': '对海盗湾一审败诉的感想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/spring_is_coming_the_painting.html',
            'title': '油画《春天来了》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/jake_desantis_aig_resignation_letter.html',
            'title': 'AIG副总裁的辞职信'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/economics_is_useless.html',
            'title': '经济学是无用的'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/02/is_gold-farming_bot_in_online_games_a_crime.html',
            'title': '外挂代练是什么罪？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/02/a_labor_law_is_not_enough.html',
            'title': '《劳动合同法》是不够的！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/02/gran_torino.html',
            'title': '电影《Gran Torino》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/01/first_step_of_national_medical_care_system.html',
            'title': '全民医保的第一步'
          }
        ]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/2008_my_blogging_summary.html',
            'title': '2008年我的网志总结'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/snow_was_general_all_over_ireland.html',
            'title': '整个爱尔兰都在下雪'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/the_difference_between_common_law_and_civil_law.html',
            'title': '普通法和大陆法的区别'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/my_state_of_the_chinese_edition_of_the_next_great_bubble_boom.html',
            'title': '关于《2006-2010下一个大泡泡（续）》一书的声明'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/guns_n_roses_new_album_chinese_democracy.html',
            'title': '"枪炮与玫瑰"乐队的新专辑：Chinese Democracy'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/floor_level_of_chinese_economy_growth.html',
            'title': '中国经济增长率的下限'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/fighting_poverty.html',
            'title': '行动起来，消除贫穷'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/the_most_luxury_school_in_shanghai.html',
            'title': '关于上海最豪华的学校'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/chinas_great_depression.html',
            'title': '即将到来的中国大萧条'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/google_10th_birthday_and_my_last_10_years.html',
            'title': 'Google的10年和我的这10年'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/are_we_falling_or_flying.html',
            'title': 'Are we falling or flying?'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/2008_presidential_election.html',
            'title': '关于2008年美国大选'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/boris_johnson.html',
            'title': '关于伦敦市长Boris Johnson'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/the_10_worst_laws_in_china.html',
            'title': '10条最糟糕的中国法律'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/the_legality_of_unplugging_server_cable.html',
            'title': '关于"网线被拔"的合法性'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/one_world_one_dream.html',
            'title': '同一个世界，同一个梦想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/under_beijing_sky.html',
            'title': '北京天空下'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/thoughts_on_a_breaking_news.html',
            'title': '对一起突发事件的观察和思考'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/distribution_inequity.html',
            'title': '什么是"分配不平等"？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/democracy_as_a_universal_value.html',
            'title': '笔记：民主是一种普遍价值观'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/you_got_a_zero_score_and_still_go_to_university.html',
            'title': '从"零分上大学"说起'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/one_scene_in_the_data_center.html',
            'title': '机房见闻和一些其他事'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/china_and_zimbabwe.html',
            'title': '中国和津巴布韦'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/ps_i_love_you.html',
            'title': '电影《P.S. I love you》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/beijing_s_water_crisis.html',
            'title': '北京的水危机'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/beijing_welcome_you.html',
            'title': '北京欢迎您'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/movie_love_in_the_time_of_cholera.html',
            'title': '电影《霍乱时期的爱情》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/face_2008.html',
            'title': '面孔2007（续）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/truth_of_chinese_best_sellers.html',
            'title': '中国畅销书真相'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/pale_blue_dot.html',
            'title': '地球，这个黯淡的蓝点'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/talking_about_the_chinese_government_expenditure.html',
            'title': '谈谈行政管理费'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/earthquake_and_annual_death_toll_in_china.html',
            'title': '地震和全国一年死亡人数'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/covetous_chinese_real_estate_developers.html',
            'title': '贪婪的地产商'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/decline_of_public_ownership_and_china_future.html',
            'title': '国有经济的衰弱与中国的未来'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/red_cross_society_of_china.html',
            'title': '关于中国红十字会'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/what_can_men_do_against_such_reckless_hate.html',
            'title': 'What can men do against such reckless hate?'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/it_is_about_all_freedom_rights.html',
            'title': '它与全部自由权利有关'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/best_joke_on_april_1st.html',
            'title': '愚人节的最佳笑话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/sweeping_a_grave_in_suzhou.html',
            'title': '苏州扫墓'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/life_is_despair.html',
            'title': '绝望的生命'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/degree_and_capability.html',
            'title': '学位的作用'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/status_quo_of_chinese_artists.html',
            'title': '中国美术界的现状'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/paper_price_rising.html',
            'title': '纸张的价格'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/why_chinese_love_saving_money.html',
            'title': '为什么中国人爱储蓄？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2008/01/china_land_ownership_system.html', 'title': '关于中国土地制度'}]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/2007_my_blogging_summary.html',
            'title': '2007年我的Blog总结'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/some_thoughts_about_china_book_market.html',
            'title': '关于中国图书出版业的一些想法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/shanghai_trial_measures_of_basic_medical_insurance_promulgated.html',
            'title': '《上海基本医保施行办法》公布'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/what_is_the_people_s_democratic_dictatorship.html',
            'title': '什么是"人民民主专政"？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/daniele_mattioli.html',
            'title': 'Daniele Mattioli 眼中的上海'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/news_n_editorial.html',
            'title': '新闻和社论'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/09/the_prohibition_against_multipie_dwelling_is_illegal.html',
            'title': '禁止"群租"是否合法？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/09/dirtiest_city_in_the_world.html',
            'title': '世界上最脏的城市'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/09/as_china_roars_pollution_reaches_deadly_extremes.html',
            'title': '《纽约时报》：中国的污染已经到了极限'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/how_to_dismantle_a_chimney.html',
            'title': '烟囱是怎么拆的'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/where_are_the_medical_graduates.html',
            'title': '医科毕业生到哪里去了？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/172_disappeared_miners.html',
            'title': '长眠矿底的172名矿工'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/china_internet_publishing_license_system.html',
            'title': '关于"互联网出版许可证"'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/a_political_book_review.html',
            'title': '一篇政治类读书笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/lang_xianping_s_speech_in_toronto.html',
            'title': '郞咸平在多伦多的演讲'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/how_high_is_the_profit_of_textbook.html',
            'title': '教材的利润有多高？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/a_pair_of_misable_pandas.html',
            'title': '一对不幸的熊猫'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/self_and_freedom.html',
            'title': '自我和自由'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/04/illness_reveals_true_life_in_china.html',
            'title': '人生的真相就是一场病'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/04/guo_taiming.html',
            'title': '郭台铭'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/blood_diamond.html',
            'title': '电影《血钻》（Blood Diamond）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/the_benefits_of_giving_a_speech.html',
            'title': '演讲的好处'
          }, {'url': 'http://www.ruanyifeng.com/blog/2007/02/how_the_journalist_was_killed.html', 'title': '记者是这样被打死的'}]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/democracy_to_be_or_not_to_be.html',
            'title': '民主，先行还是后行？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/why_i_keep_blogging.html',
            'title': '为什么要写Blog？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/party_branch_has_been_set_up_in_wal-mart_china.html',
            'title': '沃尔玛成立党支部了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/why_to_study_economics.html',
            'title': '为什么学习经济学？----庇古的故事'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/milton_friedman_is_gone.html',
            'title': '米尔顿·弗里德曼去世了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/bring_in_the_green_cat_by_thomas_freedman.html',
            'title': '托马斯·弗里德曼《中国需要一只绿猫》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/a_robbery_on_nanjing_road.html',
            'title': '南京路上的抢劫案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/another_failure_of_china_diplomacy.html',
            'title': '中国外交的又一个失败'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/the_relationship_between_scholars_and_media.html',
            'title': '学者和媒体的关系'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/galileo_galilei_letter_to_the_grand_duchess_christina_of_tuscany_1615.html',
            'title': '伽利略的一封信'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/nihilism_bourgeois-ism_and_sensualism.html',
            'title': '虚无主义，庸人主义和肉欲主义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/something_more_important_than_a_million_dollars.html',
            'title': '比100万美元更重要的'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_266.html',
            'title': '从学部委员看中国社会科学的尴尬'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_267.html',
            'title': '民生和民权重于经济增长'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_257.html',
            'title': '大学的农村生源'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/post_246.html',
            'title': '不造汽车就是傻瓜'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/word_made_flesh.html',
            'title': '道成肉身（Word Made Flesh）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/crony_capitalism.html',
            'title': '裙带资本主义（Crony Capitalism）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/post_201.html',
            'title': '李银河：采访我，请付费'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/post_200.html',
            'title': '谢国忠《改革的成本》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/post_199.html',
            'title': '知识经济中的贫富差距固定化'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/post_179.html',
            'title': '学科和采矿'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/post_178.html',
            'title': '什么是历史过程？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2006/01/post_170.html', 'title': '《金刚》：美女与野兽'}]
      },
      {
        'pageName': '2005年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_138.html',
            'title': '两则新闻'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_135.html',
            'title': '命比煤贱'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/05/post_123.html',
            'title': '鸟进了森林怎会再投笼？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2005/03/post_107.html', 'title': '两种社会'}]
      },
      {
        'pageName': '2004年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/05/post_70.html',
            'title': '国有工厂的工人为什么要下岗？(下)'
          }, {'url': 'http://www.ruanyifeng.com/blog/2004/05/post_69.html', 'title': '国有工厂的工人为什么要下岗？(上)'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/algorithm/',
    'name': '算法与数学',
    'children': [
      {
        'pageName': '2017年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/12/image-and-wave-filters.html',
            'title': '图像与滤波'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/08/normal-distribution.html',
            'title': '正态分布为什么常见？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2017/07/neural-network.html', 'title': '神经网络入门'}]
      },
      {
        'pageName': '2016年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2016/07/edge-recognition.html', 'title': '如何识别图像边缘？'}]
      },
      {
        'pageName': '2015年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/09/matrix-multiplication.html',
            'title': '理解矩阵乘法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/07/monte-carlo-method.html',
            'title': '蒙特卡罗方法入门'
          }, {'url': 'http://www.ruanyifeng.com/blog/2015/06/poisson-distribution.html', 'title': '泊松分布和指数分布：10分钟教程'}]
      },
      {
        'pageName': '2013年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/12/naive_bayes_classifier.html',
            'title': '朴素贝叶斯分类器的应用'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/03/similar_image_search_part_ii.html',
            'title': '相似图片搜索的原理（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/03/automatic_summarization.html',
            'title': 'TF-IDF与余弦相似性的应用（三）：自动摘要'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/03/cosine_similarity.html',
            'title': 'TF-IDF与余弦相似性的应用（二）：找出相似文章'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/03/tf-idf.html',
            'title': 'TF-IDF与余弦相似性的应用（一）：自动提取关键词'
          }, {'url': 'http://www.ruanyifeng.com/blog/2013/01/poisson_distribution.html', 'title': '泊松分布与美国枪击案'}]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/11/gaussian_blur.html',
            'title': '高斯模糊的算法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/10/spelling_corrector.html',
            'title': ' 贝叶斯推断及其互联网应用（三）：拼写检查'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/09/imaginary_number.html',
            'title': '虚数的意义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_bayesian_average.html',
            'title': '基于用户投票的排名算法（六）：贝叶斯平均'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_wilson_score_interval.html',
            'title': '基于用户投票的排名算法（五）：威尔逊区间'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_newton_s_law_of_cooling.html',
            'title': '基于用户投票的排名算法（四）：牛顿冷却定律'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_stack_overflow.html',
            'title': '基于用户投票的排名算法（三）：Stack Overflow'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/03/ranking_algorithm_reddit.html',
            'title': '基于用户投票的排名算法（二）：Reddit'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/02/ranking_algorithm_hacker_news.html',
            'title': '基于用户投票的排名算法（一）：Delicious和Hacker News'
          }
        ]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/11/dice_portrait.html',
            'title': '骰子作画的算法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_two.html',
            'title': '贝叶斯推断及其互联网应用（二）：过滤垃圾邮件'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/bayesian_inference_part_one.html',
            'title': '贝叶斯推断及其互联网应用（一）：定理简介'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/principle_of_similar_image_search.html',
            'title': '相似图片搜索的原理'
          }, {'url': 'http://www.ruanyifeng.com/blog/2011/07/mathematical_constant_e.html', 'title': '数学常数e的含义'}]
      },
      {
        'pageName': '2009年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2009/01/what_is_a_circle.html', 'title': '关于圆的定义'}]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/a_puzzle_from_terrence_tao.html',
            'title': '陶哲轩的数学题'
          }
        ]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/developer/',
    'name': '开发者手册',
    'children': [
      {
        'pageName': '2017年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html',
            'title': '持续集成服务 Travis CI 教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/11/bash-set.html',
            'title': 'Bash 脚本 set 命令教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/11/2fa-tutorial.html',
            'title': '双因素认证（2FA）教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/10/bulma.html',
            'title': 'CSS 框架 Bulma 教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/10/open-source-license-tutorial.html',
            'title': '开源许可证教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/09/flame-graph.html',
            'title': '如何读懂火焰图？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/08/issue.html',
            'title': '如何使用 Issue 管理软件项目？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/08/elasticsearch.html',
            'title': '全文搜索引擎 Elasticsearch 入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/07/xmonad.html',
            'title': '窗口管理器 xmonad 教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/07/pull_request.html',
            'title': 'Pull Request 的命令行管理'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/06/custom-elements.html',
            'title': 'HTML 自定义元素教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/06/raspberry-pi-tutorial.html',
            'title': '树莓派新手入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html',
            'title': 'Server-Sent Events 教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/05/websocket.html',
            'title': 'WebSocket 教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/05/css-variables.html',
            'title': 'CSS 变量教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/05/fish_shell.html',
            'title': 'Fish shell 入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/04/emoji.html',
            'title': 'Emoji 简介'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/04/css_in_js.html',
            'title': 'CSS in JS 简介'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/03/gartner-hype-cycle.html',
            'title': '技术的热门度曲线'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/02/fp-tutorial.html',
            'title': '函数式编程入门教程'
          }, {'url': 'http://www.ruanyifeng.com/blog/2017/02/filename-should-be-lowercase.html', 'title': '为什么文件名要小写？'}]
      },
      {
        'pageName': '2016年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/10/document_style_guide.html',
            'title': '中文技术文档的写作规范'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/csp.html',
            'title': 'Content Security Policy 入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/how_amazon_take_soa.html',
            'title': '亚马逊如何变成 SOA（面向服务的架构）？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/conservative_vs_liberal_programmer.html',
            'title': '程序员小测试：保守派 vs 自由派'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/software-architecture.html',
            'title': '软件架构入门'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html',
            'title': 'HTTPS 升级指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/08/http.html',
            'title': 'HTTP 协议入门'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/07/yaml.html',
            'title': 'YAML 语言教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/07/google-monolithic-source-repository.html',
            'title': '谷歌的代码管理'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/06/css_modules.html',
            'title': 'CSS Modules 用法教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-part-two.html',
            'title': 'Systemd 入门教程：实战篇'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/03/systemd-tutorial-commands.html',
            'title': 'Systemd 入门教程：命令篇'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/02/linux-daemon.html',
            'title': 'Linux 守护进程的启动方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html',
            'title': 'Commit message 和 Change log 编写指南'
          }, {'url': 'http://www.ruanyifeng.com/blog/2016/01/website-obesity-crisis.html', 'title': '网站的肥胖症危机'}]
      },
      {
        'pageName': '2015年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/12/git-workflow.html',
            'title': 'Git 工作流程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html',
            'title': '常用 Git 命令清单'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/09/git-bitmap.html',
            'title': 'Github 的清点对象算法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html',
            'title': '持续集成是什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html',
            'title': '网页性能管理详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/08/git-use-process.html',
            'title': 'Git 使用规范流程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/07/flex-examples.html',
            'title': 'Flex 布局教程：实例篇'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html',
            'title': 'Flex 布局教程：语法篇'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/04/fortune.html',
            'title': 'fortune 命令简介'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/03/build-website-with-make.html',
            'title': '使用 Make 构建网站'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/02/future-of-dom.html',
            'title': '也许，DOM 不是答案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/02/make.html',
            'title': 'Make 命令教程'
          }, {'url': 'http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html', 'title': 'MVC，MVP 和 MVVM 的图示'}]
      },
      {
        'pageName': '2014年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/11/basic-charts.html',
            'title': '数据可视化：基本图表'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/09/ssl-latency.html',
            'title': ' SSL延迟有多大？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html',
            'title': '图解SSL/TLS协议'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/07/chinese_fonts.html',
            'title': '中文字体网页开发指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/06/git_remote.html',
            'title': 'Git远程操作详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/05/restful_api.html',
            'title': 'RESTful API 设计指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/05/oauth_2_0.html',
            'title': '理解OAuth 2.0'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/03/server_setup.html',
            'title': 'Linux服务器的初步配置流程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html',
            'title': 'CSS动画简介'
          }, {'url': 'http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html', 'title': 'SSL/TLS协议运行机制的概述'}]
      },
      {
        'pageName': '2013年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html',
            'title': 'PostgreSQL新手入门'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/07/how_to_make_search_engines_find_ajax_content.html',
            'title': '如何让搜索引擎抓取AJAX内容？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/07/gpg.html',
            'title': 'GPG入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/06/html_email.html',
            'title': 'HTML Email 编写指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/06/emmet_and_haml.html',
            'title': 'HTML代码简写法：Emmet和Haml'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/01/secure_boot.html',
            'title': '反Secure Boot垄断：兼谈如何在Windows 8电脑上安装Linux'
          }
        ]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/12/obama_fundraising_website.html',
            'title': '奥巴马筹款网站的制作过程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/11/compass.html',
            'title': 'Compass用法指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/10/google_calendar_lite_reloaded.html',
            'title': 'Google日历简易版 2.0'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/10/password-less_login.html',
            'title': '网站的无密码登录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/08/how_to_read_diff.html',
            'title': '读懂diff'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html',
            'title': '搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/07/git.html',
            'title': 'Git分支管理策略'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/06/sass.html',
            'title': 'SASS用法指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/05/responsive_web_design.html',
            'title': '自适应网页设计（Responsive Web Design）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/01/how_to_synchronize_weibo_with_twitter.html',
            'title': 'Twitter同步新浪微博的一个解决方案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/01/a_bash_script_of_apache_log_analysis.html',
            'title': '处理Apache日志的Bash脚本'
          }
        ]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/09/c_programming_language_textbooks.html',
            'title': '学习C语言的教材'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/09/restful.html',
            'title': '理解RESTful架构'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/09/curl.html',
            'title': 'curl网站开发指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/list_of_cloud_platforms.html',
            'title': '云平台服务商一览'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/opensource_java_web_development_tools.html',
            'title': 'Java开源建站工具'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/bookmarklet_of_unshortening_url.html',
            'title': '短网址还原的Bookmarklet'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html',
            'title': '如何选择开源许可证？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/the_economics_of_dropbox.html',
            'title': 'Dropbox的成本估算'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/03/url_hash.html',
            'title': 'URL的井号'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html',
            'title': 'HTTPS的七个误解（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/01/api_for_google_s_url_shortener.html',
            'title': 'Google短网址的API'
          }, {'url': 'http://www.ruanyifeng.com/blog/2011/01/json_in_php.html', 'title': '在PHP语言中使用JSON'}]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/12/php_best_practices.html',
            'title': 'PHP最佳实践'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/12/detailed_explanation_of_css3_rounded_corners.html',
            'title': 'CSS3圆角详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/11/61_things_every_web_developer_should_know.html',
            'title': '网站开发人员应该知道的61件事'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/six_principles_of_layout_design.html',
            'title': '排版六原则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/12_colors_used_in_web_design.html',
            'title': '网页设计的12种颜色'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/illustration_web_design.html',
            'title': '插图式主页'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/moscow_metro_map.html',
            'title': '莫斯科地铁交通图'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/my_wp_tweet_archive.html',
            'title': '我的Tweet档案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/the_solution_of_full_text_feed.html',
            'title': '全文Feed的终极解决方案'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/css_speech_bubbles.html',
            'title': '制作CSS气泡框'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/03/css_cookbook.html',
            'title': 'CSS使用技巧'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/03/cross-browser_css3_features.html',
            'title': 'CSS3常用功能的写法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/03/built_a_image_server.html',
            'title': '搭建了一个图片库'
          }, {'url': 'http://www.ruanyifeng.com/blog/2010/02/url_encoding.html', 'title': '关于URL编码'}]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/5_ways_to_search_for_files_using_the_terminal.html',
            'title': 'Linux的五个查找命令'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/xpath_path_expressions.html',
            'title': 'xpath路径表达式笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/data_types_and_json.html',
            'title': '数据类型和Json格式'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/guide_to_semantic_html_elements.html',
            'title': 'HTML语言编写指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/html_table_mastering.html',
            'title': '精通HTML表格的使用'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/some_website_statistics.html',
            'title': '关于网页设计的一些统计数字'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/float_clearing.html',
            'title': '浮动元素容器的clearing问题'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/the_psychology_of_web_performance.html',
            'title': '网页打开速度的心理学'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/tcp-ip_model.html',
            'title': 'TCP/IP模型的一个简单解释'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/css_selectors.html',
            'title': 'CSS选择器笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/rpx_trial_thoughts.html',
            'title': 'Openid托管服务RPX试用感想'
          }, {'url': 'http://www.ruanyifeng.com/blog/2009/03/creating_gmail-like_buttons.html', 'title': '制作Gmail式按钮'}]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/a_visual_guide_to_version_control.html',
            'title': '版本控制入门插图教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/jacobsen_v_katzer.html',
            'title': 'Jacobsen v. Katzer：开源运动的一个重大胜利'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/best_webpage_width_and_realization.html',
            'title': '最佳网页宽度及其实现'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/color_tools.html',
            'title': '一些颜色工具网站'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/color_theory.html',
            'title': '关于颜色理论'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/php_spl_notes.html',
            'title': 'PHP SPL笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/typography_notes.html',
            'title': '字体笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/helvetica_50th_anniversary.html',
            'title': 'Helvetica字体的50年'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/base64.html',
            'title': 'Base64笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/mime.html',
            'title': 'MIME笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/firebug_tutorial.html',
            'title': 'Firebug入门指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/css_background_image_positioning.html',
            'title': 'CSS中背景图片定位方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/growth_of_utf-8_on_the_web.html',
            'title': 'utf-8编码已经成为主流'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/googles_design_guidelines.html',
            'title': 'Google的设计原则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/six_criteria_of_a_business-critical_programming_language.html',
            'title': '编程语言的六个标准'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/rdf.html',
            'title': '资源描述框架RDF'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/codes_for_language_names.html',
            'title': '语种名称代码'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/notes_on_the_cathedral_and_the_bazaar.html',
            'title': '《大教堂和集市》笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/javascript_book_recommendation.html',
            'title': '学习Javascript的书籍'
          }
        ]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/google_s_software_principles.html',
            'title': 'Google遵循的软件行为准则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/google_chart_api.html',
            'title': 'Google Chart API'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/mvc.html',
            'title': '谈谈MVC模式'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/three_principles_of_web_design.html',
            'title': '工业设计三原则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/camelcase.html',
            'title': '骆驼拼写法（CamelCase）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/04/principles_of_providing_a_tool.html',
            'title': '制作工具的原则'
          }, {'url': 'http://www.ruanyifeng.com/blog/2007/03/rfc2119.html', 'title': 'RFC2119：表示要求的动词'}]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/minimalism_of_web_design.html',
            'title': '网站设计的最简主义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/laziness_impatience_and_hubris.html',
            'title': '懒惰、急躁和傲慢（Laziness, Impatience and hubris）'
          }, {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/programming_language_evaluations.html',
            'title': '几种计算机语言的评价'
          }]
      },
      {
        'pageName': '2005年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2005/03/post_112.html', 'title': '比尔·盖茨和理查德·斯托曼'}]
      },
      {
        'pageName': '2004年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2004/06/gpl.html', 'title': '自由软件许可证GPL'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/computer/',
    'name': '理解计算机',
    'children': [
      {
        'pageName': '2018年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2018/01/bitcoin-tutorial.html', 'title': '比特币入门教程'}]
      },
      {
        'pageName': '2017年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/12/blockchain-tutorial.html',
            'title': '区块链入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/07/iaas-paas-saas.html',
            'title': 'IaaS，PaaS，SaaS 的区别'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/06/smtp-protocol.html',
            'title': '如何验证 Email 地址：SMTP 协议入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/06/tcp-protocol.html',
            'title': 'TCP 协议简介'
          }, {'url': 'http://www.ruanyifeng.com/blog/2017/05/xor.html', 'title': 'XOR 加密简介'}]
      },
      {
        'pageName': '2016年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/12/user_space_vs_kernel_space.html',
            'title': 'User space 与 Kernel space'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/11/byte-order.html',
            'title': '理解字节序'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/08/boolean-algebra.html',
            'title': '布尔代数入门'
          }, {'url': 'http://www.ruanyifeng.com/blog/2016/06/dns.html', 'title': 'DNS 原理入门'}]
      },
      {
        'pageName': '2015年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/09/0x7c00.html',
            'title': '为什么主引导记录的内存地址是0x7C00？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2015/07/monad.html', 'title': '图解 Monad'}]
      },
      {
        'pageName': '2014年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/11/compiler.html',
            'title': '编译器的工作过程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/09/information-entropy.html',
            'title': '数据压缩与信息熵'
          }, {'url': 'http://www.ruanyifeng.com/blog/2014/07/database_implementation.html', 'title': '数据库的最简单实现'}]
      },
      {
        'pageName': '2013年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/11/stack.html',
            'title': 'Stack的三种含义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/10/register.html',
            'title': '为什么寄存器比内存快？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/08/linux_boot_process.html',
            'title': 'Linux 的启动流程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/07/rsa_algorithm_part_two.html',
            'title': 'RSA算法原理（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/06/rsa_algorithm_part_one.html',
            'title': 'RSA算法原理（一）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/05/boyer-moore_string_search_algorithm.html',
            'title': '字符串匹配的Boyer-Moore算法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/05/Knuth–Morris–Pratt_algorithm.html',
            'title': '字符串匹配的KMP算法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html',
            'title': '进程与线程的一个简单解释'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/02/booting.html',
            'title': '计算机是如何启动的？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2013/01/abstraction_principles.html', 'title': '代码的抽象三原则'}]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/06/internet_protocol_suite_part_ii.html',
            'title': '互联网协议入门（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/05/internet_protocol_suite_part_i.html',
            'title': '互联网协议入门（一）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/04/functional_programming.html',
            'title': '函数式编程初探'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/02/a_history_of_unix_directory_structure.html',
            'title': 'Unix目录结构的来历'
          }
        ]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html',
            'title': 'SSH原理与运用（二）：远程操作与端口转发'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html',
            'title': 'SSH原理与运用（一）：远程登录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/12/inode.html',
            'title': '理解inode'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/11/eof.html',
            'title': 'EOF是什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/characters_per_line.html',
            'title': '每行字符数（CPL）的起源'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html',
            'title': '数字签名是什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/linux_load_average_explained.html',
            'title': '理解Linux系统负荷'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/history_of_dos.html',
            'title': 'DOS的历史'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/03/4-bit_computer.html',
            'title': '四位计算机的原理及其实现'
          }, {'url': 'http://www.ruanyifeng.com/blog/2011/02/the_most_common_phone_number.html', 'title': '最常见的电话号码'}]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/what_is_cloud_hosting.html',
            'title': '云主机是什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/why_lisp_is_superior.html',
            'title': '为什么Lisp语言如此先进？（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/ieee_floating-point_representation.html',
            'title': '浮点数的二进制表示'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/03/programming_language_evaluations_revised.html',
            'title': '几种计算机语言的评价（修订版）'
          }, {'url': 'http://www.ruanyifeng.com/blog/2010/03/unix_copyright_history.html', 'title': 'Unix版权史'}]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/what_is_web_service.html',
            'title': 'Web service是什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/twos_complement.html',
            'title': '关于2的补码'
          }, {'url': 'http://www.ruanyifeng.com/blog/2009/06/unix_philosophy.html', 'title': '关于Unix哲学'}]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html',
            'title': '字符编码笔记：ASCII，Unicode 和 UTF-8'
          }
        ]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/notes_on_cryptography.html',
            'title': '密码学笔记'
          }, {'url': 'http://www.ruanyifeng.com/blog/2006/04/post_213.html', 'title': '回车和换行'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/javascript/',
    'name': 'JavaScript',
    'children': [
      {
        'pageName': '2017年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/09/es6_primer_3rd_edition.html',
            'title': '《ES6 标准入门（第3版）》上市了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/09/asmjs_emscripten.html',
            'title': 'asm.js 和 Emscripten 入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/08/koa.html',
            'title': 'Koa 框架教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/04/memory-leak.html',
            'title': 'JavaScript 内存泄漏教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/03/reduce_transduce.html',
            'title': 'Reduce 和 Transduce 的含义'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2017/03/pointfree.html',
            'title': 'Pointfree 编程风格指南'
          }, {'url': 'http://www.ruanyifeng.com/blog/2017/03/ramda.html', 'title': 'Ramda 函数库参考教程'}]
      },
      {
        'pageName': '2016年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/11/javascript.html',
            'title': 'JavaScript 全栈工程师培训教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html',
            'title': 'IntersectionObserver API 使用教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html',
            'title': 'npm scripts 使用指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html',
            'title': 'React 技术栈系列教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html',
            'title': 'Redux 入门教程（三）：React-Redux 的用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html',
            'title': 'Redux 入门教程（二）：中间件与异步操作'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html',
            'title': 'Redux 入门教程（一）：基本用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/05/react_router.html',
            'title': 'React Router 使用教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/04/cors.html',
            'title': '跨域资源共享 CORS 详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html',
            'title': '浏览器同源政策及其规避方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/03/node-systemd-tutorial.html',
            'title': 'Node 应用的 Systemd 启动'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/02/react-testing-tutorial.html',
            'title': 'React 测试入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/01/babel.html',
            'title': 'Babel 入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/01/npm-install.html',
            'title': 'npm 模块安装机制简介'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2016/01/ecmascript-6-primer.html',
            'title': '《ES6 标准入门》（第二版）出版了'
          }, {'url': 'http://www.ruanyifeng.com/blog/2016/01/flux.html', 'title': 'Flux 架构入门教程'}]
      },
      {
        'pageName': '2015年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html',
            'title': '测试框架 Mocha 实例教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/11/ecmascript-specification.html',
            'title': '读懂 ECMAScript 规格'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/11/circular-dependency.html',
            'title': 'JavaScript 模块的循环加载'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/06/es-checker.html',
            'title': 'ES6 的功能侦测库 ES-Checker'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/06/istanbul.html',
            'title': '代码覆盖率工具 Istanbul 入门教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html',
            'title': 'Node.js 命令行程序开发教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/commonjs-in-browser.html',
            'title': '浏览器加载 CommonJS 模块的原理与实现'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/require.html',
            'title': 'require() 源码解读'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/async.html',
            'title': 'async 函数的含义和用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/co.html',
            'title': 'co 函数库的含义和用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/05/thunk.html',
            'title': 'Thunk 函数的含义和用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/04/generator.html',
            'title': 'Generator 函数的含义与用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/04/tail-call.html',
            'title': '尾调用优化'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/03/react.html',
            'title': 'React 入门实例教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2015/02/flexible-javascript.html',
            'title': 'JavaScript 有多灵活？'
          }, {
            'url': 'http://www.ruanyifeng.com/blog/2015/02/strong-typing-javascript.html',
            'title': '强类型 JavaScript 的解决方案'
          }]
      },
      {
        'pageName': '2014年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/12/unicodejavascript.html',
            'title': 'Unicode与JavaScript详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/12/unicode.html',
            'title': 'Unicode与JavaScript详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/10/event-loop.html',
            'title': 'JavaScript 运行机制详解：再谈Event Loop'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/09/package-management.html',
            'title': '前端模块管理器简介'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/04/ecmascript_6_primer.html',
            'title': '《ECMAScript 6入门》上线了'
          }, {'url': 'http://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html', 'title': 'undefined与null的区别'}]
      },
      {
        'pageName': '2013年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/10/event_loop.html',
            'title': '什么是 Event Loop？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/09/finite-state_machine_for_javascript.html',
            'title': 'JavaScript与有限状态机'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/07/how_to_make_search_engines_find_ajax_content.html',
            'title': '如何让搜索引擎抓取AJAX内容？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/05/jquery-free.html',
            'title': '如何做到 jQuery-free？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html',
            'title': 'JavaScript Source Map 详解'
          }, {
            'url': 'http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html',
            'title': 'Javascript 严格模式详解'
          }]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/12/asynchronous＿javascript.html',
            'title': 'Javascript异步编程的4种方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/11/require_js.html',
            'title': 'Javascript模块化编程（三）：require.js的用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html',
            'title': 'Javascript模块化编程（二）：AMD规范'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/10/javascript_module.html',
            'title': 'Javascript模块化编程（一）：模块的写法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html',
            'title': 'XMLHttpRequest Level 2 使用指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/08/file_upload.html',
            'title': '文件上传的渐进式增强'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/07/three_ways_to_define_a_javascript_class.html',
            'title': 'Javascript定义类（class）的三种方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/04/javascript_programming_style.html',
            'title': 'Javascript编程风格'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/02/6_online_playgrounds_for_web_developing.html',
            'title': '网页开发的6种在线调试环境'
          }
        ]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/javascript_loading.html',
            'title': 'Javascript文件加载：LABjs和RequireJS'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/a_detailed_explanation_of_jquery_deferred_object.html',
            'title': 'jQuery的deferred对象详解'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/jquery_best_practices.html',
            'title': 'jQuery最佳实践'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/jquery_fundamentals.html',
            'title': 'jQuery设计思想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/06/10_design_defects_in_javascript.html',
            'title': 'Javascript的10个设计缺陷'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html',
            'title': 'Javascript诞生记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/06/a_guide_for_writing_bookmarklet.html',
            'title': 'Bookmarklet编写指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html',
            'title': 'Javascript继承机制的设计思想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/how_to_judge_the_existence_of_a_global_object_in_javascript.html',
            'title': '如何判断Javascript对象是否存在'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html',
            'title': '快速排序（Quicksort）的Javascript实现'
          }, {'url': 'http://www.ruanyifeng.com/blog/2011/03/firebug_console_tutorial.html', 'title': 'Firebug控制台详解'}]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/anti-frameset_javascript_codes_continued.html',
            'title': '防止网页被嵌入框架的代码（续）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html',
            'title': 'Javascript面向对象编程（三）：非构造函数的继承'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html',
            'title': 'Javascript面向对象编程（二）：构造函数的继承'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html',
            'title': 'Javascript 面向对象编程（一）：封装'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html',
            'title': 'Javascript的this用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/01/12_javascript_syntax_structures_you_should_not_use.html',
            'title': '12种不宜使用的Javascript语法'
          }
        ]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html',
            'title': '用Javascript获取页面元素的位置'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html',
            'title': '学习Javascript闭包（Closure）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/ie8_developer_tools_tutorial_part_ii.html',
            'title': 'IE8开发人员工具教程（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/ie8_developer_tools_tutorial_part_i.html',
            'title': 'IE8开发人员工具教程（一）'
          }
        ]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/anti-frameset_javascript_codes.html',
            'title': '防止网页被嵌入框架的代码'
          }
        ]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/startup/',
    'name': '创业',
    'children': [
      {
        'pageName': '2016年',
        'articleList': [{
          'url': 'http://www.ruanyifeng.com/blog/2016/03/performance-management.html',
          'title': '谷歌的绩效管理'
        }]
      },
      {
        'pageName': '2015年',
        'articleList': [{
          'url': 'http://www.ruanyifeng.com/blog/2015/09/career-advice.html',
          'title': '七个对我最重要的职业建议（译文）'
        }]
      },
      {
        'pageName': '2014年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2014/10/real-leadership-lessons-of-steve-jobs.html',
            'title': '乔布斯的管理课'
          }, {'url': 'http://www.ruanyifeng.com/blog/2014/06/airbnb.html', 'title': 'Airbnb与创投'}]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/08/questions_you_need_to_ask_in_an_interview.html',
            'title': '面试时，如何向公司提问？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2012/02/facebook_slogans.html', 'title': 'Facebook的标语'}]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/11/tisiwi_demo_day.html',
            'title': '天使湾创业之夏Demo Day见闻'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/dont_call_yourself_a_programmer.html',
            'title': '不要自称为程序员'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/the_quiet_mode_of_influence.html',
            'title': '影响力的静模式'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/stephen_wolfram.html',
            'title': 'Stephen Wolfram自述'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/dont_compete_on_features.html',
            'title': '不要在功能上竞争'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/05/pang_xiaowei.html',
            'title': '庞小伟谈互联网创业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/the_dan_plan.html',
            'title': 'Dan计划：重新定义人生的10000个小时'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/how_to_get_a_real_education.html',
            'title': '差生学什么？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/01/never_check_email_first_thing_in_the_morning.html',
            'title': '为什么起床后不能收邮件？'
          }, {
            'url': 'http://www.ruanyifeng.com/blog/2011/01/five_questions_to_develope_a_project.html',
            'title': '产品五问'
          }]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/12/paul_graham_the_disruptor_in_the_valley.html',
            'title': 'Paul Graham：撼动硅谷的人（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/12/how_to_interview_a_programmer.html',
            'title': '如何面试程序员？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/how_john_vechey_the_founder_of_popcap_did_it.html',
            'title': '从0到1亿美元 ---- PopCap创始人John Vechey自述'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/getting_rejected.html',
            'title': '被拒绝，也是一种肯定'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/50_things_every_startup_should_know.html',
            'title': '创业者需要知道的50句话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/thomas_edison_s_first_patent.html',
            'title': '爱迪生的第一项专利'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/technology_and_income_disparity.html',
            'title': '技术与贫富分化（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/not_working_hard_for_a_big_company.html',
            'title': '别为大公司拼命（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/stay_foolish.html',
            'title': '保持愚蠢'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/how_to_keep_someone_with_you_forever.html',
            'title': '如何让员工忠于公司？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/work_at_a_startup.html',
            'title': '创业公司打工指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/dropbox_startup_lessons_learned.html',
            'title': 'Dropbox的创业经历'
          }, {'url': 'http://www.ruanyifeng.com/blog/2010/05/dropout_entrepreneur.html', 'title': '要创业，先退学（译文）'}]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/freenomics.html',
            'title': '免费经济学'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/business_model.html',
            'title': '关于经营模式'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/the_secret_of_surviving_bootstrappers.html',
            'title': '小企业的生存之道'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/idealist_must_die_in_china.html',
            'title': '在这里，你终究会真正地失败'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/big_hole_and_little_shovel.html',
            'title': '大坑和小铲子'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/06/da_code.html',
            'title': '关于Da Code'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/06/why_working_in_a_big_company_is_so_boring.html',
            'title': '为什么在大公司工作，总是很无聊？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/10_lessons_from_a_failed_startup_part_two.html',
            'title': '创业失败的10个教训（下）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/05/10_lessons_from_a_failed_startup_part_one.html',
            'title': '创业失败的10个教训（上）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/michael_moritz_on_start-up.html',
            'title': 'Michael Moritz谈创业'
          }, {'url': 'http://www.ruanyifeng.com/blog/2009/01/stuff_that_matters.html', 'title': '什么是重要的事情？'}]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/why_to_start_a_startup_in_a_bad_economy.html',
            'title': 'Paul Graham：为什么在经济危机中创业？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/an_interview_with_zhu_min_on_internet_start-up.html',
            'title': '朱敏谈互联网创业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/how_do_you_live_out_your_career_life.html',
            'title': '如何度过职业生涯？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/jjhou_s_career_suggestions.html',
            'title': '侯捷的职业建议'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/the_future_of_web_startups_part_ii.html',
            'title': 'Paul Graham：未来的互联网创业（下）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/the_future_of_web_startups_part_i.html',
            'title': 'Paul Graham：未来的互联网创业（上）'
          }
        ]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/ten_things_google_has_found_to_be_true.html',
            'title': 'Google发现的十条真理'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/joel_spolsky_talk_at_yale_part_ii.html',
            'title': 'Joel Spolsky在耶鲁大学的演讲（下）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/joel_spolsky_talk_at_yale_part_i.html',
            'title': 'Joel Spolsky在耶鲁大学的演讲（上）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/the_worst_jobs_for_the_21st_century.html',
            'title': '21世纪最差的10个行业'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/does_a_college_degree_matter.html',
            'title': '学历重要吗？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/guy_kawasaki.html',
            'title': '创业的十个原则'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/warrent_buffet_quotes.html',
            'title': '巴菲特语录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/steve_jobs_quotes.html',
            'title': '史蒂夫·乔布斯语录（Steve Jobs Quotes）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/why_not_to_do_a_startup.html',
            'title': '创业的好处与坏处'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/zhu_min.html',
            'title': 'WebEx的朱敏'
          }, {'url': 'http://www.ruanyifeng.com/blog/2007/04/buddha_machine.html', 'title': '唱佛机（Buddha Machine）'}]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/letter_from_the_google_founders.html',
            'title': 'Google创始人的公开信'
          }
        ]
      },
      {
        'pageName': '2005年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2005/09/ibmceo.html', 'title': '谁能当IBM公司的CEO？'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/translations/',
    'name': '译文集'
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/sci-tech/',
    'name': '科技爱好者',
    'children': [
      {
        'pageName': '2016年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2016/01/first-robot.html', 'title': '世界第一个机器人'}]
      },
      {
        'pageName': '2015年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2015/06/powerwall.html', 'title': '能量墙与家庭电厂'}]
      },
      {
        'pageName': '2013年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2013/10/bitcoin.html', 'title': '比特币的用途'}]
      },
      {
        'pageName': '2012年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/12/minecraft_the_story_of_mojang.html',
            'title': '纪录片《Minecraft：Mojang的故事》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2012/12/bayer_filter.html',
            'title': '为什么数码相机可以拍出彩色照片？'
          }, {'url': 'http://www.ruanyifeng.com/blog/2012/01/modern_medicine_timeline.html', 'title': '现代医学200年'}]
      },
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/09/full-text_feed_reloaded.html',
            'title': '全文Feed重新发布'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/08/amazing_algorithms_of_image_processing.html',
            'title': '神奇的图像处理算法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/07/formula_online_generator.html',
            'title': '数学公式生成器'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/facebook_s_prineville_datacenter.html',
            'title': 'Facebook的俄勒冈机房'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/04/dawn_of_cloud_storage.html',
            'title': '云储存时代的到来'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/03/ietf.html',
            'title': 'IETF：互联网精神的典范'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/02/secrets_of_doubled_ charge_for_electricity.html',
            'title': '电费翻倍的秘密'
          }, {'url': 'http://www.ruanyifeng.com/blog/2011/01/brief_history_of_arm.html', 'title': 'ARM的历史'}]
      },
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/11/cpu_autopsy.html',
            'title': '解剖CPU'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/10/arm_chips.html',
            'title': 'ARM芯片介绍（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/09/how_to_access_the_internet_from_the_middle_of_the_ocean.html',
            'title': '如何在大海中上网？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/08/cable_world_map.html',
            'title': '世界海底光缆分布图'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/07/principle_of_piano.html',
            'title': '钢琴的原理'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/06/a_turkey_poster.html',
            'title': '一张土耳其海报'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/word-processing_system_in_1979.html',
            'title': '1979年的电子打字机'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/the_first_view_of_vp8.html',
            'title': 'VP8视频格式初探'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/05/html5_codec_fight.html',
            'title': 'HTML5的视频格式之争'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/patent_absurdity.html',
            'title': '纪录片《软件专利的荒谬性》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/04/musician_survival_manual_in_the_information_age.html',
            'title': '网络时代的音乐家生存指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/03/dmca.html',
            'title': '美国人怎么拔网线----DMCA入门'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/02/why_gpl_is_a_better_choice.html',
            'title': '为什么GPL是更好的开源许可证?'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/02/revisiting_android_licenses_continued.html',
            'title': '再谈Android的许可证（续）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/02/revisiting_android_licenses.html',
            'title': '再谈Android的许可证'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/02/new_developments_of_file-sharing_in_early_2010.html',
            'title': '文件分享的新动向（2010年1月~2月）'
          }, {'url': 'http://www.ruanyifeng.com/blog/2010/02/open_android_or_not.html', 'title': 'Android，开源还是封闭？'}]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/why_aol_fail.html',
            'title': 'AOL为什么会失败？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/projects_of_piratebay.html',
            'title': '海盗湾的其他项目'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/future_of_bittorrent.html',
            'title': 'BT下载的未来'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/body_weight_and_daily_diet.html',
            'title': '标准体重和饮食控制计算器'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/about_web_forum.html',
            'title': '关于网上论坛'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/windows_os_version_numbers.html',
            'title': 'Windows的版本号'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/catlogue_and_database_world_records.html',
            'title': '书目和数据库的世界纪录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/some_thoughts_of_rails_rumble_2009.html',
            'title': '对于Rails Rumble 2009的一点感想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/cause_of_cancer.html',
            'title': '癌症的根源----《细胞叛逆者》笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/09/code_rush.html',
            'title': '纪录片《Code Rush》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/ten_web_sites_ten_years_ago.html',
            'title': '十年前的十个网站'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/how_many_nuclear_weapons_to_destroy_the_world.html',
            'title': '毁灭世界需要多少核武器？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/geek_atlas.html',
            'title': '技术爱好者的地球漫游指南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/a_pictorial_guide_to_computer_hardware.html',
            'title': 'PC硬件接口一览图'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/satellite_internet.html',
            'title': '关于卫星上网'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/the_pirate_bay_sold_and_usenet_being_guilty.html',
            'title': '海盗湾的出售和Usenet的败诉'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/06/the_future_of_mobile_phone.html',
            'title': '从"山寨机"看手机的未来'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/06/unix_turns_40.html',
            'title': '对Unix40岁的一些感想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/06/how_to_connect_2_routers_in_home_networking.html',
            'title': '如何在家庭网络中使用两台路由器？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/lorem_ipsum.html',
            'title': '关于Lorem ipsum'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/interview_with_wikipedia_founder_jimmy_wales.html',
            'title': 'Wikipedia创始人访谈'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/02/gross_technology.html',
            'title': '低俗技术大观'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/02/how_to_create_a_dvdrip.html',
            'title': '如何制作DVDrip？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/01/calendar_primer.html',
            'title': '谈谈历法知识'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/01/wikipedia_s_chinese_dialect_versions.html',
            'title': 'Wikipedia的方言版本'
          }, {'url': 'http://www.ruanyifeng.com/blog/2009/01/pdf_guide.html', 'title': 'PDF文件使用指南'}]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/how_to_bibliographically_describe_a_book_title.html',
            'title': '如何著录书名？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/temporary_and_disposable_email_services.html',
            'title': '一次性Email地址'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/healthy_eating.html',
            'title': '关于健康饮食'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/media_rss_screensaver.html',
            'title': 'Media RSS的屏幕保护程序'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/09/torrent_relay.html',
            'title': 'Torrent Relay：BT下载代理网站'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/youtube_subtitle_editor.html',
            'title': '带字幕的Youtube'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/top_torrent_sites_ranked_by_google.html',
            'title': '全球BT下载网站排名'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/06/google_calendar_lite.html',
            'title': 'Google日历简易版'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/2008_sichuan_earthquake_image_wall.html',
            'title': '四川大地震图片墙'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/yogurt.html',
            'title': '酸奶机与酸奶'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/reuters_frees_content_with_new_api.html',
            'title': '路透社开放API了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/using-adobe-photoshop-for-research-and-profit.html',
            'title': '巧用Photoshop进行科学研究'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/twine_trial_report.html',
            'title': 'Twine试用感想'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/some_full-text_news_feeds.html',
            'title': '一些新闻媒体的全文Feed'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/freebase_reloaded.html',
            'title': 'Freebase再研究'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/04/western_pop_music_database.html',
            'title': '欧美流行音乐数据库'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/imdb_database_structure.html',
            'title': 'IMDB的数据库结构'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/howto_build_a_classification_system.html',
            'title': '如何分类？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/numbers_of_human_body.html',
            'title': '人体数字'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/how_big_is_the_earth.html',
            'title': '地球有多大？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/chinese_internet_censorship.html',
            'title': '中国的互联网审查'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/odp_data_php_parser.html',
            'title': 'ODP数据的解析程序'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/anthropocene.html',
            'title': '人类世（Anthropocene）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/common_cold.html',
            'title': '感冒小知识'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/chinese_english_dictionary_software.html',
            'title': '四种免费英汉电子词典软件简评'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/johns_hopkins_email_hoax.html',
            'title': '约翰·霍普金斯医学院的声明'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/chinese_decimal_web_system.html',
            'title': '关于十进制网络'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/slashdot.html',
            'title': '关于Slashdot'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/01/adding_a_mashup_module_into_the_homepage.html',
            'title': '首页增加内容聚合'
          }
        ]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/bittorrent_download.html',
            'title': '关于BT下载电影'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/wikipedia.html',
            'title': '国内用户访问维基百科（Wikipedia）的几种方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/world_weather_live_report.html',
            'title': '全球主要城市实时天气查询'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/16th_century_s_china_maps.html',
            'title': '十六世纪的中国地图'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/moon_photo_mystery_solved.html',
            'title': '嫦娥一号的月球照片是真的吗？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/12/mylifebits.html',
            'title': '微软的MyLifeBits项目'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/how_big_is_one_terabyte.html',
            'title': '1TB字节有多大？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/web_2_0.html',
            'title': 'Web 2.0网站的九个特点'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/lulu_com.html',
            'title': '自助出版网站Lulu.com'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/memex.html',
            'title': '信息机器Memex'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/public_resource_org.html',
            'title': '关于 public.resource.org'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/some_ways_to_break_the_great_firewall.html',
            'title': '绕过GFW的方法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/some_thoughts_about_ebook_readers.html',
            'title': '关于电子书阅读器'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/internet_archive.html',
            'title': '互联网档案计划（Internet Archive）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/china_anti-pornography_and_anti-illegal-publication_web.html',
            'title': '中国扫黄打非网'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/11/google_and_open_content_alliance.html',
            'title': '图书搜索：Google 和 Open Content Alliance'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/a_history_of_glass_window.html',
            'title': '玻璃的历史'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/seeing_china_waste_water_discharging_by_google_earth.html',
            'title': '用GoogleEarth看中国各城市的排污（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/photosynth.html',
            'title': 'PhotoSynth：图像识别建模技术'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/blood_test_primer.html',
            'title': '什么是血常规检验？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/web_trend_map.html',
            'title': '互联网交通图'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/versions_of_ubuntu.html',
            'title': 'ubuntu的不同版本'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/a_website_owner_s_experience.html',
            'title': '一个站长的遭遇（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/fourth_anniversary_of_mozilla.html',
            'title': 'Mozilla 浏览器四岁了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/baby_mammoth_kept_on_ice_for_10000_years.html',
            'title': '西伯利亚发现万年猛犸干尸'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/ubuntu.html',
            'title': '安装了Ubuntu'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/browser-os_and_xianguo_online.html',
            'title': '网络操作系统和"鲜果在线"'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/descriptor_grouping.html',
            'title': '关键词组配'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/descriptor_and_subject_faceting.html',
            'title': '关键词与主题分面公式'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/first_espresso_book_machine.html',
            'title': '自动售书机问世了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/yahoo_weather_js_parser.html',
            'title': '网页实时天气插件'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/face_search_is_introduced_by_google.html',
            'title': 'Google推出面部搜索'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/issn.html',
            'title': '国际标准刊号（ISSN）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/freebase_com.html',
            'title': 'Freebase.com 介绍'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/a_freely_flowing_world.html',
            'title': '自由流动的世界'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/04/exponential_growth.html',
            'title': '指数式增长（Exponential Growth）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/chinese_food_and_your_health.html',
            'title': '中餐与健康'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/level2.html',
            'title': '关于上海证券交易所Level-2行情'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/information_s_organizing_and_display.html',
            'title': '信息的组织和呈现'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/happy_pi_day.html',
            'title': 'Happy Pi Day!'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/isbd.html',
            'title': '国际标准书目著录（ISBD）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/dublin_core.html',
            'title': '都柏林核心（Dublin Core）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/metadata.html',
            'title': '元数据（MetaData）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/odp_freebase.html',
            'title': '信息的分类（续）：ODP（Open Directory Project） 和 FreeBase'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/an_era_withour_drm.html',
            'title': '没有DRM的时代'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/the_norm_of_publishing_a_paper.html',
            'title': '发表论文的规范'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/a_hundred_interview_questions_of_microsoft.html',
            'title': '微软面试100题'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/classification.html',
            'title': '图书分类法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/categories.html',
            'title': '信息的分类'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/a_land_we_call_homeland.html',
            'title': '这就是我们叫做"祖国"的地方'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/on_the_threshold_of_new_technology.html',
            'title': '站在新技术的门槛上'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/01/2007_web_20_companies_i_couldnt_live_without.html',
            'title': '生活中必不可少的15个Web2.0网站'
          }
        ]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/china_to_launch_root_domain_name_server.html',
            'title': '中国开通根域名镜像服务器'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/disputation_of_keyboards_qwerty_or_dvorak.html',
            'title': '键盘之争：QWERTY还是Dvorak'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/the_comparison_of_internet_satellite_mapping_services.html',
            'title': '互联网卫星地图服务比较'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/biological_classification.html',
            'title': '生物分类法（Biological Classification）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/folksonomy.html',
            'title': '公众分类法（Folksonomy）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/the_story_of_marconi.html',
            'title': '马可尼的故事'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/top_ten_chinese_cities_which_like_books_most.html',
            'title': '10个最重视读书的中国城市'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/never_send_to_know_for_whom_the_bell_tolls.html',
            'title': '不要问丧钟为谁而鸣'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/borgers_calvino_eco.html',
            'title': '博尔赫斯，卡尔维诺和艾柯（Borgers, Calvino, Eco）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/pirate_party.html',
            'title': '美国盗版党（Pirate Party）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/mirc.html',
            'title': '如何使用mIRC下载电子书'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/bode.html',
            'title': 'Bode定律'
          }, {'url': 'http://www.ruanyifeng.com/blog/2006/01/rss.html', 'title': '如何使用RSS'}]
      },
      {
        'pageName': '2004年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/02/post_35.html',
            'title': '几张产生视觉错觉的图片'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/02/web.html',
            'title': '中国Web信息博物馆'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/01/post_25.html',
            'title': '过去半年中死亡的知名人士'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/01/post_24.html',
            'title': '网络图像的拼贴画'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/01/googlelogo_1.html',
            'title': 'Google的Logo(第二部分)'
          }, {'url': 'http://www.ruanyifeng.com/blog/2004/01/googlelogo.html', 'title': 'Google的Logo(第一部分)'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/literature/',
    'name': '文学爱好者',
    'children': [
      {
        'pageName': '2010年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2010/06/pain_the_poem.html', 'title': '痛（诗歌）'}]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/11/recollections_of_east_china_normal_university.html',
            'title': '格非《师大忆旧》（转贴）'
          }
        ]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/translator_fang_ping_passed_away.html',
            'title': '翻译家方平去世了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/05/white_pebble_beach.html',
            'title': '马原《白卵石海滩》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/03/federico_garcia_lorca_poems.html',
            'title': '戴望舒《洛尔迦诗抄》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/a_message_by_zhangmi.html',
            'title': '多情只有春庭月，犹为离人照落花'
          }, {'url': 'http://www.ruanyifeng.com/blog/2008/01/maze_and_an_infinite_book.html', 'title': '迷宫和一本无限的书'}]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/09/william_shakespeare_quotations.html',
            'title': '莎士比亚名言选'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/the_little_mute_boy_by_federico_garcia_lorca.html',
            'title': '洛尔迦《哑孩子》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/the_saigon_of_marguerite_duras.html',
            'title': '杜拉斯的西贡'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/03/northern_rivers_by_zhang_chengzhi.html',
            'title': '张承志《北方的河》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/buddha_s_level.html',
            'title': '佛的境界（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/quotes_from_ranbindranath_tagore.html',
            'title': '泰戈尔摘录'
          }, {'url': 'http://www.ruanyifeng.com/blog/2007/01/guestbook.html', 'title': '卡尔维诺中文站留言板'}]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/atlas_shrugged_by_ayn_rand.html',
            'title': '安·兰德《阿特拉斯耸耸肩》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/11/ralph_waldo_emersons_transcendentalism_literature.html',
            'title': '爱默生的超验主义文学'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/miniatures_in_my_name_is_red.html',
            'title': '《我的名字是红》中的土耳其彩绘'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/winesburg_ohio_by_sherwood_anderson.html',
            'title': '舍伍德·安德森的《小镇畸人》（Winesburg, Ohio）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/midnight_s_children_now_published_on_the_internet.html',
            'title': '《午夜的孩子》中文版开始连载了！'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/brothers_is_tremendous_or_trash.html',
            'title': '余华的《兄弟》：杰作还是垃圾？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/the_blue_sky.html',
            'title': '[小说]蓝天（转贴）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/a_flower_a_phone_call_and_a_girl.html',
            'title': '[小说] 花，电话，姑娘'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/poems_by_a_cockroach.html',
            'title': '一只蟑螂的诗'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/i_wanted_as_badly_as_he_wanted_to_fry_himself.html',
            'title': '但愿我和他一样，也有自焚的渴求'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/fictions_is_just_for_the_female.html',
            'title': '小说是写给女人看的'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/tristan_tzara.html',
            'title': '查拉《正面与反面》'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/mrs_dalloway.html',
            'title': '弗吉尼亚·伍尔夫《达洛卫夫人》（Mrs. Dalloway）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/un_amour_de_swann.html',
            'title': '斯万的爱情'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/when_i_heard_the_learnd_astron.html',
            'title': '一堂天文课（When I heard the Learn\'d Astronomer）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/doctor_zhivago.html',
            'title': '《日瓦戈医生》的结尾（Doctor Zhivago）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/04/the_darwin_conspiracy.html',
            'title': '书评：《达尔文的阴谋》（The Darwin Conspiracy）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/04/the_women_in_orwells_life_eile.html',
            'title': '奥威尔的两任妻子（The Women in Orwell\'s Life: Eileen and Sonia）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/post_184.html',
            'title': '安得促席，说彼平生'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/post_174.html',
            'title': '宋玉《九辩》（文白对照）'
          }, {'url': 'http://www.ruanyifeng.com/blog/2006/01/post_169.html', 'title': '福克纳的繁复'}]
      },
      {
        'pageName': '2005年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/12/del_jameswithout_you.html',
            'title': 'Del James的《Without You》'
          }
        ]
      },
      {
        'pageName': '2004年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2004/04/post_60.html', 'title': '蒋捷《客舟听雨》'}]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/english/',
    'name': '英语爱好者',
    'children': [
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/01/guidelines_for_english_translations_in_public_places.html',
            'title': '公共场所英文译写规范'
          }
        ]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/04/the_longest_place_name_in_the_us.html',
            'title': '美国最长的地名，以及其他'
          }, {'url': 'http://www.ruanyifeng.com/blog/2009/02/six_word_memoirs.html', 'title': '六个词的回忆录'}]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/top_10_irritating_english_phrases.html',
            'title': '10大英语套话'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/08/usage_of_such.html',
            'title': 'Such的用法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/07/general_principles_of_english_translation_of_organization_names_and_professional_titles.html',
            'title': '组织机构、职务职称英文译法'
          }
        ]
      },
      {
        'pageName': '2007年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/north_up_south_down.html',
            'title': 'UP北，DOWN南'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/english_translation_of_public_signs.html',
            'title': '公共场所双语标识英文译法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/10/chinese_food_menu_translation.html',
            'title': '中文菜单英文译法'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/what_is_preposition.html',
            'title': '什么是介词'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/notes_on_enemy_of_the_state.html',
            'title': '查建英《国家公敌》的英语学习笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/08/free_internet_resources_of_english_literature.html',
            'title': '英语文学的免费网络资源'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/07/english_punctuation.html',
            'title': '标点符号的英语名称'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/history_of_the_latin_alphabet.html',
            'title': '拉丁字母的历史（History of the Latin alphabet）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/06/12_am_are_noon_and_midnight.html',
            'title': '12 a.m. 到底是几点？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/05/a_painful_translation.html',
            'title': '痛苦的翻译'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/the_discrimination_of_the_word_college.html',
            'title': 'College辨析'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/poignant_comments_from_jeff_van_gundy.html',
            'title': '有趣的范甘迪语录'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2007/02/middle_english_dictionary.html',
            'title': '中世纪英语词典'
          }, {'url': 'http://www.ruanyifeng.com/blog/2007/01/sounds_of_animals_in_english.html', 'title': '英语中动物的叫声'}]
      },
      {
        'pageName': '2006年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/12/structure_patterns_of_english_sentence.html',
            'title': '英语句子的基本结构'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/10/shining_words.html',
            'title': '"闪光的"单词'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/the_best_chinese-english_dictionary.html',
            'title': '最好的汉英词典'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/the_development_of_the_syntax.html',
            'title': '句法的发展'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/static_sentence_and_dynamic_setence_in_english.html',
            'title': '英语的静态句和动态句'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/the_egg_by_sherwood_anderson.html',
            'title': '舍伍德·安德森的小说《鸡蛋》（The Egg）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/jabberwocky.html',
            'title': 'Jabberwocky'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/phrasal_verb.html',
            'title': '动词短语（Phrasal Verb）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/09/latin_idiom_glossary.html',
            'title': '拉丁语成语表'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/how_to_use_a_thesaurus.html',
            'title': '如何使用Thesaurus？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/serial_notes_on_the_story_of_english.html',
            'title': '英语史系列笔记'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/08/projectile_trajectory_and_parabola.html',
            'title': 'Projectile，Trajectory和Parabola'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/samuel_johnson.html',
            'title': '约翰逊博士的词典（Samuel Johnson）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/archaic_usages_in_american_english.html',
            'title': '美国英语中的古风'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/william_bradford.html',
            'title': '威廉·布莱福特总督（William Bradford）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/a_dream_within_a_dream.html',
            'title': '艾伦·坡《梦中梦》（A Dream Within A Dream）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/king_james_bible.html',
            'title': '钦定版《圣经》（King James Bible）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/william_shakespeare.html',
            'title': '莎士比亚其人其事（William Shakespeare）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_265.html',
            'title': '无所不在的莎士比亚'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_264.html',
            'title': '英语姓名的由来'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/geoffrey_chaucer.html',
            'title': '乔叟《坎特伯雷故事集》（Geoffrey Chaucer）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_261.html',
            'title': '英语地位的确立，中世纪'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/post_260.html',
            'title': '英语史上的三次文化入侵'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/ecclesiastical_history_of_the_english_people.html',
            'title': '比德《英吉利教会史》（Ecclesiastical History of the English People）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/07/indo_european_family.html',
            'title': '印欧语系（Indo-European Family）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/get-passive.html',
            'title': 'get的被动用法（get-passive）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/un_in.html',
            'title': '前缀un-和in-'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/06/to_see_a_world_in_a_grain_of_s.html',
            'title': '威廉·布莱克《从一颗沙子看世界》（To see a world in a grain of sand）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/post_226.html',
            'title': '英语诗歌的格律'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/crap_crapper.html',
            'title': 'crap 和 crapper'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/05/post_222.html',
            'title': '关于司法的英语单词'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/04/_american_situational_conversa.html',
            'title': '《美国日常口语 情景会话实践》（American Situational Conversations）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/04/thorn_yogh_eth.html',
            'title': '英语中消失的三个字母：thorn, yogh, eth'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/03/post_187.html',
            'title': '马太福音和马太效应'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/post_175.html',
            'title': '韦伯斯特的故事'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2006/02/the_new_colossus.html',
            'title': '新的巨像（the new colossus）'
          }, {'url': 'http://www.ruanyifeng.com/blog/2006/01/post_171.html', 'title': '英语的借词'}]
      },
      {
        'pageName': '2005年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/09/egie.html',
            'title': '你能分清e.g.和i.e.吗？'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/08/post_136.html',
            'title': '《万物简史》中文版翻译质量低劣'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/07/the_great_gatsby_2.html',
            'title': 'The Great Gatsby读书笔记（三）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2005/07/cracy.html',
            'title': '谈谈-cracy'
          }, {'url': 'http://www.ruanyifeng.com/blog/2005/01/dollar.html', 'title': 'Dollar（美元）的词源'}]
      },
      {
        'pageName': '2004年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/10/the_great_gatsby_1.html',
            'title': 'The Great Gatsby读书笔记（二）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/10/the_great_gatsby.html',
            'title': 'The Great Gatsby的读书笔记（一）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2004/06/seperate_separate.html',
            'title': 'Seperate 还是 Separate?'
          }, {'url': 'http://www.ruanyifeng.com/blog/2004/01/post_17.html', 'title': '《关雎》的两种英译'}]
      }
    ]
  },
  {'url': 'http://www.ruanyifeng.com/blog/clipboard/', 'name': '剪贴板'},
  {
    'url': 'http://www.ruanyifeng.com/blog/notes/',
    'name': '笔记本'
  },
  {'url': 'http://www.ruanyifeng.com/blog/misc/', 'name': '杂物间'},
  {
    'url': 'http://www.ruanyifeng.com/blog/mjos/',
    'name': 'Joel谈软件',
    'children': [
      {
        'pageName': '2010年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2010/03/why_joel_stopped_blogging.html',
            'title': '为什么Joel不谈软件了？'
          }
        ]
      },
      {
        'pageName': '2009年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/12/chinese_version_of_mjos_is_on_sale.html',
            'title': '《Joel谈软件》出版了'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/10/why_i_love_programming.html',
            'title': '我为什么喜欢编程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/08/five_whys.html',
            'title': '五个为什么（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/07/hitting_the_high_notes.html',
            'title': '飙高音（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/03/strategy_letter_vi.html',
            'title': '关于战略问题的通信之六（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/02/fog_creek_s_new_office.html',
            'title': '美国的软件公司是什么样？---- 以Fog Creek为例'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/01/it_s_not_just_usability.html',
            'title': '易用性是不够的（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2009/01/font_smoothing_anti-aliasing_and_sub-pixel_rendering.html',
            'title': '字体平滑，反锯齿,和次像素渲染（译文）'
          }
        ]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/12/the_perils_of_javaschools.html',
            'title': 'Java语言学校的危险性（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/the_command_and_control_management_method.html',
            'title': '高科技公司能否采用军事化管理？（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/finding_great_developers.html',
            'title': '寻找优秀的程序员（译文）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/the_translation_of_joel_on_software_s_subtitle.html',
            'title': '关于《Joel on Software》副书名的翻译'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/10/i_will_translate_more_joel_on_software.html',
            'title': '我要翻译《Joel on Software》了！'
          }
        ]
      }
    ]
  },
  {
    'url': 'http://www.ruanyifeng.com/blog/usenet/',
    'name': 'USENET',
    'children': [
      {
        'pageName': '2011年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2011/10/usenet_downloading_crash_tutorial.html',
            'title': 'usenet下载最简教程'
          }
        ]
      },
      {
        'pageName': '2008年',
        'articleList': [
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/usenet_free_trial.html',
            'title': 'Usenet免费试用'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/11/usenext_tutorial.html',
            'title': 'UseNext下载教程'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/usenet_download_tutorial_part_ii.html',
            'title': 'Usenet下载教程（高级篇）'
          },
          {
            'url': 'http://www.ruanyifeng.com/blog/2008/02/newsgroups_the_ultimate_p2p_alternative.html',
            'title': 'Usenet：P2P下载的替代方法'
          }, {'url': 'http://www.ruanyifeng.com/blog/2008/02/talk_about_usenet.html', 'title': '推广Usenet'}]
      },
      {
        'pageName': '2007年',
        'articleList': [{'url': 'http://www.ruanyifeng.com/blog/2007/11/usenet.html', 'title': 'USENET简介'}]
      }
    ]
  }
]

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

var page = {
  'title': '   \n         \n\n    \n        \n        Android逆向之旅---Android中分析某短视频的数据请求加密协议(IDA动态调试SO)第二篇        \n           \n        \n        \n\n         \n    \n',
  'content': [
    {'type': 'h2', 'text': ''},
    {'type': 'h2', 'text': '一、逆向分析'},
    {
      'type': 'p',
      'text': '年前必须搞定短视频四小龙，之前已经搞定前面一个某短视频，不了解的同学可以点击这里：分析某短视频的数据请求加密协议第一篇，那么今天继续来搞下一个，在之前一篇文章中已经详细分析了某短视频的数据请求加密协议，通过IDA动态调试so来解决一些问题，本文我们继续来看另外一个短视频的数据请求加密协议，这个就是传说中的某拍视频，不多说，找到突破口还是抓包：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108134349948?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '我们通过下拉一次数据，看到这个请求url，发现请求中的参数信息没有携带签名信息，但是返回的数据确实加密的字节数组了。所以得先搞定这个字节数组了。直接用Jadx打开应用，然后全局搜索url字符串信息：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108134541920?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '很容易就找到了这个，直接点击进入即可：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143116083?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这里看到调用一个方法之后拿到字符串就开始直接解析json了，看看这个返回字符串方法：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143154189?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到，Jadx中解析失败，不过没关系，还是smali代码，大致能看懂，继续往下看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143233201?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '这里需要你用过okhttp框架了，一看就知道这里用到这个框架，而且最终通过bytes来获取字节数组，我们看到这里又调用了一个方法，然后直接返回字符串了，去查看这个方法实现：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143336204?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '继续往下看，应该是个解密方法：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143359598?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '看到，这里依然把加密工作放到了native层了，我们操作依然很简单，直接把这个libte.so拷贝到我们的demo工程中，然后构造这个native类，直接调用native方法进行解密即可：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143516621?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '我们通过之前抓包看到，他的请求参数都是一些常规的信息，没有签名信息，为了简单，这里直接把这些参数拷贝出来写死利用okhttp框架进行数据请求：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143623926?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '当然这些参数后续肯定需要优化，实现动态获取最靠谱：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143649452?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '拿到请求之后的字节数据之后，然后调用native方法进行解密，我们直接运行看看日志信息：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108143840272?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '可惜的是，发现了尽然解密失败。那么就要怀疑so中是否有判断逻辑了，直接使用IDA打开so查看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108144247322?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '直接F5查看对应的C代码，看到一个tinydecode函数的返回值，然后有一个判断，进入这个函数看看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108144505005?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '这里调用了strstr系统函数，这个函数主要用来判断第二个参数是不是第一个参数的字串，如果是就返回字串的指针，如果不是就返回空指针NULL；看到这里有个包名字段，感觉应该和包名有关系，双击这个g_packagename字段，然后点击X键，查看调用的地方：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108144650696?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '在JNI_OnLoad中进行赋值的，依然查看JNI_OnLoad函数代码：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108144923760?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这里开始进行赋值了，看看上面这里的sub_43B0函数怎么获取字符串信息的：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108144955388?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '好吧，尽然是通过读取系统的这个文件来获取包名值，而不是通过全局的Context变量了。这个文件是很奇特的，只要在本应用中读这个文件就是当前应用包名，而是用命令行去查看这个文件是没任何内容的。这个知识点大家就记住一下就好了。'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '那么这个到底用当前应用包名和哪个包名进行比较呢？看上面的strstr函数的第二个参数是：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108145306630?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '依然双击这个变量，然后点击X键查看赋值地方：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108145338299?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '还是在JNI_OnLoad函数中，点击进入赋值代码：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108145610735?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '看到一个特别的字符串信息和一个循环指令，可以猜想应该是通过这个字符串信息来获取最后的信息赋值给g_me变量，其实这里我们可以才想到这个值应该是应用的的包名：com.yixia.xxxx；这样就可以理解为只有当前应用的包名正确才能正确调用逻辑，这个是一层简单的防护而已。就是为了防止自己的so文件被其他恶意程序调用的。'
    },
    {'type': 'p', 'text': ''},
    {'type': 'h2', 'text': '二、IDA调试so'},
    {
      'type': 'p',
      'text': '不过这里都是猜想，为了验证，可以动态调试so来验证。而调试so步骤也不想在多说了，在上一篇文章已经很详细介绍了，这里直接上手操作：'
    },
    {'type': 'p', 'text': '第一步：运行android_server开始监听'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151034538?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '第二步：端口转发，以debug模式启动应用'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151056983?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '第三步：打开IDA进行进程附加，记得勾选上JNI_OnLoad函数挂起状态'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151116680?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '第四步：使用DDMS查看调试端口，然后启动调试器链接'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151206447?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '一定要记得正确的端口号，不然链接失败报错的：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151300495?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '第五步：IDA中点击运行开始调试'},
    {
      'type': 'p',
      'text': '不过这里为了保险起见，在运行之前，再去查看有么有成功挂起JNI_OnLoad函数设置：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151751044?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '如果没有，就在此勾选上：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151813824?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后在点击运行，当然也可以直接使用F9键：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151619224?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '运行成功之后，会发现，jdb也连接成功：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151654842?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '而且DDMS中的红色小蜘蛛变成绿色的了：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151713934?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {
      'type': 'p',
      'text': '运行成功之后，因为程序会家在很多系统的so文件，而我们又在JNI_OnLoad挂起了，所以会弹出很多确定对话框，都不用管直接点击OK即可，直到把系统so文件全部加载完毕：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108151936266?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后，这时候就会出现我们demo中的按钮界面了，我们直接点击按钮进行加载libte.so文件：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108150455178?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '点击运行，加载需要调试的so文件，然后在右侧栏找到JNI_OnLoad和解密函数下断点：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152047159?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '先找到指定so文件，然后双击在查找函数：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152115432?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '点击进入函数处下断点：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152131722?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '接着给加密函数下断点：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152146363?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '点击进入函数代码处即可：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152207491?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '然后这时候，就可以开始运行了，运行到断点处，依次往下走，这里发现JNI_OnLoad中并没有反调试逻辑，直接略过，来到解密函数，F7单步往下走，来到了tinydecode函数处，下个断点：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152748449?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后进入函数，之前静态分析这个函数，他内部有一个字符串字串判断函数：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152441275?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '一般都会在CMP处下个断点，继续往下走，来到strstr函数内部，看看两个字符串比较的值是多少：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108152902682?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到，获取到本应用的包名就是我们的demo应用，继续看另外一个字符串信息：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108153022597?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '看到了，这个包名的确是该应用的：com.yixia.xxxx值，因为再之前下了CMP判断断点，现在明显不是字串，返回NULL了，所以寄存器中的值肯定是0了，为了后续能在正确的逻辑，直接修改寄存器值：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108153201772?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '修改寄存器值很简单，直接在右侧栏右击进行修改即可。修改成非0值即可，一般就修改成1了，走了正确的逻辑了，可惜的是，在日志中看到解密还是失败的。'},
    {
      'type': 'p',
      'text': ''
    },
    {'type': 'h2', 'text': '三、修改指令'},
    {
      'type': 'p',
      'text': '但是到这里，我们已经可以确认一件事就是so中的解密函数逻辑有一层防护就是判断当前调用so的应用包名是否为正确的视频包名，如果不是就不走正确的解密逻辑了。所以这里我们需要修改一下so指令，让这个判断无效。修改指令其实很简单，我们看到他通过判断strstr函数返回的NULL值，也就是对应 CMP R0,#0 指令值，然后后面有一个BEQ跳转指令，这里我们可以这么改，他不是和0判断吗？其实0就是NULL值，我们把他改成和1比较，这样strstr函数返回了NULL值也就是0，和1比较不相等。那就正确的逻辑了。这个思路大家要搞清楚，其实也没这么复杂，反正就一个目的，不要走后面的BEQ逻辑就对了。和1比较肯定就不会走BEQ逻辑了。好了下面就来开始修改指令了，这个网上有一个工具可以修改，但是这里发现了一个在线修改地址：http://armconverter.com/；网站打开有点慢，等待一下即可，我们为了验证这个网站准确，我们先输入 CMP R0,#0 指令，看看对应的十六进制值和so中的值是否对应：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108154322932?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到这里有很多架构的对应这个指令的值，先不着急，我们去IDA中查看这条指令对应的值：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108154405917?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这里为了后面修改指令方便，借助010Editor工具进行操作：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108154426660?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '010Editor工具有两个常用的快捷键，一个是Ctrl+F全局查找十六进制值，一个是Ctrl+G跳转到指定的地址。这里我们跳转到5BB0地址处：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108154524639?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '看到这里的值是：000050E3值，和上面的转化的arm架构值对应的。那么下面就来修改指令，比较简单，直接修改为：CMP R0,#0 ==> CMP R0,#1'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108154803223?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '对应的十六进制值就是010050E3了，直接去010Editor工具中进行修改：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108154831532?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '就这样修改成功了，然后保存，再次用IDA打开修改之后的so文件，看看是否修改成功了：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108155052146?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这时候，我们在用F5键查看他的代码：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108155108357?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '看到，的确有效果了，这时候strstr返回NULL了，和1进行比较显然不相等就开始走下面的正确解密逻辑了。修改成功了，到这里有的同学好奇，是否可以直接修改后面的BEQ指令为BNE呢？当然是可以的，这个方式后面继续介绍，因为我写文章的目的就在于能介绍技术都给介绍，多条路始终是好事。'
    },
    {'type': 'p', 'text': ''},
    {'type': 'h2', 'text': '四、逆向分析签名信息'},
    {
      'type': 'p',
      'text': '然后我们把修改之后的so文件拷贝到工程中，再次运行，其实这个结果还是不可以的，因为我们在上面的调试及时过了CMP也是不行的，所以这时候就要猜想了还要哪里有问题呢？当然找问题还得去那块请求数据的smali代码处：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108160051631?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '开始的分析okhttp请求代码处忽略了这个地方，去查看这个类：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108160122961?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '到了这个内部类中发现了很多关键信息，最重要的莫过于这个UA，请求头信息。而这里有很多信息，还包括了签名信息，继续往下看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108160222349?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '好吧，这下已经肯定就是把签名信息放到了请求头中了，这招也是够狠的，一般人还很难发现，再回到Fiddler抓包看看请求头中的具体信息：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108160321572?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '果然在头部中有这几个信息，通过分析可以发现，除了sign字段其他的值可以暂时写死，都是表示唯一的，后续需要搞定那个sessionid值。这里先不管写死。然后就来关键看看sign签名字段值怎么来的：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108160708115?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '依然调用上面的native方法的，这里为了搞清楚参数值，直接启动hook大法打印参数值即可，没必要分析代码了：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108160745833?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '需要注意的是，应用进行拆包了，所以为了确保hook成功，先hook系统的Application类的attach方法拿到正确的类加载器，这个方法已经在很多文章中都介绍了，这里不多说了，直接运行看日志：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108161140440?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到参数再结合上面的代码可以看到，大致是应用版本号、UUID、时间戳、请求url的path值。这里我们可以把前两个值写死，后面两个值获取即可：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108161541018?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这里的URL就是请求视频列表数据的：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108161604501?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后我们把上面的头部信息设置到okhttp中即可：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108161753714?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后运行看看效果，抓包看到头部信息已经设置成功了，看看返回的数据：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108162209601?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到的确有结果了，但是貌似是错误信息，直接去转码这个Unicode值：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108162236708?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到，提示是签名校验失败，也就是上面的头部信息中的签名值是错误的。说明那个native函数签名有问题，继续用IDA打开so文件进行查看即可：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163153971?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这里依然有一个sign函数，获取v18值，到下面进行比较逻辑，进入sign函数看看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163233853?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''},
    {'type': 'h2', 'text': '五、最终解决方案'},
    {
      'type': 'p',
      'text': '果然这里还是进行判断当前应用是否为正确的包名，所以我们需要修改指令了，这一次不修改该CMP比较的值了，而是修改跳转指令，直接把BEQ改成BNE即可，BEQ是等于跳转，BNE是不等于跳转。这样改了之后，就不在乎上面的CMP指令了，修改指令还是很值钱一样：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163426196?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后去010Editor中进行查看十六进制值：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163447284?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '然后再去上面的那个转化网站查看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163502890?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '可以看到BEQ的十六进制值最后两位是0A，那么改成BNE之后是多少：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163607596?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '变化的就是0A变成了1A值，那么简单了，直接修改010Editor中的0A值即可：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108163636239?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '其他的地方都不要动，保存即可，然后再用IDA打开修改之后的so文件，确认是否修改成功：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108164039835?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '看到了，果然把BEQ修改成了BNE了，查看代码：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108164046096?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {
      'type': 'p',
      'text': '这样就可以了，strstr返回的肯定是NULL也就是0，那么非0就是true了，走了下面的解密逻辑了。好了，把修改之后的so文件拷贝到我们的demo工程中，再次运行：'
    },
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108164049023?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '这样终于有结果了，我们把这json格式化看看：'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171108164051932?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvamlhbmd3ZWkwOTEwNDEwMDAz/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '好了到这里，我们就成功的拿到了视频的数据了。这里遇到的问题和上一篇的某音可以说完全不一样，虽然都有签名信息。下面就来总结一下。'},
    {
      'type': 'p',
      'text': ''
    },
    {'type': 'h2', 'text': '六、知识点总结'},
    {
      'type': 'p',
      'text': '本文分析了视频获取信息的加密协议，可以看到其实遇到的问题不算难，但是我们依然可以了解到很多技术和知识：'
    },
    {
      'type': 'p',
      'text': '第一、签名信息永远都不过时，可以放在请求字段中，也可以尝试放到请求头中。第二、对于so防止被别人恶意调用，可以判断是否为当前正确的应用包名信息。第三、在native层可以直接读取系统文件/proc/self/cmdline值获取应用包名。第四、在native层遇到判断逻辑，修改一般就两种方案：一种是直接修改BEQ指令为BNE，一种是修改CMP指令比较的值，一般是把0改成1即可。'
    },
    {'type': 'p', 'text': '可以看到应用的so防护比之前的某音查了一点，至少加点签名校验，反调试等基础判断，然而并没有。'},
    {'type': 'p', 'text': ''},
    {
      'type': 'p',
      'text': ''
    },
    {'type': 'p', 'text': '严重声明'},
    {
      'type': 'p',
      'text': '本文的意图只有一个就是通过分析app学习更多的逆向技术，如果有人利用本文知识和技术进行非法操作进行牟利，带来的任何法律责任都将由操作者本人承担，和本文作者无任何关系，最终还是希望大家能够秉着学习的心态阅读此文。鉴于安全问题，样本和源码都去编码美丽小密圈自取！'
    },
    {'type': 'p', 'text': ''},
    {'type': 'h2', 'text': '七、总结'},
    {
      'type': 'p',
      'text': '本文在上一篇分析完某音和某闪视频协议解密之后，在此分析某拍视频的，之前我说过这次一定要搞定短视频四小龙，那么下一个大家应该猜到是谁了。当然大家也很好奇为什么我非要死磕短视频呢？因为我有一个大大的计划和项目要启动。等下一篇搞定最后一个短视频协议之后，就告诉大家我到底要干嘛？本文虽然难度低了，但是为了讲解详细，给大家带来更多的知识，截取了很多图片注释，很累很累的。所以大家看完文章之后觉得有收获就点赞分享吧！'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': ''},
    {'type': 'h2', 'text': ''},
    {
      'type': 'p',
      'text': '《Android应用安全防护和逆向分析》点击立即购买：京东  天猫'
    },
    {'type': 'img', 'src': 'http://img.blog.csdn.net/20171218164959450'},
    {'type': 'p', 'text': ''},
    {
      'type': 'p',
      'text': '更多内容：点击这里'
    },
    {'type': 'p', 'text': ''},
    {'type': 'p', 'text': '关注微信公众号，最新技术干货实时推送'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20160822091821005?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': '编码美丽技术圈'},
    {'type': 'p', 'text': '微信扫一扫进入我的"技术圈"世界'},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20171030170749085'
    },
    {'type': 'p', 'text': ''},
    {
      'type': 'img',
      'src': 'http://img.blog.csdn.net/20161122092433577?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
    },
    {'type': 'p', 'text': ''}
  ]
}