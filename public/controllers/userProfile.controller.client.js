(function() {
    angular
        .module("Oota")
        .controller("userProfileController", userProfileController);

    function userProfileController(userProfileService, UserService, OrderService, $rootScope) {
        var vm = this;
        vm.updateCurrentSelection=updateCurrentSelection;



        function init() {
            vm.uid=$rootScope.user._id;
            vm.currentSelection="trackorder";
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
        }

        init();


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