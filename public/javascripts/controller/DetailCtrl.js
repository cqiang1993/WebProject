angular.module('classApp').controller('DetailCtrl',function($rootScope,$scope,$http,$state){
    $scope.exers = [];
        $http({
            url:'/exers/exerlist',
            method:'GET'
        }).success(function (exers){
            $scope.exers = exers;
        }).error(function(){

        });

    $scope.refresh = function(id){
        $http({
            url:'/details/list_details',
            method:'POST',
            data:{"_id":id}
        }).success(function (){
            $http({
                url:'/exers/exerlist',
                method:'GET'
            }).success(function (exers){
                $scope.exers = exers;
            }).error(function(){

            });
        }).error(function(){
        });
    };
});

//angular.module('classApp').directive('refreshDetails',function(){
//    return {
//        link:function(scope,element,attrs){
//            element.click(function(){
//                scope.$apply(function(){
//                    scope.$parent.exer = scope.exers[attrs.index];
//                });
//            })
//        }
//    }
//});
