/**
 * Created by vinay on 3/20/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var orderSchema =require("./order.schema.server.js");
var orderModel=mongoose.model("OrderModel",orderSchema);


orderModel.findOrderById = findOrderById;
orderModel.findOrderByUserIdAndStatus = findOrderByUserIdAndStatus;
orderModel.createOrder = createOrder;

module.exports=orderModel;

function createOrder(order) {
    var deffered =q.defer();
    orderModel
        .create(order,function (err,order) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(order);
            }

        });
    return deffered.promise;
}


function findOrderById(orderId) {
    var deffered=q.defer();
    orderModel
        .findById(orderId,function (err,order) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(order);
            }



        });
    return deffered.promise;

}

function findOrderByUserIdAndStatus(userId,status) {

    var deffered =q.defer();
    orderModel
        .find({_user: userId , deliveryStatus:status},function (err,order) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(order);

            }

        });
    return deffered.promise;


}
/*
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

*/