function getGraph() {
    let p0 = {
        val: 0,
        links: []
    }
    let p1 = {
        val: 1,
        links: []
    }
    let p2 = {
        val: 2,
        links: []
    }
    let p3 = {
        val: 3,
        links: []
    }
    let p4 = {
        val: 4,
        links: []
    }
    let p5 = {
        val: 5,
        links: []
    }
    let p6 = {
        val: 6,
        links: []
    }
    p0.links.push(p1, p2, p3);
    p1.links.push(p4, p5, p6);
    p2.links.push(p0, p6);
    p3.links.push(p0);
    p4.links.push(p1, p5);
    p5.links.push(p1, p4);
    p6.links.push(p1, p2);

    return p0;
}
function bfs(target = Infinity) {
    var heep = [getGraph()];
    var set = new Set(heep);
    var visits = new Set();
    while (!!heep.length) {
        let point = heep.splice(0, 1)[0];
        set.delete(point);
        if (point.val == target) {
            return { success: true, road: [...getRoad(point)].reverse() }
        }
        console.log('visit: ', point.val);
        // point.visit = true;
        visits.add(point);
        var list = point.links.filter(p => (!set.has(p) && !visits.has(p)));

        list.forEach(item => {
            item.pre = point;
            heep.push(item);
            set.add(item)
        });
    }
    function* getRoad(p) {
        while (p) {
            yield p;
            p = p.pre;
        }
    }
    return { success: false }
}

function dfs(max = Infinity, target = Infinity) {
    var point = getGraph();
    var stack = [point];
    var set = new Set(stack);
    set.add(point);
    while (stack.length > 0) {
        point = stack[stack.length - 1];
        if (typeof point.index === 'undefined') {
            point.index = 0;
        }
        if (point.index == point.links.length || point.visit || stack.length > max) {
            var toVisit = stack.pop();
            set.delete(toVisit);
            if (!toVisit.visit) {
                if (toVisit.val == target) {
                    return { success: true, road: stack.concat(toVisit) }
                }
                console.log('visit: ', toVisit.val);
                toVisit.visit = true;
            }
            continue;
        }
        var next = point.links[point.index];
        if (next) {
            point.index++;
            if (!set.has(next)) {
                stack.push(next);
                set.add(next);
                point = next;
            }
        }
    }
    return {success: false}
}

function ids() {
    var depth = 1, road;
    while (depth <= 1) {
        let res = dfs(depth, 5);
        if (res.success) {
            road = res.road;
            break;
        }
        depth++;
    }
    console.log('success road: ', road);
}

(function run() {
    // let res = bfs();
    // console.log('res: ', res);
    // dfs();
    ids();
})()