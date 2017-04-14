(function () {
    angular
        .module("Oota")
        .factory("RestaurantService",restaurantService);

    function restaurantService($http) {


        var api={
            "createRestaurant":createRestaurant,
            "findRestaurantByUsername":findRestaurantByUsername,
            "findRestaurantByCredentials":findRestaurantByCredentials,
            "findAllRestaurants":findAllRestaurants,
            "findRestaurantByApiKey":findRestaurantByApiKey,
            "deleteRestaurant":deleteRestaurant
        };
        return api;

        function createRestaurant(restaurant) {
            return $http.post("/api/restaurant",restaurant);
        }

        function findRestaurantByUsername(username) {
            var username= encodeURIComponent(username);
            return $http.get("/api/restaurant?username="+username);
        }

        function findRestaurantByCredentials(restaurant,password) {
            return $http.get("/api/restaurant?username="+username+"&password="+password);
        }

        function findAllRestaurants() {
            return $http.get("/api/allRestaurants");
        }

        function findRestaurantByApiKey(apiKey) {
            return $http.get("/api/restaurantDashboard/" + apiKey);
        }

        function deleteRestaurant(apiKey) {
            return $http.delete("/api/deleteRestaurant/" + apiKey);
        }

    };
})();