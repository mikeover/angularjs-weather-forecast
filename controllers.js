// CONTROLLERS
weatherApp.controller("homeController", ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function() {
        cityService.city = $scope.city; 
    });
    
    $scope.submit = function() {
        // inject $location service to send us to the forecast page
        $location.path("/forecast");
    };
    
}]);

weatherApp.controller("forecastController", ['$scope', '$routeParams', 'cityService', 'weatherService', function($scope, $routeParams, cityService, weatherService) {
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '7';
    
    $scope.weatherResult = weatherService.getWeather($scope.city, $scope.days);
    console.log($scope.weatherResult);
    
    $scope.convertToFarenheit = function(degK) {
        return Math.round((1.8 * (degK - 273) + 32));
    }
    
    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);   
    }
    
}]);