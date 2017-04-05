/**
 * Created by monica on 3/20/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var userCommentSchema =require("./userComment.schema.server");
var userCommentModel=mongoose.model("UserCommentModel",userCommentSchema);


userCommentModel.findUserComments=findUserComments;
module.exports=userCommentModel;

function findUserComments(userid) {
    var deffered =q.defer();
    var feedback_reciever_id="58d87928a9496419054fa46a";
    var feedback_giver_id="58d87928a9496419054fa46a";
    userCommentModel
        .create({feedback_giver_id:feedback_reciever_id,feedback_giver_name:"MONICA",feedback_reciever_id:feedback_giver_id,comment:"YOU are awesome",order_id:"1"},function (err,user) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(user);
            }

        });
    userCommentModel
        .find({feedback_reciever_id:userid},function (err,comments) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(comments);
            }

        });
    return deffered.promise;
}

