/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("RestaurantListController", RestaurantListController);


    function RestaurantListController($routeParams, $window, $location, RestaurantListService, localStorageService) {
        var vm = this;
        vm.getRestaurantDetails = getRestaurantDetails;


        function init() {
            //clear the local storage
            localStorageService.clearAll();

            $window.navigator.geolocation.getCurrentPosition(function(position) {
                       // console.log(position.coords.latitude);
                RestaurantListService
                            .searchRestaurantByLocation(position.coords.latitude,position.coords.longitude)
                            .then(function (res) {
                                vm.restaurants=res;
                            });
            });
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
        }
        init();


        vm.searchRestaurant = function(res,loc) {
            RestaurantListService
                .searchRestaurant(res,loc)
                .then(function(response) {
                    RestaurantListService
                        .searchMenu(response.data.restaurants[0].apiKey)
                        .then(function (menu) {
                            vm.menu=menu;
                            console.log(menu);

                        });
                        vm.restaurants=response;
                });
        };

        vm.searchMenu=function (res) {
            RestaurantListService.saveResDetails(res);
                    $location.url("/restaurantList/" + res.apiKey + "/restaurantMenu");
        };


        function getRestaurantDetails(index) {
            localStorageService.set("restaurant", vm.restaurants.data.restaurants[index]);

            console.log(vm.restaurants.data.restaurants[index]);
            $location.url("/" + vm.restaurants.data.restaurants[index].apiKey + "/restaurantDetails");
        }


    }
})();