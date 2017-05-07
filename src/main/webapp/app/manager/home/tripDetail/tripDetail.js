(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap', function ($scope, $state, ReportRemoteService, trip, lodash, NgMap) {

            $scope.trip = trip.data;
            var markerId = 0;
            NgMap.getMap().then(function (map) {
                $scope.map = map;
                if ($scope.trip.points.length > 0) {
                    markerId = ($scope.trip.points[$scope.trip.points.length - 1].id) + 1;
                }
            });

            $scope.center = calcCenter();
            $scope.zoom = calcZoom();

            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                $state.go('app.home.trip')
            };

            $scope.addPoint = function (event) {
                var latLng = event.latLng;
                $scope.trip.points.push({
                    id: markerId,
                    elevation:"",
                    timestamp: getTime(),
                    latitude: latLng.lat(),
                    longtitude: latLng.lng()
                });
                markerId++;
            };

            $scope.removeMarker = function (event, pointId) {
                $scope.removePoint(pointId);
            };

            $scope.removePoint = function (pointId) {
                console.log(pointId);
                lodash.remove($scope.trip.points, {id: pointId});
            };

            function getTime() {
                var date = moment().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
                return date;
            }

            function calcCenter() {
                var center = [0.0, 0.0];
                lodash.forEach($scope.trip.points, function (point) {
                    center[0] += Number(point.latitude);
                    center[1] += Number(point.longtitude);
                });

                center[0] /= $scope.trip.points.length;
                center[1] /= $scope.trip.points.length;
                return center;
            }

            function calcZoom() {
                if(lodash.size($scope.trip.points) <= 1) return 10;

                var maxLat = lodash.maxBy($scope.trip.points, function(point) { return Number(point.latitude); });
                var minLat = lodash.minBy($scope.trip.points, function(point) { return Number(point.latitude); });
                var maxLng = lodash.maxBy($scope.trip.points, function(point) { return Number(point.longtitude); });
                var minLng = lodash.minBy($scope.trip.points, function(point) { return Number(point.longtitude); });

                var latZoom = 360 / (Math.abs(maxLat.latitude) + Math.abs(minLat.latitude));
                var lngZoom = 360 / (Math.abs(maxLng.longtitude) + Math.abs(minLng.longtitude));

                return lodash.max([lodash.ceil(latZoom), lodash.ceil(lngZoom)]);
            }
        }]);
})();