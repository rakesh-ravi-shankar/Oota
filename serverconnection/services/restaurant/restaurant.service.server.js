module.exports=function(app){

    var restaurantModel =require("../../model/restaurant/restaurant.model.server");

    app.get("/api/restaurant",findRestaurant);
    app.post("/api/restaurant",createRestaurant);
    app.get("/api/restaurant/:uid",findRestaurantById);
    app.post("/api/updaterestaurant/",updateRestaurant);
    app.delete("/api/restaurant/:apiKey",deleteRestaurant);
    app.get("/api/allRestaurants",findAllRestaurants);
    app.get("/api/restaurantDashboard/:apiKey", findRestaurantByApiKey);


    function createRestaurant(req,res) {
        console.log("creaate")
        var newRestaurant = req.body;

        restaurantModel
            .createRestaurant(newRestaurant)
            .then(function(restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function findRestaurantById(req,res) {
        var restaurantId=req.params.uid;
        restaurantModel
            .findRestaurantById(restaurantId)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findRestaurantByApiKey(req, res) {
        var apiKey = req.params.apiKey;
        restaurantModel
            .findRestaurantByApiKey(apiKey)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findRestaurant(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];
        // console.log(req);
        // console.log(password);
        if(username&&password)
        {
            findRestaurantByCredentials(req,res);

        }
        else if(username)
        {findRestaurantByUsername(req,res);}

    }

    function findRestaurantByUsername(req,res) {
        var username=req.query['username'];


        restaurantModel
            .findRestaurantByUsername(username)
            .then(function (restaurant) {
                res.json(restaurant);

            }, function (error) {

                res.sendStatus(500).send(error);
            });


    }

    function findRestaurantByCredentials(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];



        restaurantModel
            .findRestaurantByCredentials(username,password)
            .then(function (restaurant) {
                if(restaurant.length==0)
                {
                    res.sendStatus(500).send(error);
                }

                res.json(restaurant);

            }, function (error) {

                res.sendStatus(500).send(error);
            });
    }




    function updateRestaurant(req,res) {
        var restaurant=req.body;
        restaurantModel
            .updateRestaurant(restaurant,restaurant._id)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function findAllRestaurants(req,res) {
        restaurantModel
            .findAllRestaurants()
            .then(function (restaurants) {
                res.json(restaurants);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }



    function deleteRestaurant(req,res) {
        var restaurantId=req.params.apiKey;

        restaurantModel
            .deleteRestaurant(restaurantId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });



    }
};