angular.module('classApp').controller('DetailCtrl',function($rootScope,$scope,$http,$location){
    $scope.exers = [];
    $http({
        url:'/exers/exerlist',
        method:'GET'
    }).success(function (exers){
        $scope.exers = exers;
    }).error(function(){

    });
});

