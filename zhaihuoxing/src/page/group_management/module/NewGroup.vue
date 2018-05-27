<template lang="pug">
  div.clear-float
    b-button( @click="dialog" ).new_group_btn
      span {{renderData.newGroup}}
    b-dialog(:show.sync="showDialog"  width="38%", :title="renderData.newGroup").new-group-dialog
      el-form(:model="input" label-width="100px", :inline="true", :rules="rules")
        el-form-item(:label="renderData.groupName", prop="group_name")
          template(slot="label")
            span.theme-color-C(v-text="renderData.groupName")
          b-input(:model.sync="input.value", :placeholder="input.placeholder").form-input
      div(slot="footer")
        b-button(@click="dialog" )
          span {{renderData.cancel}}
        b-button(@click="dialog" type="primary")
          span {{renderData.confirm}}
</template>

<script>
  import Vue from 'vue'
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import utils from 'common/js/Utils'
  import { Form, FormItem } from 'element-ui'

  Vue.use(Form)
  Vue.use(FormItem)
  export default {
    name: 'new-group',
    data () {
      return {
        input: {
          placeholder: this.renderData.pleaseEnter,
          value: ''
        },
        rules: {
          group_name: [
            {
              required: true,
              message: this.renderData.pleaseEnter,
              trigger: 'change'
            },
            {
              regex: utils.constants.length30Limit,
              validator: utils.validator.validate,
              message: this.renderData.length30Limit,
              trigger: 'blur'
            }
          ]
        },
        showDialog: false
      }
    },
    methods: {
      dialog () {
        this.showDialog = true
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      }
    },
    components: {
      BButton,
      BDialog,
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .new_group_btn {
    float: right;
  }

  .new-group-dialog {
    .form-input {
      margin-left: 10px;
      display: inline-block;
      width: 260px;
    }
  }
</style>
