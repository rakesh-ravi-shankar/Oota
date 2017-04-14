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
            "updateRestaurant":updateRestaurant,
            "deleteRestaurant":deleteRestaurant,
            "findRestaurantById":findRestaurantById
        };
        return api;

        function createRestaurant(restaurant) {
            return $http.post("/api/restaurant",restaurant);
        }
        function updateRestaurant(rest) {
            return $http.post("/api/updaterestaurant/",rest);
        }

        function findRestaurantByUsername(username) {
            var username= encodeURIComponent(username);
            return $http.get("/api/restaurant?username="+username);
        }

        function findRestaurantByCredentials(res) {
            var resname=encodeURIComponent(res.username);
            return $http.get("/api/restaurant?username="+resname+"&password="+res.password);
        }

        function findAllRestaurants() {
            return $http.get("/api/allRestaurants");
        }

        function findRestaurantById(restId) {
            return $http.get("/api/restaurant/"+restId);
        }

        function findRestaurantByApiKey(apiKey) {
            return $http.get("/api/restaurantDashboard/" + apiKey);
        }

        function deleteRestaurant(apiKey) {
            return $http.delete("/api/deleteRestaurant/" + apiKey);
        }

    };
})();