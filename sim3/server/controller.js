module.exports = {
    test: function(req, res){
        console.log('test works')
    },

    addFriend: function(req, res){
        console.log('backend addfriend works', req.body)
    },

    getUsers: function(req, res){
        console.log('getusers backend')
        req.app.get('db').get_users().then(users => {
            res.status(200).send(users);
        })
    }
}