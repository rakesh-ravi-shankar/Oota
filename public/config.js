(function(){

	angular
		.module("Oota")
		.config(configuration);

	function configuration($routeProvider) {
		$routeProvider
            .when("/homePage", {
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
            .when("/restaurantList/:resid/restaurantMenu/:uid/order", {
                templateUrl: 'views/reviewOrders.view.client.html',
                controller: 'ReviewOrderController',
                controllerAs: 'model'
            })
            // .when("/login", {
            //     templateUrl: 'views/login.view.client.html',
            //     controller: 'LoginController',
            //     controllerAs: 'model'
            // })
            // .when("/registerUser", {
            //     templateUrl: 'views/registerUser.view.client.html',
            //     controller: 'RegisterUserController',
            //     controllerAs: 'model'
            // })
            .when("/registerRestaurant", {
                templateUrl: 'views/registerRestaurant.view.client.html',
                controller: 'RegisterRestaurantController',
                controllerAs: 'model'
            })
            .when("/deliver", {
                templateUrl: 'views/deliver.view.client.html',
                controller: 'DeliverController',
                controllerAs: 'model'
            })
            .otherwise({
                templateUrl: 'views/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
	}

})();
