angular.module('classApp').controller('ChangeCtrl',function($scope,$http,$location){
    $scope.user = {};
    $scope.change = function(){
        if(document.getElementById('old_password').value.length == 0 || document.getElementById('password').value.length == 0 ){
            alert('所有密码不能为空！');
            return false;
        }
        $http({
            url:'/users/changePassword',
            method:'POST',
            data:$scope.user
        }).success(function(response){
            $location.path('/login');
        }).error(function(response){
            alert("原密码错误")
        })
    }
});