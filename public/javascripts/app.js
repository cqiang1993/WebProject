angular.module('classApp',['ngRoute'])
    .config(function($routeProvider,$locationProvider){
        $routeProvider.when('/',{
            templateUrl:'pages/home.html',
            controller:'HomeCtrl'
        }).when('/reg',{
            templateUrl:'pages/reg.html',
            controller:'RegCtrl'
        }).when('/login',{
            templateUrl:'pages/login.html',
            controller:'LoginCtrl'
        }).otherwise({
            redirectTo:'/'
        });
    }).run(function($rootScope,$location,$http){
        $http({
            url:'/users/validate',
            method:'GET'
        }).success(function(user){
            $rootScope.me = user;
            $location.path('/');
        }).error(function(data){
            $location.path('/login');
        });
    });
angualr.module('classApp').controller('HomeCtrl',function(){

});