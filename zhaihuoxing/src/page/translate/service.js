import { fetch } from 'common/js/Utils'

export default {
  getResourceList (params) {
    var url = '/api/resource/translate/get_resource_list'
    return fetch(url, params)
  },
  getTranslate (params) {
    var url = '/api/resource/translate/get_translate'
    return fetch(url, params)
  },
  editTranslate (params) {
    var url = '/api/resource/translate/edit_translate'
    return fetch(url, params)
  }
}
