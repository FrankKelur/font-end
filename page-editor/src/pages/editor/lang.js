var componentsAuth = [
  {
    auth: 'user_management',
    dependentAuths: [],
    canDisabled: false,
    label: '用户管理',
    children: [{
      auth: 'user_management_new_user',
      dependentAuths: [],
      canDisabled: true,
      label: '新建用户',
      children: []
    }, {
      auth: 'user_management_search_user',
      dependentAuths: [],
      canDisabled: false,
      label: '搜索用户',
      children: [{
        auth: 'user_management_search_user_name',
        dependentAuths: ['user_management_list_user_name'],
        canDisabled: false,
        label: '用户ID',
        children: []
      }, {
        auth: 'user_management_search_email',
        dependentAuths: ['user_management_list_email'],
        canDisabled: false,
        label: '邮箱',
        children: []
      }, {
        auth: 'user_management_search_status',
        dependentAuths: ['user_management_list_status'],
        canDisabled: false,
        label: '状态',
        children: []
      }, {
        auth: 'user_management_search_create_time',
        dependentAuths: ['user_management_list_create_time'],
        canDisabled: false,
        label: '创建时间',
        children: []
      }, {
        auth: 'user_management_search_creator',
        dependentAuths: ['user_management_list_creator'],
        canDisabled: false,
        label: '创建人',
        children: []
      }, {
        auth: 'user_management_search_user_role',
        dependentAuths: ['user_management_list_user_role'],
        canDisabled: false,
        label: '用户角色',
        children: []
      }, {
        auth: 'user_management_search_user_type',
        dependentAuths: ['user_management_list_user_type'],
        canDisabled: false,
        label: '用户类型',
        children: []
      }, {
        auth: 'user_management_search_user_group',
        dependentAuths: ['user_management_list_user_group'],
        canDisabled: false,
        label: '用户组',
        children: []
      }]
    }, {
      auth: 'user_management_list_user',
      dependentAuths: [],
      canDisabled: false,
      label: '用户列表',
      children: [{
        auth: 'user_management_list_user_name',
        dependentAuths: [],
        canDisabled: false,
        label: '用户ID',
        children: []
      }, {
        auth: 'user_management_list_email',
        dependentAuths: [],
        canDisabled: false,
        label: '邮箱',
        children: []
      }, {
        auth: 'user_management_list_status',
        dependentAuths: [],
        canDisabled: false,
        label: '状态',
        children: []
      }, {
        auth: 'user_management_list_create_time',
        dependentAuths: [],
        canDisabled: false,
        label: '创建时间',
        children: []
      }, {
        auth: 'user_management_list_creator',
        dependentAuths: [],
        canDisabled: false,
        label: '创建人',
        children: []
      }, {
        auth: 'user_management_list_user_role',
        dependentAuths: [],
        canDisabled: false,
        label: '用户角色',
        children: []
      }, {
        auth: 'user_management_list_user_type',
        dependentAuths: [],
        canDisabled: false,
        label: '用户类型',
        children: []
      }, {
        auth: 'user_management_list_user_group',
        dependentAuths: [],
        canDisabled: false,
        label: '用户组',
        children: []
      }, {
        auth: 'user_management_change_password',
        dependentAuths: [],
        canDisabled: true,
        label: '更改密码',
        children: []
      }, {
        auth: 'user_management_delete_user',
        dependentAuths: [],
        canDisabled: true,
        label: '删除用户',
        children: []
      }, {
        auth: 'user_management_edit_group',
        dependentAuths: [],
        canDisabled: true,
        label: '编辑分组',
        children: []
      }, {
        auth: 'user_management_link_role',
        dependentAuths: [],
        canDisabled: true,
        label: '关联角色',
        children: []
      }]
    }]
  },
  {
    auth: 'group_management',
    dependentAuths: [],
    canDisabled: false,
    label: '分组管理',
    children: [{
      auth: 'group_management_new_subgroup',
      dependentAuths: [],
      canDisabled: true,
      label: '添加子用户组',
      children: []
    }, {
      auth: 'group_management_move_group',
      dependentAuths: [],
      canDisabled: true,
      label: '移动用户组',
      children: []
    }, {
      auth: 'group_management_delete_group',
      dependentAuths: [],
      canDisabled: true,
      label: '删除分组',
      children: []
    }, {
      auth: 'group_management_edit_group',
      dependentAuths: [],
      canDisabled: false,
      label: '编辑分组',
      children: []
    }, {
      auth: 'group_management_edit_role',
      dependentAuths: [],
      canDisabled: false,
      label: '编辑角色',
      children: []
    }, {
      auth: 'group_management_edit_member',
      dependentAuths: [],
      canDisabled: false,
      label: '用户列表',
      children: []
    }, {
      auth: 'group_management_search_group',
      dependentAuths: [],
      canDisabled: false,
      label: '用户组',
      children: [{
        auth: 'group_management_search_group_name',
        dependentAuths: [],
        canDisabled: false,
        label: '用户组',
        children: []
      }, {
        auth: 'group_management_search_create_time',
        dependentAuths: [],
        canDisabled: false,
        label: '创建时间',
        children: []
      }, {
        auth: 'group_management_search_creator',
        dependentAuths: [],
        canDisabled: false,
        label: '创建人',
        children: []
      }, {
        auth: 'group_management_search_group_role',
        dependentAuths: ['group_management_edit_role'],
        canDisabled: false,
        label: '角色',
        children: []
      }]
    }]
  },
  {
    auth: 'role_management',
    dependentAuths: [],
    canDisabled: false,
    label: '角色管理',
    children: [{
      auth: 'role_management_new_role',
      dependentAuths: [],
      canDisabled: true,
      label: '新建角色',
      children: []
    }, {
      auth: 'role_management_search_role',
      dependentAuths: [],
      canDisabled: false,
      label: '角色',
      children: [{
        auth: 'role_management_search_role_name',
        dependentAuths: ['role_management_list_role_name'],
        canDisabled: false,
        label: '角色名',
        children: []
      }, {
        auth: 'role_management_search_create_time',
        dependentAuths: ['role_management_list_create_time'],
        canDisabled: false,
        label: '创建时间',
        children: []
      }, {
        auth: 'role_management_search_creator',
        dependentAuths: ['role_management_list_creator'],
        canDisabled: false,
        label: '创建人',
        children: []
      }, {
        auth: 'role_management_search_from_where',
        dependentAuths: ['role_management_list_from_where'],
        canDisabled: false,
        label: '权限归属',
        children: []
      }]
    }, {
      auth: 'role_management_list_role',
      dependentAuths: [],
      canDisabled: false,
      label: '角色列表',
      children: [{
        auth: 'role_management_list_role_name',
        dependentAuths: [],
        canDisabled: false,
        label: '角色名',
        children: []
      }, {
        auth: 'role_management_list_description',
        dependentAuths: [],
        canDisabled: false,
        label: '描述',
        children: []
      }, {
        auth: 'role_management_list_create_time',
        dependentAuths: [],
        canDisabled: false,
        label: '创建时间',
        children: []
      }, {
        auth: 'role_management_list_creator',
        dependentAuths: [],
        canDisabled: false,
        label: '创建人',
        children: []
      }, {
        auth: 'role_management_list_from_where',
        dependentAuths: [],
        canDisabled: false,
        label: '权限归属',
        children: []
      }, {
        auth: 'role_management_list_edit_time',
        dependentAuths: [],
        canDisabled: false,
        label: '最近更改时间',
        children: []
      }, {
        auth: 'role_management_link_user',
        dependentAuths: [],
        canDisabled: true,
        label: '关联用户',
        children: []
      }, {
        auth: 'role_management_copy_role',
        dependentAuths: [],
        canDisabled: true,
        label: '复制角色',
        children: []
      }, {
        auth: 'role_management_delete_role',
        dependentAuths: [],
        canDisabled: true,
        label: '删除角色',
        children: []
      }, {
        auth: 'role_management_edit_auth',
        dependentAuths: [],
        canDisabled: true,
        label: '权限管理',
        children: []
      }]
    }]
  },
  {
    auth: 'audit_process',
    dependentAuths: [],
    canDisabled: false,
    label: '审核处理',
    children: [
      {
        auth: 'audit_process_search_deposit_audit',
        dependentAuths: [],
        canDisabled: false,
        label: '入金审核搜索',
        children: [
//              {
//                auth: 'audit_process_search_deposit_task_id',
//                dependentAuths: ['audit_process_deposit_task_id'],
//                canDisabled: false,
//                label: '任务ID',
//                children: []
//              },
          {
            auth: 'audit_process_search_deposit_username',
            dependentAuths: ['audit_process_deposit_username'],
            canDisabled: false,
            label: '用户名',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_apply_time',
            dependentAuths: ['audit_process_deposit_apply_time'],
            canDisabled: false,
            label: '申请时间',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_audit_user',
            dependentAuths: ['audit_process_deposit_audit_user'],
            canDisabled: false,
            label: '审核人',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_audit_result',
            dependentAuths: ['audit_process_deposit_audit_result'],
            canDisabled: false,
            label: '审核结果',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_audit_progress',
            dependentAuths: ['audit_process_deposit_audit_progress'],
            canDisabled: false,
            label: '审核步骤',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_priority',
            dependentAuths: ['audit_process_deposit_priority'],
            canDisabled: false,
            label: '优先级',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_account',
            dependentAuths: ['audit_process_deposit_account'],
            canDisabled: false,
            label: '交易账号',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_type',
            dependentAuths: ['audit_process_deposit_type'],
            canDisabled: false,
            label: '入金方式',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_currency',
            dependentAuths: ['audit_process_deposit_currency'],
            canDisabled: false,
            label: '入金货币',
            children: []
          },
          {
            auth: 'audit_process_search_deposit_amount',
            dependentAuths: ['audit_process_deposit_amount'],
            canDisabled: false,
            label: '入金金额',
            children: []
          }
        ]
      },
      {
        auth: 'audit_process_list_deposit',
        dependentAuths: [],
        canDisabled: false,
        label: '入金审核列表',
        children: [
          {
            auth: 'audit_process_deposit_task_id',
            dependentAuths: [],
            canDisabled: false,
            label: '任务ID',
            children: []
          },
          {
            auth: 'audit_process_deposit_username',
            dependentAuths: [],
            canDisabled: false,
            label: '用户名',
            children: []
          },
          {
            auth: 'audit_process_deposit_apply_time',
            dependentAuths: [],
            canDisabled: false,
            label: '申请时间',
            children: []
          },
          {
            auth: 'audit_process_deposit_audit_user',
            dependentAuths: [],
            canDisabled: false,
            label: '审核人',
            children: []
          },
          {
            auth: 'audit_process_deposit_audit_status',
            dependentAuths: [],
            canDisabled: false,
            label: '审核状态',
            children: []
          },
          {
            auth: 'audit_process_deposit_audit_result',
            dependentAuths: [],
            canDisabled: false,
            label: '审核结果',
            children: []
          },
          {
            auth: 'audit_process_deposit_audit_progress',
            dependentAuths: [],
            canDisabled: false,
            label: '审核步骤',
            children: []
          },
          {
            auth: 'audit_process_deposit_priority',
            dependentAuths: [],
            canDisabled: false,
            label: '优先级',
            children: []
          },
          {
            auth: 'audit_process_deposit_no',
            dependentAuths: [],
            canDisabled: false,
            label: '入金编号',
            children: []
          },
          {
            auth: 'audit_process_deposit_trade_system',
            dependentAuths: [],
            canDisabled: false,
            label: '交易系统',
            children: []
          },
          {
            auth: 'audit_process_deposit_account',
            dependentAuths: [],
            canDisabled: false,
            label: '交易账号',
            children: []
          },
          {
            auth: 'audit_process_deposit_type',
            dependentAuths: [],
            canDisabled: false,
            label: '入金方式',
            children: []
          },
          {
            auth: 'audit_process_deposit_currency',
            dependentAuths: [],
            canDisabled: false,
            label: '入金货币',
            children: []
          },
          {
            auth: 'audit_process_deposit_amount',
            dependentAuths: [],
            canDisabled: false,
            label: '入金金额',
            children: []
          },
          {
            auth: 'audit_process_deposit_audit_task',
            dependentAuths: ['audit_process_deposit_audit_result', 'audit_process_deposit_audit_progress'],
            canDisabled: true,
            label: '处理任务',
            children: []
          },
//              {
//                auth: 'audit_process_deposit_redo_task',
//                dependentAuths: ['audit_process_deposit_audit_result', 'audit_process_deposit_audit_progress'],
//                canDisabled: true,
//                label: '重做任务',
//                children: []
//              },
          {
            auth: 'audit_process_deposit_audit_history',
            dependentAuths: [],
            canDisabled: true,
            label: '审核历史',
            children: []
          },
          {
            auth: 'audit_process_deposit_priority_set',
            dependentAuths: [],
            canDisabled: true,
            label: '优先级设置',
            children: []
          }
        ]
      },
      {
        auth: 'audit_process_search_withdraw_audit',
        dependentAuths: [],
        canDisabled: false,
        label: '出金审核搜索',
        children: [
//              {
//                auth: 'audit_process_search_withdraw_task_id',
//                dependentAuths: ['audit_process_withdraw_task_id'],
//                canDisabled: false,
//                label: '任务ID',
//                children: []
//              },
          {
            auth: 'audit_process_search_withdraw_username',
            dependentAuths: ['audit_process_withdraw_username'],
            canDisabled: false,
            label: '用户名',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_apply_time',
            dependentAuths: ['audit_process_withdraw_apply_time'],
            canDisabled: false,
            label: '申请时间',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_audit_user',
            dependentAuths: ['audit_process_withdraw_audit_user'],
            canDisabled: false,
            label: '审核人',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_audit_result',
            dependentAuths: ['audit_process_withdraw_audit_result'],
            canDisabled: false,
            label: '审核结果',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_audit_progress',
            dependentAuths: ['audit_process_withdraw_audit_progress'],
            canDisabled: false,
            label: '审核步骤',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_priority',
            dependentAuths: ['audit_process_withdraw_priority'],
            canDisabled: false,
            label: '优先级',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_account',
            dependentAuths: ['audit_process_withdraw_account'],
            canDisabled: false,
            label: '交易账号',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_type',
            dependentAuths: ['audit_process_withdraw_type'],
            canDisabled: false,
            label: '出金方式',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_currency',
            dependentAuths: ['audit_process_withdraw_currency'],
            canDisabled: false,
            label: '出金货币',
            children: []
          },
          {
            auth: 'audit_process_search_withdraw_amount',
            dependentAuths: ['audit_process_withdraw_amount'],
            canDisabled: false,
            label: '出金金额',
            children: []
          }
        ]
      },
      {
        auth: 'audit_process_list_withdraw',
        dependentAuths: [],
        canDisabled: false,
        label: '出金审核列表',
        children: [
          {
            auth: 'audit_process_withdraw_task_id',
            dependentAuths: [],
            canDisabled: false,
            label: '任务ID',
            children: []
          },
          {
            auth: 'audit_process_withdraw_username',
            dependentAuths: [],
            canDisabled: false,
            label: '用户名',
            children: []
          },
          {
            auth: 'audit_process_withdraw_apply_time',
            dependentAuths: [],
            canDisabled: false,
            label: '申请时间',
            children: []
          },
          {
            auth: 'audit_process_withdraw_audit_user',
            dependentAuths: [],
            canDisabled: false,
            label: '审核人',
            children: []
          },
          {
            auth: 'audit_process_withdraw_audit_status',
            dependentAuths: [],
            canDisabled: false,
            label: '审核状态',
            children: []
          },
          {
            auth: 'audit_process_withdraw_audit_result',
            dependentAuths: [],
            canDisabled: false,
            label: '审核结果',
            children: []
          },
          {
            auth: 'audit_process_withdraw_audit_progress',
            dependentAuths: [],
            canDisabled: false,
            label: '审核步骤',
            children: []
          },
          {
            auth: 'audit_process_withdraw_priority',
            dependentAuths: [],
            canDisabled: false,
            label: '优先级',
            children: []
          },
          {
            auth: 'audit_process_withdraw_no',
            dependentAuths: [],
            canDisabled: false,
            label: '出金编号',
            children: []
          },
          {
            auth: 'audit_process_withdraw_trade_system',
            dependentAuths: [],
            canDisabled: false,
            label: '交易系统',
            children: []
          },
          {
            auth: 'audit_process_withdraw_account',
            dependentAuths: [],
            canDisabled: false,
            label: '交易账号',
            children: []
          },
          {
            auth: 'audit_process_withdraw_type',
            dependentAuths: [],
            canDisabled: false,
            label: '出金方式',
            children: []
          },
          {
            auth: 'audit_process_withdraw_currency',
            dependentAuths: [],
            canDisabled: false,
            label: '出金货币',
            children: []
          },
          {
            auth: 'audit_process_withdraw_amount',
            dependentAuths: [],
            canDisabled: false,
            label: '出金金额',
            children: []
          },
          {
            auth: 'audit_process_withdraw_audit_task',
            dependentAuths: ['audit_process_withdraw_audit_result', 'audit_process_withdraw_audit_progress'],
            canDisabled: true,
            label: '处理任务',
            children: []
          },
//              {
//                auth: 'audit_process_withdraw_redo_task',
//                dependentAuths: ['audit_process_withdraw_audit_result', 'audit_process_withdraw_audit_progress'],
//                canDisabled: true,
//                label: '重做任务',
//                children: []
//              },
          {
            auth: 'audit_process_withdraw_audit_history',
            dependentAuths: [],
            canDisabled: true,
            label: '审核历史',
            children: []
          },
          {
            auth: 'audit_process_withdraw_priority_set',
            dependentAuths: [],
            canDisabled: true,
            label: '优先级设置',
            children: []
          }
        ]
      }
    ]
  },
  {
    auth: 'audit_start',
    dependentAuths: [],
    canDisabled: false,
    label: '审核触发',
    children: [{
      auth: 'audit_start_deposit',
      dependentAuths: [],
      canDisabled: false,
      label: '存入资金',
      children: []
    }, {
      auth: 'audit_start_withdraw',
      dependentAuths: [],
      canDisabled: false,
      label: '取出资金',
      children: []
    }]
  },
  {
    auth: 'audit_set',
    dependentAuths: [],
    canDisabled: false,
    label: '审核设置',
    children: [
      {
        auth: 'audit_set_add_new_audit',
        dependentAuths: [],
        canDisabled: true,
        label: '添加新审核',
        children: []
      },
      {
        auth: 'audit_set_search',
        dependentAuths: [],
        canDisabled: false,
        label: '审核搜索',
        children: [
          {
            auth: 'audit_set_search_unique_name',
            label: '唯一名',
            dependentAuths: ['audit_set_list_unique_name'],
            canDisabled: false,
            children: []
          },
          {
            auth: 'audit_set_search_workflow_type',
            label: '审核类型',
            dependentAuths: ['audit_set_list_workflow_type'],
            canDisabled: false,
            children: []
          },
          {
            auth: 'audit_set_search_create_time',
            label: '创建时间',
            dependentAuths: ['audit_set_list_create_time'],
            canDisabled: false,
            children: []
          },
          {
            auth: 'audit_set_search_status',
            label: '状态',
            dependentAuths: ['audit_set_list_status'],
            canDisabled: false,
            children: []
          }
        ]
      },
      {
        auth: 'audit_set_list',
        dependentAuths: [],
        canDisabled: false,
        label: '审核列表',
        children: [
          {
            label: '审核名称',
            auth: 'audit_set_list_workflow_name',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '唯一名',
            auth: 'audit_set_list_unique_name',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '审核类型',
            auth: 'audit_set_list_workflow_type',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '任务',
            auth: 'audit_set_list_task',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '创建时间',
            auth: 'audit_set_list_create_time',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '状态',
            auth: 'audit_set_list_status',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '描述',
            auth: 'audit_set_list_description',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '审核基础信息',
            auth: 'audit_set_audit_info',
            dependentAuths: ['audit_set_list_workflow_type'],
            canDisabled: false,
            children: []
          },
          {
            label: '流程及审核人设置',
            auth: 'audit_set_flow_people_set',
            dependentAuths: [],
            canDisabled: true,
            children: []
          },
          {
            label: '表单设置',
            auth: 'audit_set_form_set',
            dependentAuths: ['audit_set_list_workflow_type'],
            canDisabled: true,
            children: []
          },
          {
            label: '停用',
            auth: 'audit_set_disable',
            dependentAuths: ['audit_set_list_status'],
            canDisabled: true,
            children: []
          },
          {
            label: '启用',
            auth: 'audit_set_enable',
            dependentAuths: ['audit_set_list_status'],
            canDisabled: true,
            children: []
          },
          {
            label: '删除',
            auth: 'audit_set_delete',
            dependentAuths: ['audit_set_list_workflow_type'],
            canDisabled: true,
            children: []
          }
        ]
      },
      {
        auth: 'audit_set_add_user_search',
        dependentAuths: [],
        canDisabled: false,
        label: '查找并添加用户搜索',
        children: [
          {
            label: '用户名',
            auth: 'audit_set_add_user_search_username',
            dependentAuths: ['audit_set_add_user_list_username'],
            canDisabled: false,
            children: []
          },
          {
            label: '邮箱',
            auth: 'audit_set_add_user_search_email',
            dependentAuths: ['audit_set_add_user_list_email'],
            canDisabled: false,
            children: []
          },
          {
            label: '用户类型',
            auth: 'audit_set_add_user_search_user_type',
            dependentAuths: ['audit_set_add_user_list_user_type'],
            canDisabled: false,
            children: []
          },
          {
            label: '所在用户组',
            auth: 'audit_set_add_user_search_user_group',
            dependentAuths: ['audit_set_add_user_list_user_group'],
            canDisabled: false,
            children: []
          },
          {
            label: '角色',
            auth: 'audit_set_add_user_search_role',
            dependentAuths: ['audit_set_add_user_list_role'],
            canDisabled: false,
            children: []
          }
        ]
      },
      {
        auth: 'audit_set_add_user_list',
        dependentAuths: ['audit_set_flow_people_set'],
        canDisabled: false,
        label: '查找并添加用户列表',
        children: [
          {
            label: '用户名',
            auth: 'audit_set_add_user_list_username',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '邮箱',
            auth: 'audit_set_add_user_list_email',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '用户类型',
            auth: 'audit_set_add_user_list_user_type',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '所在用户组',
            auth: 'audit_set_add_user_list_user_group',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '角色',
            auth: 'audit_set_add_user_list_role',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '创建时间',
            auth: 'audit_set_add_user_list_create_time',
            dependentAuths: [],
            canDisabled: false,
            children: []
          },
          {
            label: '状态',
            auth: 'audit_set_add_user_list_status',
            dependentAuths: [],
            canDisabled: false,
            children: []
          }
        ]
      },
      {
        auth: 'audit_set_direct_dad_user_group',
        dependentAuths: ['audit_set_flow_people_set'],
        canDisabled: true,
        label: '直属父级-用户组层级',
        children: []
      },
      {
        auth: 'audit_set_all_children_user_group',
        dependentAuths: ['audit_set_flow_people_set'],
        canDisabled: true,
        label: '全部下级-用户组层级',
        children: []
      },
      {
        auth: 'audit_set_direct_children_user_group',
        dependentAuths: ['audit_set_flow_people_set'],
        canDisabled: true,
        label: '直属下级-用户组层级',
        children: []
      }
    ]
  },
  {
    auth: 'user_setting',
    dependentAuths: [],
    canDisabled: false,
    label: '用户设置',
    children: [
      {
        auth: 'user_setting_default',
        dependentAuths: [],
        canDisabled: false,
        label: '默认权限',
        children: []
      }
    ]
  },
  {
    auth: 'user_profile_setting',
    dependentAuths: [],
    canDisabled: false,
    label: '用户资料设置',
    children: [
      {
        auth: 'user_profile_setting_basic_info',
        dependentAuths: ['user_profile_setting_job_info', 'user_profile_setting_file', 'user_profile_setting_basic_info_diy', 'user_profile_setting_job_info_diy', 'user_profile_setting_file_diy'],
        canDisabled: false,
        label: '基本信息',
        children: []
      },
      {
        auth: 'user_profile_setting_job_info',
        dependentAuths: ['user_profile_setting_basic_info', 'user_profile_setting_file', 'user_profile_setting_basic_info_diy', 'user_profile_setting_job_info_diy', 'user_profile_setting_file_diy'],
        canDisabled: false,
        label: '职业与交易经验',
        children: []
      },
      {
        auth: 'user_profile_setting_file',
        dependentAuths: ['user_profile_setting_job_info', 'user_profile_setting_basic_info', 'user_profile_setting_basic_info_diy', 'user_profile_setting_job_info_diy', 'user_profile_setting_file_diy'],
        canDisabled: false,
        label: '文件上传',
        children: []
      },
      {
        auth: 'user_profile_setting_basic_info_diy',
        dependentAuths: ['user_profile_setting_job_info', 'user_profile_setting_file', 'user_profile_setting_basic_info', 'user_profile_setting_job_info_diy', 'user_profile_setting_file_diy'],
        canDisabled: false,
        label: '自定义基本信息',
        children: []
      },
      {
        auth: 'user_profile_setting_job_info_diy',
        dependentAuths: ['user_profile_setting_job_info', 'user_profile_setting_file', 'user_profile_setting_basic_info_diy', 'user_profile_setting_basic_info', 'user_profile_setting_file_diy'],
        canDisabled: false,
        label: '自定义职业与交易经验',
        children: []
      },
      {
        auth: 'user_profile_setting_file_diy',
        dependentAuths: ['user_profile_setting_job_info', 'user_profile_setting_file', 'user_profile_setting_basic_info_diy', 'user_profile_setting_job_info_diy', 'user_profile_setting_basic_info'],
        canDisabled: false,
        label: '自定义文件上传',
        children: []
      }
    ]
  },
  {
    auth: 'user_type_setting',
    dependentAuths: [],
    canDisabled: false,
    label: '用户类型设置',
    children: [
      {
        auth: 'user_type_setting_default',
        dependentAuths: [],
        canDisabled: false,
        label: '用户类型默认权限',
        children: []
      }
    ]
  },
  {
    auth: 'operation_records',
    dependentAuths: [],
    canDisabled: false,
    label: '操作记录',
    children: [
      {
        auth: 'operation_records_search_resource',
        dependentAuths: [],
        canDisabled: false,
        label: '资源修改搜索权限',
        children: [
          {
            auth: 'operation_records_search_resource_operator',
            dependentAuths: ['operation_records_list_resource_operator'],
            canDisabled: false,
            label: '操作人',
            children: []
          },
          {
            auth: 'operation_records_search_resource_time',
            dependentAuths: ['operation_records_list_resource_time'],
            canDisabled: false,
            label: '操作时间',
            children: []
          },
          {
            auth: 'operation_records_search_resource_resource_type',
            dependentAuths: ['operation_records_list_resource_resource_type'],
            canDisabled: false,
            label: '资源类型',
            children: []
          },
          {
            auth: 'operation_records_search_resource_username',
            dependentAuths: ['operation_records_list_resource_username'],
            canDisabled: false,
            label: '用户名',
            children: []
          },
          {
            auth: 'operation_records_search_resource_operation',
            dependentAuths: ['operation_records_list_resource_operation'],
            canDisabled: false,
            label: '操作',
            children: []
          }
        ]
      },
      {
        auth: 'operation_records_list_resource',
        dependentAuths: [],
        canDisabled: false,
        label: '资源修改表格权限',
        children: [
          {
            auth: 'operation_records_list_resource_operator',
            dependentAuths: [],
            canDisabled: false,
            label: '操作人',
            children: []
          },
          {
            auth: 'operation_records_list_resource_time',
            dependentAuths: [],
            canDisabled: false,
            label: '操作时间',
            children: []
          },
          {
            auth: 'operation_records_list_resource_resource_type',
            dependentAuths: [],
            canDisabled: false,
            label: '资源类型',
            children: []
          },
          {
            auth: 'operation_records_list_resource_username',
            dependentAuths: [],
            canDisabled: false,
            label: '用户名',
            children: []
          },
          {
            auth: 'operation_records_list_resource_operation',
            dependentAuths: [],
            canDisabled: false,
            label: '操作',
            children: []
          },
          {
            auth: 'operation_records_list_resource_resource_id',
            dependentAuths: [],
            canDisabled: false,
            label: '资源 ID',
            children: []
          },
          {
            auth: 'operation_records_list_resource_field',
            dependentAuths: [],
            canDisabled: false,
            label: '字段',
            children: []
          },
          {
            auth: 'operation_records_list_resource_before',
            dependentAuths: [],
            canDisabled: false,
            label: '修改前',
            children: []
          },
          {
            auth: 'operation_records_list_resource_after',
            dependentAuths: [],
            canDisabled: false,
            label: '修改后',
            children: []
          }
        ]
      }
    ]
  },
  {
    auth: 'channel_setting',
    dependentAuths: [],
    canDisabled: false,
    label: '通道配置',
    children: [
      {
        auth: 'channel_setting_bank',
        dependentAuths: [],
        canDisabled: false,
        label: '银行通道设置',
        children: []
      },
      {
        auth: 'channel_setting_trade',
        dependentAuths: [],
        canDisabled: false,
        label: '交易系统通道设置',
        children: []
      },
      {
        auth: 'channel_setting_notification',
        dependentAuths: [],
        canDisabled: false,
        label: '通知通道设置',
        children: []
      },
      {
        auth: 'channel_setting_talk',
        dependentAuths: [],
        canDisabled: false,
        label: '沟通通道设置',
        children: []
      }
    ]
  },
  {
    auth: 'translate',
    dependentAuths: [],
    canDisabled: false,
    label: '文案',
    children: []
  }
]

var resourceList = [
  {
    name: 'withdraw_audit',
    'resourceDepositAuditTask': '入金审核任务资源',
    'resourceWithdrawalAuditTask': '出金审核任务资源',
    'resourceUserAuditTask': '用户审核任务资源',
    'reachAllResource': '访问全部资源',
    'reachPartResource': '访问特定资源',
    'checkAllResource': '查看全部资源',
    'checkPartResource': '查看特定资源',
    'filterCondition': '筛选条件',
    'pleaseSelect': '请选择',
    'addFilterCondition': '添加筛选条件',
    'range': '范围'
  },
  {
    name: 'deposit_audit',
    'resourceDepositAuditTask': '入金审核任务资源',
    'resourceWithdrawalAuditTask': '出金审核任务资源',
    'resourceUserAuditTask': '用户审核任务资源',
    'reachAllResource': '访问全部资源',
    'reachPartResource': '访问特定资源',
    'checkAllResource': '查看全部资源',
    'checkPartResource': '查看特定资源',
    'filterCondition': '筛选条件',
    'pleaseSelect': '请选择',
    'addFilterCondition': '添加筛选条件',
    'range': '范围'
  },
  {
    name: 'user_audit',
    'resourceDepositAuditTask': '入金审核任务资源',
    'resourceWithdrawalAuditTask': '出金审核任务资源',
    'resourceUserAuditTask': '用户审核任务资源',
    'reachAllResource': '访问全部资源',
    'reachPartResource': '访问特定资源',
    'checkAllResource': '查看全部资源',
    'checkPartResource': '查看特定资源',
    'filterCondition': '筛选条件',
    'pleaseSelect': '请选择',
    'addFilterCondition': '添加筛选条件',
    'range': '范围'
  }
]

var components = {
  'user_management': {
    'user_management_auth': {
      'loading': '加载中...',
      'userManagement': '用户管理',
      'searching': '搜索中...',
      'confirm': '确定',
      'cancel': '取消',
      'userName': '用户名',
      'userGroup': '用户组',
      'add': '添加',
      'pleaseSelect': '请选择',
      'pleaseEnter': '请输入',
      'back': '返回',
      'close': '关闭',
      'save': '保存'
    },
    'user_management_new_user': {
      'newUser': '新建用户',
      'addToGroup': '添加用户组',
      'userName': '用户名',
      'password': '密码',
      'email': '邮箱',
      'userType': '用户类型',
      'confirmPassword': '确认密码',
      'userInfo': '用户资料',
      'editUserGroup': '用户分组',
      'errorNameRule': '5-15个英文或数字，新建后不可修改',
      'errorNameExist': '用户名已存在',
      'passwordReg': '8-25个字符，必须包括大小写字母、数字及特殊字符',
      'pwdRule1': '8-25个字符，必须至少包括大小写字母、数字及特殊字符中的其中两种',
      'pwdRule2': '8-25个字符',
      'errorEmailRule': '邮箱格式不正确',
      'errorEmailExist': '邮箱已经存在',
      'confirmPasswordErrorRule': '两次输入的密码不一致'
    },
    'user_management_list_user': {
      'operation': '操作',
      'more': '更多',
      'headerCols': [{
        'field': 'user_name',

        'auth': 'user_management_list_user_name',
        'label': '用户名'
      }, {
        'field': 'email',

        'auth': 'user_management_list_email',

        'label': '邮箱'
      }, {
        'field': 'user_type',
        'label': '用户类型',

        'auth': 'user_management_list_user_type'
      }, {
        'field': 'user_role',
        'label': '用户角色',

        'auth': 'user_management_list_user_role'
      }, {
        'field': 'user_group',
        'label': '用户组',

        'auth': 'user_management_list_user_group'
      }, {
        'field': 'status',
        'label': '状态',

        'auth': 'user_management_list_status'
      }, {
        'field': 'creator',
        'label': '创建人',

        'auth': 'user_management_list_creator'
      }, {
        'field': 'create_time',
        'label': '创建时间',

        'auth': 'user_management_list_create_time'
      }],
      'operateOpts': [{
        'label': '更改密码',

        'auth': 'user_management_change_password',

        'user_management_change_password': {
          'changePassword': '修改密码',
          'autoPassword': '随机密码',
          'manualPassword': '手动输入',
          'newPassword': '新密码',
          'confirmPassword': '确认密码',
          'sendEmail': '发送邮件',
          'changeNextTime': '下次登录时要求用户修改密码',
          'inputNewPassword': '请输入新密码',
          'inputConfirmPassword': '请输入确认密码',
          'passwordReg': '8-25个字符，必须包括大小写字母、数字及特殊字符',
          'pwdRule1': '8-25个字符，必须至少包括大小写字母、数字及特殊字符中的其中两种',
          'pwdRule2': '8-25个字符',
          'confirmPasswordErrorRule': '两次输入的密码不一致'
        }
      }, {
        'label': '删除用户',

        'auth': 'user_management_delete_user',

        'user_management_delete_user': {'deleteUser': '删除用户', 'confirmDelete': '确认要删除该用户吗？'}
      }, {
        'label': '编辑分组',

        'auth': 'user_management_edit_group',

        'user_management_edit_group': {
          'edit_group': '编辑分组',
          'addToGroup': '添加到用户组',
          'group': '用户组',
          'editGroup': '编辑分组'
        }
      }, {
        'label': '关联角色',

        'auth': 'user_management_link_role',

        'user_management_link_role': {
          'linkRole': '关联角色',
          'userName': '用户名',
          'maxRole': '角色数上限',
          'linkedRole': '已关联角色',
          'notLinkedRole': '未关联角色',
          'pleaseEnterRoleName': '请输入角色名称',
          'previewRole': '预览角色',
          'interfaceAuth': '界面访问权限',
          'resourceAuth': '资源访问权限',
          'back': '返回',
          'disconnectRole': '取消关联',
          'roleName': '角色名称',
          'description': '描述',
          'fromWhere': '权限归属',
          'fromWhereDescription': '使用一个用户组的所有权限为基础创建新角色，新角色的“权限归属”就是这个用户组',
          'enableOperate': '可操作',
          'componentsAuth': componentsAuth,
          'resourceList': resourceList
        }
      }]
    },
    'user_management_search_user': {
      'search': '搜索',
      'reset': '重置',
      'searchFields': [{
        'type': 'input',
        'field': 'user_name',
        'placeholder': '用户名',

        'auth': 'user_management_search_user_name',
        'width': 3
      }, {
        'type': 'input',
        'placeholder': '邮箱',

        'auth': 'user_management_search_email',
        'field': 'email',
        'width': 6
      }, {
        'type': 'datetimerange',
        'field': 'create_time',

        'auth': 'user_management_search_create_time',
        'placeholder': '创建时间',
        'width': 6
      }, {
        'type': 'input',
        'field': 'creator',

        'auth': 'user_management_search_creator',
        'placeholder': '创建人',
        'width': 3
      }, {
        'type': 'select',
        'field': 'user_role',

        'auth': 'user_management_search_user_role',
        'placeholder': '用户角色',
        'width': 3,
        'dataSource': '/api/rbac/user/get_role_select'
      }, {
        'type': 'select',
        'field': 'user_type',

        'auth': 'user_management_search_user_type',
        'placeholder': '用户类型',
        'width': 3,
        'dataSource': '/api/rbac/user/get_user_type_select'
      }, {
        'type': 'select',
        'field': 'user_group',

        'auth': 'user_management_search_user_group',
        'placeholder': '用户分组',
        'dataSource': '/api/rbac/user/get_group_select',
        'width': 6
      }, {
        'type': 'select',
        'placeholder': '状态',
        'dataSource': '/api/rbac/user/get_status_select',
        'field': 'status',

        'auth': 'user_management_search_status',
        'width': 3
      }]
    }
  },
  'role_management': {
    'role_management_auth': {
      'loading': '加载中...',
      'roleManagement': '角色管理',
      'searching': '搜索中...',
      'confirm': '确定',
      'cancel': '取消',
      'add': '添加',
      'pleaseSelect': '请选择',
      'pleaseEnter': '请输入',
      'back': '返回',
      'save': '保存',
      'role': '角色'
    },
    'role_management_new_role': {
      'newRole': '新建角色',
      'roleName': '角色名称',
      'errorNameRule': '角色名格式不正确',
      'length30Limit': '角色名不能超过30字符',
      'errorNameExist': '角色名已存在',
      'description': '描述',
      'fromWhere': '权限归属',
      'fromWhereDescription': '使用一个用户组的所有权限为基础创建新角色，新角色的“权限归属”就是这个用户组',
      'interfaceAuth': '界面访问权限',
      'resourceAuth': '资源访问权限',
      'enableOperate': '可操作',
      'componentsAuth': componentsAuth,
      'resourceList': resourceList
    },
    'role_management_list_role': {
      'operation': '操作',
      'more': '更多',
      'headerCols': [{
        'field': 'role_name',

        'auth': 'role_management_list_role_name',
        'label': '角色名'
      }, {
        'field': 'description',

        'auth': 'role_management_list_description',
        'label': '描述'
      }, {
        'field': 'create_time',
        'auth': 'role_management_list_create_time',
        'label': '时间'
      }, {
        'field': 'creator',
        'label': '创建人',

        'auth': 'role_management_list_creator'
      }, {
        'field': 'from_where',
        'label': '权限归属',
        'auth': 'role_management_list_from_where',
        'tooltip': '{{infoFromWhere}}'
      }, {'field': 'edit_time', 'label': '上次更新时间', 'auth': 'role_management_list_edit_time'}],
      'operateOpts': [
        {
          'label': '删除角色',
          'auth': 'role_management_delete_role',
          'role_management_delete_role': {
            'deleteRole': '删除角色',
            'roleName': '角色名称',
            'confirmDeleteRole': '您确定要删除该角色吗？'
          }
        }, {
          'label': '编辑权限',

          'auth': 'role_management_edit_auth',
          'role_management_edit_auth': {
            'editAuth': '权限管理',
            'roleName': '角色名称',
            'description': '描述',
            'fromWhere': '权限归属',
            'interfaceAuth': '界面访问权限',
            'resourceAuth': '资源访问权限',
            'fromWhereDescription': '使用一个用户组的所有权限为基础创建新角色，新角色的“权限归属”就是这个用户组',
            'enableOperate': '可操作',
            'componentsAuth': componentsAuth,
            'resourceList': resourceList
          }
        }, {
          'label': '关联用户',

          'auth': 'role_management_link_user',
          'role_management_link_user': {'linkUser': '关联用户'}
        },
        {
          'label': '复制角色',
          'auth': 'role_management_copy_role',
          'role_management_copy_role': {
            'copyRole': '复制角色',
            'roleName': '角色名称',
            'description': '描述',
            'fromWhere': '权限归属',
            'interfaceAuth': '界面访问权限',
            'resourceAuth': '资源访问权限',
            'fromWhereDescription': '使用一个用户组的所有权限为基础创建新角色，新角色的“权限归属”就是这个用户组',
            'enableOperate': '可操作',
            'componentsAuth': componentsAuth,
            'resourceList': resourceList
          }
        }
      ]
    },
    'role_management_search_role': {
      'search': '搜索',
      'reset': '重置',
      'searchFields': [{
        'type': 'input',
        'field': 'role_name',
        'placeholder': '角色名',

        'auth': 'role_management_search_role_name',
        'width': 3
      }, {
        'type': 'datetimerange',
        'field': 'create_time',

        'auth': 'role_management_search_create_time',
        'placeholder': '创建时间',
        'width': 6
      }, {
        'type': 'input',
        'field': 'creator',

        'auth': 'role_management_search_creator',
        'placeholder': '创建人',
        'width': 3
      }, {
        'type': 'select',
        'field': 'from_where',
        'auth': 'role_management_search_from_where',
        'placeholder': '权限归属',
        'width': 6,
        'dataSource': '/api/rbac/role/get_from_where_select'
      }]
    }
  },
  'group_management': {
    // 每个组件的默认权限（自动生成）
    'group_management_auth': {
      'groupManagement': '用户组管理',
      'cancel': '取消',
      'confirm': '确定',
      'groupName': '用户组名称',
      'searching': '搜索中...',
      'pleaseSelect': '请选择',
      'pleaseEnter': '请输入',
      'length30Limit': '超过30个字符',
      'addUser': '请添加用户组成员',
      'switchMode': '切换显示'
    },
    'group_management_new_subgroup': {
      'groupManagementNewSubgroup': '添加子用户组',
      'errorPleaseEnter': '请输入用户组',
      'netErrorAddFail': '网络错误，添加失败！',
      'addSucceed': '添加成功！',
      'cancel': '取消',
      'confirm': '确定',
      'pleaseEnter': '请输入',
      'length30Limit': '超过30个字符',
      'groupName': '用户组名称'
    },
    'group_management_move_group': {
      'groupManagementMoveGroup': '移动用户组',
      'confirmMoveSingle': '确定移动到xxx',
      'moveTogether': '同时移动所有用户组',
      'moveSingle': '移动单个用户组',
      'newDad': '新父集用户组',
      'confirmMoveTogether': '确定一起xxx',
      'errorPleaseSelect': '请选择用户组',
      'netErrorMoveFail': '网路错误，移动失败',
      'moveSucceed': '移动成功',
      'pleaseEnter': '请输入',
      'cancel': '取消',
      'confirm': '确定',
      'groupName': '用户组名称'
    },
    'group_management_delete_group': {
      'groupManagementDeleteGroup': '删除用户组',
      'deleteSingle': '删除单个用户组',
      'deleteTogether': '同时删除下属用户组',
      'confirmDelete': 'xxxxx',
      'netErrorDeleteFail': '网络错误，删除失败',
      'deleteSucceed': '删除成功',
      'cancel': '取消',
      'confirm': '确定',
      'groupName': '用户组名称'
    },
//        'group_management_search_group': {
//          'search': '搜索',
//          'reset': '重置',
//          'searchFields': [
//            {
//              'type': 'input',
//              'field': 'group_name',
//              'placeholder': '用户组名称',
//              'auth': 'search_group_name',
//              'width': 3
//            },
//            {
//              'type': 'datetimerange',
//              'field': 'create_time',
//              'placeholder': '创建时间',
//              'auth': 'search_create_time',
//              'width': 6
//            },
//            {
//              'type': 'input',
//              'field': 'creator',
//              'placeholder': '创建人',
//              'auth': 'search_creator',
//              'width': 3
//            },
//            {
//              'type': 'select',
//              'field': 'group_role',
//              'placeholder': '用户组角色',
//              'auth': 'search_group_role',
//              'width': 3
//            }
//          ]
//        },
    'group_management_edit_group': {
      'pleaseEnter': '请输入',
      'groupName': '用户组名称',
      'creator': '创建人',
      'description': '描述',
      'save': '保存'
    },
    'group_management_edit_role': {
      'groupManagementEditRole': '用户组角色',
      'linkedRole': '已关联角色',
      'notLinkedRole': '未关联角色',
      'pleaseEnterRoleName': '请输入角色名称',
      'previewRole': '预览角色',
      'interfaceAuth': '界面访问权限',
      'resourceAuth': '资源访问权限',
      'back': '返回',
      'description': '描述',
      'disconnectRole': '取消关联',
      'linkRole': '关联角色',
      'roleName': '角色名称',
      'fromWhere': '权限归属',
      'fromWhereDescription': '使用一个用户组的所有权限为基础创建新角色，新角色的“权限归属”就是这个用户组',
      'enableOperate': '可操作',
      'componentsAuth': componentsAuth,
      'resourceList': resourceList
    },
    'group_management_edit_member': {
      'userList': '用户列表',
      'userName': '用户名',
      'email': '邮箱',
      'lastName': '姓',
      'middleName': '中间名',
      'firstName': '名',
      'phoneNo': '电话',
      'goTo': '前往',
      'page': '页'
    }
  },
  'concise_header': {
    'concise_header_auth': {},
    'concise_header_logo': {},
    'concise_header_language': {
      langList: [
        {
          icon: 'america',
          lang: 'en',
          text: 'English'
        },
        {
          icon: 'china',
          lang: 'zh-CN',
          text: '中文简体'
        },
        {
          icon: 'china',
          lang: 'zh-TW',
          text: '中文繁體'
        }
      ]
    },
    'concise_header_contact_information': {
      noContact: '暂无联系方式'
    },
    'concise_header_message_center': {
      'more': '更多'
    },
    'concise_header_account_info': {
      activationText: '激活后开始交易享受更多福利',
      signOut: '退出'
    }
  },
  'text_center_footer': {
    'text_center_footer_auth': {
      'centerFooterText': '这似乎是一段footer文案'
    }
  },
  'nav_left_menu': {
    'nav_left_menu_auth': {
      'key1': 'translate1',
      'key2': 'translate2'
    },
    'auth1': {'authStatus': 'enable', 'key1': 'translate1', 'key2': 'translate2', 'key3': 'translate3'}
  },
  'signup': {
    'signup_auth': {
      'signup': '注册',
      'username': '用户名',
      'usernamePrompt': '请填写用户名',
      'email': '邮箱地址',
      'emailPrompt': '请填写邮箱',
      'pwd': '密码',
      'pwdPrompt': '请填写密码',
      'confirmPwd': '确认密码',
      'confirmPwdPrompt': '请再次填写密码',
      'vcode': '验证码',
      'vcodePrompt': '请填写验证码',
      'changeVcode': '换一张',
      'clausePrefix': '已认真阅读并同意',
      'clause': '《条件与条款》',
      'clauseUrl': '/preview/signup-clause.pdf',
      'lettersOrNumbersNoChange': '5-15个数字或字母，注册成功后将不能更改',
      'usernameExists': '用户名已存在',
      'EnterRightEmail': '请输入正确的邮箱地址',
      'emailExists': '邮箱已被注册',
      'twoPwdNoConsistent': '两次密码填写不一致',
      'referral': '邀请码',
      'referralNoOprional': '（选填）请填写邀请码',
      'vcodeError': '验证码错误',
      'next': '下一步',
      'pleaseSelect': '请选择',
      'pleaseInput': '请输入',
      'signin': '登录',
      'toSignInPrefix': '已经有账号？请',
      'passwordErrorRule': '密码格式错误',
      'submit': '提交',
      'userType': '用户类型'
    }
  },
  'signin': {
    'signin_auth': {
      'login': '登录',
      'usernameEmail': '用户名／邮箱',
      'pwd': '密码',
      'vcode': '验证码',
      'usernameEmailPrompt': '请输入用户名或邮箱',
      'pwdPrompt': '请输入密码',
      'vcodePrompt': '请输入验证码',
      'forgetPwd': '忘记密码',
      'changeVcode': '换一张',
      'signup': '注册',
      'usernameEmailPwdNotMatch': '用户名／邮箱和密码不匹配！',
      'vcodeError': '验证码错误！',
      'username': '用户名',
      'usernamePrompt': '请输入用户名',
      'email': '邮箱',
      'emailPrompt': '请输入邮箱',
      'usernameEmailNotMatch': '用户名和邮箱不匹配！',
      'sendEmail': '发送邮件',
      'cancel': '取消'
    }
  },
  'greeting': {
    'greeting_auth': {
      'greetingTitle': '欢迎语标题',
      'greetingText': '欢迎语正文'
    }
  },
  'change_pwd': {
    'change_pwd_auth': {
      'changePwd': '修改密码',
      'newPwd': '新密码',
      'newPwdPrompt': '请输入新密码',
      'confirmPwd': '确认密码',
      'confirmPwdPrompt': '请输入确认密码',
      'vcode': '验证码',
      'vcodePrompt': '请输入验证码',
      'changeVcode': '换一张',
      'confirm': '确认',
      'cancel': '取消',
      'twoPwdNotMatch': '两次输入的密码不一致'
    }
  },
  'before_apply_mt4': {
    'before_apply_mt4_auth': {
      'account_apply': '交易账号申请（可跳过）',
      'apply_mt4': '申请MT4交易账号',
      'accountType': '账户类型',
      'currency': '货币',
      'leverage': '杠杆',
      'submit': '提交',
      'toSignInPrefix': '已有账号？请',
      'signin': '登录',
      'pleaseSelect': '请选择'
    }
  },
  'audit_process': {
    audit_process_auth: {
      auditProcessAudit: '审核处理',
      other: '其他信息',
      order: '排序',
      remark: '备注',
      auditProcessMore: '更多审核',
      pendingAudit: '待审核',
      doneAudit: '已完成',
      allAudit: '全部审核',
      confirm: '确定',
      submit: '提交',
      back: '返回',
      save: '保存',
      cancel: '取消',
      'pleaseSelect': '请选择',
      'pleaseEnter': '请填写',
      'pleaseInput': '请输入',
      numberMessage: '请输入数字',
      longTextMessage: '请输入xxx字符串',
      requiredMessage: '不能为空',
      audit_process_search_custom_audit: {
        'search': '搜索',
        'reset': '重置',
        searchFields: [
          {
            'type': 'input',
            'field': 'user_name',
            'placeholder': '{{auditProcessSearchDepositUsername}}',
            'width': 3
          },
          {
            'type': 'datetimerange',
            'field': 'apply_time',
            'placeholder': '{{auditProcessSearchDepositApplyTime}}',
            'width': 6
          },
          {
            'type': 'input',
            'field': 'audit_user',
            'placeholder': '{{auditProcessSearchDepositAuditUser}}',
            'width': 3
          },
          {
            'type': 'select',
            'field': 'progress_id',
            'placeholder': '{{auditProcessSearchDepositAuditProgress}}',
            'dataSource': '/api/resource/audit_process/get_audit_progress_select',
            'width': 3
          },
          {
            'type': 'select',
            'field': 'priority',
            'placeholder': '{{auditProcessSearchDepositPriority}}',
            'dataSource': '/api/resource/audit_process/get_priority_select',
            'width': 3
          }
        ]
      },
      audit_process_list_custom: {
        'operation': '操作',
        'more': '更多',
        'headerCols': [
          {
            'field': 'task_id',
            'label': '{{auditProcessDepositTaskId}}'
          },
          {
            'field': 'user_name',
            'label': '{{auditProcessDepositUsername}}'
          },
          {
            'field': 'apply_time',
            'label': '{{auditProcessDepositApplyTime}}',
            'sortable': 'custom'
          },
          {
            'field': 'audit_user',
            'label': '{{auditProcessDepositAuditUser}}'
          },
          {
            'field': 'audit_status',
            'label': '{{auditProcessDepositAuditStatus}}'
          },
          {
            'field': 'progress_id',
            'label': '{{auditProcessDepositAuditProgress}}'
          },
          {
            'field': 'priority',
            'label': '{{auditProcessDepositPriority}}',
            'sortable': 'custom'
          }
        ],
        'operateOpts': [
          {
            'label': '处理任务',
            '_auth': 'audit_process_custom_audit_task',
            'audit_process_custom_audit_task': {
              'cancelTask': '取消任务认领',
              'auditResult': '审核结果',
              'fileType': '文件类型',
              'fileStatus': '文件状态',
              'noFile': '暂无文件，',
              'clickUpload': '点击上传',
              'confirmBack': '您确认要返回吗？返回后所作操作将不会被保存，请谨慎处理！',
              'fileState': '文件状态',
              'remarks': '备注'
            }
          },
          {
            'label': '审核历史',
            '_auth': 'audit_process_custom_audit_history',
            'audit_process_custom_audit_history': {
              search: '搜索',
              reset: '重置',
              operation: '操作',
              operateOpts: [],
              headerCols: [
                {
                  'field': 'progress_id',
                  'label': '审核步骤'
                },
                {
                  'field': 'audit_time',
                  'label': '审核时间'
                },
                {
                  'field': 'audit_user',
                  'label': '审核人'
                },
                {
                  'field': 'audit_result',
                  'label': '审核结果'
                },
                {
                  'field': 'remark',
                  'label': '备注'
                }
              ],
              searchFields: [
                {
                  'type': 'select',
                  'field': 'progress_id',
                  'placeholder': '审核步骤',
                  'dataSource': '/api/resource/audit_process/get_audit_progress_select',
                  'width': 3
                },
                {
                  'type': 'datetimerange',
                  'field': 'audit_time',
                  'placeholder': '审核时间',
                  'width': 6
                },
                {
                  'type': 'input',
                  'field': 'audit_user',
                  'placeholder': '审核人',
                  'width': 3
                }
              ],
              'auditHistory': '审核历史',
              'auditProgress': '审核步骤',
              'auditTime': '审核时间',
              'auditUser': '审核人',
              'auditResult': '审核结果',
              'auditComment': '备注',
              'auditDetails': '详情',
              'auditSee': '查看'
            }
          },
          {
            'label': '优先级设置',
            '_auth': 'audit_process_custom_priority_set',
            'audit_process_custom_priority_set': {
              'prioritySet': '优先级设置',
              'priority': '优先级',
              'selectPriority': '请选择',
              'save': '保存',
              'cancel': '取消'
            }
          }
        ]
      }
    },
    audit_process_search_deposit_audit: {
      'auditProcessSearchDepositAudit': '入金审核搜索',
      'search': '搜索',
      'reset': '重置',
      searchFields: [
//            {
//              'type': 'input',
//              'field': 'task_id',
//              'placeholder': '任务ID',
//              'auth': 'audit_process_search_deposit_task_id',
//              'width': 3
//            },
        {
          'type': 'input',
          'field': 'user_name',
          'placeholder': '用户名',
          'auth': 'audit_process_search_deposit_username',
          'width': 3
        },
        {
          'type': 'datetimerange',
          'field': 'apply_time',
          'placeholder': '申请时间',
          'auth': 'audit_process_search_deposit_apply_time',
          'width': 6
        },
        {
          'type': 'input',
          'field': 'audit_user',
          'placeholder': '审核人',
          'auth': 'audit_process_search_deposit_audit_user',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_result',
//              'placeholder': '审核结果',
//              'auth': 'audit_process_search_deposit_audit_result',
//              'dataSource': '/api/resource/audit_process/get_audit_result_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'progress_id',
          'placeholder': '审核步骤',
          'dataSource': '/api/resource/audit_process/get_audit_progress_select',
          'auth': 'audit_process_search_deposit_audit_progress',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_status',
//              'placeholder': '审核状态',
//              'auth': 'audit_process_search_deposit_audit_status',
//              'dataSource': '/api/resource/audit_process/get_audit_status_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'priority',
          'placeholder': '优先级',
          'auth': 'audit_process_search_deposit_priority',
          'dataSource': '/api/resource/audit_process/get_priority_select',
          'width': 3
        },
        {
          'type': 'input',
          'field': 'account',
          'placeholder': '交易账号',
          'auth': 'audit_process_search_deposit_account',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'method',
          'placeholder': '入金方式',
          'auth': 'audit_process_search_deposit_type',
          'dataSource': '/api/resource/audit_process/get_method_select',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'currency',
          'placeholder': '入金货币',
          'auth': 'audit_process_search_deposit_currency',
          'dataSource': '/api/resource/audit_process/get_currency_select',
          'width': 3
        },
        {
          'type': 'range',
          'field': 'amount',
          'placeholder': '入金金额',
          'auth': 'audit_process_search_deposit_amount',
          'width': 6
        }
      ]
    },
    audit_process_list_deposit: {
      auditProcessListDeposit: '入金审核列表',
      'operation': '操作',
      'more': '更多',
      auditProcessDepositAudit: '入金审核',
      'headerCols': [
        {
          'field': 'task_id',
          'auth': 'audit_process_deposit_task_id',
          'label': '任务ID'
        },
        {
          'field': 'user_name',
          'auth': 'audit_process_deposit_username',
          'label': '用户名'
        },
        {
          'field': 'apply_time',
          'auth': 'audit_process_deposit_apply_time',
          'label': '申请时间',
          'sortable': 'custom'
        },
        {
          'field': 'audit_user',
          'auth': 'audit_process_deposit_audit_user',
          'label': '审核人'
        },
        {
          'field': 'audit_status',
          'auth': 'audit_process_deposit_audit_status',
          'label': '审核状态'
        },
//            {
//              'field': 'audit_result',
//              'auth': 'audit_process_deposit_audit_result',
//              'label': '审核结果'
//            },
        {
          'field': 'progress_id',
          'auth': 'audit_process_deposit_audit_progress',
          'label': '审核步骤'
        },
        {
          'field': 'priority',
          'auth': 'audit_process_deposit_priority',
          'label': '优先级',
          'sortable': 'custom'
        },
        {
          'field': 'order_ref',
          'auth': 'audit_process_deposit_no',
          'label': '入金编号'
        },
        {
          'field': 'trade_system',
          'auth': 'audit_process_deposit_trade_system',
          'label': '交易系统'
        },
        {
          'field': 'account',
          'auth': 'audit_process_deposit_account',
          'label': '交易账号'
        },
        {
          'field': 'method',
          'auth': 'audit_process_deposit_type',
          'label': '入金方式'
        },
        {
          'field': 'currency',
          'auth': 'audit_process_deposit_currency',
          'label': '货币'
        },
        {
          'field': 'amount',
          'auth': 'audit_process_deposit_amount',
          'label': '入金金额'
        }
      ],
      'operateOpts': [
        {
          'label': '处理任务',
          'auth': 'audit_process_deposit_audit_task',
          'audit_process_deposit_audit_task': {
            'cancelTask': '取消任务认领',
            'auditResult': '审核结果',
            'fileType': '文件类型',
            'fileStatus': '文件状态',
            'noFile': '暂无文件，',
            'clickUpload': '点击上传',
            'confirmBack': '您确认要返回吗？返回后所作操作将不会被保存，请谨慎处理！',
            'fileState': '文件状态',
            'remarks': '备注'
          }
        },
//            {
//              'label': '重做任务',
//              'auth': 'audit_process_deposit_redo_task',
//              'audit_process_deposit_redo_task': {}
//            },
        {
          'label': '审核历史',
          'auth': 'audit_process_deposit_audit_history',
          'audit_process_deposit_audit_history': {
            search: '搜索',
            reset: '重置',
            operation: '操作',
            operateOpts: [],
            headerCols: [
              {
                'field': 'progress_id',
                'label': '审核步骤'
              },
              {
                'field': 'audit_time',
                'label': '审核时间'
              },
              {
                'field': 'audit_user',
                'label': '审核人'
              },
              {
                'field': 'audit_result',
                'label': '审核结果'
              },
              {
                'field': 'remark',
                'label': '备注'
              }
            ],
            searchFields: [
              {
                'type': 'select',
                'field': 'progress_id',
                'placeholder': '审核步骤',
                'dataSource': '/api/resource/audit_process/get_audit_progress_select',
                'width': 3
              },
              {
                'type': 'datetimerange',
                'field': 'audit_time',
                'placeholder': '审核时间',
                'width': 6
              },
              {
                'type': 'input',
                'field': 'audit_user',
                'placeholder': '审核人',
                'width': 3
              }
            ],
            'auditHistory': '审核历史',
            'auditProgress': '审核步骤',
            'auditTime': '审核时间',
            'auditUser': '审核人',
            'auditResult': '审核结果',
            'auditComment': '备注',
            'auditDetails': '详情',
            'auditSee': '查看'
          }
        },
        {
          'label': '优先级设置',
          'auth': 'audit_process_deposit_priority_set',
          'audit_process_deposit_priority_set': {
            'prioritySet': '优先级设置',
            'priority': '优先级',
            'selectPriority': '请选择',
            'auditProcessHighest': '最高',
            'auditProcessHigh': '高',
            'auditProcessMedium': '中等',
            'auditProcessLow': '低',
            'auditProcessLowest': '最低',
            'save': '保存',
            'cancel': '取消'
          }
        }
      ]
    },
    audit_process_search_withdraw_audit: {
      'auditProcessSearchWithdrawAudit': '出金审核搜索',
      'search': '搜索',
      'reset': '重置',
      searchFields: [
//            {
//              'type': 'input',
//              'field': 'task_id',
//              'placeholder': '任务ID',
//              'auth': 'audit_process_search_withdraw_task_id',
//              'width': 3
//            },
        {
          'type': 'input',
          'field': 'user_name',
          'placeholder': '用户名',
          'auth': 'audit_process_search_withdraw_username',
          'width': 3
        },
        {
          'type': 'datetimerange',
          'field': 'apply_time',
          'placeholder': '申请时间',
          'auth': 'audit_process_search_withdraw_apply_time',
          'width': 6
        },
        {
          'type': 'input',
          'field': 'audit_user',
          'placeholder': '审核人',
          'auth': 'audit_process_search_withdraw_audit_user',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_result',
//              'placeholder': '审核结果',
//              'auth': 'audit_process_search_withdraw_audit_result',
//              'dataSource': '/api/resource/audit_process/get_audit_result_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'progress_id',
          'placeholder': '审核步骤',
          'dataSource': '/api/resource/audit_process/get_audit_progress_select',
          'auth': 'audit_process_search_withdraw_audit_progress',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_status',
//              'placeholder': '审核状态',
//              'auth': 'audit_process_search_withdraw_audit_status',
//              'dataSource': '/api/resource/audit_process/get_audit_status_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'priority',
          'placeholder': '优先级',
          'auth': 'audit_process_search_withdraw_priority',
          'dataSource': '/api/resource/audit_process/get_priority_select',
          'width': 3
        },
        {
          'type': 'input',
          'field': 'account',
          'placeholder': '交易账号',
          'auth': 'audit_process_search_withdraw_account',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'method',
          'placeholder': '出金方式',
          'auth': 'audit_process_search_withdraw_type',
          'dataSource': '/api/resource/audit_process/get_method_select',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'currency',
          'placeholder': '出金货币',
          'auth': 'audit_process_search_withdraw_currency',
          'dataSource': '/api/resource/audit_process/get_currency_select',
          'width': 3
        },
        {
          'type': 'range',
          'field': 'amount',
          'placeholder': '出金金额',
          'auth': 'audit_process_search_withdraw_amount',
          'width': 6
        }
      ]
    },
    audit_process_list_withdraw: {
      auditProcessListWithdraw: '出金审核列表',
      'operation': '操作',
      'more': '更多',
      auditProcessWithdrawAudit: '出金审核',
      'headerCols': [
        {
          'field': 'task_id',
          'auth': 'audit_process_withdraw_task_id',
          'label': '任务ID'
        },
        {
          'field': 'user_name',
          'auth': 'audit_process_withdraw_username',
          'label': '用户名'
        },
        {
          'field': 'apply_time',
          'auth': 'audit_process_withdraw_apply_time',
          'label': '申请时间',
          'sortable': 'custom'
        },
        {
          'field': 'audit_user',
          'auth': 'audit_process_withdraw_audit_user',
          'label': '审核人'
        },
        {
          'field': 'audit_status',
          'auth': 'audit_process_withdraw_audit_status',
          'label': '审核状态'
        },
//            {
//              'field': 'audit_result',
//              'auth': 'audit_process_withdraw_audit_result',
//              'label': '审核结果'
//            },
        {
          'field': 'progress_id',
          'auth': 'audit_process_withdraw_audit_progress',
          'label': '审核步骤'
        },
        {
          'field': 'priority',
          'auth': 'audit_process_withdraw_priority',
          'label': '优先级',
          'sortable': 'custom'
        },
        {
          'field': 'order_ref',
          'auth': 'audit_process_withdraw_no',
          'label': '出金编号'
        },
        {
          'field': 'trade_system',
          'auth': 'audit_process_withdraw_trade_system',
          'label': '交易系统'
        },
        {
          'field': 'account',
          'auth': 'audit_process_withdraw_account',
          'label': '交易账号'
        },
        {
          'field': 'method',
          'auth': 'audit_process_withdraw_type',
          'label': '出金方式'
        },
        {
          'field': 'currency',
          'auth': 'audit_process_withdraw_currency',
          'label': '货币'
        },
        {
          'field': 'amount',
          'auth': 'audit_process_withdraw_amount',
          'label': '出金金额'
        }
      ],
      'operateOpts': [
        {
          'label': '处理任务',
          'auth': 'audit_process_withdraw_audit_task',
          'audit_process_withdraw_audit_task': {
            'cancelTask': '取消任务认领',
            'auditResult': '审核结果',
            'fileType': '文件类型',
            'fileStatus': '文件状态',
            'noFile': '暂无文件，',
            'clickUpload': '点击上传',
            'confirmBack': '您确认要返回吗？返回后所作操作将不会被保存，请谨慎处理！',
            'fileState': '文件状态',
            'remarks': '备注'
          }
        },
//            {
//              'label': '重做任务',
//              'auth': 'audit_process_withdraw_redo_task',
//              'audit_process_withdraw_redo_task': {}
//            },
        {
          'label': '审核历史',
          'auth': 'audit_process_withdraw_audit_history',
          'audit_process_withdraw_audit_history': {
            search: '搜索',
            reset: '重置',
            operation: '操作',
            operateOpts: [],
            headerCols: [
              {
                'field': 'progress_id',
                'label': '审核步骤'
              },
              {
                'field': 'audit_time',
                'label': '审核时间'
              },
              {
                'field': 'audit_user',
                'label': '审核人'
              },
              {
                'field': 'audit_result',
                'label': '审核结果'
              },
              {
                'field': 'remark',
                'label': '备注'
              }
            ],
            searchFields: [
              {
                'type': 'select',
                'field': 'progress_id',
                'placeholder': '审核步骤',
                'dataSource': '/api/resource/audit_process/get_audit_progress_select',
                'width': 3
              },
              {
                'type': 'datetimerange',
                'field': 'audit_time',
                'placeholder': '审核时间',
                'width': 6
              },
              {
                'type': 'input',
                'field': 'audit_user',
                'placeholder': '审核人',
                'width': 3
              }
            ],
            'auditHistory': '审核历史',
            'auditProgress': '审核步骤',
            'auditTime': '审核时间',
            'auditUser': '审核人',
            'auditResult': '审核结果',
            'auditComment': '备注',
            'auditDetails': '详情',
            'auditSee': '查看'
          }
        },
        {
          'label': '优先级设置',
          'auth': 'audit_process_withdraw_priority_set',
          'audit_process_withdraw_priority_set': {
            'prioritySet': '优先级设置',
            'priority': '优先级',
            'selectPriority': '请选择',
            'auditProcessHighest': '最高',
            'auditProcessHigh': '高',
            'auditProcessMedium': '中等',
            'auditProcessLow': '低',
            'auditProcessLowest': '最低',
            'save': '保存',
            'cancel': '取消'
          }
        }
      ]
    }
  },
  'audit_history': {
    audit_history_auth: {
      other: '其他信息',
      'auditHistory': '审核任务历史',
      'order': '排序',
      'moreAudit': '更多审核',
      confirm: '确定',
      submit: '提交',
      back: '返回',
      save: '保存',
      cancel: '取消',
      'pleaseSelect': '请选择',
      'pleaseEnter': '请填写',
      'pleaseInput': '请输入',
      numberMessage: '请输入数字',
      longTextMessage: '请输入xxx字符串',
      requiredMessage: '不能为空',

      audit_history_search_custom_audit: {
        'search': '搜索',
        'reset': '重置',
        _searchFields: [
          {
            'type': 'input',
            'field': 'user_name',
            'auth': 'audit_history_search_deposit_username',
            'placeholder': '用户名',
            'width': 3
          },
          {
            'type': 'datetimerange',
            'field': 'apply_time',
            'auth': 'audit_history_search_deposit_apply_time',
            'placeholder': '申请时间',
            'width': 6
          },
          {
            'type': 'input',
            'field': 'audit_user',
            'auth': 'audit_history_search_deposit_audit_user',
            'placeholder': '审核人',
            'width': 3
          },
          {
            'type': 'select',
            'field': 'progress_id',
            'auth': 'audit_history_search_deposit_audit_progress',
            'placeholder': '审核步骤',
            'dataSource': '/api/resource/audit_history/get_audit_progress_select',
            'width': 3
          },
          {
            'type': 'select',
            'field': 'priority',
            'auth': 'audit_history_search_deposit_priority',
            'placeholder': '优先级',
            'dataSource': '/api/resource/audit_history/get_priority_select',
            'width': 3
          }
        ]
      },
      audit_history_list_custom_audit: {
        'operation': '操作',
        'more': '更多',
        '_headerCols': [
          {
            'field': 'user_name',
            'auth': 'audit_history_list_deposit_user_name',
            'label': '用户名'
          },
          {
            'field': 'apply_time',
            'auth': 'audit_history_list_deposit_apply_time',
            'label': '申请时间',
            'sortable': 'custom'
          },
          {
            'field': 'finished_time',
            'auth': 'audit_history_list_deposit_finished_time',
            'label': '审核完成时间',
            'sortable': 'custom'
          },
          {
            'field': 'audit_user',
            'auth': 'audit_history_list_deposit_audit_user',
            'label': '审核人'
          },
          {
            'field': 'progress_id',
            'auth': 'audit_history_list_deposit_audit_progress',
            'label': '审核步骤'
          },
          {
            'field': 'audit_status',
            'auth': 'audit_history_list_deposit_audit_status',
            'label': '审核状态'
          },
          {
            'field': 'audit_result',
            'auth': 'audit_history_list_deposit_result',
            'label': '审核结果'
          },
          {
            'field': 'task_id',
            'auth': 'audit_history_list_deposit_task_id',
            'label': '任务ID'
          },
          {
            'field': 'priority',
            'auth': 'audit_history_list_deposit_priority',
            'label': '优先级',
            'sortable': 'custom'
          }
        ],
        '_operateOpts': [
          {
            'label': '查看详情',
            'auth': 'audit_history_custom_see_more',
            'audit_history_custom_see_more': {
              'cancelTask': '取消任务认领',
              'auditResult': '审核结果',
              'fileType': '文件类型',
              'fileStatus': '文件状态',
              'noFile': '暂无文件，',
              'clickUpload': '点击上传',
              'confirmBack': '您确认要返回吗？返回后所作操作将不会被保存，请谨慎处理！',
              'fileState': '文件状态',
              'remarks': '备注'
            }
          },
          {
            'label': '优先级设置',
            'auth': 'audit_history_custom_priority_set',
            'audit_history_custom_priority_set': {
              'prioritySet': '优先级设置',
              'priority': '优先级',
              'selectPriority': '请选择',
              'save': '保存',
              'cancel': '取消'
            }
          }
        ]
      }
    },
    audit_history_search_deposit_audit: {
      'search': '搜索',
      'reset': '重置',
      searchFields: [
//            {
//              'type': 'input',
//              'field': 'task_id',
//              'placeholder': '任务ID',
//              'auth': 'audit_history_search_deposit_task_id',
//              'width': 3
//            },
        {
          'type': 'input',
          'field': 'user_name',
          'placeholder': '用户名',
          'auth': 'audit_history_search_deposit_username',
          'width': 3
        },
        {
          'type': 'datetimerange',
          'field': 'apply_time',
          'placeholder': '申请时间',
          'auth': 'audit_history_search_deposit_apply_time',
          'width': 6
        },
        {
          'type': 'input',
          'field': 'audit_user',
          'placeholder': '审核人',
          'auth': 'audit_history_search_deposit_audit_user',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_result',
//              'placeholder': '审核结果',
//              'auth': 'audit_history_search_deposit_audit_result',
//              'dataSource': '/api/resource/audit_history/get_audit_result_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'progress_id',
          'placeholder': '审核步骤',
          'dataSource': '/api/resource/audit_history/get_audit_progress_select',
          'auth': 'audit_history_search_deposit_audit_progress',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_status',
//              'placeholder': '审核状态',
//              'auth': 'audit_history_search_deposit_audit_status',
//              'dataSource': '/api/resource/audit_history/get_audit_status_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'priority',
          'placeholder': '优先级',
          'auth': 'audit_history_search_deposit_priority',
          'dataSource': '/api/resource/audit_history/get_priority_select',
          'width': 3
        },
        {
          'type': 'input',
          'field': 'account',
          'placeholder': '交易账号',
          'auth': 'audit_history_search_deposit_account',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'method',
          'placeholder': '入金方式',
          'auth': 'audit_history_search_deposit_type',
          'dataSource': '/api/resource/audit_history/get_method_select',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'currency',
          'placeholder': '入金货币',
          'auth': 'audit_history_search_deposit_currency',
          'dataSource': '/api/resource/audit_history/get_currency_select',
          'width': 3
        },
        {
          'type': 'range',
          'field': 'amount',
          'placeholder': '入金金额',
          'auth': 'audit_history_search_deposit_amount',
          'width': 6
        }
      ]
    },
    audit_history_list_deposit_audit: {
      'operation': '操作',
      'more': '更多',
      depositAudit: '入金审核',
      'headerCols': [
        {
          'field': 'user_name',
          'auth': 'audit_history_list_deposit_username',
          'label': '用户名'
        },
        {
          'field': 'apply_time',
          'auth': 'audit_history_list_deposit_apply_time',
          'label': '申请时间',
          'sortable': 'custom'
        },
        {
          'field': 'finished_time',
          'auth': 'audit_history_list_deposit_finished_time',
          'label': '审核完成时间',
          'sortable': 'custom'
        },
        {
          'field': 'audit_user',
          'auth': 'audit_history_list_deposit_audit_user',
          'label': '审核人'
        },
        {
          'field': 'progress_id',
          'auth': 'audit_history_list_deposit_audit_progress',
          'label': '审核步骤'
        },
        {
          'field': 'audit_status',
          'auth': 'audit_history_list_deposit_audit_status',
          'label': '审核状态'
        },
        {
          'field': 'audit_result',
          'auth': 'audit_history_list_deposit_audit_result',
          'label': '审核结果'
        },
        {
          'field': 'task_id',
          'auth': 'audit_history_list_deposit_task_id',
          'label': '任务ID'
        },
        {
          'field': 'priority',
          'auth': 'audit_history_list_deposit_priority',
          'label': '优先级',
          'sortable': 'custom'
        },
        {
          'field': 'order_ref',
          'auth': 'audit_history_list_deposit_no',
          'label': '入金编号'
        },
        {
          'field': 'trade_system',
          'auth': 'audit_history_list_deposit_trade_system',
          'label': '交易系统'
        },
        {
          'field': 'account',
          'auth': 'audit_history_list_deposit_account',
          'label': '交易账号'
        },
        {
          'field': 'method',
          'auth': 'audit_history_list_deposit_type',
          'label': '入金方式'
        },
        {
          'field': 'currency',
          'auth': 'audit_history_list_deposit_currency',
          'label': '货币'
        },
        {
          'field': 'amount',
          'auth': 'audit_history_list_deposit_amount',
          'label': '入金金额'
        }
      ],
      'operateOpts': [
        {
          'label': '查看详情',
          'auth': 'audit_history_list_deposit_see_more',
          'audit_history_list_deposit_see_more': {
            'cancelTask': '取消任务认领',
            'auditResult': '审核结果',
            'fileType': '文件类型',
            'fileStatus': '文件状态',
            'noFile': '暂无文件，',
            'clickUpload': '点击上传',
            'confirmBack': '您确认要返回吗？返回后所作操作将不会被保存，请谨慎处理！',
            'fileState': '文件状态',
            'remarks': '备注'
          }
        },
        {
          'label': '优先级设置',
          'auth': 'audit_history_list_deposit_priority_set',
          'audit_history_list_deposit_priority_set': {
            'prioritySet': '优先级设置',
            'priority': '优先级',
            'selectPriority': '请选择',
            'save': '保存',
            'cancel': '取消'
          }
        }
      ]
    },
    audit_history_search_withdraw_audit: {
      'search': '搜索',
      'reset': '重置',
      searchFields: [
//            {
//              'type': 'input',
//              'field': 'task_id',
//              'placeholder': '任务ID',
//              'auth': 'audit_history_search_withdraw_task_id',
//              'width': 3
//            },
        {
          'type': 'input',
          'field': 'user_name',
          'placeholder': '用户名',
          'auth': 'audit_history_search_withdraw_username',
          'width': 3
        },
        {
          'type': 'datetimerange',
          'field': 'apply_time',
          'placeholder': '申请时间',
          'auth': 'audit_history_search_withdraw_apply_time',
          'width': 6
        },
        {
          'type': 'input',
          'field': 'audit_user',
          'placeholder': '审核人',
          'auth': 'audit_history_search_withdraw_audit_user',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_result',
//              'placeholder': '审核结果',
//              'auth': 'audit_history_search_withdraw_audit_result',
//              'dataSource': '/api/resource/audit_history/get_audit_result_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'progress_id',
          'placeholder': '审核步骤',
          'dataSource': '/api/resource/audit_history/get_audit_progress_select',
          'auth': 'audit_history_search_withdraw_audit_progress',
          'width': 3
        },
//            {
//              'type': 'select',
//              'field': 'audit_status',
//              'placeholder': '审核状态',
//              'auth': 'audit_history_search_withdraw_audit_status',
//              'dataSource': '/api/resource/audit_history/get_audit_status_select',
//              'width': 3
//            },
        {
          'type': 'select',
          'field': 'priority',
          'placeholder': '优先级',
          'auth': 'audit_history_search_withdraw_priority',
          'dataSource': '/api/resource/audit_history/get_priority_select',
          'width': 3
        },
        {
          'type': 'input',
          'field': 'account',
          'placeholder': '交易账号',
          'auth': 'audit_history_search_withdraw_account',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'method',
          'placeholder': '出金方式',
          'auth': 'audit_history_search_withdraw_type',
          'dataSource': '/api/resource/audit_history/get_method_select',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'currency',
          'placeholder': '出金货币',
          'auth': 'audit_history_search_withdraw_currency',
          'dataSource': '/api/resource/audit_history/get_currency_select',
          'width': 3
        },
        {
          'type': 'range',
          'field': 'amount',
          'placeholder': '出金金额',
          'auth': 'audit_history_search_withdraw_amount',
          'width': 6
        }
      ]
    },
    audit_history_list_withdraw_audit: {
      'operation': '操作',
      'more': '更多',
      withdrawAudit: '出金审核',
      'headerCols': [
        {
          'field': 'user_name',
          'auth': 'audit_history_list_withdraw_username',
          'label': '用户名'
        },
        {
          'field': 'apply_time',
          'auth': 'audit_history_list_withdraw_apply_time',
          'label': '申请时间',
          'sortable': 'custom'
        },
        {
          'field': 'finished_time',
          'auth': 'audit_history_list_withdraw_finished_time',
          'label': '审核完成时间',
          'sortable': 'custom'
        },
        {
          'field': 'audit_user',
          'auth': 'audit_history_list_withdraw_audit_user',
          'label': '审核人'
        },
        {
          'field': 'progress_id',
          'auth': 'audit_history_list_withdraw_audit_progress',
          'label': '审核步骤'
        },
        {
          'field': 'audit_status',
          'auth': 'audit_history_list_withdraw_audit_status',
          'label': '审核状态'
        },
        {
          'field': 'audit_result',
          'auth': 'audit_history_list_withdraw_audit_result',
          'label': '审核结果'
        },
        {
          'field': 'task_id',
          'auth': 'audit_history_list_withdraw_task_id',
          'label': '任务ID'
        },
        {
          'field': 'priority',
          'auth': 'audit_history_list_withdraw_priority',
          'label': '优先级',
          'sortable': 'custom'
        },
        {
          'field': 'order_ref',
          'auth': 'audit_history_list_withdraw_no',
          'label': '出金编号'
        },
        {
          'field': 'trade_system',
          'auth': 'audit_history_list_withdraw_trade_system',
          'label': '交易系统'
        },
        {
          'field': 'account',
          'auth': 'audit_history_list_withdraw_account',
          'label': '交易账号'
        },
        {
          'field': 'method',
          'auth': 'audit_history_list_withdraw_type',
          'label': '出金方式'
        },
        {
          'field': 'currency',
          'auth': 'audit_history_list_withdraw_currency',
          'label': '货币'
        },
        {
          'field': 'amount',
          'auth': 'audit_history_list_withdraw_amount',
          'label': '出金金额'
        }
      ],
      'operateOpts': [
        {
          'label': '查看详情',
          'auth': 'audit_history_list_withdraw_see_more',
          'audit_history_list_withdraw_see_more': {
            'cancelTask': '取消任务认领',
            'auditResult': '审核结果',
            'fileType': '文件类型',
            'fileStatus': '文件状态',
            'noFile': '暂无文件，',
            'clickUpload': '点击上传',
            'confirmBack': '您确认要返回吗？返回后所作操作将不会被保存，请谨慎处理！',
            'fileState': '文件状态',
            'remarks': '备注'
          }
        },
        {
          'label': '优先级设置',
          'auth': 'audit_history_list_withdraw_priority_set',
          'audit_history_list_withdraw_priority_set': {
            'prioritySet': '优先级设置',
            'priority': '优先级',
            'selectPriority': '请选择',
            'save': '保存',
            'cancel': '取消'
          }
        }
      ]
    }
  },
  'audit_start': {
    'audit_start_auth': {
      'confirm': '确定',
      'save': '保存',
      'cancel': '取消',
      'back': '返回',
      'submit': '提交',
      'auditStartAuditStart': '审核触发',
      'auditStartSystemAudit': '系统审核',
      'auditStartDiyAudit': '自定义审核',
      numberMessage: '请输入数字',
      longTextMessage: '请输入xxx字符串',
      requiredMessage: '不能为空'
    },
    'audit_start_deposit': {
      'deposit': '存入资金',
      'auditStartDepositNotes': '帮助客…存入资金'
    },
    'audit_start_withdraw': {
      'withdraw': '取出资金',
      'auditStartWithdrawNotes': '帮助客…取出资金'
    }
  },
  'audit_set': {
    audit_set_auth: {
      'confirm': '确定',
      'save': '保存',
      'cancel': '取消',
      'add': '添加',
      'pleaseInput': '请输入',
      'pleaseSelect': '请选择',
      'auditSet': '审核设置',
      'operation': '操作',
      'colon': '：',
      'more': '更多',
      'addUser': '添加用户',
      'addUserSelectedUser': '已选用户',
      'fileTypeNotRight': '文件类型不正确！',
      'back': '返回'
    },
    audit_set_add_new_audit: {
      'auditNameErrorRule': '1-25个字符，设置后可以修改！',
      'uniqueNameErrorRule': '1-128个字符，只可以……，填写后不可更改！',
      'uniqueNameExist': '唯一名已存在',
      'textLength128': '最多输入128个字符',
      'noAllowSpace': '不可输入空格',
      'auditSetAddNewAudit': '添加新审核',
      'auditName': '审核名称',
      'uniqueName': '唯一名',
      'description': '描述',
      'systemKey': '系统识别该自定义审核的唯一的名称。'
    },
    audit_set_search: {
      'search': '搜索',
      'reset': '重置',

      searchFields: [
        {
          auth: 'audit_set_search_unique_name',
          type: 'input',
          width: 3,
          field: 'name',
          placeholder: '唯一名'
        },
        {
          auth: 'audit_set_search_workflow_type',
          type: 'select',
          width: 3,
          field: 'audit_type',
          dataSource: '/api/resource/audit_setting/get_audit_type_select',
          placeholder: '审核类型'
        },
        {
          auth: 'audit_set_search_create_time',
          type: 'datetimerange',
          width: 6,
          field: 'ctime',
          placeholder: '创建时间'
        },
        {
          auth: 'audit_set_search_status',
          type: 'select',
          width: 3,
          field: 'status',
          placeholder: '状态',
          dataSource: '/api/resource/audit_setting/get_audit_status_select'
        }
      ]
    },
    audit_set_list: {
      headerCols: [
        {
          label: '审核名称',
          field: 'label',
          auth: 'audit_set_list_workflow_name'
        },
        {
          label: '唯一名',
          field: 'name',
          auth: 'audit_set_list_unique_name'
        },
        {
          label: '审核类型',
          field: 'audit_type',
          auth: 'audit_set_list_workflow_type'
        },
        {
          label: '任务',
          field: 'task_number',
          auth: 'audit_set_list_task'
        },
        {
          label: '创建时间',
          field: 'ctime',
          auth: 'audit_set_list_create_time'
        },
        {
          label: '状态',
          field: 'status',
          auth: 'audit_set_list_status'
        },
        {
          label: '描述',
          field: 'description',
          auth: 'audit_set_list_description'
        }
      ],
      operateOpts: [
        {
          label: '审核基础信息',
          auth: 'audit_set_audit_info',
          audit_set_audit_info: {
            'auditSetAuditInfo': '审核基础信息',
            'auditName': '审核名称',
            'uniqueName': '唯一名',
            'description': '描述',
            'systemKey': '系统识别该自定义审核的唯一的名称。',
            'auditNameErrorRule': '1-25个字符，设置后可以修改！',
            'uniqueNameErrorRule': '1-128个字符，只可以……，填写后不可更改！',
            'uniqueNameExist': '唯一名已存在',
            'textLength128': '最多输入128个字符',
            'noAllowSpace': '不可输入空格',
            'auditSetAddNewAudit': '添加新审核'
          }
        },
        {
          label: '流程及审核人设置',
          auth: 'audit_set_flow_people_set',
          audit_set_flow_people_set: {
            'auditSetFlowPeopleSet': '流程及审核人设置',
            'editPageInfo': '编辑页面及信息',
            'copyPage': '复制页面',
            'deletePage': '删除页面',
            'auditName': '审核名称',
            'auditType': '审核类型',
            'diy': '自定义',
            'system': '系统',
            'taskType': '任务类型',
            'task': '任务',
            'createTime': '创建时间',
            'description': '描述',
            'back': '返回',
            'save': '保存',
            'saveSucceed': '保存成功',
            'netErrorSaveFail': '网络错误，保存失败！',
            'confirmBack': '您确定要返回上级页面吗？返回后所作的修改将……，情慎重处理！',
            'confirm': '确定',
            'cancel': '取消',
            'stepDad': '上级步骤',
            'stepDescription': '步骤描述',
            'auditCondition': '审核条件',
            'auditContent': '审核内容',
            'auditPeople': '审核人',
            'noticePeople': '通知人',
            'seeMore': '查看详情',
            'decisionWorkflow': '决定工作流流程，该审核步骤跟在哪一……会流转到该步骤',
            'auditConditionSetDescription': '决定工作流流程，上一个步骤进行怎样的操作后流转到该步骤',
            'stepInfoEdit': '步骤信息编辑',
            'auditPageEdit': '审核页面编辑',
            'copyStep': '复制步骤',
            'deleteStep': '删除步骤',
            'confirmDeleteStep': '您确定要删除该审核步骤吗？删除……请慎重处理！',
            'deleteSucceed': '删除成功！',
            'netErrorDeleteFail': '网络错误，删除失败！',
            'createStep': '创建审核步骤',
            'editStep': '编辑审核步骤',
            'auditInfoSet': '审核基础信息设置',
            'stepName': '步骤名称',
            'stepFunction': '步骤功能',
            'auditConditionSet': '审核条件设置',
            'addCondition': '添加审核条件',
            'condition': '条件',
            'deleteCondition': '删除条件',
            'big': '大于',
            'equal': '等于',
            'small': '小于',
            'auditContentSet': '审核内容设置',
            'contentMustSet': '审核内容必须设置，在审核文件或审核信……核内容。',
            'auditObject': '审核对象',
            'auditTemplate': '审核模板',
            'checkAll': '全部项',
            'checkPart': '部分项',
            'termSet': '项设置',
            'auditTerm': '审核项',
            'auditResultSet': '审核结果设置',
            'addAction': '添加操作',
            'editAction': '编辑操作',
            'fieldName': '字段名称',
            'inputType': '输入方式',
            'createSucceed': '添加成功',
            'netErrorAddFail': '网络错误，添加失败',
            'singleLineInputBox': '单行输入框',
            'multipleInputBox': '多行输入框',
            'radio': '单选框',
            'checkbox': '多选框',
            'numberInputBox': '数字输入框',
            'dateRange': '日期选择器',
            'info': '说明文字',
            'textLengthErrorLong': '最多输入10000个字符',
            'clause': '条款',
            'file': '文件',
            'dragFile': '将文件拖到此处，或',
            'clickUpload': '点击上传',
            'dragClickUploadPrefix': '文件拖放到此处，或',
            'dragClickUploadSuffix': '点击上传',
            'formatRestrictionsNarrow': '只能上传word/pdf文件，且不超过500kb',
            'clauseFileInfo': '只能上传word/pdf文件，且不超过500kb',
            'pleaseUploadFile': '请上传文件',
//                'singleLineInputBox': '单行输入框',
            'multilineInputBox': '多行输入框',
//                'radio': '单选框',
            'checkBox': '多选框',
//                'dateRange': '日期区间',
            'enclosure': '附件',
            'addOption': '添加选项',
            'title': '标题',
            'promptText': '提示文字',
            'inputTitle': '请填写标题',
            'inputPromptText': '请填写提示文字',
            'verification': '验证',
            'dateType': '日期类型',
            'yMDTM': '年-月-日 时:分',
            'yMD': '年-月-日',
            'limit200MoreTerm40Character': '最多200项，每项最多40个字符',
            'selectTerm': '选项',
            'enable': '启用',
            'pleaseEnter': '请输入',
            'qianhouNoSpace': '内容前后不允许有空格',
            'length30LimitNoSpace': '内容不允许有空格',
            'text0To10Limit': '0-10个字符',
            'confirmAuditResult': '您确认要删除该审核结果吗？删除……请慎重操作！',
            'resultUsed': '该审核结果已被运用于工作流中，无法删除！请修改后重试！',
            'required': '该项为必填项！',
            'textLength128': '最多输入128个字符',
            'textLength10000': '最多输入10000个字符',
            'minOne': '审核文件及审核信息必须至少完成一项的输入！',
            'numberOnly': '时长必须为数字值！',
            'addSucceed': '审核步骤创建成功！',
            'auditPageName': '页面名称',
            'canNotSetCondition': '选择上级步骤后添加审核条件',
            'noOption': '无可用选项',
            'infoTemplate': '纯信息展示',
            'pictureInfoTemplate': '图片文件及信息展示',
            'resourceInfoTemplate': '系统已有资源及信息对比',
            'auditSetAuditFormSet': '表单设置',
            'diyAdd': '自定义添加',
            'systemDefault': '系统自带的',
            'copyExist': '复制已有的',
            'workflow': '工作流',
            'selectWorkflow': '请选择工作流',
            'diyAuditEditor': '自定义审核编辑器',
            'prompt': '提示',
            'setNotSave': '退出后，设置将不会被保存！',
            'preview': '预览',
            'saveEnable': '保存并启用',
            'workflowInfo': '审核信息',
            'workflowName': '审核名称',
            'inputWorkflowName': '请填写审核名称',
            'inputDescription': '请填写描述',
            'addControlCreatorAudit': '请从左边点击……的审核表单',
            'controlBase': '控件库',
            'digitalInputBox': '数字输入框',
            'caption': '说明文字',
            'controlSet': '控件设置',
            'content1000More': '内容最多可填写1000个字符',
            'singleLineInputBoxRule': '长度在0-1000个字符（单行输入框规则）',
            'content10000More': '内容最多可填写10000个字符',
            'requited': '必填',
            'requitedRule': '该项为必填项！',
            'unit': '单位',
            'inputUnit': '请填写单位',
            'pleaseSetAsCondition': '该单选组件已……中调整审核人',
            'selectTermRule': '长度在0-40个字符（ 选项的规则）',
            '200MoreTerm40Character': '最多200项，每项最多40个字符',
            'inputSelectTerm': '请填写选项',
            'lengthCalculation': '计算时长',
            'formatRestrictionsWide': '只能上传jpg……过20M',
            'inputCaption': '请输入说明文字',
            'jumpLink': '跳转链接',
            'inputJumpLink': '请输入跳转链接（选填）',
            'show': '显示',
            'notShowInAudit': '不显示在审核页面',
            'check': '查看',
            'auditIcon': '审核图标',
            'confirmDeletePage': '您确认要删除该审核触发页面么？删除后可能导致审核流程无法触发，请慎重操作！',
            'add': '添加',
            'auditFormSet': '表单设置',
            'company': '单位',
            'inputConpany': '请填写单位',
            'cascadeInquire': '级联查询',
            'addRadio': '添加单选框',
            'userNotExistent': '用户不存在',
            'followField': '跟随字段',
            'optionSource': '选项来源',
            'showField': '显示字段',
            'no': '暂无数据',
            'dataSource': '数据源',
            'delete': '删除',
            'deleteFail': '删除失败',
            'canNotDeleteCascadeRadio': '无法删除，级联选择框至少有一个单选框！',
            'username': '用户名',
            'account': '交易账号',
            'code': 'Code',
            'pammMam': 'AMM/MAM账号',
            'currency': '货币',
            'attorney': '操盘手',
            'pammMaster': '基金经理',
            'codeProfitShare': 'Code分润比例',
            'managementFee': '管理费',
            'userNameExistValidate': '用户名存在验证',
            'getMT4Account': '获取MT4账号'
          }
        },
        {
          label: '表单设置',
          auth: 'audit_set_form_set',
          audit_set_form_set: {
            'auditSetAuditFormSet': '表单设置',
            'diyAdd': '自定义添加',
            'auditName': '审核名称',
            'task': '任务',
            'createTime': '创建时间',
            'systemDefault': '系统自带的',
            'copyExist': '复制已有的',
            'workflow': '工作流',
            'selectWorkflow': '请选择工作流',
            'confirm': '确认',
            'cancel': '取消',
            'diyAuditEditor': '自定义审核编辑器',
            'back': '返回',
            'prompt': '提示',
            'setNotSave': '退出后，设置将不会被保存！',
            'preview': '预览',
            'saveEnable': '保存并启用',
            'workflowInfo': '审核信息',
            'workflowName': '审核名称',
            'inputWorkflowName': '请填写审核名称',
            'description': '描述',
            'inputDescription': '请填写描述',
            'clickUpload': '点击上传',
            'formatRestrictionsNarrow': '只能上传jpg／png……80*80px',
            'addControlCreatorAudit': '请从左边点击……的审核表单',
            'controlBase': '控件库',
            'singleLineInputBox': '单行输入框',
            'multilineInputBox': '多行输入框',
            'digitalInputBox': '数字输入框',
            'radio': '单选框',
            'checkbox': '多选框',
            'dateRange': '日期区间',
            'enclosure': '附件',
            'caption': '说明文字',
            'controlSet': '控件设置',
            'title': '标题',
            'promptText': '提示文字',
            'inputTitle': '请填写标题',
            'inputPromptText': '请填写提示文字',
            'content1000More': '内容最多可填写1000个字符',
            'singleLineInputBoxRule': '长度在0-1000个字符（单行输入框规则）',
            'content10000More': '内容最多可填写10000个字符',
            'verification': '验证',
            'requited': '必填',
            'requitedRule': '该项为必填项！',
            'unit': '单位',
            'inputUnit': '请填写单位',
            'pleaseSetAsCondition': '该单选组件已……中调整审核人',
            'selectTerm': '选项',
            'selectTermRule': '长度在0-40个字符（ 选项的规则）',
            '200MoreTerm40Character': '最多200项，每项最多40个字符',
            'inputSelectTerm': '请填写选项',
            'dateType': '日期类型',
            'yMDTM': '年-月-日 时:分',
            'yMD': '年-月-日',
            'lengthCalculation': '计算时长',
            'enable': '启用',
            'formatRestrictionsWide': '只能上传jpg……过20M',
            'dragFile': '将文件拖到此处，或',
            'inputCaption': '请输入说明文字',
            'jumpLink': '跳转链接',
            'inputJumpLink': '请输入跳转链接（选填）',
            'show': '显示',
            'notShowInAudit': '不显示在审核页面',
            'taskType': '任务类型',
            'check': '查看',
            'auditIcon': '审核图标',
            'editPageInfo': '编辑页面及信息',
            'copyPage': '复制页面',
            'deletePage': '删除页面',
            'auditPageName': '页面名称',
            'confirmDeletePage': '您确认要删除该审核触发页面么？删除后可能导致审核流程无法触发，请慎重操作！',
            'deleteSucceed': '删除成功！',
            'netErrorDeleteFail': '网络错误，删除失败！',
            'add': '添加',
            'auditFormSet': '表单设置',
            'multipleInputBox': '多行输入框',
            'text0To10Limit': '0-10个字符',
            'text0To40Limit': '0-40个字符',
            'textLength128': '最多输入128个字符',
            'required': '必填',
            'company': '单位',
            'inputConpany': '请填写单位',
            'limit200MoreTerm40Character': '最多200项，每项最多40个字符',
            'cascadeInquire': '级联查询',
            'addRadio': '添加单选框',
            'userNotExistent': '用户不存在',
            'followField': '跟随字段',
            'optionSource': '选项来源',
            'showField': '显示字段',
            'no': '暂无数据',
            'dataSource': '数据源',
            'delete': '删除',
            'deleteFail': '删除失败',
            'canNotDeleteCascadeRadio': '无法删除，级联选择框至少有一个单选框！',
            'username': '用户名',
            'account': '交易账号',
            'code': 'Code',
            'pammMam': 'AMM/MAM账号',
            'currency': '货币',
            'attorney': '操盘手',
            'pammMaster': '基金经理',
            'codeProfitShare': 'Code分润比例',
            'managementFee': '管理费',
            'userNameExistValidate': '用户名存在验证',
            'getMT4Account': '获取MT4账号'
          }
        },
        {
          label: '停用',
          auth: 'audit_set_disable',
          audit_set_disable: {
            'disable': '停用',
            'disableFail': '停用失败',
            'canNotDisable': '无法停用工……改后重试！',
            'confirm': '确定',
            'prompt': '提示',
            'confirmDisable': '您确认要停用……吗？',
            'cancel': '取消',
            'disableWorkflowSucceed': '停用工作流成功！',
            'netErrorDisableFail': '网络错误,停用失败！'
          }
        },
        {
          label: '启用',
          auth: 'audit_set_enable',
          audit_set_enable: {
            'enable': '启用',
            'enableWorkflowSucceed': '启用工作流成功！',
            'netErrorEnableFail': '网络错误，启用失败！'
          }
        },
        {
          label: '删除',
          auth: 'audit_set_delete',
          audit_set_delete: {
            'delete': '删除',
            'deleteFail': '删除失败',
            'canNotDelete': '无法通用工作流……修改后重试！',
            'confirm': '确定',
            'prompt': '提示',
            'confirmDelete': '您确认要删除……吗？',
            'cancel': '取消',
            'deleteWorkflowSucceed': '删除工作流成功！',
            'netErrorDeleteFail': '网络错误,删除失败！'
          }
        }
      ]
    },
    audit_set_add_user_search: {
      'search': '搜索',
      'reset': '重置',
      'addUserSearchAddUserSearch': '查找并添加用户列表',
      searchFields: [
        {
          type: 'input',
          width: 3,
          placeholder: '用户名',
          auth: 'audit_set_add_user_search_username',
          field: 'user_name'
        },
        {
          type: 'input',
          width: 3,
          placeholder: '邮箱',
          auth: 'audit_set_add_user_search_email',
          field: 'email'
        },
        {
          type: 'select',
          width: 3,
          placeholder: '用户类型',
          auth: 'audit_set_add_user_search_user_type',
          field: 'user_type',
          dataSource: '/api/rbac/user/get_user_type_select'
        },
        {
          type: 'select',
          width: 3,
          placeholder: '所在用户组',
          auth: 'audit_set_add_user_search_user_group',
          field: 'user_group',
          dataSource: '/api/rbac/user/get_group_select'
        },
        {
          type: 'select',
          width: 3,
          placeholder: '角色',
          auth: 'audit_set_add_user_search_role',
          field: 'user_role',
          dataSource: '/api/rbac/user/get_role_select'
        }
      ]
    },
    audit_set_add_user_list: {
      multipleSelect: true,
      operateOpts: [],
      headerCols: [
        {
          field: 'user_name',
          label: '用户名',
          auth: 'audit_set_add_user_list_username'
        },
        {
          field: 'email',
          label: '邮箱',
          auth: 'audit_set_add_user_list_email'
        },
        {
          field: 'user_type',
          label: '用户类型',
          auth: 'audit_set_add_user_list_user_type'
        },
        {
          field: 'user_group',
          label: '所在用户组',
          auth: 'audit_set_add_user_list_user_group'
        },
        {
          field: 'user_role',
          label: '角色',
          auth: 'audit_set_add_user_list_role'
        },
        {
          field: 'create_time',
          label: '创建时间',
          auth: 'audit_set_add_user_list_create_time'
        },
        {
          field: 'status',
          label: '状态',
          auth: 'audit_set_add_user_list_status'
        }
      ],
      'addUserSearchAddUserList': '查找并添加用户列表',
      'addUserSearchAddUser': '查找并添加用户',
      'setVar': '设置变量',
      'total': '共',
      'selected': '已选',
      'term': '项',
      'pageOptionOne': '10条／页',
      'pageOptionTwo': '15条／页',
      'pageOptionThree': '20条／页',
      'pageOptionFour': '50条／页',
      'pageOptionFive': '100条／页',
      'goTo': '前往',
      'page': '页',
      'more': '更多',
      'noRecord': '暂无数据，请搜索',
      'searchNoResult': '没有搜到符合条件的记录',
      audit_set_set_var_add_to_selected_user: '添加到已选用户列表'
    },
    audit_set_direct_dad_user_group: {
      'addUserDirectDadUserGroup': '直属父级-用户组层级'
    },
    audit_set_all_children_user_group: {
      'addUserAllChildrenUserGroup': '全部下级-用户组层级'
    },
    audit_set_direct_children_user_group: {
      'addUserDirectChildrenUserGroup': '直属下级-用户组层级'
    }
  },
  'user_profile_setting': {
    user_profile_setting_auth: {
      'addOption': '添加选项',
      'title': '标题',
      'promptText': '提示文字',
      'inputTitle': '请填写标题',
      'inputPromptText': '请填写提示文字',
      'verification': '验证',
      'dateType': '日期类型',
      'yMDTM': '年-月-日 时:分',
      'yMD': '年-月-日',
      'limit200MoreTerm40Character': '最多200项，每项最多40个字符',
      'selectTerm': '选项',
      'enable': '启用',
      'userProfileSetting': '用户资料设置',
      'diyFieldSetting': '自定义信息设置',
      'newUserProfile': '新建用户资料',
      'profileName': '名称',
      'profileName0': '个人用户资料',
      'profileName1': '公司用户资料',
      'pleaseEnter': '请输入',
      'qianhouNoSpace': '内容前后不允许有空格',
      'length30LimitNoSpace': '内容不允许有空格',
      'pleaseSelect': '请选择',
      'pleaseEnterName': '请输入名称',
      'nameExist': '名称已存在，请重新输入',
      'textLengthErrorShort': '最多输入128个字符',
      'save': '保存',
      'loading': '加载中……',
      'text0To10Limit': '0-10个字符',
      'text0To40Limit': '0-40个字符',
      'saveSucceed': '保存成功',
      'saveFail': '网络错误，保存失败',
      'deleteFail': '删除失败',
      'deleteFailProfileText': '该用户资料正在使用……',
      'confirm': '确定',
      'confirmDeleteProfile': '删除用户资料',
      'confirmDeleteProfileText': '您确认删除该用户资料吗？',
      'cancel': '取消',
      'deleteSucceed': '删除成功',
      'netErrorDeleteFail': '网络错误，删除失败',
      'addDiyCategory': '添加自定义分类',
      'backToUserProfile': '返回用户资料设置',
      'deleteFailCategoryText': '该自定义分类下有自定义信息，不可删除！',
      'addFail': '添加失败',
      'addFailText': '最多添加50个自定义信息！',
      'deleteFailDiyText': '该自定义资料正在被使用……',
      'confirmDeleteDiy': '删除自定义信息',
      'confirmDeleteDiyText': '您确认要删除该自定义信息吗？',
      'diyField': '自定义信息',
      'diyFieldType': '类型',
      'pleaseEnterDiyField': '请输入自定义信息',
      'diyFieldExist': '信息已存在，请重新输入',
      'pleaseSelectDiyFieldType': '请选择类型',
      'singleLineInputBox': '单行输入框',
      'multipleInputBox': '多行输入框',
      'radio': '单选框',
      'checkbox': '多选框',
      'numberInputBox': '数字输入框',
      'dateRange': '日期选择器',
      'info': '说明文字',
      'textLengthErrorLong': '最多输入10000个字符',
      'clause': '条款',
      'file': '文件',
      'dragFile': '将文件拖到此处，或',
      'clickUpload': '点击上传',
      'dragClickUploadPrefix': '文件拖放到此处，或',
      'dragClickUploadSuffix': '点击上传',
      'formatRestrictionsNarrow': '只能上传word/pdf文件，且不超过500kb',
      'clauseFileInfo': '只能上传word/pdf文件，且不超过500kb',
      'pleaseUploadFile': '请上传文件',
      'enOnly': '只能输入英文、数字、特殊字符',
      'textLength30': '最多可以输入30个字符'
    },
    user_profile_setting_basic_info: {
      'userProfileBasicInfo': '基本信息',
      'required': '必填'
    },
    user_profile_setting_job_info: {
      'userProfileJobInfo': '职业与交易经验',
      'textLengthErrorShort': '最多输入128个字符',
      'option': '选项',
      'add': '添加',
      'required': '必填'
    },
    user_profile_setting_file: {
      'userProfileFile': '文件上传',
      'option': '选项',
      'textLengthErrorShort': '最多输入128个字符',
      'add': '添加',
      'required': '必填'
    },
    user_profile_setting_basic_info_diy: {
      userProfileBasicInfo: '基本信息',
      addDiyField: '添加自定义信息'
    },
    user_profile_setting_file_diy: {
      userProfileFile: '文件上传',
      addDiyField: '添加自定义信息'
    },
    user_profile_setting_job_info_diy: {
      userProfileJobInfo: '职业与交易经验',
      addDiyField: '添加自定义信息'
    }
  },
  'user_setting': {
    user_setting_auth: {
      'userSetting': '用户设置',
      'basicSetting': '基础设置',
      'uidRule': '用户名规则',
      'pwdRule': '密码规则',
      'userStatus': '状态',
      'emailStatus': '邮箱状态',
      'initialStatusSetting': '初始状态设置',
      'initialStatusInfo': '指生成用户时赋予的状态，需要为从登录／注册页面注册而来的用户和在系统中直接创建的用户分别设置。',
      'registerUser': '注册用户',
      'createUser': '创建用户',
      'registerEmail': '注册用户邮箱',
      'createEmail': '创建用户邮箱',
      'save': '保存',
      'pleaseSelect': '请选择',
      'pleaseEnter': '请输入1-30个字符,不能含有空格',
      'length30Limit': '请输入1-30个字符',
      'noSpace': '不能含有空格',
      'uidRule0': '5-15个字母或数字，创建后不可修改',
      'pwdRule0': '8-25个字符，必须包括大小写字母、数字及特殊字符',
      'pwdRule1': '8-25个字符，必须至少包括大小写字母、数字及特殊字符中的其中两种',
      'pwdRule2': '8-25个字符',
      'askUserChangePwd': '修改密码规则后强制修改所有用户的密码',
      'askUserInfo': '将密码规则从简单改为复杂时，部分用户的密码将会不符合重新选择的规则。勾选即强制要求用户修改密码，不勾选则这部分用户的密码保持原样',
      'userStatus0': '已激活',
      'userStatus1': '未激活',
      'userStatus2': '已删除',
      'add': '添加',
      'emailStatus0': '已激活',
      'emailStatus1': '未激活',
      'deleteFail': '删除失败',
      'deleteFailText': '状态正在使用中……',
      'confirm': '确认',
      'saveSucceed': '保存成功',
      'saveFail': '网络错误，保存失败',
      'pleaseSelectUidRule': '请选择用户名规则，提交后将不可修改',
      'pleaseSelectPwdRule': '请选择密码规则',
      'pleaseSelectRegisterUser': '请选择注册用户的初始状态',
      'pleaseSelectCreateUser': '请选择创建用户的初始状态',
      'pleaseSelectRegisterEmail': '请选择注册用户的邮箱初始状态',
      'pleaseSelectCreateEmail': '请选择创建用户的邮箱初始状态',
      'textLengthError': '最多输入128个字符',
      'loading': '加载中……'
    },
    user_setting_default: {}
  },
  'user_type_setting': {
    user_type_setting_auth: {
      'userTypeSetting': '用户类型设置',
      'newUserType': '新建用户类型',
      'copyUserType': '复制用户类型',
      'userType': '用户类型',
      'basicSetting': '基本设置',
      'userGroup': '用户组',
      'userProfile': '用户资料',
      'pleaseEnter': '请输入',
      'qianhouNoSpace': '内容前后不允许有空格',
      'length30LimitNoSpace': '请输入1-30个字符',
      'pleaseSelect': '请选择',
      'save': '保存',
      'pleaseEnterUserType': '请输入用户类型',
      'userTypeExist': '用户类型已存在，请重新输入',
      'textLengthErrorShort': '最多输入128个字符',
      'pleaseSelectUserGroup': '请选择用户组',
      'pleaseSelectUserProfile': '请选择用户资料',
      'saveSucceed': '保存成功！',
      'saveFail': '网络错误，保存失败！',
      'deleteFail': '删除失败',
      'deleteFailText': '该用户类型正在使用，无法删除！',
      'confirm': '确认',
      'confirmDeleteUserType': '删除用户类型',
      'confirmDeleteUserTypeText': '您确认要删除该用户类型吗？',
      'cancel': '取消',
      'deleteSucceed': '删除成功！',
      'netErrorDeleteFail': '网络错误，删除失败！',
      'enOnly': '只能输入英文、数字、特殊字符',
      'firstPageAfterLogin': '登录后跳转页面'
    },
    user_type_setting_default: {}
  },
  'operation_records': {
    'operation_records_auth': {
      'loading': '加载中...',
      'opeationRecords': '操作记录',
      'resourceModification': '资源修改',
      'settingModification': '配置修改'
    },
    'operation_records_search_resource': {
      'operationRecordsSearchResource': '资源修改搜索权限',
      'search': '搜索',
      'reset': '重置',
      'searchFields': [
        {
          'type': 'input',
          'field': 'resource_operator',
          'placeholder': '操作人',
          'auth': 'operation_records_search_resource_operator',
          'width': 3
        },
        {
          'type': 'datetimerange',
          'field': 'create_time',
          'auth': 'operation_records_search_resource_time',
          'placeholder': '操作时间',
          'width': 6
        },
        {
          'type': 'select',
          'field': 'resource_type',
          'auth': 'operation_records_search_resource_resource_type',
          'placeholder': '资源类型',
          'width': 6,
          'dataSource': '/api/resource/records/get_resource_type_select'
        },
        {
          'type': 'input',
          'field': 'resource_username',
          'auth': 'operation_records_search_resource_username',
          'placeholder': '用户名',
          'width': 3
        },
        {
          'type': 'select',
          'field': 'resource_operation',
          'auth': 'operation_records_search_resource_operation',
          'placeholder': '操作',
          'width': 6,
          'dataSource': '/api/resource/records/get_operation_type_select'
        }
      ]
    },
    'operation_records_list_resource': {
      'operationRecordsListResource': '资源修改表格权限',
      'more': '更多',
      'headerCols': [
        {
          'field': 'resource_operator',
          'auth': 'operation_records_list_resource_operator',
          'label': '操作人'
        },
        {
          'field': 'resource_time',
          'auth': 'operation_records_list_resource_time',
          'label': '操作时间'
        },
        {
          'field': 'resource_username',
          'auth': 'operation_records_list_resource_username',
          'label': '用户名'
        },
        {
          'field': 'resource_id',
          'auth': 'operation_records_list_resource_resource_id',
          'label': '资源 ID'
        },
        {
          'field': 'resource_field',
          'auth': 'operation_records_list_resource_field',
          'label': '字段'
        },
        {
          'field': 'resource_before',
          'auth': 'operation_records_list_resource_before',
          'label': '修改前'
        },
        {
          'field': 'resource_after',
          'auth': 'operation_records_list_resource_after',
          'label': '修改后'
        },
        {
          'field': 'resource_type',
          'auth': 'operation_records_list_resource_resource_type',
          'label': '资源类型'
        },
        {
          'field': 'resource_operation',
          'auth': 'operation_records_list_resource_operation',
          'label': '操作'
        }
      ]
    }
  },
  'channel_setting': {
    'channel_setting_auth': {
      'channelSetting': '通道管理'
    },
    'channel_setting_bank': {
      'channelSettingBank': '银行通道'
    },
    'channel_setting_notification': {
      'channelSettingNotification': '通知通道'
    },
    'channel_setting_talk': {
      'channelSettingTalk': '沟通通道'
    },
    'channel_setting_trade': {
      'noData': '暂无数据',
      'channelSettingTrade': '交易系统通道',
      'mt4Channel': 'MT4通道',
      'mt4ServerName': '服务器名称',
      'ip': 'IP地址',
      'port': '端口号',
      'managerLogin': '登录账号',
      'managerPassword': '登录密码',
      'addChannel': '添加通道',
      'pleaseEnter': '请输入',
      'qianhouNoSpace': '内容前后不能有空格',
      'pleaseEnterMt4ServerName': '请输入MT4服务器名称',
      'pleaseEnterIp': '请输入IP地址',
      'pleaseEnterPort': '请输入端口号',
      'pleaseEnterManagerLogin': '请输入登录账号',
      'pleaseEnterManagerPassword': '请输入登录密码',
      'mt4ServerNameExist': '该MT4服务器名称已存在,请重新输入',
      'loading': '加载中……',
      'saveSucceed': '保存成功！',
      'netErrorSaveFail': '网络错误，保存失败！',
      'deleteSucceed': '删除成功！',
      'netErrorDeleteFail': '网络错误，删除失败！',
      'deleteChannelText': '此操作将永久删除该通道，是否继续？',
      'toolText': '提示',
      'cancel': '取消',
      'confirm': '确定'
    }
  },
  'account_setting': {
    'account_setting_auth': {
      'accountSetting': '账号设置',
      'accountSettingInfo': '用于设置各系统使用的交易系统通道内的货币、杠杆和可使用的交易账号的属性，需要先在通道设置中设好交易系统的通道'
    },
    'account_setting_default': {
      'leverage': '杠杆',
      'pleaseAddLeverage': '请添加杠杆',
      'add': '添加',
      'currency': '货币',
      'pleaseAddCurrency': '请添加货币',
      'accountCategory': '账号种类',
      'tradeAccount': '交易账号',
      'tradeAccountInfo': '交易账号可以出入金、交易，不可收取返佣',
      'investAccount': '投资账号',
      'investAccountInfo': '交易账号可以出入金、交易，不可收取返佣',
      'pammAccount': 'PAMM账号',
      'pammAccountInfo': 'PAMM账号只能交易，不能出入金或收取返佣',
      'rebateAccount': '返佣账号',
      'rebateAccountInfo': '返佣账号可以出入金、交易并且收取返佣',
      'escrowAccount': '托管转账账号',
      'escrowAccountInfo': '托管转账账号可以出入金、交易并且进行托管转账，但是不可收取返佣',
      'startNo': '起始账号',
      'startNoInfo': '设置同个种类的账号的起始数字，可以使用同一个起始账号，也可以分别设置',
      'pleaseSelect': '请选择',
      'noData': '无数据',
      'pleaseEnter': '请输入',
      'deleteSucceed': '删除成功！',
      'noResult': '无搜索结果',
      'noSpace': '前后不可输入空格',
      'textLength128': '最多输入128个字符',
      'numberOnlyNoSpace': '只能输入数字，不可有空格',
      'pleaseEnterStartNo': '请输入起始账号',
      'loading': '加载中……',
      'saveSucceed': '保存成功！',
      'netErrorSaveFail': '网络错误，保存失败！',
      'save': '保存'
    }
  },
  'translate': {
    'translate_auth': {}
  }
}

export default components.audit_set
