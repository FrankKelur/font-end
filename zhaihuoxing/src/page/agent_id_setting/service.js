import { fetch } from '../../common/js/Utils'

export default {
  getAgentIdList (params) {
    var url = '/api/resource/accountset/get_AgentId_list'
    return fetch(url, params)
  },
  editAgentId (params) {
    var url = '/api/resource/accountset/edit_AgentId'
    return fetch(url, params)
  }
}
