///<reference path='../../../angular.d.ts'/>
'use strict';
var SocialNetwork;
(function (SocialNetwork) {
    var Services;
    (function (Services) {
        var SocketService = (function () {
            function SocketService($rootScope) {
                this.disconnected = false;
                this.rootScope = $rootScope;
                this.CreateService();
            }
            SocketService.prototype.CreateService = function () {
                return {
                    on: this.on,
                    emit: this.emit,
                    connect: this.connect,
                    disconnect: this.disconnect
                };
            };
            SocketService.prototype.on = function (event, callback) {
                this.socket.on(event, function () {
                    if (!this.disconnected) {
                        this.rootScope.$apply(function () {
                            callback(event, arguments);
                        });
                    }
                });
            };
            SocketService.prototype.emit = function (event, data, callback) {
                this.socket.emit(event, data, function () {
                    this.rootScope.$apply(function () {
                        if (callback && !this.disconnected) {
                            callback(event, arguments);
                        }
                    });
                });
            };
            SocketService.prototype.connect = function (token) {
                this.socket = io.connect("?token=" + token, { forceNew: true });
            };
            SocketService.prototype.disconnect = function () {
                this.disconnected = true;
                this.socket.disconnect();
            };
            return SocketService;
        })();
        Services.SocketService = SocketService;
        angular.module('SocialNetwork').service('SocialNetwork.Services.SocketService', ['$rootScope', SocketService]);
    })(Services = SocialNetwork.Services || (SocialNetwork.Services = {}));
})(SocialNetwork || (SocialNetwork = {}));
//# sourceMappingURL=SocketService.js.map