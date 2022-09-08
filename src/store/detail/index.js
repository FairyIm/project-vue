import { reqDetailList,reqAddShoppingCart } from "@/api";
import {getUUID} from '@/utils/uuid'
const state={
	goodsList:{},
	uuid_token:getUUID()
}
const mutations={
	DETAILlIST(state,goodsList){
		state.goodsList=goodsList
	}
}
const actions={
	async getDetailList({commit},skuId={}){
		let res= await reqDetailList(skuId);
		// console.log('detailList',res);
		if(res.code == '200'){
			commit('DETAILlIST', res.data)
		}
	},
	// 添加购物车
	async getAddShoppingCart({commit},{skuId,skuNum}){
		let res = await reqAddShoppingCart(skuId,skuNum)
		console.log("AddShoppingCart",res);
		if(res.code == '200'){
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	}
}
const getters={
	categoryView(state){
		return state.goodsList.categoryView || {}
	},
	detailList(state){
		return state.goodsList.detailList || {}
	},
	skuInfo(state){
		return state.goodsList.skuInfo || {}
	},
	spuSaleAttrList(state){
		return state.goodsList.spuSaleAttrList || {}
	},
	skuImageList(state){
		return state.goodsList.skuInfo.skuImageList || []
	}
}

export default {
	state,
	mutations,
	actions,
	getters,
}