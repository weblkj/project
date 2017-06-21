//1.新建模块
var yike = angular.module('yike',['Controllers','ngRoute','Directives']);
//3.定义导航栏的打开关闭方法
yike.run(['$rootScope','$interval',function ($rootScope,$interval){
	//3.1初始化导航栏的状态-默认关闭
	$rootScope.collapsed = false;
	//3.2定义toggle方法
	$rootScope.toggle = function(){
		//3.2.1改变侧边导航栏的状态
		$rootScope.collapsed = !$rootScope.collapsed;
		//3.2.2查找所有导航栏中的具体内容(dd节点)
		var navss = document.querySelectorAll('.navs dd');
		var container = document.querySelector('.container');
		// console.log(navss.length);
		//3.2.3遍历所有的导航具体内容  将每一个内容往右移动
		if($rootScope.collapsed){
			// console.log("打开");
			for(var i = 0;i<navss.length;i++){
				//水平的垂直位移为0
				navss[i].style.transform='translate(0)';
				//开始前提顿0.2s
				navss[i].style.transitionDelay="0.2s";
				//过渡效果持续0.15s
				navss[i].style.transitionDuration=(i+1)*0.15+'s';
			}

		}else{
			for(var i = navss.length-1;i>-1;i--){
				//水平的垂直位移为-100%
				navss[i].style.transform='translate(-100%)';
				//停顿为""
				navss[i].style.transitionDelay="";
				//过渡效果持续0.15s
				navss[i].style.transitionDuration=(navss.length-i)*0.15+'s';
			}
		}
	}
}]);

//4.版本二的内容
//该行代码是为了解决AngularJS自动升级而导致的版本不一致问题
//现象: 地址栏显示!
yike.config(function ($locationProvider){
	$locationProvider.hashPrefix('');
});
//配置路由
yike.config(['$routeProvider',function ($routeProvider){
	// console.log($routeProvider);
	$routeProvider.when('/today',{
		templateUrl:'./views/today.html',
		controller:'todayController'
	})
	.when('/older',{
		templateUrl:'./views/older.html',
		controller:'olderController'
	})
	.when('/author',{
		templateUrl:'./views/author.html',
		controller:'authorController'
	})
;
}]);