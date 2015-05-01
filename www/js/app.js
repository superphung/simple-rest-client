angular
    .module('App', ['ionic'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tabs', {
                url: '/tabs',
                //abstract: true,
                templateUrl: 'views/tabs/tabs.html'
            })
            .state('tabs.request', {
                url: '/request',
                views: {
                    'request-tab': {
                        templateUrl: 'views/request/request.html',
                        controller: 'RequestController as requestCtrl'
                    }
                }
            })
            .state('tabs.history', {
                url: '/history',
                views: {
                    'history-tab': {
                        templateUrl: 'views/history/history.html',
                        controller: 'HistoryController as historyCtrl'
                    }
                }
            });
        $urlRouterProvider.otherwise('/tabs');
    })
    .config(function ($ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
    })
    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })
    .factory('dataService', dataService);

dataService.$inject = ['$http'];

function dataService($http) {
    var cache = [];

    return {
        sendRequest: sendRequest,
        getCache: getCache
    };

    function sendRequest(req) {
        return $http(req)
            .then(function(data) {
                cache.unshift({
                    method: req.method,
                    url: req.url,
                    status: data.status
                });
                return data;
            })
            .catch(function(err) {
                cache.unshift({
                    method: req.method,
                    url: req.url,
                    status: err.status
                });
                throw err;
            });
    }

    function getCache() {
        return cache;
    }
}
