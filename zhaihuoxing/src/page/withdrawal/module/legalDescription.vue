<template lang="pug">
  .legal-description.theme-color-C
    .notes.theme-color-G {{description.attention}}
    .explain(v-for="item in explain") {{item}}

</template>

<script>
  export default {
    name: 'legalDescription',
    data () {
      let explain = this.description.text.split('~')
      return {
        explain: explain
      }
    },
    props: {
      description: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="less">
</style>
