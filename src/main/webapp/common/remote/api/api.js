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
