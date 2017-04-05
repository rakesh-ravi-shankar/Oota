module.exports=function(app){

    var userCommentModel =require("../../model/user/userComment.model.server");
    var userModel =require("../../model/user/user.model.server");

    app.get("/usercomments",findUserComments);
    app.get("/userdetails",findUserDetails)



    function findUserComments(req,res) {

        var uid="58d87928a9496419054fa46a";
        userCommentModel
            .findUserComments(uid)
            .then(function (comments) {
                if(comments.length==0)
                { res.json();
                }

                res.json(comments);

            }, function (error) {

                res.sendStatus(500).send(error);
            });

    }

    function findUserDetails(userid) {
        userModel
            .findUserById(userid)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }


};