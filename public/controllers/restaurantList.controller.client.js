/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("RestaurantListController", RestaurantListController);


    function RestaurantListController($rootScope, $http, $window, $location, RestaurantListService, localStorageService, UserService) {
        var vm = this;
        vm.getRestaurantDetails = getRestaurantDetails;
        vm.logout = logout;
        vm.login = loginUser;
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;
        vm.closeModal=closeModal;
        vm.loginClick=loginClick;
        //vm.user= $rootScope.user;

        function init() {

            //clear the local storage

            console.log("Init called!!!");
            console.log($rootScope.user);
            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.user = user;
                    console.log("after logenin");
                    console.log($rootScope.user);
                    vm.user=$rootScope.user;
                } else {
                    console.log("Dont come here!!!");
                }
            });
/*
            if($rootScope.user != null){
                console.log("user present 1");
                vm.user=$rootScope.user;
             } */
            localStorageService.clearAll();
            //vm.user= $rootScope.user;

            $window.navigator.geolocation.getCurrentPosition(function(position) {
                       // console.log(position.coords.latitude);
                RestaurantListService
                            .searchRestaurantByLocation(position.coords.latitude,position.coords.longitude)
                            .then(function (res) {
                                vm.restaurants=res;
                                $(".spinner").addClass("hide");
                            });
            });
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
        }
        init();



        function loginClick()
        {
            $("#validateUserModal").modal("show");
        }


        function closeModal() {
            $("#validateUserModal").modal("hide");
            return;
        }


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
                        if(loggedUser)
                        {
                            console.log(loggedUser);
                            $("#validateUserModal").modal("hide");
                            $("body").removeClass("modal-open");
                            $(".modal-backdrop").remove();
                            $rootScope.user = loggedUser;
                            vm.user= $rootScope.user;
                            console.log("logged in user " + $rootScope.user);
                            closeModal();
                            //$location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/" + $rootScope.currentUser.username );
                        }
                        else
                        {
                            vm.error="User not found!";
                        }
                    })
                    .error(function (err) {
                        vm.error="User not found!";
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



        function logout() {
            UserService
                .logout()
                .success(function () {
                    console.log("User logged out");
                       $rootScope.user = null;
                       vm.user = null;
                    });
        }


    }
})();