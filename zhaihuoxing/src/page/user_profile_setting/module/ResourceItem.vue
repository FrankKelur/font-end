<template lang="pug">
  .resource-class
    .title.theme-color-darkenC15(v-text="classItem.title")
    template(v-for="(resourceItem, idx) in classItem.dataSource")
        el-row.margin-other
          b-checkbox.theme-color-darkenC15(:model.sync="resourceItem.checked", :title="resourceItem.label") {{resourceItem.label}}
          b-switch(:class="[resourceItem.system ? 'switch-required' : 'switch-required2']", :model.sync="resourceItem.required", :width='switchWidth', @change="updateRequired(idx)", v-if="resourceItem.system")
          span.required1(v-if="resourceItem.system || resourceItem.required", :class="[resourceItem.system ? 'switch-required' : 'switch-required2', resourceItem.required ? 'theme-color-C' : 'theme-color-lightenC32']") {{renderData.required}}
          b-switch.switch-required(:model.sync="resourceItem.show_on_register", :width='switchWidth', @change="updateReg(idx)")
          span.switch-required(:class="[resourceItem.show_on_register ? 'theme-color-C' : 'theme-color-lightenC32']") {{renderData.showOnRegistration}}
        el-row(v-if="resourceItem.depth === 2")
          el-form-item(:label="renderData.option")
            b-button.tag-group(size="small" v-for="(childResource, idx) in resourceItem.dataSource", :key="childResource.key")
              span.tag-group-txt(v-ellipsis-title="") {{childResource.label}}
              b-icon(iconName="delete", size="12px", @click.native='deleteResource(childResource, "2", classItem, resourceItem)')
            b-button.add-btn(v-if="newResource!==resourceItem" size="small", type="primary", @click="addResourceMod('2', classItem, resourceItem)") {{renderData.add}}
        template(v-if="resourceItem.depth === 3")
          el-collapse
            el-collapse-item(v-for="(childResource, idx) in resourceItem.dataSource", :name="idx", :key="idx")
              b-button.tag-group(size="small" slot="title")
                span.tag-group-txt(v-ellipsis-title="") {{childResource.label}}
                b-icon(iconName="delete", size="12px", @click.native='deleteResource(childResource, "2", classItem, resourceItem)')
              b-button.tag-group(size="small" v-for="(endResource, idx) in childResource.dataSource", :key="idx")
                span.tag-group-txt(v-ellipsis-title="") {{endResource.label}}
                b-icon(iconName="delete", size="12px", @click.native='deleteResource(endResource, "3", classItem, resourceItem, childResource)')
              b-button.add-btn(size="small", type="primary", @click="addResourceMod('3', classItem, resourceItem, childResource)") {{renderData.add}}
            .el-collapse-item(:name="-1")
              .el-collapse-item__header
                b-button.add-btn(slot="title", size="small", type="primary", @click="addResourceMod('2', classItem, resourceItem)") {{renderData.add}}
</template>

<script>
  import service from '../service'
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BCheckbox from 'components/BCheckbox'
  import BSwitch from 'components/BSwitch'

  export default {
    name: 'resource-item',
    data () {
      return {
        newResource: {},
        switchWidth: 45
      }
    },
    props: {
      renderData: {
        type: Object,
        required: true
      },
      profileInfo: {
        type: Object,
        required: true
      },
      visible: {
        type: Object,
        required: true
      },
      classItem: {
        type: Object,
        required: true
      }
    },
    computed: {
      hasSwitch (resource) {
        if (resource['rules']) {
          var res = resource['rules'].find(rule => rule === 'required')
          if (res) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    },
    mounted () {
      console.log('profileInfo', this.profileInfo)
      console.log('classItem', this.classItem)
    },
    methods: {
      updateReg (idx) {
        this.classItem.dataSource[idx].show_on_register = !this.classItem.dataSource[idx].show_on_register
      },
      addResourceMod (level, cls, resource, parent) {
        this.visible.dialog = 'add_resource'
        if (level === '2') {
          this.profileInfo.path = [cls.key, resource.key]
        } else if (level === '3') {
          this.profileInfo.path = [cls.key, resource.key, parent.key]
        }
      },
      deleteResource (target, level, cls, resource, parent) {
        console.log('target', target)
        console.log('level', level)
        console.log('cls', cls)
        console.log('resource', resource)
        console.log('parent', parent)
        var params = Object.assign({}, this.profileInfo)
        params.key = target.key
        params.label = target.label
        if (level === '2') {
          params.path = [cls.key, resource.key]
        } else if (level === '3') {
          params.path = [cls.key, resource.key, parent.key]
        }
        service.deleteResource(params).then(({data}) => {
          console.log('提交的数据')
          console.log(params)
          // 从parent中删除该项
          var pre = resource
          if (level === '3') {
            pre = parent
          }
          for (let i = 0; i < pre.dataSource.length; i++) {
            if (target.label === pre.dataSource[i].label) {
              console.log('即将删除的数据')
              console.log(pre.dataSource[i])
              pre.dataSource.splice(i, 1)
            }
          }
//          this.$emit('refreshInfo')
        })
      },
      updateRequired (idx) {
//        console.log('change', idx)
        this.classItem.dataSource[idx].required = !this.classItem.dataSource[idx].required
      }
    },
    components: {
      BButton,
      BIcon,
      BCheckbox,
      BSwitch
    }
  }
</script>

<style lang="less">
  .resource-class {
    clear: both;
    .el-collapse-item__header {
      padding-left: 16px;
      .b-button {
        top: 4px;
        position: relative;
      }
    }
    .el-collapse-item__content {
      padding-left: 16px;
    }
    .margin-other .el-switch--wide .el-switch__label.el-switch__label--right {
      color:inherit!important;
      span{
        color:inherit!important;
      }
    }
    .margin-other .el-switch--wide .el-switch__label.el-switch__label--left {
      color:inherit!important;
      span{
        color:inherit!important;
      }
    }
  }

  .title {
    font-size: 16px;
    padding: 20px 0;
  }
  .el-switch__label {
    font-size: 13px!important;
  }
  .switch-required {
    margin-left: 10px;
    vertical-align: middle;
  }
  .switch-required2 {
    margin-left: 10px;
    vertical-align: middle;
    font-size: 12px;
    margin-bottom: 3px;
  }
  .margin-other {
    margin: 10px 0;
  }
  .b-box {
    max-width: 65%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
  }
  .b-box .el-checkbox__input.is-checked .el-checkbox__inner {
    width: 16px;
    height: 16px;
  }
  .el-checkbox__inner{
    width: 16px;
    height: 16px;
  }
  //.switch-required {
 //   font-size: 12px;
  //  vertical-align: text-top;
 // }
  .resource-class .margin-other .el-switch--wide .el-switch__label.el-switch__label--left span {
    font-size: 12px;
    margin-left: -5px;
    margin-top: 3px;
  }
  .resource-class .margin-other .el-switch--wide .el-switch__label.el-switch__label--right span {
    font-size: 12px;
    margin-right: -6px;
    margin-top: 2px;
  }
  .user_profile_setting_component .content .right .tag-group .b-icon {
    bottom: 2px;
  }
  .user_profile_setting_component .footer {
    margin-bottom: 40px !important;
  }
  .user_profile_setting_component .content .right .el-button--small {
    margin: 4px 8px 6px 0 !important;
    padding: 7px 10px;
  }
  .el-switch.is-checked .el-switch__core {
    margin-top: 2px;
  }
  .el-switch__core {
    margin-top: 2px;
  }
  .required1 {
    display: inline-block;
    margin-top: 6px;
  }
  .el-checkbox__label {
    margin-top: 6px;
    display: inline-block;
  }
  .margin-other.title.clear.el-row {
    //margin-top: 240px;
    margin-bottom: -6px;
  }
  .switch-required {
    z-index: 20;
  }

</style>
