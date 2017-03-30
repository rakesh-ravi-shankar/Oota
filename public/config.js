(function(){

	angular
		.module("Oota")
		.config(configuration);

	function configuration($routeProvider) {
		$routeProvider
            .when("/login", {
                templateUrl: 'views/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/registerUser", {
                templateUrl: 'views/registerUser.view.client.html',
                controller: 'RegisterUserController',
                controllerAs: 'model'
            })
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