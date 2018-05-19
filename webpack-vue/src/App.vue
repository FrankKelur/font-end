<template>
  <div id="app">
    <img src="assets/logo.png" :id='test.show'>
    <router-view/>
    <div>
      {{message}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    template: '<h4>App</h4>',
    data () {
      console.log('APP data init')
      return {
        message: '',
        show: true,
        test: null
      }
    },
    beforeCreate () {
      console.log('app beforecreate')
    },
    created () {
      console.log('app created')
    },
    beforeMount () {
      this.$set(this, 'test', {show: true})
      console.log('app beforeMount')
    },
    mounted () {
      this.message = window.localStorage.getItem('message')
      var url = '/api/get'
      var params = {}
      window.fetch(url, params).then(res => {
        console.log('res', ...arguments)
      })
      console.log('app.js mounted!')
    },
    beforeUpdate () {
      console.log('app beforeUpdate')
    },
    updated () {
      console.log('app updated')
    },
    beforeDestroy () {
      console.log('app beforeDestory')
    },
    destroyed () {
      console.log('app destroyed')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
