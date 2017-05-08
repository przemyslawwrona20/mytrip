(function () {
    'use strict';

    angular.module('mytrip.trip')
        .factory('ReportRemoteService', ['$q', '$http', function ($q, $http, $scope) {
            var HOST = 'http://40.69.212.228';
            return {
                getTrips: function () {
                    var url = HOST + '/trips/';
                    return $http.get(url);
                },
                getTrip: function (tripId) {
                    var url = HOST + '/trips/' + tripId;
                    return $http.get(url);
                },
                removeTrip: function (id) {

                },
                putTrip: function(newTrip) {
                    debugger;
                    var url = HOST + '/trips/';
                    var data = $.param({
                        name: newTrip.name,
                        description: newTrip.description,
                        points: newTrip.points,
                        media: newTrip.media,
                        poster: newTrip.poster,
                        presentation: newTrip.presentation,
                        startDate: newTrip.startDate,
                        endDate: newTrip.endDate,
                    });
                    return $http.put(url,data)
                        .success(function (data, status, headers) {
                            $scope.ServerResponse = data;
                        })
                        .error(function (data, status, header, config) {
                            console.log("Data: " + data +
                                "\n\n\n\nstatus: " + status +
                                "\n\n\n\nheaders: " + header +
                                "\n\n\n\nconfig: " + config);
                        });
                }
            };
        }]);
})();

