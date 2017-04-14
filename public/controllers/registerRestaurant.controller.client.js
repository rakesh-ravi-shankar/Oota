/**
 * Created by Rakesh on 3/26/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("RegisterRestaurantController", RegisterRestaurantController);

    function RegisterRestaurantController($location,RestaurantListService,RestaurantService) {
        var vm=this;
        vm.register=register;
        vm.loginRes=loginRes;


        function init() {

        }
        init();


        function loginRes(res) {
            vm.error="";
            if (typeof res === "undefined") {
                vm.error = "Undefined Entry!";
            }
            else if ((typeof res.username == "undefined") || (res.username == ""))
            {
                vm.error = "Please enter username!";
            }
            else if ((typeof res.password == "undefined") || (res.password == ""))
            {
                vm.error = "Please enter password!";
            }
            else {
                RestaurantService
                    .findRestaurantByCredentials(res)
                    .success(function (res) {
                        console.log(res);
                        if (res) {
                            vm.user = res;
                            $location.url("/" + vm.user[0].apiKey + "/restaurantDashboard")
                        }
                        else {
                            vm.error = "Invalid credentials!";
                        }
                    })
                    .error(function (err) {
                        vm.error = "Invalid credentials!";
                    });
            }
        }


        function register(restaurant) {

            vm.register_error = "";
            vm.register_message = "";

            if (typeof restaurant === "undefined") {
                vm.register_error = "Undefined Entry!";
            }
            else if ((typeof restaurant.username == "undefined") || (restaurant.username == ""))
            {
                vm.register_error = "Please enter username!";
            }
            else if ((typeof restaurant.password == "undefined") || (restaurant.password == ""))
            {
                vm.register_error = "Please enter password!";
            }
            else if (restaurant.password !== restaurant.verifyPassword) {
                vm.register_error = "Password mismatch!";
            }
            else {
                RestaurantService.findRestaurantByUsername(restaurant.username)
                    .success(function (restaurant1) {
                        if (restaurant1.length == 0) {
                            RestaurantListService
                                .searchRestaurant(restaurant.restaurantName, restaurant.address)
                                .then(function (fetchedRestaurant) {
                                    if (fetchedRestaurant.data.restaurants.length > 0) {
                                        restaurant.apiKey = fetchedRestaurant.data.restaurants[0].apiKey;
                                        restaurant.acceptsCard = fetchedRestaurant.data.restaurants[0].acceptsCard;
                                        restaurant.acceptsCash = fetchedRestaurant.data.restaurants[0].acceptsCash;
                                        restaurant.logoUrl = fetchedRestaurant.data.restaurants[0].logoUrl;
                                        restaurant.url = fetchedRestaurant.data.restaurants[0].url;
                                        restaurant.phone = fetchedRestaurant.data.restaurants[0].phone;
                                        restaurant.offersPickup = fetchedRestaurant.data.restaurants[0].offersPickup;
                                        RestaurantService
                                            .createRestaurant(restaurant)
                                            .success(function (restaurant2) {
                                                if (restaurant2) {
                                                    $location.url("/" + restaurant2.apiKey + "/restaurantDashboard");
                                                    vm.register_message = "Restaurant registered successfully!";
                                                }
                                                else
                                                    vm.register_error = "Error in Registration"
                                            });
                                    }
                                    else {
                                        vm.register_error = "Cannot link restaurant to EatStreet API! Please try again with correct name and address.";
                                    }

                                });
                        }
                    })
                    .error(function (err) {
                        RestaurantListService
                            .searchRestaurant(restaurant.restaurantName, restaurant.address)
                            .then(function (fetchedRestaurant) {
                                if (fetchedRestaurant.data.restaurants.length > 0) {
                                    restaurant.apiKey = fetchedRestaurant.data.restaurants[0].apiKey;
                                    restaurant.acceptsCard = fetchedRestaurant.data.restaurants[0].acceptsCard;
                                    restaurant.acceptsCash = fetchedRestaurant.data.restaurants[0].acceptsCash;
                                    restaurant.logoUrl = fetchedRestaurant.data.restaurants[0].logoUrl;
                                    restaurant.url = fetchedRestaurant.data.restaurants[0].url;
                                    restaurant.phone = fetchedRestaurant.data.restaurants[0].phone;
                                    restaurant.offersPickup = fetchedRestaurant.data.restaurants[0].offersPickup;
                                    RestaurantService
                                        .createRestaurant(restaurant)
                                        .success(function (restaurant2) {
                                            if (restaurant2) {
                                                $location.url("/" + restaurant2.apiKey + "/restaurantDashboard");
                                                vm.register_message = "Restaurant registered successfully!";
                                            }
                                            else
                                                vm.register_error = "Error in Registration"
                                        });
                                }
                                else {
                                    vm.register_error = "Cannot link restaurant to EatStreet API! Please try again with correct name and address.";
                                }

                            });

                    });
            }

        }
    }
})();