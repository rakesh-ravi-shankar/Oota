(function () {
    angular
        .module("Oota")
        .factory("OrderService",orderService);

    function orderService($http) {


        var api={
            "createOrder":createOrder,
            "findActiveOrdersForOrderer":findActiveOrdersForOrderer,
            "findActiveOrders":findActiveOrders,
            "findOrderById":findOrderById,
            //"findRestaurantByCredentials":findRestaurantByCredentials
            "updateOrder":updateOrder,
            "findAllOrders":findAllOrders,
            "findAllOrdersForRestaurant":findAllOrdersForRestaurant,
            "getCurrentAddress":getCurrentAddress,
            "deleteOrder":deleteOrder
        };
        return api;

        function createOrder(order) {
            return $http.post("/api/order",order);
        }

        function findActiveOrdersForOrderer(userId) {
            return $http.get("/api/order/orderer/"+userId);
        }

        function findActiveOrders() {
            return $http.get("/api/order/activeOrders");
        }
        function updateOrder(order) {
            return $http.post("/api/order/updateOrder",order);
        }
        function findAllOrders() {
            return $http.get("/api/allOrders");
        }
        function findAllOrdersForRestaurant(apiKey){
            return $http.get("/api/allOrders/" + apiKey);
        }

        function findOrderById(oid) {
            return $http.get("/api/order/" + oid);
        }

        function deleteOrder(orderId, _orderer, _deliverer) {
            return $http.delete("/api/order/delete/" + orderId);
        }

        /*
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