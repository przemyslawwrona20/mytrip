(function ( window, angular, undefined ) {

    angular.module('mytrip.view.trip', [
        'ui.router'
    ])
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('app.home.trip', {
                url: '/trip',
                views: {
                    'home@app.home': {
                        controller: 'TripCtrl',
                        templateUrl: 'app/manager/home/trip/trip.tpl.html'
                    }
                }
            });
        }])
        .controller('TripCtrl', ['$scope', '$state', function ($scope, $state) {

            $scope.points = [{
                id: 0,
                name: '',
                coordinates: {
                    x: 5000,
                    y: 6000
                },
                photoPath: ''
            }]
        }]);
})( window, window.angular );
