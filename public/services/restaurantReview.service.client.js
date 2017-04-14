(function () {
    angular
        .module("Oota")
        .factory("RestaurantReviewService",RestaurantReviewService);

    function RestaurantReviewService($http) {


        var api = {
            "createReview": createReview,
            "findAllReviews":findAllReviews,
            "deleteReview":deleteReview
        };
        return api;


        function createReview(review) {
            return $http.post("/api/create-review",review);
        }

        function findAllReviews(apiKey) {
            return $http.get("/api/find-reviews/"+apiKey);
        }

        function deleteReview(apiKey) {
            return $http.delete("/api/delete-review/" + apiKey);
        }

    }
})();/**
 * Created by Rakesh on 4/8/17.
 */
