module.exports=function(app){
    var userModel=require("./model/user/user.model.server");


    require("./services/user/user.service.server")(app);


}