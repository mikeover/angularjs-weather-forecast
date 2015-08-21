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