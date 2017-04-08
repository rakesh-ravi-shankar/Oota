(function () {
    angular
        .module("Oota")
        .factory("userProfileService",userProfileService);

    function userProfileService($http) {

        var api={
            "findUserComments":findUserComments,
            "findUserDetails":findUserDetails,
            "findoldorder":findoldorder,
            "createUserComment":createUserComment
        };
        return api;

        function createUserComment(comment) {
            return $http.post("/create-comment", comment);
        }

        function findUserComments(user) {
            return $http.get("/usercomments",user);
        }

        function findUserDetails(user) {
            return $http.get("/userdetails",user);
        }
        function findoldorder(user) {
            return $http.get("/order-history",user);

        }



    };
})();