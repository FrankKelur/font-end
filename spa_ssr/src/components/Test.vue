<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-link to="/ssr">toggle</router-link>
    <!--<button @click="toApp">toggle</button>-->
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'This is test page....'
    }
  },
  methods: {
    toApp () {
      // this.$router.push('/ssr')
    }
  },
  created () {
    console.log('test created');
  },
  mounted () {
    console.log('test mounted');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
