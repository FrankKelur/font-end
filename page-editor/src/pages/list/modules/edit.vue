<template lang="pug">
  b-dialog(:show='true', :title="renderData.edit", :show-close="true", :before-close="close").edit
    c-form(:model="tempForm", ref="tempForm", :formItemList="formItemList", :renderData="renderData", label-width="140px", label-position="left")
    template(slot="footer")
      b-button(@click="close") {{renderData.cancel}}
      b-button(@click="save", type="primary" v-if="!disabled") {{renderData.save}}
</template>

<script>
  import cform from './cform'
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import service from '../service'
  import renderData from '../lang'

  export default {
    name: 'edit',
    data () {
      return {
        renderData: renderData,
        tempForm: {}
      }
    },
    props: {
      formItemList: {
        required: true
      },
      visible: {
        required: true
      },
      currRow: {
        required: true
      }
    },
    computed: {
      disabled () {
        return this.visible.dialog === 'detail'
      }
    },
    methods: {
      close () {
        this.visible.dialog = null
      },
      save () {
        this.$refs['tempForm'].validate(valid => {
          if (valid) {
            var params = {
              audit_type: this.currRow.name,
              start_page: this.currRow.start_page,
              data: this.tempForm
            }
            service.edit(params)
          }
        })
      }
    },
    mounted () {
      // 给每个formItem 加上value: '' (type == file 的时候 value: {})
      this.formItemList.forEach(item => {
        this.$set(item, 'value', item.type === 'upload' ? {} : '')
      })
    },
    components: {
      BIcon,
      BFormItem,
      cform,
      BButton
    }
  }
</script>

<style lang="less">
  .custom-form {
    width: 50%;
    .item {
      position: relative;
      .el-form-item {
        margin-top: 20px !important;
      }
    }
  }
</style>
