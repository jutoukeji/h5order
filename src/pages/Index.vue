<template>
	<section class="container">
		<header class="flex-box header">
			<div class="shop-logo">
				<img src="../assets/img/logo.png">
			</div>
			<div class="flex1 shop-msg flex-box jtfc-space-between direction-column">
				<p>聚头科技</p>
				<p>公告：欢迎光您，很高兴为您服务</p>
				<p>活动：满100减10</p>
			</div>
		</header>
		<section>
			<div class="flex-box body">
				<div class="menu flex1">
					<ul>
						<li v-for="(category, idx) in categoryList" :class="isActive(category.category_id)" @click="switchType(category)" :key="idx">
							{{category.category_name}}
						</li>
					</ul>
				</div>
				<div class="content">
					<div class="nav-title">{{curCategoryName}}</div>
					<div class="pdt-list" @scroll="scrollEvent()" id="pdtList" :class="overflowHidden">
						<pdt-item v-for="(item, idx) in dataList" :item="item" :key="idx" :index="idx"></pdt-item>
					</div>
				</div>
			</div>
		</section>
		<div class="footer">
			<div class="shopping-cart flex-box">
				<div class="flex2 relative" @click="isShowCartList = !isShowCartList">
					<div class="cycle" :class="isDisable">
						<i>{{cartObj.totalNum}}</i>
					</div>
				</div>
				<div class="price flex4" @click="isShowCartList = !isShowCartList">
					<p>
						<small>合计：￥</small>
						<i>{{cartObj.totalPrice}}</i>
						<small> 元</small>
					</p>
				</div>
				<div class="flex3">
					<router-link :to="'/order/buy'" class="submit-btn" :class="isDisable">去结算</router-link>
					<!--<a href="javascript:void(0)" class="submit-btn" :class="isDisable">去结算</a>-->
				</div>
			</div>
		</div>
		<transition name="fade">
			<div class="cart-list" v-show="this.cartObj.totalNum > 0 && this.isShowCartList">
				<div class="cover" @click="isShowCartList = !isShowCartList"></div>
				<div class="cart-container">
					<div class="cart-title">
						<div><span @click="clearCart">清空购物车</span></div>
					</div>
					<ul>
						<li v-for="(item, idx) in carts" :key="idx" class="flex-box">
							<div class="flex3">{{item.name}}</div>
							<div class="flex1">￥{{item.price * item.num}}</div>
							<buy-cart :item="item" class="flex2 txt-right"></buy-cart>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<div class="fly-item" id="flyItem"><img src="../assets/img/icon-goods.png"></div>
		<div class="sus-box"><router-link :to="'/order/detail/:1'">我的点餐</router-link></div>  
	</section>
</template>

<script>
	import PdtItem from '@/components/PdtItem'
	import buyCart from '@/components/BuyCart'
	import { animateScroll } from '../js/utils'
	import { mapState } from 'vuex';
	import { INIT_BUYCART, CLEAR_CART } from '../store/mutation-types.js'
	export default {
		name: 'Index',
		components: {
			PdtItem,
			buyCart
		},
		data() {
			return {
				categoryList: [],
				curCategoryId: 0,
				dataList: [],
				curCategoryName: "热销",
				scrollTimer: null,
				lastScrollTime: 0,
				isShowCartList: false
			}
		},
		mounted() {
			let that = this;
			this.$http.get('static/category.json').then(function(result) {
				that.categoryList = result.data;
			});
			this.$http.get('static/pdtlist.json').then(function(result) {
				var pdtList = result.data;
				let list = [];
				let typeObj = {};
				pdtList.forEach(function(item) {
					if(!typeObj[item.category_id]) {
						item.isNewType = true;
						typeObj[item.category_id] = true;
					}
					list.push(item);
				})
				that.dataList = list;
			});
			this.$store.commit("INIT_BUYCART");
		},
		methods: {
			switchType(category) {
				let that = this;
				let doc = document.getElementById("pdtList");
				let cItemList = doc.querySelectorAll(".category-title");
				for(let i = 0; i < cItemList.length; i++) {
					let curItem = cItemList[i];
					if(curItem.getAttribute("data-category_id") == category.category_id) {
						let scrollTop = i == 0 ? 0 : (curItem.offsetTop + 36);
						animateScroll(doc, scrollTop);
						break;
					}
				}
			},
			clearCart() {
				this.$store.commit(CLEAR_CART, 'ALL');
			},
			scrollEvent() {
				let that = this,
					et = event;

				// scroll 节流
				let nowTime = new Date().getTime();
				if(that.scrollTimer) {
					clearTimeout(that.scrollTimer);
					that.scrollTimer = null;
				}
				if(that.lastScrollTime) {
					let diff = 200 - (nowTime - this.lastScrollTime);
					if(diff >= 0) {
						that.scrollTimer = setTimeout(function() {
							that.execScroll(et.target);
						}, diff);
					} else {
						that.execScroll(et.target);
					}
				} else {
					that.execScroll(et.target);
				}
			},
			execScroll(doc) {
				let that = this;
				that.lastScrollTime = new Date().getTime();
				let cItem = doc.querySelectorAll(".category-title");
				for(let i = 0; i < cItem.length; i++) {
					let curItem = cItem[i];
					if(curItem.offsetTop > doc.scrollTop - 36) {
						var temp = i == 0 ? curItem : cItem[i - 1];
						that.curCategoryName = temp.getAttribute("data-category_name");
						that.curCategoryId = temp.getAttribute("data-category_id");
						break;
					}
				}
				if(doc.scrollTop == (doc.scrollHeight - doc.offsetHeight)) {
					doc.scrollTop = doc.scrollTop - 1;
				}
			}
		},
		computed: {
			...mapState({
				'cartList': (state) => state.cartList
			}),
			cartObj() {
				let rst = {
					totalNum: 0,
					totalPrice: 0
				};
				let list = Object.values(this.cartList);
				list.forEach(function(item) {
					if(item.num > 0) {
						rst.totalNum += item.num;
						rst.totalPrice += item.price * item.num;
					}
				})
				return rst;
			},
			isDisable() {
				this.isShowCartList = this.cartObj.totalNum == 0 ? false : this.isShowCartList;
				return this.cartObj.totalNum > 0 ? '' : 'disabled';
			},
			overflowHidden() {
				return(this.cartObj.totalNum == 0 || !this.isShowCartList) ? '' : 'overflow-hide';
			},
			isActive() {
				return function(category_id) {
					return category_id == this.curCategoryId ? 'active' : '';
				}
			},
			carts() {
				return Object.values(this.cartList);
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container {
		background: #333;
	}
	
	.header {
		color: #FFF;
		padding: 0.1rem;
		font-size: 0.12rem;
		height: 1.05rem;
	}
	
	.shop-logo {
		height: 0.7rem;
		width: 0.7rem;
		margin-right: 0.1rem;
	}
	
	.shop-logo>img {
		height: 100%;
		border-radius: 0.05rem;
	}
	
	.body {
		background: #FFF;
		height: 100%;
	}
	
	.menu {
		background: #efefef;
		font-size: 0.12rem;
		color: #666;
		padding-bottom: 0.15rem;
		position: relative;
	}
	
	.menu ul {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0.54rem;
		overflow-y: auto;
	}
	
	.menu ul li {
		padding: 0.12rem 0.08rem;
	}
	
	.menu ul li.active {
		color: #000;
		background: #FFF;
		font-weight: bold;
	}
	
	.flex-box .content {
		flex: 4;
		position: relative;
	}
	
	.pdt-list {
		padding: 0 0.1rem;
		overflow-y: auto;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0.54rem;
		top: 0.4rem;
		transition: all 0.5s;
		scroll-behavior: smooth;
	}
	
	.nav-title {
		line-height: 0.36rem;
		margin-left: 0.1rem;
	}
	
	.footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		height: 0.54rem;
		background: #555;
		color: #FFF;
		z-index: 99;
	}
	
	.cycle {
		position: absolute;
		top: -0.1rem;
		bottom: 0.1rem;
		left: 50%;
		width: 0.54rem;
		height: 0.54rem;
		margin-left: -0.27rem;
		border: 0.05rem solid #505050;
		border-radius: 50%;
		background: dodgerblue url(../assets/img/icon-cart.png) center no-repeat;
		background-size: 0.32rem;
	}
	
	.cycle.disabled {
		border: 0.05rem solid #666;
		background: #333 url(../assets/img/icon-cart-dis.png) center no-repeat;
		background-size: 0.32rem;
	}
	
	.cycle.disabled>i {
		display: none;
	}
	
	.cycle>i {
		content: "";
		position: absolute;
		right: -0.05rem;
		top: -0.05rem;
		width: 0.16rem;
		height: 0.16rem;
		font-size: 0.12rem;
		text-align: center;
		background: #ff5200;
		border-radius: 50%;
	}
	
	.shopping-cart {
		height: 100%;
	}
	
	.shopping-cart .price p {
		font-size: 0.18rem;
		line-height: 0.52rem;
	}
	
	.shopping-cart .price span {
		font-size: 0.12rem;
		color: #999;
	}
	
	.shopping-cart .price small {
		font-size: 0.12rem;
	}
	
	.submit-btn {
		width: 100%;
		display: inline-block;
		line-height: 0.54rem;
		text-align: center;
		color: #FFF;
		font-size: 0.16rem;
		font-weight: bold;
		background: #45d277;
	}
	
	.submit-btn.disabled {
		background: #666;
		color: #999;
	}
	
	.cart-list .cart-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0.54rem;
		z-index: 98;
		background: #FFF;
		color: #666;
		transition: height 500ms;
		-webkit-animation-name: fadeInUp;
		animation-name: fadeInUp;
		-webkit-animation-duration: 350ms;
		animation-duration: 350ms;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	
	.cart-list ul {
		max-height: 3rem;
		overflow: auto;
	}
	
	.cart-list ul li {
		padding: 0.15rem 0.1rem;
	}
	
	.cart-list .cover {
		content: '';
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0.54rem;
		background: rgba(0, 0, 0, 0.5);
		z-index: 97;
	}
	
	.cart-title {
		padding: 0 0.15rem 0 0 !important;
		text-align: right;
		line-height: 0.36rem;
		color: #999;
		font-size: 0.12rem;
		background: #eaeaea;
	}
	
	.cart-title span {
		padding-left: 0.18rem;
		position: relative;
	}
	
	.cart-title span:before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0.16rem;
		height: 0.16rem;
		background: url(../assets/img/clear.png) center no-repeat;
		background-size: 0.12rem;
	}
	
	.overflow-hide {
		overflow-y: hidden;
	}
	
	.fly-item,
	.fly-item>img {
		position: fixed;
		transition: transform .4s;
		width: 0.24rem;
		height: 0.24rem;
		z-index: 101;
	}
	
	.fly-item {
		display: none;
		margin: -0.12rem 0 0 -0.12rem;
		transition-timing-function: linear;
		opacity: 0.7;
	}
	
	.fly-item>img {
		transition-timing-function: cubic-bezier(.55, 0, .85, .36);
	}
	
	.sus-box{
		position: fixed;
		left: 0.5rem;
		bottom: 1rem;
		z-index: 103;
		cursor: pointer;
		background: rgba(0,0,0, 0.7);
		padding: 0.08rem 0.1rem;
		border-radius: 0.17rem;
	}
	.sus-box a{
		color: #FFF;
		font-size: 0.12rem;
	}
</style>