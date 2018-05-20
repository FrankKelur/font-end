<template lang="pug">
<<<<<<< HEAD
  el-upload.b-upload.upload-demo.b-upload-single(action="/upload", :multiple="false", :on-success="uploadSuccess", :on-remove="handleRemove", :before-upload="beforeUpload", :file-list="fileList", list-type="picture", drag='', :class="{'hidden': fileList.length > 0}")
=======
  el-upload.b-upload.upload-demo.b-upload-single(action="/upload", :multiple="false", :on-success="uploadSuccess",
  :on-remove="handleRemove", :before-upload="beforeUpload", :file-list="fileList", list-type="picture", drag='', :class="{'hidden': fileList.length}", :disabled='disabled')
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    slot
    template(slot="tip")
      slot(name="tip")
</template>

<script>
  export default {
    name: 'b-upload',
    data () {
<<<<<<< HEAD
      return {
        fileList: []
      }
    },
    props: {
=======
      var fileList = this.value.url ? [this.value] : []
      return {
        fileList: fileList
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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
<<<<<<< HEAD
            type: ['image/png', 'image/jpg', 'image/jpeg'],
=======
            type: ['png', 'jpg', 'jpeg'],
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
            maxSize: 500000 // 500K
          }
        }
      }
    },
    methods: {
      uploadSuccess (res, file) {
        this.fileList = [file]
<<<<<<< HEAD
        console.log('uploadSuccess file', file)
        this.$emit('input', {url: file.response.filename, name: file.name, changed: true})
=======
        console.log('uploadSuccess file', file.response.filename, file.name)
        var fileModel = {
          url: '/tmp-preview/' + file.response.filename,
          filename: file.response.filename,
          name: file.name,
          changed: true
        }
        this.$emit('input', fileModel)
        this.$emit('upload-success', fileModel)
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
      },
      handleRemove (file, fileList) {
        this.fileList = []
        this.$emit('input', {})
      },
      beforeUpload (file) {
<<<<<<< HEAD
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
=======
        console.log('beforeUpload', file)
        var suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
        var validType = this.uploadFileConfig.type.includes(suffix.toLowerCase())
        if (validType && file.size < this.uploadFileConfig.maxSize) {
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
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

<<<<<<< HEAD
<style scoped>
  .b-upload-single.hidden >>> .el-upload {
    display: none;
  }
  .b-upload-single.hidden >>> .el-upload__tip {
    display: none;
=======
<style lang="less">
  .b-upload-single.hidden {
    .el-upload {
      display: none !important;
    }
    .el-upload__tip {
      display: none !important;
    }
  }
  .b-upload {
    .el-upload {
      width: 100% !important;
      .el-upload-dragger {
        width: 100% !important;
      }
    }
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
  }
</style>
