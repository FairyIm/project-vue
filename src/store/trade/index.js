import { reqUserAddressList,reqtradeList,reqsubmitOrders} from "@/api";
// 登录注册store
const state = {
	userAddressList:[],
	tradeList:{}
};
const actions = {
	async getUserAddressList({commit}){
		let res = await reqUserAddressList();
		// console.log(res);
		if(res.code == 200){
			commit('USERADDRESSLIST',res.data)
		}
	},
	async getTradeList({commit}){
		let res = await reqtradeList();
		// console.log(res);
		if(res.code == 200){
			commit('TRADELIST',res.data)
		}
	},
};
const mutations = {
	USERADDRESSLIST(state,address){
		state.userAddressList = address
	},
	TRADELIST(state,tradeList){
		state.tradeList = tradeList
	},
};
const getters = {
	detailArrayList(state){
		return state.tradeList.detailArrayList || []
	}
};
export default{
	state,
	actions,
	mutations,
	getters
}
