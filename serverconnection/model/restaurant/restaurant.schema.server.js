var mongoose=require("mongoose");


var restaurantSchema= mongoose.Schema({
    username:String,
    password:String,
    restaurantName:String,
    address2:String,
    pincode:Number,
    apiKey:String,
    startTime:Number,
    closeTime:Number,
    deliveryOption:Boolean,
    phone:String,
    email:String,
    registerationDate:{type: Date, default: Date.now}
},{collection:'restaurant.project.collection'});



module.exports=restaurantSchema;