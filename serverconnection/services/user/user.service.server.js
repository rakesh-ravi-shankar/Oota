module.exports=function(app){

    var userModel =require("../../model/user/user.model.server");

    app.get("/api/user",findUser);
    app.post("/api/user",createUser);
    // app.get("/api/user/:uid",findUserById);
    // app.put("/api/user/:uid",updateUser);
    // app.delete("/api/user/:uid",deleteUser);


    function createUser(req,res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

}

    function findUserById(req,res) {
        var userId=req.params.uid;
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }

    function findUser(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];
        if(username&&password)
        {
            findUserByCredentials(req,res);

        }
        else if(username)
        {findUserByUsername(req,res);}

    }

    function findUserByUsername(req,res) {
        var username=req.query['username'];


        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);

            }, function (error) {

                res.sendStatus(500).send(error);
            });


    }

    function findUserByCredentials(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];


        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                if(user.length==0)
                { res.json();
                }

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

    function deleteUser(req,res) {
        var userId=req.params.uid;

        userModel
            .deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });



    }
};