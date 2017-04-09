(function () {
    angular
        .module("Oota")
        .factory("UserService",userService);

    function userService($http) {


        var api={
            "createUser":createUser,
            "findUserById":findUserById,
            "findUserByUsername":findUserByUsername,
            "findUserByCredentials":findUserByCredentials,
            "findAllUsers":findAllUsers,
            "logout":logout
            // "updateUser":updateUser,
            // "deleteUser":deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/register",user);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);

        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);


        }
        function findAllUsers() {
            return $http.get("/api/allusers");
        }

        function findUserByCredentials(user) {

            var user = $http.post("/api/login",user);
            console.log("client : "+user);
            return user;
        }
        function logout(user) {

            return $http.post("/api/logout",user);

        }
        //
        // function updateUser(userId,user) {
        //     return $http.put("/api/user/"+userId, user);
        //
        // }
        //
        // function deleteUser(userId) {
        //     return $http.delete("/api/user/"+userId);
        //
        //
        // }



    };
})();