(function () {
    'use strict';

    angular.module('mytrip.trip')
        .factory('ReportRemoteService', ['$q', '$http','ModalService', function ($q, $http, $scope,modalService) {
            var HOST = 'http://40.69.212.228/';
            return {
                uploadGpx: function(file,id) {
                    var fd = new FormData();
                    console.log(file);
                    fd.append('file', file);

                    var url = HOST + "trips/" + id + '/uploadPath';
                    return $http.post(url,fd,{
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    });
                },

                getTrips: function () {
                    var url = HOST + '/trips';
                    return $http.get(url);
                },
                getTrip: function (tripId) {
                    var url = HOST + '/trips/' + tripId;
                    return $http.get(url);
                },
                removeTrip: function (tripId) {
                    var url = HOST + '/trips/' + tripId;
                    return $http.delete(url);
                },
                editTrip: function(editedTrip) {
                    var url = HOST + '/trips/'+ editedTrip.id +'/';
                    var postData = {
                        name: editedTrip.name,
                        description: editedTrip.description,
                        points: editedTrip.points,
                        media: [],
                        startDate: editedTrip.startDate,
                        endDate: editedTrip.endDate
                    };
                    return $http.put(url,postData);
                },
                editPoints: function(trip) {
                    var url = HOST + '/trips/'+trip.id +'/';
                    var postData = {
                        name: trip.name,
                        description: trip.description,
                        points: trip.points,
                        media: [],
                        startDate: trip.startDate,
                        endDate: trip.endDate,
                    };
                    return $http.put(url,postData);
                },
                postTrip: function(trip) {
                    var url = HOST + '/trips/';
                    trip = angular.extend(trip, {points: [], media: []});
                    return $http.post(url, trip);
                },
                uploadFile: function(uploadData) {
                    var url = HOST + 'media/';
                    var test = new FormData();
                    test.append("trip", uploadData.trip);
                    test.append("content", uploadData.content);
                    return $http.post(url, test, {
                        transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}
                    })
                },
                getMedia: function (tripId) {
                    var url = HOST + 'trips/' + tripId;
                    return $http.get(url);
                },
                downloadPoster: function (tripId) {
                    var url = HOST + 'trips/' + tripId + '/poster';
                    return $http.get(url);
                }
            };
        }]);
})();

