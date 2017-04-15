(function () {
    angular
        .module("Oota")
        .controller("userProfileController", userProfileController);


    // vm.user --> page's user
    // vm.uid --> logged in user
    function userProfileController($http, $routeParams, $rootScope, userProfileService, UserService, OrderService, $location) {
        var vm = this;
        var trackStatus;
        vm.updateCurrentSelection = updateCurrentSelection;
        vm.followUser = followUser;
        vm.login = loginUser;
        vm.closeModal = closeModal;
        vm.loginUser = loginUser;
        vm.logout = logout;
        vm.loginClick = loginClick;
        vm.followButtonStatus = followButtonStatus;
        vm.saveComment = saveComment;
        vm.triggerComment = triggerComment;
        //vm.user= $rootScope.user;
        vm.currUser = false;
        vm.followers_objs = [];
        vm.following_objs = [];
        vm.comment = {};

        function init() {
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });

            $rootScope.$on('$routeChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    clearTimeout(trackStatus);
                });



            vm.urlUsername = $routeParams['username'];

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


                            }
                            else {
                                vm.currUser = false;
                                followButtonStatus();
                            }


                        } else {
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

            OrderService
                .findActiveOrdersForOrderer(vm.uid)
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
                            // var comments_id=[];
                            // for(i in comments.data)
                            // {
                            //     comments_id.push(comments.data[i].feedback_giver_id);
                            // }
                            // var comments_objs=[];
                            // getUsers(comments_id,comments_objs);
                            //
                            // for(i in comments_objs)
                            // {
                            //     vm.comments.data[i].url=comments_objs[i].profilepicurl;
                            // }

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
                            vm.followers_objs = [];
                            getUsers(vm.followers, vm.followers_objs);
                        });

                }
                else if (cs == 'FOLLOWING') {
                    userProfileService
                        .findfollowers(vm.user._id)
                        .then(function (users) {
                            vm.following = users.data.following;
                            vm.following_objs = [];
                            getUsers(vm.following, vm.following_objs);
                        });

                }
            }
        }

        function getUsers(user_ids, target_obj) {
            if (user_ids.length > 0)
            {
                var user_id = user_ids.pop();
                UserService
                    .findUserById(user_id)
                    .success(function (user) {
                        target_obj.push(user);
                        getUsers(user_ids, target_obj);
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
                    clearTimeout(trackStatus);
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
                        //vm.user = $rootScope.user;
                        console.log("logged in user" + $rootScope.user);

                        location.reload();
                        closeModal();

                    }
                    else {
                        vm.error = "user not found";
                    }
                }) .error(function (err) {
                vm.error="user not found";
            });
        }

        function closeModal() {
            $("#validateUserModal").modal("hide");
            return;
        }

        function saveComment(comment_text) {
            vm.comment.comment = comment_text;
            userProfileService
                .createUserComment(vm.comment)
                .then(function() {
                    $("#commentModal").modal("hide");
                });
        }


        function triggerComment(order) {
            vm.comment = {
                feedback_giver_id:$rootScope.user._id,
                feedback_giver_name:$rootScope.user.firstName,
                feedback_reciever_id:order._deliverer,
                order_id:order._id
            };

            UserService
                .findUserById(order._orderer)
                .then(function (user) {
                    vm.orderer = user;
                    $("#commentModal").modal("show")
                });
        }


    }
})();