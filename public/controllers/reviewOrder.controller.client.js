
(function() {
    angular
        .module("Oota")
        .controller("ReviewOrderController", ReviewOrderController);

    function ReviewOrderController($window, $location, $routeParams, localStorageService,OrderService) {
        var vm = this;
        vm.updateOrder = updateOrder;
        vm.placeOrder = placeOrder;
        vm.getCurrentAddress = getCurrentAddress;

        function init() {
            vm.restuarantId = $routeParams['resid'];
            vm.userId = $routeParams['uid'];
            vm.restaurantLoc = localStorageService.get("pickupLoc");
            vm.restaurantName = localStorageService.get("restaurantName");
            localStorageService.remove("restaurantName");
            localStorageService.remove("pickupLoc");
            var dishes = localStorageService.keys();
            vm.orders = [];
            dishes.forEach(function (dish) {
                vm.orders.push({"dish":dish, "price": localStorageService.get(dish).price, "count": localStorageService.get(dish).count});
            });
            localStorageService.set("restaurantName", vm.restaurantName);
            localStorageService.set("pickupLoc", vm.pickupLoc);
            //console.log(vm.orders);
        }

        init();

        function updateOrder(count, dish, price)
        {
            if (count <= 0)
            {
                localStorageService.remove(dish);
                return 0;
            }
            if (localStorageService.get(dish) == null)
            {
                localStorageService.set(dish, {"price": price, "count": count});
            }
            else
            {
                localStorageService.set(dish, {"price": price, "count": count});
            }
            return count;
        }

        function getCurrentAddress(){
            $window.navigator.geolocation.getCurrentPosition(function(position) {

                OrderService
                    .getCurrentAddress(position.coords.latitude,position.coords.longitude)
                    .then(function (res) {
                        console.log(res);
                        vm.currentAddress=res.data.results[0].formatted_address;
                    });
                console.log(position)})
        }

        function placeOrder() {

            // _orderer:{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
            // restaurantName:String,
            //     orderTime:{type: Date, default: Date.now},
            // deliveryTime:Date,
            //     _deliverer:{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
            // deliveryLoc:String,
            //     pickupLoc:String,
            //     deliveryStatus:{type: String, enum: ['ORDERED','INCART','CANCELLED','DELIVERED'],default:'ORDERED'},
            // items:[{type:String}],
            //     prices:[{type:Number}],
            //     qty:[{type:Number}]

            var order = {   _orderer: vm.userId,
                            restaurantName: vm.restaurantName

            };
            console.log("place order : " + vm.orders[0].dish + " " + vm.orders[0].count );
        }



    }
})();