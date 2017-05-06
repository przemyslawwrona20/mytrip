(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('app.home.tripDetail', {
                url: '/trip/:tripId',
                views: {
                    'home@app.home': {
                        controller: 'TripDetailCtrl',
                        templateUrl: 'app/manager/home/tripDetail/tripDetail.tpl.html'
                    }
                },
                resolve: {
                    trip: ['ReportRemoteService', '$stateParams', function (ReportRemoteService, $stateParams) {
                        return ReportRemoteService.getTrip($stateParams.tripId);
                    }]
                },
                onEnter: function($stateParams, $state){
                    if($stateParams.tripId === undefined || $stateParams.tripId === '')
                        $state.go('app.home.trip');
                }
            });
        }])
})();