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
            "alreadyfollowing":alreadyfollowing,
            "deleteSingleComment":deleteSingleComment,
            "findfollowers":findfollowers,
            "editUserComment":editUserComment
        };
        return api;

        function findfollowers(uid) {
            return $http.get("/followers/"+uid);

        }

        function alreadyfollowing(uid,usertofollow) {
            var obj=[{user_id:uid,usertofollow:usertofollow}];
            return $http.put("/already-following",obj);
        }

        function followUser(uid,usertofollow) {
            var obj=[{user_id:uid,usertofollow:usertofollow}];
            return $http.put("/follow-user",obj);
        }


        function unfollowUser(uid,usertofollow) {
            // var uid="58e6e0f7bff60421039c4c9f";
            // var usertofollow="";
            var obj=[{user_id:uid,usertofollow:usertofollow}];
            return $http.put("/unfollow-user",obj);

        };

        function createUserComment(comment) {
            return $http.post("/createcomment", comment);
        }
        //done

        function findUserComments(userId) {
            return $http.get("/"+userId+"/usercomments");
        }
//done
        function findUserDetails(userId) {
            return $http.get("/"+userId+"/userdetails");
        }
 //done       
        function findoldorder(userId) {
            return $http.get("/"+userId+"/orderhistory");

        }
        //done
        function updateUser(userId,user) {
            return $http.put("/"+userId+"/updateuser",user);

        }
        function deleteSingleComment(commId) {
            return $http.delete("/deleteUserComment/"+commId);
        }
        function editUserComment(commId,comment) {
            return $http.put("/editUserComment/"+commId,comment);
        }


    };
})();