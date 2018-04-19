import fetch from './fetch'
import cookie from 'cookie'

var url = '/api/resource/user/check_user_status'
var params = {}
// 如果token 存在
var tokenExist = cookie.get('token')
var promptAlreadyOrActive = JSON.parse(localStorage.getItem('promptAlreadyOrActive'))
if (tokenExist && !promptAlreadyOrActive) {
  fetch(url, params).then(({re}) => {
    localStorage.setItem('promptAlreadyOrActive', true)
  })
}
