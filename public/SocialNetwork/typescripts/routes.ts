///<reference path='../../../angular.d.ts'/>
///<refrence path='../../../angular-route.d.ts'/>
'use strict'
module SocialNetwork {
    export class Routes {
        static $inject = ["$routeProvider"];

        static configureRoutes($routeProvider:any) {

            $routeProvider.
                when('/profile', {
                    templateUrl: 'SocialNetwork/profile.htm',
                    controller: 'SocialNetwork.Controllers.ProfileController'
                }).
                when('/', {
                    templateUrl: 'SocialNetwork/home.html'
                }).
                when('/postModal', {redirectTo: '/'}).
                otherwise('/');
        }
    }
}