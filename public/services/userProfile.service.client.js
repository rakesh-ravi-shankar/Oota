(function () {
    angular
        .module("Oota")
        .factory("userProfileService",userProfileService);

    function userProfileService($http) {

        var api={
            "findUserComments":findUserComments,
            "findUserDetails":findUserDetails
        };
        return api;

        function findUserComments(user) {
            return $http.get("/usercomments",user);
        }

        function findUserDetails(user) {
            return $http.get("/userdetails",user);
        }



    };
})();