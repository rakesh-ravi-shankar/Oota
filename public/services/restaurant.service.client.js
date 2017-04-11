(function () {
    angular
        .module("Oota")
        .factory("RestaurantService",restaurantService);

    function restaurantService($http) {


        var api={
            "createRestaurant":createRestaurant,

            "findRestaurantByUsername":findRestaurantByUsername,
            "findRestaurantByCredentials":findRestaurantByCredentials

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



    };
})();