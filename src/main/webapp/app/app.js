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

