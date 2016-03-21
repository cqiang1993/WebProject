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
    });
angular.module('classApp')
    .controller('HomeCtrl',function(){

    }).controller('RegCtrl',function(){

    }).controller('LoginCtrl',function(){

    });