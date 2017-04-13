/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("MenuListController", MenuListController);


    function MenuListController($routeParams,$http, RestaurantListService, $location, localStorageService, UserService, $rootScope) {
        var vm = this;
        vm.updateOrder = updateOrder;
        vm.checkout = checkout;
        vm.initializeCount = initializeCount;
        vm.loginUser = loginUser;
        vm.registerUser = registerUser;
        vm.closeModal=closeModal;
        vm.setCategory = setCategory;
        vm.logout = logout;
        vm.login = loginUser;
        vm.loginClick=loginClick;

        function init() {

            $http.get('/api/loggedin').success(function(user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.user = user;
                } else {
                    console.log("Dont come here!!!");
                }
            });

            if($rootScope.user != null){
                vm.user=$rootScope.user;
            }

            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();

            vm.restaurantId = $routeParams['resid'];
            vm.userId = $routeParams['uid'];
            var res = $routeParams['resid'];

            RestaurantListService
                .searchMenu(res)
                .then(function (menu) {
                    vm.menu=menu;
                    vm.selectedCategory = menu.data[0];
                        });

            vm.res_details = RestaurantListService.getResDetails();
            if (vm.res_details != undefined)
            {
                localStorageService.set("restaurantName", vm.res_details.name);
                var restaurantAddress = vm.res_details.streetAddress + ", " + vm.res_details.city + ", " + vm.res_details.state;
                localStorageService.set("pickupLoc", restaurantAddress);
            }

            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        }
        init();


        function setCategory(category) {
            vm.selectedCategory = category;
        }


        function closeModal() {
            $("#validateUserModal").modal("hide");
            return;
        }

        function updateOrder(count, dish, price)
        {
            if (count < 0)
            {
                localStorageService.remove(dish);
                return 0;
            }
            if (localStorageService.get(dish) == null)
            {
                localStorageService.set(dish, {"price": price, "count": count});
            }
            else
            {
                localStorageService.set(dish, {"price": price, "count": count});
            }
            return count;
        }


        function initializeCount(dish)
        {
            if (localStorageService.get(dish) == null)
            {
                return 0;
            }
            else {
                return localStorageService.get(dish).count;
            }
        }


        function loginUser(user)
        {

            UserService
                .findUserByCredentials(user)
                .success(function (loggedUser) {
                    console.log(loggedUser);
                    if(loggedUser)
                    {
                        console.log(loggedUser);
                        $("#validateUserModal").modal("hide");
                        $("body").removeClass("modal-open");
                        $(".modal-backdrop").remove();
                        $rootScope.user = loggedUser;
                        init();
                        // $location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu");
                    }
                    else
                    {
                        vm.error="user not found";
                    }
            });
        }


        function registerUser(user) {

            UserService.findUserByUsername(user.username)
                .success(function (u) {
                    if(u.length == 0)
                    {
                        vm.message="User name NOT taken!";
                        UserService.createUser(user)
                            .success(function (user) {
                                if (user) {
                                    $("#validateUserModal").modal("hide");
                                    $("body").removeClass("modal-open");
                                    $(".modal-backdrop").remove();
                                    $rootScope.user = user;
                                    $location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/order");

                                    vm.message = "User created successfully";
                                }
                                 else
                                    vm.error = "User not created successfully!"
                            });
                    }
                    else {
                        vm.message="User name already taken!";
                        console.log("EXISTS")
                    }


                })
                .error(function (err) {
                    vm.message="User name NOT taken!";
                    UserService.createUser(user)
                        .success(function (user) {
                            if (user) {
                                $("#validateUserModal").modal("hide");
                                $("body").removeClass("modal-open");
                                $(".modal-backdrop").remove();
                                $rootScope.user = user;
                                $location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/order");

                                vm.message = "User created successfully";
                            }
                            else
                                vm.error = "User not created successfully!"
                        });

                });



        }


        function checkout()
        {
            console.log("checkout");
            //$("#validateUserModal").modal({backdrop: 'static', keyboard: true});
            if($rootScope.user == null){
                $("#validateUserModal").modal("show");
            }
            else{
                console.log($rootScope.user);
                $location.url("/restaurantList/" + vm.restaurantId + "/restaurantMenu/order");
            }
        }
        function logout() {
            UserService
                .logout()
                .success(function () {
                    console.log("User logged out");
                    $rootScope.user = null;
                    vm.user = null;
                });
        }

        function loginClick()
        {
            $("#validateUserModal").modal("show");
        }



    }
})();