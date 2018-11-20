<template>
	<section class="container">
		<close-tag></close-tag>
		<div>
			<div class="content">
				<p>聚头点餐</p>
				<ul>
					<li v-for="(item, idx) in pdtList" @key="idx" class="flex-box item-box border-bottom">
						<div class="img-box"></div>
						<div class="flex1">{{item.pdt_name}}</div>
						<div>x {{item.num}}</div>
						<div class="right">￥{{item.price}}</div>
					</li>
					<li class="txt-right mgtop10">
						<small>小计￥</small>
						<span class="font16 bold">{{totalPrice}}</span>
					</li>
				</ul>
			</div>
			<div class="payway pd10">
				<ul>
					<li class="flex-box border-bottom">
						<span>优惠券</span>
						<span class="icon-right flex1 right-box disabled">点击使用优惠券</span>
					</li>
					<li class="flex-box">
						<span>备注</span>
						<span class="icon-right flex1 right-box disabled">点击添加备注</span>
					</li>
				</ul>
			</div>
			<div class="payway">
				<p>选择支付方式</p>
				<ul>
					<li class="flex-box border-bottom">
						<span class="flex1">微信支付</span>
						<span class="icon-check checked"></span>
					</li>
					<li class="flex-box">
						<span class="flex1">线下支付</span>
						<span class="icon-check"></span>
					</li>
				</ul>
			</div>
		</div>
		<div class="pay-box flex-box">
			<div class="price-box flex3"><span>￥{{totalPrice}}</span></div>
			<div class="pay-btn flex1"><span>去支付</span></div>
		</div>
	</section>
</template>

<script>
	import CloseTag from '@/components/CloseTag'
	export default {
		name: 'OrderBuy',
		components: {
			CloseTag
		},
		data() {
			return {
				pdtList: [{pdt_name: '辣椒炒肉',num: 1, price: 12.5},{pdt_name: '粉蒸肉',num: 2, price: 18}]
			}
		},
		mounted() {
			
		},
		methods: {
		},
		computed: {
			totalPrice(){
				let tp = 0;
				this.pdtList.forEach(function(item){
					tp += item.price;
				})
				return tp;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.container{
		padding: 0.1rem;
	}
	.content,
	.payway{
		padding: 0.15rem;
		background: #FFFFFF;
		margin-bottom: 0.1rem;
	}
	.content > p{
		border-bottom: 1px solid #eee;
		line-height: 0.44rem;
		font-size: 0.16rem;
		font-weight: bold;
	}
	.pay-box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 0.44rem;
		background: #333;
		color: #FFFFFF;
	}
	.pay-btn{
		background: #45d277;
		color: #FFFFFF;
		text-align: center;
		line-height: 0.44rem;
	}
	.price-box{
		line-height: 0.44rem;
		margin-left: 0.1rem;
		font-weight: bold;
	}
	.item-box{
		line-height: 0.56rem;
	}
	.item-box .img-box{
		background: #ccc;
		height: 0.36rem;
		width: 0.36rem;
		margin-right: 0.05rem;
		margin-top: 0.1rem;
	}
	.item-box .right{
		width: 1rem;
		text-align: right;
	}
	.payway{
		padding: 0 0.15rem;
	}
	.payway > p{
		border-bottom: 1px solid #eee;
		line-height: 0.44rem;
		font-size: 0.16rem;
		font-weight: bold;
	}
	.payway ul li{
		line-height: 0.44rem;
	}
	.pd10{
		padding: 0.1rem 0.15rem;
	}
	.right-box{
		text-align: right;
		padding-right: 0.2rem;
		font-size: 0.12rem;
	}
	.right-box.disabled{
		color: #a2a2a2;
	}
</style>