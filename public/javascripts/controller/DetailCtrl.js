angular.module('classApp').controller('DetailCtrl',function($rootScope,$scope,$http,$location){
    $scope.exers = [];
        $http({
            url:'/exers/exerlist',
            method:'GET'
        }).success(function (exers){
            $scope.exers = exers;
        }).error(function(){

        });

    $scope.refresh = function(){
        $http({
            url:'/details/list_details',
            method:'POST',
            data:$scope.exer
        }).success(function (exer){
            $scope.exers.forEach(function (exer) {
                if (exer._id = $scope.exer._id) {
                    $scope.exer = exer;
                }
            });
        }).error(function(){

        })
    };
});

angular.module('classApp').directive('refreshDetails',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.exer = scope.exers[attrs.index];
                });
            })
        }
    }
});
