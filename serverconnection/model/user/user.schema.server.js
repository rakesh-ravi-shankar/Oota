var mongoose=require("mongoose");

var userSchema= mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
    email:String,
    phone:String,
    role:{type: String, enum: ['NORMAL','ADMIN'],default:'NORMAL'},
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    dateofbirth:Date,
    profilepicurl:String,
    registerationDate:{type: Date, default: Date.now},
    foodOrdered:[{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}],
    foodDelivered:[{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}],
    google: {
        id: String,
        token: String
    },
    facebook: {
        id:    String,
        token: String
    }
},{collection:'user.project.collection'});




module.exports=userSchema;