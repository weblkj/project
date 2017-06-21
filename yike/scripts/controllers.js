//2.创建控制器模块
//3创建控制器
angular.module('Controllers',[])
.controller('DemoController',['$scope',function ($scope){
	console.log("调用demo控制器了");
}])
.controller('NavController',['$scope','$rootScope',function ($scope,$rootScope){
	$scope.navs = [
			 		{'link':'#/today','icon':'icon-home','text':'今日一刻'},
			 		{'link':'#/older','icon':'icon-file-empty','text':'往期内容'},
			 		{'link':'#/author','icon':'icon-pencil','text':'热门作者'},
			 		{'link':'#/category','icon':'icon-menu','text':'栏目浏览'},
			 		{'link':'#/favourite','icon':'icon-heart','text':'我的喜欢'},
			 		{'link':'#/settings','icon':'icon-cog','text':'设置'}
		 		];
	$rootScope.index = 0;
}])
.controller('todayController',['$scope','$filter','$http','$rootScope',function ($scope,$filter,$http,$rootScope){
	var today = $filter('date')(new Date,'yyyy-MM-dd');
	// $scope.today = today;
	$rootScope.loaded = true;
	$rootScope.index = 0;
	$http({
		url:'./api/today.php',
		params:{today:today}//today='2017-05-12'
	}).then(function(info){
		// console.log(info);
		$rootScope.loaded = false;
		$scope.date = info.data.date;
		$scope.posts = info.data.posts;
	});
		 
}])
.controller('olderController',['$scope','$filter','$http','$rootScope',function ($scope,$filter,$http,$rootScope){
	var older = $filter('date')(new Date,'yyyy-MM-dd');
	$rootScope.loaded = true;
	$rootScope.index = 1;
	// $scope.older = older;
	// console.log(older);
	$http({
		url:'./api/older.php',
		params:{older:older}
	}).then(function(info){
		console.log(info.data);
		$rootScope.loaded = false;
		$scope.date = info.data.date;
		$scope.posts = info.data.posts;
		// console.log($scope.posts);
	})
}])
.controller('authorController',['$scope','$filter','$http','$rootScope',function ($scope,$filter,$http,$rootScope){
	var today = $filter('date')(new Date,'yyyy-MM-dd');
	// $scope.today = today;
	$rootScope.loaded = true;
	$rootScope.index = 2;
	$http({
		url:'./api/author.php'
	}).then(function(info1,info2){
		// console.log(info);
		$rootScope.loaded = false;
		console.log(info1.data);
		$scope.authors = info1.data.authors;
		console.log($scope.authors);
		console.log(info2);
	});
		 
}])
;