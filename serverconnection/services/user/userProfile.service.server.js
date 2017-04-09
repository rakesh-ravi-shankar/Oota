module.exports=function(app){

    var userCommentModel =require("../../model/user/userComment.model.server");
    var userModel =require("../../model/user/user.model.server");
    var orderModel =require("../../model/order/order.model.server");

    app.get("/usercomments",findUserComments);
    app.post("/create-comment",createUserComment);
    app.get("/userdetails",findUserDetails);
    app.get("/order-history",findoldorders);
    app.put("/update-user/:uid",updateUser);
    app.put("/follow-user",followUser)
    app.put("/unfollow-user",unfollowUser)
    app.put("/already-following",alreadyFollowing)
    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'user_profile_pic_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {

        var myFile = req.file;
        if (myFile) {
            var destination = myFile.destination; // folder where file is saved to
            var url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;



            var userid="58e6df044d23541bfe8b35d6";
            userModel
                .findUserById(userid)
                .then(function (user) {
                    user.profilepicurl=url;
                    userModel
                        .updateUser(user,userid)
                        .then(function (user) {
                            res.redirect("/#/editProfile");// res.json(user);
                        }, function (error) {
                            res.sendStatus(500).send(error);
                        });
                    //res.json(user);
                }, function (error) {
                    res.sendStatus(500).send(error);
                });

        }
    }

    function alreadyFollowing(req,res) {
        var obj=req.body;
        userModel
            .alreadyFollowing(obj)
            .then(function (user) {
                console.log(user);
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }
    function followUser(req,res) {
        var obj=req.body;
        userModel
            .followUser(obj)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }
    function unfollowUser(req,res) {
        var obj=req.body;
        userModel
            .unfollowUser(obj)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }
    function updateUser(req,res) {
        var userId=req.params.uid;
        var user=req.body;
        userModel
            .updateUser(user,userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

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

    function findUserDetails(req,res) {
        var userid="58e6df044d23541bfe8b35d6";
        userModel
            .findUserById(userid)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }


};