
var app = angular.module('GroupCtrl', [], function () {
  
})
 



app.controller('GroupController', function ($scope, $http) {
$scope.tagline = 'Nothing beats a pocket protector!';



  $scope.groupName2 = 'guest';


	$http.get('/api/groups').
	    success(function(data, status, headers, config) {
	      $scope.items = data;
	    });


});


 

app.controller('GroupDetailController', function ($scope, $routeParams) {
 

	$scope.groupId = $routeParams.groupId;


});

 