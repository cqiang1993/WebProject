angular.module('classApp').controller('RegCtrl',function($scope,$http,$location){
    $scope.user = {};
    var radios = document.getElementsByName('course');
    $scope.save = function(){
        if(document.getElementById('username').value.length==0||
            document.getElementById('school').value.length==0||
            document.getElementById('password').value.length==0||
        document.getElementById('specialty').value.length==0){
            alert('用户名,密码,学校,专业不能为空！');
            return false;
        }else{
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
    }
});