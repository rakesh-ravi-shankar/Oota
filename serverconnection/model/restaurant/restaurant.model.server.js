/**
 * Created by vinay on 3/20/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var restaurantSchema =require("./restaurant.schema.server.js");
var restaurantModel=mongoose.model("RestaurantModel",restaurantSchema);


restaurantModel.findRestaurantByUsername = findRestaurantByUsername;
restaurantModel.findRestaurantByCredentials = findRestaurantByCredentials;
restaurantModel.findRestaurantById = findRestaurantById;
restaurantModel.createRestaurant = createRestaurant;
restaurantModel.updateRestaurant=updateRestaurant;
restaurantModel.deleteRestaurant=deleteRestaurant;

module.exports=restaurantModel;

function createRestaurant(restaurant) {
    var deffered =q.defer();
    restaurantModel
        .create(restaurant,function (err,restaurant) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(restaurant);
            }

        });
    return deffered.promise;
}

function findRestaurantById(restaurantId) {
    var deffered=q.defer();
    restaurantModel
        .findById(restaurant,function (err,restaurant) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(restaurant);
            }



        });
    return deffered.promise;

}

function findRestaurantByCredentials(username,password) {

    var deffered =q.defer();
    restaurantModel
        .find({username: username , password:password},function (err,restaurant) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(restaurant);

            }

        });
    return deffered.promise;


}

function findRestaurantByUsername(username) {
    var deffered =q.defer();
    restaurantModel
        .find({userName: username },function (err,restaurant) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(restaurant);
            }

        });
    return deffered.promise;

}

function updateRestaurant(restaurant,restaurantId) {

    var deffered =q.defer();
    restaurantModel
        .update(
            {_id: restaurantId },
            {$set: restaurant},function (err, restaurant) {
                if(err) {
                    deffered.abort(err);
                }
                else{
                    deffered.resolve(restaurant);
                }

            });

    return deffered.promise;

}

function deleteRestaurant(restaurantId) {

    var deffered = q.defer();
    restaurantModel
        .findByIdAndRemove(restaurantId, function (err, restaurant) {
            if(err)
                deffered.reject(err);
            else {
                restaurant.remove();
                deffered.resolve(restaurant);
            }
        });
    return deffered.promise;


}

