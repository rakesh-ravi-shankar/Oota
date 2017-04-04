var mongoose=require("mongoose");

var orderSchema= mongoose.Schema({
    _orderer:{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    restaurantName:String,
    orderTime:Date,
    deliveryTime:Date,
    _deliverer:{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
    deliveryLoc:String,
    pickupLoc:String,
    deliveryStatus:{type: String, enum: ['ORDERED','INCART','CANCELLED','DELIVERED']},
    items:[{type:String}],
    prices:[{type:Number}]
},{collection:'order.project.collection'});



module.exports=orderSchema;