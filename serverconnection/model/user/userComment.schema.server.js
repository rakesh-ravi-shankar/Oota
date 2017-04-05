var mongoose=require("mongoose");

var userCommentSchema= mongoose.Schema({
    feedback_giver_id:String,
    feedback_giver_name:String,
    feedback_reciever_id:String,
    comment:String,
    order_id:String

},{collection:'usercomments.project.collection'});



module.exports=userCommentSchema;