(function ( window, angular, undefined ) {

    angular.module('geolab.view.home', [
        'ui.router'
    ])
    .config(['$stateProvider', function config($stateProvider) {
        $stateProvider.state('app.home', {
            url: '/',
            views: {
                'manager@app': {
                    controller: 'HomeCtrl',
                    templateUrl: 'app/manager/home/home.tpl.html'
                }
            }
        });
    }])
    .controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
    }]);
})( window, window.angular );
