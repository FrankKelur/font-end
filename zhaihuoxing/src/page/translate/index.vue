<template lang="pug">
<<<<<<< HEAD
  div#translate
=======
  div#translate.component
>>>>>>> 8e42a9b0dd522263bff10263b5a0e871ede4b0fb
    .title
      b-title.amt-more-left-in(:title='cTitle')
    .select-bar
      span 组件名称
      b-select(:model.sync="selectedResource", :placeholder="pleaseSelect")
        el-option(:label="item.key", :value="$idx", v-for="(item, $idx) in sList", :key="$idx")
      b-button(type="primary", @click="getTranslate") 搜索
    //.edit-text
    //  textarea(v-model="transObj" cols="120" rows="30")
    //  .err-msg(v-if="errMsg", style="margin-top: 10px; color: red")
    //    span JSON格式错误！
    .translate-thead
      .el-col-6.el-col
        span 语言
      .el-col-8.el-col
        span Key
      .el-col-10.el-col
        span 文案
    .translate-tbody
      .left.el-col-6.el-col
        ul
          li(v-for="item in langList" v-text="item", :data-tab="item", @click="tab(item)", :class="[currLang===item ? 'active' : '']")
      .right.el-col-18.el-col
        .content
          el-form(:model="transObj[currLang]", label-width="200px")
            el-form-item(v-for="key in Object.keys(transObj[currLang])", :label="key", :key="key")
              el-input(v-model="transObj[currLang][key]")
    .btn-bar
      b-button(type="primary", @click="saveTranslate", :disabled="!(editResource === selectedResource && editResource !== '')") 保存
</template>

<script>
  import service from './service'
  import BTitle from 'components/BTitle'
  import BSelect from 'components/BSelect'
  import BButton from 'components/BButton'
  import componentMixin from 'common/js/componentMixin'

  export default {
    name: 'translate',
    mixins: [componentMixin],
    data () {
      var trans = window.renderData.components.translate
      var renderData = Object.assign({}, trans, trans.translate_auth)
      return {
        renderData: renderData,
        sList: [],
        cTitle: '文案管理',
        pleaseSelect: '请选择',
        selectedResource: '',
        editResource: '',
        errMsg: false,
        disable: true,
        transObj: {
          'zh-CN': {},
          'ct': {},
          'en': {}
        },
        currLang: 'zh-CN',
        langList: []
      }
    },
    components: {
      BTitle,
      BSelect,
      BButton
    },
    methods: {
      getResourceList () {
        var params = {}
        service.getResourceList(params).then(res => {
          this.sList = res
        })
      },
      getTranslate () {
        var params = this.sList[this.selectedResource]
        service.getTranslate(params).then(res => {
          this.editResource = this.selectedResource
          this.transObj = res
          this.langList = Object.keys(res)
          this.currLang = this.langList[0]
        })
      },
      tab (lang) {
        this.currLang = lang
      },
      saveTranslate () {
        var data = this.transObj
        this.langList.forEach(lang => {
          if (JSON.stringify(data[lang]) === '{}') {
            delete data[lang]
          }
        })
        var params = {
          data: data
        }
        Object.assign(params, this.sList[this.editResource])
        service.editTranslate(params).then(res => {
        })
      }
    },
    async mounted () {
      await this.getResourceList()
    }
  }
</script>
<style lang="less" scoped>
  .translate-thead {
    height: 40px;
    line-height: 40px;
    background: #EFF2F7;
    border: 1px solid #dfe6ec;
  }
  .translate-tbody {
    height: 500px;
  }
  .left {
    height: 500px;
    border: 1px solid #dfe6ec;
    li {
      padding: 11px 0 11px 15px;
      cursor: pointer;
      &:hover {
        background: #F9FAFC;
      }
      &.active {
        background: #E5E9F2;
      }
    }
  }
  .right {
    height: 500px;
    overflow: auto;
    padding-top: 10px;
    border-right: 1px solid #dfe6ec;
    border-bottom: 1px solid #dfe6ec;
  }
  .content {
    display: block;
    opacity: 1;
    transition: opacity .3s ease;
    .el-form {
      padding-right: 20px;
    }
    .el-form-item {
      margin-bottom: 10px;
    }
  }
  .b-select {
    width: 40%!important;
    margin: 20px 10px 20px 80px;
  }
  .btn-bar {
    margin-top: 20px;
  }
</style>
