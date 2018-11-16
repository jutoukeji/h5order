import {
	ADD_CART,
	REDUCE_CART,
	INIT_BUYCART,
	CLEAR_CART
} from './mutation-types.js'

import {setStore, getStore} from '../js/utils'

export default {
	// 加入购物车
	[ADD_CART](state, {
		pdt_id,
		category_id,
		price
	}) {
		let cart = state.cartList;
		if (cart[pdt_id]) {
			cart[pdt_id]['num'] ++;
		} else {
			cart[pdt_id] = {
				"num" : 1,
				"pdt_id" : pdt_id,
				"category_id" : category_id,
				"price": price
			};
		}
		state.cartList = {...cart};
		//存入localStorage
		setStore('buyCart', state.cartList);
	},
	// 移出购物车
	[REDUCE_CART](state, {
		pdt_id
	}) {
		let cart = state.cartList;
		if (cart && cart[pdt_id]) {
			if (cart[pdt_id]['num'] > 0) {
				cart[pdt_id]['num']--;
				
			}
			if(cart[pdt_id]['num'] <= 0){
				//商品数量为0，则清空当前商品的信息
				delete cart[pdt_id];
			}
			state.cartList = {...cart};
			//存入localStorage
			setStore('buyCart', state.cartList);
		}
	},
	//网页初始化时从本地缓存获取购物车数据
	[INIT_BUYCART](state) {
		let initCart = getStore('buyCart');
		if (initCart) {
			state.cartList = JSON.parse(initCart);
		}
	},
	//清空当前商品的购物车信息
	[CLEAR_CART](state, pdt_id) {
		delete state.cartList[pdt_id];
		state.cartList = {...state.cartList};
		setStore('buyCart', state.cartList);
	}
}
