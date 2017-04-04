
(function() {
    angular
        .module("Oota")
        .controller("OrderController", OrderController);

    function OrderController($location, $routeParams, localStorageService) {
        var vm = this;
        vm.updateCount = updateCount;

        function init() {
            vm.restuarantId = $routeParams['resid'];
            vm.userId = $routeParams['uid'];
            var restaurantLoc = localStorageService.get("pickupLoc");
            vm.restaurantName = localStorageService.get("restaurantName");
            localStorageService.remove("restaurantName");
            localStorageService.remove("pickupLoc");
            var dishes = localStorageService.keys();
            vm.orders = [];
            dishes.forEach(function (dish) {
                vm.orders.push({"dish":dish, "price": localStorageService.get(dish).price, "count": localStorageService.get(dish).count});
            });

        }

        function updateOrder(count, dish, price)
        {
            if (count < 0)
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

        init();

    }
})();