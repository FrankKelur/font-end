<template lang="pug">
  .symbol_group.component#symbol_group
    b-title(:title="renderData.symbolGroup")
    .header
      b-button(type="primary", @click="newgroup") {{renderData.newSymbolGroup}}
      b-button(@click="") {{renderData.importSymbol}}
    .settingForm
      el-collapse(v-model="activeName")
        el-collapse-item.theme-color-C(v-for="(item, parIndex) in groupList", :key="parIndex", :title="item.groupname", :name="item.groupname")
          .content
            el-input.theme-color-C(v-model="item.value", :placeholder='renderData.symbolName', @keyup.enter.native="search(item)")
              i.theme-color-C(slot='suffix', class="el-input__icon el-icon-search", @click="search(item)")
            .ifsymbolnull(v-if="item.arr.length == 0")
              el-checkbox-group(v-model="item.checkedSymbol", @change="checkedSymbolChange(item)")
                b-checkbox(v-for="item1 in item.symbol", :label="item1", :key="item1") {{item1}}
              b-checkbox(:indeterminate="item.isIndeterminate", v-model="item.checkAll", @change="checkAllChange(item)") {{renderData.selectAll}}
            .ifsymbol(v-if="item.arr.length != 0")
              el-checkbox-group(v-model="item.arr", @change="searchSymbolChange(item)")
                b-checkbox(v-for="item2 in item.arr", :label="item2", :key="item2") {{item2}}
              b-checkbox(:indeterminate="item.isIndeterminateSearch", v-model="item.searchAll", @change="searchAllChange(item)") {{renderData.selectAll}}
          .footer
            b-button(@click="") {{renderData.massChange}}
            b-button(@click="") {{renderData.massRemove}}
            b-button(type="primary", @click="") {{renderData.massAdd}}
    component(:is="visible.dialog", :visible="visible", :renderData='renderData', @listenToDialog="showAddSymbol")
    component(:is="visible1.dialog", :visible="visible1", :renderData='renderData')

</template>

<script>
  import componentMixin from 'common/js/componentMixin'
  import BTitle from 'components/BTitle'
  import BButton from 'components/BButton'
  import BCheckbox from 'components/BCheckbox'
  import BIcon from 'components/BIcon'
  import newGroupDialog from './module/newGroupDialog.vue'
  import addSymbolDialog from './module/addSymbolDialog.vue'

  export default {
    mixins: [componentMixin],
    name: 'symbol_group',
    data () {
      var symbol = window.renderData.components.symbol_group
      var renderData = Object.assign({}, symbol.symbol_group_auth, symbol.symbol_group_default)
      return {
        activeName: [],
        groupList: [
          {
            isIndeterminate: false,
            isIndeterminateSearch: false,
            checkedSymbol: [],
            value: '',
            checkAll: false,
            searchAll: false,
            groupname: '123',
            arr: [],
            symbol: ['Symbol01', 'Symbol02', 'Symbol03', 'Symbol04', 'Symbol05', 'Symbol06', 'Symbol07', 'Symbol08', 'Symbol12', 'Symbol22']
          },
          {
            isIndeterminate: false,
            isIndeterminateSearch: false,
            checkedSymbol: [],
            value: '',
            searchAll: false,
            checkAll: false,
            groupname: '234',
            arr: [],
            symbol: ['Symbol01', 'Symbol02', 'Symbol03', 'Symbol06', 'Symbol07', 'Symbol08', 'Symbol12', 'Symbol22']
          }
        ],
        renderData: renderData,
        visible: {
          dialog: null
        },
        visible1: {
          dialog: null
        }
      }
    },
    methods: {
      newgroup () {
        this.visible.dialog = 'newGroupDialog'
      },
      checkedSymbolChange (item) {
        let checkedCount = item.checkedSymbol.length
        item.checkAll = checkedCount === item.symbol.length
        item.isIndeterminate = checkedCount > 0 && checkedCount < item.symbol.length
      },
      checkAllChange (item) {
        item.checkAll = !item.checkAll
        item.checkedSymbol = item.checkAll ? item.symbol : []
        item.isIndeterminate = false
      },
      searchSymbolChange (item) {
        let checkedCount = item.checkedSymbol.length
        console.log(item.arr)
        item.searchAll = checkedCount === item.arr.length
        console.log(item.searchAll)
        item.isIndeterminateSearch = checkedCount > 0 && checkedCount < item.arr.length
      },
      searchAllChange (item) {
        item.searchAll = !item.searchAll
        item.checkedSymbol = item.searchAll ? item.arr : []
        item.isIndeterminateSearch = false
      },
      search (item) {
        let arr = []
        for (let i = 0; i < item.symbol.length; i++) {
          if (item.symbol[i].indexOf(item.value) >= 0) {
            arr.push(item.symbol[i])
          }
        }
        item.arr = arr
        console.log(item.arr.length)
      },
      showAddSymbol () {
        this.visible1.dialog = 'addSymbolDialog'
      }
    },
    mounted () {
    },
    components: {
      BTitle,
      BIcon,
      'newGroupDialog': newGroupDialog,
      'addSymbolDialog': addSymbolDialog,
      BButton,
      BCheckbox
    }
  }
</script>

<style lang="less">
  #symbol_group {
    .settingForm{
      margin-top: 15px;
      .footer{
        margin-left: 1.2%;
      }
      .content{
        .el-input{
          width: 20%;
          margin-bottom: 10px;
        }
        .el-checkbox{
          width: 19%;
          margin-left: 0px;
          margin-top: 5px;
          margin-bottom: 5px;
        }
        margin-left: 1.2%;
      }
    }
  }
</style>
