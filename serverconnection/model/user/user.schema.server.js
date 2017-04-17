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
    var userModel = require("../../model/user/user.model.server");
    var orderModel = require("../../model/order/order.model.server");
    var restaurantReviewModel = require("../../model/restaurant/restaurantReview.model.server");
    var user=this;


    var temp = user.foodOrdered.concat(user.foodDelivered);
    orderModel.remove({_id: {$in: temp}}).exec();


    restaurantReviewModel
        .find({},function (err, res) {
            for(k in res) {
                var temp = [];
                for (j in res[k]._users) {
                    if(user._id.toString() === res[k]._users[j].toString()) {
                        temp.push(j);
                    }
                }
                var len = res[k]._users.length;
                while(len--) {
                    if (temp.includes(len.toString())) {
                        res[k]._users.splice(len, 1);
                        res[k].reviews.splice(len, 1);
                        res[k].dateCreated.splice(len, 1);
                    }
                }
                res[k].save();
            }


        });


    userModel
        .find({"_id": {$in: user.followers}},  function (err, follower) {
        console.log("__________________");
        console.log(follower);
            for (k in follower) {
                follower[k].following.forEach(function (u) {
                    if (user._id.toString() === u.toString())
                    {
                        var i = follower[k].following.indexOf(u);
                        follower[k].following.splice(i, 1)
                    }
                });
                follower[k].followers.forEach(function (u) {
                    if (user._id.toString() === u.toString())
                    {
                        var i = follower[k].followers.indexOf(u);
                        follower[k].followers.splice(i, 1)
                    }
                });
                follower[k].save();
            }
        });



});




module.exports=userSchema;