'use strict'
var app = angular.module('SocialNetwork', ['ngRoute', 'ngAnimate']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/profile', {templateUrl: 'SocialNetwork/profile.htm', controller: 'profileController'}).
        when('/', {templateUrl: 'SocialNetwork/home.html', controller: 'pageController'}).
        when('/postModal',{redirectTo:'/'}).
        otherwise('/');
}]);



