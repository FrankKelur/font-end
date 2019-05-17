
var acceleration = 0.000001;
var fail = false;
var start = null, pre, layerX = 0, layerY = 0, timeStart;
var player = {
    size: { w: 140, h: 80 },
    pos: { x: 250, y: 400 },
    color: '#7ae7f5',
};
var grade = document.getElementById('grade');
var playerDom = document.querySelector('.player');
var domList = [...document.querySelectorAll('.block'), playerDom];
var board = document.querySelector('.board');
var { offsetTop: marginTop, offsetLeft: marginLeft } = board;
var error = document.getElementById('error');
var blocks = [
    {
        dir: { x: 1, y: 1 },
        size: { w: 80, h: 80 },
        pos: { x: 0, y: 0 },
        speed: 0.05,
        color: '#333333',
    },
    {
        dir: { x: 1, y: 1 },
        size: { w: 80, h: 80 },
        pos: { x: 400, y: 0 },
        speed: 0.06,
        color: '#e7beff',
    },
    {
        dir: { x: 1, y: 1 },
        size: { w: 80, h: 80 },
        pos: { x: 0, y: 400 },
        speed: 0.055,
        color: '#e65c53',
    },
    {
        dir: { x: 1, y: 1 },
        size: { w: 80, h: 80 },
        pos: { x: 400, y: 100 },
        speed: 0.045,
        color: '#ffa826',
    }
]
let origin = deepCopy({ player, blocks });
function deepCopy(origin) {
    return JSON.parse(JSON.stringify(origin));
}
function touchUp({ y }) {
    return y <= 0;
}
function touchRight({ x }, { w }) {
    return x >= 500 - w;
}
function touchDown({ y }, { h }) {
    return y >= 600 - h;
}
function touchLeft({ x }) {
    return x <= 0;
}

function renderBoard(timestamp) {
    if (isFailed()) {
        fail = true;
        let span = (new Date().getTime() - timeStart) / 1000;
        grade.innerText = span;
        error.style.display = 'block';
        return;
    }
    if (!start) {
        start = timestamp;
        pre = start;
    }
    var span = timestamp - pre;
    pre = timestamp;
    blocks.map((block, idx) => {
        let el = domList[idx];
        let { pos, speed, dir, size } = block;
        if (touchLeft(pos, size)) {
            dir.x = -1 * dir.x;
            pos.x *= -1;
        }
        if (touchRight(pos, size)) {
            dir.x = -1 * dir.x;
            pos.x = 500 - size.w;
        }
        if (touchUp(pos, size)) {
            dir.y = -1 * dir.y;
            pos.y *= -1;
        }
        if (touchDown(pos, size)) {
            dir.y = -1 * dir.y;
            pos.y = 600 - size.h;
        }
        pos.x += speed * dir.x * span;
        pos.y += speed * dir.y * span;
        block.speed = speed + span * acceleration;
        el.style.top = pos.y;
        el.style.left = pos.x;
    })
    window.requestAnimationFrame(renderBoard);
}

function init() {
    let newGame = deepCopy(origin);
    blocks = newGame.blocks;
    player = newGame.player;
    blocks.concat([player]).map((block, idx) => {
        let { size, color, pos } = block;
        let el = domList[idx];
        el.style.top = pos.y;
        el.style.left = pos.x;
        el.style.width = size.w;
        el.style.height = size.h;
        el.style.borderColor = color;
    })
}

function onDragStart(e) {
    let { layerX, layerY } = e;
    window.layerX = layerX;
    window.layerY = layerY;
}

function onDrop(e) {
    e.preventDefault();
}

function touchBlock(b1, b2) {
    let { pos: up, size } = b1;
    let { x, y } = up;
    let { w, h } = size;
    return [up, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }].some(({ x, y }) => {
        let { pos, size } = b2;
        return x >= pos.x && x <= pos.x + size.w && y >= pos.y && y <= pos.y + size.h;
    });
}

function isFailed() {
    let { pos, size } = player;
    return blocks.some(block => touchBlock(block, player)) ||
        touchUp(pos, size) || touchRight(pos, size) || touchDown(pos, size)
        || touchLeft(pos, size);
}

function movePlayer(e) {
    let { pos } = player;
    let el = playerDom;
    let { clientX, clientY } = e;
    pos.x = clientX - layerX - marginLeft;
    pos.y = clientY - layerY - marginTop;
    el.style.top = pos.y;
    el.style.left = pos.x;
    e.preventDefault();
}

function clear() {
    error.style.display = 'none';
    domList.map(dom => dom.style.display = 'inline-block')
    fail = false;
    timeStart = new Date().getTime();
}

function run() {
    clear();
    init();
    window.requestAnimationFrame(renderBoard);
};
