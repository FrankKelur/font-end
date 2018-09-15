function Compile(el) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    if (this.$el) {
        this.$fragment = this.node2Fragment(this.$el);
        this.init();
        this.$el.appendChild(this.$fragment);
    }
}
Compile.prototype = {
    isEventDirective (...args) {
        // z todo 判断是否是event directive
        console.log('isEventDirective args', args)
    },
    isElementNode (...args) {
        // z todo 判断是否是element node节点
        console.log('isElementNode', args)
    },
    isTextNode (...args) {
        // z todo 判断是否是text节点
        console.log('isTextNode', args)
    },
    compileText (...args) {
        // z todo 编译text节点
        console.log('compileText', args)
    },
    init: function() { this.compileElement(this.$fragment); },
    node2Fragment: function(el) {
        var fragment = document.createDocumentFragment(), child;
        // 将原生节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    },
    compileElement: function(el) {
        var childNodes = el.childNodes, me = this;
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            var reg = /\{\{(.*)\}\}/;    // 表达式文本
            // 按元素节点方式编译
            if (me.isElementNode(node)) {
                me.compile(node);
            } else if (me.isTextNode(node) && reg.test(text)) {
                me.compileText(node, RegExp.$1);
            }
            // 遍历编译子节点
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        var nodeAttrs = node.attributes, me = this;
        [].slice.call(nodeAttrs).forEach(function(attr) {
            // 规定：指令以 v-xxx 命名
            // 如 <span v-text="content"></span> 中指令为 v-text
            var attrName = attr.name;    // v-text
            if (me.isDirective(attrName)) {
                var exp = attr.value; // content
                var dir = attrName.substring(2);    // text
                if (me.isEventDirective(dir)) {
                    // 事件指令, 如 v-on:click
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                } else {
                    // 普通指令
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }
            }
        });
    }
};

// 指令处理集合
var compileUtil = {
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    // ...省略
    bind: function(node, vm, exp, dir) {
        var updaterFn = updater[dir + 'Updater'];
        // 第一次初始化视图
        updaterFn && updaterFn(node, vm[exp]);
        // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
        new Watcher(vm, exp, function(value, oldValue) {
            // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
            updaterFn && updaterFn(node, value, oldValue);
        });
    },
    eventHandler ()  {
        // z todo event handler
        console.log('event handler');
    }
};

// 更新函数
var updater = {
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }
    // ...省略
};