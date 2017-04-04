/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("MenuController", MenuController);


    function MenuController($routeParams, EatinService, $location, localStorageService) {
        vm=this;
        vm.updateOrder = updateOrder;
        vm.checkout = checkout;
        vm.initializeCount = initializeCount;

        function init() {
            vm.restaurantId = $routeParams['resid'];
            vm.userId = $routeParams['uid'];
            var res = $routeParams['resid'];
            EatinService
                .searchMenu(res)
                .then(function (menu) {
                    vm.menu=menu;
                        });
            vm.res_details = EatinService.getResDetails();
            localStorageService.set("restaurantName", vm.res_details.name);
            var restaurantAddress = vm.res_details.streetAddress + ", " + vm.res_details.city + ", " + vm.res_details.state;
            localStorageService.set("pickupLoc", restaurantAddress);
        }
        init();


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


        function initializeCount(dish)
        {
            if (localStorageService.get(dish) == null)
            {
                return 0;
            }
            else {
                return localStorageService.get(dish).count;
            }
        }


        function checkout()
        {
            console.log("checkout");
            $location.url('/user/58e07aa2c81b421eb099875a/restaurant/2a670fba22c2b580144247b91fbcb2f37ddc2eba8dfab49d/order');
        }


    }
})();