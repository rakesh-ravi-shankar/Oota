var mongoose=require("mongoose");

var userCommentSchema= mongoose.Schema({
    feedback_giver_id:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    feedback_giver_name:String,
    feedback_giver_username:String,
    feedback_reciever_id:{type:mongoose.Schema.Types.ObjectId, ref:"UserModel"},
    comment:String,
    order_id:{type: mongoose.Schema.Types.ObjectId, ref: 'OrderModel'}

},{collection:'usercomments.project.collection'});


module.exports=userCommentSchema;