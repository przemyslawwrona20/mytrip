(function () {
    'use strict';

    angular.module('mytrip.modal')
        .factory('ModalService', ['$rootScope', '$uibModal', function ($rootScope, $uibModal) {
            return {
                confirmation: function (header, body,size) {
                    return $uibModal.open({
                        animation: true,
                        size: size,
                        templateUrl: 'app/manager/home/modalService/modalTemplate.tpl.html',
                        resolve: {
                            header: function () {
                                return header;
                            },
                            body: function () {
                                return body;
                            }
                        },
                        controller: ['$scope', 'header', 'body', function ($scope, header, body) {
                            $scope.header = header;
                            $scope.body = body;
                        }]
                    });
                },

                upload: function (header, body,size, pointId, tripId, fileId, trip) {
                    return $uibModal.open({
                        animation: true,
                        size: size,
                        templateUrl: 'app/manager/home/tripDetail/uploadTemplate.tpl.html',
                        resolve: {
                            header: function () {
                                return header;
                            },
                            body: function () {
                                return body;
                            },
                            pointId: function (){
                                return pointId;
                            },
                            tripId: function (){
                                return tripId;
                            },
                            fileId: function (){
                                return fileId;
                            },
                            media: ['ReportRemoteService', function (ReportRemoteService) {
                                return ReportRemoteService.getMedia(tripId);
                            }]
                        },
                        controller: ['$scope', 'header', 'body', 'pointId', 'tripId', 'fileId', 'media', 'ReportRemoteService', function ($scope, header, body, pointId, tripId, fileId, media, ReportRemoteService) {
                            $scope.header = header;
                            $scope.body = body;
                            $scope.pointId = pointId;
                            $scope.tripId = tripId;
                            $scope.media = media.data.media;

                            $scope.uploadFile = function () {
                                var input = document.querySelector('input[type=file]'),
                                    file = input.files[0];
                                debugger;
                                var data = {
                                    trip: tripId,
                                    content: file
                                }
                                debugger;
                                ReportRemoteService.uploadFile(data).then(function () {
                                    console.log("Upload successfull");
                                }, function () {
                                    console.log("Upload failed");
                                });
                            }
                        }]
                    });
                }
            };
        }]);
})();
