(function (window, angular, undefined) {
    angular.module('mytrip', [
        // 'templates-app',
        // 'templates-common',
        'ui.router',
        'ui.bootstrap',

        'mytrip.view.landing',
        'mytrip.view.manager',
        'mytrip.view.header',
        'mytrip.view.home',
        'mytrip.view.footer',
        'mytrip.trip',
        'mytrip.view.tripDetail',
        'jcs-autoValidate',
        'ngFileUpload',
        'xeditable',
        'ngLodash',
        'ngProgress',
        'ngMap'
    ])

        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$urlMatcherFactoryProvider', '$locationProvider',
            function config($stateProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider, $locationProvider) {

                // $urlRouterProvider.when('**', '/#/landing');
                // $urlRouterProvider.when('/**', '/#/landing');
                // $urlRouterProvider.when('/', 'landing');
                // $urlRouterProvider.otherwise('/#/landing');

                // $urlMatcherFactoryProvider.strictMode(false);
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

    angular.module('mytrip.trip', [
        'ui.router'
    ])
})();

(function () {
    'use strict';

    angular.module('mytrip.trip')
        .controller('TripCtrl', ['$scope', '$state', 'trips', 'ReportRemoteService',
            function ($scope, $state, trips, ReportRemoteService) {

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

            $scope.getDetails = function (tripId) {
                $state.go('app.home.tripDetail', {tripId: tripId})
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
        .factory('ReportRemoteService', ['$q', '$http', function ($q, $http) {
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

                }
            };
        }]);
})();


(function () {
    'use strict';

    angular.module('mytrip.view.tripDetail', [
        'ui.router',
        'mytrip.trip'
    ])
})();
(function () {
    angular.module('mytrip.view.tripDetail')

        .controller('TripDetailCtrl', ['$scope', '$state', 'ReportRemoteService', 'trip','NgMap', function ($scope, $state, ReportRemoteService, trip,NgMap) {
            $scope.trip = trip.data;
            var markerId = 0;
            $scope.removeTrip = function (tripId) {
                // ReportRemoteService.removeTrip(tripId)
                $state.go('app.home.trip')
            };
            NgMap.getMap().then(function(map){
                $scope.map = map;
                $scope.map.addListener('click',function(e){
                    console.log(e);
                    placeMarkerAndPanTo(e.latLng,$scope.map);
                });
            });
            $scope.markers = [];


            function placeMarkerAndPanTo(latLng, map){
                var marker = new google.maps.Marker({
                    position: latLng,
                    map: map
                });
                google.maps.event.addListener(marker,'dblclick',function(){
                    removeMarker(marker.Id);
                })
                marker.Id= markerId;
                markerId++;
                console.log(markerId);
                $scope.markers.push(marker);
                $scope.map.panTo(latLng);
            }

            function removeMarker(id){
                for (var i = 0; i < $scope.markers.length; i++) {
                    if ($scope.markers[i].Id == id) {
                        $scope.markers[i].setMap(null);
                        $scope.markers.slice(i, 1);
                        return;
                    }
                }
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
                        size: 'sm',
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
                            $scope.body = body;
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
