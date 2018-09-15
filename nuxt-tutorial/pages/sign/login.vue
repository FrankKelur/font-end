<template>
  <div class="login-form">
    <h4>Login Form</h4>
    <h4>{{name}}</h4>
    <button @click="login">Login</button>
  </div>
</template>

<script>
  export default {
    name: 'sign',
    transition: 'test',
    layout: 'blog',
    data () {
      return {}
    },
    methods: {
      login () {
        window.location.href = '/'
      }
    },
    mounted () {
      console.log('mounted Login Form');
    },
    components: {},
    asyncData (context) {
      return {name: 'Zhai Pengchao'}
    },
    fetch () {
      // to fetch store
    },
    head () {
      // to set meta tag for this page
      return {
        title: this.name,
        meta: {hid: 'description', name: 'description', content: 'Login page by nuxt.'}
      }
    }
  }
</script>

<style>
  .login-form {
    background: url("../../assets/img/bg.jpeg") center no-repeat;
    background-size: 100%;
    height: 100%;
    color: white;
    text-align: center;
    font-size: 40px;
    padding-top: 250px;
    line-height: 80px;
  }
</style>
