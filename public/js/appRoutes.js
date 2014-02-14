angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/groups', {
			templateUrl: 'views/group.html',
			controller: 'GroupController'	
		})
		.when('/group/:groupId', {
			templateUrl: 'views/groupdetail.html',
			controller: 'GroupDetailController'	
		})
		.when('/users', {
			templateUrl: 'views/users.html',
			controller: 'UserController'	
		});;

	$locationProvider.html5Mode(true);

}]);