const textract = require('textract');
const path = require('path');
let fs = require('fs');

const syncWrite = (path, out) => {
  return new Promise((resolve) => {
    textract.fromFileWithPath(path, function( error, text ) {
      if (error) {
        console.log('error: ', error);
      }
      fs.writeFileSync(out, text, {flag: 'a'});
      resolve(true);
    });
  });
}

const syncWriteList = async (paths) => {
  // console.log(paths);
  let out = path.join(__dirname, 'frequency.txt');
  for (let fileName of paths) {
    console.log('wrinting: ', fileName);
    await syncWrite(path.join(__dirname, 'frequency', fileName), out);
  }
}

let paths = fs.readdirSync(path.join(__dirname, 'frequency'));
syncWriteList(paths)
// let path807 = path.join(__dirname, '807/2019.jpeg');
// syncWrite(path807, path.join(__dirname, 'out807.txt'));