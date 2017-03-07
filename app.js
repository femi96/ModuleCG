(function()
{
	var modApp = angular.module('modApp', ["ngRoute"]);
	modApp.controller('modController', function($scope, $location){

		$scope.routeMatch = function(inp) {
			if(inp == $location.path()){
				return 'act'
			}
			return
		};

	});

	modApp.config(function($routeProvider){
		$routeProvider
		.when("/", { templateUrl : "pages/main.html" })
		.when("/about", { templateUrl : "pages/about.html" })
		.when("/rules", { templateUrl : "pages/rules.html" })
		.when("/cards", { templateUrl : "pages/cards.html" })
		.when("/download", { templateUrl : "pages/download.html" })
		.when("/team", { templateUrl : "pages/team.html" });
	});

	modApp.directive('head', ['$rootScope','$compile',	function($rootScope, $compile){
		return {
			restrict: 'E',
			link: function(scope, elem){
				var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
				elem.append($compile(html)(scope));
				scope.routeStyles = {};
				$rootScope.$on('$routeChangeStart', function (e, next, current) {
					if(current && current.$$route && current.$$route.css){
						if(!angular.isArray(current.$$route.css)){
							current.$$route.css = [current.$$route.css];
						}
						angular.forEach(current.$$route.css, function(sheet){
							delete scope.routeStyles[sheet];
						});
					}
					if(next && next.$$route && next.$$route.css){
						if(!angular.isArray(next.$$route.css)){
							next.$$route.css = [next.$$route.css];
						}
						angular.forEach(next.$$route.css, function(sheet){
							scope.routeStyles[sheet] = sheet;
						});
					}
				});
			}
		};
	}]);
})();