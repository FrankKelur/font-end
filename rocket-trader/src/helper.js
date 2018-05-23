'use strict'

const WORDS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

exports.random = function random() {
    let re = '';
    for (let i = 1; i < 8; i++) {
        re += WORDS[Math.ceil(Math.random() * 10)]
    }
    return re;
}
