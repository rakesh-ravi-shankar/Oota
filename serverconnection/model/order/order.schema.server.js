var mongoose=require("mongoose");

var orderSchema= mongoose.Schema({
    apiKey:String,
    _orderer:{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    restaurantName:String,
    orderTime:{type: Date, default: Date.now},
    deliveryTime:Date,
    _deliverer:{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    deliveryLoc:String,
    pickupLoc:String,
    deliveryStatus:{type: String, enum: ['ORDERED','SELECTED_FOR_DELIVERY','PICKED_ORDER','CANCELLED','DELIVERED'],default:'ORDERED'},
    items:[{type:String}],
    prices:[{type:Number}],
    qty:[{type:Number}]
},{collection:'order.project.collection'});


orderSchema.post("remove", function(order) {
    var userModel =require("../../model/user/user.model.server");
    var userCommentModel =require("../../model/user/userComment.model.server");

    userModel
        .findById({$in: [order._orderer, order._deliverer]})
        .then(function(err, user) {
            var len1 = user.foodOrdered.length;
            while(len1--){
                if (user.foodOrdered[len1].toString() === order._id.toString())
                {
                    user.foodOrdered.splice(len1, 1);
                }
            }

            var len2 = user.foodDelivered.length;
            while(len2--){
                if (user.foodDelivered[len2].toString() === order._id.toString())
                {
                    user.foodDelivered.splice(len2, 1);
                }
            }

            user.save();
        });

    userCommentModel.remove({order_id:order._id}).exec();

});



module.exports=orderSchema;