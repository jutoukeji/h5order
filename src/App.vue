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
  	position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		right: 0;
    height: 100%;
  }
</style>
