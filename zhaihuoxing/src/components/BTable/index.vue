<template lang="pug">
  .b-table(v-cloak='')
    el-table(:data="tableData" style="width:100%", @row-click='handleRowClick', v-loading="loading", @sort-change="sortChange", max-height="445", :row-class-name="getRowClass", ref="bTable", @selection-change="selectionChange").theme-border-lightenD12
      el-table-column(type="expand" v-if="tableType.expand && computedHeaderCols.length!==0")
        template(slot-scope="scope")
          slot(name="expand", :computedHeaderCols="computedHeaderCols", :otherCols="otherCols", :computedOpts="computedOpts", :row="scope.row", :operateOpts="renderData.operateOpts")
      el-table-column(type="selection", width="55" v-if="renderData.multipleSelect")
      el-table-column(:label='col.label', :render-header="headerRenderFun", v-for="col in computedHeaderCols", :key='col.field', :sortable="col.sortable", :prop="col.field", :formatter="formatter(col)")

      el-table-column.el-table-scroll(:label="renderData.more" v-if="otherCols.length")
        template(slot-scope="scope")
          el-popover.theme-border-lightenD12.theme-color-H(trigger="click" placement="bottom" ref="popoverMore")
            .el-popover-item-intable(v-for="(col, idx) in otherCols", :key="idx")
              template(v-if="!col.isGroup")
                .left(v-text='col.label' v-ellipsis-title="")
                .right(v-text='getLabel(scope.row[col.field])' v-ellipsis-title="")
              template(v-else)
                .title.theme-color-D {{col.label}}
                .line-item(v-for="(item, key) in scope.row[col.field]", :key="key")
                  .left(v-text='col.fieldTextMap[key]||key' v-ellipsis-title="")
                  .right(v-text='getLabel(item, key)' v-ellipsis-title="")
            b-icon.pointer.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(iconName="more", slot="reference")

      el-table-column(:label="renderData.operation" align='center' v-if="renderData.operateOpts && renderData.operateOpts.length")
        template(slot-scope="scope")
          a.link.theme-color-A.pointer(v-if="computedOpts.length==1", @click="handleCommand(computedOpts[0].auth, scope.row)") {{computedOpts[0].label}}
          el-dropdown.theme-color-lightenC32.theme-color-lightenA10-hover.theme-color-darkenA10-active(@command="handleCommand" trigger='click', v-if="computedOpts.length > 1")
            span.el-dropdown-link
              b-icon.pointer(iconName="operation")
            el-dropdown-menu.ipt-class.theme-bg-H.theme-border-lightenD12(slot="dropdown")
              el-dropdown-item.theme-bg-lightenD12-hover.theme-color-C.theme-color-C-hover(:command='op.auth' v-for="op in computedOpts" v-text="op.label", :key='op.auth', :disabled="op.authStatus==='disabled'")

    .batch-operate(v-if="renderData.multipleSelect")
      slot(name="batchOperate", :total="pagination.total")
    .pagination
      b-pagination(v-if="!!pagination.total", @size-change="handleSizeChange", @current-change='handleCurrentChange', :layout="layout", :pagination="pagination")
</template>

<script>
  import utils from 'common/js/Utils'
  import BIcon from 'components/BIcon'
  import BTooltip from 'components/BTooltip'
  import BPagination from 'components/BPagination'
  import 'common/js/init'
  import styleMixinLess from '!raw-loader!./styleMixin.less'
  import styleMixin from 'common/js/maxin/styleMixin'

  var mock = {
    '/api/resource/audit_setting/get_audit_setting_user_list': [
      {
        'uuid': '10001',
        'user_name': 'zhaipengchao',
        'email': 'zhai@kelur.com',
        'user_type': '公司用户',
        'user_group': 'group1',
        'role': '角色1',
        'ctime': '02-13-2017 11:12',
        'status': '已激活'
      },
      {
        'uuid': '10002',
        'user_name': 'frank',
        'email': 'frank@kelur.com',
        'user_type': '个人用户',
        'user_group': 'group1',
        'role': '角色1',
        'ctime': '02-13-2017 11:12',
        'status': '已激活'
      }
    ],
    '/api/rbac/user/get_user_list': [ // z delete
      {
        'rid': '243343423432432424234234', // string 角色id
        'role_name': 'role1', // string 角色名称
        'create_time': '02-13-2017 11:12', // string 创建时间
        'creator': 'boss', // string 创建人
        'from_where': 'group1', // string 权限归属
        'edit_time': '02-13-2017 11:12', // string 最新修改时间
        'seniro_role': [
          'role1',
          'role2'
        ], // array<string> 高级角色
        'basic_role': [
          'role1',
          'role2'
        ], // array<string> 基础角色
        'conflic_role': [
          'role1',
          'role2'
        ] // array<string> 互斥角色
      }
    ],
    '/api/rbac/role/get_role_list': [
      {
        'rid': '243343423432432424234234', // string 角色id
        'role_name': 'role1', // string 角色名称
        'create_time': '02-13-2017 11:12', // string 创建时间
        'creator': 'boss', // string 创建人
        'from_where': 'group1', // string 权限归属
        'edit_time': '02-13-2017 11:12', // string 最新修改时间
        'seniro_role': [
          'role1',
          'role2'
        ], // array<string> 高级角色
        'basic_role': [
          'role1',
          'role2'
        ], // array<string> 基础角色
        'conflic_role': [
          'role1',
          'role2'
        ] // array<string> 互斥角色
      }
    ],
    '/api/resource/audit_process/get_audit_list': [
      {
        'task_id': '243343423432432424234234',
        'user_name': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'audit_progress': {
          label: '信息核查',
          val: '1'
        },
        'others': {
          order_ref: '0001',
          trade_system: 'MI4',
          account: '10101220',
          method: '银联',
          amount: '1000'
        },
        'priority': {
          label: 'high',
          val: '1'
        }
      },
      {
        'task_id': '243343423432432424234234',
        'user_name': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'audit_progress': {
          label: '信息核查',
          val: '1'
        },
        'others': {
          order_ref: '0002',
          trade_system: 'MI4',
          account: '10101220',
          method: '银联',
          amount: '1000'
        },
        'priority': {
          label: 'high',
          val: '1'
        }
      },
      {
        'task_id': '243343423432432424234234',
        'user_name': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'audit_progress': {
          label: '信息核查',
          val: '1'
        },
        'others': {
          order_ref: '0003',
          trade_system: 'MI4',
          account: '10101220',
          method: '银联',
          amount: '1000'
        },
        'priority': {
          label: 'high',
          val: '1'
        }
      }
    ],
    '/api/resource/audit_history/get_audit_list': [
      {
        'task_id': '243343423432432424234234',
        'user_name': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'finished_time': '02-13-2017 11:12',
        'audit_result': '成功',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'progress_id': {
          label: '信息核查',
          val: '1'
        },
        'others': {
          order_ref: '0001',
          trade_system: 'MI4',
          account: '10101220',
          method: '银联',
          amount: '1000'
        },
        'priority': {
          label: 'high',
          val: '1'
        },
        brother: [
          {
            'task_id': '223343',
            'user_name': 'zhai',
            'apply_time': '02-13-2017 11:12',
            'audit_user': 'pengchao',
            'finished_time': '02-13-2017 11:12',
            'audit_result': '成功',
            'audit_status': {
              label: '待处理',
              val: 'pending'
            },
            'audit_progress': {
              label: '信息核查',
              val: '1'
            },
            'others': {
              order_ref: '0002',
              trade_system: 'MI4',
              account: '10101220',
              method: '银联',
              amount: '1000'
            },
            'priority': {
              label: 'high',
              val: '1'
            }
          },
          {
            'task_id': '11111',
            'user_name': 'zhai',
            'apply_time': '02-13-2017 11:12',
            'audit_user': 'pengchao',
            'finished_time': '02-13-2017 11:12',
            'audit_result': '成功',
            'audit_status': {
              label: '待处理',
              val: 'pending'
            },
            'audit_progress': {
              label: '信息核查',
              val: '1'
            },
            'others': {
              order_ref: '0002',
              trade_system: 'MI4',
              account: '10101220',
              method: '银联',
              amount: '1000'
            },
            'priority': {
              label: 'high',
              val: '1'
            }
          }
        ]
      },
      {
        'task_id': '243343423432432424234234',
        'user_name': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'progress_id': {
          label: '信息核查',
          val: '1'
        },
        'others': {
          order_ref: '0002',
          trade_system: 'MI4',
          account: '10101220',
          method: '银联',
          amount: '1000'
        },
        'priority': {
          label: 'high',
          val: '1'
        }
      },
      {
        'task_id': '243343423432432424234234',
        'user_name': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'progress_id': {
          label: '信息核查',
          val: '1'
        },
        'others': {
          order_ref: '0003',
          trade_system: 'MI4',
          account: '10101220',
          method: '银联',
          amount: '1000'
        },
        'priority': {
          label: 'high',
          val: '1'
        }
      }
    ],
    '/api/audit_process/get_audit_history': [
      {
        'task_id': '243343423432432424234234',
        'username': 'zhai',
        'apply_time': '02-13-2017 11:12',
        'audit_user': 'pengchao',
        'audit_status': {
          label: '待处理',
          val: 'pending'
        },
        'audit_progress': {
          label: '信息核查',
          val: '1'
        },
        'audit_result': { // 让彬哥改另外两张表的接口
          label: '其他',
          val: 'other'
        },
        'priority': {
          label: 'high',
          val: 'high'
        }
      }
    ],
    '/api/resource/audit_setting/get_audit_setting_list': [
      {
        'uuid': '123123123',
        'name': 'withdraw', // 唯一名
        'label': '出金审核', // 审核名称
        'audit_type': '系统', // 0 system  1 custom
        'task_number': '10',
        'ctime': '2016-1-1 10:00:00',
        'status': '启用',
        'description': '收款及获取电汇单',
        'condition': `单选框：备选项1，备选项2
            日期区间：大于5天
            数字输入框：大于5天`
      },
      {
        'uuid': '2222',
        'name': 'withdraw', // 唯一名
        'label': '入金审核', // 审核名称
        'audit_type': '系统', // 0 system  1 custom
        'task_number': '10',
        'ctime': '2016-1-1 10:00:00',
        'status': '启用',
        'description': '收款及获取电汇单',
        'condition': `单选框：备选项1，备选项2
            日期区间：大于5天
            数字输入框：大于5天`
      }
    ]
  }
  export default {
    name: 'b-table',
    mixins: [styleMixin],
    data () {
      return {
        loading: false,
        currRow: {},
        styleMixinLess: styleMixinLess,
        tableData: []
      }
    },
    props: {
      uid: {
        type: String
      },
      getRowClass: {
        type: Function,
        default: function () {
          return function ({row, rowIndex}) {
            return ''
          }
        }
      },
      optsFilter: {
        type: Function
      },
      params: {
        type: Object,
        default: function () {
          return {}
        }
      },
      url: {
        type: String,
        required: true
      },
      parentModel: {
        type: Object,
        default: function () {
          return {}
        }
      },
      pagination: {
        type: Object,
        default: function () {
          var vm = this
          return {
            currPage: 1,
            pageSizes: utils.constants.pages,
            pageSize: utils.constants.pages[0],
            total: 0,
            target_uid: vm.uid
          }
        }
      },
      optHandler: {
        type: Object
      },
      renderData: {
        type: Object,
        required: true
      },
      searchData: {
        type: Object,
        default: function () {
          return {}
        }
      },
      valueKey: {
        type: String
      },
      selectedRows: {
        type: Array
      },
      tableType: {
        type: Object,
        default: function () {
          return {}
        }
      },
      initSearch: {
        type: Object
      }
    },
    methods: {
      headerRenderFun (h, {column, $index}) {
        var col = this.computedHeaderCols[$index]
        var element = [h('span', {
          class: ['header-span'],
          directives: [{
            name: 'ellipsis-title',
            value: column.label
          }]
        }, column.label)]
        if (col && col.tooltip) {
          element.push(h(BTooltip, {
            class: ['item'],
            props: {content: col.tooltip, effect: 'dark', placement: 'top'}
          }, [
            h(BIcon, {
              class: ['header-icon', 'theme-color-darkenC15', 'theme-color-lightenA10-hover', 'theme-color-darkenA10-active', 'tabPopover1'],
              props: {iconName: 'info', size: '14px'}
            })]
          ))
        }
        return element
      },
      formatter (col) {
        var colWithFun = this.renderData.headerCols.find(elm => elm.field === col.field) // colWithFun 有 formatter
        var formatter = colWithFun.formatter
        var _this = this
        var h = _this.$createElement
        return function (row, column) {
          if (typeof formatter === 'function') {
            return formatter(row, column, _this.getLabel)
          }
          if (Array.isArray(row[column.property])) {
            return h('span', {
              class: ['table-cell'],
              directives: [{
                name: 'ellipsis-title',
                value: _this.showLabel(row[column.property])
              }]
            }, _this.showLabel(row[column.property]))
          }
          return h('span', {
            class: ['table-cell'],
            directives: [{
              name: 'ellipsis-title',
              value: _this.getLabel(row[column.property])
            }]
          }, _this.getLabel(row[column.property]))
        }
      },
      sortChange (col) {
        if (col.column.sortable === true) {
          return
        }
        var {prop, order} = col
        this.searchData.sort_by = {
          key: prop,
          val: order
        }
        this.refresh()
      },
      handleRowClick (row, event) {
        if (event.target.nodeName !== 'INPUT') {
          this.currRow = row
        }
      },
      getLabel (field) {
        if (typeof field === 'object') {
          return field.label
//          return field.label || '-'
        } else {
          return field
        }
      },
      handleCommand (command, row) {
        var renderData = Object.assign(this.renderData, this.renderData.operateOpts.find(opt => opt.auth === command)[command])
        console.log('command', command, renderData)
        console.log('this.currRow', this.currRow)
        this.optHandler[command](Object.keys(this.currRow).length ? this.currRow : row, renderData)
      },
      handleSizeChange () {
//        this.searchData = this.searchDataBak
        Object.assign(this.searchData, this.searchDataBak)
        this.refresh()
      },
      handleCurrentChange (page) {
        console.log('handleCurrentChange', page)
//        this.searchData = this.searchDataBak
        Object.assign(this.searchData, this.searchDataBak)
        this.refresh()
      },
      async refresh () {
        await this.getData()
        if (this.renderData.multipleSelect) {
          this.toggleSelectedRow(this.tableData)
        }
      },
      getData () {
        // 初始化查询参数
        for (let o in this.initSearch) {
          for (let k in this.searchData) {
            if (o === k) {
              if (this.searchData[k] === '') {
                this.searchData[k] = this.initSearch[o]
              }
              break
            }
          }
        }
        //  根据pagination.currPage, pagination.pageSize searchData 获取，数据
        this.loading = true
        var params = ''
        if (this.pagination.target_uid) {
          params = Object.assign({
            target_uid: this.pagination.target_uid,
            pageSize: this.pagination.pageSize,
            startNum: (this.pagination.currPage - 1) * this.pagination.pageSize
          }, this.params, this.searchData)
        } else {
          params = Object.assign({
            pageSize: this.pagination.pageSize,
            startNum: (this.pagination.currPage - 1) * this.pagination.pageSize
          }, this.params, this.searchData)
        }
        console.log('this.url, params', this.url, params)
        return utils.fetch(this.url, params).then(res => {
          console.log('getData res', res)
          if (this.url === '/api/resource/records/get_oss_record_list') {
            this.tableData = this.handleData(res.detail)
            console.log('OSS处理后的数据')
            console.log(this.tableData)
          } else {
            this.tableData = res.detail
          }
          if (this.url === '/api/resource/audit_setting/get_audit_setting_user_list') {
            this.tableData = mock[this.url]
          }
          if (this.url === 'sssssssssss') {
            this.tableData = [
              {
                'time': '2017-12-18 22:27:11', // 时间
                'account': 'root1', // 交易账号
                'method': '银联', // 入金方式
                'name': '阿斯达', // 姓名
                'others': {
                  'bank_name': '中国银行' // 银行名称
                },
                'status': {
                  'label': '已成功', // 三个 已成功 待审核 以失败 system 对应也是三个吧
                  'system': 0
                },
                'uid': '7a9b2194e3bc11e7b5c80050568bd791',
                'amount': '150', // 存入金额
                'actual_amount': '150', // 实入金额
                'currency': '$', // 货币
                'system': 'mt4' // 交易系统
              },
              {
                'time': '2017-12-18 22:27:11', // 时间
                'account': 'root1', // 交易账号
                'method': '银联', // 入金方式
                'name': '阿斯达', // 姓名
                'others': {
                  'bank_name': '中国行' // 银行名称
                },
                'status': {
                  'label': '已成功', // 三个 已成功 待审核 以失败 system 对应也是三个吧
                  'system': 0
                },
                'uid': '7a9b2194e3bc11e7b5c80050568bd791',
                'amount': '150', // 存入金额
                'actual_amount': '150', // 实入金额
                'currency': '$', // 货币
                'system': 'mt4' // 交易系统
              },
              {
                'time': '2017-12-18 22:27:11', // 时间
                'account': 'root1', // 交易账号
                'method': '银联', // 入金方式
                'name': '阿斯达', // 姓名
                'others': {
                  'bank_name': '中银行' // 银行名称
                },
                'status': {
                  'label': '已成功', // 三个 已成功 待审核 以失败 system 对应也是三个吧
                  'system': 0
                },
                'uid': '7a9b2194e3bc11e7b5c80050568bd791',
                'amount': '150', // 存入金额
                'actual_amount': '150', // 实入金额
                'currency': '$', // 货币
                'system': 'mt4' // 交易系统
              }
            ]
          }
          if (this.url === 'daimingchen') {
            this.tableData = [
              {
                'time': '2017-12-18 22:27:11', // 时间
                'account': 'root1', // 交易账号
                'method': '银联', // 入金方式
                'name': '阿斯达', // 姓名
                'others': {
                  'card_no': 'hjsdk',
                  'bank_name': '1rqwe',
                  'bank_branch': '23wer',
                  'bank_province': '23edfsa',
                  'bank_city': 'skdfh',
                  'internation_account': 'ajukhsdk',
                  'bank_address': 'kahsdkjf',
                  'swift_code': '43563',
                  'phone_no': '46745346',
                  'email': '42341112344',
                  'address': 'akjsdkj',
                  'message': 'sakjhjkdfh'
                },
                'status': {
                  'label': '已成功', // 三个 已成功 待审核 以失败 system 对应也是三个吧
                  'system': 0
                },
                'uid': '7a9b2194e3bc11e7b5c80050568bd791',
                'amount': '150', // 存入金额
                'currency': '$', // 货币
                'system': 'mt4' // 交易系统
              },
              {
                'time': '2017-12-18 22:27:11', // 时间
                'account': 'root1', // 交易账号
                'method': '银联', // 入金方式
                'name': '阿斯达', // 姓名
                'others': {
                  'card_no': 'hjsdk',
                  'bank_name': '1rqwe',
                  'bank_branch': '23wer',
                  'bank_province': '23edfsa',
                  'bank_city': 'skdfh',
                  'internation_account': 'ajukhsdk',
                  'bank_address': 'kahsdkjf',
                  'swift_code': '43563',
                  'phone_no': '46745346',
                  'email': '42341112344',
                  'address': 'akjsdkj',
                  'message': 'sakjhjkdfh'
                },
                'status': {
                  'label': '已成功', // 三个 已成功 待审核 以失败 system 对应也是三个吧
                  'system': 0
                },
                'uid': '7a9b2194e3bc11e7b5c80050568bd791',
                'amount': '150', // 存入金额
                'currency': '$', // 货币
                'system': 'mt4' // 交易系统
              },
              {
                'time': '2017-12-18 22:27:11', // 时间
                'account': 'root1', // 交易账号
                'method': '银联', // 入金方式
                'name': '阿斯达', // 姓名
                'others': {
                  'card_no': 'hjsdk',
                  'bank_name': '1rqwe',
                  'bank_branch': '23wer',
                  'bank_province': '23edfsa',
                  'bank_city': 'skdfh',
                  'internation_account': 'ajukhsdk',
                  'bank_address': 'kahsdkjf',
                  'swift_code': '43563',
                  'phone_no': '46745346',
                  'email': '42341112344',
                  'address': 'akjsdkj',
                  'message': 'sakjhjkdfh'
                },
                'status': {
                  'label': '已成功', // 三个 已成功 待审核 以失败 system 对应也是三个吧
                  'system': 0
                },
                'uid': '7a9b2194e3bc11e7b5c80050568bd791',
                'amount': '150', // 存入金额
                'currency': '$', // 货币
                'system': 'mt4' // 交易系统
              }
            ]
            this.pagination.total = this.tableData.length
            this.loading = false
            return
          }
          this.pagination.total = res.total_num || 0
          this.loading = false
        })
      },
      selectionChange (selectedRows) {
        var unSelectedRows = this.tableData.filter(row => !selectedRows.find(item => item[this.valueKey] === row[this.valueKey]))
        this.$emit('selection-change', selectedRows, unSelectedRows)
      },
      toggleSelectedRow (tableData) {
        tableData.forEach(row => {
          this.$refs['bTable'].toggleRowSelection(row, !!this.selectedRows.find(item => item.user_name === row.user_name))
        })
      },
      search () {
        this.pagination.currPage = 1
        this.searchDataBak = Object.assign({}, this.searchData)
        this.refresh()
      },
      showFile (item) {
        console.log(item)
//        window.open('http://www.baidu.com')
      },
      showLabel (data) {
        if (data.length < 2) {
          return data
        }
        var label = ''
        data.forEach(function (val, index) {
          label = label + val + ','
        })
        return label.slice(0, label.length - 1)
      },
      handleData (data) {
        for (let i = 0; i < data.length; i++) {
          data[i].brother = []
          if (data[i].resource_field.length > 1) {
            var allFieldArr = []
            var allAfterArr = []
            var allBeforeArr = []
            data[i].resource_field.forEach(function (val) {
              allFieldArr.push(val)
            })
            data[i].resource_after.forEach(function (val) {
              allAfterArr.push(val)
            })
            data[i].resource_before.forEach(function (val) {
              allBeforeArr.push(val)
            })
            for (let j = 0; j < data[i].resource_field.length - 1; j++) {
              let newObj = Object.assign({}, data[i])
              data[i].brother.push(newObj)
            }
            for (let q = 0; q < data[i].brother.length; q++) {
              data[i].brother[q].brother = []
              data[i].brother[q].resource_field = []
              data[i].brother[q].resource_after = []
              data[i].brother[q].resource_before = []
              data[i].brother[q].resource_field.push(allFieldArr[q + 1])
              data[i].brother[q].resource_after.push(allAfterArr[q + 1])
              data[i].brother[q].resource_before.push(allBeforeArr[q + 1])
            }
            data[i].resource_field = []
            data[i].resource_after = []
            data[i].resource_before = []
            data[i].resource_field.push(allFieldArr[0])
            data[i].resource_after.push(allAfterArr[0])
            data[i].resource_before.push(allBeforeArr[0])
          }
        }
        return data
      }
    },
    computed: {
      computedOpts () {
        if (typeof this.optsFilter === 'function') {
          return this.optsFilter(this.renderData.operateOpts, this.currRow)
        }
        return this.renderData.operateOpts || []
      },
      computedHeaderCols () {
        var headerCols = JSON.parse(JSON.stringify(this.renderData.headerCols))
        if (this.computedOpts.length && headerCols.length > 8) {
          headerCols.splice(7)
        }
        if (!this.computedOpts.length && headerCols.length > 9) {
          headerCols.splice(8)
        }
        console.log('computedHeaderCols', headerCols)
        return headerCols
      },
      otherCols () {
        var headerCols = JSON.parse(JSON.stringify(this.renderData.headerCols))
        if (this.computedOpts.length && headerCols.length > 8) {
          return headerCols.splice(7)
        }
        if (!this.computedOpts.length && headerCols.length > 9) {
          return headerCols.splice(8)
        }
        return []
      },
      layout () {
        console.log('this.pagination.pageSizes', this.pagination.pageSizes)
        if (this.pagination.pageSizes) {
          return 'total, sizes, prev, pager, next, jumper'
        } else {
          return 'prev, pager, next'
        }
      }
    },
    watch: {
      selectedRows: {
        handler () {
          this.toggleSelectedRow(this.tableData || [])
        },
        deep: true
      }
    },
    async mounted () {
      this.tableData = this.parentModel.tableData || []
      await this.refresh()
    },
    components: {
      BIcon,
      BTooltip,
      BPagination
    }
  }
</script>

<style lang="less">
  .header-icon {
    margin-left: 0;
  }

  .el-table-scroll {
    overflow: auto;
  }

  .el-popover-item-intable {
    .title {
      margin-top: 10px;
    }
    line-height: 26px;
    .left {
      width: 45%;
      display: inline-block;
    }
    .right {
      width: 50%;
      padding-left: 10px;
      display: inline-block;
    }
    span:nth-child(2) {
      margin-left: 10px;
    }
  }

  .b-table {
    .el-table .table-cell {
      width: 100%;
      display: inline-block;
    }
    .table {
      margin-top: 16px;
    }
    .batch-operate {
      line-height: 36px;
    }
    .pagination {
      float: right;
      .el-pager li {
        min-width: 21px;
      }
    }
  }

  .header-span {
    max-width: 80%;
    vertical-align: top;
    display: inline-block;
  }

  .ipt-class {
    text-align: center !important;
  }

  .tabPopover1 {
    width: 40% !important;
    position: relative;
    top: 5px;
    left: 5px;
  }

  .b-table {
    .table-el-tooltip {
      position: relative;
      top: 5px;
      left: 5px;
    }
    .hide-expand {
      .el-table__expand-icon {
        display: none;
      }
    }
    .el-table .sort-caret.ascending {
      top: 0 !important;
    }
    .el-table .sort-caret.descending {
      bottom: 0 !important;
    }
    .img-icon-size  {
      font-size: 22px;
    }
    .el-table__expanded-cell {
      padding: 0 !important;
    }
    .caret-wrapper {
      height: 23px !important;
    }
    .el-table td, .el-table th {
      padding: 8.5px 0!important;
    }
  }
</style>
