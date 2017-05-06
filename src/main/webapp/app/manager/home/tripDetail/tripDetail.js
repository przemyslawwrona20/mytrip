(function () {
    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip','NgMap', function ($scope, $state, ReportRemoteService, trip,NgMap) {
            $scope.trip = trip.data;

            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                $state.go('app.home.trip')
            };
            var vm = this;
            NgMap.getMap().then(function(map){
                vm.map = map;
                vm.map.addListener('click',function(e){
                    console.log(e);
                    placeMarkerAndPanTo(e.latlng,vm.map);
                });
            });
            $scope.markers = [];


            function placeMarkerAndPanTo(latLng, map){
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                $scope.markers.push(marker);
                vm.map.panTo(latLng);
            }
        }]);
})();
