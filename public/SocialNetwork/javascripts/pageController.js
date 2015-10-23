'use strict'

app.controller('pageController', function ($rootScope, $scope) {
    $scope.onlineFriends = [];

    for (var i = 0; i < 20; i++) {
        if (i % 2 == 0) {
            $scope.onlineFriends.push({avatar: 'images/nissan.jpg', name: 'Friend', surname: 'Friend'});
        } else {
            $scope.onlineFriends.push({avatar: 'images/avatar1.jpg', name: 'Friend', surname: 'Friend',online:true});

        }
    }

    $scope.$on('$routeChangeSuccess', function () {
        $rootScope.pageLoaded = true;
    });

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if (next.$$route.originalPath == '/postModal' && current && current.$$route.originalPath == '/') {
            event.preventDefault();
        }
    });

});