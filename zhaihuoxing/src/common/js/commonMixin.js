import Utils from 'common/js/Utils'

export default {
  methods: {
    safeGet (obj, key, defaultVal) {
      return Utils.safeGet.call(obj, key, defaultVal)
    }
  }
}
