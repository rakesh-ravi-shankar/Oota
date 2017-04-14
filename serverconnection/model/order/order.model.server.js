/**
 * Created by vinay on 3/20/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var orderSchema =require("./order.schema.server.js");
var orderModel=mongoose.model("OrderModel",orderSchema);


orderModel.findOrderById = findOrderById;
orderModel.findOrderByUserIdAndStatus = findOrderByUserIdAndStatus;
orderModel.findActiveOrders = findActiveOrders;
orderModel.createOrder = createOrder;
orderModel.updateOrder = updateOrder;
orderModel.findOrderByUserId = findOrderByUserId;
orderModel.findAllOrders=findAllOrders;
orderModel.findAllOrdersForRestaurant = findAllOrdersForRestaurant;
orderModel.deleteOrder = deleteOrder;


module.exports=orderModel;

function createOrder(order) {
    var deffered =q.defer();
    orderModel
        .create(order,function (err,order) {
            if(err){
                deffered.reject(err);
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
                deffered.reject(err);
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
        .find({_orderer: userId , deliveryStatus:status},function (err,order) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(order);
            }

        });
    return deffered.promise;
}

function findOrderByUserId(userId) {
    var deffered =q.defer();
    orderModel
        .find({_orderer: userId},function (err,order) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(order);
            }

        });
    return deffered.promise;
}

function findActiveOrders() {
    var deffered =q.defer();
    orderModel
        .find({deliveryStatus:"ORDERED"},function (err,order) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(order);
            }
        });
    return deffered.promise;
}

function findAllOrders() {
    var deffered =q.defer();
    orderModel
        .find(function (err,orders) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(orders);
            }
        });
    return deffered.promise;
}

function findAllOrdersForRestaurant(ak) {
    var deffered =q.defer();
    orderModel
        .find({apiKey:ak}, function (err,orders) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(orders);
            }
        });
    return deffered.promise;
}

function updateOrder(order) {

    var deffered =q.defer();
    orderModel
        .update(
            {_id: order._id },
            order, function (err, order) {
                if(err) {
                    deffered.reject(err);
                }
                else{
                    deffered.resolve(order);
                }

            });

    return deffered.promise;

}


function deleteOrder(orderId) {
    var deffered = q.defer();
    orderModel
        .findByIdAndRemove(orderId, function(err, order) {
           if(err) {
               deffered.reject(err);
           }
           else {

               deffered.resolve();
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