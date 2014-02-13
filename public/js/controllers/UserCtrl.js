
var app = angular.module('UserCtrl', [], function () {
  
})
 



app.controller('UserController', function ($scope, $http) {
$scope.tagline = 'Nothing beats a pocket protector!';



  $scope.groupName2 = 'guest';


	$http.get('/api/users').
	    success(function(data, status, headers, config) {
	      $scope.items = data;
	    });


});



 
app.controller('Formc', function ($scope) {
  
        $scope.groupName2 = 'guest';
  
	    
});