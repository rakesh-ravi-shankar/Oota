/**
 * Created by Rakesh on 3/25/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("LoginController", LoginController);

    function LoginController($location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);

            promise.success(function (response) {
                var loginUser=response;
                if(loginUser)
                {   console.log(loginUser[0].username);
                    console.log(loginUser);
                    $location.url("/user/"+loginUser[0]._id);

                }else
                {
                    vm.error="user not found";}
            });
        }

    }
})();