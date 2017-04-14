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
            "findRestaurantByApiKey":findRestaurantByApiKey
            // "updateUser":updateUser,
            // "deleteUser":deleteUser

        };
        return api;

        function createRestaurant(restaurant) {
            return $http.post("/api/restaurant",restaurant);
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

        function findRestaurantByApiKey(apiKey) {
            return $http.get("/api/restaurantDashboard/" + apiKey);
        }

        //
        // function updateUser(userId,user) {
        //     return $http.put("/api/user/"+userId, user);
        //
        // }
        //
        // function deleteUser(userId) {
        //     return $http.delete("/api/user/"+userId);
        //
        //
        // }




    };
})();