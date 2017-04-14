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
            RestaurantService
                .findRestaurantByCredentials(res)
                .success(function (res) {
                    console.log(res);
                    if(res)
                    {
                        vm.user=res;
                        $location.url("/"+vm.user[0].apiKey+"/restaurantDashboard")
                        }
                    else
                    {
                        vm.error="user not found";
                    }
                })
                .error(function (err) {
                    vm.error="user not found";
                });
        }
        function register(restaurant) {
            console.log(restaurant);

            RestaurantService.findRestaurantByUsername(restaurant.username)
                .success(function (restaurant1) {
                    if(restaurant1.length == 0)
                    {
                        vm.message="Available!"
                        RestaurantListService
                            .searchRestaurant(restaurant.restaurantName,restaurant.address)
                            .then(function (fetchedRestaurant) {
                                if(fetchedRestaurant.data.restaurants.length > 0)
                                {
                                    restaurant.apiKey = fetchedRestaurant.data.restaurants[0].apiKey;
                                    restaurant.acceptsCard = fetchedRestaurant.data.restaurants[0].acceptsCard;
                                    restaurant.acceptsCash = fetchedRestaurant.data.restaurants[0].acceptsCash;
                                    restaurant.logoUrl = fetchedRestaurant.data.restaurants[0].logoUrl;
                                    restaurant.url = fetchedRestaurant.data.restaurants[0].url;
                                    restaurant.phone = fetchedRestaurant.data.restaurants[0].phone;
                                    restaurant.offersPickup = fetchedRestaurant.data.restaurants[0].offersPickup;
                                }
                                else {
                                    restaurant.apiKey = "";
                                }
                                RestaurantService.createRestaurant(restaurant)
                                    .success(function (restaurant2) {
                                        if(restaurant2)
                                        {
                                            // $location.url("/restaurant/"+restaurant._id);
                                            vm.message="Restaurant registered successfully";
                                        }
                                        else
                                            vm.error="Error in Registration "


                                    });
                            });



                    }


                })
                .error(function (err) {
                    vm.message="Available!"
                    var rest=
                        RestaurantListService.searchRestaurant(restaurant.restaurantName,restaurant.address);
                    console.log(rest);
                    RestaurantService.createRestaurant(restaurant)
                        .success(function (restaurant) {
                            if(restaurant)
                            {
                                // $location.url("/restaurant/"+restaurant._id);
                                vm.message="Restaurant registered successfully";
                            }
                            else
                                vm.error="Error in Registration "


                        });
                });


            // var user=UserService.createUser(user);
            // if(user)
            // {
            //     $location.url("/user/"+user._id);
            // }
            // else
            //     vm.error="User not created successfully!"
        }
    }
})();