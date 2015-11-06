///<reference path='../../../angular.d.ts'/>
'use strict';
var SocialNetwork;
(function (SocialNetwork) {
    var Controllers;
    (function (Controllers) {
        var PageController = (function () {
            function PageController($scope, $rootScope) {
                var _this = this;
                this.routeChangeSuccessHandler = function () {
                    _this.rootScope.pageLoaded = true;
                };
                this.routeChangeStartHandler = function (event, next, current) {
                    if (next.$$route.originalPath == '/postModal' && current && current.$$route.originalPath == '/') {
                        event.preventDefault();
                    }
                };
                this.fillChatAreaWithFakeFriends = function () {
                    for (var i = 0; i < 20; i++) {
                        if (i % 2 == 0) {
                            _this.scope.onlineFriends.push({ avatar: 'images/nissan.jpg', name: 'Friend', surname: 'Friend' });
                        }
                        else {
                            _this.scope.onlineFriends.push({
                                avatar: 'images/avatar1.jpg',
                                name: 'Friend',
                                surname: 'Friend',
                                online: true
                            });
                        }
                    }
                };
                this.scope = $scope;
                this.rootScope = $rootScope;
                this.scope.$on('$routeChangeSuccess', this.routeChangeSuccessHandler);
                this.rootScope.$on('$routeChangeStartHandler', this.routeChangeStartHandler);
                this.scope.onlineFriends = [];
                this.fillChatAreaWithFakeFriends();
            }
            return PageController;
        })();
        Controllers.PageController = PageController;
        angular.module('SocialNetwork').controller('SocialNetwork.Controllers.PageController', PageController);
    })(Controllers = SocialNetwork.Controllers || (SocialNetwork.Controllers = {}));
})(SocialNetwork || (SocialNetwork = {}));
//# sourceMappingURL=PageController.js.map