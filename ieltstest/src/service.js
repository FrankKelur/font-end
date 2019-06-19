import { resolve } from "dns";

const opt = {
  method: 'POST',
  mode: 'cors',
  cache: 'default',
  headers: { 'content-type': 'application/json' },
}
const domain = 'http://localhost:3011'
export default {
  submit(type, data, pageNum, errorOnly, errorTime, pageSize) {
    return fetch(domain + '/api/setData', {
      ...opt,
      body: JSON.stringify({
        pageSize,
        pageNum,
        errorOnly,
        errorTime,
        data,
        type
      }),
    }).then(res => res.json())
      .catch(e => {
        console.log(e)
      })
  },
  deleteWord(type, key) {
    return fetch(domain + '/api/deleteWord', {
      ...opt,
      body: JSON.stringify({
        type,
        key
      })
    });
  },
  sayWord(word) {
    // return new Promise((resolve) => {
    //   window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
    //   resolve(true);
    // });
    return fetch(domain + '/api/sayWord', {
      ...opt,
      body: JSON.stringify({
        word,
      })
    });
  },
  getData(pageNum, type, errorOnly, errorTime, pageSize) {
    return fetch(domain + '/api/getData', {
      ...opt,
      body: JSON.stringify({
        pageSize,
        pageNum,
        errorOnly,
        errorTime,
        type
      }),
    }).then(res => res.json())
      .catch(e => {
        console.log(e)
        return { data: [], total: 0 }
      })
  }
}