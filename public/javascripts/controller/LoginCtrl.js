angular.module('classApp').controller('LoginCtrl',function($rootScope,$scope,$http,$location){
    $scope.user = {};
    $scope.login = function(){
        if(document.getElementById('username').value.length==0||
            document.getElementById('password').value.length==0){
            alert('用户名,密码不能为空');
            return false;
        }else{$http({
            url:'/users/login',
            method:'POST',
            data:$scope.user
        }).success(function(user){
            $rootScope.me = user;
            $location.path('/home');
        }).error(function(){
            alert('用户名或密码错误，请确认后输入！');
            return false;
        });}

    }
    });