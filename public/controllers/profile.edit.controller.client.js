(function() {
    angular
        .module("Oota")
        .controller("editProfileController", editProfileController);

    function editProfileController(userProfileService) {
        var vm = this;

        var user_id="58e6df044d23541bfe8b35d6";
        function init() {
            userProfileService
                .findUserDetails(user_id)
                .success(function (user) {
                    vm.user=user;

                });



        }
        init();
        vm.updateUser=updateUser;

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