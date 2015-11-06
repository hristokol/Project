///<reference path='../../../angular.d.ts'/>
///<refrence path='../../../angular-route.d.ts'/>
'use strict';
var SocialNetwork;
(function (SocialNetwork) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider.when('/profile', {
                templateUrl: 'SocialNetwork/profile.htm',
                controller: 'SocialNetwork.Controllers.ProfileController'
            }).when('/', {
                templateUrl: 'SocialNetwork/home.html'
            }).when('/postModal', { redirectTo: '/' }).otherwise('/');
        };
        Routes.$inject = ["$routeProvider"];
        return Routes;
    })();
    SocialNetwork.Routes = Routes;
})(SocialNetwork || (SocialNetwork = {}));
//# sourceMappingURL=routes.js.map