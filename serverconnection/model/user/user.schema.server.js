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
    profilepicurl:{type:String,default:"../../uploads/default.png"},
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

userSchema.post('remove',function () {
    var orderModel = require("../../model/order/order.model.server");
    var userModel = require("../../model/user/user.model.server");
    var restaurantReviewModel = require("../../model/restaurant/restaurantReview.model.server");
    var user=this;

    orderModel
        .deleteOrder({$in: [user.foodDelivered + user.foodOrdered]})
        .exec();


    restaurantReviewModel
        .find()
        .success(function (res) {
            for(i in res) {
                for (j in res[i]._users) {
                    if(user._id == res[i]._users[j]) {
                        res[i]._users.splice(i, 1);
                        res[i].save();
                    }
                }
            }
        });


    userModel
        .findUserById({$in: user.followers})
        .success(function (follower) {
            for(i in follower.following) {
                if (user._id == follower.following[i])
                {
                    follower.following.splice(i, 1);
                    follower.save();
                }
            }
        })



});




module.exports=userSchema;