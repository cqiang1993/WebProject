angular.module('classApp').controller('StuCtrl',function($rootScope,$scope,$http,$location){
    $scope.stus = [];
    $http({
        url:'/users/stulist',
        method:'GET'
    }).success(function (stus){
        $scope.stus = stus;
    }).error(function(){

    });
    $scope.save = function(){
            $http({
                url:'/users/addStu',
                method:'POST',
                data:$scope.stu
            }).success(function (stu){
                if(!$scope.stu._id){
                    $scope.stus.push(stu);
                }else{
                    $scope.stus.forEach(function (stu) {
                        if (stu._id = $scope.stu._id) {
                            stu = $scope.stu;
                        }
                    });
                }
                $http({
                    url:'/users/stulist',
                    method:'GET'
                }).success(function (stus){
                    $scope.stus = stus;
                }).error(function(){

                });
            }).error(function(){
                alert('该学号已存在,请重新输入');
                return false;
            })
        };
    $scope.delete = function(){
        $http({
            url:'/users/deleteStu',
            method:'POST',
            data:$scope.stu
        }).success(function (stu){
            $scope.stus = $scope.stus.filter(function(stu){
                return stu._id != $scope.stu._id;
            })
        }).error(function(){

        })
    }
    });
angular.module('classApp').directive('addStudent',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.stu = {};
                });
                $('#addDialog').modal(true);
            })
        }
    }
})

angular.module('classApp').directive('editStudent',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.stu = scope.stus[attrs.index];
                });
                $('#addDialog').modal(true);
            })
        }
    }
});
angular.module('classApp').directive('viewStudent',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.stu = scope.stus[attrs.index];
                });
                $('#viewDialog').modal(true);
            })
        }
    }
});
angular.module('classApp').directive('deleteStudent',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                scope.$apply(function(){
                    scope.$parent.stu = scope.stus[attrs.index];
                });
                $('#deleteDialog').modal(true);
            })
        }
    }
});
angular.module('classApp').directive('selectAllStus',function(){
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

angular.module('classApp').directive('selectStuItem',function(){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                var isChecked = $("input[type='checkbox']:not(:checked)").length ? false : true;
                $('#selectAllStus').prop('checked', isChecked);
            });
        }
    }
});

angular.module('classApp').directive('batchDeleteStus',function(dataService){
    return {
        link:function(scope,element,attrs){
            element.click(function(){
                var stus = $("input[type='checkbox']:checked");
                var _ids = [];
                stus.each(function (index, stu) {
                    _ids.push($(stu).attr('data-id'));
                });
                dataService.post('/users/batchDeleteStus', {_ids: _ids}, function (data) {
                    scope.stus = scope.stus.filter(function (stu) {
                        return _ids.indexOf(stu._id) == -1;
                    });
                });
            });
        }
    }
});