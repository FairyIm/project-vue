import { reqCartList,reqCartDel,reqCartChecked } from "@/api";
const state={
	cartList:[],
}
const actions={
	async getcartList({commit}){
		let res = await reqCartList();
		if(res.code == '200'){
			commit('CARTLIST',res.data)
		}
	},
	// 删除购物车
	async getDelList({commit},{skuId}){
		let res = await reqCartDel(skuId);
		if(res.code == '200'){
			return 'OK'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	// 切换选中状态
	async getCartChecked({commit},{skuID,isChecked}){
		let res = await reqCartChecked(skuID,isChecked);
		if(res.code == '200'){
			return 'OK'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	// 删除所有选择的商品
	delAllChecked({dispatch,getters}){
		let PromiseAll = [];
		getters.cartList.cartInfoList.forEach(item=>{
			let promise = item.isChecked == 1?dispatch('getDelList',{skuId:item.skuId}):'';
			PromiseAll.push(promise)
		})
		return Promise.all(PromiseAll)
	}
}
const mutations={
	CARTLIST(state,cartList){
		state.cartList = cartList
	},
}
const getters={
	cartList(state){
		return state.cartList[0] || []
	},
}

export default{
	state,
	actions,
	mutations,
	getters
}