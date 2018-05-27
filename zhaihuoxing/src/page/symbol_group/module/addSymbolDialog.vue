<template lang="pug">
  b-dialog.add-symbol-dialog(:show='true', :title="renderData.addSymbol", :show-close="true", :before-close="beforeClose")
    el-input(:placeholder='renderData.symbolName')
      i.theme-color-C(slot='suffix', class="el-input__icon el-icon-search")
    el-checkbox-group(v-model="checkedSymbol", @change="checkedSymbolChange")
      b-checkbox(v-for="item in symbolList", :label="item", :key="item") {{item}}
    b-checkbox(:indeterminate="isIndeterminate", v-model="checkAll", @change="checkAllChange") {{renderData.selectAll}}
    template(slot="footer")
      b-button(@click="cancelForm") {{renderData.close}}
      b-button(@click="" type="primary") {{renderData.add}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BInput from 'components/BInput'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  import BIcon from 'components/BIcon'
  import BCheckbox from 'components/BCheckbox'

  export default {
    name: 'add-symbol-dialog',
    data () {
      return {
        checkedSymbol: [],
        symbolList: ['Symbol01', 'Symbol02', 'Symbol03', 'Symbol04', 'Symbol05', 'Symbol06', 'Symbol07', 'Symbol08', 'Symbol09', 'Symbol10', 'Symbol12', 'Symbol22'],
        isIndeterminate: false,
        checkAll: false
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      checkedSymbolChange (val) {
        console.log(val)
        let checkedCount = val.length
        this.checkAll = checkedCount === this.symbolList.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.symbolList.length
      },
      checkAllChange () {
        this.checkAll = !this.checkAll
        this.checkedSymbol = this.checkAll ? this.symbolList : []
        this.isIndeterminate = false
      },
      cancelForm () {
        this.visible.dialog = null
      }
    },
    mounted () {
    },
    components: {
      BCheckbox,
      BIcon,
      BDialog,
      BInput,
      BButton,
      BSelect
    }
  }
</script>

<style lang="less">
  .add-symbol-dialog{
    .el-input{
      width:70%;
    }
    .el-checkbox{
      width: 30%;
      margin-left: 0px;
      margin-top: 5px;
      margin-bottom: 5px;
    }
  }
</style>
