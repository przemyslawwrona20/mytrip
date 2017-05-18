(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap', 'ModalService', function ($scope, $state, ReportRemoteService, trip, lodash, NgMap, ModalService) {

            $scope.trip = trip.data;
            var markerId = 0;
            $scope.start = {};
            $scope.theWaypoints = [];
            $scope.end = {};
            $scope.center = calcCenter();
            $scope.zoom = calcZoom();
            $scope.sortedPoints= [];

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

            $scope.showMarkerDetails = function (event, pointId, tripId) {

                ModalService.confirmation('Szczegóły punktu nr: ' + pointId, '', 'md');
                setTimeout(function () {
                    var formContent = '<div class="panel panel-default">' +
                        '<div class="panel-body">' +
                        '<form>' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-4" for="name">Id punktu</label>' +
                        '<input class="input-control" disabled type="text" ng-model="pointId" id="name" value="' + pointId + '"/>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-4" for="name">Id wycieczki</label>' +
                        '<input class="input-control" disabled type="text" ng-model="tripId" id="name" value="' + tripId + '"/>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label for="myFileField">Wybierz plik: </label>' +
                        '<input type="file" demo-file-model="myFile"  class="form-control" id ="myFileField"/>' +
                        '</div>' +
                        '<button ng-click="uploadFile()" class = "btn btn-primary submit-button">Upload File</button>' +
                        '</form>' +
                        '</div>' +
                        '</div>';
                    document.getElementsByClassName('modal-body')[0].innerHTML = formContent.toString();
                    document.getElementsByClassName('modal-body')[0].style.height = "400px";
                    var button = $('.submit-button')[0];
                }, 500);

            };

            $scope.uploadFile = function () {
                var uploadData = {
                    point: $scope.pointId,
                    trip: $scope.trip.id,
                    content: $scope.myFile
                };
                ReportRemoteService.uploadFile(uploadData);
            };


            $scope.postEditedTrip = function () {
                var newStartDate;
                var newEndDate;
                if ($scope.newStartDate != null) {
                    newStartDate = $scope.newStartDate.toISOString().substring(0, 10);
                } else {
                    newStartDate = $scope.trip.startDate;
                }
                if ($scope.newEndDate != null) {
                    newEndDate = $scope.newEndDate.toISOString().substring(0, 10);
                } else {
                    newEndDate = $scope.trip.endDate;
                }
                var editedTrip = {
                    id: $scope.trip.id,
                    name: $scope.newName || $scope.trip.name,
                    description: $scope.newDescription || $scope.trip.description,
                    points: $scope.trip.points,
                    /* points: '',
                     media: '',*/
                    startDate: newStartDate,
                    endDate: newEndDate
                };

                ReportRemoteService.editTrip(editedTrip)
                    .success(function (data, status, headers) {
                        ModalService.confirmation('Sukces','Wycieczka edytowana pomyślnie!');
                        console.log('Trip edited!');
                        //alert("Wycieczka edytowana pomyślnie!");
                    })
                    .error(function (data, status, header, config) {
                        ModalService.confirmation('Błąd', 'Edycja wycieczki nieudana!');
                        console.log("Data: " + data +
                            "\n\n\n\nstatus: " + status +
                            "\n\n\n\nheaders: " + header +
                            "\n\n\n\nconfig: " + config);
                    });
            };

            $scope.addPoint = function (event, callback) {
                var lat =  event.latLng.lat() || event.pixel.x;
                var lng = event.latLng.lng() || event.pixel.y;

                $scope.trip.points.push({
                    id: markerId,
                    timestamp: getTime(),
                    elevation: 1,
                    latitude: lat.toString().substring(0,11),
                    longtitude: lng.toString().substring(0,11),
                });
                markerId++;
                ReportRemoteService.editPoints($scope.trip)
                    .success(function() {
                        ModalService.confirmation('Sukces', 'Dodano nowy punkt!');
                    })
                    .error(function() {
                        ModalService.confirmation('Bład', 'Nie dodano punktu!');
                    });
            };

            $scope.removeMarker = function (event, pointId) {
                $scope.removePoint(pointId);
            };

            $scope.removePoint = function (pointId) {
                lodash.remove($scope.trip.points, {id: pointId});
                ReportRemoteService.editPoints($scope.trip)
                    .success(function() {
                        ModalService.confirmation('Sukces', 'Punkt usunięty pomyślnie!');
                    })
                    .error(function() {
                        ModalService.confirmation('Błąd', 'Niepowodzenie edycji punktów');
                    });
            };

            $scope.$watchCollection('trip.points', function () {
                $scope.sortedPoints=[];
                var sorted = $scope.trip.points;
                sorted.sort(function(a,b){
                        if(a.timestamp < b.timestamp) return -1;
                        if(a.timestamp > b.timestamp) return 1;
                        return 0;
                    });
                for(var i = 0; i< sorted.length;i++){
                    var latitude=sorted[i].latitude;
                    var longtitude =sorted[i].longtitude;
                    if(typeof latitude === "string" || latitude instanceof String) {
                        latitude = parseFloat(latitude);
                    }
                    if(typeof longtitude === "string" || longtitude instanceof String) {
                        longtitude = parseFloat(longtitude);
                    }
                    $scope.sortedPoints.push([latitude, longtitude]);
                }
            });
            function getTime() {
                var date = moment().format("YYYY-MM-DD[T]HH:mm:ss[Z]");
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
                if (lodash.size($scope.trip.points) <= 1) return 10;

                var maxLat = lodash.maxBy($scope.trip.points, function (point) {
                    return Number(point.latitude);
                });
                var minLat = lodash.minBy($scope.trip.points, function (point) {
                    return Number(point.latitude);
                });
                var maxLng = lodash.maxBy($scope.trip.points, function (point) {
                    return Number(point.longtitude);
                });
                var minLng = lodash.minBy($scope.trip.points, function (point) {
                    return Number(point.longtitude);
                });

                var latZoom = 360 / (Math.abs(maxLat.latitude) + Math.abs(minLat.latitude));
                var lngZoom = 360 / (Math.abs(maxLng.longtitude) + Math.abs(minLng.longtitude));

                return lodash.max([lodash.ceil(latZoom), lodash.ceil(lngZoom)]);
            }
        }]);
})();
