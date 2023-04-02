const BlogPost = require('../models/BlogPost')
const path = require('path')

module.exports = async(req,res)=>{
    let image = req.files.image; 
   await image.mv(path.resolve('public/img',image.name))
   await BlogPost.create({...req.body,image: '/img/' + image.name})
    res.redirect('/')
}