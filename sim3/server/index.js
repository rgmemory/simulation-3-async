const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller')
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session')
require('dotenv').config();

//helousers
//helojunction

let {
    SESSION_SECRET,
    CONNECTION_STRING,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env

const app = express();

app.use(bodyParser.json());

//SCROLL TO THE BOTTOM, ADVANCED SETTINGS,
//OAUTH, THE OIDC CONFORMANT

massive(CONNECTION_STRING).then(db => {
    console.log('db works');
    app.set('db', db);
})

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
    callbackURL: CALLBACK_URL,
    scope: 'openid profile email'
}, function(accessToken, refreshToken, extraParams, profile, done){
    console.log(profile);
    app.get('db').check_user([profile.id]).then(user => {
        if(user[0]){      
            console.log('user already there')      
            done(null, user[0])
        }else{
            console.log('user not there')
            app.get('db').register_user([profile.id, profile.name.givenName, profile.name.familyName, `https://robohash.org/me/${profile.id}`]).then(user => {
                console.log("user", user[0])
                done(null, user[0])
                
            }) 
        }
    })    
}))

//create the cookie here
passport.serializeUser(function(user, done){
    console.log('serialize', user)
    done(null, user.id)
})

passport.deserializeUser(function(id, done){  
    console.log('deserialize', id)
    app.get('db').read_user([id]).then(user => {
        done(null, user); 
    })
})

app.get('/login', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/#/auth'
}))


app.get('/auth/me', function(req, res){
    if(req.user){
        // req.app.get('db').get_all_data().then(user => {
            res.status(200).send(req.user)
        // })
    }else{
        res.status(401).send('nice try sucka')
    }
})

app.get('/api/auth/logout', controller.logout)

app.post('/api/dashboardSort', controller.dashboardSort)




app.get('/api/getDashboard', controller.getDashboard)

app.get('/api/getDashUser', controller.getDashUser)

app.post('/api/updateProfile', controller.updateProfile)

app.post('/api/addFriend', controller.addFriend)




























//auth0 authentication
// app.get('/api/auth/login', controller.test)

//set the information on the session
// app.get('/api/auth/setUser', controller.test)

//check for the user object on session
// app.get('/api/auth/authenticated', controller.test)

//logout
// app.post('/api/auth/logout', controller.test)







//list all friends
// app.get('/api/friend/list', controller.test)

//add a friend
app.post('/api/friend/add', controller.addFriend)

//remove a friend
// app.post('/api/friend/remove', controller.test)







//update user attributes
// app.patch('/api/user/patch/:id', controller.test)

//get users
app.get('/api/user/list', controller.getUsers)








///get auth0 setup and also get routing setup
app.listen(3005, function(){
    console.log('listening on port 3005')
})