/**
 * Created by Rakesh on 4/8/17.
 */
module.exports=function(app) {

    var RestaurantReviewModel = require("../../model/restaurant/restaurantReview.model.server");

    app.post("/api/create-review", createReview);
    app.get("/api/find-reviews/:apiKey", findAllReviews);


    function createReview(req, res) {
        var review = req.body;
        RestaurantReviewModel
            .createReview(review)
            .then(function(newReview) {
                res.json(newReview);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findAllReviews(req, res) {
        var key = req.params['apiKey'];
        RestaurantReviewModel
            .findAllReviews(key)
            .then(function(reviews) {
                res.json(reviews);
            }, function (error)  {
                res.sendStatus(500).send(error);
            })
    }



};