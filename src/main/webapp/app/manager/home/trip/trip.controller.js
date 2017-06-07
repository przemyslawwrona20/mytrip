(function () {
    'use strict';

    angular.module('mytrip.trip')
        .controller('TripCtrl', ['$scope', '$state', 'trips', 'ReportRemoteService',
            function ($scope, $state, trips, ReportRemoteService) {
                $scope.filteredTrips = [],
                $scope.currentPage = 1,
                $scope.numPerPage = 10,
                $scope.maxSize = 50,

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
            if($scope.trips!==undefined) {
                $scope.totalItems = $scope.trips.length;
            }


            $scope.getDetails = function (tripId) {
                $state.go('app.home.tripDetail', {tripId: tripId})
            };

                $scope.numPages = function () {
                    return Math.ceil($scope.todos.length / $scope.numPerPage);
                };

                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;

                    $scope.filteredTrips = $scope.trips.slice(begin, end);
                });

            $scope.postTrip = function() {
                var newTrip = {
                    name: $scope.name,
                    description: $scope.description,
                    startDate: $scope.startDate.toISOString().substring(0, 10),
                    endDate: $scope.endDate.toISOString().substring(0, 10)
                };
                ReportRemoteService.postTrip(newTrip)
                    .success(function (data,status,headers) {
                        modalService.confirmation('Sukces','Wycieczka dodana pomyślnie!');
                        console.log('Sukces!');
                    })
                    .error(function (data, status, header, config) {
                        modalService.confirmation('Błąd','Nie udało się dodać wycieczki!');
                        console.log("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    })
                    .then(function(trip){
                        $scope.trips.push(trip.data);
                });
                $scope.clearForm();
            };



            $scope.clearForm = function() {
                $scope.name='';
                $scope.description='';
                $scope.startDate='';
                $scope.endDate='';
            }

            }]);
})();
