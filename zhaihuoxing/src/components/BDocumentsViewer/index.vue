<template lang="pug">
  el-carousel.b-carousel(indicatorPosition='outside', @change="changeHandler", trigger="click", :autoplay="false", height='500px', ref="carousel")
    el-carousel-item(v-for="(file, idx) in fileList", :key="idx")
      .doc-container(v-if="currFile==file")
        div(v-show="isPdf(file)")
          .pdf-container#pdf
        div(v-if="isImage(file)")
          img#image(:src="currFile.url", :alt="currFile.name")
        div.upload-container(v-else-if="!file.url")
          b-upload(v-model="currFile", @upload-success="uploadSuccess", :disabled="disabled", :uploadFileConfig="uploadFileConfig")
            i.el-icon-upload
              .el-upload__text
                span {{renderData.dragFile}}
                span.theme-color-A {{renderData.clickUpload}}
        .preview-tooltip-container(v-else-if="!isPdf(file)")
          b-icon(iconName='pic', size="80px")
          .preview-tooltip
            span {{renderData.noPreview}}
            a(:href="file.url+'?name='+file.name", :download='file.name') {{renderData.clickToDownload}}
        .otherInfo.theme-bg-lightenC32.theme-color-H(v-show="file.status || file.remark")
          .status {{file.status}}
          .remark {{file.remark}}


</template>

<script>
  import Viewer from 'viewerjs/dist/viewer.js'
  import 'viewerjs/dist/viewer.css'
  import PDFObject from 'pdfobject/pdfobject'
  import BIcon from 'components/BIcon'
  import BUpload from 'components/BUpload'
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  export default {
    name: 'b-documents-viewer',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess,
        currFile: {
          file_type: '',
          name: '',
          url: '',
          file_status: '',
          remarks: '',
          dataSource: []
        },
        uploadFileConfig: {
          type: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg'],
          maxSize: 500000 // 500K
        },
        currIdx: -1,
        viewer: null,
        options: {
          // Enable inline mode, viewjs 配置
          inline: true,

          // Show the button on the top-right of the viewer
          button: false,

          // Show the navbar
          navbar: false,

          // Show the title
          title: false,

          // Show the toolbar
          toolbar: true,

          // Show the tooltip with image ratio (percentage) when zoom in or zoom out
          tooltip: true,

          // Enable to move the image
          movable: true,

          // Enable to zoom the image
          zoomable: true,

          // Enable to rotate the image
          rotatable: true,

          // Enable to scale the image
          scalable: false,

          // Enable CSS3 Transition for some special elements
          transition: true,

          // Enable to request fullscreen when play
          fullscreen: false,

          // Enable keyboard support
          keyboard: false,

          // Enable loop viewing.
          loop: false,

          // Min width of the viewer in inline mode
          minWidth: 200,

          // Min height of the viewer in inline mode
          minHeight: 100,

          // Define the ratio when zoom the image by wheeling mouse
          zoomRatio: 0.1,

          // Define the min ratio of the image when zoom out
          minZoomRatio: 0.01,

          // Define the max ratio of the image when zoom in
          maxZoomRatio: 100,

          // Define the CSS `z-index` value of viewer in modal mode.
          zIndex: 2015,

          // Define the CSS `z-index` value of viewer in inline mode.
          zIndexInline: 0,

          // Define where to get the original image URL for viewing
          // Type: String (an image attribute) or Function (should return an image URL)
          url: 'src',

          // Filter the images for viewing.
          // Type: Function (return true if the image is viewable)
          filter: null,

          // Event shortcuts
          ready: null,
          show: null,
          shown: null,
          hide: null,
          hidden: null,
          view: null,
          viewed: null
        }
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      fileList: {
        type: Array,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      uploadSuccess (file) {
        var index = this.currIdx
        Object.assign(this.fileList[index], file)
        this.currFile = this.fileList[index]
        console.log('documents viewer', file)
        this.$emit('upload-success', {file, index})
        this.refreshViewer(index)
      },
      chooseFile (file) {
        this.$refs['carousel'].setActiveItem(this.fileList.indexOf(file))
      },
      changeHandler (newIdx, oldIdx) {
        console.log('select file', this.fileList)
        this.currIdx = newIdx
        this.currFile = this.fileList[newIdx]
        this.$emit('select-file', this.currFile)
        this.refreshViewer(newIdx)
      },
      refreshViewer (newIdx) {
        if (this.isPdf(this.currFile)) {
          setTimeout(() => {
            PDFObject.embed(this.currFile.url, '#pdf')
          }, 500)
        } else if (this.isImage(this.currFile)) {
          var options = this.options
          var viewer = this.viewer
          setTimeout(() => {
            viewer = new Viewer(document.getElementById('image'), options)
            this.viewer = viewer
          }, 500)
        }
      },
      isImage (file) {
        var imageReg = /\.(jpg|png|jpeg)$/i
        return imageReg.test(file.name)
      },
      isPdf (file) {
        var pdfReg = /\.pdf$/i
        var doc = document.getElementsByTagName('html')[0]
        return pdfReg.test(file.name) && doc.getAttribute('browser') !== 'ie' // pdfobject 插件，不支持的浏览器，返回false
      }
    },
    mounted () {
      setTimeout(() => {
        if (this.fileList.length) {
          this.changeHandler(0, -1)
          var buttons = document.getElementsByClassName('el-carousel__button')
          Array.from(buttons).forEach((item, idx) => {
            var file = this.fileList[idx]
            if (file.required) {
              item.className += ' required'
            }
            item.innerText = file.label || file.name
          })
        }
      }, 1500)
    },
    components: {
      BUpload,
      BIcon
    }
  }
</script>

<style lang="less">
  .b-carousel {
    .el-carousel__indicators--outside {
      margin-top: -10px !important;
    }
    overflow: hidden;
    .el-carousel__indicators--outside {
      margin-top: -25px;
    }

    .upload-container {
      text-align: center;
      margin-top: 160px;
    }

    .el-carousel__button {
      width: auto !important;
      height: auto !important;
    }

    img[id^='image'], .pdf-container {
      height: 480px;
    }
    .viewer-prev, .viewer-play, .viewer-next {
      display: none !important;
    }
    button.el-carousel__button.required:before {
      content: "*";
      margin-right: 4px;
      color: #f56c6c;
    }
    .otherInfo {
      .status, .remark {
        width: 50%;
      }
    }
    .preview-tooltip-container {
      text-align: center;
      margin-top: 200px;
      .preview-tooltip {
        a {
          margin-left: 4px;
        }
      }
    }
  }
</style>
