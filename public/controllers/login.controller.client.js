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
            vm.error="";
            if (typeof user === "undefined") {
                vm.error = "Undefined Entry!";
            }
            else if ((typeof user.username == "undefined") || (user.username == ""))
            {
                vm.error = "Please enter username!";
            }
            else if ((typeof user.password == "undefined") || (user.password == ""))
            {
                vm.error = "Please enter password!";
            }
            else {
                UserService
                    .findUserByCredentials(user)
                    .success(function (loggedUser) {
                        console.log(loggedUser);
                        if (loggedUser) {
                            console.log(loggedUser);

                            $rootScope.user = loggedUser;
                            vm.user = $rootScope.user;
                            console.log("logged in user " + $rootScope.user);
                            $location.url("/deliver");
                        }
                        else {
                            vm.error = "User not found!";
                        }
                    }).error(function (err) {
                    vm.error = "User not found!";
                });
            }
        }

        function registerUser(user) {

            vm.register_error = "";
            vm.register_message = "";

            if (typeof user === "undefined") {
                vm.register_error = "Undefined Entry!";
            }
            else if ((typeof user.username == "undefined") || (user.username == ""))
            {
                vm.register_error = "Please enter username!";
            }
            else if ((typeof user.password == "undefined") || (user.password == ""))
            {
                vm.register_error = "Please enter password!";
            }
            else if (user.password !== user.verify_password) {
                vm.register_error = "Password mismatch!";
            }
            else {
                UserService.findUserByUsername(user.username)
                    .success(function (u) {
                        if(u.length == 0)
                        {
                            UserService.createUser(user)
                                .success(function (user) {
                                    if (user) {
                                        $("#validateUserModal").modal("hide");
                                        $("body").removeClass("modal-open");
                                        $(".modal-backdrop").remove();
                                        $rootScope.user = user;
                                        vm.user= $rootScope.user;
                                        //$location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/");

                                        vm.register_message = "User created successfully!";
                                    }
                                    else
                                        vm.register_error = "User creation failed!"
                                });
                        }
                        else {
                            vm.register_error="User name already taken!";
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

                                    vm.register_message = "User created successfully";
                                }
                                else
                                    vm.register_error = "User creation failed!"
                            });

                    });
            }

        }


    }
})();