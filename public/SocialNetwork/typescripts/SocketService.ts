///<reference path='../../../angular.d.ts'/>
'use strict'
module SocialNetwork.Services {
    export class SocketService {
        socket:any;
        rootScope:any;
        disconnected:boolean = false;

        constructor($rootScope:any) {
            this.rootScope = $rootScope;
            this.CreateService();
        }

        private CreateService() :any{
            return {
                on: this.on,
                emit: this.emit,
                connect: this.connect,
                disconnect: this.disconnect
            }
        }

        private on(event, callback) :void{
            this.socket.on(event, function () {
                if (!this.disconnected) {
                    this.rootScope.$apply(function () {
                        callback(event, arguments);
                    });
                }
            });
        }

        private emit(event, data, callback) :void{
            this.socket.emit(event, data, function () {
                this.rootScope.$apply(function () {
                    if (callback && !this.disconnected) {
                        callback(event, arguments);
                    }
                });
            });
        }

        private connect(token) :void{
            this.socket = io.connect("?token=" + token, {forceNew: true});
        }

        private disconnect() :void{
            this.disconnected=true;
            this.socket.disconnect();
        }


    }
    angular.module('SocialNetwork').service('SocialNetwork.Services.SocketService', ['$rootScope', SocketService]);
}