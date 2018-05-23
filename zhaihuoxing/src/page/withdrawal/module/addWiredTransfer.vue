<template lang="pug">
  .addWiredTransfer
    b-dialog.add-dialog(:show.sync='dialogVisible', :title="renderData.editorCard", :show-close="true")
      el-form(:model="WiredTransferCard", :rules="WiredTransferCardRules", ref="WiredTransferCard", label-width="140" label-position='left')
        el-form-item(:label="renderData.internationalAccountNo", prop="cardNo")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.cardNo")
        el-form-item(:label="renderData.name", prop="name")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.name")
        el-form-item(:label="renderData.bankName", prop="bankName")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.bankName")
        el-form-item(label="Swift code", prop="swiftcode")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.swiftcode")
        el-form-item(:label="renderData.bankBranch", prop="bankBranch")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.bankBranch")
        el-form-item(:label="renderData.bankAddress", prop="bankAddress")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.bankAddress")
        el-form-item(:label="renderData.phoneNo", prop="phoneNo")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.phoneNo")
        el-form-item(:label="renderData.email", prop="email")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.email")
        el-form-item(:label="renderData.address", prop="address")
          b-input(:placeholder="renderData.pleaseEnter", :model.sync="WiredTransferCard.address")
      template(slot="footer")
        b-button(@click="goback('WiredTransferCard')") {{renderData.cancel}}
        b-button(@click="confirmAdd('WiredTransferCard')", type="primary") {{renderData.confirm}}
    b-dialog.delete_dialog(:show.sync='dialogVisible1', :title="renderData.deleteCard", :show-close="true", width="35%")
      .dialog_left
        b-icon.theme-color-F.dialog_icon(icon-name='attention', size="30px")
      .dialog_right
        span.theme-color-C {{renderData.deleteCardText}}
      template(slot="footer")
        b-button(@click="dialogVisible1 = false") {{renderData.cancel}}
        b-button(@click="confirmDelete", type="primary") {{renderData.confirm}}
    .list
      .add
        span {{renderData.cardManagement}}
        .addCard.theme-color-lightenC32(v-if="cards.wiredTransfer.length===0")
          span {{renderData.noCardPleaseAdd}}
      .list_card
        .form-detail.theme-border-D(v-for="(card,idx) in cards.wiredTransfer")
          .list_form
            el-form(label-width="130" label-position='left')
              el-form-item(:label="renderData.internationalAccountNo" class="is-required", :title="renderData.internationalAccountNo")
                p(v-text="card.cardNo.substr(0,4)+'******'+card.cardNo.substr(-4)")
              el-form-item(class="is-required")
                template(slot="label")
                  span.theme-color-C(v-text="renderData.name")
                  b-icon.tooltip-icon.theme-color-A-hover.theme-color-lightenD10.role-icon(iconName='info', :title="renderData.nameInfo")
                p(v-text="card.name")
              el-form-item(:label="renderData.bankName" class="is-required")
                p(v-text="card.bankName")
              el-form-item(label="Swift Code" class="is-required")
                p(v-text="card.swiftcode")
              el-form-item(:label="renderData.bankBranch" class="is-required")
                p(v-text="card.bankBranch")
              el-form-item(:label="renderData.bankAddress" class="is-required")
                p(v-text="card.bankAddress")
              el-form-item(class="is-required")
                template(slot="label")
                  span.theme-color-C(v-text="renderData.phoneNo")
                  b-icon.tooltip-icon.theme-color-A-hover.theme-color-lightenD10.role-icon(iconName='info', :title="renderData.phoneNoInfo")
                p(v-text="card.phoneNo")
              el-form-item(class="is-required")
                template(slot="label")
                  span.theme-color-C(v-text="renderData.email")
                  b-icon.tooltip-icon.theme-color-A-hover.theme-color-lightenD10.role-icon(iconName='info', :title="renderData.emailInfo")
                p(v-text="card.email")
              el-form-item(class="is-required")
                template(slot="label")
                  span.theme-color-C(v-text="renderData.address")
                  b-icon.tooltip-icon.theme-color-A-hover.theme-color-lightenD10.role-icon(iconName='info', :title="renderData.AddressInfo")
                p(v-text="card.address")
          .box-footer
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="delete1", @click="deleteI(card.bankcard_id)")
            b-icon.theme-color-darkenC15.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="edit", @click="edit(card)")
    .footer.theme-border-D
      b-button(@click="back") {{renderData.back}}
      b-button(type="primary", @click="add") {{renderData.addCard}}

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
    name: 'addWiredTransfer',
    data () {
      var _this = this
      return {
        isEdit: true,
        thisCard: {},
        thisUid: '',
        dialogVisible: false,
        dialogVisible1: false,
        cards: {},
        WiredTransferCard: {
          cardNo: '',
          name: '',
          bankName: '',
          swiftcode: '',
          bankBranch: '',
          bankAddress: '',
          phoneNo: '',
          email: '',
          address: ''
        },
        WiredTransferCardRules: {
          cardNo: [{required: true, message: _this.renderData.pleaseEnterRightCardNo, trigger: 'blur'},
            {
              regex: utils.constants.onlyNumber,
              message: _this.renderData.pleaseEnterRightCardNo,
              validator: utils.validator.validate,
              trigger: 'blur'
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
              trigger: 'blur'
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
              trigger: 'blur'
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
          swiftcode: [
            {
              required: true,
              message: _this.renderData.pleaseEnter,
              trigger: 'blur'
            },
            {
              regex: utils.constants.text0To10000Limit,
              message: _this.renderData.textLength1000,
              validator: utils.validator.validate,
              trigger: 'blur'
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
              trigger: 'blur'
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
          bankAddress: [{required: true, message: _this.renderData.pleaseEnterBankAddress, trigger: 'blur'}],
          phoneNo: [
            {
              required: true,
              message: _this.renderData.pleaseEnterPhoneNo,
              trigger: 'blur'
            },
            {
              regex: utils.constants.phoneReg,
              message: _this.renderData.textLength32,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.phoneReg,
              message: _this.renderData.phoneNoInfo,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          email: [
            {
              required: true,
              message: _this.renderData.pleaseEnterEmail,
              trigger: 'blur'
            },
            {
              validator: utils.validator.validate,
              test (val) {
                return val.trim() === val
              },
              message: _this.renderData.noSpace,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length48Limit,
              message: _this.renderData.textLength48,
              validator: utils.validator.validate,
              trigger: 'blur'
            },
            {
              regex: utils.constants.emailReg,
              message: _this.renderData.emailInfo,
              validator: utils.validator.validate,
              trigger: 'blur'
            }
          ],
          address: [
            {
              required: true,
              message: _this.renderData.pleaseEnterAddress,
              trigger: 'blur'
            },
            {
              regex: utils.constants.length96Limit,
              message: _this.renderData.textLength96,
              validator: utils.validator.validate,
              trigger: 'blur'
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
        }
      }
    },
    methods: {
      goback (unionpayCard) {
        this.$refs[unionpayCard].clearValidate()
        this.dialogVisible = false
      },
      confirmAdd (WiredTransferCard) {
        this.$refs[WiredTransferCard].validate((valid) => {
          if (valid) {
            this.dialogVisible = false
            if (this.isEdit) {
              var params = {
                name: 'wiredTransfer',
                data: this.WiredTransferCard
              }
              service.addBankcard(params).then(data => {
                console.log(data)
                service.getCardlist({}).then(data => {
                  console.log(data)
                  this.cards = data
                })
              })
            } else {
              delete this.WiredTransferCard.bankcard_id
              var params1 = {
                bankcard_id: this.thisUid,
                data: this.WiredTransferCard
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
      },
      edit (card) {
        this.dialogVisible = true
        this.isEdit = false
        this.dialogVisible = true
        var thisCard = Object.assign({}, card)
        this.thisUid = card.bankcard_id
        this.WiredTransferCard = thisCard
      },
      add () {
        this.dialogVisible = true
        this.isEdit = true
        this.dialogVisible = true
        for (var key in this.WiredTransferCard) {
          this.WiredTransferCard[key] = ''
        }
      },
      back () {
        this.$emit('back')
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

<style lang="less">
  .addWiredTransfer {
    position: relative;
    height: 85%;
    .add{
      font-size: 14px;
      .addCard{
        margin-top: 16px;
        font-size: 14px;
      }
    }
    .delete_dialog{
      .dialog_left{
        float: left;
        margin-right: 30px;
      }
    }
    .line {
      height: 1px;
      width: 100%;
      background: #cccccc;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    .el-icon-delete {
      font-size: 22px;
      margin-left: 600px;
    }
    .el-icon-edit {
      font-size: 22px;
      margin-left: 22px;
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
        .el-form-item__label{
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
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
    .footer {
      margin-top: 20px;
      border-top: 1px solid;
      button{
        margin-top: 20px;
        margin-bottom: 30px;
      }
    }
  }
</style>
