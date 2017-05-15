(function () {
    'use strict';

    angular.module('mytrip.trip')
        .factory('ReportRemoteService', ['$q', '$http','ModalService', function ($q, $http, $scope,modalService) {
            var HOST = 'http://40.69.212.228';
            return {
                uploadGpx: function(file) {
                    var url = HOST + '/trips/100/uploadPath/';
                    //dopisać
                },

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
                editTrip: function(editedTrip) {
                    var url = HOST + '/trips/'+editedTrip.id +'/';
                    var postData = {
                        name: editedTrip.name,
                        description: editedTrip.description,
                        points: editedTrip.points,
                        media: [],
                        startDate: editedTrip.startDate,
                        endDate: editedTrip.endDate,
                    };
                    return $http.put(url,postData)
                        .success(function (data, status, headers) {
                            modalService.confirmation('','Wycieczka edytowana pomyślnie!','sm');
                            console.log('Trip edited!');
                            alert("Trip edited!");
                        })
                        .error(function (data, status, header, config) {
                            console.log("Data: " + data +
                                "\n\n\n\nstatus: " + status +
                                "\n\n\n\nheaders: " + header +
                                "\n\n\n\nconfig: " + config);
                        });
                },
                postTrip: function(newTrip) {
                    var url = HOST + '/trips/';
                    var postData = {
                        name: newTrip.name,
                        description: newTrip.description,
                        points: [],
                        media: [],
                        startDate: newTrip.startDate,
                        endDate: newTrip.endDate,
                    };
                    return $http.post(url,postData)
                        .success(function (data, status, headers) {
                            console.log('Trip added!');
                            alert("New trip added!");
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

