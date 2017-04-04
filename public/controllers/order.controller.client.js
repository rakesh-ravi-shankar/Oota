
(function() {
    angular
        .module("Oota")
        .controller("OrderController", OrderController);

    function OrderController($location) {
        var vm=this;
        //vm.register=register;

        function init() {

        }
        init();
        function placeOrder(order) {
/*
            RestaurantService.findRestaurantByUsername(restaurant.username)
                .success(function (restaurant) {
                    vm.message="Available!"
                })
                .error(function (err) {
                    vm.message="User name already taken";
                });

            RestaurantService.createRestaurant(restaurant)
                .success(function (restaurant) {
                    if(restaurant)
                    {
                        $location.url("/restaurant/"+restaurant._id);
                        vm.message="Restaurant registered successfully";
                    }
                    else
                        vm.error="Error in Registration :( "


                });
            // var user=UserService.createUser(user);
            // if(user)
            // {
            //     $location.url("/user/"+user._id);
            // }
            // else
            //     vm.error="User not created successfully!"
 */
        }
    }
})();