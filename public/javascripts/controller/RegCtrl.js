angular.module('classApp').controller('RegCtrl',function($scope,$http){
    $scope.user = {};
    $scope.save = function(){
        $http({
            url:'/users/reg',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $location.path('/login');
        }).error(function(){
            $location.path('/reg');
        })
    }
})