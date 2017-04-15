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
userModel.findUserByFacebookId = findUserByFacebookId,
userModel.followUser=followUser;
userModel.alreadyFollowing=alreadyFollowing;
userModel.unfollowUser=unfollowUser;
userModel.findAllUsers=findAllUsers;
userModel.deleteUser=deleteUser;


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

function findUserByFacebookId(facebookId) {
    var deffered =q.defer();
    userModel
        .findOne({'facebook.id': facebookId},function (err,user){
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


function alreadyFollowing(userobj) {
    console.log(userobj);
    var deffered =q.defer();
    var userId=userobj[0].user_id;//myid
    var useridtofollow=userobj[0].usertofollow;
    var deffered =q.defer();
    userModel
        .findById(userId , function (err, user) {
            if(err)
                deffered.reject(err);
            else
            { if(user.following.indexOf(useridtofollow)!=-1)
            {deffered.resolve(user);
            }
            else
            {deffered.resolve();}
            }


        });


    return deffered.promise;
}

function unfollowUser(userobj) {
    var deffered =q.defer();
    var userId=userobj[0].user_id;//myid
    var useridtofollow=userobj[0].usertofollow;
    var deffered =q.defer();
    userModel
        .findById(useridtofollow , function (err, user) {
            for(i in user.followers)
            {
                if (userId == user.followers[i])
                {
                    user.followers.splice(i, 1);
                }
            }
            user.save(function (err,user) {
                if(err)
                {deffered.reject(err);}
                else
                {
                    userModel
                        .findById(userId , function (err, user) {
                            for(i in user.following)
                            {
                                if (useridtofollow == user.following[i])
                                {
                                    user.following.splice(i, 1);
                                }
                            }
                            user.save(function (err,user) {
                                if(err)
                                {deffered.reject(err);}
                                else
                                {deffered.resolve(user);}
                            });
                        });
                }

            })

        });


    return deffered.promise;

}


function followUser(userobj) {
    var deffered =q.defer();
    var userId=userobj[0].user_id;//myid
    var useridtofollow=userobj[0].usertofollow;
    var deffered =q.defer();
    userModel
        .findById(useridtofollow , function (err, user) {
            user.followers.push(userId);
            user.save(function (err,user) {
            if(err)
            {deffered.reject(err);}
            else
            {
                userModel
                    .findById(userId , function (err, user) {
                        user.following.push(useridtofollow);
                        user.save(function (err,user) {
                            if(err)
                            {deffered.reject(err);}
                            else
                            {deffered.resolve(user);}
                        });
                    });
            }

        })

    });


    return deffered.promise;

}


function createUser(user) {
    var deffered =q.defer();
    userModel
        .create(user,function (err,user) {
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

function findAllUsers() {
    var deffered=q.defer();

    userModel
        .find(function (err,user) {
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
        .find({username: username},function (err,user) {
            if(err){
                deffered.reject(err);
            }
            else
            {
                deffered.resolve(user[0]);
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
                    deffered.resolve(user);
                }

            });

    return deffered.promise;

}

function deleteUser(userId) {

    var deffered = q.defer();
    console.log(userId);
    userModel
        .findByIdAndRemove(userId, function (err, user) {
            if(err)
                deffered.reject(err);
            else {
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

