(function ( window, angular, undefined ) {

    angular.module('mytrip.view.tripDetail', [
        'ui.router'
    ])
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('app.home.tripDetail', {
                url: '/trip/:tripId',
                views: {
                    'home@app.home': {
                        controller: 'TripDetailCtrl',
                        templateUrl: 'app/manager/home/tripDetail/tripDetail.tpl.html'
                    }
                }
            });
        }])
        .controller('TripDetailCtrl', ['$scope', '$state', function ($scope, $state) {

        }]);
})( window, window.angular );