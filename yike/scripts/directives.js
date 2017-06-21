//自定义指令模块
angular.module('Directives',[])
.directive('loading',function(){
	return{
		restrict:'A',
		replace:true,
		template:'<img src ="public/images/loading.gif" alt=""/>'
		
	}
})
;
