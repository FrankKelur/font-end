<template lang="pug">
  AddUser(:getSelectedUserUrl="getSelectedUserUrl", :saveSelectedUserUrl="saveSelectedUserUrl", :renderData="renderData", :visible="visible", :currRow="currRow")
</template>

<script>
  import AddUser from './AddUser'

  export default {
    name: 'NoticePeopleAdd',
    data () {
      return {
        getSelectedUserUrl: '/api/resource/audit_setting/get_audit_user',
        saveSelectedUserUrl: '/api/resource/audit_setting/edit_audit_user'
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      }
    },
    components: {
      AddUser
    }
  }
</script>
