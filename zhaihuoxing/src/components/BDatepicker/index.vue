<template lang="pug">
  el-date-picker.b-date-picker(:type="type", v-model="value", :start-placeholder='placeholder', :end-placeholder='placeholder', @change="changeHandle" v-if="!hasInterval", :disabled="disabled", :clearable="clearable")
  .b-date-picker(v-else)
    el-date-picker.b-date-picker(:type="type", v-model="value", :start-placeholder='placeholder', :end-placeholder='placeholder', @change="changeHandle", :disabled="disabled", :clearable="clearable")
    b-input.margin-top(:model="interval", placeholder='-', :disabled="true")

</template>

<script>
  import Vue from 'vue'
  import BInput from 'components/BInput'
  import { DatePicker } from 'element-ui'
  import styleMixin from '@/common/js/maxin/styleMixin'
  import styleMixinLess from '!raw-loader!./styleMixin.less'

  Vue.use(DatePicker)
  export default {
    name: 'b-date-picker',
    mixins: [styleMixin],
    data () {
      return {
        styleMixinLess: styleMixinLess,
        value: ''
      }
    },
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      clearable: {
        type: Boolean,
        default: true
      },
      model: {
        required: true
      },
      placeholder: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'datetimerange'
      },
      hasInterval: {
        type: Boolean,
        default: false
      },
      dayText: {
        type: String,
        default: 'D'
      },
      hourText: {
        type: String,
        default: 'H'
      }
    },

    methods: {
      // z todo 转成 相应时区的时间戳
      changeHandle (value) {
        var range = this.type === 'datetimerange' || this.type === 'daterange'
        var val = ''
        if (range) {
          let [startDate, endDate] = value || []
          val = startDate && endDate ? `${Date.parse(startDate) / 1000}-${Date.parse(endDate) / 1000}` : ''
          this.$emit('update:model', val)
        } else {
          val = value ? '' + Date.parse(value) / 1000 : ''
          this.$emit('update:model', val)
        }
        this.$emit('change')
      },
      initValue () {
        var modelStr = this.model + ''
        let [startDate, endDate] = modelStr.split('-')
        var range = this.type === 'datetimerange' || this.type === 'daterange'
        console.log('refreshValue model', this.model)
        if (range) {
          if (startDate && endDate) {
            startDate = new Date(parseInt(startDate) * 1000)
            endDate = new Date(parseInt(endDate) * 1000)
//            var format = 'YMD~HMS'        暂时不用
//            if (format) {
//              startDate = this.handDataFormat(startDate, format)
//              endDate = this.handDataFormat(endDate, format)
//              this.value = [startDate, endDate]
//              console.log('this.value')
//              console.log(this.value)
//              return
//            }
            this.value = [startDate, endDate]
          } else {
            this.value = null
          }
        } else {
          this.value = this.model ? new Date(parseInt(this.model) * 1000) : null
        }
      },
      handDataFormat (date, format) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        var hours = date.getHours()
        var minutes = date.getMinutes()
        var seconds = date.getSeconds()
        if (month < 10) {
          month = '0' + month
        }
        if (day < 10) {
          day = '0' + day
        }
        if (hours < 10) {
          hours = '0' + hours
        }
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        if (format === 'YMD~HMS') {
          return year + '-' + month + '-' + day + '~' + hours + ':' + minutes + ':' + seconds
        }
      }
    },
    watch: {
      model () {
        this.initValue()
      }
    },
    computed: {
      interval () {
        var val = this.value || [0, 0]
        let [start, end] = val
        let range = end - start
        let day = Math.floor(range / 1000 / 60 / 60 / 24)
        let hour = Math.floor(range / 1000 / 60 / 60 % 24)
        return day + this.dayText + ' ' + hour + this.hourText
      }
    },
    mounted () {
      console.log('datepicker', this.type)
      this.initValue()
    },
    components: {
      BInput
    }
  }
</script>

<style lang="less">
  .el-date-editor .el-range__close-icon {
    width: 14px !important;
  }
  .b-date-picker {
    .el-date-editor--datetimerange.el-input, .el-date-editor--date {
      width: 100%;
    }
    .margin-top {
      margin-top: 10px;
    }
    /*.el-input__icon {*/
    /*width: 5% !important;*/
    /*}*/
    /*.el-range-input {*/
    /*margin-left: 4% !important;*/
    /*}*/
    /*i.el-icon-circle-close {*/
    /*display: none !important;*/
    /*}*/
  }
</style>
