var mongoose=require("mongoose");

var userSchema= mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    dateofbirth:Date,
    registerationDate:{type: Date, default: Date.now},
    foodOrdered:[{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}],
    foodDelivered:[{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}]
},{collection:'user.project.collection'});



module.exports=userSchema;