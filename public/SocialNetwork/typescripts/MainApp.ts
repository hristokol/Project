///<reference path='../../../angular.d.ts'/>
///<refrence path='../../../angular-route.d.ts'/>
///<reference path='routes.ts'/>

((): void=> {
    angular.module("SocialNetwork", ['ngRoute','ngAnimate']).config(SocialNetwork.Routes.configureRoutes);
})();