const express = require('express')
const app = express()
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const mongoose = require('mongoose')

const validateMiddleware = require('./middlewares/validateMiddleware')
const authMiddleware = require('./middlewares/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticatedMiddleware')

const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

mongoose.connect('mongodb://0.0.0.0:27017/blog',{useNewUrlParser: true})
// mongoose.connection.collection('blogposts').insertOne({title:'i dont know'})

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(fileUpload())
app.use(expressSession({
    secret: 'blog secret code'
})) 
app.use('/posts/store',validateMiddleware)
global.loggedIn = null;
app.use("*", (req, res, next) => {
     loggedIn = req.session.userId; 
     next()  
     });

app.set('view engine','ejs')

app.get('/', homeController)

app.get('/post/:id',getPostController)

app.get('/auth/register',redirectIfAuthenticatedMiddleware,newUserController)

app.get('/posts/new',authMiddleware,newPostController)

app.get('/auth/login',redirectIfAuthenticatedMiddleware,loginController)

app.post('/posts/store',authMiddleware,storePostController)

app.post('/users/register',redirectIfAuthenticatedMiddleware,storeUserController)

app.post('/users/login',redirectIfAuthenticatedMiddleware,loginUserController)

app.get('/auth/logout',logoutController)

app.use((req, res) => res.render('notfound'));



app.listen(4000, ()=>{ console.log('App listening on port 4000') }) 