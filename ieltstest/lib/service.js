const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost';

// Database Name
const dbName = 'wordlist';
let db = null;
module.exports = {
  getTotal(wordlist, query) {
    return new Promise((resolve) => {
      wordlist.find(query).toArray((err, totalList) => {
        console.log('totalList.length: ', totalList.length);
        let total = totalList.length;
        resolve(total);
      });
    });
  },
  deleteWord(type, key, tag) {
    return new Promise((resolve) => {
      MongoClient.connect(url, async (err, client) => {
        db = client.db(dbName);
        let wordlist = db.collection('wordlist');
        wordlist.remove({ type, key, tag: tag || undefined, }, (err) => {
          if (err) {
            console.log('delete error', err);
          }
          resolve(true);
        });
      })
    });
  },
  getData(type, pageNum, pageSize, errorOnly, errorTime, tag) {
    const query = {
      type,
      errorTime,
      tag: tag || undefined,
      correctTime: { $lt: errorOnly ? 1 : 100 },
    };
    return new Promise((resolve) => {
      MongoClient.connect(url, async (err, client) => {
        if (err) {
          console.log('--------error-------', err);
        }
        db = client.db(dbName);
        let wordlist = db.collection('wordlist');
        let total = await this.getTotal(wordlist, query);
        wordlist.find(query).limit(pageSize).skip((pageNum - 1) * pageSize)
          .toArray(async (err, list) => {
            if (err) {
              return console.log('--------error-------', err);
            }
            resolve({
              data: list.reduce((res, { key, val }) => ({
                ...res,
                [key]: type == 'pronounce' ? true : (type == 'en' || type == 'cn') ? val : ''
              }), {}), total
            });
            client.close();
          });
      });
    });
  },
  setData(type, obj, pageSize, pageNum, errorOnly, errorTime, tag) {
    const query = {
      type,
      tag: tag || undefined,
      errorTime,
      correctTime: { $lt: errorOnly ? 1 : 100 },
    };
    let keys = Object.keys(obj);
    return new Promise((resolve) => {
      MongoClient.connect(url, async (err, client) => {
        if (err) {
          console.log('--------error-------', err);
        }
        db = client.db(dbName);
        let wordlist = db.collection('wordlist');
        console.log('query, pageSize, pageNum', query, pageSize, pageNum);
        wordlist.find(query).limit(pageSize).skip((pageNum - 1) * pageSize)
          .toArray((err, list) => {
            if (err) {
              console.log('err, list', err, list);
              return;
            }
            let map = list.reduce((res, item) => {
              return {
                ...res,
                [item.key]: item
              }
            }, {});
            let result = [];
            keys.forEach((key, idx) => {
              let answer = obj[key];
              if (!map[key]) {
                console.log('\n\nmap[key], key, map', key, map);
                return;
              }
              let { correctTime = 0, errorTime = 0, val, _id } = map[key];
              let correct = ('en' == type || 'pronounce' == type) ? !!answer : val.trim() === answer.trim();
              console.log('update map[key]', map[key]);
              if (correct) {
                correctTime++;
              } else {
                errorTime++;
                correctTime = 0;
                result.push({
                  key,
                  val,
                  answer
                })
              }
              wordlist.update({ _id }, {
                $set: { correctTime, errorTime }
              }, (error, res) => {
                if (keys.length === (idx + 1)) {
                  resolve(result);
                  client.close();
                }
              });
            });
          })
      });
    });
  }
};