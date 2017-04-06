(function() {
    angular
        .module("Oota")
        .controller("userProfileController", userProfileController);

    function userProfileController(userProfileService) {
        var vm = this;
        vm.updateCurrentSelection=updateCurrentSelection;

        vm.uid="58e049bb363adf1ebba05706"
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