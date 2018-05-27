<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <jsx-example></jsx-example>
    <el-button @click.native="startHacking">Yes!</el-button>
  </div>
</template>

<script>
import JsxExample from './jsx-example.vue'

export default {
  data () {
    return {
      msg: 'Want something new?'
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'Shhh',
        message: 'Just be patient...',
        duration: 6000
      })
    }
  },
  components: {
    JsxExample
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
