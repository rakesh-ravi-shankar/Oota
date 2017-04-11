(function() {
    angular
        .module("Oota")
        .controller("userProfileController", userProfileController);

    function userProfileController($routeParams,$rootScope, userProfileService, UserService, OrderService, $location) {
        var vm = this;
        vm.updateCurrentSelection=updateCurrentSelection;
        vm.followUser=followUser;



        function init() {
            if($rootScope.user != null){
                vm.uid=$rootScope.user._id;
                vm.loggedInUsername=$rootScope.user.username;
            }
            vm.urlUsername=$routeParams[username];


            console.log("curr user : " + vm.uid + "other user name" + vm.otherUser);
            if(vm.loggedInUsername == vm.urlUsername){

                vm.currentSelection = "trackorder";
                UserService
                    .findUserById(vm.uid)
                    .success(function (user) {
                        vm.user = user;
                    });
                OrderService
                    .findActiveOrdersForOrderer(vm.uid)
                    .success(function (orders) {
                        vm.orders = orders;
                    });
                window.setInterval(updateStatus, 5000);
                console.log(vm.orders);

                //check if already followed
                var usertofollow = '58e862d6aef6f1574cd71197';
                userProfileService
                    .alreadyfollowing(vm.uid, usertofollow)
                    .then(function (followed) {
                        if (followed.data.length != 0)
                            vm.followed = true;
                        else
                            vm.followed = false

                        if (vm.followed) {
                            $("#followBtn").addClass("btn-danger");
                            vm.followStatus = "Unfollow";
                        }
                        else {
                            $("#followBtn").addClass("btn-success");
                            vm.followStatus = "Follow";
                        }
                    });

            }


        }

        init();

        function followUser(usertofollow) {
            vm.uid=$rootScope.user._id;

            if(!vm.followed) {
                userProfileService
                    .followUser(vm.uid,usertofollow)
                    .then(function (followed) {
                        vm.followed=true;
                        console.log("followed");
                        $("#followBtn").removeClass("btn-success");
                        $("#followBtn").addClass("btn-danger");
                        vm.followStatus = "Unfollow";
                        vm.followed = true;
                    });
            }
            else {
                userProfileService
                    .unfollowUser(vm.uid,usertofollow)
                    .then(function (followed) {
                        vm.followed=true;
                        console.log("followed");
                        $("#followBtn").removeClass("btn-danger");
                        $("#followBtn").addClass("btn-success");
                        vm.followStatus = "Follow";
                        vm.followed = false;
                    });
            }


        }
        function updateStatus() {
            console.log("updating..");
            OrderService
                .findActiveOrdersForOrderer(vm.uid)
                .success(function (orders) {
                    vm.orders = orders;
                });
        }

        function updateCurrentSelection(cs) {
            vm.currentSelection = cs;

            if (cs == 'comments')
            {
                userProfileService
                    .findUserComments(vm.uid)
                    .then(function (comments) {
                        vm.comments = comments;
                        console.log(comments);
                    });
            }
            else if(cs == 'orderhistory')
            {
                userProfileService
                    .findoldorder(vm.uid)
                    .then(function (orders) {
                        vm.oldorders = orders;
                        console.log("pp ");
                        console.log(orders);
                    });

            }
        }



    }
})();