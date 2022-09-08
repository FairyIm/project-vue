// api统一管理
import requests from "./request";
import mockRequests from "./mockApi";

// 发送请求:axios发送请求返回结果为promise对象
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: "get" })

// 获取banner轮播图
export const reqGetBannerList = () => mockRequests.get('/banner');

// 获取floor
export const reqGetFloorList = () => mockRequests.get('/floor');

// search
export const reqSearchList = (params) => requests({ url: "/list", method: "post", data: params })

// detail
export const reqDetailList = (skuId) => requests({ url: `/item/${ skuId }`, method: "get" })

// 添加购物车
export const reqAddShoppingCart = (skuId,skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

// 获取购物车列表 
export const reqCartList = () => requests({ url: '/cart/cartList', method: "get" })

// 删除购物车
export const reqCartDel = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })

// 切换商品选中状态
export const reqCartChecked = (skuID,isChecked) => requests({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: "get" })

// 注册-发送验证码
export const reqyzm = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })

// 完成注册
export const reqregister = (data) => requests({ url: '/user/passport/register',data, method: "post" })

// 请求登录
export const reqlogin = (data) => requests({ url: '/user/passport/login',data, method: "post" })

// 登录后的用户信息
export const requserInfo = (data) => requests({ url: '/user/passport/auth/getUserInfo',data, method: "get" })

// 退出登录
export const reqlogout = () => requests({ url: '/user/passport/logout', method: "get" })

// 获取订单交易页信息
export const reqtradeList = () => requests({ url: '/order/auth/trade', method: "get" })

// 获取订单交易页信息
export const reqUserAddressList = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: "get" })

// 提交订单
export const reqsubmitOrders = (tradeNo,params) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data:params,method: "post" })

//获取订单支付信息
export const reqorderInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`,method: "get" })

//获取订单支付状态
export const reqpayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`,method: "get" })

//15.获取我的订单列表
export const reqmyOrder = (page,limit) => requests({ url: `/order/auth/${page}/${limit}`,method: "get" })
