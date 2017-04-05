
(function() {
    angular
        .module("Oota")
        .controller("ReviewOrderController", ReviewOrderController);

    function ReviewOrderController($location, $routeParams, localStorageService) {
        var vm = this;
        vm.updateOrder = updateOrder;
        vm.placeOrder = placeOrder;

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
            console.log(vm.orders);
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


        function placeOrder() {
            // vm.orders
            // vm.restaurantName
            // vm.restaurantLoc
        }



    }
})();