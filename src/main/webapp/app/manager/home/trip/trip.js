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
                }
            });
        }])
        .controller('TripCtrl', ['$scope', '$state', 'ReportRemoteService', function ($scope, $state, ReportRemoteService) {

            $scope.points = [{
                id: 0,
                name: '',
                coordinates: {
                    x: 5000,
                    y: 6000
                },
                photoPath: ''
            }];

            $scope.trips = [];

            $scope.getTrips = function () {
                // ReportRemoteService.getTrips().then(function (trips) {
                //     $scope.trips = trips;
                // });

                $scope.trips = [
                    {
                        "id": 8,
                        "name": "Item name 2",
                        "description": "This is a nice description",
                        "pointList": null,
                        "poster": null,
                        "presentation": null,
                        "startDate": "1900-01-01",
                        "endDate": "1900-01-01"
                    },
                    {
                        "id": 6,
                        "name": "Item name 3",
                        "description": "This is a nice description",
                        "pointList": null,
                        "poster": null,
                        "presentation": null,
                        "startDate": null,
                        "endDate": null
                    },
                    {
                        "id": 13,
                        "name": "Item name 1",
                        "description": "This is a nice description",
                        "pointList": "SRID=4326;LINESTRING (-8.7890625 12.445313036442, 2.109375 -8.648436963557799, 18.984375 -6.1874994635578, 24.609375 -24.820311963558, 43.2421875 -28.687499463558, 52.734375 -10.406249463558)",
                        "poster": null,
                        "presentation": null,
                        "startDate": "1900-01-01",
                        "endDate": "1900-01-01"
                    },
                    {
                        "id": 15,
                        "name": "Bug się rodzi",
                        "description": "This is a nice description",
                        "pointList": null,
                        "poster": null,
                        "presentation": null,
                        "startDate": "1900-01-01",
                        "endDate": "1900-01-01"
                    }
                ];
            }
        }]);
})();
