/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("MenuController", MenuController)


    function MenuController($routeParams,EatinService,$location) {

        vm=this;

        vm.restuarantId = $routeParams['resid'];
        vm.userId = $routeParams['uid'];
        vm.addOrder = addOrder;
        vm.checkout = checkout;

        function init() {

            var res=$routeParams['resid'];
            EatinService
                .searchMenu(res)
                .then(function (menu) {
                    vm.menu=menu;
                        });




            vm.res_details=EatinService.getResDetails();


        }
        init();

        function addOrder(name,price)
        {

        }
        function checkout()
        {
            console.log("checkout");
            $location.url('/user/58e07aa2c81b421eb099875a/restaurant/2a670fba22c2b580144247b91fbcb2f37ddc2eba8dfab49d/order');
        }


    }
})();