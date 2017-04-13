(function(){

	angular
		.module("Oota")
		.config(configuration);

	function configuration($routeProvider) {
		$routeProvider
            .when("/homepage", {
                templateUrl: 'views/homePage.view.client.html',
                controller: 'HomePageController',
                controllerAs: 'model'
            })
            .when("/restaurantList", {
                templateUrl: 'views/restaurantList.view.client.html',
                controller: 'RestaurantListController',
                controllerAs: 'model'
            })
            .when("/restaurantList/:resid/restaurantMenu", {
                templateUrl: 'views/menuList.view.client.html',
                controller: 'MenuListController',
                controllerAs: 'model'
            })
            .when("/restaurantList/:resid/restaurantMenu/order", {
                templateUrl: 'views/reviewOrders.view.client.html',
                controller: 'ReviewOrderController',
                controllerAs: 'model'
            })

            .when("/registerUser", {
                templateUrl: 'views/registerUser.view.client.html',
                controller: 'RegisterUserController',
                controllerAs: 'model'
            })

            .when("/registerrestaurant", {
                templateUrl: 'views/registerRestaurant.view.client.html',
                controller: 'RegisterRestaurantController',
                controllerAs: 'model'
            })
            .when("/deliver", {
                templateUrl: 'views/deliver.view.client.html',
                controller: 'DeliverController',
                controllerAs: 'model'
            })
            .when("/userProfile/:username", {
                templateUrl: 'views/userProfile.view.client.html',
                controller: 'userProfileController',
                controllerAs: 'model'
            })
            .when("/editProfile", {
                templateUrl: 'views/profile.edit.view.client.html',
                controller: 'editProfileController',
                controllerAs: 'model'
            })
            .when("/:resid/restaurantDetails", {
                templateUrl: 'views/restaurantDetails.view.client.html',
                controller: 'RestaurantDetailController',
                controllerAs: 'model'
            })
            .when("/:apiKey/restaurantDashboard", {
                templateUrl: 'views/restaurantDashboard.view.client.html',
                controller: 'RestaurantDashboardController',
                controllerAs: 'model'
            })
            .when("/delivererLogin", {
                templateUrl: 'views/deliverer.login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/adminPage", {
                templateUrl: 'views/adminPage.view.client.html',
                controller: 'AdminController',
                controllerAs: 'model'
            })

            .otherwise({
                 templateUrl: 'views/homePage.view.client.html',
                 controller: 'HomePageController',
                 controllerAs: 'model'
            })

	}

})();
