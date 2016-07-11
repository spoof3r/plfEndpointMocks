(function () {
    'use strict';

    // Holds the route mocks which are registered by HTTP verb
    angular.module('plf').constant('routeMocks', {
        'get': {},
        'delete': {},
        'head': {},
        'jsonp': {},
        'post': {},
        'put': {},
        'patch': {}
    });

    /****** ANGULAR $http SERVICE DECORATOR ******/
    angular.module('plf').config(['$provide', function ($provide) {
        function isRejectedStatusCode(statusCode) {
            if (statusCode == null) {
                return false;
            } else if (String(statusCode).charAt(0) === '2') {
                return false;
            } else {
                return true;
            }
        }

        $provide.decorator('$http', ['$delegate', '$injector', function ($delegate, $injector) {
            var $q = $injector.get('$q');
            var routeMocks = $injector.get('routeMocks');
            var appSettings = $injector.get('appSettings');

            var httpDecorator = function () {
                return $delegate.apply($delegate, arguments);
            };

            httpDecorator.get = function (url, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.get[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.get(url, config);
            };

            httpDecorator.delete = function (url, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.delete[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.delete(url, config);
            };

            httpDecorator.head = function (url, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.head[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.head(url, config);
            }

            httpDecorator.jsonp = function (url, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.jsonp[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.jsonp(url, config);
            }

            httpDecorator.post = function (url, data, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.post[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.post(url, data, config);
            }

            httpDecorator.put = function (url, data, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.put[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.put(url, data, config);
            }

            httpDecorator.patch = function (url, data, config) {
                // strip out the base API uri from the URL
                var mockUrl = getMockUrl(url);

                var routeMock = routeMocks.patch[mockUrl];

                if (routeMock) {
                    // Return mock data
                    if (isRejectedStatusCode(routeMock.status)) {
                        return $q.reject(routeMock);
                    } else {
                        return $q.when(routeMock);
                    }
                }

                // If no mock data, delegate the call onto the actual $http service
                return $delegate.patch(url, data, config);
            }

            function getMockUrl(url) {
                // strip out the base API URI from the URL
                var mockUrl = url;
                var apiUrlIndex = url.indexOf(appSettings.API_URI);

                if (apiUrlIndex > -1) {
                    mockUrl = url.substr(apiUrlIndex + appSettings.API_URI.length);
                }

                return mockUrl;
            }

            return httpDecorator;
        }]);
    }]);
}());