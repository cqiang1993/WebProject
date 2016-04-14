angular.module('classApp').controller('ExerCtrl',function($rootScope,$scope,$http,$location){
    $scope.exers = [];
    $http({
        url:'/exers/exerlist',
        method:'GET'
    }).success(function (exers){
        $scope.exers = exers;
    }).error(function(){

    });

    $scope.save = function(){
            $http({
                url:'/exers/addExer',
                method:'POST',
                data:$scope.exer
            }).success(function (exer){
                if(!$scope.exer._id){
                    $scope.exers.push(exer);
                }else{
                    $scope.exers.forEach(function (exer) {
                        if (exer._id = $scope.exer._id) {
                            exer = $scope.exer;
                        }
                    });
                }
                $http({
                    url:'/exers/exerlist',
                    method:'GET'
                }).success(function (exers){
                    $scope.exers = exers;
                }).error(function(){

                });
            }).error(function(){

            })
        };
    $scope.delete = function(){
        $http({
            url:'/exers/deleteExer',
            method:'POST',
            data:$scope.exer
        }).success(function (exer){
            $scope.exers = $scope.exers.filter(function(exer){
                return exer._id != $scope.exer._id;
            });
            $http({
                url:'/exers/exerlist',
                method:'GET'
            }).success(function (exers){
                $scope.exers = exers;
            }).error(function(){

            });
        }).error(function(){

        })
    };
    $scope.change = function(id)
    {
        $http({
            url:'/exers/changeExer_online',
            method:'POST',
            data:{_id:id}
        }).success(function (exer){
            $scope.exers.forEach(function (exer) {
                if (exer._id = $scope.exer._id) {
                    $scope.exer = exer;
                }
            });
            $http({
                url:'/exers/exerlist',
                method:'GET'
            }).success(function (exers){
                $scope.exers = exers;
            }).error(function(){

            });
        }).error(function(){

        })
    }    });
angular.module('classApp').directive('addExercise',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.exer = {};
                });
                $('#addDialog').modal(true);
            })
        }
    }
})

angular.module('classApp').directive('editExercise',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.exer = scope.exers[attrs.index];
                });
                $('#addDialog').modal(true);
            })
        }
    }
});
angular.module('classApp').directive('viewExercise',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.exer = scope.exers[attrs.index];
                });
                $('#viewDialog').modal(true);
            })
        }
    }
});
angular.module('classApp').directive('deleteExercise',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.exer = scope.exers[attrs.index];
                });
                $('#deleteDialog').modal(true);
            })
        }
    }
});

angular.module('classApp').directive('changeExercise',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.exer = scope.exers[attrs.index];
                });
                $('#changeDialog').modal(true);
            })
        }
    }
});
angular.module('classApp').directive('selectAllExers',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                var self = $(this);
                $("input[type=checkbox]").each(function(){
                    $(this).prop('checked',self.prop('checked'));
                });
            });
        }
    }
});


angular.module('classApp').directive('selectExerItem',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                var isChecked = $("input[type='checkbox']:not(:checked)").length ? false : true;
                $('#selectAllExers').prop('checked', isChecked);
            });
        }
    }
});

angular.module('classApp').directive('batchDeleteExers',function(dataService){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                var stus = $("input[type='checkbox']:checked");
                var _ids = [];
                stus.each(function (index, stu) {
                    _ids.push($(stu).attr('data-id'));
                });
                dataService.post('/exers/batchDeleteExers', {_ids: _ids}, function (data) {
                    scope.exers = scope.exers.filter(function (exer) {
                        return _ids.indexOf(exer._id) == -1;
                    });
                });
            });
        }
    }
});