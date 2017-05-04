(function () {
    'use strict';

    angular.module('mytrip.trip')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('app.home.trip', {
                url: '/trip',
                views: {
                    'home@app.home': {
                        controller: 'TripCtrl',
                        templateUrl: 'app/manager/home/trip/trip.tpl.html'
                    }
                },
                resolve: {
                    trips: ['ReportRemoteService', function (ReportRemoteService) {
                        return ReportRemoteService.getTrips();
                    }]
                }
            });
        }])
})();
