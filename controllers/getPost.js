const BlogPost = require('../models/BlogPost')

module.exports = async(req,res)=>{
    const blogpost = await BlogPost.findById({_id: req.params.id})
    res.render('post',{blogpost})
}