<template lang="pug">
  .b-form-item
    b-input(v-if='item.type==="input"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder')
    b-input(v-if='item.type==="textarea"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :rows="2")
    b-range(v-if='item.type==="range"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder')
    b-select(v-if='item.type==="select"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :multiple="item.multiple")
      el-option(v-for="(opt, idx) in opts", :key='idx', :label='opt.val||opt.label',  :value='opt.key', :class="optionCls")
    b-datepicker(v-if='item.type==="datetimerange"', :model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder', :type="cType", :hasInterval="item.hasInterval")
    b-button(v-if='item.type==="button"', :type='item.styleType') {{item.value}}
    .b-text(v-if='item.type==="text"', :type='item.styleType') {{item.placeholder}}
    b-upload(v-if='item.type==="upload"' action="/upload", v-model="tmpModel")
      i.el-icon-upload
      .el-upload__text {{item.placeholder}}
      .el-upload__tip(slot="tip") {{item.tooltip}}
    .cascade-select(v-if='item.type==="cascadeSelect"')
      b-select(:model.sync="tmpModel", @change='changeHandler', :placeholder='item.placeholder')
        el-option(v-for="opt in opts", :key='opt.key', :label='opt.val||opt.label',  :value='opt.key', :class="optionCls")
      .sub-info(v-for="(field, idx) in cFields")
        span {{field.label + '  ' + field.key}}
</template>

<script>
  import BButton from 'components/BButton'
  import BRange from 'components/BRange'
  import BSelect from 'components/BSelect'
  import BUpload from 'components/BUpload'
  import BDatepicker from 'components/BDatepicker'
  import BInput from 'components/BInput'
  import utils from 'common/js/Utils'

  export default {
    name: 'b-form-item',
    data () {
      return {
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
      BButton
    },
    methods: {
      changeHandler (value) {
//        console.log('form item changeHandler')
        this.$emit('update:model', value || '')
        this.$emit('change', this.item, this.tmpModel)
      },
      getOpts (url) {
        var params = {}
        Object.assign(params, this.item.params, this.params)
        console.log('params', ...arguments)
        if (url === '/api/resource/audit_start/get_mt4_by_user_name') { // z delete
          this.opts = [
            {
              key: '10001',
              label: '10001',
              children: [
                {
                  key: '美元',
                  label: '货币'
                }
              ]
            }
          ]
          return
        }
        return utils.getOptionList(params, url).then(res => {
          this.opts = res.data || []
        })
      }
    },
    props: {
      item: {
        type: Object,
        required: true
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
        this.$emit('update:model', this.tmpModel)
      },
      model (newVal, oldVal) {
        this.tmpModel = this.model
      },
      'item.params': {
        handler () {
          console.log('item.params handler')
          var item = this.item
          if ((item.type === 'select' && typeof item.dataSource === 'string' && item.dataSource) || item.type === 'cascadeSelect') {
            this.getOpts(item.dataSource)
          }
        },
        deep: true
      }
    },
    computed: {
      cType () {
        if (this.item.format === 'yyyy-MM-dd') {
          return 'date'
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
      if (this.item.type === 'select' && typeof this.item.dataSource === 'object') {
        this.opts = this.item.dataSource
      } else if ((this.item.type === 'select' || this.item.type === 'cascadeSelect') && this.item.dataSource) {
        this.getOpts(this.item.dataSource)
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
