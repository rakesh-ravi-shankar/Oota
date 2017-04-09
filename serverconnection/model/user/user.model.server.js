/**
 * Created by monica on 3/20/17.
 */
var mongoose=require("mongoose");
var q=require("q");
var userSchema =require("./user.schema.server");
var userModel=mongoose.model("UserModel",userSchema);

userModel.findUserByUsername=findUserByUsername;
userModel.findUserByCredentials=findUserByCredentials;
userModel.findUserById=findUserById;
userModel.createUser =createUser;
userModel.addOrderToOrderer=addOrderToOrderer;
userModel.updateUser=updateUser;
userModel.findUserByGoogleId = findUserByGoogleId;
// userModel.deleteUser=deleteUser;


module.exports=userModel;
function findUserByGoogleId(googleId) {
    var deffered =q.defer();
    userModel
        .findOne({'google.id': googleId},function (err,user){
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(user);
            }

        });
    return deffered.promise;

}


function createUser(user) {
    var deffered =q.defer();
    userModel
        .create(user,function (err,user) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(user);
            }

        });
    return deffered.promise;
}

function findUserById(userId) {
    var deffered=q.defer();

    userModel
        .findById(userId,function (err,user) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(user);
            }

        });
    return deffered.promise;

}

function findUserByCredentials(username,password) {

    var deffered =q.defer();
    userModel
        .find({username: username , password:password},function (err,user) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                deffered.resolve(user[0]);

            }

        });
    return deffered.promise;
}

function findUserByUsername(username) {
    var deffered =q.defer();
    userModel
        .find({username: username },function (err,user) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve();
            }

        });
    return deffered.promise;

}

function updateUser(user,userId) {

    var deffered =q.defer();
    userModel
        .update(
            {_id: userId },
            {$set: user},function (err, user) {
                if(err) {
                    deffered.reject(err);
                }
                else{
                    console.log("yay");
                    deffered.resolve(user);
                }

            });

    return deffered.promise;

}

function deleteUser(userId) {

    var deffered = q.defer();
    userModel
        .findByIdAndRemove(userId, function (err, user) {
            if(err)
                deffered.reject(err);
            else {
                user.remove();
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

function addOrderToOrderer(userId, orderId){
    var deffered =q.defer();
    userModel
        .findById(userId,function (err,user) {
            if(err){
                deffered.abort(err);
            }
            else
            {
                user.foodOrdered.push(orderId);
                user.save();
                deffered.resolve(user);
            }
        });
    return deffered.promise;
}

