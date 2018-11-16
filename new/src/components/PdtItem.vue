<template>
	<div>
		<div v-if="item.isNewType && item.type != 0" class="category-title" 
			:data-type="item.type" :data-type-name="item.typeName">{{item.typeName}}</div>
		<div v-if="item.isNewType && item.type == 0" class="category-title" 
			:data-type="item.type" :data-type-name="item.typeName"></div>
		<div class="flex-box item-box">
			<div class="img-box">
				<!--<img src="../assets/img/logo.png">-->
				<div class="def-img"></div>
			</div>
			<div class="content flex1">
				<p class="name">{{item.name}}</p>
				<p class="small">
					<small>
			          <em>月售{{item.monthSale}}</em>
			          <em>赞{{item.dznum}}</em>
			        </small>
				</p>
				<div class="bottom flex-box">
					<span class="pirce flex1">￥{{item.price}}</span>
					<buy-cart :item="item"></buy-cart>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import buyCart from '@/components/BuyCart'
	export default {
		name: 'PdtItem',
		components: {
			buyCart
		},
		props: {
			item: {
				default: null,
				type: Object
			}
		},
		data() {
			return {}
		},
		computed: {
			imgSrc() {
				return '../assets/img/logo.png';
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.category-title {
		line-height: 0.36rem;
	}
	
	.item-box {
		padding: 0.1rem 0;
	}
	
	.img-box {
		height: 0.7rem;
		width: 0.8rem;
	}
	
	.img-box img {
		height: 100%;
	}
	
	.def-img {
		width: 100%;
		height: 100%;
		background: #ddd;
		border-radius: 0.02rem;
	}
	
	.content {
		position: relative;
		margin-left: 0.1rem;
	}
	
	.content .name {
		font-size: 14px;
		font-weight: bold;
		color: #000;
	}
	
	.small {
		font-size: 0.12rem;
	}
	
	.small em:first-child {
		display: inline-block;
		width: 0.5rem;
	}
	
	.bottom {
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
	}
	
	.pirce {
		color: red;
		font-weight: bold;
		line-height: 0.24rem;
	}
</style>