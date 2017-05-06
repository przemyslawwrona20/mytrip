(function () {
    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap',
            function ($scope, $state, ReportRemoteService, trip, lodash, NgMap) {

            $scope.trip = trip.data;
            $scope.markers = [];

            var markerId = 0;

            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                $state.go('app.home.trip')
            };

            $scope.removePoint = function (tripId) {
                lodash.remove($scope.trip.points, {id: tripId});
            };

            NgMap.getMap().then(function(map){
                $scope.map = map;
                $scope.map.addListener('click',function(e){
                    placeMarkerAndPanTo(e.latLng,$scope.map);
                });
            });

            function placeMarkerAndPanTo(latLng, map){
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                google.maps.event.addListener(marker, 'dblclick', function(){
                    removeMarker(marker.Id);
                });
                marker.Id = markerId;
                markerId++;
                console.log(markerId);
                $scope.markers.push(marker);
                $scope.map.panTo(latLng);
            }

            function removeMarker(id){
                for (var i = 0; i < $scope.markers.length; i++) {
                    if ($scope.markers[i].Id == id) {
                        $scope.markers[i].setMap(null);
                        $scope.markers.slice(i, 1);
                        return;
                    }
                }
            }
        }]);
})();