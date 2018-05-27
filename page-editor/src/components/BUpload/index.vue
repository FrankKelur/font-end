<template lang="pug">
  el-upload.b-upload.upload-demo.b-upload-single(action="/upload", :multiple="false", :on-success="uploadSuccess", :on-remove="handleRemove", :before-upload="beforeUpload", :file-list="fileList", list-type="picture", drag='', :class="{'hidden': fileList.length > 0}")
    slot
    template(slot="tip")
      slot(name="tip")
</template>

<script>
  export default {
    name: 'b-upload',
    data () {
      return {
        fileList: []
      }
    },
    props: {
      placeholder: {
        type: String
      },
      tooltip: {
        type: String
      },
      value: {
        type: Object
      },
      uploadFileConfig: {
        type: Object,
        default () {
          return {
            type: ['image/png', 'image/jpg', 'image/jpeg'],
            maxSize: 500000 // 500K
          }
        }
      }
    },
    methods: {
      uploadSuccess (res, file) {
        this.fileList = [file]
        console.log('uploadSuccess file', file)
        this.$emit('input', {url: file.response.filename, name: file.name, changed: true})
      },
      handleRemove (file, fileList) {
        this.fileList = []
        this.$emit('input', {})
      },
      beforeUpload (file) {
        console.log('file上傳之前')
        console.log(file)
        console.log('传入的配置')
        console.log(this.uploadFileConfig)
        var result = false
        for (let i = 0; i < this.uploadFileConfig.type.length; i++) {
          if (file.type.indexOf(this.uploadFileConfig.type[i]) > -1) {
            result = true
            break
          }
        }
        if (result && file.size < this.uploadFileConfig.maxSize) {
          return true
        } else {
          this.$emit('fileTypeNotRight')
          return false
        }
      }
    },
    computed: {},
    watch: {
      'value.url' (newVal, oldVal) {
        if (newVal) {
          this.fileList = [this.value]
        }
      }
    },
    mounted () {
    },
    components: {}
  }
</script>

<style scoped>
  .b-upload-single.hidden >>> .el-upload {
    display: none;
  }
  .b-upload-single.hidden >>> .el-upload__tip {
    display: none;
  }
</style>
