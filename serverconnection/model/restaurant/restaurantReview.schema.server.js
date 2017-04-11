/**
 * Created by Rakesh on 4/8/17.
 */
var mongoose=require("mongoose");

var restaurantReviewSchema= mongoose.Schema({
    apiKey:String,
    _users:[{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"}],
    reviews:[{type:String}],
    dateCreated:[{type:Date, default: Date.now}]
},{collection:'restaurantReview.project.collection'});



module.exports=restaurantReviewSchema;