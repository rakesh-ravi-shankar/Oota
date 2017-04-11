/**
 * Created by Rakesh on 3/25/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("LoginController", LoginController);

    function LoginController(UserService,$rootScope, $location) {
        var vm = this;
        vm.loginUser = loginUser;

        // function login(user) {
        //     var promise = UserService.findUserByCredentials(user.username, user.password);
        //
        //     promise.success(function (response) {
        //         var loginUser=response;
        //         if(loginUser)
        //         {   console.log(loginUser[0].username);
        //             console.log(loginUser);
        //             $location.url("/user/"+loginUser[0]._id);
        //
        //         }else
        //         {
        //             vm.error="user not found";}
        //     });
        // }
        function loginUser(user)
        {
            console.log("bhla");
            UserService
                .findUserByCredentials(user)
                .success(function (loggedUser) {
                    console.log(loggedUser);
                    if(loggedUser)
                    {
                        console.log(loggedUser);

                        $rootScope.user = loggedUser;
                        vm.user= $rootScope.user;
                        console.log("logged in user " + $rootScope.user);
                        $location.url("/deliver" );
                    }
                    else
                    {
                        vm.error="user not found";
                    }
                });
        }

    }
})();