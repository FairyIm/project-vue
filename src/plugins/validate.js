import Vue from 'vue'
import VeeValidate from 'vee-validate'
// 中文
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

VeeValidate.Validator.localize("zh_CN", {
	messages: {
		...zh_CN.messages,
		is: (Field) => `${Field}必须与密码相同`
	},
	attributes: {
		phone: '手机号',
		code: '验证码',
		password: "密码",
		password1: "确认密码",
		agree: '协议'
	}
})

// 协议选择
VeeValidate.Validator.extend('tongyi', {
	validate: (value) => {
		return value
	},
	getMessage: (Field) => Field + '必须同意'
})