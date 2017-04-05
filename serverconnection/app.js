module.exports=function(app){
    require("./services/user/user.service.server")(app);
    require("./services/restaurant/restaurant.service.server")(app);

    require("./services/order/order.service.server")(app);
    require("./services/user/userProfile.service.server")(app);


}