<template lang="pug">
  .addUnionpay
    b-dialog.add-dialog(:show.sync='dialogVisible', :title="renderData.editorCard", :show-close="true")
      el-form(:model="unionpayCard", :rules="unionpayCardRules", ref="unionpayCard", label-width="130" label-position='left')
        el-form-item(:label="renderData.name", prop="name")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="unionpayCard.name")
        el-form-item(:label="renderData.bankName", prop="bankName")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="unionpayCard.bankName")
        el-form-item(:label="renderData.bankBranch", prop="bankBranch")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="unionpayCard.bankBranch")
        el-form-item(:label="renderData.cardNo", prop="cardNo")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="unionpayCard.cardNo")
        el-form-item(:label="renderData.bankProvince", prop="bankProvince")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="unionpayCard.bankProvince")
        el-form-item(:label="renderData.bankCity", prop="bankCity")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="unionpayCard.bankCity")
      template(slot="footer")
        b-button(@click="goback('unionpayCard')") {{renderData.cancel}}
        b-button(@click="confirmAdd('unionpayCard')", type="primary") {{renderData.confirm}}
    b-dialog.delete_dialog(:show.sync='dialogVisible1', :title="renderData.deleteCard", :show-close="true", width="35%")
      .dialog_left
        b-icon.theme-color-F.dialog_icon(icon-name='attention', size="30px")
      .dialog_right
        span {{renderData.deleteCardText}}
      template(slot="footer")
        b-button(@click="dialogVisible1 = false") {{renderData.cancel}}
        b-button(@click="confirmDelete", type="primary") {{renderData.confirm}}
    .list
      .add
        span {{renderData.cardManagement}}
        .addCard.theme-color-lightC32(v-if="cards.unionPay.length === 0")
          span {{renderData.noCardPleaseAdd}}
      .list_card
        .form-detail.theme-border-D(v-for="(card,idx) in cards.unionPay")
          .list_form
            el-form(label-width="130" label-position='left')
              el-form-item(:label="renderData.name" class="is-required")
                p(v-text="card.name")
              el-form-item(:label="renderData.bankName" class="is-required")
                p(v-text="card.bankName")
              el-form-item(:label="renderData.bankBranch" class="is-required")
                p(v-text="card.bankBranch")
              el-form-item(:label="renderData.cardNo" class="is-required")
                p(v-text="card.cardNo.substr(0,4)+'******'+card.cardNo.substr(-4)")
              el-form-item(:label="renderData.bankProvince" class="is-required")
                p(v-text="card.bankProvince")
              el-form-item(:label="renderData.bankCity" class="is-required")
                p(v-text="card.bankCity")
          .box-footer
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deleteI(card.bankcard_id)")
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="edit(card)")
      .footer.theme-border-D
        b-button(@click="back") {{renderData.back}}
        b-button(type="primary", @click="add('unionpayCard')") {{renderData.addCard}}


</template>

<script>
  import BDialog from 'components/BDialog'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BSelect from 'components/BSelect'
  import BCheckbox from 'components/BCheckbox'
  import service from '../service'
  import utils from 'common/js/Utils'
  export default {
    name: 'addUnionpay',
    data () {
      var _this = this
      return {
        isEdit: true,
        thisCard: {},
        thisUid: '',
        dialogVisible: false,
        dialogVisible1: false,
        unionpayCard: {
          name: '',
          bankName: '',
          bankBranch: '',
          cardNo: '',
          bankProvince: '',
          bankCity: ''
        },
        unionpayCardRules: {
          cardNo: [{required: true, message: _this.renderData.pleaseEnterRightCardNo, trigger: 'blur'},
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.onlyNumber,
              message: _this.renderData.pleaseEnterRightCardNo,
              validator: utils.validator.validate,
              trigger: 'blur'
            }],
          name: [
            {
              required: true,
              message: _this.renderData.nameInfo,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To128Limit,
              message: _this.renderData.textLength128,
              validator: utils.validator.validate,
              trigger: 'change'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankName: [
            {
              required: true,
              message: _this.renderData.pleaseEnterBankName,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'change'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankBranch: [
            {
              required: true,
              message: _this.renderData.pleaseEnterBankBranch,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'change'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankProvince: [
            {
              required: true,
              message: _this.renderData.pleaseEnterBankProvince,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'change'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ],
          bankCity: [
            {
              required: true,
              message: _this.renderData.pleaseEnterBankCity,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'change'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            }
          ]
        },
        cards: {}
      }
    },
    methods: {
      goback (unionpayCard) {
        this.$refs[unionpayCard].clearValidate()
        this.dialogVisible = false
      },
      back () {
        this.$emit('back')
      },
      add () {
        this.isEdit = true
        this.dialogVisible = true
        for (var key in this.unionpayCard) {
          this.unionpayCard[key] = ''
        }
      },
      confirmAdd (unionpayCard) {
        this.$refs[unionpayCard].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.isEdit) {
              var params = {
                name: 'unionPay',
                data: this.unionpayCard
              }
              service.addBankcard(params).then(data => {
                console.log(data)
                service.getCardlist({}).then(data => {
                  console.log(data)
                  this.cards = data
                })
              })
            } else {
              delete this.unionpayCard.bankcard_id
              var params1 = {
                bankcard_id: this.thisUid,
                data: this.unionpayCard
              }
              service.editCardlist(params1).then(data => {
                console.log(data)
                service.getCardlist({}).then(data => {
                  console.log(data)
                  this.cards = data
                })
              })
            }
          } else {
            return false
          }
        })
      },
      confirmDelete () {
        this.dialogVisible1 = false
        var params = {bankcard_id: this.thisUid}
        service.deleteCardlist(params).then(data => {
          console.log(data)
          service.getCardlist({}).then(data => {
            console.log(data)
            this.cards = data
          })
        })
      },
      deleteI (uid) {
        this.dialogVisible1 = true
        this.thisUid = uid
        console.log(111111111111111)
        console.log(this.thisUid)
      },
      edit (card) {
        this.isEdit = false
        this.dialogVisible = true
//        this.thisCard = card
        var thisCard = Object.assign({}, card)
        this.thisUid = card.bankcard_id
        this.unionpayCard = thisCard
      }
    },
    async mounted () {
      service.getCardlist({}).then(data => {
        console.log(data)
        this.cards = data
      })
    },
    props: {
      renderData: {
        type: Object,
        required: true
      }
    },
    components: {
      BDialog,
      BInput,
      BIcon,
      BButton,
      BSelect,
      BCheckbox,
      utils
    }
  }
</script>

<style lang="less" scoped>
  .addUnionpay {
    position: relative;
    height: 85%;
    .add{
      font-size: 14px;
      .addCard{
        margin-top: 16px;
        font-size: 14px;
      }
    }
    .line {
      height: 1px;
      width: 100%;
      background: #cccccc;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    .delete_dialog{
      .dialog_left{
        float: left;
        margin-right: 30px;
      }
    }
    .list{
      display: flex;
      flex-direction: column;
      min-height: 80%;
      .add{
        margin-bottom: 10px;
      }
      .list_card{
        flex: 1;
        overflow: auto;
        min-height: 80%;
      }
    }
    .form-detail{
      margin-top: 20px;
      display: inline-block;
      width: 48%;
      margin-left: 1.2%;
      margin-bottom: 25px;
      border-radius: 4px;
      border: 1px solid;
      .list_form {
        padding: 25px 4% 30px;
      }
      .box-footer{
        padding: 0 5% 25px;
        text-align: right;
        .icon-margin-right{
          margin-right: 4%;
        }
        .b-icon{
          margin-left: 4%;
          margin-bottom: 25px;
          font-size: 22px;
          cursor: pointer;
        }
      }
    }
    .el-icon-delete {
      font-size: 22px;
      margin-left: 600px;
    }
    .el-icon-edit {
      font-size: 22px;
      margin-left: 22px;
    }
    .footer {
        margin-top: 20px;
        border-top: 1px solid;
        button{
          margin-top: 2.1%;
          margin-bottom: 30px;
        }
      }
  }
</style>
