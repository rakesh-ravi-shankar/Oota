(function () {
    angular
        .module("Oota")
        .controller("AdminController", AdminController);

    function AdminController($http, UserService, OrderService, RestaurantService, $rootScope, $location) {
        var vm = this;
        vm.updateCurrentSelection = updateCurrentSelection;
        vm.loginUser = loginUser;
        vm.logout = logout;
        vm.users = [];
        vm.orders = [];
        vm.restaurants = [];


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


                } else {
                    console.log("Dont come here!!!");
                }
            });

            /*
             vm.user = $rootScope.user;
             vm.currentSelection="users";
             UserService
             .findAllUsers()
             .success(function (users) {
             vm.users = users;
             });
             console.log(vm.users);
             /*
             OrderService
             .findActiveOrdersForOrderer(vm.uid)
             .success(function (orders) {
             vm.orders = orders;
             }); */
            //window.setInterval(updateStatus, 5000);


        }

        init();

        /*
         function updateStatus() {
         console.log("updating..");
         OrderService
         .findActiveOrdersForOrderer(vm.uid)
         .success(function (orders) {
         vm.users = orders;
         });
         }
         */
        function updateCurrentSelection(cs) {
            vm.currentSelection = cs;

            if (cs == 'orders') {
                OrderService
                    .findAllOrders()
                    .success(function (orders) {
                        vm.orders = orders;
                    });
            }
            else if (cs == 'restaurants') {
                RestaurantService
                    .findAllRestaurants()
                    .success(function (restaurants) {
                        vm.restaurants = restaurants;
                    });
            }
            else if (cs == 'users') {
                UserService
                    .findAllUsers()
                    .success(function (users) {
                        vm.users = users;
                    });
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
                            vm.error = "You are not God!! Use God Credentials";
                        }


                    }
                    else {
                        vm.error = "You are not God!! Use God Credentials";
                    }
                })
                .error(function () {
                    vm.error = "You are not God!! Use God Credentials";
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


    }
})();