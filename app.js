// MODULE
var weatherApp = angular.module("weatherApp", ["ngRoute", "ngResource"]);

//ROUTES
weatherApp.config(function($routeProvider) {
    
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'homeController'
    })
        
    .when('/forecast', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
    .when('/forecast/:days', {
        templateUrl: 'pages/forecast.html',
        controller: 'forecastController'
    })
    
});

// SERVICES
weatherApp.service('cityService', function() {
    this.city = "Buffalo, NY";
});

weatherApp.controller("homeController", ['$scope', 'cityService', function($scope, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city; 
    });
    
}]);
    
weatherApp.controller("forecastController", ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '7';
    
    $scope.weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
    $scope.weatherResult = $scope.weatherApi.get({q: $scope.city, cnt: $scope.days});
    
    $scope.convertToFarenheit = function(degK) {
        return Math.round((1.8 * (degK - 273) + 32));
    }
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);   
    }
    
}]);
    
// DIRECTIVES
weatherApp.directive("weatherReport", function() {
   return {
       restrict: 'E',
       templateUrl: 'directives/weatherReport.html',
       replace: true,
       scope: {
           weatherDay: "=",
           convertToStandard: "&",
           convertToDate: "&",
           dateFormat: "@"
       }
   }
});
    
    