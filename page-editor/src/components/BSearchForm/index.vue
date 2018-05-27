<template lang="pug">
  .b-search-form.clear-float
    el-row(:gutter="10")
      el-col(:span="item.width", :offset='item.offset' v-for="item in computedFields", :key="item.field")
        b-form-item(:model.sync='searchData[item.field]', :item='item', @click.native='clickHandle(item)', :params="params", @keyup.enter.native="search(item)", :clearable="true")
</template>

<script>
  import BFormItem from 'components/BFormItem'

  export default {
    name: 'b-search-form',
    data () {
      return {}
    },
    components: {
      BFormItem
    },
    methods: {
      search (item) {
        if (item.handler !== 'reset') {
          this.$emit('search')
        }
      },
      clickHandle (item) {
        if (item.handler === 'search') {
          this.$emit('search')
        } else if (item.handler === 'reset') {
          this.$emit('reset')
        }
      }
    },
    computed: {
      computedFields () {
        var searchFields = Object.assign([], this.searchFields).filter(item => item.search)
        console.log('searchFields', searchFields)
        var count = 0
        var pointer = -1
        for (var idx in searchFields) {
          var field = searchFields[idx]
          if (field.type === 'textarea') {
            field.type = 'input'
          }
          count += field.width
          if (count > 18 && pointer === -1) {
            pointer = idx
          }
        }
        var searchBtnOffset = 0
        if (count <= 18) {
          searchBtnOffset = 18 - count
          pointer = searchFields.length
        }
        var searchButton = {
          type: 'button',
          handler: 'search',
          styleType: 'primary',
          offset: searchBtnOffset,
          width: 3,
          value: this.renderData.search
        }
        var resetButton = {
          type: 'button',
          handler: 'reset',
          styleType: 'secondary',
          width: 3,
          value: this.renderData.reset
        }
        if (searchFields.length !== 0) {
          searchFields.splice(pointer, 0, searchButton, resetButton)
        }
        return searchFields
      }
    },
    props: {
      params: {
        type: Object,
        default () {
          return {}
        }
      },
      searchData: {
        type: Object,
        required: true
      },
      searchFields: {
        type: Array,
        required: true
      },
      renderData: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.searchFields.forEach(item => {
        this.$set(this.searchData, item.field, '')
      })
//      this.computedFields = this.getComputedFields()
    }
  }
</script>

<style lang="less" scoped>
  .b-search-form {
    .b-form-item {
      margin-bottom: 10px;
    }
    .el-select {
      width: 100%;
    }
  }
</style>

<style lang="less">
  .b-form-item {
    .b-button {
      width: 100%;
    }
    .el-range-editor.el-input__inner {
      width: 100%;
    }
  }
</style>
