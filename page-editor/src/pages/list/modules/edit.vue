<template lang="pug">
  b-dialog(:show='true', :title="renderData.edit", :show-close="true", :before-close="close" width="40%").edit
    c-form(:model="tempForm", ref="tempForm", :formItemList="formItemList", :renderData="renderData", label-width="140px", label-position="left", :visible="visible")
    template(slot="footer")
      b-button(@click="close") {{renderData.cancel}}
      b-button(@click="save", type="primary" v-if="!disabled") {{renderData.save}}
</template>

<script>
  import cForm from './cForm'
  import BIcon from 'components/BIcon'
  import BFormItem from 'components/BFormItem'
  import BButton from 'components/BButton'
  import BDialog from 'components/BDialog'
  import service from '../service'
  import renderData from '../lang'

  export default {
    name: 'edit',
    data () {
      return {
        page: this.$router.currentRoute.query.page,
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
      getDetail () {
        service.getDetail(this.currRow, this.page).then(({data}) => {
          Object.keys(data).forEach(key => {
            this.$set(this.tempForm, key, data[key])
          })
        })
      },
      close () {
        this.visible.dialog = null
      },
      save () {
        this.$refs['tempForm'].validate(valid => {
          if (valid) {
            var params = {
              page: this.page,
              data: {
                ...this.tempForm,
                ...this.visible.dialog === 'add' ? {_key: '_key' + new Date().getTime()} : {_key: this.currRow._key}
              }
            }
            service.edit(params).then(res => {
              this.$message({type: 'success', message: this.renderData.operateSuccess})
              this.close()
              this.$emit('refresh')
            })
          }
        })
      }
    },
    mounted () {
      // 给每个formItem 加上value: '' (type == file 的时候 value: {})
      this.formItemList.forEach(item => {
        this.$set(item, 'value', item.type === 'upload' ? {} : '')
      })
      this.getDetail()
    },
    components: {
      BIcon,
      BFormItem,
      cForm,
      BDialog,
      BButton
    }
  }
</script>

<style lang="less">
  .custom-form {
    .item {
      position: relative;
      .el-form-item {
        margin-top: 20px !important;
      }
    }
  }
</style>
