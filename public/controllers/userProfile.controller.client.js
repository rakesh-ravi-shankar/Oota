(function () {
    angular
        .module("Oota")
        .controller("userProfileController", userProfileController);

    function userProfileController($http, $routeParams, $rootScope, userProfileService, UserService, OrderService, $location) {
        var vm = this;
        vm.updateCurrentSelection = updateCurrentSelection;
        vm.followUser = followUser;
        vm.login = loginUser;
        vm.closeModal = closeModal;
        vm.loginUser = loginUser;
        vm.logout = logout;
        vm.loginClick = loginClick;
        vm.followButtonStatus = followButtonStatus;
        //vm.user= $rootScope.user;
        vm.currUser = false;
        var trackStatus;
        vm.followers_objs = []


        function init() {
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });

            $(document).ready(function () {
                $(window).bind("beforeunload", function () {
                    console.log("UNLOADED");
                    clearTimeout(trackStatus);
                });
                $(window).bind("navigate", function (event, data) {
                    console.log("NAVIGATE");
                    clearTimeout(trackStatus);
                });
            });



            vm.urlUsername = $routeParams['username'];
            console.log("urlusername : " + vm.urlUsername);

            UserService
                .findUserByUsername(vm.urlUsername)
                .success(function (user) {
                    vm.user = user;


                    $http.get('/api/loggedin').success(function (user) {
                        $rootScope.errorMessage = null;
                        if (user !== '0') {
                            $rootScope.user = user;
                            vm.uid = user._id;
                            vm.loggedInUser = $rootScope.user;


                            //console.log("curr user : " + vm.uid + "other user name" + vm.otherUser);
                            if (vm.loggedInUser.username == vm.urlUsername) {

                                vm.currUser = true;
                                vm.currentSelection = "TRACK ORDER";


                                OrderService
                                    .findActiveOrdersForOrderer(vm.uid)
                                    .success(function (orders) {
                                        vm.orders = orders;
                                    });
                                trackStatus = window.setInterval(updateStatus, 5000);

                                //TODO: check if already followed

                            }
                            else {
                                vm.currUser = false;
                                followButtonStatus();
                            }


                        } else {
                            console.log("Dont come here!!!");
                            followButtonStatus();
                        }
                    });
                });


        }

        init();

        function followButtonStatus() {
            var usertofollow = vm.user._id;
            vm.followed = false;
            $("#followBtn").addClass("btn-success");
            vm.followStatus = "Follow";

            if (vm.uid != null) {
                userProfileService
                    .alreadyfollowing(vm.uid, usertofollow)
                    .then(function (followed) {
                        if (followed.data.length != 0) {
                            updateFollowBtnStatus("btn-success","btn-danger","Unfollow",true);
                        }


                    });
            }
        }

        function updateFollowBtnStatus(remove,add,newStatus,newStatusBool){
            $("#followBtn").removeClass(remove);
            $("#followBtn").addClass(add);
            vm.followStatus = newStatus;
            vm.followed = newStatusBool;
        }

        function followUser() {
            //var loggedInUser = $rootScope.user._id;
            if(vm.loggedInUser==null){
                loginClick();
                return;
            }
            var usertofollow = vm.user._id;
            if (!vm.followed) {
                userProfileService
                    .followUser(vm.loggedInUser._id, usertofollow)
                    .then(function (followed) {
                        updateFollowBtnStatus("btn-success","btn-danger","Unfollow",true);
                    });
            }
            else {
                userProfileService
                    .unfollowUser(vm.loggedInUser._id, usertofollow)
                    .then(function (followed) {
                        updateFollowBtnStatus("btn-danger","btn-success","Follow",false);
                    });
            }


        }

        function updateStatus() {
            console.log("updating..");
            // TODO:change the frequency
            OrderService
                .findActiveOrdersForOrderer(vm.user._id)
                .success(function (orders) {
                    vm.orders = orders;
                });
        }

        function updateCurrentSelection(cs) {
            vm.currentSelection = cs;

            if (cs == 'TRACK ORDER') {
                clearTimeout(trackStatus);
                trackStatus = window.setInterval(updateStatus, 5000);
            }
            else {
                clearTimeout(trackStatus);
                if (cs == 'COMMENTS') {
                    userProfileService
                        .findUserComments(vm.user._id)
                        .then(function (comments) {
                            vm.comments = comments;

                        });
                }
                else if (cs == 'ORDER HISTORY') {
                    userProfileService
                        .findoldorder(vm.user._id)
                        .then(function (orders) {
                            vm.oldorders = orders;

                        });

                }
                else if (cs == 'FOLLOWERS') {
                    userProfileService
                        .findfollowers(vm.user._id)
                        .then(function (users) {
                            vm.followers = users.data.followers;
                            getUsers(vm.followers);
                            console.log(vm.followers_objs);
                        });

                }
                else if (cs == 'FOLLOWING') {
                    userProfileService
                        .findfollowers(vm.user._id)
                        .then(function (users) {
                            vm.following = users.data.following;
                        });

                }
            }
        }

        function getUsers(user_ids) {
            if (user_ids != undefined)
            {
                var user_id = user_ids.pop();
                UserService
                    .findUserById(user_id)
                    .success(function (user) {
                        console.log(user);
                        vm.followers_objs.push(user);
                        getUsers(user_ids);
                    })
            }
            else
                return;
        }

        function loginClick() {
            $("#validateUserModal").modal("show");
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    console.log("User logged out");
                    $rootScope.user = null;
                    vm.user = null;
                    $location.url("/homePage")
                });
        }

        function loginUser(user) {
            UserService
                .findUserByCredentials(user)
                .success(function (loggedUser) {
                    console.log(loggedUser);
                    if (loggedUser) {
                        console.log(loggedUser);
                        $("#validateUserModal").modal("hide");
                        $("body").removeClass("modal-open");
                        $(".modal-backdrop").remove();
                        $rootScope.user = loggedUser;
                        vm.user = $rootScope.user;
                        console.log("logged in user" + $rootScope.user);

                        location.reload();
                        closeModal();

                    }
                    else {
                        vm.error = "user not found";
                    }
                });
        }

        function closeModal() {
            $("#validateUserModal").modal("hide");
            return;
        }


    }
})();