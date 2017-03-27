(function () {
    angular
        .module("Oota")
        .factory("RestaurantService",restaurantService);

    function restaurantService($http) {


        var api={
            "createRestaurant":createRestaurant,
            // "findUserById":findUserById,
            "findRestaurantByUsername":findRestaurantByUsername,
            "findRestaurantByCredentials":findRestaurantByCredentials
            // "updateUser":updateUser,
            // "deleteUser":deleteUser
        };
        return api;

        function createRestaurant(restaurant) {
            return $http.post("/api/restaurant",restaurant);
        }
        //
        // function findUserById(userId) {
        //     return $http.get("/api/user/"+userId);
        //
        // }
        //
        function findRestaurantByUsername(username) {
            return $http.get("/api/restaurant?username="+username);


        }

        function findRestaurantByCredentials(restaurant,password) {

            return $http.get("/api/restaurant?username="+username+"&password="+password);

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