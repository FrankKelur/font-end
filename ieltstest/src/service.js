
const opt = {
  method: 'POST',
  mode: 'cors',
  cache: 'default',
  headers: { 'content-type': 'application/json' },
}
const domain = 'http://localhost:3011'
export default {
  submit(type, data, pageNum, errorOnly, errorTime, pageSize, tag) {
    return fetch(domain + '/api/setData', {
      ...opt,
      body: JSON.stringify({
        tag,
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
  deleteWord(type, key, tag) {
    return fetch(domain + '/api/deleteWord', {
      ...opt,
      body: JSON.stringify({
        type,
        key,
        tag
      })
    });
  },
  sayWord(word, speed) {
    // return new Promise((resolve) => {
    //   window.speechSynthesis.speak(new SpeechSynthesisUtterance(word));
    //   resolve(true);
    // });
    return fetch(domain + '/api/sayWord', {
      ...opt,
      body: JSON.stringify({
        word,
        speed
      })
    });
  },
  getData(pageNum, type, errorOnly, errorTime, pageSize, tag) {
    return fetch(domain + '/api/getData', {
      ...opt,
      body: JSON.stringify({
        pageSize,
        tag: tag || undefined,
        pageNum,
        errorOnly,
        errorTime,
        type
      }),
    }).then(res => res.json())
      .catch(e => {
        console.log(e)
        return { data: {}, total: 0 }
      })
  }
}