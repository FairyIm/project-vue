export default [{
		path: "/home",
		component: () => import('@/pages/Home'),
		meta: {
			show: true
		} //路由元信息
	},
	{
		path: "/search/:keyword?",
		component: () => import('@/pages/Search'),
		meta: {
			show: true
		},
		name: "search",
	},
	{
		path: "/login",
		component: () => import('@/pages/Login'),
		meta: {
			show: false
		}
	},
	{
		path: "/register",
		component: () => import('@/pages/Register'),
		meta: {
			show: false
		}
	},
	// 路由重定向，访问/，定向到首页
	{
		path: "/",
		redirect: "/home"
	},
	{
		path: "/detail/:keyword?",
		component: () => import('@/pages/Detail'),
		meta: {
			show: true
		}
	},
	// 添加购物车成功页面
	{
		path: "/addcartsuccess/:keyword?",
		name: 'addcartsuccess',
		component: () => import('@/pages/AddCartSuccess'),
		meta: {
			show: true
		}
	},
	// 购物车页面
	{
		path: "/shopcart",
		name: 'shopcart',
		component: () => import('@/pages/ShopCart'),
		meta: {
			show: true
		}
	},
	// 结算页面
	{
		path: "/trade",
		name: 'trade',
		component:  () => import('@/pages/Trade'),
		meta: {
			show: true
		},
		// 只有从购物车才能进入结算
		beforeEnter: (to, from, next) => {
			if (from.path == '/shopcart') {
				next()
			} else {
				next(false)
			}
		},
	},
	// 支付页面
	{
		path: "/pay/:orderId?",
		name: 'pay',
		component: () => import('@/pages/Pay'),
		meta: {
			show: true
		}
	},
	// 支付成功页面
	{
		path: "/paysuccess",
		name: 'PaySuccess',
		component:() => import('@/pages/PaySuccess') ,
		meta: {
			show: true
		},
		// 只有从支付页面才能进入支付成功页面
		beforeEnter: (to, from, next) => {
			if (from.path == '/pay') {
				next()
			} else {
				next(false)
			}
		},
	},
	// 个人中心
	{
		path: "/center",
		name: 'Center',
		component: () => import('@/pages/Center') ,
		meta: {
			show: true
		},
		redirect: '/center/myorder', //路由重定向
		children: [{
				path: "myorder",
				component: () => import('@/pages/Center/MyOrder') ,
			},
			{
				path: "grouporder",
				component: () => import('@/pages/Center/GroupOrder') ,
			},
			{
				path: '/center/myorder',
			}
		]
	},
]