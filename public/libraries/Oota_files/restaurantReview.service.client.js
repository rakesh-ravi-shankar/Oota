(function () {
    angular
        .module("Oota")
        .factory("RestaurantReviewService",RestaurantReviewService);

    function RestaurantReviewService($http) {


        var api = {
            "createReview": createReview,
           "findAllReviews":findAllReviews
        };
        return api;


        function createReview(review) {
            return $http.post("/api/create-review",review);
        }

        function findAllReviews(apiKey) {
            return $http.get("/api/find-reviews/"+apiKey);
        }


    }
})();/**
 * Created by Rakesh on 4/8/17.
 */
