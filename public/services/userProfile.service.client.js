(function () {
    angular
        .module("Oota")
        .factory("userProfileService",userProfileService);

    function userProfileService($http) {

        var api={
            "findUserComments":findUserComments,
            "findUserDetails":findUserDetails,
            "findoldorder":findoldorder,
            "createUserComment":createUserComment,
            "updateUser":updateUser,
            "followUser":followUser,
            "unfollowUser":unfollowUser,
            "alreadyfollowing":alreadyfollowing
        };
        return api;

        function alreadyfollowing(uid,usertofollow) {
            var obj=[{user_id:uid,usertofollow:usertofollow}];
            return $http.put("/already-following",obj);
        }

        function followUser(uid,usertofollow) {
            // var uid="58e6e0f7bff60421039c4c9f";
            // var usertofollow="";
            var obj=[{user_id:uid,usertofollow:usertofollow}];
            return $http.put("/follow-user",obj);
        }


        function unfollowUser(uid,usertofollow) {
            // var uid="58e6e0f7bff60421039c4c9f";
            // var usertofollow="";
            var obj=[{user_id:uid,usertofollow:usertofollow}];
            return $http.put("/unfollow-user",obj);

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
        function updateUser(userId,user) {
            return $http.put("/update-user/"+userId,user);

        }


    };
})();