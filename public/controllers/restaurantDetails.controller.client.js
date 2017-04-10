/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("RestaurantDetailController", RestaurantDetailController);


    function RestaurantDetailController($routeParams, $window, $location, RestaurantReviewService, localStorageService, UserService) {
        var vm = this;
        vm.submitReview = submitReview;

        function init() {
            var restaurant = localStorageService.get("restaurant");
            // console.log(restaurant);
            vm.apiKey = restaurant.apiKey;
            vm.restaurantLogo = restaurant.logoUrl;
            vm.restaurantName = restaurant.name;
            vm.restaurantPhone = restaurant.phone;
            vm.restaurantAddress = restaurant.streetAddress + " " + restaurant.city + " " + restaurant.state;
            vm.allReviews = [];
            fetchAllReviews();
        }

        init();


        function fetchAllReviews() {
            vm.allReviews = [];
            RestaurantReviewService
                .findAllReviews(vm.apiKey)
                .success(function (allReviews) {
                    // for (i in allReviews._users)
                    // {
                    //     UserService
                    //         .findUserById(allReviews._users[i])
                    //         .success(function (user) {
                    //             console.log(allReviews.reviews[i]);
                    //             vm.allReviews.push({firstName: user.firstName, lastName: user.lastName, reviewText: allReviews.reviews[i], createdAt:allReviews.dateCreated[i]});
                    //         });
                    // }




                })
        }


        function submitReview(review) {
            RestaurantReviewService
                .createReview({apiKey:vm.apiKey, _user:"58e7a533c3e90d03cad0203b", review:review})
                .success(function(createdReview) {
                   console.log(createdReview);
                    $("#reviewTextArea").value = "";
                    fetchAllReviews();
                });


        }

    }
})();