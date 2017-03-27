/**
 * Created by Rakesh on 3/25/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("RegisterUserController", RegisterUserController);

    function RegisterUserController($location,UserService) {
        var vm=this;
        vm.register=register;

        function init() {

        }
        init();
        function register(user) {

            UserService.findUserByUsername(user.username)
                .success(function (user) {
                    vm.message="User name already taken!"
                })
                .error(function (err) {
                    vm.message="Available";
                });

            UserService.createUser(user)
                .success(function (user) {
                    if(user)
                    {
                        $location.url("/user/"+user._id);
                        vm.message="User created successfully";
                    }
                    else
                        vm.error="User not created successfully!"


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
