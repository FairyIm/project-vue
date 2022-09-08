import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes';
import store from '@/store'
// 使用插件
Vue.use(VueRouter);

let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
/*
   第一个参数：告诉原来的push方法往哪里跳转
   第二个参数：成功回调
   第三个参数：失败的回调
*/
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => {}, () => {})
    }
}


// 配置路由
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return {
            y: 0
        }
    },
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // to:获取要跳转到的路由信息
    // from：从哪个路由来的
    // next：放行函数，next()放行，next(path)放行到指定路由
    // next()
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name
    if (token) { //判断是否登录
        if (to.path == '/login' || to.path == '/register') { //登录后进入login
            next('/')
        } else {
            if (name) { //登录后不进去login,进入其他页面判断是否有userInfo
                next()
            } else {
                try { //没有用户信息则派发跳转
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) { //token失效
                    await store.dispatch('getlogout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录不能去交易、支付相关
        if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/center') != -1) {
            // 添加query,用来保存未登录时点击的业务。用来在登录之后判断
            next('/login?redirect=' + to.path)
        } else {
            next()
        }
    }
})

export default router