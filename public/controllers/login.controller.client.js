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
        vm.registerUser=registerUser;
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
            // console.log("bhla");
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
                        vm.message="user not found";
                    }
                }) .error(function (err) {
                vm.message="user not found";
            });
        }

        function registerUser(user) {

            UserService.findUserByUsername(user.username)
                .success(function (u) {
                    if(u.length == 0)
                    {
                        // vm.message="User name NOT taken!";
                        UserService.createUser(user)
                            .success(function (user) {
                                if (user) {
                                    $("#validateUserModal").modal("hide");
                                    $("body").removeClass("modal-open");
                                    $(".modal-backdrop").remove();
                                    $rootScope.user = user;
                                    vm.user= $rootScope.user;
                                    //$location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/");

                                    vm.message = "User created successfully";
                                }
                                else
                                    vm.error = "User not created successfully!"
                            });
                    }
                    else {
                        vm.error="User name already taken!";
                        // console.log("EXISTS")
                    }


                })
                .error(function (err) {
                    // vm.message="User name NOT taken!";
                    UserService.createUser(user)
                        .success(function (user) {
                            if (user) {
                                $("#validateUserModal").modal("hide");
                                $("body").removeClass("modal-open");
                                $(".modal-backdrop").remove();
                                $rootScope.user = user;
                                vm.user= $rootScope.user;
                                //$location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/" + $rootScope.currentUser.username + "/order");

                                vm.message = "User created successfully";
                            }
                            else
                                vm.error = "User not created successfully!"
                        });

                });



        }


    }
})();