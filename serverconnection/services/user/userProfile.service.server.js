module.exports=function(app){

    var userCommentModel =require("../../model/user/userComment.model.server");
    var userModel =require("../../model/user/user.model.server");
    var orderModel =require("../../model/order/order.model.server");

    app.get("/usercomments",findUserComments);
    app.get("/userdetails",findUserDetails);
    app.get("/order-history",findoldorders);
    app.put("/update-user/:uid",updateUser);


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