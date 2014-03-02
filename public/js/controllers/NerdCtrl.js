angular.module('NerdCtrl', []).controller('NerdController', function($scope, $http, $location) {

	$scope.tagline = 'Nothing beats a pocket protector!';

	$http.get('/api/cards').
	    success(function(data, status, headers, config) {
	      $scope.items = data;
	    });

	$scope.startGame = function () {
	  
		 $location.path('/room/5300730261cd0b000033e393');
      }

});