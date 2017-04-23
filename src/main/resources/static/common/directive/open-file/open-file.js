(function (window, angular, undefined) {
    angular.module('geolab.directives.openFile', [])
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
