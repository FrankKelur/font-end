<template lang="pug">
  b-dialog.set-term(:show.sync='dialogVisible', :title="renderData.termSet", :show-close="true", width="38%", :before-close="beforeClose")
    el-form(:rules="rules", ref="setTerm", :model="setTerm", label-width="140px", label-position="left")
      el-form-item.is-required
        template(slot="label")
          span.theme-color-C.inline-label(v-text="renderData.auditTerm", v-ellipsis-title="")
        b-select(:model.sync="setTerm.dataSource", :multiple='true', :placeholder="renderData.pleaseSelect", valueKey="key")
          el-option(v-for="(field, idx) in allDataSource", :key="idx", :label="field.label", :value="field")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="setTermFunc", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
//  import service from '../service'
  import { validator } from 'common/js/Utils'

  export default {
    name: 'set-term',
    data () {
      var _this = this
      return {
        fieldList: [],
        setTerm: {
          dataSource: []
        },
        allDataSource: [],
        rules: {
          terms: [
            {
              test (val) {
                return val && val.length
              },
              validator: validator.validate,
              message: _this.renderData.pleaseInput
            }
          ]
        },
        dialogVisible: true,
        showClose: false
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
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
      setTermFunc () {
        var target = this.currRow.stepInfo.currTarget
        target.dataSource = Object.assign([], this.setTerm.dataSource)
        this.visible.dialog = null
      }
    },
    mounted () {
      console.log('setTerm mounted ')
      var target = this.currRow.stepInfo.currTarget
      this.allDataSource = target.allDataSource
      this.setTerm.dataSource = Object.assign([], target.dataSource)
    },
    components: {
//      BIcon,
      BSelect,
      BButton,
      BDialog
    }
  }
</script>

<style lang="less" scoped>
  .set-term {
    .audit-item {
      line-height: 26px;
      span:nth-child(1) {
        display: inline-block;
        vertical-align: top;
        width: 20%;
      }
      span:nth-child(2) {
        display: inline-block;
        vertical-align: top;
        width: 80%;
      }
    }
  }
</style>
