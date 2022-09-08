import {v4 as uuidv4} from 'uuid';
// 生成随机字符串，且每次执行不能发生变化，游客身份持久存储
export const getUUID = () => {
	// 看本地是否有uuid,没有则生成游客临时身份
	let uuid_token = localStorage.getItem('UUIDTOKEN');
	if (!uuid_token) {
		uuid_token = uuidv4();
		// 存储至本地
		localStorage.setItem('UUIDTOKEN', uuid_token)
	}
	return uuid_token
}