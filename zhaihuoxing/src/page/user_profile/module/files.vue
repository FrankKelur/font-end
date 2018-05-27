<template lang="pug">
  .files
    .title.theme-color-darkenC10.theme-bg-fadeA2.theme-border-lightenD12 {{renderData.userProfileFile}}
    .tooltip {{renderData.uploadFileInfo}}
    .doc-container
      b-alert.margin-bottom(v-if="auditFailReason", :title="renderData.auditFail", :description="auditFailReason", :closable="false")
      b-documents-viewer(:fileList="fileList", ref="docViewer", :disabled="disabled", :renderData="renderData")
      .footer
        b-button(@click="prev") {{renderData.previous}}
        b-button(@click="save", :disabled="disabled") {{renderData.save}}
        b-button(@click="next" type="primary" v-if="!isEnd") {{renderData.next}}
        b-button(@click="submit" type="primary", :disabled="disabled" v-else) {{renderData.submit}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BAlert from 'components/BAlert'
  import BDocumentsViewer from 'components/BDocumentsViewer'

  export default {
    name: 'files',
    data () {
      var fileList = this.setting.data.files.concat(this.setting.custom.files)
      var fileInfo = this.profileInfo.files
      fileList.forEach(file => {
        if (!fileInfo[file.key]) {
          fileInfo[file.key] = {
            url: '',
            name: '',
            status: '',
            remark: '',
            id: ''
          }
        }
        Object.assign(file, fileInfo[file.key])
      })
      return {
        fileList: fileList,
        fileInfo: fileInfo
      }
    },
    methods: {
      validate () {
        var invalidItem = this.fileList.find(item => item.required && !item.url)
        if (invalidItem) {
          console.log('invalidItem', invalidItem)
          this.$refs['docViewer'].chooseFile(invalidItem)
          return false
        }
        return true
      },
      uploadCDNBatch () {
        var params = {
          originPath: this.fileList.filter(file => file.changed).map(file => file.url.replace('/tmp-preview/', ''))
        }
        service.uploadCDNBatch(params)
      },
      generateFileInfo () {
        this.profileInfo.files = this.fileList.reduce((res, item) => {
          res[item.key] = {
            url: item.url.replace('tmp-preview', 'preview'),
            file_id: item.file_id,
            name: item.name
          }
          return res
        }, {})
        return this.profileInfo.files
      },
      save (cb) {
        if (!this.validate()) {
          return
        }
        this.uploadCDNBatch()
        var params = {
          group: 'files',
          data: this.generateFileInfo()
        }
        service.saveProfileInfo(params).then(res => {
          cb && typeof cb === 'function' && cb()
        })
      },
      submit () {
        if (!this.validate()) {
          return
        }
        this.generateFileInfo()
        this.uploadCDNBatch()
        service.submitUserProfile(this.profileInfo).then(() => {
          this.$emit('update-status', 'process')
          this.visible.page = 'complete'
        })
      },
      next () {
        if (!this.validate()) {
          return
        }
        this.generateFileInfo() // 把info保存到profileInfo 用于最后的提交
        var currIdx = this.pageList.indexOf(this.visible.page)

        if (this.disabled) { // 如果当前是disabled状态，就不保存
          this.visible.page = this.pageList[currIdx + 1]
          return
        }
        this.save(() => { // 下一步之前，先保存
          this.visible.page = this.pageList[currIdx + 1]
        })
      },
      prev () {
        var currIdx = this.pageList.indexOf(this.visible.page)
        if (currIdx) {
          this.visible.page = this.pageList[currIdx - 1]
        }
      }
    },
    props: {
      pageList: {
        required: true,
        type: Array
      },
      renderData: {
        required: true,
        type: Object
      },
      setting: {
        required: true,
        type: Object
      },
      auditFailReason: {
        required: true,
        type: String
      },
      profileInfo: {
        required: true,
        type: Object
      },
      visible: {
        required: true,
        type: Object
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    components: {
      BDocumentsViewer,
      BAlert,
      BButton
    },
    computed: {
      isEnd () {
        var currIdx = this.pageList.indexOf(this.visible.page)
        return currIdx === this.pageList.length - 2
      }
    },
    mounted () {
    }
  }
</script>

<style lang="less" scoped>
  .files {
    .tooltip {
      white-space: pre;
      overflow: hidden;
      line-height: 22px;
      text-overflow: ellipsis;
      text-align: justify;
      margin: 10px 0;
    }
    .title {
      font-size: 16px;
      height: 50px;
      line-height: 50px;
      border: solid 1px;
      margin-bottom: 20px;
      padding-left: 2%;
    }
  }

  .files .el-form {
    .margin-bottom {
      margin-bottom: 20px;
    }
  }
</style>
