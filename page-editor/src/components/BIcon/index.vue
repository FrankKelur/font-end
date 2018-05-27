<template lang="pug">
  span.b-icon(:title="title", @click='clickHandler' v-if="iconName&&iconName.url")
    img(:style="{width: size, height: size}", :src="iconName.url")
  span.b-icon(:title="title", @click='clickHandler', v-else)
    svg.icon(aria-hidden="true", v-bind:style="'font-size:'+this.size")
      use(v-bind:xlink:href="`#icon-${iconName}`")

</template>

<script>
  export default {
    name: 'b-icon',
    data () {
      return {}
    },
    methods: {
      clickHandler (e) {
        this.$emit('click', e)
      }
    },
    props: {
      url: {
        type: String
      },
      iconName: {
        required: false
      },
      title: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: '16px'
      }
    },
    mounted () {
      // 如果iconName 为对象, 则这时候显示其url属性里对应的图片
    }
  }
</script>

<style lang="less" scoped>
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    cursor: pointer;
    display: inline-block;
  }
</style>
