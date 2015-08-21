// SERVICES
weatherApp.service('cityService', function() {
    this.city = "Buffalo, NY";
});

weatherApp.service('weatherService', ['$resource', function($resource) {
    this.getWeather = function(city, days) {
        var weatherApi = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK" }, { get: { method: "JSONP" }});
    
        return weatherResult = weatherApi.get({q: city, cnt: days}); 
    }
}]);