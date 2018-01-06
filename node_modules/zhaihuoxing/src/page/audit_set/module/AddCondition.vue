<template lang="pug">
  b-dialog.add-condition(:show.sync='dialogVisible', :title="renderData.addCondition", :show-close="true", width="38%", :before-close="beforeClose")
    el-form(:rules="rules", ref="setCondition", :model="setCondition", label-width="80px")
      el-form-item.is-required
        template(slot="label")
          | {{renderData.condition}}
        b-select(:model.sync="setCondition.condition", :placeholder="renderData.pleaseSelect", valueKey="key")
          el-option(v-for="(field, idx) in allDataSource", :key="idx", :label="field.label", :value="field")
    template(slot="footer")
      b-button(@click="visible.dialog=null") {{renderData.cancel}}
      b-button(@click="setConditionFun", type="primary") {{renderData.confirm}}
</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BSelect from 'components/BSelect'
  //  import service from '../service'
  import { validator } from 'common/js/Utils'

  export default {
    name: 'add-condition',
    data () {
      var _this = this
      return {
        fieldList: [],
        setCondition: {
          condition: {}
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
      setConditionFun () {
        console.log('setConditionFun')
        var parent = this.currRow.stepInfo.currParent
        !parent.condition && this.$set(parent, 'condition', [])
        parent.condition.push(this.setCondition.condition)
        this.visible.dialog = null
      }
    },
    mounted () {
      var parent = this.currRow.stepInfo.currParent
      this.allDataSource = parent.allDataSource
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
  .add-condition {
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
