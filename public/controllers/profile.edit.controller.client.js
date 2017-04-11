(function() {
    angular
        .module("Oota")
        .controller("editProfileController", editProfileController);

    function editProfileController(userProfileService,$rootScope) {
        var vm = this;
        vm.updateUser=updateUser;

        function init() {
            var user_id=$rootScope.user._id;
            console.log("monica"+user_id);
            userProfileService
                .findUserDetails(user_id)
                .success(function (user) {
                    vm.user=user;

                });

            vm.user_id=user_id;
            vm.uploadURL = '/api/' + vm.user_id + "/upload";

        }
        init();






        function updateUser(newUser) {

            userProfileService
                .updateUser(user_id,newUser)
                .success(function (user) {
                    if(user!=null)
                    {vm.message="user successfully updated";}
                    else
                    {vm.error="unable to update user";}

                });

        }



    }
})();