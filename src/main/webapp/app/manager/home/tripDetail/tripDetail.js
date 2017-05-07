(function () {
    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap', function ($scope, $state, ReportRemoteService, trip, lodash, NgMap) {
            $scope.route = [];
            $scope.trip = trip.data;

            var markerId = 0;

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
                    markerId = ($scope.trip.points[$scope.trip.points.length - 1].id) + 1;
                }
                $scope.map = map;
                $scope.map.addListener('click', function (e) {
                    placeMarkerAndPanTo(e.latLng, $scope.map);
                });
            });

            function placeMarkerAndPanTo(latLng, map) {
                // var marker = new google.maps.Marker({
                //     position: latLng,
                //     map: map
                // });

                // google.maps.event.addListener(marker, 'dblclick', function () {
                //     removeMarker(marker.Id);
                // });
                var marker={};
                marker.Id = markerId;

                $scope.trip.points.push({
                    id: marker.Id,
                    latitude: latLng.lat(),
                    longtitude: latLng.lng(),
                    timestamp: getTime(),
                    //marker: marker
                });
                $scope.map.panTo(latLng);

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
                return 10;
            }
        }]);
})();