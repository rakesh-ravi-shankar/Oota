/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("EatinController", EatinController)


    function EatinController($routeParams,$location,EatinService) {

        vm=this;
        function init() {


        }
        init();


        vm.searchRestaurant = function(res,loc) {

            EatinService
                .searchRestaurant(res,loc)
                .then(function(response) {

                    EatinService
                        .searchMenu(response.data.restaurants[0].apiKey)
                        .then(function (menu) {
                            vm.menu=menu;
                            console.log(menu);

                        });

                });
            EatinService
                .addOrder(name,qty)
                .then(function(response) {



                });
        }



    }
})();