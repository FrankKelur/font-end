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