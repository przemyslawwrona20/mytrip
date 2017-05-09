(function () {
    'use strict';

    angular.module('mytrip.trip')
        .controller('TripCtrl', ['$scope', '$state', 'trips', 'ReportRemoteService',
            function ($scope, $state, trips, ReportRemoteService) {

            $scope.points = [{
                id: 0,
                name: '',
                coordinates: {
                    x: 5000,
                    y: 6000
                },
                photoPath: ''
            }];

            $scope.trips = trips.data.results;

            $scope.getDetails = function (tripId) {
                $state.go('app.home.tripDetail', {tripId: tripId})
            }

            $scope.postTrip = function() {
                var newTrip = {
                    name: $scope.name,
                    description: $scope.description,
                    points: $scope.points,
                    media: $scope.media,
                    startDate: $scope.startDate.toISOString().substring(0,10),
                    endDate: $scope.endDate.toISOString().substring(0,10),
                }
                ReportRemoteService.postTrip(newTrip);
            }
            }]);
})();
