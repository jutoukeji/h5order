<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  @import url('assets/css/base.css');
  @import url('assets/css/mint-cover.css');

  #app {
    height: 100%;
  }
</style>
