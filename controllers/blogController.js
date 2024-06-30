// This file contain functions
//blog_index,blog_details,blog_post,blog_delete,blog_create_get
const mongoose = require('mongoose')
const Blog = require('../models/blog');


const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch(err => {
            console.log(err)
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;//this params.id is the id in the path as it is request paramaters
    if (mongoose.Types.ObjectId.isValid(id)) {
        Blog.findById(id)
            .then(result => {
                res.render('details', { title: 'Blog Details', blog: result })
            })
            .catch(err => {
                console.log(err)
            })
    } else {
        console.error('Invalid ObjectId')
    }
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'NewBlog' })
}

const blog_post = (req, res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => { console.log(err) })
}


const blog_delete = (req, res) => {
    const id = req.params.id
    if (mongoose.Types.ObjectId.isValid(id)) {
        Blog.findByIdAndDelete(id)
            .then((result) => {
                //this will do in this regards to return to the browser
                res.json({ redirect: '/blogs' })//we get this json data on frontend
            }).catch(err => {
                console.log(err)
            })
    } else {
        console.log('Invalid ObjectId')
    }
}

module.exports = {
    blog_index,
    blog_post,
    blog_create_get,
    blog_details,
    blog_delete
}