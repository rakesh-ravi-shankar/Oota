/**
 * Created by Nadagoud on 4/5/2017.
 */
module.exports=function(app){

    var orderModel =require("../../model/order/order.model.server");

    //app.get("/api/order",findRestaurant);
    app.post("/api/order",createOrder);
    // app.get("/api/restaurant/:uid",findRestaurantById);
    // app.put("/api/restaurant/:uid",updateRestaurant);
    // app.delete("/api/restaurant/:uid",deleteRestaurant);


    function createOrder(req,res) {
        console.log("create")
        var newOrder = req.body;
        orderModel
            .createOrder(newOrder)
            .then(function(order) {
                res.json(order);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }
/*
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

    function findRestaurant(req,res) {

        var username=req.query['username'];
        var password=req.query['password'];
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
                { res.json();
                }

                res.json(restaurant);

            }, function (error) {

                res.sendStatus(500).send(error);
            });
    }




    function updateRestaurant(req,res) {
        var restaurantId=req.params.uid;
        var restaurant=req.body;
        restaurantModel
            .updateRestaurant(restaurant,restaurantId)
            .then(function (restaurant) {
                res.json(restaurant);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function deleteRestaurant(req,res) {
        var restaurantId=req.params.uid;

        restaurantModel
            .deleteRestaurant(restaurantId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });



    }
 */
};