<template lang="pug">
  el-upload.b-upload.upload-demo.b-upload-single(action="/upload", :multiple="false", :on-success="uploadSuccess",
  :on-remove="handleRemove", :before-upload="beforeUpload", :file-list="fileList", list-type="picture", drag='', :class="{'hidden': fileList.length}", :disabled='disabled')
    slot
    template(slot="tip")
      slot(name="tip")
</template>

<script>
  export default {
    name: 'b-upload',
    data () {
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
            type: ['png', 'jpg', 'jpeg'],
            maxSize: 500000 // 500K
          }
        }
      }
    },
    methods: {
      uploadSuccess (res, file) {
        this.fileList = [file]
        console.log('uploadSuccess file', file.response.filename, file.name)
        var fileModel = {
          url: '/tmp-preview/' + file.response.filename,
          filename: file.response.filename,
          name: file.name,
          changed: true
        }
        this.$emit('input', fileModel)
        this.$emit('upload-success', fileModel)
      },
      handleRemove (file, fileList) {
        this.fileList = []
        this.$emit('input', {})
      },
      beforeUpload (file) {
        console.log('beforeUpload', file)
        var suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
        var validType = this.uploadFileConfig.type.includes(suffix.toLowerCase())
        if (validType && file.size < this.uploadFileConfig.maxSize) {
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
  }
</style>
