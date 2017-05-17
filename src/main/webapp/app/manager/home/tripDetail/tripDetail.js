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

            $scope.editTrip = function () {
                //modalService.open();
                var tripName = $scope.trip.name;

                ModalService.confirmation('Edytuj wycieczkę ' + tripName, '', 'md');
                setTimeout(function () {
                    var formContent = '<form ng-submit="postEditedTrip()">' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-4" for="name">Nazwa</label>' +
                        '<input class="input-control" type="text" ng-model="newName" id="name" value="' + tripName + '"/>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-4" for="description" ng-model="description">Opis</label>' +
                        '<input class="input-control" type="text" ng-model="newDescription" id="description" value="' + $scope.trip.description + '"/>' +
                        '</div>' +
                        '<label class="control-label col-sm-4">Punkty</label>' +
                        '<input ng-repeat="point in ' + $scope.trip.points + ' class="input-control" type="text" ng-model="description" id="description" value="point"/>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-4" for="startDate">Początek podróży</label>' +
                        '<input class="input-control" type="date" ng-model="newStartDate" id="startDate" value="' + $scope.trip.startDate + '"/>' +
                        '</div>' +
                        '<div class="form-group">' +
                        '<label class="control-label col-sm-4" for="endDate">Koniec podróży</label>' +
                        '<input class="input-control" type="date" ng-model="newEndDate" id="endDate" value="' + $scope.trip.endDate + '"/>' +
                        '</div>' +
                        '<div class="col-sm-8 pull-left text-right">' +
                        '<input type="submit" class="btn btn-default submit-button" value="Edytuj podróż">' +
                        '</div>' +
                        '</form>';
                    document.getElementsByClassName('modal-body')[0].innerHTML = formContent.toString();
                    document.getElementsByClassName('modal-body')[0].style.height = "400px";
                    var button = $('.submit-button')[0];
                }, 500);

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

                ReportRemoteService.editTrip(editedTrip).then(function (results) {

                });
            };

            $scope.addPoint = function (event, callback) {

                $scope.trip.points.push({
                    id: markerId,
                    timestamp: getTime(),
                    elevation: "",
                    latitude: event.latLng.lat(),
                    longtitude: event.latLng.lng()
                });
                markerId++;
            };

            $scope.removeMarker = function (event, pointId) {
                $scope.removePoint(pointId);
            };

            $scope.removePoint = function (pointId) {
                lodash.remove($scope.trip.points, {id: pointId});
            };

            $scope.$watchCollection('trip.points', function () {
                if ($scope.trip.points.length > 1) {
                    $scope.start = $scope.trip.points[0];
                    $scope.theWaypoints = [];
                    if ($scope.trip.points.length > 1) {
                        for (var i = 1; i < $scope.trip.points.length - 1; i++) {
                            var latitude = $scope.trip.points[i].latitude;
                            var longtitude = $scope.trip.points[i].longtitude;
                            if (typeof latitude === "string" || latitude instanceof String) {
                                latitude = parseFloat(latitude);
                            }
                            if (typeof longtitude === "string" || longtitude instanceof String) {
                                longtitude = parseFloat(longtitude);
                            }
                            var obj = {
                                location: {
                                    lat: latitude,
                                    lng: longtitude
                                },
                                stopover: false
                            };
                            $scope.theWaypoints.push(obj);
                        }
                    }
                    $scope.end = $scope.trip.points[$scope.trip.points.length - 1];
                } else {
                    $scope.start = {};
                    $scope.end = {};
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