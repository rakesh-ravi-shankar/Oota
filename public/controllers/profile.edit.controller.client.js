(function() {
    angular
        .module("Oota")
        .controller("editProfileController", editProfileController);

    function editProfileController(UserService,userProfileService,$location,$rootScope,$http) {
        var vm = this;
        vm.updateUser=updateUser;
        vm.logout=logout;
        function init() {

            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.user = user;
                    userProfileService
                        .findUserDetails(user._id)
                        .success(function (user) {
                            vm.user=user;

                        });

                    //vm.user_id=user_id;
                    vm.uploadURL = '/api/' + user._id + "/upload";


                } else {
                    $location.url("/homePage");
                }
            });

            if($rootScope.user != null){
                vm.user_id=$rootScope.user._id;
            }


            //var user_id=$rootScope.user._id;

        }
        init();


        function logout() {
            UserService
                .logout()
                .success(function () {

                    console.log("User logged out");
                    $rootScope.user = null;
                    vm.user = null;
                    $location.url("/homePage");
                });
        }



        function updateUser(newUser) {

            userProfileService
                .updateUser($rootScope.user._id,newUser)
                .success(function (user) {
                    if(user!=null)
                    {vm.message="user successfully updated";}
                    else
                    {vm.error="unable to update user";}

                });

        }



    }
})();