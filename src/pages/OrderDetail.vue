<template>
	<section>
		<close-tag></close-tag>
		<div class="item-box state-box">
			<div class="img-box" :class="stateClsName"></div>
			<div class="state-tip">{{order.state_name}}</div>
			<div class="gray-tip">感谢您对本店的支持，期待再次光临</div>
		</div>
		<div class="item-box pdt-list">
			<p>点餐信息</p>
			<ul>
				<li v-for="(pdt, idx) in order.pdtList" :key="idx" class="flex-box">
					<span class="flex1">{{pdt.pdt_name}}</span>
					<span>x {{pdt.num}}</span>
					<span class="right">￥{{pdt.price}}</span>
				</li>
				<li class="flex-box">
					<span class="flex1">红包优惠券1元</span>
					<span class="red-txt">-￥1</span>
				</li>
				<li class="txt-right">实付 <span><b>￥{{order.price}}</b></span></li>
			</ul>
		</div>
		<div class="item-box order-msg">
			<p>订单信息</p>
			<ul>
				<li>订单号：{{order.order_id}}</li>
				<li>支付方式：{{order.pay_way}}</li>
				<li>下单时间：{{order.create_time}}</li>
			</ul>
		</div>
	</section>
</template>

<script>
	import CloseTag from '@/components/CloseTag'
	export default {
		name: 'OrderDetail',
		components: {
			CloseTag
		},
		data() {
			return {
				order:{
					state_name: '您的订单已支付成功',
					order_id: '2018111916162586',
					pay_way: '微信支付',
					create_time: '2018-11-19 16:16',
					state: 1,
					pdtList: [{
						pdt_name: '辣椒炒肉',
						price: 12.5,
						num: 2
					},{
						pdt_name: '粉蒸肉',
						price: 18,
						num: 1
					}],
					price: 32
				}
			}
		},
		mounted() {
			
		},
		methods: {
			
		},
		computed: {
			stateClsName(){
				return this.order.state == 1 ? 'success' : 'wait';
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.item-box{
		margin: 0.1rem 0.1rem 0;
		background: #FFF;
		padding: 0.1rem 0;
	}
	.state-box .img-box{
		height: 0.48rem;
	    margin: 0.1rem auto;
	}
	.state-box .img-box.wait{
		background: url(../assets/img/icon-wait.png) center no-repeat;
		background-size: 0.48rem;
	}
	.state-box .img-box.success{
		background: url(../assets/img/icon-success.png) center no-repeat;
		background-size: 0.48rem;
	}
	.state-box .state-tip{
		text-align: center;
		color: #333;
		font-weight: bold;
		font-size: 0.18rem;
	}
	.item-box > p{
		font-weight: bold;
		color: #333;
		font-size: 0.16rem;
		border-bottom: 1px solid #eee;
		padding-bottom: 0.1rem;
		padding-left: 0.1rem;
	}
	.order-msg ul li,
	.pdt-list ul li{
	    border-bottom: 1px solid #eee;
	    font-size: 0.14rem;
	    margin: 0 0.1rem;
	    line-height: 0.44rem;
	}
	.order-msg ul li:last-child,
	.pdt-list ul li:last-child{
		padding-bottom: 0;
		border-bottom: 0;
	}
	.pdt-list ul li .right{
	    width: 0.8rem;
	    text-align: right;
	}
	.red-txt{
		color: red;
	}
	.gray-tip{
		color: #999;
		font-size: 0.12rem;
		text-align: center;
		margin-top: 0.05rem;
	}
</style>