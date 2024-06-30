const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });//this will automatically set timestamp properties on our blog documents like createdAt and updatedAt property

const Blog = mongoose.model('Blog', blogSchema) //it will search for the Blog and pluralize it whenever we use this model in fututre
module.exports = Blog;//to export the Blog Model and use it in app.js