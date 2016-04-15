angular.module('classApp').controller('ChangeCtrl',function($scope,$http,$location){
    $scope.user = {};
    $scope.change = function(){
        $http({
            url:'/users/changePassword',
            method:'POST',
            data:$scope.user
        }).success(function(response){
            $location.path('/login');
        }).error(function(response){

        })
    }
});