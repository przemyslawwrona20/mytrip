(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap', function ($scope, $state, ReportRemoteService, trip, lodash, NgMap) {

            $scope.trip = trip.data;
            var markerId = 0;
            $scope.start = {};
            $scope.theWaypoints = [];
            $scope.end = {};
            $scope.center = calcCenter();
            $scope.zoom = calcZoom();
            var elevator = new google.maps.ElevationService;

            NgMap.getMap().then(function (map) {
                $scope.map = map;
                if ($scope.trip.points.length > 0) {
                    markerId = ($scope.trip.points[$scope.trip.points.length - 1].id) + 1;
                }
            });

            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                $state.go('app.home.trip')
            };

            $scope.addPoint = function (event, callback) {
                getElevation(event.latLng, addMarker);
            };

            $scope.removeMarker = function (event, pointId) {
                $scope.removePoint(pointId);
            };

            $scope.removePoint = function (pointId) {
                lodash.remove($scope.trip.points, {id: pointId});
            };

            $scope.$watchCollection('trip.points', function () {
                if($scope.trip.points.length > 1 ){
                    $scope.start = $scope.trip.points[0];
                    $scope.theWaypoints = [];
                    if($scope.trip.points.length > 1 ){
                        for (var i = 1; i < $scope.trip.points.length - 1; i++ ){
                        var latitude=$scope.trip.points[i].latitude;
                        var longtitude =$scope.trip.points[i].longtitude;
                            if(typeof latitude === "string" || latitude instanceof String) {
                                latitude = parseFloat(latitude);
                            }
                            if(typeof longtitude === "string" || longtitude instanceof String) {
                                longtitude = parseFloat(longtitude);
                            }
                            var obj = {
                                location:{
                                    lat: latitude,
                                    lng: longtitude
                                },
                                stopover: false
                            };
                            $scope.theWaypoints.push(obj);
                        }
                    }
                    $scope.end = $scope.trip.points[$scope.trip.points.length-1];
                }else{
                    $scope.start = {};
                    $scope.end = {};
                }
            });
            function getTime() {
                var date = moment().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
                return date;
            }
            function getElevation(latLng, callback){
                var locations = [];
                locations.push(latLng);
                var positionalRequest = {
                    'locations': locations
                }
                elevator.getElevationForLocations(positionalRequest, function(results) {
                    callback(latLng,results[0].elevation);
                });
            }

            function addMarker(latLng, elevation){
                $scope.trip.points.push({
                    id: markerId,
                    timestamp: getTime(),
                    elevation: elevation,
                    latitude: latLng.lat(),
                    longtitude: latLng.lng()
                });

                markerId++;
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