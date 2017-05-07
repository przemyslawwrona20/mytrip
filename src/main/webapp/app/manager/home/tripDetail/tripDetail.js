(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap', function ($scope, $state, ReportRemoteService, trip, lodash, NgMap) {
            $scope.route = [];
            $scope.trip = trip.data;

            var markerId = 0;
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var labelIndex = 0;

            $scope.center = calcCenter();
            $scope.zoom = calcZoom();

            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                $state.go('app.home.trip')
            };

            $scope.removePoint = function (tripId) {
                lodash.remove($scope.trip.points, {id: tripId});
            };

            NgMap.getMap().then(function (map) {
                if ($scope.trip.points.length > 0) {
                    // loadExistingPoints($scope.map);
                    markerId = ($scope.trip.points[$scope.trip.points.length - 1].id) + 1;
                }
                $scope.map = map;
                $scope.map.addListener('click', function (e) {
                    placeMarkerAndPanTo(e.latLng, $scope.map, $scope);
                });
            });

            function loadExistingPoints(map) {
                for (var i = 0; i < $scope.trip.points.length; i++) {
                    var latLng = new google.maps.LatLng($scope.trip.points[i].latitude, $scope.trip.points[i].longtitude);
                    placeMarkerOnLoad(latLng, map, $scope.trip.points[i]);
                }
                $scope.map.panTo(latLng);

            }

            function placeMarkerOnLoad(latLng, map, tripPoint) {
                var marker = new google.maps.Marker({
                    position: latLng,
                    label: labels[labelIndex++ % labels.length],
                    animation: google.maps.Animation.DROP,
                    map: map
                });
                tripPoint.marker = marker;
                google.maps.event.addListener(marker, 'dblclick', function () {
                    removeMarker(tripPoint.id);
                });
            }

            function placeMarkerAndPanTo(latLng, map) {
                var marker = new google.maps.Marker({
                    position: latLng,
                    label: labels[labelIndex++ % labels.length],
                    animation: google.maps.Animation.DROP,
                    map: map
                });

                google.maps.event.addListener(marker, 'dblclick', function () {
                    removeMarker(marker.Id);
                });
                marker.Id = markerId;

                $scope.trip.points.push({
                    id: marker.Id,
                    latitude: marker.position.lat(),
                    longtitude: marker.position.lng(),
                    timestamp: getTime(),
                    marker: marker
                });

                markerId++;
            }

            function removeMarker(id) {
                for (var i = 0; i < $scope.trip.points.length; i++) {
                    if ($scope.trip.points[i].id == id) {
                        $scope.trip.points[i].marker.setMap(null);
                        $scope.trip.points.slice(i, 1);
                        return;
                    }
                }
            }

            function getTime() {
                var date = moment().format("YYYYMMDD[T]hh:mm:ss[Z]");
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