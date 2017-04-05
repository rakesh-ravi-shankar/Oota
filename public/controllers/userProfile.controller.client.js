(function() {
    angular
        .module("Oota")
        .controller("userProfileController", userProfileController);

    function userProfileController(userProfileService) {
        var vm = this;
        vm.updateCurrentSelection=updateCurrentSelection;

        vm.uid="58d87928a9496419054fa46a"
        function updateCurrentSelection(cs) {

           vm.currentSelection=cs;

           if(cs=='comments')
           userProfileService
               .findUserComments(vm.uid)
               .then(function (comments) {
                   vm.comments=comments;
                   console.log(comments);
               });

        }



    }
})();