const express = require('express')
const app = express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const validateMiddleware = require('./middlewares/validateMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')

mongoose.connect('mongodb://0.0.0.0:27017/blog',{useNewUrlParser: true})
// mongoose.connection.collection('blogposts').insertOne({title:'i dont know'})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())

app.use('/posts/store',validateMiddleware)

app.set('view engine','ejs')

app.get('/', homeController)

app.get('/post/:id',getPostController)

app.get('/auth/register',newUserController)

app.get('/posts/new',newPostController
)
app.get('/auth/login',loginController)

app.post('/posts/store',storePostController)

app.post('/users/register',storeUserController)

app.post('/users/login',loginUserController)


app.listen(4000, ()=>{ console.log('App listening on port 4000') }) 