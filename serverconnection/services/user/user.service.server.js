module.exports=function(app){

    var userModel =require("../../model/user/user.model.server");
    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var auth = authorized;
    app.post  ('/api/login', passport.authenticate('local'), login);
    app.post  ('/api/logout',         logout);
    app.post  ('/api/register',       register);
    app.get  ('/api/allusers',  findAllUsers);
    //app.post  ('/api/user',     auth, createUser);
    //app.get   ('/api/loggedin',       loggedin);
    //app.get   ('/api/user',     auth, findAllUsers);
    //app.put   ('/api/user/:id', auth, updateUser);
    //app.delete('/api/user/:id', auth, deleteUser);

    //app.get("/api/user",findUser);
    //app.post("/api/user",createUser);
    //app.get("/api/user/:uid",findUserById);
    // app.put("/api/user/:uid",updateUser);
    // app.delete("/api/user/:uid",deleteUser);


    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/google/oauth/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/restaurantList',
            failureRedirect: '/#!/login'
        }));


    var googleConfig = {
        clientID     : "1073284949463-7pg2bp9g1u0buahb1tnie0uquvbaq2jj.apps.googleusercontent.com",
        clientSecret : "dQpcCHPXWyhyAVGlKGY-5hyG",
        callbackURL  : "http://localhost:3000/google/oauth/callback"
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        console.log(profile.id);
        userModel
            .findUserByGoogleId(profile.id)
            .then(function (user) {
                console.log(user);
                if(user) {
                    console.log(111);
                    done(null, user);
                } else {
                    console.log(222);
                    var user = {
                        username: profile.emails[0].value,
                        //photo: profile.photos[0].value,
                        firstName: profile.name.givenName,
                        lastName:  profile.name.familyName,
                        email:     profile.emails[0].value,
                        google: {
                            id:    profile.id
                        }
                    };
                    return userModel.createUser(user);
                }
            }, function (err) {
                console.log(err);
                done(err, null);
            })
            .then(function (user) {
                done(null, user);
            }, function (err) {
                console.log(err);
                done(err, null);
            });
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }



    function login(req, res) {
        var user = req.user;
        console.log("login service" +user);
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function register(req,res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(function(user) {
                if(user){
                    req.login(user, function(err) {
                        if(err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
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
    function findAllUsers(req,res) {
        //var userId=req.params.uid;
        userModel
            .findAllUsers()
            .then(function (users) {
                res.json(users);
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
                console.log(user);
                res.json(user);

            }, function (error) {
                console.log('ERRRRR')
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