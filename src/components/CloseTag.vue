<template>
	<i class="close-box" @click="closePage"></i>
</template>

<script>
	export default {
		name: 'CloseTag',
		data() {
			return {}
		},
		methods: {
			closePage(){
				window.history.back();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.close-box{
		position: fixed;
		z-index: 104;
		right: 0.2rem;
		top: 0.2rem;
		width: 0.24rem;
		height: 0.24rem;
		background: url(../assets/img/icon-close.png) center no-repeat;
		background-size: 100%;
	}
</style>