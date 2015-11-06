///<reference path='../../../angular.d.ts'/>
///<reference path='SocketService.ts'/>
'use strict'

module SocialNetwork.Controllers {
    export class PageController {
        scope:any;
        rootScope:any;
        SocketService:any;

        constructor($scope:ng.IScope, $rootScope:any, $attrs:any, SocketService:any) {
            this.scope = $scope;
            this.rootScope = $rootScope;
            this.SocketService = SocketService;
            SocketService.connect($attrs.token);
            this.scope.$on('$routeChangeSuccess', this.routeChangeSuccessHandler);
            this.rootScope.$on('$routeChangeStart', this.routeChangeStartHandler);
            this.scope.onlineFriends = [];
            this.fillChatAreaWithFakeFriends();
        }

        private routeChangeSuccessHandler = ()=> {
            this.rootScope.pageLoaded = true;
        }

        private routeChangeStartHandler = (event, next, current)=> {
            if (next.$$route.originalPath == '/postModal' && current && current.$$route.originalPath == '/') {
                event.preventDefault();
            }
        }

        private fillChatAreaWithFakeFriends = ()=> {
            for (var i = 0; i < 20; i++) {
                if (i % 2 == 0) {
                    this.scope.onlineFriends.push({avatar: 'images/nissan.jpg', name: 'Friend', surname: 'Friend'});
                } else {
                    this.scope.onlineFriends.push({
                        avatar: 'images/avatar1.jpg',
                        name: 'Friend',
                        surname: 'Friend',
                        online: true
                    });
                }
            }
        }

    }
    angular.module('SocialNetwork').controller('SocialNetwork.Controllers.PageController', ['$scope', '$rootScope', '$attrs', 'SocialNetwork.Services.SocketService', PageController]);
}