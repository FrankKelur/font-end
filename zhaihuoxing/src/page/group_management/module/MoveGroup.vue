<template lang="pug">
  b-dialog.move_group-dialog(:show.sync='dialogVisible', :title="renderData.groupManagementMoveGroup", :show-close="true", width="38%", :before-close="beforeClose")
    el-form(:model="move_group", :rules="rules", ref="form")
      el-form-item
        el-radio-group(v-model="move_group.type")
          b-radio(label="single").radio-box
            span.radio-span.theme-color-C {{renderData.moveSingle}}
          b-radio(label="together").radio-box
            span.radio-span.theme-color-C {{renderData.moveTogether}}
      el-form-item(prop="parent"  label-width="120px")
        template(slot="label")
          span.theme-color-C(v-text="renderData.newDad")
        b-select(:model.sync="move_group.parent", :placeholder="renderData.pleaseEnter").select-box
          el-option(:label="item.val", :value="item.key", v-for="(item, $idx) in parentList", :key="$idx")
    template(slot="footer")
      b-button(@click="cancel")
        span {{renderData.cancel}}
      b-button(type="primary", @click="confirm")
        span {{renderData.confirm}}
</template>

<script>
  import BButton from 'components/BButton'
  import BIcon from 'components/BIcon'
  import BInput from 'components/BInput'
  import BDialog from 'components/BDialog'
  import BRadio from 'components/BRadio'
  import BSelect from 'components/BSelect'
  import service from '../service'

  export default {
    name: 'move-group',
    data () {
      return {
        rules: {
          parent: [{required: true, message: this.renderData.pleaseSelect, trigger: 'change'}]
        },
        dialogVisible: true,
        parentList: [],
        move_group: {
          type: 'single',
          parent: ''
        }
      }
    },
    methods: {
      beforeClose (done) {
        this.visible.dialog = null
        done()
      },
      getParentSelect () {
        var params = {
          gid: this.currRow.gid
        }
        return service.getParentSelect(params).then(res => {
          this.parentList = res.data
        })
      },
      confirm () {
        this.$refs['form'].validate(valid => {
          if (valid) {
            var params = {
              gid: this.currRow.gid
            }
            Object.assign(params, this.move_group)
            service.moveGroup(params).then(res => {
              this.visible.dialog = null
              var params = {
                gid: this.currRow.father_gid
              }
              service.getGroupList(params).then(({data}) => {
                data.forEach(child => {
                  child.father = this.currRow.father
                })
                this.currRow.father.children = data
                var targetGid = this.move_group.parent
                var moveParams = {
                  gid: targetGid
                }
                console.log('---------- opened node ---------')
                console.log(this.openedNode)
                var targetNode = this.openedNode.filter(node => {
                  return node.gid === targetGid
                })[0]
                if (targetNode) {
                  service.getGroupList(moveParams).then(({data}) => {
                    data.forEach(child => {
                      child.father = targetNode.row
                    })
                    targetNode.row.children = data
                  })
                } else {
                  var childNode = {}
                  this.openedNode.forEach(node => {
                    node.row.children.findIndex(child => {
                      if (child.gid === targetGid) {
                        childNode = child
                      }
                    })
                    if (childNode.children) {
                      service.getGroupList(moveParams).then(({data}) => {
                        data.forEach(child => {
                          child.father = childNode
                        })
                        childNode.children = data
                      })
                    }
//                    if (childIdx > 0) {
//                      targetNode = node
//                    }
                  })
                }
                console.log(targetNode)
                if (targetNode) {
                  service.getGroupList(moveParams).then(({data}) => {
                    data.forEach(child => {
                      child.father = targetNode.row
                    })
                    targetNode.row.children = data
                  })
                } else {
                }
              })
            })
          }
        })
      },
      cancel () {
        this.visible.dialog = null
      }
    },
    props: {
      visible: {
        type: Object,
        required: true
      },
      renderData: {
        type: Object,
        required: true
      },
      currRow: {
        type: Object,
        required: true
      },
      openedNode: {
        type: Array,
        required: true
      }
    },
    components: {
      BButton,
      BIcon,
      BInput,
      BDialog,
      BRadio,
      BSelect
    },
    async mounted () {
      await this.getParentSelect()
    }
  }
</script>

<style lang="less" scoped>

</style>
