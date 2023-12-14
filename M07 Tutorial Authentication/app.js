const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');



//express app
const app = express();
//Connect to mongoDB
const dbURI = 'mongodb+srv://kesny88:Ny081293@sdev255.7x1o0er.mongodb.net/SDEV255-lab?retryWrites=true&w=majority'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));


//register view engine
app.set('view engine', 'ejs');


//listen for requests
//app.listen(3000);

//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));



//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'new blog 2',
//         snippet: 'about my new blog',
//         body: ' more about my new blog'
//     });

//     blog.save()

//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) => {
//     Blog.findById('656e6777d4a9029fed64b5dc')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');

});



app.get('/about', (req, res) => {
    //res.send('<p>about</p>');
    res.render('about', {title: 'About'});
});

//blog routes
app.use('/blogs', blogRoutes);

//404 page
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
})