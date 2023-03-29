const User = require('../models/User')
const path = require('path')

module.exports = (req,res)=>{
    User.create(req.body)
    .then((userAdded)=>{
        if(userAdded){
            res.redirect('/')
        }
        else{
            console.log('user not added')
        }
    })
    .catch((err)=>{
        res.redirect('/auth/register')
    })
} 