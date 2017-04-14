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
                        vm.error="user not found";
                    }
                })
                .error(function (err) {
                    vm.error="user not found";
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
                        vm.message="User name already taken!";
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