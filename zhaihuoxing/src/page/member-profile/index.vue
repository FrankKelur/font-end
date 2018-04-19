<template lang="pug">
  .member-profile.clear-float
    b-title(url="/static/images/members-net.png", :title="renderData.memberProfile")
    .content.clear-float
      .invite-code
        .card-title
          b-icon(url="/static/images/vcode.png")
          span {{renderData.inviteCode}}
        .card-content.clear-float
          .qr-code
            canvas#qrcode
          .invite-code-item
            .label
              span {{renderData.inviteCode}}
              span.link.copy-code.pointer(data-clipboard-target="#vcode" data-clipboard-action="copy") {{renderData.copy}}
            .form-item
              b-input.scrollable-text(v-model="detail.refer_code", :disabled="true")
              div#vcode.size0 {{detail.refer_code}}
          .invite-url
            .label
              span {{renderData.inviteLink}}
              span.link.copy-url.pointer(data-clipboard-target="#invite-link" data-clipboard-action="copy") {{renderData.copy}}
            .form-item
              b-input(v-model="invite_url", :disabled="true")
              div#invite-link.size0 {{invite_url}}
      .profile
        .card-title
          b-icon(url="/static/images/team.png")
          span {{renderData.profile}}
        .card-content
          ul
            li
              span.label {{renderData.teamAmount}}
              span.text {{detail.total_member  + '(' + 'PIB:' + detail.PIB + ' MIB:' + detail.MIB + ' IB:' + detail.IB + ')'}}
            li
              span.label {{renderData.teamTradeAccountAmount}}
              span.text {{detail.total_volume}}
            li
              span.label {{renderData.teamInsuranceAccountAmount}}
              span.text {{'$' + detail.total_Bdeposit}}
            li
              span.label {{renderData.personalInsuranceAccountAmount}}
              span.text {{'$' + detail.self_Bdeposit}}
            li
              span.label {{renderData.firstInsuranceAccountAmount}}
              span.text {{'$' + detail.Bdeposit1}}
            li
              span.label {{renderData.newValidMembers}}
              span.text {{detail.self_member }}

      .layout
        .card-title
          b-icon(url="/static/images/layers.png")
          span {{renderData.layout}}
        .card-content
          .table
            el-row.row(v-for="(item,idx) in layout_list", :key="idx")
              .td.sm-full {{renderData['level'+(idx+1)]}}
              .td.sm-full
                .item
                  .label {{renderData.totalAmount}}
                  .text(v-if="idx===0") {{item.member  + '(' + 'PIB:' + item.PIB  + ' MIB:' + item.MIB  + ' IB:' + item.IB  + ')'}}
                  .text(v-else) {{item.member }}
                .item
                  .label {{renderData.tradeAmount}}
                  .text {{item.volume}}
                .item
                  .label {{renderData.insuranceAmount}}
                  .text {{'$' + item.Bdeposit}}
</template>

<script>
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BTitle from 'components/BTitle'
  import ClipboardJS from 'clipboard'
  import QRCode from 'qrcode'
  import renderData from './lang.js'
  import service from './service.js'

  export default {
    name: 'member-profile',
    data () {
      return {
        detail: {
          refer_code: '',
          total_member: '',
          PIB: '',
          MIB: '',
          IB: '',
          self_member: '',
          total_volume: '',
          self_Bdeposit: '',
          Bdeposit1: '',
          total_Bdeposit: ''
        },
        invite_url: '',
        layout_list: [],
        renderData: renderData
      }
    },
    methods: {
      getMemberDetail () {
        return service.getMemberDetail().then(res => {
          this.detail = res.data
          this.invite_url = location.protocol + '//' + location.host + '/pages/signup?refer_code=' + this.detail.refer_code
        })
      },
      getMemberLayout () {
        return service.getMemberLayout().then(({data}) => {
          this.layout_list = [
            {
              'Bdeposit': data.Bdeposit1,
              'volume': data.volume1,
              'member': data.member1,
              'PIB': data.PIB1,
              'MIB': data.MIB1,
              'IB': data.IB1
            },
            {
              'Bdeposit': data.Bdeposit2,
              'volume': data.volume2,
              'member': data.member2
            },
            {
              'Bdeposit': data.Bdeposit3,
              'volume': data.volume3,
              'member': data.member3
            },
            {
              'Bdeposit': data.Bdeposit4,
              'volume': data.volume4,
              'member': data.member4
            },
            {
              'Bdeposit': data.Bdeposit5,
              'volume': data.volume5,
              'member': data.member5
            }
          ]
        })
      }
    },
    async mounted () {
      await this.getMemberDetail()
      await this.getMemberLayout()
      var copyInviteUrl = new ClipboardJS('.copy-url')
      var copyInviteCode = new ClipboardJS('.copy-code')
      console.log('copyInviteUrl, copyInviteCode ', copyInviteUrl, copyInviteCode)
      var qrcode = document.getElementById('qrcode')
      QRCode.toCanvas(qrcode, this.invite_url, err => {
        console.log('to canvas error', err)
      })
    },
    components: {
      BIcon,
      BTitle,
      BInput
    }
  }
</script>

<style lang="less">
  @import url('../../common/styleSheet/variable');

  .member-profile {
    background-color: white;
    .size0 {
      font-size: 0;
    }
    .content {
      padding: 0 1% 20px 1%;
    }
    .invite-code {
      padding-top: 20px;
      .invite-code-item, .invite-url {
        margin: 20px 0;
        .label {
          line-height: 20px;
          span:first-child {
            float: left;
          }
          span:last-child {
            float: right;
          }
        }
      }
      .card-content {
        padding: 10px 20px;
      }
    }
    .profile {
      padding-top: 20px;
      ul {
        list-style-type: disc;
        list-style-position: inside;
        li {
          line-height: 30px;
          span.label:after {
            content: ': ';
            white-space: pre;
          }
        }
        li:nth-child(3) {
          margin-bottom: 15px;
        }
      }
      .card-content {
        padding: 10px 20px;
      }
    }
    .layout {
      padding-top: 20px;
      color: @text;
      .card-content {
        padding: 20px;
      }
      .table {
        border: 1px solid @primary;
        box-shadow: 0 0 3px 0 @primary;
        border-radius: 4px;
        .row:nth-child(odd) {
          background: fade(@primary, 15%);
          border: 1px solid @primary;
          border-left-width: 0;
          border-right-width: 0;
        }
        .row:first-child {
          border-top-width: 0;
        }
        .row:last-child {
          border-bottom-width: 0;
        }
        .td {
          padding: 15px;
          .item {
            line-height: 22px;
            .label:after {
              content: ': ';
              white-space: pre;
            }
          }
          .item .label, .item .text {
            display: inline-block;
          }
          &:nth-child(1) {
            width: 22%;
          }
          &:nth-child(2) {
            width: 78%;
          }
        }
      }
    }
    .card-content {
      border: 1px solid @primary;
      border-radius: 4px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
    .card-title {
      font-size: 18px;
      color: #FFFFFF;
      background-color: @primary;
      line-height: 45px;
      height: 45px;
      padding-left: 20px;
      border-radius: 4px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      span {
        margin-left: 15px;
      }
      .b-icon {
        padding-top: 5px;
      }
    }
  }

  @media screen and (min-width: 1024px) {
    .member-profile {
      .invite-code {
        margin-left: 1%;
        float: right;
        width: 30%;
        .card-content {
          height: 810px;
        }
        .qr-code {
          width: 100%;
          text-align: center;
          margin: 30px auto;
        }
        .invite-code-item, .invite-url {
          width: 100%;
        }
      }
      .profile, .layout {
        float: left;
        width: 68%;
      }
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .member-profile {
      .invite-code, .profile, .layout {
        float: left;
        width: 100%;
        .qr-code {
          width: 30%;
          float: left;
        }
        .invite-code-item, .invite-url {
          width: 68%;
          float: right;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .invite-code, .profile, .layout {
      float: left;
      width: 100%;
      .qr-code {
        width: 30%;
        float: left;
        #qrcode {
          width: 120px!important;
          height: 120px!important;
          margin-top: 40px;
        }
      }
      .invite-code-item, .invite-url {
        width: 50%;
        float: right;
      }
    }
  }
</style>
