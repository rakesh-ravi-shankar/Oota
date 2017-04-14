/**
 * Created by Nadagoud on 4/5/2017.
 */
module.exports=function(app){

    var orderModel =require("../../model/order/order.model.server");
    var userModel =require("../../model/user/user.model.server");

    app.post("/api/order",createOrder);
    app.get("/api/order/:oid",findOrderById);
    app.get("/api/order/orderer/:uid",findActiveOrdersForOrderer);
    app.get("/api/order/activeOrders",findActiveOrders);
    app.get("/api/allOrders",findAllOrders);
    app.get("/api/allOrders/:apiKey",findAllOrdersForRestaurant);
    app.post("/api/order/updateOrder",updateOrder);
    app.delete("/api/order/:orderId",deleteOrder);

    // app.get("/api/restaurant/:uid",findRestaurantById);
    // app.put("/api/restaurant/:uid",updateRestaurant);
    // app.delete("/api/restaurant/:uid",deleteRestaurant);


    function createOrder(req,res) {
        console.log("create");
        var newOrder = req.body;
        orderModel
            .createOrder(newOrder)
            .then(function(order) {
                console.log("createOrder"+order);
                userModel.
                addOrderToOrderer(order._orderer,order._id)
                    .then(function(user) {
                        res.json(order);
                    },function (error) {
                        res.sendStatus(500).send(error);
                    });
            },function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findOrderById(req,res) {
        var orderId=req.params.oid;
        orderModel
            .findOrderById(orderId)
            .then(function (order) {
                res.json(order);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }

    function findActiveOrdersForOrderer(req,res) {

        var userId=req.params.uid;
        orderModel
            .findOrderByUserId(userId)
            .then(function (activeOrders) {
                res.json(activeOrders);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }

    function findActiveOrders(req,res) {

        orderModel
            .findActiveOrders()
            .then(function (activeOrders) {
                res.json(activeOrders);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }
    function findAllOrders(req,res) {

        orderModel
            .findAllOrders()
            .then(function (orders) {
                res.json(orders);
            }, function (error) {
                res.sendStatus(500).send(error);
            });


    }

    function findAllOrdersForRestaurant(req, res) {
        var apiKey = req.params.apiKey;
        orderModel
            .findAllOrdersForRestaurant(apiKey)
            .then(function (orders) {
                res.json(orders);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }




    function updateOrder(req,res) {
        var order=req.body;
        orderModel
            .updateOrder(order)
            .then(function (order) {
                res.json(order);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }


    function deleteOrder(req,res) {
        var orderId = req.params.orderId;
        orderModel
            .deleteOrder(orderId)
            .then(function() {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    /*
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