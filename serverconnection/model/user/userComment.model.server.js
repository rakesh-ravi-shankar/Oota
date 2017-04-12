/**
 * Created by monica on 3/20/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var userCommentSchema =require("./userComment.schema.server");
var userCommentModel=mongoose.model("UserCommentModel",userCommentSchema);


userCommentModel.findUserComments=findUserComments;
userCommentModel.createUserComment = createUserComment;
userCommentModel.deleteUserComment = deleteSingleComment;
userCommentModel.updateComment = updateComment;

module.exports=userCommentModel;


function createUserComment(comment) {
    var deffered = q.defer();

    userCommentModel
        .create(comment, function (err, comm) {
            if(err) {
                deffered.reject(err);
            }
            else {
                deffered.resolve(comm);
            }
        });

    return deffered.promise;
}



// Find all mentions of userid
function findUserComments(userid) {
    var deffered =q.defer();

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
// Find all mentions of userid
function deleteSingleComment(commentId) {
    var deffered =q.defer();
    userCommentModel
        .findByIdAndRemove(commentId,function (err, comment) {
            if(err)
                deffered.reject(err);
            else {
                comment.remove()
                    .then(function () {
                        deffered.resolve();
                    });

            }
        });
    return deffered.promise;
}


function updateComment(commId,comment) {

    var deffered =q.defer();
    userCommentModel
        .update(
            {_id: commId},
            {$set: comment},function (err, comment) {
                if(err) {
                    deffered.reject(err);
                }
                else{
                    deffered.resolve(comment);
                }

            });

    return deffered.promise;

}