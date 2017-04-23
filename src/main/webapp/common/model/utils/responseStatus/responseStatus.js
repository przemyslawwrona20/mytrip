(function ( window, angular, undefined ) {

    angular.module('geolab.model.responseStatus', [
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
