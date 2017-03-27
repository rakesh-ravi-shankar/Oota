module.exports=function(app){
    var userModel=require("./model/user/user.model.server");
    var registerModel=require("./model/restaurant/restaurant.model.server.js");


    require("./services/user/user.service.server")(app);
    require("./services/restaurant/restaurant.service.server")(app);


}