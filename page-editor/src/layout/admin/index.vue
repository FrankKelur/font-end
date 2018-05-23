<template lang="pug">
  .admin-layout
    .container.clear-float
      .content
        router-view
</template>

<script>
  export default {
    name: 'admin-layout'
  }
</script>

<style lang="less">
  html{
    height: 100%;
    body{
      height: 100%;
      min-width: 850px;
    }
  }

  .admin-layout{
    height: 100%;
    display: flex;
    flex-direction: column;
    .container{
      flex-grow:1;
      display: flex;
      height: 100%;
      .content{
        position: relative;
        flex-grow:1;
        padding: 0 1.9% 0 1.5%;
        overflow-y: auto;
        background-size: 0 0;
      }
    }
  }
  @media screen and  (min-width:1250px) {
    .admin-layout{
      .container{
      }
    }
  }
  @media screen and (max-width:1250px) {
    .admin-layout{
      .container{
        .content{
        }
      }
    }
  }

</style>
