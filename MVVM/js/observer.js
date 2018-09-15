function Dep() {
    this.subs = [];
}

Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub);
    },
    notify: function () {
        this.subs.forEach(function (sub) {
            sub.update();
        });
    }
};
// // Observer.js
// var data = {name: 'kindeng'};
// observe(data);


// data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --> dmq

function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
};

function defineReactive(data, key, val) {
    var dep = new Dep();
    observe(val); // 监听子属性

    Object.defineProperty(data, key, {
        get: function () {
            // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
            Dep.target && dep.addSub(Dep.target);
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return;
            console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
            val = newVal;
            console.log('dep.notify: ', dep);
            dep.notify(); // 通知所有订阅者
        }
    });
}
