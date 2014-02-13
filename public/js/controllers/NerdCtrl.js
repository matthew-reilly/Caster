angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	$http.get('/api/cards').
	    success(function(data, status, headers, config) {
	      $scope.items = data;
	    });


});