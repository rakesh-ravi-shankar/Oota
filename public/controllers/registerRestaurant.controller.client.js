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

        function init() {

        }
        init();
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