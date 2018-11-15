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
						<li v-for="(menu,idx) in typeList" :class="menu.type==activeMenuIdx?'active':''" @click="switchType(menu)" :key="idx">
							{{menu.typeName}}
						</li>
					</ul>
				</div>
				<div class="content">
					<div class="nav-title">{{categoryType}}</div>
					<div class="pdt-list" @scroll="scrollEvent()" id="pdtList" :class="overflowHidden">
						<pdt-item v-for="(item, idx) in dataList" :item="item" :key="idx" :index="idx" @addCart="addCart"></pdt-item>
					</div>
				</div>
			</div>
		</section>
		<footer>
			<div class="shopping-cart flex-box">
				<div class="flex2 relative">
					<div class="cycle" :class="isDisable" @click="isShowCartList = !isShowCartList">
						<i>{{cartObj.totalNum}}</i>
					</div>
				</div>
				<div class="price flex4">
					<p>
						<small>合计：￥</small>
						<i>{{cartObj.totalPrice}}</i>
						<small> 元</small>
					</p>
					<!--<span>餐位费3元</span>-->
				</div>
				<div class="flex3">
					<a href="javascript:void(0)" class="submit-btn" :class="isDisable">去结算</a>
				</div>
			</div>
			<div class="cart-list" :class="isShowCart">
				<div class="cover" @click="isShowCartList = !isShowCartList"></div>
				<div class="cart-container">
					<div class="cart-title">
						<div><span @click="clearCart">清空购物车</span></div>
					</div>
					<ul>
						<li v-for="(item, idx) in dataList" :key="idx" class="flex-box" v-if="item.num > 0">
							<div class="flex3">{{item.name}}</div>
							<div class="flex1">￥{{item.price * item.num}}</div>
							<a href="javascript:void(0)" class="opt flex2">
								<i class="reduce" @click="item.num --"></i>
								<span>{{item.num}}</span>
								<i class="add" @click="addCart(item)"></i>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</footer>
		<div class="fly-item" id="flyItem"><img src="../assets/img/icon-goods.png"></div>
	</section>
</template>

<script>
	import PdtItem from '@/components/PdtItem'
	import { animateScroll } from '../js/util'
	import { pdtList, typeList } from '../js/json'
	import { mapState } from 'vuex';
	export default {
		name: 'Index',
		components: {
			PdtItem
		},
		data() {
			return {
				activeMenuIdx: 0,
				typeList: typeList,
				dataList: [],
				categoryType: "热销",
				scrollTimer: null,
				lastScrollTime: 0,
				isShowCartList: false,
				isTouchMenu: false,
				isRunning: false
			}
		},
		mounted() {
			let list = [];
			let typeObj = {};
			pdtList.forEach(function(item) {
				if(!typeObj[item.type]) {
					item.isNewType = true;
					typeObj[item.type] = true;
				}
				list.push(item);
			})
			this.dataList = list;
		},
		methods: {
			switchType(menu) {
				let that = this;
				let doc = document.getElementById("pdtList");
				let cItem = doc.querySelectorAll(".category-title");
				that.activeMenuIdx = menu.type;
				that.categoryType = menu.typeName;
				that.isTouchMenu = true;
				let curScrollTop = doc.scrollTop;
				for(let i = 0; i < cItem.length; i++) {
					let curItem = cItem[i];
					if(curItem.getAttribute("data-type") == menu.type) {
						let sTop = i == 0 ? 0 : (curItem.offsetTop + 36);
						animateScroll(doc, sTop, function(){
							that.isTouchMenu = false;
						});
						break;
					}
				}
			},
			clearCart(){
				this.dataList.forEach(function(item) {
					if(item.num > 0) {
						item.num = 0;
					}
				})
			},
			scrollEvent() {
				let that = this,
					et = event;

				// scroll 节流
				let nowTime = new Date().getTime();
				if(this.scrollTimer) {
					clearTimeout(this.scrollTimer);
					this.scrollTimer = null;
				}
				if(this.lastScrollTime) {
					let diff = 200 - (nowTime - this.lastScrollTime);
					if(diff >= 0) {
						this.scrollTimer = setTimeout(function() {
							that.execScroll(et.target);
						}, diff);
					} else {
						that.execScroll(et.target);
					}
				} else {
					this.execScroll(et.target);
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
						if(!that.isTouchMenu){
							that.categoryType = temp.getAttribute("data-type-name");
							that.activeMenuIdx = temp.getAttribute("data-type");
						} 
						break;
					}
				}
				if(doc.scrollTop >= (doc.scrollHeight - doc.offsetHeight)){
					doc.scrollTop = doc.scrollTop - 1;
				}
			},
			addCart(pdt){
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
						pdt.num ++;
			        }, 410);
			    }    
			}
		},
		computed: {
			...mapState({
				totalNum: state => state.cartNum
			}),
			cartObj() {
				let rst = {
					totalNum: 0,
					totalPrice: 0
				};
				this.dataList.forEach(function(item) {
					if(item.num > 0) {
						rst.totalNum += item.num;
						rst.totalPrice += item.price * item.num;
					}
				})
				return rst;
			},
			isDisable(){
				this.isShowCartList = this.cartObj.totalNum == 0 ? false : this.isShowCartList;
				return this.cartObj.totalNum > 0 ? '' : 'disabled';
			},
			isShowCart(){
				return (this.cartObj.totalNum == 0 || !this.isShowCartList) ? 'hide' : '';  
			},
			overflowHidden(){
				return (this.cartObj.totalNum == 0 || !this.isShowCartList) ? '' : 'overflow-hide';
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
	
	.shop-msg {
		/*height: 100%;*/
	}
	
	.body {
		background: #FFF;
		height: 100%;
	}
	
	.menu {
		background: #efefef;
		font-size: 0.12rem;
		color: #666;
		overflow-y: auto;
		padding-bottom: 0.15rem;
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
		bottom: 0;
		top: 0.4rem;
		transition: all 0.5s;
	}
	
	.nav-title {
		line-height: 0.36rem;
		margin-left: 0.1rem;
	}
	
	footer {
		height: 0.54rem;
		background: #555;
		color: #FFF;
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
		z-index: 99;
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
		/*margin-top: 0.05rem;*/
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
	
	.opt {
		display: inline-block;
		color: #333;
		text-align: right;
	}
	
	.opt .add {
		display: inline-block;
		width: 0.24rem;
		height: 0.24rem;
		background: url(../assets/img/icon-add.png) center no-repeat;
		background-size: 0.24rem;
		vertical-align: middle;
		position: relative;
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
	.cart-list {
		-webkit-animation-name: fadeIn;
  		animation-name: fadeIn;
		-webkit-animation-duration: 350ms;
		animation-duration: 350ms;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	.cart-list .cart-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0.54rem;
		z-index: 98;
		background: #FFF;
		color: #666;
	}
	
	.cart-list ul{
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
	.cart-title{
		padding: 0 0.15rem 0 0 !important;
		text-align: right;
		line-height: 0.36rem;
		color: #999;
		font-size: 0.12rem;
		background: #eaeaea;
	}
	.cart-title span{
		padding-left: 0.18rem;
		position: relative;
	}
	.cart-title span:before{
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0.16rem;
		height: 0.16rem;
		background: url(../assets/img/clear.png) center no-repeat;
		background-size: 0.12rem ;
	}
	.overflow-hide{
		overflow-y: hidden;
	}
	.fly-item,
	.fly-item > img {
	    position: absolute;
	    transition: transform .4s;
	    width: 0.24rem;
	    height: 0.24rem;
	}
	.fly-item {
		display: none;
	    margin: -0.12rem 0 0 -0.12rem;
	    transition-timing-function: linear;
	    opacity: .5;
	}
	.fly-item > img {
	    transition-timing-function: cubic-bezier(.55,0,.85,.36);
	}
</style>