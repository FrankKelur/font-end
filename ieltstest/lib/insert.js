// const json = require('./cn.json');
// const json = require('./chapter5.json');
// const list = [
//   require('./4-2-7.json'),
//   require('./4-2-8.json'),
//   require('./4-2-9.json'),
//   require('./4-2-10.json'),
//   require('./4-2-11.json'),
//   require('./4-2-12.json'),
// ]
const json = require('./essay-cn.json');

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost';

// Database Name
const dbName = 'wordlist';
let db = null;
MongoClient.connect(url, function (err, client) {

  db = client.db(dbName);
  let wordlist = db.collection('wordlist');
  console.log('db.collection', db.collection);
  // list.forEach(json => {
  // Object.keys(frequency).forEach((tag) => {
  //   let json = frequency[tag];
  //   console.log('json, tag', json, tag);
  //   if (tag !== 'B') {
  //     return;
  //   }
  var tag = 'w';
  Object.keys(json).forEach((key) => {
    // wordlist.insertOne({
    //   key,
    //   tag,
    //   val: json[key],
    //   type: 'en',
    //   correctTime: 0,
    //   errorTime: 0,
    // });
    // wordlist.insertOne({
    //   key,
    //   tag,
    //   val: key,
    //   type: 'voice',
    //   correctTime: 0,
    //   errorTime: 0,
    // });
    wordlist.insertOne({
      key,
      tag,
      val: json[key],
      type: 'cn',
      correctTime: 0,
      errorTime: 0,
    });
  });
  // });

  client.close();
});

