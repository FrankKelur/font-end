<template lang="pug">
  el-date-picker.b-date-picker(:type="type", v-model="value", :start-placeholder='placeholder', :end-placeholder='placeholder', @change="changeHandle" v-if="!hasInterval")
  .b-date-picker(v-else)
    el-date-picker.b-date-picker(:type="type", v-model="value", :start-placeholder='placeholder', :end-placeholder='placeholder', @change="changeHandle")
    b-input(:model="interval", placeholder='-', :disabled="true")

</template>

<script>
  import BInput from 'components/BInput'

  export default {
    name: 'b-date-picker',
    data () {
      return {
        value: ''
      }
    },
    props: {
      model: {
        type: String,
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
      }
    },

    methods: {
      changeHandle (value) {
        let [startDate, endDate] = value.split(' - ')
        if (!startDate && !endDate) {
          this.$emit('update:model', '')
        } else {
          var val = this.type === 'datetimerange' ? `${Date.parse(startDate) / 1000}-${Date.parse(endDate) / 1000}` : Date.parse(value) / 1000
          this.$emit('update:model', val)
        }
        this.$emit('change')
      }
    },
    watch: {
      model () {
        let [startDate, endDate] = this.model.split(' - ')
        if (!startDate && !endDate) {
          this.value = []
        }
      }
    },
    computed: {
      interval () {
        return '1D 3H' // z todo 计算时间区间
      }
    },
    mounted () {
      console.log('datepicker', this.type)
      this.value = this.model
    },
    components: {
      BInput
    }
  }
</script>

<style lang="less" scoped>
  .b-date-picker {
    .el-date-editor--datetimerange.el-input, .el-date-editor--date{
      width: 100%;
    }
  }
</style>
