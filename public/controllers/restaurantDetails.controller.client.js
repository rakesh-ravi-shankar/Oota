/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("RestaurantDetailController", RestaurantDetailController);


    function RestaurantDetailController($rootScope,$routeParams,$http, $window, $location, RestaurantReviewService, localStorageService, UserService) {
        var vm = this;
        vm.submitReview = submitReview;
        vm.logout = logout;
        vm.login = loginUser;
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;
        vm.closeModal=closeModal;
        vm.loginClick=loginClick;

        function init() {
            var restaurant = localStorageService.get("restaurant");
            // console.log(restaurant);
            vm.apiKey = restaurant.apiKey;
            vm.restaurantLogo = restaurant.logoUrl;
            vm.restaurantName = restaurant.name;
            vm.restaurantPhone = restaurant.phone;
            vm.restaurantAddress = restaurant.streetAddress + " " + restaurant.city + " " + restaurant.state;
            vm.allReviews = [];
            fetchAllReviews();


            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.user = user;
                } else {
                    console.log("Dont come here!!!");
                }
            });

            if($rootScope.user != null){
                vm.user=$rootScope.user;
            }

            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
        }

        init();


        function fetchAllReviews() {
            vm.allReviews = [];
            RestaurantReviewService
                .findAllReviews(vm.apiKey)
                .success(function (allReviews) {

                    if (allReviews != null)
                    {
                        UserService
                            .findAllUsers()
                            .success(function (users) {

                                var user_objs = {};
                                users.forEach(function (user) {
                                    if (allReviews._users.includes(user._id))
                                    {
                                        user_objs[user._id] = user;
                                    }
                                });


                                for (i in allReviews._users)
                                {
                                    vm.allReviews
                                        .push({firstName: user_objs[allReviews._users[i]].firstName,
                                                lastName: user_objs[allReviews._users[i]].lastName,
                                                username: user_objs[allReviews._users[i]].username,
                                                profilepicurl:user_objs[allReviews._users[i]].profilepicurl,
                                                reviewText: allReviews.reviews[i],
                                                createdAt:allReviews.dateCreated[i].split("T")[0]});
                                }
                                vm.allReviews.reverse();
                            });
                    }

                });
        }


        function submitReview(review) {
            var user= $rootScope.user;
            if(user == undefined)
            {
                $("#validateUserModal").modal("show");
            }
            else {

                if ((review == "") || (review == undefined)){
                    return;
                }
                RestaurantReviewService
                    .createReview({apiKey: vm.apiKey, _user: user._id, review: review, dateCreated:Date.now()})
                    .success(function (createdReview) {
                        console.log(createdReview);
                        $("#reviewTextArea").val("");
                        fetchAllReviews();
                    });

            }
        }


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