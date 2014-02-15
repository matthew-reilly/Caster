
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


 

app.controller('GroupDetailController', function ($scope, $http, $routeParams) {
 
	 
	$http.get('/api/room/'+$routeParams.groupId).
	    success(function(data, status, headers, config) {
	   		if(data.success){
				$scope.room = data.result;
	      		console.log("Room error: ");

	   		}
	      		 
	      	else
	      		$scope.errorMsg = data.msg;
	    });


	//this is where we get the details of the group. Cards played, cards dealt, etc.
	//$scope.groupId = $routeParams.groupId;

	//current card
	$scope.name= $scope.name;

	//played cards
	$scope.played;


});

 