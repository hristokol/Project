///<reference path='../../../angular.d.ts'/>
'use strict'
module SocialNetwork.Controllers {

    export class ProfileController {
        scope:any;

        constructor($scope:ng.IScope) {
            this.scope = $scope;
            this.scope.pageClass = 'profile-page';
        }
    }
    angular.module('SocialNetwork').controller('SocialNetwork.Controllers.ProfileController',['$scope',ProfileController]);
}
