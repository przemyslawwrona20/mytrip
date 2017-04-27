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
