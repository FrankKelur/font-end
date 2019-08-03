const list = [
  require('./json/4-2-1.json'),
  require('./json/4-2-2.json'),
  require('./json/4-2-3.json'),
  require('./json/4-2-4.json'),
  require('./json/4-2-5.json'),
  require('./json/4-2-6.json'),
  require('./json/4-2-7.json'),
  require('./json/4-2-8.json'),
  require('./json/4-2-9.json'),
  require('./json/4-2-10.json'),
  require('./json/4-2-11.json'),
  require('./json/4-2-12.json'),
  require('./json/chapter5.json'),
  require('./json/cn-adj.json'),
  require('./json/cn.json'),
]

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost';
function updateOrInsert(wordlist, key, type, val, cb) {
  wordlist.update({ key, type }, { $set: { val } }, (err, res) => {
    if (err) {
      console.log('err, key, type: ', err, key, type);
      throw err;
    }
    console.log('res: ', res.result.ok);
    let insertAlready = !res;
    if (!insertAlready) {
      wordlist.insertOne({
        key,
        val,
        type,
        correctTime: 0,
        errorTime: 0,
      }, cb);
    } else {
      cb();
    }
  });

}
// Database Name
const dbName = 'wordlist';
let db = null;
MongoClient.connect(url, function (err, client) {

  db = client.db(dbName);
  let wordlist = db.collection('wordlist');
  console.log('db.collection', db.collection);
  list.forEach((json, i) => {
    let innerList = Object.keys(json);
    innerList.forEach((key, j) => {
      updateOrInsert(wordlist, key, 'en', json[key], () => {
        if (j === innerList.length - 1 && i === list.length - 1) {
          client.close();
        }
      });
    })
  });
});

