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
					<span class="red flex1">￥{{item.price}}</span>
					<a href="javascript:void(0)" class="opt">
						<i :class="isHide" class="reduce" @click="reduce"></i>
						<span :class="isHide">{{item.num}}</span>
						<i class="add" @click="add"></i>
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'PdtItem',
		props: {
			item: {
				default: null,
				type: Object
			}
		},
		data() {
			return {}
		},
		mounted() {
			if(!this.item.hasOwnProperty('num')) {
				this.$set(this.item, 'num', 0);
			}
		},
		methods: {
			add() {
				this.$emit('addCart', this.item);
			},
			reduce() {
				this.item.num--;
			}
		},
		computed: {
			imgSrc() {
				return '../assets/img/logo.png';
			},
			isHide() {
				return this.item.num > 0 ? '' : 'hide';
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
	
	.red {
		color: red;
		font-weight: bold;
		line-height: 0.24rem;
	}
	
	.opt {
		display: inline-block;
		color: #333;
	}
	
	.opt .add {
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		background: url(../assets/img/icon-add.png) center no-repeat;
		background-size: 0.24rem;
		vertical-align: middle;
	}
	
	.opt .reduce {
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		background: url(../assets/img/icon-reduce.png) center no-repeat;
		background-size: 0.24rem;
		vertical-align: middle;
	}
	
	.opt>span {
		vertical-align: middle;
	    display: inline-block;
	    width: 0.2rem;
	    text-align: center;
	}
</style>