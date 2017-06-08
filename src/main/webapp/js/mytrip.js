(function (window, angular, undefined) {
    angular.module('mytrip', [
        'ui.router',
        'ui.bootstrap',

        'mytrip.view.landing',
        'mytrip.view.manager',
        'mytrip.view.header',
        'mytrip.view.home',
        'mytrip.view.footer',
        'mytrip.trip',
        'mytrip.modal',
        'mytrip.view.tripDetail',
        'jcs-autoValidate',
        'ngFileUpload',
        'xeditable',
        'ngLodash',
        'ngProgress',
        'ngMap',
        'base64'
    ])

        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$base64',
            function config($stateProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider, $locationProvider, $base64) {

                // $urlRouterProvider.when('**', '/#/landing');
                // $urlRouterProvider.when('/**', '/#/landing');
                // $urlRouterProvider.when('/', 'landing');
                // $urlRouterProvider.otherwise('/#/landing');

                // $urlMatcherFactoryProvider.strictMode(false);
                var auth = $base64.encode("test:test1234");
                $httpProvider.defaults.headers.common['Authorization'] = 'Basic ' + auth;
                $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
                // $httpProvider.defaults.withCredentials = true;
                // $httpProvider.defaults.useXDomain = true;
                // delete $httpProvider.defaults.headers.common['X-Requested-With'];

                $locationProvider.html5Mode(false);
            }])

        .run(['$rootScope', function run($rootScope) {
            String.prototype.startsWith = function (str) {
                return this.substring(0, str.length) === str;
            };
        }])

        .constant('STATES', {
            homeState: 'app.home',
            landing: 'landing'
        })

        .controller('AppCtrl', ['$scope', '$rootScope', '$state', 'STATES', function ($scope, $rootScope, $state, STATES) {
            var transitionToState = STATES.homeState;
            var transitionToParams = {};

            $scope.pageTitle = "mytrip";

            $rootScope.$on('event:auth-loginConfirmed', function () {
                $state.go(transitionToState, transitionToParams);
                transitionToState = STATES.homeState;
                transitionToParams = {};
            });

            $rootScope.$on('event:changeState-default', function () {
                $state.go(STATES.homeState);
            });

            $state.go(STATES.landing);

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            });
        }]);
})(window, window.angular);


(function (window, angular, undefined) {
    angular.module('mytrip.directives.openFile', [])
        .constant('FILE_TYPE', {
            json: 'json',
            txt: 'txt'
        })
        .directive('openFile', [function () {
            return {
                restrict: 'A',
                scope: {
                    data: "=",
                    model: "=?",
                    format: "&?",
                    parser: "=",
                    errorMessage: "="
                },
                //         template: '<input type="file" ng-model="file"><i class="fa fa-folder-open-o fa-4x" aria-hidden="true"></i></input>',
                controller: "OpenFileCtrl"
            };
        }])
        .controller('OpenFileCtrl', ['$scope', '$element', function ($scope, $element) {
            var TWO_MB = 2097152;
            $scope.format = $scope.format || 'json';

            var applyErrorMessage = function (errorMessage) {
                $scope.errorMessage = errorMessage;
            };

            $element.bind("change", function (changeEvent) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    $scope.$apply(function () {
                        var fileName = event.target.fileName;

                        console.log(event.target.result);

                        // var d = $scope.reportParser.parseTXT(event.target.result);

                        // console.log($scope.reportParser.parseTXT()));
                        $scope.reportParser.parseTXT();
                        var report = '';
                        // switch ($scope.format) {
                        //     case 'json':
                        //         report = JSON.parse(event.target.result);
                        //         break;
                        //     case 'txt':
                        //         report = event.target.result;
                        //     default:
                        //         report = event.target.result;
                        // }

                        if($scope.model === undefined) {
                            $scope.data = report;
                        } else {
                            $scope.data = $scope.model.apiResponseTransformer(report);
                        }
                    });
                };
                var file = changeEvent.target.files[0];
                reader.fileName = file.name;
                reader.readAsText(file);
                // reader.readAsDataURL(changeEvent.target.files[0]);
            });


            // .controller('OpenFileCtrl', ['$scope', 'FILE_TYPE', function ($scope, FILE_TYPE) {
            //     $scope.file = undefined;
            //     $scope.$watch("file", function (file) {
            //         if (file) {
            //             var fileReader = new FileReader();
            //             fileReader.onload = function (loadEvent) {
            //                 var data = JSON.parse(loadEvent.target.result);
            //                 $scope.data = parseGravimeterRapoet(data);
            //             };
            //             fileReader.readAsText(file);
            //
            //             if (file.size > TWO_MB) {
            //                 applyErrorMessage("Your file it too large!");
            //             }
            //             //else if (!file.type.match(/image\/.*/)) {
            //             //    applyErrorMessage("File you are trying to upload is not a photo!");
            //             //} else {
            //             //    fileReader.readAsDataURL(file);
            //             //}
            //         }
            //     });
        }]);
})(window, window.angular);

(function (window, angular, undefined) {
    angular.module('mytrip.directives.particles', [])
        .directive('particles-js', function ($window) {
            return {
                restrict: 'A',
                replace: true,
                template: '<div class="particleJs" id="particleJs"></div>',
                link: function (scope, element, attrs, fn) {

                    $window.particlesJS('particleJs', {
                        particles: {
                            color: '#52a5fd',
                            shape: 'circle',
                            opacity: 1,
                            size: 5.5,
                            size_random: true,
                            nb: 20,
                            line_linked: {
                                enable_auto: true,
                                distance: 750,
                                color: '#52a5fd',
                                opacity: 0.5,
                                width: 2,
                                condensed_mode: {
                                    enable: false,
                                    rotateX: 600,
                                    rotateY: 600
                                }
                            },
                            anim: {
                                enable: true,
                                speed: 2.5
                            }
                        },
                        interactivity: {
                            enable: true,
                            mouse: {
                                distance: 250
                            },
                            detect_on: 'canvas',
                            mode: 'grab',
                            line_linked: {
                                opacity: 0.5
                            },
                            events: {
                                onclick: {
                                    push_particles: {
                                        enable: true,
                                        nb: 4
                                    }
                                }
                            }
                        },
                        retina_detect: true
                    });

                }
            };
        });
})(window, window.angular);

(function ( window, angular, undefined ) {

    angular.module('mytrip.view.landing', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('landing', {
            url: '',
            controller: 'LandingCtrl',
            templateUrl: 'app/landing/landing.tpl.html'
        });
    })

    .controller('LandingCtrl', ['$scope', '$window', function ($scope, $window) {

        angular.element($window).bind("scroll", function() {
            if($window.pageYOffset > 50) {
                $scope.$apply(function(){
                    $scope.shrink = true;
                });
            } else {
                $scope.$apply(function(){
                    $scope.shrink = false;
                });
            }
        });

        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 150,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "img/github.svg",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 3,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 150,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }]);
})( window, window.angular );

(function ( window, angular, undefined ) {

    angular.module('mytrip.view.footer', [
        'ui.router'
    ])

    .controller('FooterCtrl', ['$scope', function ($scope) {
    }]);
})( window, window.angular );

(function ( window, angular, undefined ) {

    angular.module('mytrip.view.header', [
    'ui.router'
])
    .controller('HeaderCtrl', ['$scope', function ($scope) {
    }]);
})( window, window.angular );

(function ( window, angular, undefined ) {

    angular.module('mytrip.view.home', [
        'ui.router'
    ])
    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('app.home', {
            url: '',
            views: {
                'manager@app': {
                    controller: 'HomeCtrl',
                    templateUrl: 'app/manager/home/home.tpl.html'
                }
            }
        });
    }])
    .controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {

        $scope.points = [{
            id: 0,
            name: '',
            coordinates: {
                x: 5000,
                y: 6000
            },
            photoPath: ''
        }]
    }]);
})( window, window.angular );

(function () {
    'use strict';

    angular.module('mytrip.modal', [
        'ui.bootstrap'
    ])
})();

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
                                var data = {
                                    trip: tripId,
                                    content: file
                                }
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

(function () {
    'use strict';

    angular.module('mytrip.trip', [
        'ui.router'
    ])
})();

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

(function () {
    'use strict';

    angular.module('mytrip.trip')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('app.home.trip', {
                url: '/trip',
                views: {
                    'home@app.home': {
                        controller: 'TripCtrl',
                        templateUrl: 'app/manager/home/trip/trip.tpl.html'
                    }
                },
                resolve: {
                    trips: ['ReportRemoteService', function (ReportRemoteService) {
                        return ReportRemoteService.getTrips();
                    }]
                }
            });
        }])
})();

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


(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail', [
        'ui.router',
        'mytrip.trip',
    ])
})();
(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip', 'lodash', 'NgMap', 'ModalService', function ($scope, $state, ReportRemoteService, trip, lodash, NgMap, ModalService) {
            $scope.trip = trip.data;
            var markerId = 0;
            $scope.start = {};
            $scope.theWaypoints = [];
            $scope.end = {};
            // $scope.center = calcCenter();
            // $scope.zoom = calcZoom();
            $scope.sortedPoints= [];

            $scope.poster = lodash.find($scope.trip.media, function(media) {
                console.log(media.content_type == 'presentation');
                return media.content_type == 'presentation';
            });


            console.log($scope.poster.content);

            NgMap.getMap().then(function (map) {
                $scope.map = map;
                if ($scope.trip.points.length > 0) {
                    markerId = ($scope.trip.points[$scope.trip.points.length - 1].id) + 1;
                }
            });

            $scope.uploadGpx= function(file,tripId){
                ReportRemoteService.uploadGpx(file,tripId);
            };

            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                ReportRemoteService.removeTrip(tripId).then(function (results) {
                    $state.go('app.home.trip')
                });
            };
            $scope.showMarkerDetails = function (event, pointId, tripId, trip) {
                ModalService.upload('Marker details nr: ' + pointId, '', 'md', pointId, tripId, trip);
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

            $scope.downloadPoster = function() {
                ReportRemoteService.downloadPoster($scope.trip.id);
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
                var center = [Number(trip.data.points[0].longtitude), Number(trip.data.points[0].latitude)];
                // if($scope.trip.points.length>0) {
                //     lodash.forEach($scope.trip.points, function (point) {
                //         center[0] += Number(point.latitude);
                //         center[1] += Number(point.longtitude);
                //     });
                //     center[0] /= $scope.trip.points.length;
                //     center[1] /= $scope.trip.points.length;
                // }
                console.log(center);
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

(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail')
        .config(['$stateProvider', function config($stateProvider) {
            $stateProvider.state('app.home.tripDetail', {
                url: '/trip/:tripId',
                views: {
                    'home@app.home': {
                        controller: 'TripDetailCtrl',
                        templateUrl: 'app/manager/home/tripDetail/tripDetail.tpl.html'
                    }
                },
                resolve: {
                    trip: ['ReportRemoteService', '$stateParams', function (ReportRemoteService, $stateParams) {
                        return ReportRemoteService.getTrip($stateParams.tripId);
                    }]
                },
                onEnter: function($stateParams, $state){
                    if($stateParams.tripId === undefined || $stateParams.tripId === '')
                        $state.go('app.home.trip');
                }
            });
        }])
})();
(function ( window, angular, undefined ) {

    angular.module('mytrip.view.manager', [
        'ui.router'
    ])
    .config(function config($stateProvider) {
        $stateProvider.state('app', {
            views: {
                '@': {
                    controller: 'ManagerCtrl',
                    templateUrl: 'app/manager/manager.tpl.html'
                },
                'header@app': {
                    controller: 'HeaderCtrl',
                    templateUrl: 'app/manager/header/header.tpl.html'
                },
                'footer@app': {
                    controller: 'FooterCtrl',
                    templateUrl: 'app/manager/footer/footer.tpl.html'
                }
            },
            resolve: {

            }
        });
    })
    .controller('ManagerCtrl', ['$scope', '$state', function ($scope, $state) {
    }])
})( window, window.angular );
(function ( window, angular, undefined ) {

    angular.module('mytrip.model.responseStatus', [
])
    .factory('ResponseStatus', [ function () {
        function ResponseStatus(status, errorMessage, objectId, extra) {
            this.status = status;
            this.errorMessage = errorMessage;
            this.objectId = objectId;
            this.extra = extra;
        }

        ResponseStatus.build = function (data) {
            return new ResponseStatus(
                data.status,
                data.errorMsg,
                data.objectId,
                data.extra
            );
        };

        ResponseStatus.apiResponseTransformer = function (responseData) {
            if (angular.isArray(responseData)) {
                return responseData
                    .map(ResponseStatus.build);
            }
            return ResponseStatus.build(responseData);
        };

        ResponseStatus.prototype.isSuccess = function() {
            return this.status === "success";
        };

        return ResponseStatus;
    }]);
})( window, window.angular );

(function (window, angular, undefined) {

    angular.module('mytrip.notifications.appNotificationsService', [])

        .factory('AppNotificationsService', ['$rootScope', function ($rootScope) {
            return {
                loginConfirmed: function (data) {
                    $rootScope.$broadcast('event:auth-loginConfirmed', data);
                },
                logoutConfirmed: function (data) {
                    $rootScope.$broadcast('event:auth-logoutConfirmed', data);
                },
                loginRequired: function () {
                    $rootScope.$broadcast('event:auth-loginRequired');
                }
            };
        }]);
})(window, window.angular);

(function (window, angular, undefined) {

    angular.module('mytrip.notifications.modalService', [
        'ui.bootstrap'
    ])
        .factory('ModalService', ['$rootScope', '$uibModal', function ($rootScope, $uibModal) {
            return {
                confirmation: function (header, body) {
                    return $uibModal.open({
                        animation: true,
                        size: 'lg',
                        templateUrl: 'notifications/appModalService/modalTemplate.tpl.html',
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
                            $scope.body = body.toHtmlObject;
                        }]
                    });
                }
            };
        }]);
})(window, window.angular);

(function ( window, angular, undefined ) {

    angular.module('mytrip.remote.api', [
    'mytrip.auth.userAuthService',
    'mytrip.model.responseStatus'
])
    .factory('API', ['$http', '$q', 'UserAuthService', 'ResponseStatus', function ($http, $q, UserAuthService, ResponseStatus) {

        var authApiPath = 'api/secure';
        var loginApiPath = 'api';
        var baseApiPath = 'api/base';

        function createRequest(verb, httpConfing, data, params) {
            var defer = $q.defer();
            verb = verb.toUpperCase();
            httpConfing.method = verb;
            httpConfing.headers = UserAuthService.getAuthHeaders();

            if (verb.match(/POST|PUT/)) {
                httpConfing.data = data;
            }

            if (params) {
                httpConfing.params = params;
            }

            $http(httpConfing)
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function (data, status) {
                    defer.reject('HTTP Error: ' + status);
                });
            return defer.promise;
        }

        function createAuthHttpConfig(uri) {
            return {url: authApiPath + uri};
        }

        function createHttpConfig(uri) {
            return {url: loginApiPath + uri};
        }

        function createBaseHttpConfig(uri) {
            return {url: baseApiPath + uri};
        }

        function actionAndResolve(action, url, modelObject, data) {
            var deferred = $q.defer();
            action(url, data)
                .then(modelObject.apiResponseTransformer, function() {deferred.reject(new ResponseStatus("error", "", 0));})
                .then(function (resultObj) {
                    deferred.resolve(resultObj);
                }, function() {
                    deferred.reject();
                });
            return deferred.promise;
        }
        function actionWithStatus (action, url, data) {
            var deferred = $q.defer();
            action(url, data)
                .then(ResponseStatus.apiResponseTransformer, function() {return new ResponseStatus("error", "", 0);})
                .then(function (status) {
                    var result = status.isSuccess() ? deferred.resolve(status) : deferred.reject(status);
                });
            return deferred.promise;
        }

        return {
            get: function (uri, params) {
                return createRequest('get', createBaseHttpConfig(uri), null, params);
            },
            getBaseAPI: function (url, data) {
                return createRequest('get', createBaseHttpConfig(url), data);
            },
            post: function (uri, data, params) {
                return createRequest('post', createAuthHttpConfig(uri), data, params);
            },
            put: function (uri, data, params) {
                return createRequest('put', createAuthHttpConfig(uri), data);
            },
            remove: function (uri, params) {
                return createRequest('delete', createAuthHttpConfig(uri));
            },
            postUnAuth: function (uri, data) {
                return createRequest('post', createHttpConfig(uri), data);
            },
            postBaseApi: function (uri, data) {
                return createRequest('post', createBaseHttpConfig(uri), data);
            },
            postAndResolve: function(url, modelObject, data) {
                return actionAndResolve(this.post, url, modelObject, data);
            },
            getAndResolve: function(url, modelObject, params) {
                return actionAndResolve(this.get, url, modelObject, params);
            },
            putWithStatus: function(url, data) {
                return actionWithStatus(this.put, url, data);
            },
            postWithStatus: function(url, data) {
                return actionWithStatus(this.post, url, data);
            },
            getWithStatus: function(url, data) {
                return actionWithStatus(this.get, url, data);
            },
            removeWithStatus: function(url) {
                return actionWithStatus(this.remove, url);
            },
            postBaseAPIWithStatus: function (url, data) {
                return actionWithStatus(this.postBaseApi, url, data);
            }
        };

    }]);
})( window, window.angular );
