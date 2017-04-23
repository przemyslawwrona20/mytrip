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
