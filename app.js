const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./Routes/blogRoute')

const app = express();

const dbUrl = 'mongodb+srv://me:nodejs@vohra.fxrc6nq.mongodb.net/?retryWrites=true&w=majority&appName=vohra'
mongoose.connect(dbUrl).then(() => {
    console.log('connected to database')
    app.listen(3000, () => {
        console.log(`Listening to 3000 port`)
    })
}).catch((err) => { console.log(err) })

app.set('view engine', 'ejs')

//                              MiddleWares
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('tiny'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//                              Routing
//index page
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

//about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

//blogs route
app.use('/blogs', blogRoutes);


//404 page
app.use((req, res) => {
    res.status(404).render('404', { title: 'Error' })
})

