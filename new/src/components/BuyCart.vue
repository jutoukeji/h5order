<template>
	<a href="javascript:void(0)" class="opt">
		<i v-if="item.num" class="reduce" @click="reduce"></i>
		<span v-if="item.num" >{{item.num}}</span>
		<i class="add" @click="addCart"></i>
	</a>
</template>

<script>
	import {ADD_CART, REDUCE_CART} from '../store/mutation-types.js'
	export default {
		name: 'BuyCart',
		props: {
			item: {
				default: null,
				type: Object
			}
		},
		data() {
			return {
				isRunning: false
			}
		},
		mounted() {
			if(!this.item.hasOwnProperty('num')) {
				this.$set(this.item, 'num', 0);
			}
		},
		methods: {
			addCart(){
				this.$store.commit(ADD_CART, {pdt_id: 1, category_id: 1, price: 12});
				let that = this, el= event.target;
				var eleFlyItem = document.getElementById('flyItem');
				var eleFlyImg = eleFlyItem.querySelector('img');
				var eleCart = document.querySelector('.cycle');
				
				// 现在按钮距离购物车的距离
			    var boundBtn = el.getBoundingClientRect();
			    var boundCart = eleCart.getBoundingClientRect();
			    // 中心点的水平垂直距离
			    var offsetX = boundBtn.left + boundBtn.width / 2 - (boundCart.left + boundCart.width / 2);
			    var offsetY = boundCart.top + boundCart.height / 2 - (boundBtn.top + boundBtn.height / 2);
				
				if (that.isRunning == false) {
			        // 购物车图形出现与初始定位
			        eleFlyItem.style.display = 'block';
			        eleFlyItem.style.left = boundBtn.left + 'px';
			        eleFlyItem.style.top = (boundBtn.top + 12) + 'px';
			        // 开始动画
			        setTimeout(function(){
			        	eleFlyItem.style.transform = 'translateX(-'+ offsetX +'px)';
			        	eleFlyImg.style.transform = 'translateY('+ offsetY +'px)';
			        }, 10);
			        // 动画标志量
			        that.isRunning = true;
			        setTimeout(function () {
			            eleFlyItem.style.display = '';
			            eleFlyItem.style.transform = 'translateX(0)';
			            eleFlyImg.style.transform = 'translateY(0)';
			            that.isRunning = false;
			            setTimeout(function(){
							document.querySelector(".cycle").classList.add("zoomIn");
						}, 50);
						setTimeout(function(){
							document.querySelector(".cycle").classList.remove("zoomIn");
						}, 500);
						that.item.num ++;
			        }, 410);
			    }    
			},
			reduce() {
				this.$store.commit(REDUCE_CART, {pdt_id: 1});
				this.item.num--;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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