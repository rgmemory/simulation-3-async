module.exports = {

    getUsers: function(req, res){
        req.app.get('db').get_users().then(users => {
            res.status(200).send(users);
        })
    },

    logout: function(req, res){
        req.session.destroy();
        res.redirect(`https://russbus.auth0.com/v2/logout?returnTo=http%3A%2F%2Flocalhost%3A3000&client_id=${process.env.CLIENT_ID}`)
    },
    
    getDashUser: function(req, res){
        req.app.get('db').get_dash_user([req.user[0].id]).then(user => {
            res.status(200).send(user[0])
        })
    },

    getDashboard: function(req, res){
        req.app.get('db').dashboard_users([req.user[0].id]).then(dashboardUsers => {
            res.status(200).send(dashboardUsers)
        })
    },

    updateProfile: function(req, res){
        let {first, last, gender, hair, eye, hobby, day, month, year} = req.body
        console.log('uploaded info is', req.body, req.user[0].id)
        req.app.get('db').update_profile([req.user[0].id, first, last, gender, hair, eye, hobby, day, month, year])
    },

    /////****** */
    addFriend: function(req, res){
        req.app.get('db').add_friend([req.user[0].id, req.body.id]).then(friend => {
            console.log(friend)
            //////immediately call for list of friends here
            req.app.get('db').dashboard_users([req.user[0].id]).then(dashboardUsers => {
                res.status(200).send(dashboardUsers)
            })
        })
    },

    dashboardSort: function(req, res){
        let user = req.user[0]
        console.log('backend dashboard sort', req.body.sort, req.user[0])

    },

    searchDisplay: function(req, res){
        ///////here is where I want to limit the number of users from SQL then the loop functions as normal
        req.app.get('db').get_users().then(users => {
            req.app.get('db').dashboard_users([req.user[0].id]).then(notFriends => {
                
                for(var i = 0; i < users.length; i++){
                    for(var j = 0; j < notFriends.length; j++){
                        users[i].friendship = true;
                        if(users[i].id == notFriends[j].id){
                            users[i].friendship = false;
                            break;
                        }
                    }                        
                }
                res.send(users)
            })
        })
    }, 
    /////****** */
    removeFriend: function(req, res){
        console.log('backend remove', req.body)

        req.app.get('db').remove_friend([req.user[0].id, req.body.id]).then(friends => {
            console.log(friends)
            res.status(200).send(friends);
        })
    },

    /////****** */
    searchAddFriend: function(req, res){
        req.app.get('db').add_friend([req.user[0].id, req.body.id]).then(friends => {
            console.log(friends)
            res.status(200).send(friends)
        })
    },

    search: function(req, res){
        let {firstOrLast, name} = req.body
        console.log('search', req.body.firstOrLast, req.body.name)

        if(firstOrLast === 'last'){
            console.log('last')
            req.app.get('db').get_last(name).then(reply => {
                console.log('last reply', reply)
                res.status(200).send(reply)
            })
        }else{
            console.log('first')
            req.app.get('db').get_first(name).then(reply => {
                console.log('first reply', reply)
                res.status(200).send(reply)
            })
        }
    },

    displaypages: function(req, res){
        let offsetNumber = (req.body.page - 1) * 8;
        console.log('offset', offsetNumber)

        req.app.get('db').display_pages(offsetNumber).then(users => {

            req.app.get('db').dashboard_users([req.user[0].id]).then(notFriends => {
                for(var i = 0; i < users.length; i++){
                    for(var j = 0; j < notFriends.length; j++){
                        users[i].friendship = true;
                        if(users[i].id == notFriends[j].id){
                            users[i].friendship = false;
                            break;
                        }
                    }                        
                }
            })
            res.status(200).send(users);
        })
    },

    numberusers: function(req, res){
        console.log('backend numberusers')
        req.app.get('db').number_users().then(count => {
            console.log('count', count[0]);

            res.status(200).send(count[0])
        })
    },

    getsearchusers: function(req, res){
        console.log('backend gesearchusers')
        req.app.get('db').get_search_users().then(users => {
            res.status(200).send(users);
        })
    }
}