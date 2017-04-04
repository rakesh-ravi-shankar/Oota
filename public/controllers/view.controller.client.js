/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("EatinController", EatinController)


    function EatinController($routeParams,$window,$location,EatinService) {

        vm=this;
        function init() {
            $window.navigator.geolocation.getCurrentPosition(function(position) {
                       // console.log(position.coords.latitude);
                        EatinService
                            .searchRestaurantByLocation(position.coords.latitude,position.coords.longitude)
                            .then(function (res) {
                                vm.restaurants=res;

                            });



            })


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
        }

        vm.searchMenu=function (res) {
            $location.url("/view-menu/"+res);

        }


    }
})();