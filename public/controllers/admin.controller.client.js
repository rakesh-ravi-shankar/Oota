(function () {
    angular
        .module("Oota")
        .controller("AdminController", AdminController);

    function AdminController($http, UserService, userProfileService, OrderService, RestaurantService, $rootScope, $location) {
        var vm = this;
        vm.updateCurrentSelection = updateCurrentSelection;
        vm.loginUser = loginUser;
        vm.logout = logout;
        vm.editProfile = editProfile;
        vm.editMyOrder = editMyOrder ;
        vm.editMyRestaurant = editMyRestaurant ;
        vm.updateUser = updateUser;
        vm.updateOrder = updateOrder;
        vm.updateRestaurant = updateRestaurant;
        vm.deleteUser=deleteUser;
        vm.deleteOrder=deleteOrder;
        vm.deleteRestaurant=deleteRestaurant;
        vm.findAllUsers=findAllUsers;
        vm.findAllOrders=findAllOrders;
        vm.findAllRestaurants=findAllRestaurants;
        vm.findAllComments=findAllComments;
        vm.createUserPage=createUserPage;
        vm.createUser=createUser;
        //vm.commentsPage=commentsPage;
        vm.deleteComment=deleteComment;
        vm.users = [];
        vm.orders = [];
        vm.restaurants = [];
        vm.comments=[];
        vm.uploadURL = "";
        vm.searchUser=searchUser;
        vm.searchOrder=searchOrder;
        vm.searchRestaurant=searchRestaurant;


        function init() {
            console.log("hello admin");
            $("#menu-toggle").click(function (e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });

            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.user = user;
                    vm.user=user;
                    if(vm.user.role != "ADMIN"){
                        logout();
                        $location.url("/adminLogin");
                    }
                    findAllUsers();
                    //updateCurrentSelection("users");

                } else {
                    $location.url("/adminLogin")
                }
            });

        }

        init();

        function updateCurrentSelection(cs) {
            vm.currentSelection = cs;
            vm.error="";
            vm.message="";
            if (cs == 'orders') {

            }
            else if (cs == 'restaurants') {

            }
            else if (cs == 'users') {

            }
            else if (cs == 'editUser') {
                //nothing to do
            }
            else if (cs == 'editOrder') {
                //nothing to do
            }
        }

        function loginUser(user) {
            //user.role="ADMIN";
            UserService
                .findUserByCredentials(user)
                .success(function (loggedUser) {
                    console.log(loggedUser);
                    if (loggedUser) {
                        console.log(loggedUser);

                        if (loggedUser.role == "ADMIN") {
                            $rootScope.user = loggedUser;
                            vm.user = $rootScope.user;
                            console.log("logged in user " + $rootScope.user);
                            vm.currentSelection = "users";
                            $location.url("/adminPage");
                        } else {
                            logout();
                            vm.error = "You are not Admin!! Use Admin Credentials";
                        }


                    }
                    else {
                        vm.error = "You are not Admin!! Use Admin Credentials";
                    }
                })
                .error(function () {
                    vm.error = "You are not Admin!! Use Admin Credentials";
                });
        }

        function logout() {
            UserService
                .logout()
                .success(function () {
                    console.log("User logged out");
                    $rootScope.user = null;
                    vm.user = null;
                    $location.url("/adminLogin");
                });
        }

        function editProfile(user) {
            UserService
                .findUserById(user._id)
                .success(function (user) {
                    vm.editUser = user;
                    console.log(user);
                    updateCurrentSelection("editUser");

                    //vm.user_id=user_id;
                    vm.uploadURL = '/api/' + user._id + "/upload";
                });

        }
        function editMyOrder(order) {
            OrderService
                .findOrderById(order._id)
                .success(function (order) {
                    vm.editOrder = order ;
                    console.log(order);
                    updateCurrentSelection("editOrder");

                });

        }
        function editMyRestaurant(rest) {
            RestaurantService
                .findRestaurantById(rest._id)
                .success(function (rest) {
                    vm.editRest = rest ;
                    console.log(rest);
                    updateCurrentSelection("editRestaurant");

                });

        }

        function updateUser(user) {

            userProfileService
                .updateUser(vm.editUser._id,user)
                .success(function (user) {
                    if(user!=null)
                    {vm.message="user successfully updated";
                        findAllUsers();}

                    else
                    {vm.error="unable to update user";}

                });

        }
        function updateOrder(order) {

            console.log(order);
            OrderService
                .updateOrder(order)
                .success(function (order) {
                    if(order!=null)
                    {vm.message="order successfully updated";
                        findAllOrders();}

                    else
                    {vm.error="unable to update order";}

                });

        }
        function updateRestaurant(rest) {

            console.log(rest);
            RestaurantService
                .updateRestaurant(rest)
                .success(function (rest) {
                    if(rest!=null)
                    {
                        console.log(rest);
                        vm.message="Restaurant successfully updated";
                        findAllRestaurants();}

                    else
                    {vm.error="unable to update Restaurant";}

                });

        }
        function deleteUser(uid) {
            console.log("delete user");
            UserService
                .deleteUser(uid)
                .success(function () {
                    console.log("delete user successful");
                    findAllUsers();
                });
        }
        function deleteOrder(oid) {
            console.log("delete order");
            OrderService
                .deleteOrder(oid)
                .success(function () {
                    console.log("delete order successful");
                    findAllOrders();
                });
        }

        function deleteRestaurant(rid){
            console.log("delete rest");
            RestaurantService
                .deleteRestaurant(rid)
                .success(function () {
                    console.log("delete rest successful");
                    findAllRestaurants();
                });

        }

        function deleteComment(cid){
            console.log("delete comment");
            userProfileService
                .deleteSingleComment(cid)
                .success(function () {
                    console.log("delete comment successful");
                    findAllComments();
                });

        }



        function searchUser(uid,uname) {
            if(uid){
                UserService
                    .findUserById(uid)
                    .success(function (user) {
                        vm.users= [user];
                        console.log(user);
                        updateCurrentSelection("users");
                    });
            }
            else if(uname){
                UserService
                    .findUserByUsername(uname)
                    .success(function (user) {
                        vm.users= [user];
                        console.log(user);
                        vm.error="";
                        updateCurrentSelection("users");
                    })
                    .error(function () {
                        vm.error="User not found";
                    });
            }

        }

        function searchOrder(oid) {
            if(oid){
                OrderService
                    .findOrderById(oid)
                    .success(function (order) {
                        vm.orders= [order];
                        console.log(order);
                        vm.error="";
                        updateCurrentSelection("orders");
                    })
                    .error(function () {
                        vm.error="Order Id not found";
                    });
            }

        }


        function searchRestaurant(rid) {
            if(rid){
                RestaurantService
                    .findRestaurantById(rid)
                    .success(function (rest) {
                        vm.restaurants= [rest];
                        console.log(rest);
                        vm.error="";
                        updateCurrentSelection("restaurants");
                    })
                    .error(function () {
                        vm.error="Restaurant Id not found";
                    });
            }

        }

        function findAllUsers() {
            UserService
                .findAllUsers()
                .success(function (users) {
                    vm.users = users;
                    for(var i = vm.users.length - 1; i >= 0; i--) {
                        if(vm.users[i].username === "admin") {
                            vm.users.splice(i, 1);
                            break;
                        }
                    }
                    //var index = vm.users.indexOf("admin");
                    updateCurrentSelection("users");
                });
        }
        function findAllOrders() {
            OrderService
                .findAllOrders()
                .success(function (orders) {
                    vm.orders = orders;
                    updateCurrentSelection("orders");
                });
        }


        function findAllComments(){
            userProfileService
                .findAllComments()
                .success(function (comments) {
                    vm.comments = comments;
                    updateCurrentSelection("commentsPage");
                });


        }

        function findAllRestaurants() {
            RestaurantService
                .findAllRestaurants()
                .success(function (restaurants) {
                    vm.restaurants = restaurants;
                    updateCurrentSelection("restaurants");
                });
        }
        function createUserPage() {
                    updateCurrentSelection("createUserPage");
        }
        function createUser(newUser) {
            UserService
                .createUser(newUser)
                .success(function (user) {
                    findAllUsers();
                });
        }



    }
})();