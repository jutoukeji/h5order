import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
	state: {
		cartList: [],
		cartNum: 0
	},
	mutations: {
		refreshCart(state, item) {
			let list = state.cartList;
			let totalNum = 0;
			let isExist = false;
			for(let i = 0; i < list.length; i++){
				let temp = list[i];
				if(temp.foodId == item.foodId){
					list[i] = item;
					totalNum += item.num;
					isExist = true;
				} else {
					totalNum += temp.num;
				}
			}
			if(!isExist){
				list.push(item);
				totalNum += item.num;
			}
			state.cartNum = totalNum;
		}
	}
})