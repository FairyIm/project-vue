import { reqyzm,reqregister,reqlogin,requserInfo,reqlogout } from "@/api";
import {setToken,getToken,removeToken} from '@/utils/token'
// 登录注册store
const state = {
	code:'',
	token:getToken(),
	userInfo:{}
};
const actions = {
	// 发送验证码
	async getPhoneCode({commit},phone){
		let res = await reqyzm(phone);
		// console.log('手机验证码',res);
		if(res.code == 200){
			// 如果接口将验证码返回到手机短信，不需要写commit
			commit('PHONECODE',res.data)
		}
	},
	//完成注册
	async getRegister({commit},params){
		let res = await reqregister(params);
		if(res.code == 200){
			return 'OK'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	// 请求登录
	async getLogin({commit},params){
		let res = await reqlogin(params);
		if(res.code == 200){
			commit('LOGIN',res.data.token)
			// 存储token
			setToken(res.data.token)
			return 'OK'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	// 请求用户信息
	async getUserInfo({commit}){
		let res = await requserInfo();
		// console.log(res);
		if(res.code == 200){
			commit('USERINFO',res.data)
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
	// 退出登录
	async getlogout({commit}){
		let res = await reqlogout();
		console.log(res);
		if(res.code == 200){
			// 在mutations里清除state以及本地存储
			commit('CLEAR')
			return 'ok'
		}else{
			return Promise.reject(new Error('faile'))
		}
	},
};
const mutations = {
	PHONECODE(state,code){
		state.code = code
	},
	LOGIN(state,token){
		state.token = token
	},
	USERINFO(state,userInfo){
		state.userInfo = userInfo
	},
	CLEAR(state){
		state.token = '';
		state.userInfo = {};
		removeToken()
	}
};
const getters = {};
export default{
	state,
	actions,
	mutations,
	getters
}
