<template lang="pug">
  .b-form-item
    b-input(v-if='item.type==="input"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :disabled="disabled", :clearable="clearable")
    b-input(v-if='item.type==="textarea"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :rows="2", :disabled="disabled", :clearable="clearable")
    b-range(v-if='item.type==="range"', :model.sync="tmpModel", @change='changeHandler', :startPlaceholder='item.placeholder', :endPlaceholder='item.placeholder', :disabled="disabled", :clearable="clearable")
    b-select(v-if='item.type==="select"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :multiple="item.multiple", :disabled="disabled", :clearable="clearable")
      el-option(v-for="opt in opts", :key='opt.key', :label='opt.val||opt.label',  :value='opt.key', :class="optionCls")
    b-select(v-if='item.type==="multiple-select"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :multiple="true", :disabled="disabled", :clearable="clearable")
      el-option(v-for="opt in opts", :key='opt.key', :label='opt.val||opt.label',  :value='opt.key', :class="optionCls")
    b-datepicker(v-if='item.type==="datetimerange"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder',
    :type="cType", :hasInterval="item.hasInterval", :disabled="disabled", :dayText="renderData.day", :hourText="renderData.hour", :clearable="clearable")
    b-button(v-if='item.type==="button"', :type='item.styleType') {{item.value}}
    .b-text(v-if='item.type==="text"', :type='item.styleType') {{item.placeholder}}
    .b-clause(v-if='item.type==="clause"&&item.file')
      b-checkbox(:model.sync="tmpModel")
        span {{item.label}}
        a(:href="item.file.url+'?name='+item.file.name") {{item.file.name}}
    b-upload(v-if='item.type==="upload"' action="/upload", v-model="tmpModel", :disabled="disabled", :uploadFileConfig="uploadFileConfig")
      i.el-icon-upload
      .el-upload__text {{item.placeholder}}
      .el-upload__tip(slot="tip") {{item.tooltip}}
    .cascade-select(v-if='item.type==="cascadeSelect"')
      b-select(:model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :disabled="disabled")
        el-option(v-for="opt in opts", :key='opt.key', :label='opt.val||opt.label',  :value='opt.key', :class="optionCls", :clearable="clearable")
      .sub-info(v-for="(field, idx) in cFields")
        span {{field.label + '  ' + field.key}}


</template>

<script>
  import BButton from 'components/BButton'
  import BCheckbox from 'components/BCheckbox'
  import BRange from 'components/BRange'
  import BSelect from 'components/BSelect'
  import BUpload from 'components/BUpload'
  import BDatepicker from 'components/BDatepicker'
  import BInput from 'components/BInput'
  import utils from 'common/js/Utils'
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  export default {
    name: 'b-form-item',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess,
        opts: [],
        tmpModel: this.model || '',
        optionCls: {
          'theme-bg-H theme-color-C theme-border-lightenD12 theme-bg-lightenD12-hover theme-bg-A-active theme-color-H-active': true
        }
      }
    },
    components: {
      BInput,
      BDatepicker,
      BSelect,
      BUpload,
      BRange,
      BCheckbox,
      BButton
    },
    methods: {
      changeHandler (value) {
        console.log('form item changeHandler')
        this.$emit('update:model', value || '')
        this.$emit('change', this.item, this.tmpModel)
      },
      getOpts (url, setting) {
        var params = {}
        Object.assign(params, this.item.params, this.params)
        console.log('params', ...arguments)
        return utils.getOptionList(params, url).then(({re, data}) => {
          if (setting.valueField && data instanceof Array) {             // 后台需要 特定字段作为搜索值时
            data.forEach(function (val) {
              val.key = val[setting.valueField]
            })
          }
//          if (setting.initField) {                                        // 初始化某个表单项值 - - - 暂时废弃
//            data.forEach(function (val) {
//              if (val[setting.initField]) {
//                vm.tmpModel = val.key
//              }
//            })
//          }
          this.opts = data || []
          if (re === '500') {
            this.opts = []
          }
        })
      }
    },
    props: {
      clearable: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      item: {
        type: Object,
        required: true
      },
      renderData: {
        type: Object,
        default () {
          return {}
        }
      },
      uploadFileConfig: {
        type: Object,
        default () {
          return {
            type: ['png', 'jpg', 'jpeg'],
            maxSize: 500000 // 500K
          }
        }
      },
      model: {
        required: true
      },
      params: { // b-search-form 里传来参数
        type: Object,
        default () {
          return {}
        }
      }
    },
    watch: {
      tmpModel () {
        console.log('tmpModel watch')
        this.$emit('update:model', this.tmpModel)
      },
      model (newVal, oldVal) {
        console.log('model change newVal, oldVal', newVal, oldVal)
        this.tmpModel = this.model
      },
      'item.params': {
        handler () {
          console.log('item.params handler')
          var item = this.item
          if (((item.type === 'select' || item.type === 'multiple-select') && typeof item.dataSource === 'string' && item.dataSource) || item.type === 'cascadeSelect') {
            this.getOpts(item.dataSource, item)
          }
        },
        deep: true
      }
    },
    computed: {
      cType () {
        if (this.item.format === 'yyyy-MM-dd') {
          return 'daterange'
        }
        return 'datetimerange'
      },
      cFields () {
        if (this.item.type === 'cascadeSelect') {
          var op = this.opts.find(op => op.key === this.tmpModel)
          return (op && op.children) || []
        }
        return []
      }
    },
    mounted () {
      if ((this.item.type === 'select' || this.item.type === 'multiple-select') && typeof this.item.dataSource === 'object') {
        this.opts = this.item.dataSource
      } else if ((this.item.type === 'select' || this.item.type === 'multiple-select' || this.item.type === 'cascadeSelect') && this.item.dataSource) {
        this.getOpts(this.item.dataSource, this.item)
      }
    }
  }
</script>

<style lang="less" scoped>
  .b-form-item {
    .el-date-editor--datetimerange.el-input {
      width: 100%;
    }
    .el-select {
      width: 100%;
    }
    .cascade-select {
      .sub-info {
        white-space: pre;
      }
    }
  }
</style>
