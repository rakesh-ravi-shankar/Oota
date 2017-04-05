(function () {
    angular
        .module("Oota")
        .factory("OrderService",orderService);

    function orderService($http) {


        var api={
            //"createRestaurant":createRestaurant,
            // "findUserById":findUserById,
            //"findRestaurantByUsername":findRestaurantByUsername,
            //"findRestaurantByCredentials":findRestaurantByCredentials
            // "updateUser":updateUser,
            // "deleteUser":deleteUser
            getCurrentAddress:getCurrentAddress
        };
        return api;
/*
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

*/
        function getCurrentAddress(lat,lon) {
            console.log(lat);
            console.log(lon);
            var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lon+"&key=";
            return $http.get(url);
        }

    };
})();