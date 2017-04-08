module.exports=function(app){

    var userCommentModel =require("../../model/user/userComment.model.server");
    var userModel =require("../../model/user/user.model.server");
    var orderModel =require("../../model/order/order.model.server");

    app.get("/usercomments",findUserComments);
    app.post("/create-comment",createUserComment);
    app.get("/userdetails",findUserDetails);
    app.get("/order-history",findoldorders);

    function findoldorders(req,res) {

        console.log("hi");
        var userid="58e049bb363adf1ebba05706";
        var status="DELIVERED";
        orderModel
            .findOrderByUserIdAndStatus(userid,status)
            .then(function (orders){
                console.log(orders);
                res.json(orders);

            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }


    function createUserComment(req, res) {
        var comment = req.body;
        userCommentModel
            .createUserComment(comment)
            .then(function (comm) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(500).send(err);
            })
    }


    function findUserComments(req,res) {
        var uid="58e7a533c3e90d03cad0203b";
        userCommentModel
            .findUserComments(uid)
            .then(function (comments) {
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