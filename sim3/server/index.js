const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller')
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
require('dotenv').config();

let {
    // SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
} = process.env

const app = express();

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => {
    console.log('db works');
    ///storing information in a server object. first value is the key, 2nd is the value. app.get is how you get it
    app.set('db', db);
}).catch(e => console.log(e))


//order is important
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    //url you send back to app after logging in//DON'T FORGET TO ADD the callback URL in account
    //when auth0 authenicates it goes to wherever is listed here
    callbackURL: CALLBACK_URL,
    //if we want to put specific stragegies you put them here
    scope: 'openid profile'
    //function that gets invoked when somebody succesfuly authenticaes
}, function(accessToken, refreshToken, extraParams, profile, done){
    
    // let db = app.get('db');

    //this is what we get back from google
    console.log(profile)
    let {id, name, nickname} = profile;


    app.get('db').find_user([id]).then(foundUser => {
        if(foundUser[0]){            
            done(null, foundUser[0].id)///2nd param here is the id in serialize user below
        }else{
            app.get('db').create_user([id, name.givenName, nickname]).then(user => {
                done(null, user[0].id)
            }).catch(e => console.log("error is", e)) 
        }
    }).catch(e => console.log("error is", e))    
}))

//SCROLL TO THE BOTTOM, ADVANCED SETTINGS,
//OAUTH, THE OIDC CONFORMANT



///SERIALIZE
//takes a profile and puts it on the session object
//gives a user a serial number rather than storing an object on session


//this fires immediately to file away user
//this puts the id in the session store
passport.serializeUser(function(id, done){

    //id here coresponds to id below
    done(null, id)
})


//DESERIALIZE
//runs as middleware after somebody has logged in. It will get whatever was put in the store
//by serializeUser (the user)
///this is called always when a user is logged in

//this is called when user object access is needed
passport.deserializeUser(function(id, done){  

    //whatever we pass out, eneds up on the req object as req.user.
    //req.user is how we get all the users info like their name etc
    console.log("deserialize")
    // app.get('db')///grab everything from db that matches this id////////////////////////////////////////////
    app.get('db').find_user([id]).then(user => {
        ///puts the user object on req.user
        //the 2nd argument will be the user on req.user
        done(null, user[0]); 
    })
})


app.get('/login', passport.authenticate('auth0'))

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://www.google.com'
}))
///////////////


//put this axios call on the app.js and the .then respons will update the redux store
///fire this function in app.js  componentdid mount to check the current user when the app loads then get user 
//check to see who is currently logged in
app.get('/auth/me', function(req, res){
    console.log("auth/me")

    if(req.user){
        req.app.get('db').get_all_data().then(user => {
            // res.status(200).send(req.user)
            res.status(200).send(user)
        })
        
        
    }else{
        res.status(401).send('nice try sucka')
    }
})












////AUTHORIZATION ENDPOINTS
//auth0 authentication
app.get('/api/auth/login', controller.test)

//set the information on the session
app.get('/api/auth/setUser', controller.test)

//check for the user object on session
app.get('/api/auth/authenticated', controller.test)

//logout
app.post('/api/auth/logout', controller.test)


//////FRIEND ENDPOINTS
//list all friends
app.get('/api/friend/list', controller.test)

//add a friend
app.post('/api/friend/add', controller.test)

//remove a friend
app.post('/api/friend/remove', controller.test)


//////USER ENDPOINTS
//update user attributes
app.patch('/api/user/patch/:id', controller.test)

//

/////RECOMMENDED ENDPOINTS


///get auth0 setup and also get routing setup
app.listen(3005, function(){
    console.log('listening on port 3005')
})