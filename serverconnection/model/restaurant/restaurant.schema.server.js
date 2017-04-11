var mongoose=require("mongoose");


var restaurantSchema= mongoose.Schema({
    username:String,
    password:String,
    restaurantName:String,
    address:String,
    pincode:Number,
    apiKey:String,
    startTime:Number,
    closeTime:Number,
    phone:String,
    email:String,
    registerationDate:{type: Date, default: Date.now},
    acceptsCard:Boolean,
    acceptsCash:Boolean,
    logoUrl:String,
    url:String,
    offersPickup:Boolean
},{collection:'restaurant.project.collection'});



module.exports=restaurantSchema;