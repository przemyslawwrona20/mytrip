(function ( window, angular, undefined ) {

    angular.module('geolab.view.manager', [
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