const mongoose = require('mongoose')

const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://0.0.0.0:27017/blog',{useNewUrlParser: true})

// BlogPost.create({
//     title: 'Money on Energy Bills', body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens up. You know those bullet-point lists. You start spotting them everything at this time of year. They go like this:'
// })



BlogPost.findByIdAndUpdate('641f5083316d4a21458f29dd',{title: 'Updated Title'})
.then((updatedpost)=>{
    if(updatedpost){
        console.log('post updated')
    }
    else{
        console.log('post not updated')
    }
})
.catch((err)=>{
    console.log(err)
})






