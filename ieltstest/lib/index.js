var say = require('say');
var arr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// var arr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
let answer = '';

(async () => {
  await wait(2);
  for (var count = 1; count <= 10; count++) {
    let list = new Array(8).fill(0).map(() => Math.floor(Math.random() * arr.length));
    for (let num of list) {
      let word = arr[num];
      await sayWord(word, num);
    }
    answer = list.map(num => num + 1).join(" ");
    await wait(5);
    console.log(answer);
    if (count % 5 == 0) {
      console.log(' ');
    }
  }
})();

/*


*/
function wait(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t * 1000, true);
  });
}

function sayWord(word, num) {
  return new Promise((resolve) => {
    say.speak(word, 'Alex', 1, (error) => {
      if (error) {
        console.log('error', error);
        console.log('error word, num', word, num);
      }
      setTimeout(resolve, 400, true);
    });
  });
}