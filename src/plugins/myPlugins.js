// 暴露一个对象
let myPlunins={}
myPlunins.install = function(Vue,options){
	Vue.directive(options.name,(element,params)=>{
		// console.log(element,params);
		element.innerHTML=params.value.toUpperCase()
	})
}

export default myPlunins;
