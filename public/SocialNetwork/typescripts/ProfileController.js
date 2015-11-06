///<reference path='../../../angular.d.ts'/>
'use strict';
var SocialNetwork;
(function (SocialNetwork) {
    var Controllers;
    (function (Controllers) {
        var ProfileController = (function () {
            function ProfileController($scope) {
                this.scope = $scope;
                this.scope.pageClass = 'profile-page';
            }
            return ProfileController;
        })();
        Controllers.ProfileController = ProfileController;
        angular.module('SocialNetwork').controller('SocialNetwork.Controllers.ProfileController', ProfileController);
    })(Controllers = SocialNetwork.Controllers || (SocialNetwork.Controllers = {}));
})(SocialNetwork || (SocialNetwork = {}));
//# sourceMappingURL=ProfileController.js.map