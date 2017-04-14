/**
 * Created by Rakesh on 4/8/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var restaurantReviewSchema =require("./restaurantReview.schema.server");
var RestaurantReviewModel=mongoose.model("RestaurantReviewModel",restaurantReviewSchema);

RestaurantReviewModel.findAllReviews=findAllReviews;
RestaurantReviewModel.createReview=createReview;
RestaurantReviewModel.deleteReview=deleteReview;



module.exports=RestaurantReviewModel;


function createReview(review) {
    var deffered = q.defer();


    RestaurantReviewModel
        .findOne({apiKey: review.apiKey}, function(err, restaurantReview) {
            if (err) {
                deffered.reject(err);
            }
            else {
                if (restaurantReview != null){
                    console.log("Build review");
                    console.log(restaurantReview);
                    restaurantReview._users.push(review._user);
                    restaurantReview.reviews.push(review.review);
                    restaurantReview.dateCreated.push(review.dateCreated);
                    restaurantReview
                        .save()
                        .then(function () {
                            deffered.resolve();
                        })
                }
                else
                {
                    RestaurantReviewModel
                        .create({apiKey: review.apiKey,
                                _users:[review._user],
                                reviews:[review.review],
                                dateCreated:[review.dateCreated]}, function(err, newReview) {
                            if (err){
                                deffered.reject(err);
                            }
                            else{
                                deffered.resolve(newReview)
                            }
                        });
                }

            }
        });


    return deffered.promise;
}


function findAllReviews(key) {
    var deffered = q.defer();

    RestaurantReviewModel
        .findOne({apiKey:key}, function(err, reviews) {
            if(err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve(reviews);
            }
        });

    return deffered.promise;
}

function deleteReview(key) {
    var deffered = q.defer();

    RestaurantReviewModel
        .findByIdAndRemove({apiKey:key}, function(err) {
            if(err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve();
            }
        });
}

