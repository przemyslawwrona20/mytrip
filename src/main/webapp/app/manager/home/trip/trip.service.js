(function () {
    'use strict';

    angular.module('mytrip.trip')
        .factory('ReportRemoteService', ['$q', '$http', function ($q, $http) {
            var HOST = 'http://40.69.212.228';
            return {
                getTrips: function () {
                    var url = HOST + '/trips';
                    return $http.get(url);
                },
                getTrip: function (id) {

                },
                removeTrip: function (id) {

                }
            };
        }]);
})();

